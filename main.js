global.sharedObject = {prop1: process.argv}
const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;
const exec = require('child_process').exec;

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
var fs = require('fs');
const spawn = require('child_process').spawn;
var path = require('path');

const Menu = electron.Menu
let mainWindow

function createWindow () {
  
  mainWindow = new BrowserWindow({minWidth:768, minHeight: 600})
  mainWindow.loadURL(`file://${__dirname}/src/index.html?path=${app.getAppPath()}`)
  //mainWindow.maximize(true);

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

let template = [
  {
    label: '&File',
    submenu: [
      {
        label: 'New File',
        accelerator: 'CmdOrCtrl+N',
        click: function(){
          mainWindow.webContents.send('OpenFile', null)
        }
      }, {
        label: 'New Window',
        accelerator: 'CmdOrCtrl+Shift+N',
        click: function(){
          let win = new BrowserWindow({minWidth:768, minHeight: 600})
          win.loadURL(`file://${__dirname}/src/index.html?path=${app.getAppPath()}`)
          win = null
        } 
      }, {
          label:'Open File...',
          accelerator: 'CmdOrCtrl+O',
          click: function(){
            dialog.showOpenDialog({
              properties: ['openFile'],
              filters: [
                {name: 'GwBasic file', extensions: ['bas']},
                {name: 'Plain Text', extensions: ['txt']},
                {name: 'All Files', extensions: ['*']}
              ]
            }, function (files) {
              if (files != null){
                if (typeof files == 'object') mainWindow.webContents.send('OpenFile', files[0]);
                else mainWindow.webContents.send('OpenFile', files);
              }
            })
          }
      }, {type: 'separator'}, {
        label:'Exit',
        click: function(){
          
        }
      }
    ]
  }, {
    label: 'View',
    submenu: [{
        label:'Toggle Full Screen',
        accelerator: 'F11'
      }, {
        label:'Show Command palette',
        accelerator: 'CmdOrCtrl+P',
        click: function(){
          mainWindow.webContents.send('openCmdPalette');
        }
      }, {
        label:'Toggle Menubar',
        accelerator: 'CmdorCtrl+ALt+M',
        click: function(){
          mainWindow.setMenuBarVisibility(mainWindow.isMenuBarVisible() == true ? false :true);
        }
      }, {
        label:'Toggle Status Bar',
        accelerator: 'CmdorCtrl+Alt+S',
        click: function(){
          mainWindow.webContents.send('togglebar', 'status');
        }
      },  {
        label:'Toggle Sidebar',
        accelerator: 'CmdorCtrl+B',
        click: function(){
          mainWindow.webContents.send('togglebar', 'side');
        }
      }, {type: 'separator'}, {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          // on reload, start fresh and close any old
          // open secondary windows
          if (focusedWindow.id === 1) {
            BrowserWindow.getAllWindows().forEach(function (win) {
              if (win.id > 1) {
                win.close()
              }
            })
          }
          focusedWindow.reload()
        }
      }
    }, {
      label: 'Toggle Full Screen',
      accelerator: (function () {
        if (process.platform === 'darwin') {
          return 'Ctrl+Command+F'
        } else {
          return 'F11'
        }
      })(),
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
        }
      }
    }, {
      label: 'Toggle Developer Tools',
      accelerator: (function () {
        if (process.platform === 'darwin') {
          return 'Alt+Command+I'
        } else {
          return 'Ctrl+Shift+I'
        }
      })(),
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      }
    }]
  }, {
    label: 'Help',
    role: 'help',
    submenu: [{
      label: 'Learn More',
      click: function () {
        electron.shell.openExternal('http://electron.atom.io')
      }
    }]
  }
]

function addUpdateMenuItems (items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    label: `Version ${version}`,
    enabled: false
  }, {
    label: 'Checking for Update',
    enabled: false,
    key: 'checkingForUpdate'
  }, {
    label: 'Check for Update',
    visible: false,
    key: 'checkForUpdate',
    click: function () {
      require('electron').autoUpdater.checkForUpdates()
    }
  }, {
    label: 'Restart and Install Update',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: function () {
      require('electron').autoUpdater.quitAndInstall()
    }
  }]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}

app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
})
// app.commandLine.appendSwitch('remote-debugging-port', '8080')
app.on('ready', () => {

  // const ret = globalShortcut.register('CommandOrControl+X', () => {
  //   console.log('CommandOrControl+X is pressed')
  // })
  // if (!ret) {
  //   console.log('registration failed')
  // }

  // // Check whether a shortcut is registered.
  // console.log("Enabled Global Shortcut: ",globalShortcut.isRegistered('CommandOrControl+X'))

  createWindow();

  arguments = global.sharedObject.prop1;
  mainWindow.webContents.send('OpenFile', arguments[1]);
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

//Custom code

function openFile() {
  
}

ipc.on('open-file-o-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      {name: 'GwBasic file', extensions: ['bas']},
      {name: 'Plain Text', extensions: ['txt']},
      {name: 'All Files', extensions: ['*']}
    ]
  }, function (files) {
    if (files){
        if (typeof files == 'object') event.sender.send('opened-o-file', files[0])
        else event.sender.send('opened-o-file', files);
    }
  })
})

ipc.on('open-file-m-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      {name: 'GwBasic file', extensions: ['bas']},
      {name: 'Plain Text', extensions: ['txt']},
      {name: 'All Files', extensions: ['*']}
    ]
  }, function (files) {
    if (files){
        if (typeof files == 'object') event.sender.send('opened-m-file', files[0])
        else event.sender.send('opened-m-file', files);
    }
  })
})

ipc.on('save-file-dialog', function (event) {
  dialog.showSaveDialog({
    properties: ['openFile'],
    filters: [
      {name: 'Basic file format', extensions: ['bas']},
      {name: 'Plain Text', extensions: ['txt']},
      {name: 'All Files', extensions: ['*']}
    ]
  }, function (files, Text) {
    if (files){
        if (typeof files == 'object') event.sender.send('saved-file', files[0])
        else event.sender.send('saved-file', files);
    } 
  })
})

ipc.on('open-dev', function (event) {
  mainWindow.openDevTools();
})

ipc.on('open-information-dialog', function (event) {
  const options = {
    type: 'info',
    title: 'Information',
    message: "You haven't saved the document. Do you want save it?",
    buttons: ['Save', "Don't Save", "Cancel"]
  }
  dialog.showMessageBox(options, function (index) {
    event.sender.send('information-dialog-selection', index)
  })
})

ipc.on('openexisting', function(event){
  console.log('dd');
      dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
          {name: 'GwBasic file', extensions: ['bas']},
          {name: 'Plain Text', extensions: ['txt']},
          {name: 'All Files', extensions: ['*']}
        ]
      }, function (files) {
        if (typeof files == 'object') mainWindow.webContents.send('OpenFile', files[0]);
        else mainWindow.webContents.send('OpenFile', files);
      })
})
ipc.on('run-shell', function(e, parameters){
  var path = app.getAppPath();
  console.log(`"${path}\\PC-BASIC\\pcbasic.exe" ${parameters}`);
  exec(`"${path}\\PC-BASIC\\pcbasic.exe" ${parameters}`, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
  });
})

ipc.on('run-convert', function(e, parameters){
  const spawn = require('child_process').spawn;
  var filepath = path.join(__dirname, 'PC-BASIC\\pcbasic.com');
  const ls = spawn(filepath, 
    ['--load="Art.BAS"', '--convert=A'],
    [{cwd: path.join(__dirname, 'PC-BASIC'), shell: true}]);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
})