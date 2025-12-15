const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 420,
    height: 760,
    resizable: false,
    frame: false, // no window chrome — show only the app UI
    transparent: true, // allow desktop to show through outside the app body
    hasShadow: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  // On Windows, set an AppUserModelID for proper taskbar behavior
  if (process.platform === 'win32') {
    app.setAppUserModelId('com.tictactoe.desktop')
  }
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
