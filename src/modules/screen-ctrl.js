/* eslint-disable import/extensions */
import encounters from '../gamedata/encounters.js';
import locations from '../gamedata/locations.js';

import {
  defaultTexts,
  defaultImages,
} from '../gamedata/default-data.js';

import CurrentLocation from '../classes/location.js';
import ItemPlaces from '../classes/itemplaces.js';

import {
  GAME_STATES,
  TEXT_ONLY_MODE,
} from './constants.js';

import {
  log,
} from './utils.js';

const getUserInput = () => {
  const inputField = document.getElementById('input-field');
  const inputText = inputField.value;
  inputField.value = '';
  return inputText;
};

const setFocusOnInput = () => {
  $('#input-field').focus();
};

// Возвращает текст, который выводится как описание локации
const constructLocation = () => {
  // Берём из объекта с локациями описание текущей локации
  const location = CurrentLocation.get();
  let description = locations[location].desc;

  // Добавляем пояснение для особых игровых ситуаций
  description += encounters.addDescription();

  // Если в локации лежат предметы, то добавляем их список к описанию локации
  description += ItemPlaces.getLocationItemsList(location);

  return description;
};

const convertToHtml = str => str
  .split('!*').join('<span class="encounter">')
  .split('*!').join('</span>');

const renderScreen = (mainText, image, actionText, isInputAreaVisible) => {
  $('#screen').html(`${convertToHtml(mainText)}<p class="action-ask">${actionText}</p>`);
  if (!TEXT_ONLY_MODE) $('#image').html(image);
  $('#input-area').css('opacity', isInputAreaVisible ? '100' : '0');
};

// Формирует экран, который выдаётся пользователю после совершённого им действия
const renderGameScreen = (actionText) => {
  const imageTag = `<img src="img/${locations[CurrentLocation.get()].img}">`;
  renderScreen(constructLocation(), imageTag, actionText, true);
};

// Формирует статический экран, например, стартовый экран, экран победы, экран game over
const renderNonGameScreen = (type) => {
  let text;
  let image;
  let action;
  switch (type) {
    case GAME_STATES.start:
      text = defaultTexts.startMainText;
      action = defaultTexts.pressEnterToStart;
      image = defaultImages.startImage;
      break;
    case GAME_STATES.gameover:
      text = encounters.getGameOverText();
      action = defaultTexts.pressEnterToStartAgain;
      image = defaultImages.gameOverImage;
      break;
    case GAME_STATES.victory:
      text = defaultTexts.victoryText;
      action = defaultTexts.pressEnterToStartAgain;
      image = defaultImages.victoryImage;
      break;
    default:
      log('Undefined game state!');
      break;
  }
  renderScreen(text, image, action, false);
};

export {
  renderGameScreen,
  renderNonGameScreen,
  getUserInput,
  setFocusOnInput,
};
