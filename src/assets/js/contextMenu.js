$(function(){
    /**************************************************
     * Custom Command Handler
     **************************************************/
    $.contextMenu.types.label = function(item, opt, root) {
        this === item.$node

        $('<span>'+ item.text + '</span>'+
            '<span class="pull-right shortcut">'+ item.shortcut + '</span>')
            .appendTo(this)
    };

    /**************************************************
     * Context-Menu with custom command "label"
     **************************************************/
    $.contextMenu({
        selector: 'null',
        items: {
            "close": {
                type: "label",
                text: "Close This Tab",
                shortcut: "Ctrl + W",
                callback: function(key, opt){
                    $(this).children('a').children('.close').click();
                }
            },
            "closeAll": {
                type: "label",
                text: "Close All", 
                shortcut: "",
                callback: function(key, opt){
                    closeAllTabs();
                }
            },
            "sep1": "---------",
            "save": {type: "label", text: "Save", shortcut: ""},
            "saveAll": {type: "label", text: "Save All", shortcut: ""},
            "sep2": "---------",
            "run": {type: "label", text: "Run", shortcut: ""},
            "runAll": {type: "label", text: "Run All", shortcut: ""},
        }
    });
});