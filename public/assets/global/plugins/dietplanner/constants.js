var BACKGROUND_COLOR = ['#ffffff','#ffe100', '#ffc000', '#ed7d31', '#ff0000', '#c00000'];
var REACTION_COLOR_CODE = {'IgE7':5,'IgE6':5,'IgE5':5,'IgE4':5,'IgE3':5,'IgE2':5,'IgE1':5,'IgE0/1':5,'IgG7':4,'IgA7':4,'IgG6':4,'IgA6':4,'IgG5':4,'IgA5':4,'IgG4':4,'IgA4':4,'IgG3':3,'IgA3':3,'IgG2':2,'IgA2':2,'IgG1':1,'IgA1':1,'IgE0':0,'IgA0':0,'IgG0':0};
var BORDER_CLASSESS = ['c-1-color','c-2-color','c-3-color','c-4-color','c-5-color'];
var FONT_COLOR = ['#000000;  !important','#9B9B9B; !important'];
var FONT_ATTR  = ['Yes','No'];
var EXP_CODE_LEVEL = ['No','Never','Try','Occasionally','Allow'];
var EXP_CODE_ORDER = ['Never','No','Try','Occasionally','Allow'];
var FONT_RGB = { 0 : {r:'0',g:'0',b:'0'}, 1 : {r:'155',g:'155',b:'155'}};
var BACK_RGB = { 0 : {r:'255',g:'255',b:'255'}, 1 : {r:'255',g:'255',b:'0'}, 2 : {r:'255',g:'192',b:'0'}, 3 : {r:'237',g:'125',b:'49'}, 4 : {r:'255',g:'0',b:'0'}, 5 : {r:'192',g:'0',b:'0'}};
var BORDER_RGB = { 0 : {r:'255',g:'255',b:'255'}, 1 : {r:'196',g:'0',b:'0'}, 2 : {r:'16',g:'158',b:'231'}, 3 : {r:'18',g:'215',b:'18'}, 4 : {r:'18',g:'215',b:'18'}};
var scopeUI;
// {r:'196',g:'0',b:'0'}
// {r:'255',g:'127',b:'127'}
function isItemOnShoppingList(colorCodes){
	try{
	var onList = false;

	F = colorCodes['fontcode'];
	BK = colorCodes['backcode'];
	BR = colorCodes['bordercode'];

	if(BR != '1'){
		if(BR != '0'){
			onList = true;
		}
		else{
			if(BK == '0'){
				if(F == '0'){
					onList = true;
				}
			}

		}
	}
	return onList;
	}
	catch (err) {
			alert(" error in isItemOnShoppingList function" + '    ' + err);
			console.log(" error in isItemOnShoppingList function in Constant.js", err);

		}
}
function codesToColor(colorCodes){
	try{
	F = colorCodes['fontcode'];
	BK = colorCodes['backcode'];
	BR = colorCodes['bordercode'];

	colors = {};
	colors['font'] = FONT_RGB[F];
	colors['background'] = BACK_RGB[BK];
	colors['border'] = {};
	colors['border']['color'] = BORDER_RGB[BR];
	colors['border']['type'] = ((BR == '3') ? 'dashed' : 'solid');
	return colors;
}
catch (err) {
		alert(" error in codesToColor function" + '    ' + err);
		console.log(" error in codesToColor function in Constant.js", err);

	}
}
function isObjectEmpty(map) {
   for(var key in map) {
      return !map.hasOwnProperty(key);
   }
   return true;
}
function appplyBorder(EXPLEVEL,tempItem){
	try{
	// console.log("tempItem: ",tempItem);
	// console.log("EXPLEVEL: ",EXPLEVEL);
	if(EXPLEVEL == 'Never')
		$(tempItem).css("border","3px solid #c50000");
	if(EXPLEVEL == 'No')
		$(tempItem).css("border","0px solid #FFF");
	if(EXPLEVEL == 'Try')
		$(tempItem).css("border","3px solid #109ee7");
	if(EXPLEVEL == 'Occasionally')
		$(tempItem).css("border","3px dashed #12d712");
	if(EXPLEVEL == 'Allow')
		$(tempItem).css("border","3px solid #12d712");
	return tempItem;
}
catch (err) {
		alert(" error in appplyBorder function" + '    ' + err);
		console.log(" error in appplyBorder function in Constant.js", err);

	}
}
function isSliderRangeSet(sliderRanges){
	try{
	isset = false;
	if(sliderRanges['Never'].length > 0)
		isset = true;
	if(sliderRanges['Try'].length > 0)
		isset = true;
	if(sliderRanges['Occasionally'].length > 0)
		isset = true;
	if(sliderRanges['Allow'].length > 0)
		isset = true;
	return isset;
}
catch (err) {
		alert(" error in isSliderRangeSet function" + '    ' + err);
		console.log(" error in isSliderRangeSet function in Constant.js", err);

	}
}

function refreshDatatable(FOOD_ITEM_TABLE)
{
	try{
	$('#column1_search').on('keyup', function() {
			FOOD_ITEM_TABLE
					.columns(0).search('YES')
					.search(this.value)
					.draw();
	});
	$('#column2_search').on('change', function() {
									FOOD_ITEM_TABLE
												.columns(1).search('YES')
												.search(this.value)
												.draw();
				// console.log("Search",this.value);
	});
	$('#column3_search').on('change', function() {
			FOOD_ITEM_TABLE
					.columns(3).search('YES')
					.search(this.value)
					.draw();

	});
	$('#column4_search').on('change', function() {
			FOOD_ITEM_TABLE
					.columns(4).search('YES')
					.search(this.value)
					.draw();

	});
}
catch (err) {
		alert(" error in refreshDatatable function" + '    ' + err);
		console.log(" error in refreshDatatable function in Constant.js", err);

	}
}
