<!DOCTYPE html>
<html lang="en">
<head>
<meta name="description" content="Betting Calculators" />
<meta name="keywords" content="betting,calculator,odds,back,lay,betfair,exchange,soccer,aribitrage" />
<meta name="author" content="PJ Fitzpatrick" />
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />

  <title>Soccer Betting Position</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="public/css/bootstrap.min.css">

<style>
.table th, .table td {
padding: .2em;
}
input, select {
padding:.1em;
height: 1.5em;
margin: .25em;
}
input[type="text"] {
padding:.1em;
height: 1.5em;
border: 1px, solid;
margin: .25em;
}
.results {
text-align: center;
}
</style>

<script>
<?php

$str1= '"<div class=""><div class=""><p>Enter BetMarket, Back/Lay, Odds and Amt for up to 5 positions and see what your profit and loss will be for different full time scores.
</p><table class=""><tbody><tr><td>Selection</td><td><select id="betkey1" inptype="betkey" class="input-small"><option value="pleaseselect">Select </option><option value="FT_Home">Home   </option><option value="FT_Draw">Draw   </option><option value="FT_Away">Away   </option><option value="DNB_Home">DNB Home   </option><option value="DNB_Away">DNB Away   </option><option value="OU15_U15">Under 1.5 Goals   </option><option value="OU15_O15">Over 1.5 Goals   </option><option value="OU25_U25">Under 2.5 Goals   </option><option value="OU25_O25">Over 2.5 Goals   </option><option value="OU35_U35">Under 3.5 Goals   </option><option value="OU35_O35">Over 3.5 Goals   </option><option value="OU45_U45">Under 4.5 Goals   </option><option value="OU45_O45">Over 4.5 Goals   </option><option value="OU55_U55">Under 5.5 Goals   </option><option value="OU55_O55">Over 5.5 Goals   </option><option value="CS_00">0-0   </option><option value="CS_11">1-1   </option><option value="CS_22">2-2   </option><option value="CS_33">3-3   </option><option value="CS_10">1-0   </option><option value="CS_20">2-0   </option><option value="CS_30">3-0   </option><option value="CS_21">2-1   </option><option value="CS_31">3-1   </option><option value="CS_32">3-2   </option><option value="CS_01">0-1   </option><option value="CS_02">0-2   </option><option value="CS_03">0-3   </option><option value="CS_12">1-2   </option><option value="CS_13">1-3   </option><option value="CS_23">2-3   </option><option value="CS_Other">CS Other   </option></select></td><td><select id="betkey2" inptype="betkey" class="input-small"><option value="pleaseselect">Select </option><option value="FT_Home">Home   </option><option value="FT_Draw">Draw   </option><option value="FT_Away">Away   </option><option value="DNB_Home">DNB Home   </option><option value="DNB_Away">DNB Away   </option><option value="OU15_U15">Under 1.5 Goals   </option><option value="OU15_O15">Over 1.5 Goals   </option><option value="OU25_U25">Under 2.5 Goals   </option><option value="OU25_O25">Over 2.5 Goals   </option><option value="OU35_U35">Under 3.5 Goals   </option><option value="OU35_O35">Over 3.5 Goals   </option><option value="OU45_U45">Under 4.5 Goals   </option><option value="OU45_O45">Over 4.5 Goals   </option><option value="OU55_U55">Under 5.5 Goals   </option><option value="OU55_O55">Over 5.5 Goals   </option><option value="CS_00">0-0   </option><option value="CS_11">1-1   </option><option value="CS_22">2-2   </option><option value="CS_33">3-3   </option><option value="CS_10">1-0   </option><option value="CS_20">2-0   </option><option value="CS_30">3-0   </option><option value="CS_21">2-1   </option><option value="CS_31">3-1   </option><option value="CS_32">3-2   </option><option value="CS_01">0-1   </option><option value="CS_02">0-2   </option><option value="CS_03">0-3   </option><option value="CS_12">1-2   </option><option value="CS_13">1-3   </option><option value="CS_23">2-3   </option><option value="CS_Other">CS Other   </option></select></td><td><select id="betkey3" inptype="betkey" class="input-small"><option value="pleaseselect">Select </option><option value="FT_Home">Home   </option><option value="FT_Draw">Draw   </option><option value="FT_Away">Away   </option><option value="DNB_Home">DNB Home   </option><option value="DNB_Away">DNB Away   </option><option value="OU15_U15">Under 1.5 Goals   </option><option value="OU15_O15">Over 1.5 Goals   </option><option value="OU25_U25">Under 2.5 Goals   </option><option value="OU25_O25">Over 2.5 Goals   </option><option value="OU35_U35">Under 3.5 Goals   </option><option value="OU35_O35">Over 3.5 Goals   </option><option value="OU45_U45">Under 4.5 Goals   </option><option value="OU45_O45">Over 4.5 Goals   </option><option value="OU55_U55">Under 5.5 Goals   </option><option value="OU55_O55">Over 5.5 Goals   </option><option value="CS_00">0-0   </option><option value="CS_11">1-1   </option><option value="CS_22">2-2   </option><option value="CS_33">3-3   </option><option value="CS_10">1-0   </option><option value="CS_20">2-0   </option><option value="CS_30">3-0   </option><option value="CS_21">2-1   </option><option value="CS_31">3-1   </option><option value="CS_32">3-2   </option><option value="CS_01">0-1   </option><option value="CS_02">0-2   </option><option value="CS_03">0-3   </option><option value="CS_12">1-2   </option><option value="CS_13">1-3   </option><option value="CS_23">2-3   </option><option value="CS_Other">CS Other   </option></select></td><td><select id="betkey4" inptype="betkey" class="input-small"><option value="pleaseselect">Select </option><option value="FT_Home">Home   </option><option value="FT_Draw">Draw   </option><option value="FT_Away">Away   </option><option value="DNB_Home">DNB Home   </option><option value="DNB_Away">DNB Away   </option><option value="OU15_U15">Under 1.5 Goals   </option><option value="OU15_O15">Over 1.5 Goals   </option><option value="OU25_U25">Under 2.5 Goals   </option><option value="OU25_O25">Over 2.5 Goals   </option><option value="OU35_U35">Under 3.5 Goals   </option><option value="OU35_O35">Over 3.5 Goals   </option><option value="OU45_U45">Under 4.5 Goals   </option><option value="OU45_O45">Over 4.5 Goals   </option><option value="OU55_U55">Under 5.5 Goals   </option><option value="OU55_O55">Over 5.5 Goals   </option><option value="CS_00">0-0   </option><option value="CS_11">1-1   </option><option value="CS_22">2-2   </option><option value="CS_33">3-3   </option><option value="CS_10">1-0   </option><option value="CS_20">2-0   </option><option value="CS_30">3-0   </option><option value="CS_21">2-1   </option><option value="CS_31">3-1   </option><option value="CS_32">3-2   </option><option value="CS_01">0-1   </option><option value="CS_02">0-2   </option><option value="CS_03">0-3   </option><option value="CS_12">1-2   </option><option value="CS_13">1-3   </option><option value="CS_23">2-3   </option><option value="CS_Other">CS Other   </option></select></td><td><select id="betkey5" inptype="betkey" class="input-small"><option value="pleaseselect">Select </option><option value="FT_Home">Home   </option><option value="FT_Draw">Draw   </option><option value="FT_Away">Away   </option><option value="DNB_Home">DNB Home   </option><option value="DNB_Away">DNB Away   </option><option value="OU15_U15">Under 1.5 Goals   </option><option value="OU15_O15">Over 1.5 Goals   </option><option value="OU25_U25">Under 2.5 Goals   </option><option value="OU25_O25">Over 2.5 Goals   </option><option value="OU35_U35">Under 3.5 Goals   </option><option value="OU35_O35">Over 3.5 Goals   </option><option value="OU45_U45">Under 4.5 Goals   </option><option value="OU45_O45">Over 4.5 Goals   </option><option value="OU55_U55">Under 5.5 Goals   </option><option value="OU55_O55">Over 5.5 Goals   </option><option value="CS_00">0-0   </option><option value="CS_11">1-1   </option><option value="CS_22">2-2   </option><option value="CS_33">3-3   </option><option value="CS_10">1-0   </option><option value="CS_20">2-0   </option><option value="CS_30">3-0   </option><option value="CS_21">2-1   </option><option value="CS_31">3-1   </option><option value="CS_32">3-2   </option><option value="CS_01">0-1   </option><option value="CS_02">0-2   </option><option value="CS_03">0-3   </option><option value="CS_12">1-2   </option><option value="CS_13">1-3   </option><option value="CS_23">2-3   </option><option value="CS_Other">CS Other   </option></select></td></tr><tr><td>Back/Lay</td><td><select id="bl1" addattr="" inptype="bl" class="input-small"><option value="pleaseselect">Select   </option><option value="b">Back</option><option value="l">Lay</option></select></td><td><select id="bl2" addattr="" inptype="bl" class="input-small"><option value="pleaseselect">Select   </option><option value="b">Back</option><option value="l">Lay</option></select></td><td><select id="bl3" addattr="" inptype="bl" class="input-small"><option value="pleaseselect">Select   </option><option value="b">Back</option><option value="l">Lay</option></select></td><td><select id="bl4" addattr="" inptype="bl" class="input-small"><option value="pleaseselect">Select   </option><option value="b">Back</option><option value="l">Lay</option></select></td><td><select id="bl5" addattr="" inptype="bl" class="input-small"><option value="pleaseselect">Select   </option><option value="b">Back</option><option value="l">Lay</option></select></td></tr><tr><td>Odds</td><td><input id="odds1" inptype="odds" addattr="" class="input-small" type="text"></td><td><input id="odds2" inptype="odds" addattr="" class="input-small" type="text"></td><td><input id="odds3" inptype="odds" addattr="" class="input-small" type="text"></td><td><input id="odds4" inptype="odds" addattr="" class="input-small" type="text"></td><td><input id="odds5" inptype="odds" addattr="" class="input-small" type="text"></td></tr><tr><td>Amt</td><td><input id="amt1" inptype="amt" addattr="" class="input-small" type="text"></td><td><input id="amt2" inptype="amt" addattr="" class="input-small" type="text"></td><td><input id="amt3" inptype="amt" addattr="" class="input-small" type="text"></td><td><input id="amt4" inptype="amt" addattr="" class="input-small" type="text"></td><td><input id="amt5" inptype="amt" addattr="" class="input-small" type="text"></td></tr><tr><td></td><td><input id="calc" value="Calc!" class="btn btn-info input-small" type="button"></td><td id="info"></td></tr></tbody></table></div><div class=""><table class="results"><tbody><tr><th>-</th><th>Home Goals=0</th><th>Home Goals=1</th><th>Home Goals=2</th><th>Home Goals=3</th><th>Home Goals=4</th><th>Home Goals=5</th></tr><tr><td>Away Goals=0</td><td outtype="pnl" hot_ht_g="0" awt_ht_g="0" hot_ft_g="0" awt_ft_g="0">-100</td><td outtype="pnl" hot_ht_g="1" awt_ht_g="0" hot_ft_g="1" awt_ft_g="0">100</td><td outtype="pnl" hot_ht_g="2" awt_ht_g="0" hot_ft_g="2" awt_ft_g="0">100</td><td outtype="pnl" hot_ht_g="3" awt_ht_g="0" hot_ft_g="3" awt_ft_g="0">100</td><td outtype="pnl" hot_ht_g="4" awt_ht_g="0" hot_ft_g="4" awt_ft_g="0">100</td><td outtype="pnl" hot_ht_g="5" awt_ht_g="0" hot_ft_g="5" awt_ft_g="0">100</td></tr><tr><td>Away Goals=1</td><td outtype="pnl" hot_ht_g="0" awt_ht_g="1" hot_ft_g="0" awt_ft_g="1">-100</td><td outtype="pnl" hot_ht_g="1" awt_ht_g="1" hot_ft_g="1" awt_ft_g="1">-100</td><td outtype="pnl" hot_ht_g="2" awt_ht_g="1" hot_ft_g="2" awt_ft_g="1">100</td><td outtype="pnl" hot_ht_g="3" awt_ht_g="1" hot_ft_g="3" awt_ft_g="1">100</td><td outtype="pnl" hot_ht_g="4" awt_ht_g="1" hot_ft_g="4" awt_ft_g="1">100</td><td outtype="pnl" hot_ht_g="5" awt_ht_g="1" hot_ft_g="5" awt_ft_g="1">100</td></tr><tr><td>Away Goals=2</td><td outtype="pnl" hot_ht_g="0" awt_ht_g="2" hot_ft_g="0" awt_ft_g="2">-100</td><td outtype="pnl" hot_ht_g="1" awt_ht_g="2" hot_ft_g="1" awt_ft_g="2">-100</td><td outtype="pnl" hot_ht_g="2" awt_ht_g="2" hot_ft_g="2" awt_ft_g="2">-100</td><td outtype="pnl" hot_ht_g="3" awt_ht_g="2" hot_ft_g="3" awt_ft_g="2">100</td><td outtype="pnl" hot_ht_g="4" awt_ht_g="2" hot_ft_g="4" awt_ft_g="2">100</td><td outtype="pnl" hot_ht_g="5" awt_ht_g="2" hot_ft_g="5" awt_ft_g="2">100</td></tr><tr><td>Away Goals=3</td><td outtype="pnl" hot_ht_g="0" awt_ht_g="3" hot_ft_g="0" awt_ft_g="3">-100</td><td outtype="pnl" hot_ht_g="1" awt_ht_g="3" hot_ft_g="1" awt_ft_g="3">-100</td><td outtype="pnl" hot_ht_g="2" awt_ht_g="3" hot_ft_g="2" awt_ft_g="3">-100</td><td outtype="pnl" hot_ht_g="3" awt_ht_g="3" hot_ft_g="3" awt_ft_g="3">-100</td><td outtype="pnl" hot_ht_g="4" awt_ht_g="3" hot_ft_g="4" awt_ft_g="3">100</td><td outtype="pnl" hot_ht_g="5" awt_ht_g="3" hot_ft_g="5" awt_ft_g="3">100</td></tr><tr><td>Away Goals=4</td><td outtype="pnl" hot_ht_g="0" awt_ht_g="4" hot_ft_g="0" awt_ft_g="4">-100</td><td outtype="pnl" hot_ht_g="1" awt_ht_g="4" hot_ft_g="1" awt_ft_g="4">-100</td><td outtype="pnl" hot_ht_g="2" awt_ht_g="4" hot_ft_g="2" awt_ft_g="4">-100</td><td outtype="pnl" hot_ht_g="3" awt_ht_g="4" hot_ft_g="3" awt_ft_g="4">-100</td><td outtype="pnl" hot_ht_g="4" awt_ht_g="4" hot_ft_g="4" awt_ft_g="4">-100</td><td outtype="pnl" hot_ht_g="5" awt_ht_g="4" hot_ft_g="5" awt_ft_g="4">100</td></tr><tr><td>Away Goals=5</td><td outtype="pnl" hot_ht_g="0" awt_ht_g="5" hot_ft_g="0" awt_ft_g="5">-100</td><td outtype="pnl" hot_ht_g="1" awt_ht_g="5" hot_ft_g="1" awt_ft_g="5">-100</td><td outtype="pnl" hot_ht_g="2" awt_ht_g="5" hot_ft_g="2" awt_ft_g="5">-100</td><td outtype="pnl" hot_ht_g="3" awt_ht_g="5" hot_ft_g="3" awt_ft_g="5">-100</td><td outtype="pnl" hot_ht_g="4" awt_ht_g="5" hot_ft_g="4" awt_ft_g="5">-100</td><td outtype="pnl" hot_ht_g="5" awt_ht_g="5" hot_ft_g="5" awt_ft_g="5">-100</td></tr></tbody></table></div></div>"';



include "clienttemplates.php";
?>
<?php
$navigation = array(
"Full-Time Bet Comparison" => "bet-comparison/full-time",
"Half-Time Bet Comparison" => "bet-comparison/half-time",
"Half/Full-Time Bet Comparison" => "bet-comparison/half-full-time",
"Goals Poisson Model" => "poisson-model/goals",
"Home/Away Poisson Model" => "poisson-model/home-away",
"Goals In Play" => "in-play/full-time-goals",
"Goals In Play(HT)" => "in-play/half-time-goals",
"Full Time In Play" => "in-play/full-time",
"Half Time In Play" => "in-play/half-time",
"Draw No Bet In Play" => "in-play/draw-no-bet",
"Create From Correct Score" => "create-odds/correct-score",
"Create From Half Time/Full Time" => "create-odds/half-time-full-time"
)

//"Create O/U 1.5 Goals from Correct Score" => "create-odds/ou15-from-cs",
//"Create O/U 2.5 Goals from Correct Score" => "create-odds/ou25-from-cs"

?>

var templateMap = {
"bet-comparison-full-time":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $bcomp_ft).'"' ?>},
"bet-comparison-half-time":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $bcomp_ht).'"' ?>},
"bet-comparison-half-full-time":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $bcomp_htft).'"' ?>},
"create-odds-correct-score":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $cr_cs).'"' ?>},
"create-odds-half-time-full-time":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $cr_htft).'"' ?>},
"create-odds-ou15-from-cs":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $cr_ou15).'"' ?>},
"create-odds-ou25-from-cs":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $cr_ou25).'"' ?>},
"in-play-full-time-goals":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $ip_g).'"' ?>},
"in-play-half-time-goals":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $ip_g_ht).'"' ?>},
"in-play-full-time":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $ip_ft).'"' ?>},
"in-play-half-time":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $ip_ht).'"' ?>},
"in-play-draw-no-bet":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $ip_dnb).'"' ?>},
"poisson-model-home-away":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $poi_ha).'"' ?>},
"poisson-model-goals":{"templatecode":<?php echo '"'.str_replace("\n", "\\n", $poi_g).'"' ?>},
};
</script>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-33759035-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</head>
<body>


<div class="navbar">
  <div class="navbar-inner">
    <div class="container" style="width: auto;">
      <div class="nav-collapse">
        <ul class="nav">
          <li><a href="#home">Home</a></li>
          <li><a href="http://twitter.com/betbetterdotnet"><i class="icon-twitter-sign"></i> Follow Me On Twitter</a></li>
        </ul>
      </div><!-- /.nav-collapse -->
    </div>
  </div><!-- /navbar-inner -->
</div>


<div class="container-fluid">
  <div class="row-fluid">
       <div class="span2">
       <ul id="navigation" class="nav nav-pills nav-stacked">
       <?php foreach($navigation as $display => $id) {echo "<li><a href = '#$id' id=$id class='nav'>$display</a></li>";}?>
       </ul>
       </div>
      <p class='lead'> Welcome to bet-better.net <small>..helping you with your soccer betting</small> </p>
       <div id="content" class="span10">

<?php
if (isset($_GET["key"])) {
echo $str1;
?>
<br>
<input id= 'show-calcs' type='button' class='btn btn-info input-small' value = 'Click to see how this was Created'>
<?php
}
else {
echo $home_html;
}
?>

       </div>
  </div>
</div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>

  <script src="public/jade.js"></script>
  <script src="public/underscore-min.js"></script>
  <script src="public/backbone-min.js"></script>
  <script src="public/jslibpj/uirender.js"></script>
  <script src="public/betinfo.js"></script>
  <script src="public/projmvc.js"></script>

<script type="text/javascript">
var homeHtml=<?php echo '"'.str_replace("\n", "\\n", $home_html).'"' ?>;
var getKey='';

<?php
if (isset($_GET["key"])) {
?>
getKey = <?php echo '"'. $_GET["key"].'"' ?>;
<?php
}
?>
var sampleMessageMap = {"bet-comparison/full-time":[
{key:"key1","params":{"positions":["FT_Home","b","2","100"]},"message":"This is a sample position from match"}]};

var messageMap = {"key1":{"path":"#bet-comparison/full-time?key=key1","positions":[["FT_Home","b","2","100"]],"message":"This is a sample position from match"}};

$(document).ready(function() {

$('#show-calcs').click(function(e) {
window.location.href =window.location.origin+messageMap[getKey]['path']; 
app_router = new projMvc.Router;
Backbone.history.start();  
});

$('#status').html('Loaded!');
var app_router;
if (messageMap[getKey]!=undefined) {
}
else {
app_router = new projMvc.Router;
Backbone.history.start();
}

});
//<iframe src="https://docs.google.com/presentation/embed?id=1qyjSDeVq_s6hORWGUXId6MVKAQYxUWwb23Kmn5X0oII&start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>


</script>
</body>
</html>

