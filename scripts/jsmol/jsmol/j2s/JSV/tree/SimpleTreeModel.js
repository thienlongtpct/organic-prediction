Clazz.declarePackage("JSV.tree");
(function(){
var c$ = Clazz.decorateAsClass(function(){
this.rootNode = null;
Clazz.instantialize(this, arguments);}, JSV.tree, "SimpleTreeModel", null);
Clazz.makeConstructor(c$, 
function(rootNode){
this.rootNode = rootNode;
}, "JSV.api.JSVTreeNode");
Clazz.defineMethod(c$, "insertNodeInto", 
function(fileNode, rootNode, i){
var node = rootNode;
node.$children.add(i, fileNode);
(fileNode).prevNode = node;
}, "JSV.api.JSVTreeNode,JSV.api.JSVTreeNode,~N");
Clazz.defineMethod(c$, "removeNodeFromParent", 
function(node){
(node).prevNode.$children.removeObj(node);
}, "JSV.api.JSVTreeNode");
})();
;//5.0.1-v4 Wed Sep 18 20:00:22 CDT 2024
