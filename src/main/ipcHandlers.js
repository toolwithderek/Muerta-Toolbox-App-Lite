const { ipcMain } = require('electron');
const Store = require('electron-store');

Store.initRenderer();

const store = new Store();

function setupIPCEventHandlers() {
  ipcMain.on('getStoreValue', (event, key) => {
    const value = store.get(key);
    event.reply('getStoreValue', { key: key, value: btoa(JSON.stringify(value)) });
  });
  ipcMain.on('setPinFeature', (event, pinUrl) => {
    const pinFeature = {
      url: pinUrl,
      isFirstOpenApp: false,
    };
    store.set('pinFeature', pinFeature);
  });
  ipcMain.on('getPinFeature', (event) => {
    const pinFeature = store.get('pinFeature');
    event.reply('getPinFeature', pinFeature);
  });
  ipcMain.on('updatePinFeature', (event, updateData) => {
    const pinFeature = store.get('pinFeature') || {};
    const updateObject = Object.assign(pinFeature, updateData);
    store.set('pinFeature', updateObject);
    event.reply('getPinFeature', updateObject);
  });
}

module.exports = setupIPCEventHandlers;
