/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import Inventory from '../classes/inventory.js';
import CurrentLocation from '../classes/location.js';
import Flags from '../classes/flags.js';
import ItemPlaces from '../classes/itemplaces.js';
import Counters from '../classes/counters.js';

import objects from './objects.js';

import {
  defaultTexts,
} from './default-data.js';

const encounters = {
  // Добавляем дополнительную информацию к описанию локации в зависимости от различных условий
  addDescription() {
    let encounter;

    /*
    const currentLocation = CurrentLocation.get();

    switch (currentLocation) {
        case 7:
            if (!Flags.get("isTrollKilled")) encounter = 'Путь на восток преграждает толстый !*тролль*!.';
            break;
    }
    */
    if (encounter) {
        return `<p>${encounter}</p>`;
    }
    return '';
  },

  addInfoToInventory() {
    let info = '';

    /*
    Добавьте свой код, который будет выводится по команде "И" после перечисления предметов в инвентаре.
    */

    return info;
  },

  // Прокручиваем все заданные игрой счётчики
  setCounters() {
    /*
    Counters.increase('gameTurns');
    */
  },

  // Проверяем, мешает ли игроку что-либо двигаться в выбранном им направлении
  checkPlayerObstacles(direction) {
    /*
    const currentLocation = CurrentLocation.get();
    if (currentLocation === 7 && !Flags.get("isTrollKilled") && direction === 'e') {
        return "Тролль рычит и не даёт мне пройти.";
    }
    */

    return '';
  },

  // Функция возвращает текст для вывода на экран окончания игры
  getGameOverText() {
    /*
    if (Flags.get("isDiedFromTrollWithAxe")) {
        return 'Да, не стоило с маленьким топориком лезть на большого тролля. Вы успели нанести всего несколько ударов перед тем, как тролль разорвал вас на куски...';
    }
    */

    return defaultTexts.defaultGameOverText;
  },

  // Функция проверяет, действует ли в локации какое-либо условие, не укладывающееся в общую логику игры.
  getUniqueEncounter(verbId, objectIds) {
    let answer;
    let flag = false;

    /*
    // В локации с ведьмой у игрока только один ход, чтобы отразить заклятье, иначе его выбрасывает в предыдущую комнату
    if (CurrentLocation.get() === 27 && !Flags.get("isWitchKilled")) {
        flag = true;
        if (verbId === 38 && objectIds.includes(25)) {
            if (Inventory.includes(10)) {
                Flags.toggle("isWitchKilled");
                Inventory.removeItem(10);
                answer = "Вы отразили заклятье мечом, и оно ударило прямо в ведьму! Издав истошный крик, ведьма рассыпалась в пыль. К сожалению, меч тоже не уцелел.";
            } else {
                CurrentLocation.set(17);
                answer = "Вам нечем отразить заклятье. Заклятье ударяет вам в грудь и выкидывает в комнату с решёткой."
            }
        } else {
            CurrentLocation.set(17);
            answer = "Вы не успеваете ничего сделать. Заклятье ударяет вам в грудь и выкидывает в комнату с решёткой.";
        }
    }
    */

    return {
      answer,
      flag,
    };
  },

  take(objectIds) {
    // Если игрок хочет взять всё (id объекта "всё" = 0)
    if (objectIds.includes(0)) {
      // Проверяем, есть ли предметы в локации
      const itemsArray = ItemPlaces.getLocationItemsArray(CurrentLocation.get());
      const answer = Inventory.getItemsString(itemsArray, defaultTexts.playerTakeItems, defaultTexts.thereIsNoItems);
      if (itemsArray.length !== 0) {
        itemsArray.forEach((item) => {
          Inventory.addItem(item);
          ItemPlaces.set(item, -1);
        });
      }
      return answer;
    }
    /*
    Добавьте свой код, если нужно
    */

    return 'Вы не можете это сделать.';
  },

  drop(objectIds) {
    // Положить всё (id объекта "всё" = 0)
    if (objectIds.includes(0)) {
        // Проверяем, есть ли предметы в локации
        const itemsArray = Inventory.getAll();
        const answer = Inventory.getItemsString(itemsArray, defaultTexts.playerDropItems, defaultTexts.playerHasNoItems);
        if (itemsArray.length !== 0) {
            itemsArray.forEach((item) => {
                Inventory.removeItem(item);
                ItemPlaces.set(item, CurrentLocation.get());
            });
        };
        return answer;
    }
    /*
    Добавьте свой код, если нужно
    */

    return defaultTexts.playerUselessAction;
  },

  examine(objectId) {
    /*
    const currentLocation = CurrentLocation.get();

    if (currentLocation === 7 && !Flags.get("isTrollKilled") && objectId === 17) {
        return "Это огромный мерзкий зелёный тролль. Ничего, кроме страха и омерзения, не вызывает.";
    }
    */

    return defaultTexts.defaultDescription;
  },

  wait() {
    return 'Я немного передохнул. Время двигаться дальше!';
  },

  talk(objectIds) {
    return 'Здесь не с кем говорить.';
  },

  buy(objectIds) {
    return 'Вы не можете это купить';
  },

  pay(objectIds) {
    return 'Похоже, здесь никому не нужны деньги.';
  },

  hit(objectIds) {
    return 'Ничего не произошло.';
  },

  chop(objectIds) {
    return 'Это делу не поможет.';
  },

  open(objectIds) {
    return 'Тут нечего открывать.';
  },

  lean(objectIds, objectsInInput) {
    // objectsInInput может понадобиться, потому что прислонить объект нельзя сам по себе.
    // Его можно прислонить только к чему-то

    return 'Хм, это делу не поможет.';
  },

  destroy(objectIds) {
    return 'Вы не можете это сломать.';
  },

  cross(objectIds) {
    return 'Непонятно, что вы хотите сделать.';
  },

  climb(objectIds) {
    return 'Вы не можете туда залезть.';
  },

  go(objectIds) {
    return defaultTexts.playerCantGo;
  },

  eat(objectIds) {
    return 'Это несъедобно.';
  },

  turnOn(objectIds) {
    return 'У вас нет ничего такого, что можно было бы включить.';
  },

  pour(objectIds) {
    return 'Это нельзя рассыпать.';
  },

  fuel(objectIds) {
    return 'Здесь нечего зарядить или заправить.';
  },

  oil(objectIds) {
    return 'Для этого вам понадобится масло.';
  },

  press(objectIds) {
    return 'Здесь нечего нажимать.';
  },

  reflect(objectIds) {
    return 'Не понимаю, что вы хотите сделать.';
  },

  kiss(objectIds) {
    return 'Не стоит к этому прикасаться губами.';
  },

  wake(objectIds) {
    return 'Непонятно, кого вы тут хотите разбудить.';
  },

  turnOff(objectIds) {
    return 'Я не могу это выключить.';
  },

  leave(objectIds) {
    return 'Не понимаю, что вы хотите сделать.';
  },

  close(objectIds) {
    return 'Здесь нечего закрывать.';
  },

  dress(objectIds) {
    return 'Среди вещей у меня нет ничего, что я бы мог надеть. Впрочем, моя обычная одежда мне и так нравится.';
  },

  undress(objectIds) {
    return 'Я могу снять с себя только мою одежду. Но сейчас не та ситуация, когда имеет смысл раздеваться.';
  },

  drink(objectIds) {
    return 'Я не могу это выпить.';
  },

  pull(objectIds) {
    return 'Здесь нет ничего такого, что я мог бы потянуть или вытащить, и это произвело бы хоть какой-то эффект.';
  },

  rotate(objectIds) {
    return 'Здесь нет ничего такого, что бы можно было покрутить, и это произвело бы хоть какой-то эффект.';
  },

  rub(objectIds) {
    return 'Тереть это бесполезно.';
  },

  sing(objectIds) {
    return 'Волшебники-гномы! В минувшие дни<br>Искусно металлы ковали они.<br>Сапфиры, алмазы, рубины, топазы<br>Хранили они и гранили они!';
  },

  give(objectIds) {
    return 'Не получится.';
  },

  burn(objectIds) {
    return 'У вас нет ни огнива, ни спичек.';
  },

  sniff(objectIds) {
    return 'Вы принюхиваетесь, но не улавливаете никаких необычных запахов.';
  },

  hear(objectIds) {
    return 'Вы прислушиваетесь, но не слышите ничего необычного.';
  },

  dig(objectIds) {
    return 'У вас нет лопаты, а руками копать бессмысленно. И негигиенично!';
  },

  cut(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  tear(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  tie(objectIds, objectsInInput) {
    // objectsInInput может понадобиться, потому что связывают обычно два объекта

    return 'У вас нет ни верёвки, ни ниток.';
  },

  blow(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  sleep(objectIds) {
    return 'Не время спать, пока зло не дремлет!';
  },

  wakeUp(objectIds) {
    return 'Вы щипаете себя за щёку - больно! Это означает, что вы не спите - всё реально.';
  },

  swim(objectIds) {
    return 'Здесь негде плавать.';
  },

  read(objectIds) {
    return 'Здесь нечего читать.';
  },

  fill(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  jump(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  untie(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  help(objectIds) {
    return 'Это достаточно простая игра, чтобы пройти её без подсказок. Обязательно осматривайте все предметы, это поможет вам продвинуться вперёд.';
  },

  score(objectIds) {
    return 'В этой игре не встроена возможность подсчёта очков.';
  },
};

export default encounters;
