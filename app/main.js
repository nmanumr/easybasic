const electron = require('electron');
const {ipcMain} = require('electron')
const app = electron.app;
const windowManager = require('electron-window-manager');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const config = require('./package.json').config;

//apps windows
var homeWindow,
  shellWindow,
  ideWindow,
  helpWindow;


app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  windowManager.init({
    'windowsTitlePrefix': 'Easybasic - ',
    'onLoadFailure': function(window){
      window.loadURL('/loadFailure.html');
    }
  });

  homeWindow = windowManager.createNew('home', 'Welcome', getWindowURL('home'), false, {
        'width': 740,
        'height': 640,
        'position': 'center',
        'resizable': true,
        'frame': false
    });
    shellWindow = windowManager.createNew('shell', 'Shell', getWindowURL('shell'), false, {
        'width': 740,
        'height': 640,
        'position': 'center',
        'resizable': false,
        'frame': false
    });
    ideWindow = windowManager.createNew('ide', 'IDE', getWindowURL('ide'), false, {
        'width': 740,
        'height': 640,
        'position': 'center',
        'resizable': true,
        'frame': false
    });
    homeWindow.open();
    homeWindow.maximize();
});

function getWindowURL(window){
  var url =null;
  if (isDev) {
     url = config[`${window}_port`];
  } else {
     url = url.format({
       pathname: path.join(__dirname, `${window}/index.html`),
       protocol: 'file:',
       slashes: true
     });
  }
  return url;
}

ipcMain.on('open-app', (event, app, uri) => {
  switch(app){
    case "ide":
      ideWindow.open();
      ideWindow.maximize();
      homeWindow.close();
      break;

    case "shell":
      shellWindow.open();
      shellWindow.maximize();
      homeWindow.close();
      break;

    case "help":
      shellWindow.open();
      shellWindow.maximize();
      homeWindow.close();
      break;

    default:
      console.log("Can not to open: "+app);
      break;
  }  
})