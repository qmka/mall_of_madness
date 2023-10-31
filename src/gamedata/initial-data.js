// Номер стартовой локации
const defaultLocation = 0;

// Соответствие предметов номерам локаций, в которых они находятся в начале игры.
// -1 - если предмет не существует или находится в инвентаре.
// Первое число - id предмета, второе число - id его локации.
const initialItemPlaces = {
  0: -1,
  1: 0,
  2: 1,
};

// Игровые флаги, принимают значения true или false
// Флаги isVictory и isGameOver обязательны для работы игры, их нельзя удалять!!!
const initialFlags = {
  isVictory: false,
  isGameOver: false,
  /*
  isTrollKilled: false,
  */
};

// Игровые счётчики, принимают числовые значения
const initialCounters = {
  /*
  gameTurns: 0
  */
};

// Инвентарь игрока в начале игры.
// Поместите в массив id всех предметов, которые должны лежать в инвентаре на старте
const initialInventory = [];

export {
  defaultLocation,
  initialFlags,
  initialItemPlaces,
  initialCounters,
  initialInventory,
};
