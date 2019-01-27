const { app, BrowserWindow } = require('electron');

const basepath = app.getAppPath();
let win;

function createWindow () {
  // let { width, height }  = require('electron').screen.getPrimaryDisplay().size
  // Create the browser window.
  win = new BrowserWindow({
    show: false
    // width: width,
    // height: height
    // backgroundColor: '#ffffff'
    //icon: `file://${__dirname}/dist/assets/logo.png`
  });
  win.loadURL(`file://${basepath}/dist/InvestWatch/index.html`);

  win.maximize();
  win.setResizable(false);
  win.show();

  // Uncomment to open the DevTools.
  win.webContents.openDevTools();

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
});
