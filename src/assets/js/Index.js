var remote = require('electron').remote;
var ipc = require('electron').ipcRenderer
const shell = require('electron').shell
const mainWindow = require('electron').remote.getCurrentWindow();
const dialog = require('electron').remote.dialog

var grammer = "";
var filepath = "";
var text = "";

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

(function () {
    var ev = new $.Event('remove'),
        orig = $.fn.remove;
    $.fn.remove = function () {
        $(this).trigger(ev);
        return orig.apply(this, arguments);
    }
})();

$('#fblink').on('click', function () {
    shell.openExternal('https://goo.gl/pOvE9r')
})

$('#weblink').on('click', function () {
    shell.openExternal('https://goo.gl/L3dBYl')
})

var options = {
    valueNames: ['name', 'type']
};

var userList = new List('docs-list', options);

$(window).resize(function () {
    $('.some-content-related-div').height($(document).height() - 42 - 24);
})

$('.some-content-related-div').height($(document).height() - 42 - 25);

$('#doc-list-div').slimScroll({
    height: $(window).height() - 130,
    railVisible: false,
    size: '12px',
    color: '#000'
});
$('#example-list-div').slimScroll({
    height: $(window).height() - 140 - 24,
    railVisible: false,
    size: '12px',
    color: '#000'
});
$('#recent-list-div').slimScroll({
    height: $(window).height() - 140 - 170,
    railVisible: false,
    size: '12px',
    color: '#000'
});
$('#tabs-list-div').slimScroll({
    height: 193,
    size: '12px',
    color: '#000'
});
function shadow(sendr) {
    var id = sendr.id;
    var sender = $("#" + id)
    if (sender.scrollTop() == 0) {
        sender.removeClass('drop-shadow');
    }
    else {
        sender.addClass('drop-shadow');
    }
}
window.addEventListener('resize', function (event) {
    $('#recent-list-div')[0].parentElement.style.height = ($(window).height() - 140 - 175) + "px";
    $('#recent-list-div').height($(window).height() - 140 - 175);

    $('#example-list-div')[0].parentElement.style.height = ($(window).height() - 140 - 24) + "px";
    $('#example-list-div').height($(window).height() - 140 - 24);

    $('#doc-list-div')[0].parentElement.style.height = ($(window).height() - 130) + "px";
    $('#doc-list-div').height($(window).height() - 130);
})

function createNew(text) {
    grammer = "gb";
    addtab('Editor', "Untitled", "Editor.html");
}
$('#openScript').on('click', function () {
    ipc.send('open-file-dialog');
})
$('#about').on('click', function () {
    addtab('About', "About", "About.html");
})

ipc.on('opened-file', function (event, path) {
    path = path[0];
    addToRecent(path);
    openFile(path);
})
function openFile(path, isExample =false) {
    if (!path){
        createNew('');
        return;
    }
    if (window.filepath != "") {
        return alert("Please Wait While Another File is Loading...")
    }
    window.filepath = path;
    
    fs.stat(path.toString(), function (err, stats) {
        if (err) {
            window.filepath = ""
            return alert(err);
        }
    })
    text = fs.readFileSync(path, "utf8");
    var name = filepath.toString().split("\\")[filepath.toString().split("\\").length - 1];
    var extension = name.split(".")[name.split(".").length - 1];

    if (extension.toLowerCase() == "bas")
        grammer = "gb";
    else if (extension.toLowerCase() == "json")
        grammer = "json";
    else if (extension.toLowerCase() == "css")
        grammer = "css";
    else if (extension.toLowerCase() == "js")
        grammer = "javascript";
    else if (extension.toLowerCase() == "html")
        grammer = "html";
    else
        grammer = "";

    if (isExample)
        window.filepath = '';
    addtab('Editor', name, "Editor.html");
}

function openOrigianl() {
    ipc.send('open-file-o-dialog');
}
function openModified() {
    ipc.send('open-file-m-dialog');
}

ipc.on('opened-o-file', function (event, path) {
    addToRecent(path);
    document.getElementById('originalPath').innerHTML = path;
    var name = path.toString().split("\\")[path.toString().split("\\").length - 1];
    document.getElementById('originalName').innerHTML = name;
})

ipc.on('opened-m-file', function (event, path) {
    addToRecent(path);
    document.getElementById('modifiedPath').innerHTML = path;
    var name = path.toString().split("\\")[path.toString().split("\\").length - 1];
    document.getElementById('modifiedName').innerHTML = name;
})

function compare() {
    var originalPath = document.getElementById('originalPath').innerText;
    var modifiedPath = document.getElementById('modifiedPath').innerText;
    var originalName = document.getElementById('originalName').innerHTML;
    var modifiedName = document.getElementById('modifiedName').innerHTML;
    if (originalPath && modifiedPath)
        addtab('Editor', originalName + " ↔ " + modifiedName, "DiffEditor.html");
}
$('#theme').change(function () {
    var selectedText = ($(this).val());
    if (selectedText == "Codepen" ||
        selectedText == "Solarized Dark" ||
        selectedText == "Material Dark" ||
        selectedText == "VS Dark") {
        swapStyleSheet('dark');
        setEditorTheme(selectedText);
        setDocTheme(selectedText);
    }
    else if (selectedText == "Github" ||
        selectedText == "Solarized Light" ||
        selectedText == "VS default" ||
        selectedText == "Material Light") {
        swapStyleSheet('light');
        setEditorTheme(selectedText);
        setDocTheme(selectedText);
    }
});

function setEditorTheme(theme) {
    var iframes = $('#tab-box iframe');
    for (i = 0; i < iframes.length; i++) {
        if (iframes[i].contentWindow.document.getElementById('container')) {
            iframes[i].contentWindow.setTheme(theme);
        }
    }
}
function setDocTheme(theme) {
    var iframes = $('#tab-box iframe');
    for (i = 0; i < iframes.length; i++) {
        if (iframes[i].contentWindow.document.getElementById('doc-body')) {

            iframes[i].contentWindow.swapStyleSheet(theme);
        }
    }
}
arguments = remote.getGlobal('sharedObject').prop1;
if (arguments.length > 1) {
    path = arguments[1]
    if (!path == "."){
        fs.stat(path.toString(), function (err, stats) {
            if (err) {
                window.filepath = ""
                alert(err, 'Unable to read file')
            }
        })
        text = fs.readFileSync(path, "utf8");
        createNew();
    }
}

ipc.on('OpenFile', function (e, path) {
    if (path){
        fs.open(path, 'r', function(status, fd) {
            var buffer = new Buffer([0]);
            fs.read(fd, buffer, 0, 1, 0, function(err, num) {
                var firstByte = buffer[0].toString(16);
                if (firstByte == "ff" || firstByte == 'fe' )
                {
                    var file= (firstByte == "ff")? 'Tokenised': 'Protected';
                    const options = {
                        type: 'warning',
                        title: 'Warning',
                        message: `We deteached that the file '${path}' is ${file} Binary File.\n\n Would you want to open it.`,
                        buttons: ['Yes', 'No']
                    }
                    dialog.showMessageBox(options, function (index) {
                        if (index==0)
                            openFile(path)
                    })
                }
                else if (firstByte == 'fc')
                    alert(`We deteached that the file '${path}' is QBASIC file.`)
                else
                    openFile(path);
            });
        });
    }
    else
        openFile(path);
})

function tooglebar(bar) {
    var sidebar = (bar == 'side') ? document.getElementsByClassName('sidebar')[0] : document.getElementsByClassName('toolbar-footer')[0];
    var barClass = (bar == 'side') ? '.sidebar' : '.toolbar-footer';
    var hidden = hasClass(sidebar, 'hidden');
    if (hidden)
        $(barClass).removeClass('hidden');
    else
        $(barClass).addClass('hidden');
}

$('#addbtnnew').on('click', function () {
    createNew();
})

$('#addbtnopen').on('click', function () {
    ipc.send('openexisting');
})
$('#addbtncomapre').on('click', function () {
    $('#sidetab li:eq(2) a').tab('show');
})
$('#addbtnshell').on('click', function () {
    ipc.send('run-shell', "");
})
ipc.on('togglebar', function (e, bar) {
    tooglebar(bar);
});
ipc.on('openCmdPalette', function (e, bar) {
    hud.updateSuggestions(tabs);
    var CmdShown = hud.isShown();
    CmdShown ? hud.hide(): hud.show(); 
});

$(document).ready(function () {
    hud.presentSuggestions(tabs);
    hud.hide();
});

//Context Menu
function CloseThisTab(){
    $('#myTab .active a .close').click()
}

// hang controller
mainWindow.webContents.on('crashed', function () {
    const options = {
        type: 'info',
        title: 'Renderer Process Crashed',
        message: 'This process has crashed.',
        buttons: ['Reload', 'Close']
    }
    dialog.showMessageBox(options, function (index) {
        if (index === 0) win.reload()
        else win.close()
    })
})
mainWindow.on('unresponsive', function () {
    const options = {
      type: 'info',
      title: 'Renderer Process Hanging',
      message: 'This process is hanging.',
      buttons: ['Reload', 'Close']
    }
    dialog.showMessageBox(options, function (index) {
      if (index === 0) win.reload()
      else win.close()
    })
  })
