var hud = (function ($, Handlebars, Fuse) {

    /* Member Vars */
    var isCreated = false;
    var isVisable = false;
    var allSuggestions = [];
    var currentSuggestions = [];
    var selectedSuggestionIndex = 0;
    var fuse;

    /* Cached Divs */
    var ccpHUDDiv;
    var suggestionsDiv;
    var commandFieldDiv;

    /* Templates */
    var TEMPLATE_SOURCE_CCP_HUD = '<div id="ccpHUD"><div id="commandBar"><input type="text" id="commandField" autocomplete="off" placeholder="Type \'?\' to get help."></div><div id="suggestions"></div></div>';
    var TEMPLATE_SOURCE_SUGGESTIONS = '<div class="suggestion"><span class="cmd">{{this.cmd}}</span><span class="caption">{{this.caption}}</span><span class="shortcut">{{this.shortcut}}</span></div>';
    var templateSuggestion;

    /* Consts */
    var DEFAULT_SUGGESTIONS = [{
        'caption': 'Package Control: Install',
        'command': 'Test'
    }];

    $(window).click(function() {
        isVisable ? hide(): show
    });

    $('#menucontainer').click(function(event){
        event.stopPropagation();
    });

    function initialize() {
        allSuggestions = DEFAULT_SUGGESTIONS;
        templateSuggestion = Handlebars.compile(TEMPLATE_SOURCE_SUGGESTIONS);

        $(document).ready(function () {
            $(document).on('keydown', function (event) {
                // Hide and Show
                if ((80 === event.which) && event.metaKey) {
                    event.preventDefault();
                    if (isVisable) {
                        hide();
                    } else {
                        // chrome.runtime.sendMessage({'action': 'GetDefaultSuggestions'}, function(response) {
                        //   presentSuggestions(response);
                        // });
                    }
                }
                // Submit Command
                if (isVisable && (13 === event.which) && (currentSuggestions.length > 0)) {
                    var current_index = $('.suggestion.active').index();
                    runCommand(currentSuggestions[current_index]);
                    hide();
                }
                if (event.which === 38) { //active upper
                    activate('u');
                } else if (event.which === 40) { //active lower
                    activate('l');
                } else if (event.which === 27 && isVisable){ // escape
                    hide();
                }


            });
        });
    }

    function activate(dir) {
        var current_index = $('#suggestions .active').index();
        var $suggestionListDiv = $('#ccpHUD #suggestions');
        var $options = $suggestionListDiv.find('.suggestion');
        var items_total = $options.length;

        if (current_index == -1){
            current_index = 0;
            $suggestionListDiv.animate({
                scrollTop: $options.eq(0).offset().top - $suggestionListDiv.offset().top + $suggestionListDiv.scrollTop()
            }, 200);
            $options.eq(0).addClass('active');
            return;
        }

        var nextIndex;
        if (dir === 'u')
            nextIndex = current_index - 1;
        else if (dir === 'l')
            nextIndex = current_index + 1;
        

        if (nextIndex >= items_total)
            nextIndex =0;
        else if(nextIndex == -1)
            nextIndex = items_total-1;

        $options.removeClass('active');
        $suggestionListDiv.animate({
            scrollTop: $options.eq(nextIndex).offset().top - $suggestionListDiv.offset().top + $suggestionListDiv.scrollTop()
        }, 10);
        $options.eq(nextIndex).addClass('active');
    }

    function create() {
        if (isCreated) {
            return;
        }

        $(TEMPLATE_SOURCE_CCP_HUD).appendTo('#pane_main');

        ccpHUDDiv = $('#ccpHUD');
        suggestionsDiv = $('#suggestions', ccpHUDDiv);
        commandField = $('#commandField', ccpHUDDiv);

        // bind update suggestions on suggestions change 
        $(commandField).on('input', handleCommandFieldChanged);

        isCreated = true;
    }

    function handleCommandFieldChanged() {
        var fieldText = $(commandField).val();
        if (fieldText === '') {
            updateSuggestions(tabs);
        } else {
            if (fieldText === "?") {
                updateSuggestions(helpCmds);
            }
            else if (fieldText === ">") {
                presentSuggestions(allCmds)
            }
            else if (fieldText === "#") {
                presentSuggestions(hudJson);
            }
            else if (fieldText === "!") {
                presentSuggestions(hudExamples);
            }
            else {
                if (fieldText.charAt(0) === "?" ||
                    fieldText.charAt(0) === ">" ||
                    fieldText.charAt(0) === "#" ||
                    fieldText.charAt(0) === "!")
                    var results = fuse.search(fieldText.slice(1));
                else
                    var results = fuse.search(fieldText);
                updateSuggestions(results);
            }
        }
    }

    function hide() {
        if (!isVisable) {
            return;
        }

        $(ccpHUDDiv).hide();
        $(suggestionsDiv).empty();
        $(commandField).val('');
        isVisable = false;
    }
    function isShown(){
        return isVisable ? true: false;
    }
    function show() {
        if (isVisable) {
            return;
        }

        if (!isCreated) {
            create();
        }

        $(ccpHUDDiv).show();
        isVisable = true;
        $(commandField).focus();
    }

    function presentSuggestions(suggestions) {
        allSuggestions = suggestions; // Update the list of all suggestions              
        var fuseOptions = {
            shouldSort: true,
            threshold: 0.3,
            keys: ['caption']
        };      // Use the caption as the fuzzy search key
        fuse = new Fuse(allSuggestions, fuseOptions); // Create a new fuse object of the new list of suggestions
        //$(commandField).val('');
        updateSuggestions(allSuggestions);
    }

    function updateSuggestions(suggestions) {
        
        currentSuggestions = suggestions;
        selectedSuggestionIndex = 0;
        $(suggestionsDiv).empty();
        currentSuggestions.forEach(function (suggestion, index, array) {
            var suggestionString = templateSuggestion(suggestion);
            $(suggestionsDiv).append(suggestionString);
        });
    }

    function runCommand(suggestion) {
        if (suggestion.command == 'openTab')
            openTabById(suggestion.args.URL)
        else if (suggestion.command == 'openShell')
            ipc.send('run-shell', '');
        else if (suggestion.command == 'closeAll')
            closeAllTabs();
        else if (suggestion.command == 'openDocs')
            addDocTab(suggestion.caption);
        else if (suggestion.command == 'openExample')
            addExampleTab(suggestion.caption);
    }  

    var exports = {
        'initialize': initialize,
        'presentSuggestions': presentSuggestions,
        'hide': hide,
        'show': show,
        'isShown': isShown,
        'updateSuggestions': updateSuggestions
    };

    return exports;
})($, Handlebars, Fuse);

$(document).ready(function () {
    hud.initialize();
});