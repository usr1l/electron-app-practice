const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
  showMessage: (message) => ipcRenderer.invoke('dialog:showMessage', message),
});
