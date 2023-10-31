/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import objects from '../gamedata/objects.js';
import verbs from '../gamedata/verbs.js';
import encounters from '../gamedata/encounters.js';
import locations from '../gamedata/locations.js';

import {
  defaultTexts,
} from '../gamedata/default-data.js';

import Inventory from '../classes/inventory.js';
import CurrentLocation from '../classes/location.js';
import Flags from '../classes/flags.js';
import ItemPlaces from '../classes/itemplaces.js';
import Counters from '../classes/counters.js';
import GameTurns from '../classes/turns.js';
import Command from '../classes/command.js';

import {
  GAME_STATES,
} from './constants.js';

// Сохраняем игровое состояние

const saveGameState = (slotNumber) => {
  /*
  localStorage.setItem('currentLocation', CurrentLocation.get());
  localStorage.setItem('inventory', JSON.stringify(Inventory.getAll()));
  localStorage.setItem('flags', JSON.stringify(Flags.getAll()));
  localStorage.setItem('itemPlaces', JSON.stringify(ItemPlaces.getAll()));
  */
  const slotName = (slotNumber === -1 || !slotNumber) ? '1' : String(slotNumber);
  localStorage.setItem(slotName, JSON.stringify({
    currentLocation: CurrentLocation.get(),
    inventory: Inventory.getAll(),
    flags: Flags.getAll(),
    itemPlaces: ItemPlaces.getAll(),
  }));
  return `${defaultTexts.saveGame} ${slotName}.`;
};

// Загружаем игровое состояние
const loadGameState = (slotNumber) => {
  if (localStorage.length !== 0) {
    const slotName = (slotNumber === -1 || !slotNumber) ? '1' : String(slotNumber);
    if (localStorage.getItem(slotName) === null) return defaultTexts.cantLoadGame;

    const slot = JSON.parse(localStorage.getItem(slotName));
    CurrentLocation.set(slot.currentLocation);
    Inventory.init(slot.inventory);
    Flags.init(slot.flags);
    ItemPlaces.init(slot.itemPlaces);
    // GameTurns.clear();
    // Можно раскомментировать, чтобы не давать возможность отменять ходы после загрузки игры
    GameTurns.save();
    return `${defaultTexts.loadGame} ${slotName}.`;
  }
  return defaultTexts.cantLoadGame;
};

// Возвращаем описание предмета по его id
const getItemDescriptionById = (id) => {
  const item = objects.find(e => e.id === id);

  return item.desc;
};

// Проверяем, может ли игрок пройти в указанном направлении
const canPlayerMove = (direction, newLocation) => {
  let access = true;
  let answer = defaultTexts.defaultQuestion;

  // Проверяем доступность в общем случае
  if (newLocation === -1) {
    return {
      access: false,
      answer: defaultTexts.playerCantGo,
    };
  }

  // Проверяем частные случаи для определённых локаций
  // В объекте encounters указаны условия, по которым куда-то нельзя пройти

  const result = encounters.checkPlayerObstacles(direction);
  if (result) {
    answer = result;
    access = false;
  }

  return {
    access,
    answer,
  };
};

// Перемещение игрока из одной локации в другую
const movePlayer = (verbId) => {
  const directions = ['n', 'e', 's', 'w', 'u', 'd', 'ne', 'nw', 'se', 'sw'];
  const direction = directions[verbId];
  const gameDirections = locations[CurrentLocation.get()].dir;
  let indexOfTransitionLocation = -1;
  let newLocation = -1;
  let canChangeLocation = false;

  if (gameDirections[direction] >= 0) indexOfTransitionLocation = gameDirections[direction];

  // Проверяем, можно ли туда пройти
  const canMove = canPlayerMove(direction, indexOfTransitionLocation);

  // Если можно, то перемещаем игрока
  if (canMove.access) {
    newLocation = indexOfTransitionLocation;
    canChangeLocation = true;
  }

  return {
    answer: canMove.answer,
    newLocation,
    canChangeLocation,
  };
};

const playerStandardActions = {
  takeItem(objectIds) {
    // Особые случаи
    const answer = encounters.take(objectIds);

    // Общий случай
    if (objectIds[0] !== -1) {
      const itemId = objectIds[0];
      if (!Inventory.includes(itemId) && ItemPlaces.get(itemId) === CurrentLocation.get()) {
        Inventory.addItem(itemId);
        ItemPlaces.set(itemId, -1);
        return defaultTexts.defaultAnswerToTake;
      }
    }
    return answer;
  },

  dropItem(objectIds, objectsInInput) {
    // Особые случаи - проверяем энкаунтеры
    const answer = encounters.drop(objectIds);

    // Общий случай
    // Если игрок указал один предмет, то кладём его
    if (answer === defaultTexts.playerUselessAction && objectsInInput === 1) {
      const itemId = objectIds[0];
      if (Inventory.includes(itemId)) {
        Inventory.removeItem(itemId);
        ItemPlaces.set(itemId, CurrentLocation.get());
        return defaultTexts.playerDropsItem;
      }
      return defaultTexts.playerHasNoItem;
    }
    return answer;
  },

  examine(objectIds) {
    let answer;
    const objectId = objectIds[0];
    const currentLocation = CurrentLocation.get();
    // Особый случай наступает, когда в локации есть соотв. функция
    const result = encounters.examine(objectId);
    if (result !== defaultTexts.defaultDescription) answer = result;

    // Общий случай осмотра предмета
    // Если предмет в локации, но не в инвентаре
    else if (ItemPlaces.get(objectId) === currentLocation) answer = defaultTexts.itemNotInInventory;
    // Если предмет в инвентаре
    else if (Inventory.includes(objectId)) answer = getItemDescriptionById(objectId);
    // Если объект приписан к этой локации
    else if ('location' in objects[objectId]) {
      if ((typeof objects[objectId].location === 'number' && objects[objectId].location === currentLocation) || (typeof objects[objectId].location === 'object' && objects[objectId].location.includes(CurrentLocation.get()))) answer = getItemDescriptionById(objectId);
      else answer = defaultTexts.objectIsNotInLocation;
    } else answer = result;

    return answer;
  },
};

const processInput = (userInput) => {
  // Разбираем полученный из парсера объект на object1Id, object2Id, verbId
  let verbId;
  let object1Id;
  let object2Id;
  let objectsInInput;
  let message;
  let number;

  // Если это глагол "ПОВТОРИТЬ" (17), то вставляем предыдущую команду
  if (userInput.verb === 17) {
    if (Command.get() === -1) {
      message = defaultTexts.cannotRepeatMove;
    } else {
      const lastInput = Command.get();
      verbId = lastInput.verb;
      object1Id = lastInput.object1;
      object2Id = lastInput.object2;
      message = lastInput.message || '';
      objectsInInput = lastInput.objectsInInput;
      number = lastInput.number;
    }
  } else {
    verbId = userInput.verb;
    object1Id = userInput.object1;
    object2Id = userInput.object2;
    message = userInput.message || '';
    objectsInInput = userInput.objectsInInput;
    number = userInput.number;
  }

  const objectIds = [object1Id, object2Id];

  const uniqueEncounter = encounters.getUniqueEncounter(verbId, objectIds);
  let answer;
  if (message !== '') answer = message;
  let gameFlag = GAME_STATES.game;

  // Если это глагол "СОХРАНИТЬ" или "ЗАГРУЗИТЬ"
  if (verbId === 14) {
    return {
      answer: saveGameState(number),
      gameFlag,
    };
  }

  if (verbId === 15) {
    return {
      answer: loadGameState(number),
      gameFlag,
    };
  }

  // Обрабатываем особые игровые ситуации.
  if (uniqueEncounter.flag) {
    return {
      answer: uniqueEncounter.answer,
      gameFlag,
    };
  }
  // Выдаём игроку сообщение об ошибке, если парсер выдал сообщение об ошибке
  if (answer) {
    return {
      answer,
      gameFlag,
    };
  }

  // Дефолтное значение answer на случай, если программа не понимает введённый игроком глагол
  answer = defaultTexts.defaultAnswer;

  // Обрабатываем команду игрока (по глаголу)
  // Если это глагол перемещения
  switch (verbId) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      const resultOfMove = movePlayer(verbId);
      if (resultOfMove.canChangeLocation) {
        CurrentLocation.set(resultOfMove.newLocation);
        GameTurns.save();
      }
      answer = resultOfMove.answer;
      break;
    case 10:
      // Прорабатываем глагол ИДИ
      if (objectsInInput === 0) answer = defaultTexts.specifyDirection;
      else answer = encounters.go(objectIds);
      GameTurns.save();
      break;
    case 11:
      // Глагол "ИНФО" (10)
      answer = defaultTexts.info;
      break;
    case 12:
      // Выход из игры
      gameFlag = GAME_STATES.gameover;
      break;
    case 13:
      // Инвентарь
      // eslint-disable-next-line max-len
      answer = Inventory.getItemsString(Inventory.getAll(), defaultTexts.playerHasItems, defaultTexts.playerHasNoItems);
      answer += encounters.addInfoToInventory();
      break;
    case 16:
      // Отменить действие
      if (GameTurns._state.length <= 1) {
        answer = defaultTexts.cannotCancelMove;
      } else {
        answer = defaultTexts.cancelMove;
        GameTurns.restore();
        return {
          answer,
          gameFlag,
        };
      }
      break;
    case 18:
    case 19:
    case 20:
      // Отдельно обрабатываем глаголы "ВЗЯТЬ", "ПОЛОЖИТЬ", "ОСМОТРЕТЬ"
      if (objectsInInput === 0) answer = defaultTexts.playerCommandsVerbWithoutObject;
      else answer = playerStandardActions[verbs[verbId].method](objectIds, objectsInInput);
      GameTurns.save();
      break;
    default:
      answer = encounters[verbs[verbId].method](objectIds, objectsInInput);
      GameTurns.save();
      break;
  }

  // Прокручиваем все нужные счётчики
  encounters.setCounters();

  // Проверяем, победил или проиграл ли игрок?
  if (Flags.get('isVictory')) {
    gameFlag = GAME_STATES.victory;
  }
  if (Flags.get('isGameOver')) {
    gameFlag = GAME_STATES.gameover;
  }

  Command.set(userInput);
  // Возвращаем реакцию программы на действие игрока
  return {
    answer,
    gameFlag,
  };
};

export default processInput;
