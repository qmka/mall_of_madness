// Номер стартовой локации
const defaultLocation = 1;

// Соответствие предметов номерам локаций, в которых они находятся в начале игры.
// -1 - если предмет не существует или находится в инвентаре.
// Первое число - id предмета, второе число - id его локации.
const initialItemPlaces = {
  0: -1,
  1: 8,
  2: 10,
  3: -1,
  4: 20,
  5: -1,
  6: -1,
  7: -1,
  8: -1,
  9: -1,
  10: 15,
  11: -1,
  12: 30,
  13: -1,
};

// Игровые флаги, принимают значения true или false
// Флаги isVictory и isGameOver обязательны для работы игры, их нельзя удалять!!!
const initialFlags = {
  isVictory: false,
  isGameOver: false,
  isGluttonKilled: false,
  isSecurityKilled: false,
  isGiantKilled: false,
  isMonsterKilled: false,
  isAppleNotOnTree: false,
  isBoomerangGiven: false,
  isScrollGiven: false,
  isDoorOpen: false,
  isAppleEaten: false,
  isMentosEaten: false,
  isPepsiDrinken: false,
  isFlashlightOn: false,
  isBucketFull: false,
  isRedbullDrinken: false,
  isKeyInFontain: false,
  isFantaExists: false,
  isPepsiExists: false,
  isRedbullExists: false
};

// Игровые счётчики, принимают числовые значения
const initialCounters = {
  keyTurns: 0
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
