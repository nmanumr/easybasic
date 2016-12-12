var helpCmds = [
  {
    'cmd': ">",
    'caption': 'Show all commands'
  }, {
    'cmd': "#",
    'caption': 'Documenation List'
  }, {
    'cmd': "!",
    'caption': 'Examples List'
  }
];
var allCmds = [
  {    
    'caption': 'Open Shell',
    'command': 'openShell'
  }, {
    'caption': 'Close All Tab',
    'command': 'closeAll'
  }
]
var defaultCommands = [
  {
    'caption': 'ss',
    'command': 'OpenTab',
    'args': { 'url': 'chrome://bookmarks/', 'isLocal': false }
  },
  {
    'caption': 'Goto: Chrome Downloads',
    'command': 'OpenTab',
    'args': { 'url': 'chrome://downloads/', 'isLocal': false }
  },
  {
    'caption': 'Goto: Chrome Extensions',
    'command': 'OpenTab',
    'shortcut': 'CTRL+B',
    'args': { 'url': 'chrome://extensions/', 'isLocal': false }
  },
  {
    'caption': 'Goto: Chrome History',
    'command': 'OpenTab',
    'args': { 'url': 'chrome://history/', 'isLocal': false }
  },
  {
    'caption': 'Preferences: CCP Settings',
    'command': 'OpenTab',
    'args': { 'url': 'settings.html', 'isLocal': true }
  },
  {
    'caption': 'Preferences: Chrome Settings',
    'command': 'OpenTab',
    'args': { 'url': 'chrome://history/', 'isLocal': false }
  },
  {
    'caption': 'Goto: Chrome Bookmarks',
    'command': 'OpenTab',
    'args': { 'url': 'chrome://bookmarks/', 'isLocal': false }
  },
  {
    'caption': 'Goto: Chrome Downloads',
    'command': 'OpenTab',
    'args': { 'url': 'chrome://downloads/', 'isLocal': false }
  },
  {
    'caption': 'Goto: Chrome Extensions',
    'command': 'OpenTab',
    'args': { 'url': 'chrome://extensions/', 'isLocal': false }
  },
  {
    'caption': 'Goto: Chrome History',
    'command': 'OpenTab',
    'args': { 'url': 'chrome://history/', 'isLocal': false }
  },
  {
    'caption': 'Preferences: CCP Settings',
    'command': 'OpenTab',
    'args': { 'url': 'settings.html', 'isLocal': true }
  },
  {
    'caption': 'Preferences: Chrome Settings',
    'command': 'OpenTab',
    'args': { 'url': 'chrome://history/', 'isLocal': false }
  }
];