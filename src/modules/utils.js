/* eslint-disable import/extensions */
import {
  DEVELOPER_MODE,
} from './constants.js';

const isNumber = data => !isNaN(data) && isFinite(data);

const log = (message) => {
  if (DEVELOPER_MODE) {
    console.log(message);
  }
};

export {
  isNumber,
  log,
};
