if (!demo)
    ipc = require('electron').ipcRenderer

var tabs=[]

function openTabById(id){
    $(`#myTab a[href="${id}"]`).click();
}

var closeAllTabs = function () {
    var buttonList = $('#myTab li a .close');
    if (buttonList.length > 0) {
        for (i = 0; i < buttonList.length; i++) { 
            $(buttonList[i]).click();
        }
    }
    else {
        console.warn('WARN: No opened tab');
    }
}

function addintablist(name, tabid){
    document.getElementById('tabsList').innerHTML += `<span class="nav-group-item" id="sidetab-${tabid}" onclick="sidetabopen(this)">
                <span class="icn icn-cancel" onclick="closetab(this)"></span>
                <span class="name">${name}</span>
                <small class="hidden">${tabid}</small>
                </span>`;
}

var currentTab;
var tabCount = 0;
$(function () {
    $("#myTab").on("click", "a", function (e) {
        e.preventDefault();

        $(this).tab('show');
        $currentTab = $(this);
    });

    registerCloseEvent();
});

// function registerComposeButtonEvent() {

function addtab (type, name, URL) {
    document.getElementById('status').innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="font-size:10pt;"></i>Loading tab...';
    if (type == "Editor") {
        var tabId = type + tabCount;
        tabCount = tabCount + 1;

        $('.nav-tabs').append('<li ><a href="#' + tabId + '" id="' + tabId + '_tab-li" data-toggle="tab"><i class="close closeTab fa fa-remove" type="button" ></i><i style="font-style: normal!important;">' + name + '</i></a></li>');
        $('#tab-box').append('<iframe class="tab-pane" id="' + tabId + '" style="width: 100%; height: 100%; border-width: 0px;"></iframe>');

        if(demo){
            URL = "demoEditor.html";
        }
        LoadUrl("", URL, "#" + tabId);
        // var frame = window.frames[tabId];
        // frame.setTxt(Data);

        addintablist(name, tabId);
        $(this).tab('show');
        showTab(tabId);
        registerCloseEvent();

        tabs.push({
            'caption': name,
            'command': 'openTab',
            'args': { 'URL': '#'+tabId}
        });
        return tabId;
    }
    else {
        if (!($("#" + type)[0])) {
            var tabId = type;

            $('.nav-tabs').append('<li><a href="#' + tabId + '" id="' + tabId + '_tab-li" data-toggle="tab"><i class="close closeTab fa fa-remove" type="button" ></i><i style="font-style: normal!important;">' + name + '</i></a></li>');
            $('#tab-box').append('<iframe class="tab-pane" id="' + tabId + '" style="width: 100%; height: 100%; border-width: 0px;"></iframe>');


            LoadUrl("", URL, "#" + tabId);

            addintablist(name, tabId);
            $(this).tab('show');
            showTab(tabId);
            registerCloseEvent();

            tabs.push({
                'caption': name,
                'command': 'openTab',
                'args': { 'URL': '#'+tabId}
            });

            return;
        }
        else {
            showTab(type);
        }
    }
};
//}

function registerCloseEvent() {
    $(".closeTab").parent().bind("DOMSubtreeModified",function(){
        var tabContentId = $(".closeTab").parent().attr("href");
        var sidetabid = '#sidetab-'+tabContentId.substr(1);
        var sidetext = $(sidetabid+" .name").html(); // sidebar text

        //getting tab new name
        var tabtext=($(".closeTab").parent().children()[1]).innerHTML

        //setting sidebar text
        $(sidetabid+" .name").html(tabtext);
    });
    $(".closeTab").click(function () {
        var tabContentId = $(this).parent().attr("href");
        
        var name = $(this).parent().children('i')[1].innerHTML;
        // removing tab from tab list
         tab = {
            'caption': name,
            'command': 'openTab',
            'args': { 'URL': tabContentId}
        }

        var index = tabs.indexOf(tab)
        tabs.splice(index, 1);

        var sidetabid = '#sidetab-'+tabContentId.substr(1);
        $(sidetabid).remove();
        if(!(tabContentId.match(/Editor/))){
            $(this).parent().parent().remove(); //remove li of tab
            $('#myTab a:last').tab('show'); // Select first tab
            $(tabContentId).remove(); //remove respective tab content
            document.getElementById('status').innerHTML = "Tab Closed";
        }
        else{
            var saved = document.getElementById(tabContentId.slice(1)).contentWindow.isSaved;
            if (saved){
                $(this).parent().parent().remove(); //remove li of tab
                $('#myTab a:last').tab('show'); // Select first tab
                $(tabContentId).remove(); //remove respective tab content
                document.getElementById('status').innerHTML = "Tab Closed";
            }
            else{
                ipc.send('open-information-dialog');
            }
            ipc.on('information-dialog-selection', function (event, index) {
                if (index === 0){
                    document.getElementById(tabContentId.slice(1)).contentWindow.save();
                }
                else if(index === 1){
                    $currentTab.parent().remove();
                    $('#myTab a:last').tab('show');
                    $(tabContentId).remove();
                }
            })
        }
    });

    
}

function showTab(tabId) {
    $('#myTab a[href="#' + tabId + '"]').tab('show');
}

function getCurrentTab() {
    return currentTab;
}

function LoadUrl(parms, url, loadDivSelector) {
    $(loadDivSelector).attr("src", url);
}

function getElement(selector) {
    var tabContentId = $currentTab.attr("href");
    return $("" + tabContentId).find("" + selector);
}

function removeCurrentTab() {
    var tabContentId = $currentTab.attr("href");
    var saved = document.getElementById(tabContentId).contentWindow.isSaved();
    if (saved){
        $currentTab.parent().remove();
        $('#myTab a:last').tab('show');
        $(tabContentId).remove();
    }
    else{
        ipc.send('open-information-dialog');
    }
}
$(document).on('shown.bs.tab', '#myTab a[data-toggle="tab"]', function (e) {
    var newtabid = "#sidetab-"+ e.target.id.replace('_tab-li', '')
    $(newtabid).addClass('active');
    var pretabid = "#sidetab-"+ e.relatedTarget.id.replace('_tab-li', '')
    var pretab = $(pretabid);
    if (pretab)
        $(pretabid).removeClass('active');
})
function sidetabopen(element){
    var tabid = element.querySelectorAll('.hidden')[0].innerHTML;
    showTab(tabid);
}
function closetab(element){
    var tabid = element.parentElement.querySelectorAll('.hidden')[0].innerHTML + "_tab-li";
    var closebtn = document.getElementById(tabid).querySelectorAll('.closeTab')[0];
    closebtn.click();
}












var hidWidth;
var scrollBarWidths = 40;

var widthOfList = function () {
    var itemsWidth = 0;
    $('.tab-list li').each(function () {
        var itemWidth = $(this).outerWidth();
        itemsWidth += itemWidth;
    });
    return itemsWidth;
};

var widthOfHidden = function () {
    return (($('.wrapper').outerWidth()) - widthOfList() - getLeftPosi()) - scrollBarWidths;
};

var getLeftPosi = function () {
    return $('.tab-list').position().left;
};

var reAdjust = function () {
    if (($('.wrapper').outerWidth()) < widthOfList()) {
        $('.scroller-right').show();
    }
    else {
        $('.scroller-right').hide();
    }

    if (getLeftPosi() < 0) {
        $('.scroller-left').show();
    }
    else {
        $('.item').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow');
        $('.scroller-left').hide();
    }
}

reAdjust();

$(window).on('resize', function (e) {
    reAdjust();
});

$('.scroller-right').click(function () {

    $('.scroller-left').fadeIn('slow');
    $('.scroller-right').fadeOut('slow');

    $('.tab-list').animate({ left: "+=" + widthOfHidden() + "px" }, 'slow', function () {

    });
});

$('.scroller-left').click(function () {

    $('.scroller-right').fadeIn('slow');
    $('.scroller-left').fadeOut('slow');

    $('.tab-list').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow', function () {

    });
});

$('#myTab').on('DOMSubtreeModified', function () {
    setTimeout(function () {
        reAdjust();
        $( "#myTab li a" )
  .mouseover(function() {
    $(this).addClass('hover')
  })
  .mouseout(function() {
    $( this ).removeClass('hover')
  });
    }, 100);
})