var myTree;
$(document).ready(function () {
    // myTree = new dhtmlXTreeView("doc_list_div", 100, 100);
    myTree = new dhtmlXTreeView({
				parent: "doc_list_div",
                dnd: true,
				items: docs_data
			});
    myTree.selectItem("1");
    myTree.setSizes();
    myTree.attachEvent("onBeforeDrag", function(id){
        parentId = myTree.getParentId(id);
        return true;
    });
    myTree.attachEvent("onDragOver", function(id, pId, index){
        if (pId == parentId) return true;
        return false;
    });
})