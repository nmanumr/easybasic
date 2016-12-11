const { remote } = require('electron')

$(document).ready(function(){
    var focused_win = remote.BrowserWindow.getFocusedWindow();
    var fullscreen = focused_win.isFullScreen();

    $('#close').click(() => { focused_win.close() })
    $('#min').click(() => { focused_win.minimize() })
    $('#max').click(() => { 
        focused_win.setFullScreen(!fullscreen);
        fullscreen ? $('#max>i').text('fullscreen'): $('#max>i').text('fullscreen_exit');
        fullscreen = (!fullscreen);
    })
});