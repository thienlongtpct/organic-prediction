Clazz.declarePackage("J.shapebio");
Clazz.load(["J.shapebio.Strands"], "J.shapebio.MeshRibbon", null, function(){
var c$ = Clazz.declareType(J.shapebio, "MeshRibbon", J.shapebio.Strands);
Clazz.overrideMethod(c$, "initShape", 
function(){
this.isMesh = true;
});
});
;//5.0.1-v4 Wed Sep 18 20:00:22 CDT 2024
