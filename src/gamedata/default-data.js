const defaultTexts = {
  info: 'Вводите команды в формате ГЛАГОЛ + ОБЪЕКТ (+ ОБЪЕКТ), например, <span style="color: yellow;">ВЗЯТЬ ЛЕСТНИЦУ</span> или <span style="color: yellow;">ОТКРЫТЬ ДВЕРЬ КЛЮЧОМ.</span> Регистр букв не имеет значения. Используйте команды <span style="color: yellow;">С (север), Ю (юг), З (запад), В (восток), Х (вверх), Н (вниз)</span> для передвижения. <span style="color: yellow;">ОСМОТРИ</span> помогает получить больше информации об игровых объектах. <span style="color: yellow;">И</span> - ваш инвентарь. <span style="color: yellow;">ВЫХОД</span> - вернуться на стартовый экран. <span style="color: yellow;">СОХРАНИ</span> и <span style="color: yellow;">ЗАГРУЗИ</span> - сохранение и загрузка игры. Остальные команды вам предстоит открыть самостоятельно. Удачной игры!',

  startMainText: 'Добро пожаловать в игру! Этот текст выводится на стартовом экране.',

  victoryText: 'Вы выиграли! Этот текст выводится, когда вы выигрываете в игре.',

  defaultDescription: 'Ничего необычного.',

  defaultQuestion: 'Что будете делать?',

  defaultAnswer: 'Я не понимаю.',

  parserDontUnderstandWord: 'Я не понимаю слово ',

  defaultAnswerToTake: 'Ок, взял.',

  playerDropsItem: 'Ок, положил.',

  playerHasNoItem: 'У меня этого нет.',

  playerHasItems: 'У меня есть:',

  playerHasNoItems: 'У меня ничего нет.',

  playerTakeItems: 'Я взял следующие предметы:',

  playerDropItems: 'Я положил следующие предметы:',

  thereIsNoItems: 'Здесь ничего нет.',

  objectIsNotInLocation: 'Здесь этого нет.',

  playerCantGo: 'Вы не можете туда пройти.',

  playerUselessAction: 'Это делу не поможет.',

  playerCommandsVerbWithoutObject: 'Укажите предмет или игровой объект, к которому должно быть применено это действие.',

  cancelMove: 'Вы вернулись на один ход назад.',

  cannotCancelMove: 'Невозможно отменить ход. Вы находитесь в самом начале игровой сессии.',

  cannotRepeatMove: 'Нет команд для повтора. Вы находитесь в самом начале игровой сессии.',

  itemsInLocation: 'Здесь также есть:',

  itemNotInInventory: 'Чтобы внимательно осмотреть предмет, сначала возьмите его в руки.',

  specifyAdjective: 'Пожалуйста, уточните прилагательное для этого объекта.',

  specifyObject: 'Пожалуйста, уточните, какой конкретно из объектов вы имеете ввиду?',

  specifyDirection: 'Уточните, куда конкретно вы хотите попасть?',

  firstGameMessage: 'Ваше приключение начинается! Что будете делать?',

  pressEnterToStart: 'Нажмите ENTER для начала игры.',

  pressEnterToStartAgain: 'Нажмите ENTER, если хотите снова сыграть.',

  defaultGameOverText: 'Ваша игра закончилась.',

  saveGame: 'Вы сохранили игру в слот с номером',

  loadGame: 'Вы загрузили сохранённую игру из слота с номером',

  cantLoadGame: 'Сохранённая игра отсутствует либо слот сохранённой игры с данным номером не существует.',
};

const defaultImages = {
  startImage: '<img src="img/startscreen.png">',
  gameOverImage: '<img src="img/gameover.png">',
  victoryImage: '<img src="img/victory.png">',
};

export {
  defaultTexts,
  defaultImages,
};
