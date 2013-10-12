(function () {
var betinfo={}

var root = this;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = betinfo;
}
else {
    root.betinfo = betinfo;
}

betinfo._roundOdds = function(inpnum) {  
  if (inpnum < 10) {
    return Math.round(inpnum*1000)/1000;  
  }
  else if (inpnum < 50) {
    return Math.round(inpnum*100)/100;  
  }
  else {
    return inpnum;
  }
}


betinfo.bmQMap = {};
betinfo.betinfo = function (selectionname,betkey,htft) {
  this.asGoals=null;
  this.selectionname = selectionname;
  this.betkey=betkey;
  this.betmarket=betkey.split("_")[0]
  if (!betinfo.bmQMap[this.betmarket]) {betinfo.bmQMap[this.betmarket]=[];}  
  betinfo.bmQMap[this.betmarket].push(betkey);
  this.bettype=betkey.split("_")[1]
  this.htft=htft;  
  this.adjaeg = function() {
  if (this.htft=="ht") {return 0.5;}
  else if (this.htft=="ft") {return 1.0;}
  }
}
//betinfo.prototype.adjaeg=function() { if (this.htft=="ht") {return 0.5;} else {return 1.0;}}
//betinfo_OU.prototype=new betinfo();
//betinfo_CS.prototype=new betinfo();
//betinfo_HAD.prototype=new betinfo();
//betinfo_HA.prototype=new betinfo();
//betinfo_HADHAD.prototype=new betinfo();

betinfo.betinfo_OU = function(selectionname,betkey,htft,ou,goals) {
  betinfo.betinfo.call(this, selectionname,betkey, htft);
  this.poimodel="g";
  this.asGoals=["normal",goals];
  this.goals=goals;
  this.ou=ou;
}

betinfo.betinfo_TeamGoals = function(selectionname,betkey,htft,team1_ou,team1_goals,team2_ou,team2_goals) {
  betinfo.betinfo.call(this, selectionname,betkey, htft);
  this.poimodel="g";
  this.team1_goals=team1_goals;
  this.team1_ou=team1_ou;
  this.team2_goals=team2_goals;
  this.team2_ou=team2_ou;    
}

betinfo.betinfo_HAD = function(selectionname,betkey,htft,had) {
  betinfo.betinfo.call(this, selectionname,betkey, htft);
  if (had=="h" || had=="a") {
    this.asGoals=["inv",0];
  }
  else if (had=="d") {
    this.asGoals=["normal",0];
  }
  this.poimodel="ha";
  this.had=had;
}
betinfo.betinfo_HA =function (selectionname,betkey,htft,ha) {
  betinfo.betinfo.call(this, selectionname,betkey, htft);
  this.poimodel="ha";
  this.asGoals=["inv",0];
  this.ha=ha;
}
betinfo.betinfo_CS = function(selectionname,betkey,htft,hot_goals,awt_goals,oth) {
  betinfo.betinfo.call(this, selectionname,betkey, htft);
  if (oth==false && hot_goals>=awt_goals) {
  this.asGoals = ["normal",hot_goals-awt_goals];
  }
  else if (oth==false && hot_goals<awt_goals) {
  this.asGoals = ["normal",awt_goals-hot_goals];
  }  
  this.poimodel="ha";
  this.hot_goals=hot_goals;
  this.awt_goals=awt_goals;
  this.oth=oth;
}
betinfo.betinfo_HADHAD = function (selectionname,betkey,htft,hadhad) {
  betinfo.betinfo.call(this, selectionname,betkey, htft);
  this.poimodel="ha";
  this.hadhad=hadhad
}  

betinfo.betinfo_HADHAD.prototype.getpayoff=function(inpmap) {
var key1="hot_"+this.htft+"_g",key2="awt_"+this.htft+"_g";
if ((((this.hadhad[0]=="h") && (inpmap['hot_ht_g']>inpmap['awt_ht_g'])) || 
  ((this.hadhad[0]=="a") && (inpmap['hot_ht_g']<inpmap['awt_ht_g'])) ||
  ((this.hadhad[0]=="d") && (inpmap['hot_ht_g']==inpmap['awt_ht_g']))) && 
  (((this.hadhad[1]=="h") && (inpmap['hot_ft_g']>inpmap['awt_ft_g'])) || 
  ((this.hadhad[1]=="a") && (inpmap['hot_ft_g']<inpmap['awt_ft_g'])) ||
  ((this.hadhad[1]=="d") && (inpmap['hot_ft_g']==inpmap['awt_ft_g'])))) {
return 1;
}
else {
  return -1;
}  
}


betinfo.betinfo_HAD.prototype.getpayoff=function(inpmap) {
var key1="hot_"+this.htft+"_g",key2="awt_"+this.htft+"_g";
if (((this.had=="h") && (inpmap[key1]>inpmap[key2])) || ((this.had=="a") &&  (inpmap[key2]>inpmap[key1])))
{return 1}
else if ((this.had=="d") && (inpmap[key1]==inpmap[key2]))
{return 1}
else
{return -1}  
}
betinfo.betinfo_HA.prototype.getpayoff=function(inpmap) {
var key1="hot_"+this.htft+"_g",key2="awt_"+this.htft+"_g";
if (((this.ha=="h") && (inpmap[key1]>inpmap[key2])) || ((this.ha=="a") &&  (inpmap[key2]>inpmap[key1])))
{return 1}
else if (((this.ha=="h") && (inpmap[key1]<inpmap[key2])) || ((this.ha=="a") &&  (inpmap[key2]<inpmap[key1])))
{return -1}
else
{return 0}
}

betinfo.betinfo_OU.prototype.getpayoff=function(inpmap) {
var key1="hot_"+this.htft+"_g",key2="awt_"+this.htft+"_g";
var scengoals=inpmap[key1]+inpmap[key2];
if (((this.ou=="o") && (scengoals>this.goals)) || ((this.ou=="u") &&  (scengoals<this.goals)))
{return 1}
else
{return -1}
}
betinfo.betinfo_CS.prototype.getpayoff=function(inpmap) {
var key1="hot_"+this.htft+"_g",key2="awt_"+this.htft+"_g";
if ((this.hot_goals==inpmap[key1]) && (this.awt_goals==inpmap[key2]))
{return 1}
else if (this.oth==true && ((inpmap[key1]>this.hot_goals) || (inpmap[key2]>this.awt_goals)))
{return 1}
else
{return -1}
}

betinfo.betinfo_TeamGoals.prototype.getpayoff=function(inpmap) {
var key1="hot_"+this.htft+"_g",key2="awt_"+this.htft+"_g";
  if (inpmap[key1]!=undefined && inpmap[key2]!=undefined) {
    hot_num=inpmap[key1];
    awt_num=inpmap[key2];
    if (((this.team1_ou==null) || (this.team1_ou=="u" && (hot_num<this.team1_goals)) || (this.team1_ou=="o" && (hot_num>this.team1_goals))) &&
        ((this.team2_ou==null) || (this.team2_ou=="u" && (awt_num<this.team2_goals)) || (this.team2_ou=="o" && (awt_num>this.team2_goals)))) {
      return 1;
    }
    else {
       return -1;
    }
  }
  else {
    return -100;}
}


betinfo.marketList = [
  ["FT","Full Time"],
  ["HT","Half Time"],
  ["CS","Correct Score"],
  ["OU15","Over-Under 1-5 Goals"],
  ["OU25","Over-Under 2-5 Goals"],
  ["OU35","Over-Under 3-5 Goals"],
 ["OU45","Over-Under 4-5 Goals"],
["OU55","Over-Under 5-5 Goals"],
["OU65","Over-Under 6-5 Goals"],
["HTFT","Half Time-Full Time"],
["Team1CS","Home Team Clean Sheet"],
["Team1S","Home Team to Score"],
["Team2CS","Away Team Clean Sheet"],
["Team2S","Away Team to Score"],
["CSHT","Correct Score-HT"],
["OUHT15","Over-Under 1-5 Goals-HT"],
["DNB","Draw No Bet"]
]


betinfo.getSelectionList = function(inpMarketList) {
  var retList = [];
    for (var i=0,betmarket;betmarket=inpMarketList[i];i++) {
      if (betinfo.bmQMap[betmarket]) {
      for (var k =0,betkey;betkey = betinfo.bmQMap[betmarket][k];k++) {
	retList.push([betkey,betinfo.bm[betkey].selectionname]);
      }
      }
    }
    return retList;
}


betinfo.getSelectionList_BetKey = function(inpBetKeyList) {
  var retList = [];
    for (var k =0,betkey;betkey = inpBetKeyList[k];k++) {
      retList.push([betkey,betinfo.bm[betkey].selectionname]);
    }
    return retList;
}


betinfo.equiv = {
 "OU15_U15":{"b":{"CS":[["b","CS_00"],["b","CS_10"],["b","CS_01"]]},
 "l":{"CS":[["l","CS_00"],["l","CS_10"],["l","CS_01"]]}},
  "OU35_O35":{"b":{"CS":[["b","CS_Other"],["b","CS_31"],["b","CS_32"],["b","CS_13"],["b","CS_23"],["b","CS_22"],["b","CS_33"]]},
 "l":{"CS":[["l","CS_Other"],["l","CS_31"],["l","CS_32"],["l","CS_13"],["l","CS_23"],["l","CS_22"],["l","CS_33"]]}},
  "OU35_U35":{"l":{"CS":[["b","CS_Other"],["b","CS_31"],["b","CS_32"],["b","CS_13"],["b","CS_23"],["b","CS_22"],["b","CS_33"]]},
 "b":{"CS":[["l","CS_Other"],["l","CS_31"],["l","CS_32"],["l","CS_13"],["l","CS_23"],["l","CS_22"],["l","CS_33"]]}},
 "OU25_U25":{"b":{"CS":[["b","CS_00"],["b","CS_10"],["b","CS_01"],["b","CS_11"],["b","CS_20"],["b","CS_02"]]},
 "l":{"CS":[["l","CS_00"],["l","CS_10"],["l","CS_01"],["l","CS_01"],["l","CS_11"],["l","CS_20"],["l","CS_02"]]}},
  
 "OU25_O25":{"l":{"CS":[["b","CS_00"],["b","CS_10"],["b","CS_01"],["b","CS_11"],["b","CS_20"],["b","CS_02"]]},
 "b":{"CS":[["l","CS_00"],["l","CS_10"],["l","CS_01"],["l","CS_01"],["l","CS_11"],["l","CS_20"],["l","CS_02"]]}}, 
 
 "OU15_O15":{"b":{"CS":[["l","CS_00"],["l","CS_10"],["l","CS_01"]]},
 "l":{"CS":[["b","CS_00"],["b","CS_10"],["b","CS_01"]]}},

 "FT_Home":{"b":{"HTFT":[["b","HTFT_HomeHome"],["b","HTFT_AwayHome"],["b","HTFT_DrawHome"]]},
 "l":{"HTFT":[["l","HTFT_HomeHome"],["l","HTFT_AwayHome"],["l","HTFT_DrawHome"]]}},
 "FT_Away":{"b":{"HTFT":[["b","HTFT_HomeAway"],["b","HTFT_AwayAway"],["b","HTFT_DrawAway"]]},
 "l":{"HTFT":[["l","HTFT_HomeAway"],["l","HTFT_AwayAway"],["l","HTFT_DrawAway"]]}},
 "FT_Draw":{"b":{"HTFT":[["b","HTFT_HomeDraw"],["b","HTFT_AwayDraw"],["b","HTFT_DrawDraw"]]},
 "l":{"HTFT":[["l","HTFT_HomeDraw"],["l","HTFT_AwayDraw"],["l","HTFT_DrawDraw"]]}},
  "HT_Home":{"b":{"HTFT":[["b","HTFT_HomeHome"],["b","HTFT_HomeAway"],["b","HTFT_HomeDraw"]]},
 "l":{"HTFT":[["l","HTFT_HomeHome"],["l","HTFT_HomeAway"],["l","HTFT_HomeDraw"]]}}, 
 "HT_Away":{"b":{"HTFT":[["b","HTFT_AwayHome"],["b","HTFT_AwayAway"],["b","HTFT_AwayDraw"]]},
 "l":{"HTFT":[["l","HTFT_AwayHome"],["l","HTFT_AwayAway"],["l","HTFT_AwayDraw"]]}},
 "HT_Draw":{"b":{"HTFT":[["b","HTFT_DrawHome"],["b","HTFT_DrawAway"],["b","HTFT_DrawDraw"]]},
 "l":{"HTFT":[["l","HTFT_DrawHome"],["l","HTFT_DrawAway"],["l","HTFT_DrawDraw"]]}}
}



betinfo.calcPnL= function(betKey,bl,odds,amt,inpOutcomeMap) {
  if (!betinfo.bm[betKey]) { return null;}
  var blAdj;
  if (bl=="b") {
    blAdj=1; 
  }
  else {
    blAdj=-1;
  }
  var calcPayoff=betinfo.bm[betKey].getpayoff(inpOutcomeMap);
  if (calcPayoff == 1) {
    return (odds-1)*amt*blAdj;
  }
  else if (calcPayoff == -1) {
    return amt*-1*blAdj;
  }
  else {
    return 0;    
  }
}


betinfo.bm={"OUHT15_U15":new betinfo.betinfo_OU("Under 1.5 Goals(HT)","OUHT15_U15","ht","u",1.5),
"OUHT15_O15":new betinfo.betinfo_OU("Over 1.5 Goals(HT)","OUHT15_O15","ht","o",1.5),
"OU15_U15":new betinfo.betinfo_OU("Under 1.5 Goals","OU15_U15","ft","u",1.5),
"OU15_O15":new betinfo.betinfo_OU("Over 1.5 Goals","OU15_O15","ft","o",1.5),
"OU25_U25":new betinfo.betinfo_OU("Under 2.5 Goals","OU25_U25","ft","u",2.5),
"OU25_O25":new betinfo.betinfo_OU("Over 2.5 Goals","OU25_O25","ft","o",2.5),
"OU35_U35":new betinfo.betinfo_OU("Under 3.5 Goals","OU35_U35","ft","u",3.5),
"OU35_O35":new betinfo.betinfo_OU("Over 3.5 Goals","OU35_O35","ft","o",3.5),
"OU45_U45":new betinfo.betinfo_OU("Under 4.5 Goals","OU45_U45","ft","u",4.5),
"OU45_O45":new betinfo.betinfo_OU("Over 4.5 Goals","OU45_O45","ft","o",4.5),
"OU55_U55":new betinfo.betinfo_OU("Under 5.5 Goals","OU55_U55","ft","u",5.5),
"OU55_O55":new betinfo.betinfo_OU("Over 5.5 Goals","OU55_O55","ft","o",5.5),
"OU65_U65":new betinfo.betinfo_OU("Under 6.5 Goals","OU65_U65","ft","u",6.5),
"OU65_O65":new betinfo.betinfo_OU("Over 6.5 Goals","OU65_O65","ft","o",6.5),
"CS_00":new betinfo.betinfo_CS("0-0","CS_00","ft",0,0,false),
"CS_11":new betinfo.betinfo_CS("1-1","CS_11","ft",1,1,false),
"CS_22":new betinfo.betinfo_CS("2-2","CS_22","ft",2,2,false),
"CS_33":new betinfo.betinfo_CS("3-3","CS_33","ft",3,3,false),
"CS_10":new betinfo.betinfo_CS("1-0","CS_10","ft",1,0,false),
"CS_20":new betinfo.betinfo_CS("2-0","CS_20","ft",2,0,false),
"CS_30":new betinfo.betinfo_CS("3-0","CS_30","ft",3,0,false),
"CS_21":new betinfo.betinfo_CS("2-1","CS_21","ft",2,1,false),
"CS_31":new betinfo.betinfo_CS("3-1","CS_31","ft",3,1,false),
"CS_32":new betinfo.betinfo_CS("3-2","CS_32","ft",3,2,false),
"CS_01":new betinfo.betinfo_CS("0-1","CS_01","ft",0,1,false),
"CS_02":new betinfo.betinfo_CS("0-2","CS_02","ft",0,2,false),
"CS_03":new betinfo.betinfo_CS("0-3","CS_03","ft",0,3,false),
"CS_12":new betinfo.betinfo_CS("1-2","CS_12","ft",1,2,false),
"CS_13":new betinfo.betinfo_CS("1-3","CS_13","ft",1,3,false),
"CS_23":new betinfo.betinfo_CS("2-3","CS_23","ft",2,3,false),
"CS_Other":new betinfo.betinfo_CS("CS Other","CS_Other","ft",3,3,true),
"CSHT_00":new betinfo.betinfo_CS("0-0(HT)","CSHT_00","ht",0,0,false),
"CSHT_11":new betinfo.betinfo_CS("1-1(HT)","CSHT_11","ht",1,1,false),
"CSHT_22":new betinfo.betinfo_CS("2-2(HT)","CSHT_22","ht",2,2,false),
"CSHT_10":new betinfo.betinfo_CS("1-0(HT)","CSHT_10","ht",1,0,false),
"CSHT_20":new betinfo.betinfo_CS("2-0(HT)","CSHT_20","ht",2,0,false),
"CSHT_21":new betinfo.betinfo_CS("2-1(HT)","CSHT_21","ht",2,1,false),
"CSHT_01":new betinfo.betinfo_CS("0-1(HT)","CSHT_01","ht",0,1,false),
"CSHT_02":new betinfo.betinfo_CS("0-2(HT)","CSHT_02","ht",0,2,false),
"CSHT_12":new betinfo.betinfo_CS("1-2(HT)","CSHT_12","ht",1,2,false),
"CSHT_Other":new betinfo.betinfo_CS("CS Other (HT)","CSHT_Other","ht",2,2,true),
"FT_Home":new betinfo.betinfo_HAD("Home","FT_Home","ft","h"),
"FT_Draw":new betinfo.betinfo_HAD("Draw","FT_Draw","ft","d"),
"FT_Away":new betinfo.betinfo_HAD("Away","FT_Away","ft","a"),
"HT_Home":new betinfo.betinfo_HAD("Home(HT)","HT_Home","ht","h"),
"HT_Draw":new betinfo.betinfo_HAD("Draw(HT)","HT_Draw","ht","d"),
"HT_Away":new betinfo.betinfo_HAD("Away(HT)","HT_Away","ht","a"),
"DNB_Home":new betinfo.betinfo_HA("DNB Home","DNB_Home","ft","h"),
"DNB_Away":new betinfo.betinfo_HA("DNB Away","DNB_Away","ft","a"),
"HTFT_HomeHome":new betinfo.betinfo_HADHAD("Home/Home","HTFT_HomeHome","ft","hh"),
"HTFT_HomeDraw":new betinfo.betinfo_HADHAD("Home/Draw","HTFT_HomeDraw","ft","hd"),
"HTFT_HomeAway":new betinfo.betinfo_HADHAD("Home/Away","HTFT_HomeAway","ft","ha"),
"HTFT_DrawHome":new betinfo.betinfo_HADHAD("Draw/Home","HTFT_DrawHome","ft","hh"),
"HTFT_DrawDraw":new betinfo.betinfo_HADHAD("Draw/Draw","HTFT_DrawDraw","ft","hd"), 
"HTFT_DrawAway":new betinfo.betinfo_HADHAD("Draw/Away","HTFT_DrawAway","ft","ha"),
"HTFT_AwayHome":new betinfo.betinfo_HADHAD("Away/Home","HTFT_AwayHome","ft","ah"),
"HTFT_AwayDraw":new betinfo.betinfo_HADHAD("Home/Draw","HTFT_AwayDraw","ft","ad"), 
"HTFT_AwayAway":new betinfo.betinfo_HADHAD("Away/Away","HTFT_AwayAway","ft","aa"),
"Team1CS_Yes":new betinfo.betinfo_TeamGoals("Home Clean Sheet","Team1CS_Yes","ft",null,null,"u",0.5),
"Team1CS_No":new betinfo.betinfo_TeamGoals("Home Not Clean Sheet","Team1CS_No","ft",null,null,"o",0.5),
"Team1S_Yes":new betinfo.betinfo_TeamGoals("Home Team to Score","Team1S_Yes","ft","o",0.5,null,null),
"Team1S_No":new betinfo.betinfo_TeamGoals("Home Team Not to Score","Team1S_No","ft","u",0.5,null,null),
"Team2CS_Yes":new betinfo.betinfo_TeamGoals("Away Team Clean Sheet","Team2CS_Yes","ft",null,null,"u",0.5),
"Team2CS_No":new betinfo.betinfo_TeamGoals("Away Team No Clean Sheet","Team2CS_No","ft",null,null,"o",0.5),
"Team2S_Yes":new betinfo.betinfo_TeamGoals("Away Team to Score","Team2S_Yes","ft","o",0.5,null,null),
"Team2S_No":new betinfo.betinfo_TeamGoals("Away Team not to Score","Team2S_No","ft","u",0.5,null,null)
 } 




betinfo.validateOdds=function(inpStr) {
  if (inpStr && (inpStr.length>0) && ((isNaN(inpStr))==false) && (parseFloat(inpStr)>1) &&  (parseFloat(inpStr)<=1000)) {
    return true;
  }
  else {
    return false;
  }
}
betinfo.validateAmt=function(inpStr) {
  if (inpStr && (inpStr.length>0) && ((isNaN(inpStr))==false) && (parseFloat(inpStr)>1) &&  (parseFloat(inpStr)<=1000)) {
    return true;
  }
  else {
    return false;
  }
}

betinfo.formatOdds = function(inpOdds) {
var oddsArray = (inpOdds+"").split(".");
if (oddsArray.length==2) {
  return oddsArray[0]+"."+(oddsArray[1][0]||'0')+(oddsArray[1][1]||'0');
}
else {
  return oddsArray[0]+".00";
}
}

betinfo.formatAmt = function(inpAmt) {
var inpWithCommas = inpAmt.toLocaleString();
var commaArray=inpWithCommas.split(".");
if (commaArray.length==2) {
  return commaArray[0]+"."+commaArray[1][0]+(commaArray[1][1]||'');
}
else {
  return commaArray[0];
}
}



betinfo.factorial = function(m) {
var myret = 1;
for (var num = 1; num <= m; num++) { myret=myret*num;}
    return myret;}
betinfo.poi = function(lam,k) {
    return Math.exp(-lam) * Math.pow(lam,k) / betinfo.factorial(k);}
betinfo.inList = function(inpList,inpItem) {
for (var i=0,iterItem;iterItem=inpList[i];i++) { 
if (inpItem==iterItem) { return true;}}
return false;
}

betinfo.getOverRound = function(inpmap,inpmarket,inpsource) {
  var myor=0;
  var odds,source,market,mapitem;
  for (oddskey in inpmap) {
    market=oddskey.split("_")[0]
    source=oddskey.split("#")[1].split("_")[0]
    blos=oddskey.split("#")[1].split("_")[1]
    if ((inpsource==source) && (inpmarket==market) && (myor<1000) && (blos=="bo1"))     {   
      odds=inpmap[oddskey]
      if (odds.length==0) {myor=1000}
      else { myor=myor+(1/odds) }      
    }
  }
  if (myor==0) {return 1000}
  else {return myor};
}


betinfo.implyAsGoals = function(inpBetKey,inOdds) {
  var asGoals=betinfo.bm[inpBetKey].asGoals;
  if (asGoals!=null) {
    
  }
}


betinfo.AegAttr = function(iM) {
this.betkey_h = iM['betkey_h'] || "";
this.betkey_a = iM['betkey_a'] || "";
this.betkey_g = iM['betkey_g'] || "";
this.hot_ft_aeg = iM['hot_ft_aeg'] || "";
this.awt_ft_aeg = iM['awt_ft_aeg'] || "";
this.total_ft_aeg = iM['total_ft_aeg'] || "";
}

betinfo.PoiModel = function(iM) {
  this.odds_source=iM.odds_source||"bf";
  this.odds_type=iM.odds_type||"bo1";
  this.odds=iM.odds||{};
  this.ip_hot_gsf=iM.ip_hot_gsf||0;
  this.ip_awt_gsf=iM.ip_awt_gsf||0;
  this.ip_time_elapsed=iM.ip_time_elapsed||0;
  this.oneimp=false;
    if (iM['hag']!=undefined) {
      this.aeg=new betinfo.AegAttr({
      betkey_h:iM['hag']['betkey_h']||"",
      betkey_a:iM['hag']['betkey_a']||"",
      betkey_g:iM['hag']['betkey_g']||""});
      this._iaeg();
    }
    else {
      this.aeg=new betinfo.AegAttr({
      betkey_h:"",
      betkey_a:"",
      betkey_g:""});
  }
}


betinfo.PoiModel.prototype.get_odds = function(betkey) {
  var thisbetinfo=betinfo.bm[betkey]
  if (thisbetinfo.poimodel=="ha")
  {return this._oddsmodel_ha(thisbetinfo);}
  else
  {return this._oddsmodel_g(thisbetinfo);}
}

betinfo.PoiModel.prototype._oddsmodel_ha = function(inpbetinfo) { 
var hot_ft_aeg=0,awt_ft_aeg=0,ip_time_elapsed=0;
var totalprob=0,betprob=0,thisprob=0,thispof=0,timeadj=0;
var prob_hot_g=0,prob_awt_g=0;
var key1="hot_"+inpbetinfo.htft+"_g";
var key2="awt_"+inpbetinfo.htft+"_g";
var payoffinpmap={};
var timeadj=inpbetinfo.adjaeg()*(90*inpbetinfo.adjaeg()-this.ip_time_elapsed)/(90*inpbetinfo.adjaeg());     
if (timeadj>0) {
  for (var goals1=0;goals1<10;goals1++) {
      for (var goals2=0;goals2<10;goals2++) {
	  if (goals1>=this.ip_hot_gsf && goals2>=this.ip_awt_gsf) {
	    payoffinpmap={};
	    payoffinpmap[key1]=goals1;
	    payoffinpmap[key2]=goals2;
	    thispof=inpbetinfo.getpayoff(payoffinpmap);
	    if (thispof==1) {
	    prob_hot_g=goals1-this.ip_hot_gsf;
	    prob_awt_g=goals2-this.ip_awt_gsf;
	    thisprob=betinfo.poi(this.aeg.hot_ft_aeg*timeadj, prob_hot_g)*betinfo.poi(this.aeg.awt_ft_aeg*timeadj, prob_awt_g);
	    betprob=betprob+thisprob;
	    totalprob=totalprob+thisprob; }
	    else if (thispof==-1) {
	    prob_hot_g=goals1-this.ip_hot_gsf;
	    prob_awt_g=goals2-this.ip_awt_gsf;
	    thisprob=betinfo.poi(this.aeg.hot_ft_aeg*timeadj, prob_hot_g)*betinfo.poi(this.aeg.awt_ft_aeg*timeadj, prob_awt_g);
	    totalprob=totalprob+thisprob;}
}}}}
var myodds;
if (timeadj<0) {myodds=-1;}
else if (betprob!=0) {myodds= (totalprob/betprob);}
else {myodds= 1000;}
return myodds;
}

betinfo.PoiModel.prototype._oddsmodel_g = function(inpbetinfo) {
var hot_ft_aeg=0,awt_ft_aeg=0,ip_time_elapsed=0;
var totalprob=0,betprob=0,thisprob=0,thispof=0,timeadj=0;
var prob_hot_g=0,prob_awt_g=0;
var goals_sf=this.ip_hot_gsf+this.ip_awt_gsf;
var key1="hot_"+inpbetinfo.htft+"_g";
var key2="awt_"+inpbetinfo.htft+"_g";
var timeadj=inpbetinfo.adjaeg()*(90*inpbetinfo.adjaeg()-this.ip_time_elapsed)/(90*inpbetinfo.adjaeg());    
var payoffinpmap={}
if (timeadj>0) {
  for (var goals1=0;goals1<10;goals1++) {
    if (goals1>=goals_sf) {
	payoffinpmap={};
	payoffinpmap[key1]=goals1;payoffinpmap[key2]=0;
	thispof=inpbetinfo.getpayoff(payoffinpmap);
	if (thispof==1) {
	    prob_g=goals1-goals_sf;
	    thisprob=betinfo.poi(this.aeg.total_ft_aeg*timeadj, prob_g);
	    betprob=betprob+thisprob;
	    totalprob=totalprob+thisprob; }
	else if (thispof==-1) {
	    prob_g=goals1-goals_sf;
	    thisprob=betinfo.poi(this.aeg.total_ft_aeg*timeadj, prob_g);
	    totalprob=totalprob+thisprob; }
}}}
if (timeadj<0) {myodds=-1;}
else if (betprob!=0) {myodds= (totalprob/betprob);}
else {myodds= "N/A";}
return myodds;
}

betinfo.PoiModel.prototype._iaeg_g = function (odds) {
var guessaeg=2.5,mymap={},x=1,odds00=0,odds01=0;
  while (x<5 && Math.abs(odds-odds00)>.01) {
    x=x+1; 
    this.aeg.total_ft_aeg=guessaeg,odds00=this.get_odds(this.aeg.betkey_g);
    this.aeg.total_ft_aeg=guessaeg+.01,odds01=this.get_odds(this.aeg.betkey_g);
    guessaeg=guessaeg+(odds-odds00)*.01/(odds01-odds00),this.aeg.total_ft_aeg=guessaeg;
  }
}

betinfo.PoiModel.prototype._iaeg_prel_ha = function(home_odds,away_odds,teg) {
var _home=1.0/home_odds,_away=1.0/away_odds;
var eh=(_home-_away)*2;
var home00odds,away00odds,home01odds,away01odds;
var home00prob,away00prob,home01prob,away01prob;
var oktocontinue=true;
for (var x=0; x<5;x++) {
  if (oktocontinue==true) {
      this.aeg.hot_ft_aeg=((teg-eh)/2.0)+eh,this.aeg.awt_ft_aeg=((teg-eh)/2.0);
      home00odds = this.get_odds(this.aeg.betkey_h);
      away00odds = this.get_odds(this.aeg.betkey_a);
      this.aeg.hot_ft_aeg=((teg-(eh+.01))/2.0)+(eh+.01);
      this.aeg.awt_ft_aeg=((teg-(eh+.01))/2.0);
      home01odds = this.get_odds(this.aeg.betkey_h);
      away01odds = this.get_odds(this.aeg.betkey_a);
      home00prob=1.0/home00odds,away00prob=1.0/away00odds;
      home01prob=1.0/home01odds,away01prob=1.0/away01odds;           
      if (Math.abs(home00prob-away00prob-home01prob+away01prob)>.0000001)
	  {eh = eh+(home00prob-away00prob-_home+_away)*.01/(home00prob-away00prob-home01prob+away01prob);}
      else
	  {oktocontinue=false;}
      if (Math.abs(home00prob-_home)<.0001 && Math.abs(away00prob-_away)<.0001) 
	  {oktocontinue=false;}
      this.aeg.hot_ft_aeg=((teg-eh)/2.0)+eh,this.aeg.awt_ft_aeg=(teg-eh)/2.0;
}}}

betinfo.PoiModel.prototype._iaeg = function() {
var home_odds,away_odds,goal_odds;
if (this.aeg.hot_ft_aeg==0 && this.aeg.awt_ft_aeg==0 
&& this.aeg.total_ft_aeg==0) {
if (this.odds_type=="ao1") {
  goal_odds=(this.odds[aegattr.betkey_g]["bo1"]+
  this.odds[aegattr.betkey_g]["lo1"])/2.0; 
}
else if (this.odds_type=="lo1" || this.odds_type=="bo1" 
  || this.odds_type=="bo") {
  goal_odds=this.odds[this.aeg.betkey_g][this.odds_type]; 
}
  this._iaeg_g(goal_odds);
}

if ((this.aeg.betkey_h!="") && (this.aeg.betkey_a!="")) {
  if (this.odds_type=="ao1") {
    home_odds=(this.odds[this.aeg.betkey_h]["bo1"]+this.odds[this.aeg.betkey_h]["lo1"])/2.0;
    away_odds=(this.odds[this.aeg.betkey_a]["bo1"]+this.odds[this.aeg.betkey_a]["lo1"])/2.0;
  }    
  else if (this.odds_type=="lo1" || this.odds_type=="bo1" || this.odds_type=="bo") {
    home_odds=(this.odds[this.aeg.betkey_h][this.odds_type]);
    away_odds=(this.odds[this.aeg.betkey_a][this.odds_type]);
    }
  var home00odds,away00odds,home01odds,away01odds;
  var home00prob,away00prob,home01prob,away01prob;
  var teg=this.aeg.total_ft_aeg;
  var oktocontinue=true;
  var _home=1.0/home_odds,_away=1.0/away_odds; 
  for (var x = 0 ; x <5 ; x++) {
      if (oktocontinue==true) {
	  this._iaeg_prel_ha(home_odds,away_odds,teg);
	  home00odds = this.get_odds(this.aeg.betkey_h);
	  away00odds = this.get_odds(this.aeg.betkey_a);
	  this._iaeg_prel_ha(home_odds,away_odds,teg+.01);
	  home01odds = this.get_odds(this.aeg.betkey_h);
	  away01odds = this.get_odds(this.aeg.betkey_a);
	  home00prob=1.0/home00odds,away00prob=1.0/away00odds;
	  home01prob=1.0/home01odds,away01prob=1.0/away01odds;
      }            
      if (Math.abs(home00odds-away00odds-home01odds+away01odds)>.0000001) {
	  teg = teg+(home00odds-away00odds-home_odds+away_odds)*.01/(home00odds-away00odds-home01odds+away01odds);
	  this._iaeg_prel_ha(home_odds,away_odds,teg);
      }
      else {
	oktocontinue=false;
      }
}}}

//all of the follwing take a map of odds and calculate
betinfo.mapinp = {};
betinfo.mapinp.calcEquiv = function() {
}

betinfo.mapinp.calcHotSpeadfromCS = function() {
}
betinfo.mapinp.calc= function() {
}


}());
