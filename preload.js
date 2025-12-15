// Preload file — keep minimal. You can expose APIs here if needed later.
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  // placeholder
})
