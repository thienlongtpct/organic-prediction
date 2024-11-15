/*

  http://chemapps.stolaf.edu/jmol/jsmol/jpge
  Jmol Point Group Explorer
  Bob Hanson, 2022.08.05-08
 
  BH 2024.03.07 added Hermann-Mauguin option 

  This page graphically displays point group symmetry operators for a model. 
  You can load any of the examples here or any file of your own.

  Many of the models are sourced from https://symotter.org/gallery
  with various adjustments and additions.

  Thank you, Dean Johnston, for that terrific page and the great struture list!

*/



		Jmol.Info.j2sPath = "../j2s"
		Jmol.Info.serverURL = "https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php"


isHM = document.location.href.indexOf("HM") >= 0;


spt = "symmetryHM=" + isHM + ";function findDrawnPointGroupElement(type, map) {\n" + 
    "  if (!map)\n" + 
    "    map = {};\n" + 
    "  var pg = {visible}.pointGroup();\n" + 
    "  var items = pg[type]; \n" + 
    "  if (items like null) return '0';\n" + 
    "  var p = (type == \"Cs\" ? {200 0 0} : {0 0 200});\n" + 
    "  var vz =  point(p, false) - point({0 0 0}, false);\n" + 
    "  vz /= vz; // unit vector pointing toward user\n" + 
    "  if (!map['nCn']) {\n" + 
    "    for (var k in pg) {\n" + 
    "      if (k[1] == 'n')\n" + 
    "        map[k] = pg[k];\n" + 
    "    }\n" + 
    "  }\n" + 
    "  if (!map[type])\n" + 
    "    map[type] = [];\n" + 
    "  var m = map[type];\n" + 
    "  var ret = '0';\n" + 
    "  if (type == 'Ci') {\n" + 
    "    m[1] = true;\n" + 
    "    return getDrawElement(type);\n" + 
    "  }\n" + 
    "  for (var i = 1; i <= items.length; i++) {\n" + 
    "    var v = items[i];\n" + 
    "    var v_dot_vz = abs(v.dot(vz));\n" + 
    "\n" + 
    "    if (v_dot_vz > 0.98)\n" + 
    "      ret = i;\n" + 
    "    if (ret == i || i > m.length)\n" + 
    "      m[i] = (ret == i);\n" + 
    "  }\n" + 
    "  return (ret > 0 ? getDrawElement(type, ret) : '0');\n" + 
    "}\n" + 
    "\n" + 
    "\n" + 
    "function getDrawElement(type, i) {\n" + 
    "  if (type == 'Ci')\n" + 
    "    return 'pg0_0_inv';\n" + 
    "  if (type == 'Cs')\n" + 
    "    return 'pgvp_0_' + i + '*';\n" + 
    "  return 'pgva_0_' + (type % -9999) + '_' + i; \n" + 
    "}\n" + 
    "\n" + 
    "\n" + 
    "";

dataDir = document.baseURI.substring(0, document.baseURI.lastIndexOf("/")).replace('///','/') + "/mol/";

defaultScript = "";

loadScript = ";set perspectiveDepth off;reset orientaion;rotate y $Y$;rotate x $X$;set platformspeed 7;font hover 24;set hoverlabel \"%[element]\";";


csdlink = "https://www.ccdc.cam.ac.uk/structures/Search?Ccdcid=$CSDID$";

drawCommand = ";draw scale 1.4 pointgroup;";

//Models=[['name','pointGroup','hm','label','special','doi','csd','fullName']// models.js

FILENAME = 0;
SFNAME = 1;
HMNAME = 2;
LABEL = 3;
SPECIAL = 4;
DOI = 5;
CSD = 6;

HMToSF = {}

;(function() {

	for (var i = 1; i < Models.length; i++) {
		var m = Models[i];
		HMToSF[m[SFNAME]] = m[HMNAME];		
		HMToSF[m[HMNAME]] = m[SFNAME];		
	}

})();

function getName(s) {	
	return isHM && HMToSF[s] || s;
}

quizMode = (document.location.search.indexOf("QUIZMODE") >= 0);
startupQuiz = quizMode;
quizzing = startupQuiz;

modelSelectHtml = "";
groupSelectHtml = "";

selectedModel = "";
selectedGroup = "";
ByGroup = {};
ByName = {};
GroupList = [];

quizNote = ''//"Explore the model by dragging it around using the left-mouse button. When you think you know what the point group is, click \"Toggle Symmetry\" to see what point group it is. Good luck!";

mSearchIndex = 0; // pointer to index in Models of added no-tag search term

QuizCounts = [0,0,0]; // [okrun, oktotal,totaltotal]

function setQuizCount(ok,notok) {
	if (notok)
		QuizCounts[0] = 0;
	QuizCounts[0] += ok;
	QuizCounts[1] += ok;
	QuizCounts[2]++;
	if (!ok) {
		QuizCounts[0] = 0; // end of streak
	} else if ((QuizCounts[0]%5) == 0) {
		alert("Wow! You have gotten " + QuizCounts[0] + " in a row right! Good Job!");	
	}
	$("#quizcount").html("Your score: " + QuizCounts[1] + "/" + QuizCounts[2]); 
}

function setQuizzing(isOn) {
	quizzing = isOn;
	Jmol.script(jmolApplet0,"background image " + (isOn? "'bggray4.png'" : "none;background @bgcolor") + (isOn ? ";draw pointgroup;draw off": ""));
	topEcho();
	$("#addremove")[0].style.visibility=(isOn ? "visible" : "hidden");
}

function getRandomModel(note) {
	if (!note && selectedModel) {
		getModel(-1);
	} else {
		getModel(rnd(1, Models.length)); 
	}
	if (note && quizNote) {
		alert(quizNote);
		quizNote = "";
	}
	setQuizzing(quizMode || note);
}

lowSymmetry = "CD";
highSymmetry = "SOT";


function setGroupList() {
	for (var i = 1; i < Models.length; i++) {
		var m = Models[i];
		var filename = m[FILENAME];
		var group = m[SFNAME];
		var symType = group.substring(0,1);
		m[LABEL] = m[LABEL].replace('<i>',"").replace('</i>',"");
		m[SPECIAL] = m[SPECIAL].replace('AROMATIC',"connect {visible}{visible} aromatic modify;calculate aromatic");
		mSearchIndex = m.length;
		m.push(stripTags(m[LABEL]+" " + filename));
		var key = (!quizMode ? group : lowSymmetry.indexOf(symType) >= 0 ? "Low Symmetry" : "High Symmetry");
		var g = ByGroup[key];
		if (!g) {
			ByGroup[key] = (g = []);
			if (quizMode) {
				GroupList.splice(0, 0, key);
			} else {
				GroupList.push(key);
			}
		}
		g.push(m);
		ByName[filename] = m;
	}
	if (!quizMode)
		GroupList.sort();
}



function setModelHTML() {
	var s = "<select style='width:180px' id='modelselect' onchange=getModel()><option value=''>Select a Model ($N$)</option>"
	var n = 0;
	if (selectedGroup) {
	for (var i = 0; i < GroupList.length; i++) {
		var g = GroupList[i];
		var models = ByGroup[g];
		if (!models || selectedGroup && g != selectedGroup)
			continue;
		for (var j = 0; j < models.length; j++) {
			var m = models[j];
			var name = m[FILENAME];
			s += "<option value='" + name + "' " + (selectedModel == name ? "SELECTED" : "") + ">" + (quizMode ? "" : getName(m[SFNAME]) + "  ") + m[LABEL] + "</option>"
			n++;
		}
	}
	} else {
		for (var j = 1; j < Models.length; j++) {
			var m = Models[j];
			var name = m[FILENAME];
			s += "<option value='" + name + "' " + (selectedModel == name ? "SELECTED" : "") + ">" + m[LABEL] + (quizMode ? "" : " (" + getName(m[SFNAME]) + ")") + "</option>"
			n++;
		}
	}
	s += "</select>"
	modelSelectHtml = s.replace("$N$",n);
}

function search() {
	var search = prompt("Enter part of a name to search for.");
	if (!search)return;
	search = search.toLowerCase();
	var s = "<select style='width:180px' id='modelselect' onchange=getModel()><option value=''>Select a Model ($N$)</option>"
	var n = 0;
	for (var j = 1; j < Models.length; j++) {
		var m = Models[j];
		if (m[mSearchIndex].toLowerCase().indexOf(search) >= 0) {
			s += "<option value='" + m[FILENAME] + "'>" + m[LABEL] + "  (" + getName(m[SFNAME]) + ")</option>"
			n++;
		}
	}  
	s += "</select>"
	modelSelectHtml = s.replace("$N$",n);
	$("#modelselectdiv").html(modelSelectHtml);
	$("#modelselect")[0].size = 4;
}


function getModelSelectHtml() {
	var xxxx = (document.location.search + "?").split("?")[SFNAME].split("&")[0].replace("QUIZMODE","");
	defaultScript = "";
	if (xxxx.length > 1) {
		selectedModel = xxxx
		if (xxxx.indexOf("load ") >= 0) {
			defaultScript = selectedModel;
		}
  	}
	setGroupList();

	var s = "<select style='width:180px' id='groupselect' onchange=setGroup() onkeypress=\"setTimeout('setGroup()',50)\"><option value=''>All Models</option>";
	for (var i = 0; i < GroupList.length; i++) {
		s += "<option value='" + GroupList[i] + "'>" + getName(GroupList[i]) + "</option>"
	}
	s += "</select>"
	groupSelectHtml = s;
	selectedGroup = "";
	setModelHTML();
}

getModelSelectHtml()



function setGroup() {
	var d  = document.getElementById("groupselect");
	selectedGroup = d.options[d.selectedIndex].value;
	setModelHTML();
	$("#modelselectdiv").html(modelSelectHtml);
	$("#modelselect")[0].size = 4;
}

function rnd(min,max) {
	return Math.floor(Math.random()*(max - min)) + min;
}

function fixPointGroupSubs(pg) {
	return (isHM ? getName(pg) : pg.length == 1 ? pg : pg.substring(0,1) + "<sub>" + pg.substring(1) + "</sub>");
}

function stripTags(name) {
	return name.replace("<sub>", "").replace("</sub>", "").replace("<sup>", "").replace("</sup>", "");
}

function getModel(n) {
	var d  = document.getElementById("modelselect");
	if (n != -1)
		selectedModel = (n ? Models[n][FILENAME] : d.options[d.selectedIndex].value);
	$("#thislink").html("");
	if (!selectedModel) return;
	var m = ByName[selectedModel];
	setThisLink(m);
	var draw = (quizzing ? "" : drawCommand);
	var special = m[SPECIAL];
	var loadAction = ";zoom 80;"+ special + draw + loadScript.replace("$X$", rnd(-90,90)).replace("$Y$", rnd(-90,90))
	Jmol.script(jmolApplet0, "modelTitle='" + fixPointGroupSubs(m[SFNAME]) + " " + m[LABEL] + "';modelTitleNoSubs='" + getName(m[SFNAME]) + " " + m[LABEL] + "';load " + dataDir + selectedModel + ".mol;" + loadAction);
	setQuizzing(quizMode);
}

function setThisLink(m) {
	var ref = (document.location.href + "?").split("?")[FILENAME] + "?" + m[FILENAME];	
	var s = "<a target=_blank href=" + ref + ">" + m[FILENAME] + "</a>"
		+"&nbsp;<a target=_blank href=" + ref + "&QUIZMODE>quiz</a>";
	if (m[CSD] != "0")
		s += "&nbsp;<a target=_blank href=" + csdlink.replace("$CSDID$", m[CSD]) + ">CSD</a>";
	if (m[DOI] != "0")
		s += "&nbsp;<a target=_blank href=https://doi.org/" + m[DOI] + ">reference</a>";
	$("#thislink").html(s);
}

function topEcho() {
	Jmol.script(jmolApplet0,"set echo top left;font echo 20 bold;echo " + (quizzing ? "Point group?" : "@modelTitle"));
}

function report(name) {
	var pg = Jmol.evaluateVar(jmolApplet0, "{visible}.pointgroup().name");
	Jmol.script(jmolApplet0, "modelTitle = '"+fixPointGroupSubs(pg)+"';modelTitleNoSubs = '"+getName(pg)+"'");
}

/// Jmol callbacks

function errorCallback(a, b, msg) {
 alert(msg)
}

function loadstructCallback() {
	document.getElementById("note").style.display = "block"
	document.getElementById("loading").style.display = "block"
	var mfile = Jmol.evaluateVar(jmolApplet0, "_modelFile");
	if (mfile.indexOf(dataDir) < 0){
		$("#thislink").html("");
		report("");
	}
	setQuizzing(quizzing || $("#cbquizmode")[0].checked);
	topEcho();
}

function pickCallback(a,b,i) {
	var d = document.getElementById("atomselect")
	d.selectedIndex = i + 3
	document.getElementById("chkatoms").checked = true
	getSelect()
}


addAxisNote = "Adjust the structure so that you are looking down an axis, then click this button.";
addPlaneNote = "Adjust the structure so that the left side of the structure is the mirror image of the right side of the structure, then click this button.";


function addRemove(what, isAdd) {
	if (what == "CnSn")
		what = prompt("Axis type (" + getName("C2") +", "+getName("S4")+", etc.)?","");
	what = (isHM ? getName(what) : what).toUpperCase();
	
	switch (what) {
	case "CI":
	case "S2":
		what = "Ci";
		break;
	case "CS":
		what = "Cs";
		break;
	case "C2":
	case "C3":
	case "C4":
	case "C5":
	case "C6":
	case "C8":
	case "S3":
	case "S4":
	case "S6":
	case "S8":
	case "S10":
	case "S12":
		break;
	default:
		alert(what + "? This needs to be one of: " 
			+ getName("C2") + "," + getName("C3") + "," + getName("C4") + "," + getName("C5") + "," + getName("C6") + "," + getName("C8") + "," + getName("S2") + "," + getName("S3") + "," + getName("S4") + "," + getName("S6") + "," + getName("S8") + "," + getName("S10") + "," + getName("S12"));
		return;
	}
	var id = Jmol.evaluateVar(jmolApplet0, "findDrawnPointGroupElement('"+what+"')");
	if (!id || id == "0") {
		if (what != "Ci" && what != "Cs" && addAxisNote) {
			alert(addAxisNote);
			addAxisNote = null;
		} else if (what == "Cs" && addPlaneNote) {
			alert(addPlaneNote);
			addPlaneNote = null;
		}
		Jmol.script(jmolApplet0,"background red;delay 0.10;background image 'bggray4.png';");
	} else {
		Jmol.script(jmolApplet0,"draw ID '" + id + "' on;set echo bottom center;echo good!;delay 1.0;echo \"\"");
	}
}

function checkAnswer(iKnow) {
	quizNote = null;
	var pg = Jmol.evaluateVar(jmolApplet0, "{visible}.pointgroup().name");
	var ok = (iKnow ? prompt("OK, what do you think the point group is?","") : null);
	ok = (ok == null ? null : (pg.toLowerCase().trim() == getName(ok).toLowerCase().trim()));
	if (iKnow)
	    alert(ok ? "Correct! The point group is " + getName(pg) : "Sorry, try again!");
	if (ok) {
		Jmol.script(jmolApplet0, drawCommand);
		setQuizzing(false);
		setQuizCount(1,0);
	} else {
		setQuizCount(0,1);
		if (!iKnow)
			toggleSymmetry();
	}
}

function toggleSymmetry() {
	if (quizzing)
		Jmol.scriptWait(jmolApplet0, "draw delete");
	setQuizzing(false);
	var script = "select off *;if(!script('draw list').trim()){" + drawCommand + "symon='';}else if(symon==modelTitle){draw on;symon=''}else{draw off;symon=modelTitle};";
	Jmol.script(jmolApplet0, script);
}

function toggleQuizMode(isON) {
	
	document.location.replace((document.location.href + "?").split("?")[0] + (isON? "?QUIZMODE" :""));

}

function pageLoaded() {
	if (!quizMode)
		document.getElementById("btnquizme").style.visibility="hidden";
	getRandomModel(0);
}