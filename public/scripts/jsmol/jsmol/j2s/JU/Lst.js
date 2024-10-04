Clazz.declarePackage("JU");
Clazz.load(["java.util.ArrayList"], "JU.Lst", null, function(){
var c$ = Clazz.declareType(JU, "Lst", java.util.ArrayList);
Clazz.defineMethod(c$, "addLast", 
function(v){
{
return this.add1(v);
}}, "~O");
Clazz.overrideMethod(c$, "add", 
function(pos, v){
{
return this.add2(pos, v);
}}, "~N,~O");
Clazz.defineMethod(c$, "removeItemAt", 
function(location){
{
return this._removeItemAt(location);
}}, "~N");
Clazz.defineMethod(c$, "removeObj", 
function(v){
{
return this._removeObject(v);
}}, "~O");
});
;//5.0.1-v4 Wed Sep 18 20:00:22 CDT 2024
