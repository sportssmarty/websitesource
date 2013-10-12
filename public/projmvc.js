
var projMvc = {};

projMvc.GenericView = Backbone.View.extend({
  viewInputMap:{},
  status:"initial",
  genericEvents: { "focus input[inptype]" : "clearError",
      "change input[inptype]" : "validateInp",      
      "change input[inptype]" : "resetCalc",
      "change select[inptype]" : "resetCalc",
      "click td[outtype]": "describeCalc"
  },
  clearError: function(ev) {
    if (ev.currentTarget.value=="Error!") {
      ev.currentTarget.value="";
    }
  },
  describeCalc: function(ev) {
  if (this.status=="calculated") {
  }
  },
  resetCalc:function(ev) {
    if (this.status=="calculated") {
      this.viewInputMap={};    
    $('td[outtype]').each(function(i) {
	  $(this).html("calc!");
    });
    this.status="initial";
    }
  },
  validateInp: function(ev) {
    if (ev.currentTarget.attributes["inptype"].value=="odds") {
      if (betinfo.validateOdds(ev.currentTarget.value)==false) {
      ev.currentTarget.value="Error!";
      return false;
      }
    }    
    else if (ev.currentTarget.attributes["inptype"].value=="amt") {
      if (betinfo.validateAmt(ev.currentTarget.value)==false) {
      ev.currentTarget.value="Error!";
      return false;
      }
    }
    return true;
}   
});

projMvc.InPlay = projMvc.GenericView.extend({
  status: "initial",
  el:  "#content",
  jadeTemplate:null,				      
  initialize: function(jadeTemplate) {
    this.viewInputMap={};
    this.jadeTemplate = jadeTemplate;
    this.events = _.extend({}, this.genericEvents, this.events);
    this.delegateEvents();    
  },
  render: function() {
      $(this.el).hide();
      $(this.el).html(uiRender.getTemplateMapFn(this.jadeTemplate)());
      $(this.el).fadeIn();
      return this;
  },			      
  events: {
    "click input#calc"   : "calcOdds"
  },   					
  clear: function() {
    this.model.clear();
  },
  calcOdds: function() {
  var betkey_g,betkey_h,betkey_a;
  var oddsmap={};
  if ($('input[betkey="FT_Home"]').val()!=undefined) {
    betkey_h = "FT_Home";betkey_a="FT_Away";betkey_g="OU25_U25";
    oddsmap["FT_Home"]={"bo1":parseFloat($('input[betkey="FT_Home"]').val())};  
    oddsmap["FT_Away"]={"bo1":parseFloat($('input[betkey="FT_Away"]').val())};  
    oddsmap["OU25_U25"]={"bo1":parseFloat($('input[betkey="OU25_U25"]').val())};  
  }
  else if ($('input[betkey="HT_Home"]').val()!=undefined) {
    betkey_h = "HT_Home";betkey_a="HT_Away";betkey_g="OUHT15_U15";  
    oddsmap["HT_Home"]={"bo1":parseFloat($('input[betkey="HT_Home"]').val())};  
    oddsmap["HT_Away"]={"bo1":parseFloat($('input[betkey="HT_Away"]').val())};  
    oddsmap["OUHT15_U15"]={"bo1":parseFloat($('input[betkey="OUHT15_U15"]').val())};      
  }
  else if ($('input[betkey="DNB_Home"]').val()!=undefined) {
    betkey_h = "DNB_Home";betkey_a="DNB_Away";betkey_g="OU25_U25";
    oddsmap["DNB_Home"]={"bo1":parseFloat($('input[betkey="DNB_Home"]').val())};  
    oddsmap["DNB_Away"]={"bo1":parseFloat($('input[betkey="DNB_Away"]').val())};  
    oddsmap["OU25_U25"]={"bo1":parseFloat($('input[betkey="OU25_U25]').val())};     
  }
  else {
    betkey_h ="";betkey_a="";betkey_g = $("#betkey_g").val();
    oddsmap[betkey_g]={"bo1":parseFloat($("#odds").val())};  
  }
  
  var ip_hot_gsf = parseFloat($("#ip_hot_gsf").val());
  var ip_awt_gsf = $("#ip_awt_gsf").val()==undefined? 0:parseFloat($("#ip_awt_gsf").val());
  var ip_time_elapsed = parseFloat($("#ip_time_elapsed").val());
  var poiModel=new betinfo.PoiModel({odds:oddsmap,ip_time_elapsed:ip_time_elapsed,
  "ip_hot_gsf":ip_hot_gsf,hag:{"betkey_h":betkey_h,"betkey_a":betkey_a,"betkey_g":betkey_g}});  
  
  $("td[ip_hot_gsf-offset]").each(function(i) {
    var this_ip_time_elapsed_offset,this_ip_hot_gsf_offset,this_ip_awt_gsf_offset;
    this_ip_time_elapsed_offset=parseInt($(this).attr('ip_time_elapsed-offset'));
    this_ip_hot_gsf_offset=parseInt($(this).attr('ip_hot_gsf-offset'));
    this_ip_awt_gsf_offset=parseInt($(this).attr('ip_awt_gsf-offset'));
    if (ip_time_elapsed>this_ip_time_elapsed_offset) {
    $(this).html("N/A");
    }
    else {
      poiModel.ip_time_elapsed =this_ip_time_elapsed_offset;
      poiModel.ip_hot_gsf=this_ip_hot_gsf_offset+ip_hot_gsf;
      poiModel.ip_awt_gsf=this_ip_awt_gsf_offset+ip_awt_gsf;      
      if (betkey_h=="") {    
      $(this).html(betinfo.formatOdds(poiModel.get_odds(betkey_g)));
      }
      else {
      $(this).html(betinfo.formatOdds(poiModel.get_odds(betkey_h))+"/"+betinfo.formatOdds(poiModel.get_odds(betkey_a)));
      }
    }
  })
  this.viewInputMap.poiModel = poiModel;   
  this.status="calculated";
  return this;
  }
});  


projMvc.CreateOdds = projMvc.GenericView.extend({
  status: "initial",  
  el:  "#content",
  jadeTemplate:null,  
  events: {
    "click input#calc"   : "calcOdds"
  },
			      
  initialize: function(jadeTemplate) {
    this.jadeTemplate = jadeTemplate;
    this.events = _.extend({}, this.genericEvents, this.events);
    this.delegateEvents();     
  },
  render: function() {
      $(this.el).hide();
      $(this.el).html(uiRender.getTemplateMapFn(this.jadeTemplate)());
      $(this.el).fadeIn();
      return this;
  },
  clear: function() {
    this.model.clear();
  },
  calcOdds: function() {
    var betkey,bl,inner_betkey,inner_bl,odds;
    var oddsMap = {};
    $('input[inptype]').each(function(i) {
      betkey=$(this).attr('betkey');
      bl = $(this).attr('bl');
      odds =  $(this).val();
      if (odds && odds>1) {
	if (!oddsMap[betkey]) { oddsMap[betkey]={};}
	oddsMap[betkey][bl]=parseFloat(odds);
	}
    }); 
    $('td[outtype]').each(function(i) {
      betkey=$(this).attr('betkey');
      bl = $(this).attr('bl');
      var calcOdds,oddsObtained;
      if (betinfo.equiv[betkey] && betinfo.equiv[betkey][bl]) {
	oddsObtained=false;
	for (var equivKey in betinfo.equiv[betkey][bl]) {
	  calcOdds=0;
	  for (var j=0,item;item=betinfo.equiv[betkey][bl][equivKey][j];j++) {
	    inner_bl = item[0];
	    inner_betkey = item[1];
	    if (calcOdds!=-1 && (oddsMap[inner_betkey] && oddsMap[inner_betkey][inner_bl])) {
	      calcOdds = calcOdds + (1/oddsMap[inner_betkey][inner_bl])
	    }
	    else {
	      calcOdds = -1;
	    }
	  }
	  if (calcOdds!=-1) {
	    oddsObatined=true;
	    $(this).html(betinfo.formatOdds(1/calcOdds));
	  }
	}
	if (oddsObatined==false) {
	  $(this).html("N/A");
	}
      }
      else {
	$(this).html("N/A");
      }
    });
    this.viewInputMap.oddsMap = oddsMap;    
    this.status="calculated";
  } 
});  

projMvc.PoissonModel = projMvc.GenericView.extend({
  status: "initial",  
  el:  "#content",
  events: {
    "click input#calc"   : "calcOdds"
  },   
  jadeTemplate:null,
  initialize: function(jadeTemplate) {
    this.viewInputMap={};    

    this.jadeTemplate = jadeTemplate;
     this.events = _.extend({}, this.genericEvents, this.events);
    this.delegateEvents();     
  },		       
  render: function() {
      $(this.el).hide();
      $(this.el).html(uiRender.getTemplateMapFn(this.jadeTemplate)());
      $(this.el).fadeIn();
      return this;
  },
  clear: function() {
    this.model.clear();
  },
  calcOdds: function() {
  var hot_ft_aeg,awt_ft_aeg,total_ft_aeg;
  if ($("#total_ft_aeg").val()==undefined) {
    hot_ft_aeg = parseFloat($("#hot_ft_aeg").val());  
    awt_ft_aeg = parseFloat($("#awt_ft_aeg").val());
    total_ft_aeg = hot_ft_aeg +awt_ft_aeg;
  }
  else {
    hot_ft_aeg = parseFloat($("#total_ft_aeg").val());  
    awt_ft_aeg = 0;
    total_ft_aeg = parseFloat($("#total_ft_aeg").val());
  }
  var poiModel=new betinfo.PoiModel({});
  poiModel.aeg.hot_ft_aeg =hot_ft_aeg;
  poiModel.aeg.awt_ft_aeg=awt_ft_aeg;
  poiModel.aeg.total_ft_aeg=total_ft_aeg;
  var tmpPoiModel = this.viewInputMap.poiModel;
  $("td[betkey]").each(function(i) {
    betkey=$(this).attr('betkey');
      $(this).html(betinfo.formatOdds(poiModel.get_odds(betkey)));
    }
  )
  this.viewInputMap.poiModel = poiModel;
  this.status="calculated";
  return this;
  }	    
});  



projMvc.PlainHtml = projMvc.GenericView.extend({
  status: "initial",  
  el:  "#content",
  initialize: function() {
    this.events = _.extend({}, this.genericEvents, this.events);
    this.delegateEvents();     
  },
  render: function() {
      $(this.el).hide();
      $(this.el).html(homeHtml);
      $(this.el).fadeIn();
      return this;
  },         
  clear: function() {
    this.model.clear();
  }
});  


projMvc.BetComparison = projMvc.GenericView.extend({
  status: "initial",  
  el:  "#content",
  jadeTemplate:null,
  events: {
    "click input#calc"   : "calcOdds"
  },   					
  initialize: function(jadeTemplate,queryParams) {
    this.jadeTemplate = jadeTemplate;
    this.queryMap={};
    var queryParamsArr=queryParams.split("&");
    if (queryParamsArr.length>0) {
      for (var i = 0,queryItem;queryItem=queryParamsArr[i];i++) {
	if (queryItem.split("=").length==2) {
	this.queryMap[queryItem.split("=")[0]]=queryItem.split("=")[1];
	}
      }
    }

    this.events = _.extend({}, this.genericEvents, this.events);
    this.delegateEvents();     
  },
  render: function() {
      $(this.el).hide();
      $(this.el).html(uiRender.getTemplateMapFn(this.jadeTemplate)());
      $(this.el).fadeIn();
    if (this.queryMap["key"]!=undefined) {
    var j;
      var messageMapItem = messageMap[this.queryMap["key"]];
    for (var i = 0,positionItem;positionItem = messageMapItem.positions[i];i++) {
      j=i+1;
      $('#betkey'+j).val(positionItem[0]);
      $('#bl'+j).val(positionItem[1]);
      $('#odds'+j).val(positionItem[2]);
      $('#amt'+j).val(positionItem[3]);   
      }
    }      
      
      return this;
  },
 calcOdds: function() {
  var positions = [];
  var thisPnl;     
    for (var x=1;x<6;x++) {
      if ($('#betkey'+x).val()!="pleaseselect" && $('#bl'+x).val()!="pleaseselect" && 
	(betinfo.validateAmt($('#amt'+x).val())==true) && (betinfo.validateOdds($('#odds'+x).val())==true)) {
	positions.push([$('#betkey'+x).val(),$('#bl'+x).val(),$('#odds'+x).val(),$('#amt'+x).val()]);
      }
    }
    
   $('td[outtype="pnl"]').each(function(i) {     
     thisPnl=0;
     for (var i=0,item;item=positions[i];i++) {
      thisPnl=thisPnl+betinfo.calcPnL(item[0],item[1],item[2],item[3],{hot_ft_g:parseInt($(this).attr('hot_ft_g')),
	awt_ft_g:parseInt($(this).attr('awt_ft_g')),hot_ht_g:parseInt($(this).attr('hot_ht_g')),awt_ht_g:parseInt($(this).attr('awt_ht_g'))})								 
      }
    $(this).html(betinfo.formatAmt(thisPnl));
   }); 
  this.viewInputMap.positions=positions;
  this.status="calculated";
  },         
  clear: function() {
    this.model.clear();
  }
});  
//include logic so that we do not render if the current screen is selected again
projMvc.Router = Backbone.Router.extend({
  initialize: function(options) {
  this.route("home","home",function(homeHtml) {
    new projMvc.PlainHtml().render()}); 
  this.route("create-odds/:endurl","create-odds",function(endurl) {
    new projMvc.CreateOdds("create-odds-"+endurl).render()});
  this.route("in-play/:endurl","in-play",function(endurl) {
    new projMvc.InPlay("in-play-"+endurl).render()}); 
  this.route("poisson-model/:endurl","poisson-model",function(endurl) {
    new projMvc.PoissonModel("poisson-model-"+endurl).render()});
  this.route("bet-comparison/:endurl","poisson-model",function(endurl) {
    var endUrlArr = endurl.split("?");
    new projMvc.BetComparison("bet-comparison-"+endUrlArr[0],endUrlArr[1]||'').render()});
  },					
  routes: {
  }
});



