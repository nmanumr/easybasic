const electron = require('electron');
const app = electron.app;
const windowManager = require('electron-window-manager');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const config = require('./package.json').config;



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

  var homeWindow = windowManager.createNew('home', 'Welcome', getWindowURL('home'), false, {
        'width': 600,
        'height': 450,
        'position': 'center',
        'layout': 'simple',
        'resizable': true
    });
    homeWindow.open();
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