<?php
$mixin_calcb = <<<T
mixin calcb()
  tr
    td
    td 
      input(id='calc', class='btn btn-info input-small', type= 'button', value = 'Calc!')
    td#info 

T;

$mixin_odds_listinp = <<<T
mixin odds_listinp(inp)
  if inp.bl[0]!='bl'
    tr
      th Bet Market
      th Back Odds
      th Lay Odds
  if inp.betmarketlist
    each item in betinfo.getSelectionList(inp.betmarketlist)
      tr
        td #{item[1]}
        each blitem in inp.bl
          td
            input(betkey = '#{item[0]}', bl='#{blitem}',inptype = 'odds', class='input-small', type= 'text')
  if inp.betkeylist
    each item in betinfo.getSelectionList_BetKey(inp.betkeylist)
      tr
        td #{item[1]}
        each blitem in inp.bl
          td
            input(betkey = '#{item[0]}', bl='#{blitem}',inptype='odds', class='input-small', type= 'text')

T;

$mixin_select_betkey = <<<T
mixin select_betkey(inp)
  if inp.label.length==0
    td
      select(id='#{inp.id}',inptype='betkey',class='input-small')
        option(value='pleaseselect') Select 
          if inp.betkeylist
            each item in betinfo.getSelectionList_BetKey(inp.betkeylist)
              option(value='#{item[0]}') #{item[1]} 
          if inp.betmarketlist
            each item in betinfo.getSelectionList(inp.betmarketlist)
              option(value='#{item[0]}') #{item[1]}   
  else
    tr
      td #{inp.label}
      td
        select(id='#{inp.id}',inptype='betkey',class='input-small')
          option(value='pleaseselect') Select
            if inp.betkeylist
              each item in betinfo.getSelectionList_BetKey(inp.betkeylist)
                option(value='#{item[0]}') #{item[1]} 
            if inp.betmarketlist
              each item in betinfo.getSelectionList(inp.betmarketlist)
                option(value='#{item[0]}') #{item[1]}   

T;

$mixin_ip_res_ha = <<<T
mixin ip_res_ha(upper)
  tr
    th After(mins)
    th No More Goals
    th Another Home Team Goal
    th Another Away Team Goal
    each item in _.range(0,upper,5)
      tr
        td #{item}
        td(class = 'calc', ip_time_elapsed-offset = '#{item}',ip_hot_gsf-offset = 0,ip_awt_gsf-offset = 0) calc!
        td(class = 'calc',ip_time_elapsed-offset = '#{item}',ip_hot_gsf-offset = 1,ip_awt_gsf-offset = 0) calc!
        td(class = 'calc',ip_time_elapsed-offset = '#{item}',ip_hot_gsf-offset = 0,ip_awt_gsf-offset = 1) calc!

T;

$mixin_ip_res_g = <<<T
mixin ip_res_g(upper)
  tr
    th After(mins)
    th No More Goals
    th Another Goal
    th Another 2 Goals
    each item in _.range(0,upper,5)
      tr
        td #{item}
        td(class = 'calc', ip_time_elapsed-offset = '#{item}',ip_hot_gsf-offset = 0,ip_awt_gsf-offset = 0) calc!
        td(class = 'calc',ip_time_elapsed-offset = '#{item}',ip_hot_gsf-offset = 1,ip_awt_gsf-offset = 0) calc!
        td(class = 'calc',ip_time_elapsed-offset = '#{item}',ip_hot_gsf-offset = 2,ip_awt_gsf-offset = 0) calc!

T;

$mixin_inptext_numeric = <<<T
mixin inptext_numeric(inp)
  if inp.label.length==0
    td
      input(id='#{inp.id}', inptype = '#{inp.inptype}',type= 'text', addAttr='#{inp.addAttr}',class='input-small')
  else
    tr
      td #{inp.label}
      td
        input(id='#{inp.id}', inptype = '#{inp.inptype}',type= 'text', addAttr='#{inp.addAttr}',class='input-small')

T;

$mixin_select_numeric = <<<T
mixin select_numeric(inp)
  if inp.label.length==0
    td
      select(id='#{inp.id}', inptype = '#{inp.inptype}',addAttr='#{inp.addAttr}',class='input-small')
        option(value='pleaseselect') Select   
        each item in _.range(0,inp.upper,inp.incr)
          option(value='#{item}') #{item}
  else
    tr
      td #{inp.label}
      td
        select(id='#{inp.id}', inptype = '#{inp.inptype}',addAttr='#{inp.addAttr}',class='input-small')
          option(value='pleaseselect') Select   
          each item in _.range(0,inp.upper,inp.incr)
            option(value='#{item}') #{item}

T;

$mixin_betmarket_calc= <<<T
mixin betmarket_calc(inp)
  tr
    th Bet Market
      if inp.bl[0]=='bl'
        th Odds
      else
        th Back Odds
        th Lay Odds
  if inp.betmarketlist
    each item in betinfo.getSelectionList(inp.betmarketlist)
      tr
        td #{item[1]}
        each blitem in inp.bl
          td(betkey = '#{item[0]}', outtype = 'betkey', bl='#{blitem}') calc!
  if inp.betkeylist
    each item in betinfo.getSelectionList_BetKey(inp.betkeylist)
      tr
        td #{item[1]}
        each blitem in inp.bl
          td(betkey = '#{item[0]}', outtype = 'betkey', bl='#{blitem}') calc!

T;

$mixin_select_alpha = <<<T
mixin select_alpha(inp)
  if inp.label.length==0
    td
      select(id='#{inp.id}', addAttr='#{inp.addAttr}', inptype = '#{inp.inptype}',class='input-small')
        option(value='pleaseselect') Select   
        each item in inp.alpha_list
          option(value='#{item[0]}') #{item[1]}
  else
    tr
      td #{inp.label}
      td
        select(id='#{inp.id}', addAttr='#{inp.addAttr}', inptype = '#{inp.inptype}',class='input-small')
          option(value='pleaseselect') Select   
          each item in inp.alpha_list
            option(value='#{item[0]}') #{item[1]}

T;

$bcomp_ft=$mixin_calcb.$mixin_select_alpha.$mixin_select_betkey.$mixin_inptext_numeric.$mixin_select_numeric.$mixin_select_alpha.<<<T
- var blArray = [['b','Back'],['l','Lay']];
div(class='')
  div(class='')
    p
      |Enter BetMarket, Back/Lay, Odds and Amt for up to 5 positions and see what your profit and loss will be for different full time scores.
    table(class = '')
      tr
        td Selection
        each itemidx in ['betkey1','betkey2','betkey3','betkey4','betkey5']
          mixin select_betkey({id:itemidx,label:'',betmarketlist:['FT','DNB','OU15','OU25','OU35','OU45','OU55','CS']})
      tr
        td Back/Lay
        each itemidx in ['bl1','bl2','bl3','bl4','bl5']
          mixin select_alpha({id:itemidx,label:'',inptype:'bl',addAttr:'',alpha_list:blArray})
      tr
        td Odds
        each itemidx in ['odds1','odds2','odds3','odds4','odds5']
          mixin inptext_numeric({id:itemidx,label:'',inptype:'odds',addAttr:''})
      tr
        td Amt
        each itemidx in ['amt1','amt2','amt3','amt4','amt5']
          mixin inptext_numeric({id:itemidx,label:'',inptype:'amt',addAttr:''})
      mixin calcb

  div(class='')
    table(class = 'results')
      tr
        th -
        each hot in [0,1,2,3,4,5]
          th Home Goals=#{hot}
      each awt in [0,1,2,3,4,5]
        tr
          td Away Goals=#{awt}
          each hot in [0,1,2,3,4,5] 
            td(outtype = 'pnl', hot_ht_g='#{hot}', awt_ht_g= '#{awt}', hot_ft_g = '#{hot}', awt_ft_g = '#{awt}') calc! 
T;

$bcomp_ht=$mixin_calcb.$mixin_select_alpha.$mixin_select_betkey.$mixin_inptext_numeric.$mixin_select_numeric.$mixin_select_alpha.<<<T
- var blArray = [['b','Back'],['l','Lay']];
div(class='')
  div(class='')
    p
      |Enter BetMarket, Back/Lay, Odds and Amt for up to 5 positions and see what your profit and loss will be for different half time scores.
    table(class = '')
      tr
        td Selection
        each itemidx in ['betkey1','betkey2','betkey3','betkey4','betkey5']
          mixin select_betkey({id:itemidx,label:'',betmarketlist:['HT','OUHT15','CSHT']})
      tr
        td Back/Lay
        each itemidx in ['bl1','bl2','bl3','bl4','bl5']
          mixin select_alpha({id:itemidx,label:'',inptype:'bl',addAttr:'',alpha_list:blArray})
      tr
        td Odds
        each itemidx in ['odds1','odds2','odds3','odds4','odds5']
          mixin inptext_numeric({id:itemidx,label:'',inptype:'odds',addAttr:''})
      tr
        td Amt
        each itemidx in ['amt1','amt2','amt3','amt4','amt5']
          mixin inptext_numeric({id:itemidx,label:'',inptype:'amt',addAttr:''})
      mixin calcb

  div(class='')
    table(class = 'results')
      tr
        th -
        each hot in ['0','1','2','3','4','5+']
          th Home Goals=#{hot}
      each awt in [0,1,2,3,4,5]
        tr
          td Away Goals=#{awt}
          each hot in ['0','1','2','3','4','5+'] 
            td(outtype = 'pnl', hot_ht_g='#{hot}', awt_ht_g= '#{awt}', hot_ft_g = '#{hot}', awt_ft_g = '#{awt}') calc! 
T;



$bcomp_htft=$mixin_calcb.$mixin_select_alpha.$mixin_select_betkey.$mixin_inptext_numeric.$mixin_select_numeric.$mixin_select_alpha.<<<T
- var blArray = [['b','Back'],['l','Lay']];
div(class='')
  div(class='')
    p
      |Enter BetMarket, Back/Lay, Odds and Amt for up to 5 positions and see what your profit and loss will be for different half/full time outcomes.
    table(class = '')
      tr
        td Selection
        each itemidx in ['betkey1','betkey2','betkey3','betkey4','betkey5']
          mixin select_betkey({id:itemidx,label:'',betmarketlist:['FT','HT','HTFT']})
      tr
        td Back/Lay
        each itemidx in ['bl1','bl2','bl3','bl4','bl5']
          mixin select_alpha({id:itemidx,label:'',inptype:'bl',addAttr:'',alpha_list:blArray})
      tr
        td Odds
        each itemidx in ['odds1','odds2','odds3','odds4','odds5']
          mixin inptext_numeric({id:itemidx,label:'',inptype:'odds',addAttr:''})
      tr
        td Amt
        each itemidx in ['amt1','amt2','amt3','amt4','amt5']
          mixin inptext_numeric({id:itemidx,label:'',inptype:'amt',addAttr:''})

      mixin calcb

  div(class='')
    table(class = 'results')
      tr
        th -
        each ht in ['Home','Away','Draw']
          th Half Time=#{ht}
      tr
        td Full Time = Home
        td(outtype = 'pnl', hot_ht_g = 1,awt_ht_g = 0,hot_ft_g = 1, awt_ft_g = 0) calc!
        td(outtype = 'pnl', hot_ht_g = 0,awt_ht_g = 1,hot_ft_g = 2, awt_ft_g = 1) calc!
        td(outtype = 'pnl', hot_ht_g = 0,awt_ht_g = 0,hot_ft_g = 1, awt_ft_g = 0) calc!
      tr
        td Full Time = Away
        td(outtype = 'pnl', hot_ht_g = 1,awt_ht_g = 0,hot_ft_g = 1, awt_ft_g = 2) calc!
        td(outtype = 'pnl', hot_ht_g = 0,awt_ht_g = 1,hot_ft_g = 0, awt_ft_g = 1) calc!
        td(outtype = 'pnl', hot_ht_g = 0,awt_ht_g = 0,hot_ft_g = 0, awt_ft_g = 1) calc!
      tr
        td Full Time = Draw
        td(outtype = 'pnl', hot_ht_g = 1,awt_ht_g = 0,hot_ft_g = 1, awt_ft_g = 1) calc!
        td(outtype = 'pnl', hot_ht_g = 0,awt_ht_g = 1,hot_ft_g = 1, awt_ft_g = 1) calc!
        td(outtype = 'pnl', hot_ht_g = 0,awt_ht_g = 0,hot_ft_g = 0, awt_ft_g = 0) calc!

T;


$cr_htft= $mixin_calcb.$mixin_inptext_numeric.$mixin_betmarket_calc.$mixin_odds_listinp.<<<T
div(class='row-fluid')
  div(class='span4')
    p
      |Enter Half/Full Time Odds and see what odds these equate to.
    table(class = '')
      mixin odds_listinp({bl:['b','l'],betmarketlist:['HTFT']})
      mixin calcb
  div(class='span4')
    table(class = 'results')
      mixin betmarket_calc({bl:['b','l'],betmarketlist:['HT','FT']})
T;

$cr_cs =  $mixin_calcb.$mixin_inptext_numeric.$mixin_betmarket_calc.$mixin_odds_listinp.<<<T
div(class='row-fluid')
  div(class='span4')
    p
      |Enter Correct Score Odds and see what odds these equate to.
    table(class = '')
      mixin odds_listinp({bl:['b','l'],betmarketlist:['CS']})
      mixin calcb
  div(class='span4')
    table(class = 'results')
      mixin betmarket_calc({bl:['b','l'],betmarketlist:['OU15','OU25','OU35']})
T;

$cr_ou15 = $mixin_calcb.$mixin_inptext_numeric.$mixin_betmarket_calc.$mixin_odds_listinp.<<<T

div(class='row-fluid')
  div(class='span4')
    p
      |Enter Correct Score Odds linked to Over/Under 1.5 Goals see what odds these equate to.
    table(class = '')
      mixin odds_listinp({bl:['b','l'],betkeylist:['CS_00','CS_10','CS_01']})
      mixin calcb
  div(class='span4')
    table(class = 'results')
      mixin betmarket_calc({bl:['b','l'],betmarketlist:['OU15']})

T;

$cr_ou25 = $mixin_calcb.$mixin_inptext_numeric.$mixin_betmarket_calc.$mixin_odds_listinp.<<<T
div(class='row-fluid')
  div(class='span4')
    p
      |Enter Correct Score Odds linked to Over/Under 2.5 Goals see what odds these equate to.
    table(class = '')
      mixin odds_listinp({bl:['b','l'],betkeylist:['CS_00','CS_11','CS_10','CS_20','CS_01','CS_02']})
      mixin calcb
  div(class='span4')
    table(class = 'results')
      mixin betmarket_calc({bl:['b','l'],betmarketlist:['OU25']})
T;

$poi_ha = $mixin_calcb.$mixin_inptext_numeric.$mixin_betmarket_calc.<<<T
div(class='row-fluid')
  div(class='span4')
    p
      |Enter the expected goals for home and away team to see what odds these equate to.
    table(class = '')
      mixin inptext_numeric({id:'hot_ft_aeg',label:'Home Expected Goals'})
      mixin inptext_numeric({id:'awt_ft_aeg',label:'Away Expected Goals'})
      mixin calcb
  div(class='span4')
    table(class = 'results')
      mixin betmarket_calc({bl:['bl'],betmarketlist:['FT','HT','DNB','CS']})
T;


$poi_g= $mixin_calcb.$mixin_inptext_numeric.$mixin_betmarket_calc.<<<T
div(class='row-fluid')
  div(class='span4')
    p
      |Enter the total expected goals and see what odds these equate to.
    table(class = '')
      mixin inptext_numeric({id:'total_ft_aeg',inptype:'poi',addAttr:'',label:'Expected Goals'})
      mixin calcb
  div(class='span4')
    table(class = 'results')
      mixin betmarket_calc({bl:['bl'],inptype:'poi',addAttr:'',betmarketlist:['OU15','OU25','OU35','OU45','OUHT15']})
T;

$ip_g = $mixin_calcb.$mixin_ip_res_g.$mixin_select_betkey.$mixin_select_numeric.$mixin_inptext_numeric.<<<T
div(class='row-fluid')
  div(class='span4')
    p
      |Enter a full time goals betmarket, odds, goals so far and the time elapsed. 
    table(class = '')
      mixin select_betkey({id:'betkey_g',label:'Bet',betmarketlist:['OU15','OU25','OU35','OU45']})
      mixin inptext_numeric({id:'odds',addAttr:'',inptype:'odds',label:'Odds',addAttr:''})
      mixin select_numeric({id:'ip_hot_gsf',addAttr:'',inptype:'goals',label:'Total Goals So Far',addAttr:'',upper:11,incr:1})
      mixin select_numeric({id:'ip_time_elapsed',addAttr:'',inptype:'time',label:'Time Elapsed',addAttr:'',upper:95,incr:5})
      mixin calcb
  div(class='span4')
    p
      |The expected odds at 5 minute intervals. 
    table(class = 'results')
      mixin ip_res_g(95)
T;

$ip_g_ht = $mixin_calcb.$mixin_ip_res_g.$mixin_select_betkey.$mixin_select_numeric.$mixin_inptext_numeric.<<<T
div(class='row-fluid')
  div(class='span4')
    p
      |Enter the odds for a half time goals betmarket, goals so far and the time elapsed. 
    table(class = '')
      mixin select_betkey({id:'betkey_g',label:'Bet',betmarketlist:['OUHT15']})
      mixin inptext_numeric({id:'odds',addAttr:'',inptype:'odds',label:'Odds',addAttr:''})
      mixin select_numeric({id:'ip_hot_gsf',label:'Total Goals So Far',inptype:'goals',addAttr:'',upper:11,incr:1})
      mixin select_numeric({id:'ip_time_elapsed',addAttr:'',inptype:'time',label:'Time Elapsed',addAttr:'',upper:50,incr:5})
      mixin calcb
  div(class='span4')
    p
      |The expected odds at 5 minute intervals. 
    table(class = 'results')
      mixin ip_res_g(50)
T;

$ip_ht = $mixin_calcb.$mixin_ip_res_ha.$mixin_select_numeric.$mixin_odds_listinp.<<<T
div(class='row-fluid')
  div(class='span4')
    p
      |Enter the odds for Half Time Home, Half Time Away and Under 1.5 Half Time Goals, goals so far and the time elapsed. 
    table(class = '')
      mixin odds_listinp({bl:['bl'],betkeylist:['HT_Home','HT_Away','OUHT15_U15']})
      mixin select_numeric({id:'ip_hot_gsf',inptype:'goals',label:'HT Goals So Far',addAttr:'',upper:11,incr:1})
      mixin select_numeric({id:'ip_awt_gsf',inptype:'goals',label:'AT Goals So Far',addAttr:'',upper:11,incr:1})
      mixin select_numeric({id:'ip_time_elapsed',inptype:'time',label:'Time Elapsed',addAttr:'',upper:95,incr:5})
      mixin calcb
  div(class='span4')
    p
      |The expected odds at 5 minute intervals. 
    table(class = 'results')
      mixin ip_res_ha(50)
T;

$ip_ft = $mixin_calcb.$mixin_ip_res_ha.$mixin_select_numeric.$mixin_odds_listinp.<<<T
div(class='row-fluid')
  div(class='span4')
    p
      |Enter the odds for Full Time Home, Full Time Away and Under 2.5 Goals, goals so far and the time elapsed. 
    table(class = '')
      mixin odds_listinp({bl:['bl'],betkeylist:['FT_Home','FT_Away','OU25_U25']})
      mixin select_numeric({id:'ip_hot_gsf',inptype:'goals',label:'Goals So Far',addAttr:'',upper:11,incr:1})
      mixin select_numeric({id:'ip_awt_gsf',inptype:'goals',label:'Goals So Far',addAttr:'',upper:11,incr:1})
      mixin select_numeric({id:'ip_time_elapsed',inptype:'time',label:'Time Elapsed',addAttr:'',upper:50,incr:5})
      mixin calcb
  div(class='span4')
    p
      |The expected odds at 5 minute intervals. 
    table(class = 'results')
      mixin ip_res_ha(95)
T;

$ip_dnb = $mixin_calcb.$mixin_ip_res_ha.$mixin_select_numeric.$mixin_odds_listinp.<<<T
div(class='row-fluid')
  div(class='span4')
    p
      |Enter the odds for Full Time Home Draw No Bet, Full Time Away Draw No Bet and Under 2.5 Goals, goals so far and the time elapsed. 
    table(class = '')
      mixin odds_listinp({bl:['bl'],betkeylist:['DNB_Home','DNB_Away','OU25_U25']})
      mixin select_numeric({id:'ip_hot_gsf',inptype:'goals',label:'HT Goals So Far',addAttr:'',upper:11,incr:1})
      mixin select_numeric({id:'ip_awt_gsf',inptype:'goals',label:'AT Goals So Far',addAttr:'',upper:11,incr:1})
      mixin select_numeric({id:'ip_time_elapsed',inptype:'time',label:'Time Elapsed',addAttr:'',upper:95,incr:5})
      mixin calcb
  div(class='span4')
    p
      |The expected odds at 5 minute intervals. 
    table(class = 'results')
      mixin ip_res_ha(95)
T;

$home_html = <<<T
<div class='span2'>
<p class='lead'>Comparison Screens</p>
<ul>
<li>Full-Time Bet Comparison</li>
<li>Half-Time Bet Comparison</li> 
<li>Half/Full-Time Bet Comparison</li>
</ul>
<p>Input bets and see how much you make/lose for various outcomes. <em>e.g. What are the various outcomes from backing Home Win in Full Time Market and Laying Home/Home in the Half-Time / Full-Time Market.</em></p>
<img src='img/img1.gif'>
</div>
<div class='span2'>
<p class='lead'> Poisson Model Screens</p>
<ul>
<li>Goals Poisson Model</li>
<li>Home/Away Poisson Model</li>
</ul>
<p>Input expected goals and get the odds that they equate to using a poisson model. <em>e.g. If the home team is expected to score 1.5 goals and the away team 1.0 goals then what Home Full Time Odds does this equate to, what Half-Time Away Odds does this equate to.</em></p>
<img src='img/img2.gif'>
</div>
<div class='span2'>
<p class='lead'>In Play Screens</p>
<ul>
<li>Goals In Play</li>
<li>Goals In Play(HT)</li>
<li>Full Time In Play</li>
<li>Half Time In Play</li> 
<li>Draw No Bet In Play</li>
</ul>
<p>Analyse how odds are likely to change in-play due to factors like goals being scored and the passage of time. <em>e.g. what will happen to the 
under 2.5 goal odds if there are no goals after 5 minutes, or if there is a goal after 30 minutes or two goals after 60 minutes.</em></p>
<img src='img/img3.gif'>
</div>
<div class='span2'>
<p class='lead'>Create Odds Screens</p>
<ul>
<li>Create From Correct Score</li> 
<li>Create From Half Time/Full Time</li>
</ul>
<p>Create Odds from a combination of other odds. <em>e.g. Create Under 1.5 Goals from a combination of 0-0,1-0 and 0-1. Or Half Time Draw odds from a combination of Draw/Home, Draw/Away and Draw/Draw from the Half-Time / Full-Time Markets.</em></p>
<img src='img/img4.gif'>
</div>
T;


?>
