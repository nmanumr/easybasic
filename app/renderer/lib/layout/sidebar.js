var sidebar_tabs =[
    {icon: "icon-note", isnotification: false, id: "explorer_tab"},
    {icon: "icon-list", isnotification: false, id: "examples_tab"},
    {icon: "icon-docs", isnotification: false, id: "file_comparer_tab"},
    {icon: "icon-notebook", isnotification: false, id: "docs_tab"}
]

app.controller('minisidebarCrtl', function($scope) {
    $scope.tabs = sidebar_tabs;
});
var explorerAcc, openedTabsAcc,
    recentFilesAcc, openedTabsTree,
    recentFilesTree;
$(document).ready(function(){
    $('#explorer_acc').height($('#sidebar_content').height()-45);
	SideBar = main_layout.cells('a');
	SideBar.setWidth('200');
	SideBar.hideHeader();
    SideBar.attachObject('sidebar_content');

    explorerAcc = new dhtmlXAccordion({
        parent: "explorer_acc",
        multi_mode: true,
        items: [
            {id: "opened_tabs_acc", text: "Tabs", height: "*"},
            {id: "recent_files_acc", text: "Recent Files", height: "*"}
        ]
    });
    explorerAcc.enableDND();
    openedTabsAcc = explorerAcc.cells('opened_tabs_acc');
    recentFilesAcc = explorerAcc.cells('recent_files_acc');

    openedTabsTree = openedTabsAcc.attachTree();
        openedTabsTree.enableSmartXMLParsing(true);
        openedTabsTree.enableDragAndDrop(true);
        openedTabsTree.setDragBehavior("sibling");

    recentFilesTree = recentFilesAcc.attachTree();
        recentFilesTree.enableSmartXMLParsing(true);
        recentFilesTree.enableDragAndDrop(true);
        recentFilesTree.setDragBehavior("sibling");

    main_layout.attachEvent("onPanelResizeFinish", function(names){
        $('#explorer_acc').height($('#sidebar_content').height()-45);
        explorerAcc.setSizes();
    });

    main_layout.progressOff();   
});

var resizeTimer;

$(window).on('resize', function(e) {
   $('#explorer_acc').height($('#sidebar_content').height()-45); 
   explorerAcc.setSizes();
});