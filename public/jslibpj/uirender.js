
var uiRender = {};

uiRender.fmtOutStr =function(inpnum) {
    var strnum = inpnum+"";
    if (strnum.split(".").length==2) {
	return strnum.split(".")[0]+"."+strnum.split(".")[1][0]+strnum.split(".")[1][1]
    }
    else {
      return inpnum;
    }
}

uiRender.getTemplateMapFn =function(tKey) {
    if (templateMap[tKey]["fn"]==undefined) {
      templateMap[tKey]["fn"]=jade.compile(templateMap[tKey]["templatecode"],{});
    }
    return templateMap[tKey]["fn"];
}

uiRender.mapToPath =function(inpUser) {  
  var retPath = "/rest/"+inpUser.navitem["restdata"]["resource"];
  for (var key in inpUser.navitem["restdata"]["filter"]) {
    retPath = retPath+"/"+key+":"+inpUser.navitem["restdata"]["filter"][key];
  }
  if (inpUser.navitem["restdata"]["filter_user"]!=undefined) {
    for (var key in inpUser.navitem["restdata"]["filter_user"]) {
      retPath = retPath+"/"+key+":"+inpUser[key];
    }    
  }
  if (inpUser.navitem["restdata"]["collection"]=="yes") {
    retPath = retPath+"/";  
  }
  return retPath;
}


var ExpressionExp = function(fnList) {
this._fnList=fnList;
}
ExpressionExp.prototype.verifyNameList = function(inpList,lro) {
}
ExpressionExp.prototype._opFnList=[
{"name":"Equal To","fn":function(inp1,inp2){return inp1===inp2;}},
{"name":"Greater Than","fn":function(inp1,inp2){return inp1>inp2;}},
{"name":"Less Than","fn":function(inp1,inp2){return inp1<inp2;}}
];

ExpressionExp.prototype._getFn=function(inpName,rlo) {
  var tmpList = [];
  if (rl=="r" || rl=="l") {
    tmpList = this._fnList;
  }
  else {
    tmpList = this._opFnList;
  }
  for (var i=0,item;item=tmpList[i];i++) {
    if (item["name"]==inpName) {
      return item["fn"];
    }
  }
  return null;
};
//determine if the selection should return a list of the matches or something else

ExpressionExp.prototype.createSelection=function(inpList,selectedSeasonDiv) {
  var retSelection=[], selectFnList = [];
  for (var y=0,fMItem;fMItem=inpList[y];y++) {
    if (inpList[y]["op"] && inpList[y]["l"] && inpList[y]["r"]) {
    selectFnList.push({expFn:ExpressionExp._getFn(inpList[y]["op"],"o"),
    lFn:ExpressionExp._getFn(inpList[y]["l"],"l"),
    rFn:ExpressionExp._getFn(inpList[y]["r"],"r")});
  }}
  var totalCount,filCount;
  for (var x=0,seasonDiv;seasonDiv=selectedSeasonDiv[x];x++) {
    totalCount=0;filCount=0;  
    for (var y=0,matchItem;matchItem=lStorage.memStorage[seasonDiv][y];y++) {  
      calcExp=true;
      for (var z=0,selectFn;selectFn=selectFnList[z];z++) {
	if (selectFn.expFn(selectFn.lFn(matchItem),selectFn.rFn(matchItem))==false) {
	  calcExp=false;
	}
      }
      if (calcExp==true) {filCount++;}
      totalCount++;
    }      
  retSelection.push(parseInt(1000*filCount/totalCount)/10)
  }
  return retSelection;
}

//{"id1":{"deps":[":all","betmarket"],"dynamicfields":["hometeam","awayteam"]}};

uiRender.LinkedView=function(inpIdMap,inpDynamicData,inpNonDomIdMap) {
  this.idMap = inpIdMap;
  this.dynamicData = inpDynamicData;
  this.valueMap = {};
  //  
  this.nonDomIdMap = inpNonDomIdMap;
  this.nonDomStatusMap = {};  
  for (var key in this.inpDomIdMap) {
  this.nonDomStatusMap[key]=false;
  }
  
}

uiRender.LinkedView.prototype._actionsArray = [":any",":all"];

uiRender.LinkedView.prototype._processActionArray=function (inpArray) {
  if (inpArray[0]==":any") {
    if (jQuery.inArray("true",inpArray)!=-1) { return "true"; }
    else { return "false"; }
  }
  else {
  if (jQuery.inArray("false",inpArray)==-1) { return "true"; }
    else { return "false"; }
  }
}

uiRender.LinkedView.prototype._getDepLogic = function (inpArr) {
var thisActionArray=[];
var thisAction;
if (jQuery.inArray(inpArr[0],this._actionsArray)!=-1) {
  thisActionArray.push(inpArr[0]);
  for (var x =1,arrayItem;arrayItem=inpArr[x];x++) {
    if (jQuery.inArray(arrayItem[0],this._actionsArray)!=-1) {
      thisAction=this._getDepLogic(arrayItem);
    }
    else {
      thisAction=""+this._isSet(arrayItem);
    }
    if (inpArr[0]==":all" && thisAction=="false") {
      return "false";
    }
    else if (inpArr[0]==":any" && thisAction=="true") {
      return "true";
    }
    thisActionArray.push(thisAction);
    }
  return this._processActionArray(thisActionArray);
}
else {
    return this._getDepLogic(inpArr[0]);
}}

uiRender.LinkedView.prototype._getDynamicList = function(key) {
  var dynamicFieldList = [];
  if (this.idMap[key]["dynamicfields"]!=undefined && this.idMap[key]["dynamicfields"].length>0) {
    dynamicFieldList = this.idMap[key]["dynamicfields"];
  }
  else {
    dynamicFieldList = [key];
  }
  var useDynamicRecord,dynamicComp;
  var retDynamicList = [];
  for (var j=0,outerKey;outerKey= dynamicFieldList[j];j++) {
    for (var i=0,potentialRecord;potentialRecord=this.dynamicData[i];i++) {
      useDynamicRecord=true;    
      for (var innerKey in this.idMap) {
	if ((potentialRecord[innerKey]!=undefined) && (innerKey!=outerKey)) {
	  if ((this._isSet(innerKey)==true) && (this.valueMap[innerKey]!=potentialRecord[innerKey])) {
	    useDynamicRecord=false;
	  }
	}
      }
      if (useDynamicRecord==true && jQuery.inArray(potentialRecord[outerKey],retDynamicList)==-1) {
	retDynamicList.push(potentialRecord[outerKey]);
      }
    }
  }
  return retDynamicList;
}

uiRender.LinkedView.prototype._makeUnAvailable = function(inpId) {
var item = $("#"+inpId);
  if (item!=undefined) {
    if (item.is("input") && item.attr("type") =="text") {
      item.attr("value","");
      item.attr("disabled","disabled");
    }
    else if (item.is("select")==true) {
      item.attr("value","pleaseselect");
      item.attr("disabled","disabled");
    }
  }
}


uiRender.LinkedView.prototype._arraysEqual = function(array1,array2) {
    if (array1.length != array2.length) { return false; }
    var a = array1.sort(),
        b = array2.sort();
    for (var i = 0; array1[i]; i++) {
        if (a[i] != b[i]) { 
                return false;
        }
    }
    return true;
};


uiRender.LinkedView.prototype._makeAvailable = function(inpId,inpDynamicList) {
var item = $("#"+inpId);
  if (item!=undefined) {
    if (item.is("input") && item.attr("type") =="text") {
      item.removeAttr("disabled");
    }
    else if (item.is("select")==true) {
      item.removeAttr("disabled");
      if (inpDynamicList && inpDynamicList.length>0) {
	var existList=[];
	$("#"+inpId+" option").each(function(idx,listItem) {
	  if (idx!=0) {existList.push(listItem.value)}});
	var theseArraysEqual=this._arraysEqual(existList,inpDynamicList);
	if (theseArraysEqual==false) {
	  item.empty();
	  var newHtml = "<option value=pleaseselect>Please Select</option>";
	  for (var i=0,itemName;itemName=inpDynamicList[i];i++) {
	    newHtml = newHtml+"<option value="+itemName+">"+itemName+"</option>"
	  }
	  item.wrapInner(newHtml);
	}
      }
    }
  }
}

uiRender.LinkedView.prototype._isSet = function(inpId) {
var item = $("#"+inpId);

  if (item!=undefined) {
    if (item.is("input") && item.attr("type") =="text") {
      if (item.attr("value").length>0) {return true;}
    }
    else if (item.is("select")==true) {      
      if (item.attr("value")!="pleaseselect") {return true;}
    }
  }
  return false;
}

uiRender.LinkedView.prototype.updateComponents = function(e) {
  for (var thisId in this.idMap) {
    this.valueMap[thisId] = $("#"+thisId).attr("value");
  }  
  
  console.log("1");
  var eId = e.target.id;
  var eIsSet = this._isSet(eId);
  console.log(eIsSet);
  
  var shouldBeSet;
  var dynamicList=[];
  for (var key in this.idMap) {
    if (this.idMap[key]["deps"] && jQuery.inArray(eId,this.idMap[key]["deps"])!=-1) {
      shouldBeSet = this._getDepLogic(this.idMap[key]["deps"]);	
      if (this.idMap[key]["dynamicfields"]) {
	dynamicList = this._getDynamicList(key);
      }
      if (shouldBeSet=="true" && this._isSet(key)==false) {
	this._makeAvailable(key,dynamicList);
      }
      else if (shouldBeSet=="true" && dynamicList.length>0) {
	this._makeAvailable(key,dynamicList);
      }
      else if (shouldBeSet=="false") {this._makeUnAvailable(key);}
    }
  }
  var prevNonDomStatus,nonDomStatus;
  for (var key in this.nonDomIdMap) {
      prevNonDomStatus = this.nonDomStatusMap[key];
    nonDomStatus = this._getDepLogic(this.nonDomIdMap[key]["deps"]);	
      this.nonDomStatusMap[key] = nonDomStatus;
      if (prevNonDomStatus != nonDomStatus) {
	//create an event!
      }      
  }  
}  

function MapCalc() {
  this.operatorMap = {
  ">":function(inpArr) {return inpArr[0]>inpArr[1];},
  "<":function(inpArr) {return inpArr[0]<inpArr[1];},
  "==":function(inpArr) {return inpArr[0]==inpArr[1];},
  "&&":function(inpArr) {return inpArr.reduce(function(x,y){return x&&y;},true);},
  "||":function(inpArr) {return inpArr.reduce(function(x,y){return x||y;},true);}
  }
}

MapCalc.prototype.calc = function (inpOutcomeMap,inpLogic) {
  var resArray = [];
  for (var i = 1,logicItem;logicItem=inpLogic[i];i++) {
    if (typeof logicItem == "object") {
      resArray.push(this.calc(inpOutcomeMap,logicItem)); 
    }
    else if (inpOutcomeMap[logicItem]!=undefined) {
      resArray.push(inpOutcomeMap[logicItem]);
    }
    else {
      resArray.push(logicItem);
    }
  }
  return this.operatorMap[inpLogic[0]](resArray);
}


;


