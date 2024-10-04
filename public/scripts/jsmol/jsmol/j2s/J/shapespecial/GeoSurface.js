Clazz.declarePackage("J.shapespecial");
Clazz.load(["J.shapespecial.Dots"], "J.shapespecial.GeoSurface", null, function(){
var c$ = Clazz.declareType(J.shapespecial, "GeoSurface", J.shapespecial.Dots);
Clazz.defineMethod(c$, "initShape", 
function(){
Clazz.superCall(this, J.shapespecial.GeoSurface, "initShape", []);
this.isSurface = true;
this.translucentAllowed = true;
});
});
;//5.0.1-v4 Wed Sep 18 20:00:22 CDT 2024
