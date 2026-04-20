const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  ipcMain.handle('app:getVersion', () => app.getVersion());

  ipcMain.handle('dialog:showMessage', async (_event, message) => {
    await dialog.showMessageBox({
      type: 'info',
      title: 'Hello from main',
      message,
    });
  });

  createWindow();

  // macOS convention: re-open a window when the dock icon is clicked and no windows exist.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// macOS convention: apps stay running until Cmd+Q. Everywhere else, quit when the last window closes.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
