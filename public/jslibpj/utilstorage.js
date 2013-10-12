//create the facility to determine amount of requests at once
//have a get function that we can use
//have a list of the spreadsheets you want
//we need the facility to test for when the data needs to be refreshed
var GdLocalStorage = function() {
  this.memStorage = {};
};
GdLocalStorage.prototype._getGdReqStr = function(gdKey) {
  return "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D'https%3A%2F%2Fdocs.google.com%2Fspreadsheet%2Fpub%3Fhl%3Den_US%26hl%3Den_US%26key%3D"+gdKey+"%26output%3Dcsv'&format=json";
}
GdLocalStorage.prototype._processCsvResp = function(dataKey) {
  return function(respData) {
  var headings=respData.query.results.row[0];
  var resList=[];
  for (var x=1,rowItem;rowItem=respData.query.results.row[x];x++) {
    resList.push({});
    for (heading in headings) {
      resList[resList.length-1][headings[heading]]=rowItem[heading];
    }
  }
  var serData = JSON.stringify(resList);
  locaGdLocalStorage[dataKey]=serData;
  this.memStorage[dataKey]=resList;
  }
}

GdLocalStorage.prototype._processGd = function(dataKey,keyMap) {
  if (this.memStorage[dataKey]) {
  }
  else if (localStorage[dataKey] && this.memStorage[dataKey]==undefined) {
    this.memStorage[dataKey]=jQuery.parseJSON(localStorage[dataKey]);
  }
  else {
    $.getJSON(this._getGdReqStr(keyMap[dataKey]), this._processCsvResp(dataKey));
  }
}