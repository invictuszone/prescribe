(function($){var DATA_ORIGINAL_DOM_KEY='columnizer-original-dom';$.fn.columnize=function(options){this.each(function(){var $el=$(this);$el.data(DATA_ORIGINAL_DOM_KEY,$el.clone(true,true));});this.cols=[];this.offset=0;this.before=[];this.lastOther=0;this.prevMax=0;this.debug=0;this.setColumnStart=null;this.elipsisText='';var defaults={width:400,columns:false,buildOnce:false,overflow:false,doneFunc:function(){},target:false,ignoreImageLoading:true,columnFloat:"left",lastNeverTallest:false,accuracy:false,precise:false,manualBreaks:false,cssClassPrefix:"",elipsisText:'...',debug:0};options=$.extend(defaults,options);if(typeof(options.width)=="string"){options.width=parseInt(options.width,10);if(isNaN(options.width)){options.width=defaults.width;}}
if(typeof options.setColumnStart=='function'){this.setColumnStart=options.setColumnStart;}
if(typeof options.elipsisText=='string'){this.elipsisText=options.elipsisText;}
if(options.debug){this.debug=options.debug;}
if(!options.setWidth){if(options.precise){options.setWidth=function(numCols){return 100/numCols;};}else{options.setWidth=function(numCols){return Math.floor(100/numCols);};}}
function appendSafe($target,$elem){try{$target.append($elem);}catch(e){$target[0].appendChild($elem[0]);}}
return this.each(function(){var $inBox=options.target?$(options.target):$(this);var maxHeight=$(this).height();var $cache=$('<div></div>');var lastWidth=0;var columnizing=false;var manualBreaks=options.manualBreaks;var cssClassPrefix=defaults.cssClassPrefix;if(typeof(options.cssClassPrefix)=="string"){cssClassPrefix=options.cssClassPrefix;}
var adjustment=0;appendSafe($cache,$(this).contents().clone(true));if(!options.ignoreImageLoading&&!options.target){if(!$inBox.data("imageLoaded")){$inBox.data("imageLoaded",true);if($(this).find("img").length>0){var func=function($inBox,$cache){return function(){if(!$inBox.data("firstImageLoaded")){$inBox.data("firstImageLoaded","true");appendSafe($inBox.empty(),$cache.children().clone(true));$inBox.columnize(options);}};}($(this),$cache);$(this).find("img").one("load",func);$(this).find("img").one("abort",func);return;}}}
$inBox.empty();columnizeIt();if(!options.buildOnce){$(window).resize(function(){if(!options.buildOnce){if($inBox.data("timeout")){clearTimeout($inBox.data("timeout"));}
$inBox.data("timeout",setTimeout(columnizeIt,200));}});}
function prefixTheClassName(className,withDot){var dot=withDot?".":"";if(cssClassPrefix.length){return dot+cssClassPrefix+"-"+className;}
return dot+className;}
function columnize($putInHere,$pullOutHere,$parentColumn,targetHeight){while((manualBreaks||$parentColumn.height()<targetHeight)&&$pullOutHere[0].childNodes.length){var node=$pullOutHere[0].childNodes[0];if($(node).find(prefixTheClassName("columnbreak",true)).length){return;}
if($(node).hasClass(prefixTheClassName("columnbreak"))){return;}
appendSafe($putInHere,$(node));}
if($putInHere[0].childNodes.length===0)return;var kids=$putInHere[0].childNodes;var lastKid=kids[kids.length-1];$putInHere[0].removeChild(lastKid);var $item=$(lastKid);if($item[0].nodeType==3){var oText=$item[0].nodeValue;var counter2=options.width/18;if(options.accuracy)
counter2=options.accuracy;var columnText;var latestTextNode=null;while($parentColumn.height()<targetHeight&&oText.length){var indexOfSpace=oText.indexOf(' ',counter2);if(indexOfSpace!=-1){columnText=oText.substring(0,indexOfSpace);}else{columnText=oText;}
latestTextNode=document.createTextNode(columnText);appendSafe($putInHere,$(latestTextNode));if(oText.length>counter2&&indexOfSpace!=-1){oText=oText.substring(indexOfSpace);}else{oText="";}}
if($parentColumn.height()>=targetHeight&&latestTextNode!==null){$putInHere[0].removeChild(latestTextNode);oText=latestTextNode.nodeValue+oText;}
if(oText.length){$item[0].nodeValue=oText;}else{return false;}}
if($pullOutHere.contents().length){$pullOutHere.prepend($item);}else{appendSafe($pullOutHere,$item);}
return $item[0].nodeType==3;}
function split($putInHere,$pullOutHere,$parentColumn,targetHeight){if($putInHere.contents(":last").find(prefixTheClassName("columnbreak",true)).length){return;}
if($putInHere.contents(":last").hasClass(prefixTheClassName("columnbreak"))){return;}
if($pullOutHere.contents().length){var $cloneMe=$pullOutHere.contents(":first");if(typeof $cloneMe.get(0)=='undefined'||$cloneMe.get(0).nodeType!=1)return;var $clone=$cloneMe.clone(true);if($cloneMe.hasClass(prefixTheClassName("columnbreak"))){appendSafe($putInHere,$clone);$cloneMe.remove();}else if(manualBreaks){appendSafe($putInHere,$clone);$cloneMe.remove();}else if($clone.get(0).nodeType==1&&!$clone.hasClass(prefixTheClassName("dontend"))){appendSafe($putInHere,$clone);if($clone.is("img")&&$parentColumn.height()<targetHeight+20){$cloneMe.remove();}else if($cloneMe.hasClass(prefixTheClassName("dontsplit"))&&$parentColumn.height()<targetHeight+20){$cloneMe.remove();}else if($clone.is("img")||$cloneMe.hasClass(prefixTheClassName("dontsplit"))){$clone.remove();}else{$clone.empty();if(!columnize($clone,$cloneMe,$parentColumn,targetHeight)){$cloneMe.addClass(prefixTheClassName("split"));if($cloneMe.get(0).tagName=='OL'){var startWith=$clone.get(0).childElementCount+$clone.get(0).start;$cloneMe.attr('start',startWith+1);}
if($cloneMe.children().length){split($clone,$cloneMe,$parentColumn,targetHeight);}}else{$cloneMe.addClass(prefixTheClassName("split"));}
if($clone.get(0).childNodes.length===0){$clone.remove();$cloneMe.removeClass(prefixTheClassName("split"));}else if($clone.get(0).childNodes.length==1){var onlyNode=$clone.get(0).childNodes[0];if(onlyNode.nodeType==3){var nonwhitespace=/\S/;var str=onlyNode.nodeValue;if(!nonwhitespace.test(str)){$clone.remove();$cloneMe.removeClass(prefixTheClassName("split"));}}}}}}}
function singleColumnizeIt(){if($inBox.data("columnized")&&$inBox.children().length==1){return;}
$inBox.data("columnized",true);$inBox.data("columnizing",true);$inBox.empty();$inBox.append($("<div class='"
+prefixTheClassName("first")+" "
+prefixTheClassName("last")+" "
+prefixTheClassName("column")+" "
+"' style='width:100%; float: "+options.columnFloat+";'></div>"));$col=$inBox.children().eq($inBox.children().length-1);$destroyable=$cache.clone(true);if(options.overflow){targetHeight=options.overflow.height;columnize($col,$destroyable,$col,targetHeight);if(!$destroyable.contents().find(":first-child").hasClass(prefixTheClassName("dontend"))){split($col,$destroyable,$col,targetHeight);}
while($col.contents(":last").length&&checkDontEndColumn($col.contents(":last").get(0))){var $lastKid=$col.contents(":last");$lastKid.remove();$destroyable.prepend($lastKid);}
var html="";var div=document.createElement('DIV');while($destroyable[0].childNodes.length>0){var kid=$destroyable[0].childNodes[0];if(kid.attributes){for(var i=0;i<kid.attributes.length;i++){if(kid.attributes[i].nodeName.indexOf("jQuery")===0){kid.removeAttribute(kid.attributes[i].nodeName);}}}
div.innerHTML="";div.appendChild($destroyable[0].childNodes[0]);html+=div.innerHTML;}
var overflow=$(options.overflow.id)[0];overflow.innerHTML=html;}else{appendSafe($col,$destroyable.contents());}
$inBox.data("columnizing",false);if(options.overflow&&options.overflow.doneFunc){options.overflow.doneFunc();}
options.doneFunc();}
function checkDontEndColumn(dom){if(dom.nodeType==3){if(/^\s+$/.test(dom.nodeValue)){if(!dom.previousSibling)return false;return checkDontEndColumn(dom.previousSibling);}
return false;}
if(dom.nodeType!=1)return false;if($(dom).hasClass(prefixTheClassName("dontend")))return true;if(dom.childNodes.length===0)return false;return checkDontEndColumn(dom.childNodes[dom.childNodes.length-1]);}
function columnizeIt(){adjustment=0;if(lastWidth==$inBox.width())return;lastWidth=$inBox.width();var numCols=Math.round($inBox.width()/options.width);var optionWidth=options.width;var optionHeight=options.height;if(options.columns)numCols=options.columns;if(manualBreaks){numCols=$cache.find(prefixTheClassName("columnbreak",true)).length+1;optionWidth=false;}
if(numCols<=1){return singleColumnizeIt();}
if($inBox.data("columnizing"))return;$inBox.data("columnized",true);$inBox.data("columnizing",true);$inBox.empty();$inBox.append($("<div style='width:"+options.setWidth(numCols)+"%; float: "+options.columnFloat+";'></div>"));$col=$inBox.children(":last");appendSafe($col,$cache.clone());maxHeight=$col.height();$inBox.empty();var targetHeight=maxHeight/numCols;var firstTime=true;var maxLoops=3;var scrollHorizontally=false;if(options.overflow){maxLoops=1;targetHeight=options.overflow.height;}else if(optionHeight&&optionWidth){maxLoops=1;targetHeight=optionHeight;scrollHorizontally=true;}
for(var loopCount=0;loopCount<maxLoops&&loopCount<20;loopCount++){$inBox.empty();var $destroyable,className,$col,$lastKid;try{$destroyable=$cache.clone(true);}catch(e){$destroyable=$cache.clone();}
$destroyable.css("visibility","hidden");for(var i=0;i<numCols;i++){className=(i===0)?prefixTheClassName("first"):"";className+=" "+prefixTheClassName("column");className=(i==numCols-1)?(prefixTheClassName("last")+" "+className):className;$inBox.append($("<div class='"+className+"' style='width:"+options.setWidth(numCols)+"%; float: "+options.columnFloat+";'></div>"));}
i=0;while(i<numCols-(options.overflow?0:1)||scrollHorizontally&&$destroyable.contents().length){if($inBox.children().length<=i){$inBox.append($("<div class='"+className+"' style='width:"+options.setWidth(numCols)+"%; float: "+options.columnFloat+";'></div>"));}
$col=$inBox.children().eq(i);if(scrollHorizontally){$col.width(optionWidth+"px");}
columnize($col,$destroyable,$col,targetHeight);split($col,$destroyable,$col,targetHeight);while($col.contents(":last").length&&checkDontEndColumn($col.contents(":last").get(0))){$lastKid=$col.contents(":last");$lastKid.remove();$destroyable.prepend($lastKid);}
i++;if($col.contents().length===0&&$destroyable.contents().length){$col.append($destroyable.contents(":first"));}else if(i==numCols-(options.overflow?0:1)&&!options.overflow){if($destroyable.find(prefixTheClassName("columnbreak",true)).length){numCols++;}}}
if(options.overflow&&!scrollHorizontally){var IE6=false;var IE7=(document.all)&&(navigator.appVersion.indexOf("MSIE 7.")!=-1);if(IE6||IE7){var html="";var div=document.createElement('DIV');while($destroyable[0].childNodes.length>0){var kid=$destroyable[0].childNodes[0];for(i=0;i<kid.attributes.length;i++){if(kid.attributes[i].nodeName.indexOf("jQuery")===0){kid.removeAttribute(kid.attributes[i].nodeName);}}
div.innerHTML="";div.appendChild($destroyable[0].childNodes[0]);html+=div.innerHTML;}
var overflow=$(options.overflow.id)[0];overflow.innerHTML=html;}else{$(options.overflow.id).empty().append($destroyable.contents().clone(true));}}else if(!scrollHorizontally){$col=$inBox.children().eq($inBox.children().length-1);$destroyable.contents().each(function(){$col.append($(this));});var afterH=$col.height();var diff=afterH-targetHeight;var totalH=0;var min=10000000;var max=0;var lastIsMax=false;var numberOfColumnsThatDontEndInAColumnBreak=0;$inBox.children().each(function($inBox){return function($item){var $col=$inBox.children().eq($item);var endsInBreak=$col.children(":last").find(prefixTheClassName("columnbreak",true)).length;if(!endsInBreak){var h=$col.height();lastIsMax=false;totalH+=h;if(h>max){max=h;lastIsMax=true;}
if(h<min)min=h;numberOfColumnsThatDontEndInAColumnBreak++;}};}($inBox));var avgH=totalH/numberOfColumnsThatDontEndInAColumnBreak;if(totalH===0){loopCount=maxLoops;}else if(options.lastNeverTallest&&lastIsMax){adjustment+=5;targetHeight=targetHeight+30;if(loopCount==maxLoops-1)maxLoops++;}else if(max-min>30){targetHeight=avgH+30;}else if(Math.abs(avgH-targetHeight)>20){targetHeight=avgH;}else{loopCount=maxLoops;}}else{$inBox.children().each(function(i){$col=$inBox.children().eq(i);$col.width(optionWidth+"px");if(i===0){$col.addClass(prefixTheClassName("first"));}else if(i==$inBox.children().length-1){$col.addClass(prefixTheClassName("last"));}else{$col.removeClass(prefixTheClassName("first"));$col.removeClass(prefixTheClassName("last"));}});$inBox.width($inBox.children().length*optionWidth+"px");}
$inBox.append($("<br style='clear:both;'>"));}
$inBox.find(prefixTheClassName("column",true)).find(":first"+prefixTheClassName("removeiffirst",true)).remove();$inBox.find(prefixTheClassName("column",true)).find(':last'+prefixTheClassName("removeiflast",true)).remove();$inBox.find(prefixTheClassName("split",true)).find(":first"+prefixTheClassName("removeiffirst",true)).remove();$inBox.find(prefixTheClassName("split",true)).find(':last'+prefixTheClassName("removeiflast",true)).remove();$inBox.data("columnizing",false);if(options.overflow){options.overflow.doneFunc();}
options.doneFunc();}});};$.fn.uncolumnize=function(){this.each(function(){var $el=$(this),$clone;if($clone=$el.data(DATA_ORIGINAL_DOM_KEY)){$el.replaceWith($clone);}});};$.fn.renumberByJS=function($searchTag,$colno,$targetId,$targetClass){this.setList=function($cols,$list,$tag1){var $parents=this.before.parents();var $rest;$rest=$($cols[this.offset-1]).find('>*');if(($rest.last())[0].tagName!=$tag1.toUpperCase()){if(this.debug){console.log("Last item in previous column, isn't a list...");}
return 0;}
$rest=$rest.length;var $tint=1;if(this.lastOther<=0){$tint=this.before.children().length+1;}else{$tint=$($parents[this.lastOther]).children().length+1;}
if($($cols[this.offset]).find($tag1+':first li.split').length){var $whereElipsis=$($cols[this.offset-1]).find($tag1+':last li:last');if(this.elipsisText===''||$($cols[this.offset-1]).find($tag1+':last ~ div').length||$($cols[this.offset-1]).find($tag1+':last ~ p').length){;}else{if($($whereElipsis).find('ul, ol, dl').length==0){var $txt=$whereElipsis.last().text();var $len=$txt.length;if($txt.substring($len-1)==';'){if($txt.substring($len-4)!=this.elipsisText+';'){$txt=$txt.substring(0,$len-1)+this.elipsisText+';';}}else{if($txt.substring($len-3)!=this.elipsisText){$txt+=this.elipsisText;}}
$whereElipsis.last().text($txt);}}
if($($cols[this.offset]).find($tag1+':first >li.split >'+$tag1).length==0){$tint--;}}
if($rest==1){$tint+=this.prevMax;}
if(this.nest>1){if(this.debug){console.log("Supposed to be a nested list...decr");}
$tint--;var $tt=$($cols[this.offset-1]).find($tag1+':first li.split:first');if($tt.length>0){if(this.debug){console.log("Previous column started with a split item, so that count is one less than expected");}
$tint--;}
$tt=$($cols[this.offset]).find($tag1+':first li:first').clone();$tt.children().remove();if($.trim($tt.text()).length>0){if(this.debug){console.log("If that was a complete list in the previous column, don't decr.");}
$tint++;if($($cols[this.offset-1]).find(">"+$tag1+':last ').children().length==0){if(this.debug){console.log("unless that was empty, in which case revert");}
$tint--;}}}else{var $tt=$($cols[this.offset]).find($tag1+':first li:first '+$tag1+".split li.split");if($tt.length>0){if(this.debug){console.log("[Nested] Column started with a split item, so that count is one less than expected");}
$tint--;}}
if(this.debug){console.log("Setting the start value to "+$tint+" ("+this.prevMax+")");}
if($tint>0){if(typeof this.setColumnStart=='function'){this.setColumnStart($list,$tint);}else{$list.attr('start',$tint);}}
return 0;}
if(typeof $targetId==='undefined'){$targetId=false;}
if(typeof $targetClass==='undefined'){$targetClass=false;}
if(!$targetId&&!$targetClass){throw"renumberByJS(): Bad param, must pass an id or a class";}
var $target='';this.prevMax=1;if($targetClass){$target="."+$targetClass;}else{$target="#"+$targetId;}
var $tag1=$searchTag.toLowerCase();var $tag2=$searchTag.toUpperCase();this.cols=$($target);if(this.debug){console.log("There are "+this.cols.length+" items, looking for "+$tag1);}
this.before=$(this.cols[0]).find($tag1+':last');this.prevMax=this.before.children().length;for(this.offset=1;this.offset<this.cols.length;this.offset++){if(this.debug){console.log("iterating "+this.offset+"...[of "+this.cols.length+"]");}
if(this.offset%$colno==0){if(this.debug){console.log("First column (in theory..)");}
this.prevMax=1;continue;}
this.before=$(this.cols[this.offset-1]).find($tag1+':last');if(this.before.length){if(this.debug){console.log("Have some "+$searchTag+" elements in the previous column");}
var $list=$(this.cols[this.offset]).find($tag1+':first');var $first=$(this.cols[this.offset]).find('*:first');if($first[0]!==$list[0]){continue;}
var $parents=this.before.parents();this.lastOther=0;var $found=false;for(;this.lastOther<$parents.length;this.lastOther++){if($parents[this.lastOther].tagName!=$tag2&&$parents[this.lastOther].tagName!="LI"){$found=true;this.lastOther--;break;}}
this.nest=1;if($(this.cols[this.offset]).find(">"+$tag1+':first li '+$tag1+":first").length){this.nest=2;}
this.setList(this.cols,$list,$tag1);this.lastOther--;$list=$(this.cols[this.offset]).find($tag1+':first li '+$tag1+":first");if($list.length){this.before=$(this.cols[this.offset-1]).find(">"+$tag1+':last li '+$tag1+":last");this.prevMax=0;this.nest=1;this.setList(this.cols,$list,$tag1);}
var $reset=$(this.cols[this.offset-1]).find(">"+$tag1+':last');this.prevMax=$reset.children().length;}}
return 0;};})(jQuery);
