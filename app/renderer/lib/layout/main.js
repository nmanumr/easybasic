var app = angular.module('easybasic', []);


var myMenu;
var main_layout;
var bottom_pane;
var main_pane;
var main_tabber;
var SideBar;
var bottom_tabber;
function doOnLoad() {
	myMenu = new dhtmlXMenuObject("menuObj");
	myMenu.setIconsPath("awesome");
	// initing
	myMenu.addNewSibling(null, "file", "File", false);
		myMenu.addNewChild("file", 0, "new", "New", false, "");
		myMenu.addNewSeparator("new");
		myMenu.addNewChild("file", 2, "open", "Open", false, "");
		myMenu.addNewChild("file", 3, "save", "Save", false, "");
		myMenu.addNewChild("file", 4, "saveAs", "Save As...", true, null, "");
		myMenu.addNewSeparator("saveAs");
		myMenu.addNewChild("file", 6, "print", "Print", false, "");
		myMenu.addNewChild("file", 7, "pageSetup", "Page Setup", true, null, "");
		myMenu.addNewSeparator("pageSetup");
		myMenu.addNewChild("file", 12, "close", "Close", false, "");
	myMenu.addNewSibling("file", "edit", "Edit", false);
		myMenu.addNewChild("edit", 0, "edit_undo", "Undo", false, "");
		myMenu.addNewSibling("edit_undo", "edit_redo", "Redo", false, "");
		myMenu.addNewSeparator("edit_redo", "sep_1");
		myMenu.addNewSibling("sep_1", "edit_select_all", "Select All", false, "");
		myMenu.addNewSeparator("edit_select_all", "sep_2");
		myMenu.addNewSibling("sep_2", "edit_cut", "Cut", false, "");
		myMenu.addNewSibling("edit_cut", "edit_copy", "Copy", false, "");
		myMenu.addNewSibling("edit_copy", "edit_paste", "Paste", false, "");
	myMenu.addNewSibling("edit", "help", "Help", false);
		myMenu.addNewChild("help", 0, "about", "About...", false, "");
		myMenu.addNewChild("help", 1, "help2", "Help", false, "");
		myMenu.addNewChild("help", 2, "bugrep", "Bug Reporting", false, "");


	main_layout = new dhtmlXLayoutObject("sidebarObj", '3L', "material");
	main_layout.progressOn();
	main_pane = main_layout.cells('b');
	main_tabber = main_pane.attachTabbar();
	main_tabber.enableTabCloseButton(true);
    main_tabber.setArrowsMode('always')
	main_tabber.addTab('tab_4','tab_4');
    main_tabber.addTab('tab_5','tab_5');
	var tab_4 = main_tabber.cells('tab_4');
	tab_4.setActive();


	bottom_pane = main_layout.cells('c');
	bottom_pane.collapse();
	bottom_pane.setHeight('100');
	bottom_tabber = bottom_pane.attachTabbar();
	bottom_tabber.addTab('tab_2','tab_2');
	var tab_2 = bottom_tabber.cells('tab_2');
	tab_2.setActive();
}

$(document).ready(function(){
	var contentHeight=$('.mdl-layout__content').height();
	var footerHeight=$('.footer').height();
	$('.page-content').height(contentHeight-footerHeight);
	$('#sidebarObj').height(contentHeight-footerHeight);
	$('#sidebarObj').width($(window).width()-$('.mini-sidebar').width());
});
$( window ).resize(function(){
	var contentHeight=$('.mdl-layout__content').height();
	var footerHeight=$('.footer').height();
	$('.page-content').height(contentHeight-footerHeight);
	$('#sidebarObj').height(contentHeight-footerHeight);
	$('#sidebarObj').width($(window).width()-$('.mini-sidebar').width());
	main_layout.setSizes();
	bottom_pane.collapse();
})
