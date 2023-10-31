/* eslint-disable import/extensions */
import locations from '../gamedata/locations.js';
import objects from '../gamedata/objects.js';

import {
  defaultTexts,
} from '../gamedata/default-data.js';

import {
  isNumber,
  log,
} from '../modules/utils.js';

const ItemPlaces = {
  _itemPlaces: {},

  get(itemId) {
    if (itemId in this._itemPlaces) {
      return this._itemPlaces[itemId];
    }
    log(`ItemPlaces.get: предмет с ID ${itemId} отсутствует в объекте itemPlaces.`);
    return -1;
  },

  getAll() {
    return this._itemPlaces;
  },

  getLocationItemsList(locationId) {
    if (isNumber(locationId) && locations[locationId]) {
      const itemsArray = this.getLocationItemsArray(locationId);

      if (!itemsArray.length) {
        return '';
      }

      const itemsInLoc = itemsArray.map(item => `<span class="location-item">${objects[item].name}</span>`).join(', ').concat('.');

      return `<p>${defaultTexts.itemsInLocation} ${itemsInLoc}</p>`;
    }
    log(`ItemPlaces.getLocationItemsList: передаётся некорректный ID локации: ${locationId}.`);
    return -1;
  },

  getLocationItemsArray(locationId) {
    if (isNumber(locationId) && locations[locationId]) {
      return Object.keys(this._itemPlaces).filter(key => this._itemPlaces[key] === locationId);
    }
    log(`ItemPlaces.getLocationItemsArray: передаётся некорректный ID локации: ${locationId}.`);
    return -1;
  },

  set(itemId, locationId) {
    if (isNumber(locationId) && itemId in this._itemPlaces) {
      this._itemPlaces[itemId] = locationId;
    } else {
      log('ItemPlaces.set: проверьте, корректно ли задан ID локации и ID предмета.');
    }
    return -1;
  },

  init(initialState) {
    if (initialState && Object.keys(initialState).length) {
      this._itemPlaces = Object.assign({}, initialState);
    } else {
      log('ItemPlaces.init: проверьте объект, который вы используете для определения начального местоположения предметов.');
    }
  },
};

export default ItemPlaces;
