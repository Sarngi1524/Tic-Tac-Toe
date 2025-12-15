Running the app as a desktop application (Electron)

1. Install dependencies (make sure you have Node.js installed):

   npm install

2. Run the app in development:

   npm start

   The Electron window is frameless and transparent — only the app body (`.window`) will be visible on your desktop (you can drag it by the title bar).

3. Optional: create a packaged Windows build (you need electron-packager installed as a dev dependency):

   npm run package-win

Notes:
- This wraps the existing `index.html` and assets in an Electron window.
- If you want a real installer (exe/msi), use electron-builder or NSIS after packaging.
