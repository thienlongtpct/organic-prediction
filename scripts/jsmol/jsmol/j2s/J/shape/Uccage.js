Clazz.declarePackage("J.shape");
Clazz.load(["J.shape.FontLineShape"], "J.shape.Uccage", null, function(){
var c$ = Clazz.declareType(J.shape, "Uccage", J.shape.FontLineShape);
Clazz.overrideMethod(c$, "setProperty", 
function(propertyName, value, bs){
this.setPropFLS(propertyName, value);
}, "~S,~O,JU.BS");
Clazz.defineMethod(c$, "initShape", 
function(){
Clazz.superCall(this, J.shape.Uccage, "initShape", []);
this.font3d = this.vwr.gdata.getFont3D(16);
this.myType = "unitcell";
});
});
;//5.0.1-v4 Wed Sep 18 20:00:22 CDT 2024
