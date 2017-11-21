//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
var PRECRIPTION = new DietPlanner();
var finallist = null;
var recipes = null;


$(function() {
    var scope = angular.element("#dietprescriptionapp").scope();
    //console.log(scope);

    levelSlider.noUiSlider.on('update', function(values, handle) {
        // console.log("values: ",values);
        // console.log("handle: ",handle);

        //Set Handle if it exceeds White Space
        if(values[0] =='Start')
        {
          // levelSlider.noUiSlider.set(['IgA1', values[1], values[2], values[3]]);
          values[0] = "IgA1";
        }
        else if (values[1] =='End' && values[2] !='End')
        {
          // levelSlider.noUiSlider.set([values[0], 'IgE7', values[2], values[3]]);
          values[1] = "IgE7";
        }
        else if (values[2] =='End' &&  values[3] !='End')
        {
          // levelSlider.noUiSlider.set([values[0], values[1], 'IgE7', values[3]]);
          values[2] = "IgE7";
        }
        else if (values[3] =='End')
        {
          // levelSlider.noUiSlider.set([values[0], values[1], values[2], 'IgE7']);
          values[3] = "IgE7";
        }

        var rangeValues = ["IgE7", "IgE6", "IgE5", "IgE4", "IgE3", "IgE2", "IgE1", "IgE0/1", "IgG7", "IgA7", "IgG6", "IgA6", "IgG5", "IgA5", "IgG4", "IgA4", "IgG3", "IgA3", "IgG2", "IgA2", "IgG1", "IgA1"];
        //Special Check for Never
        if (rangeValues.indexOf(values[0]) == rangeValues.indexOf(values[1]) && rangeValues.indexOf(values[0]) != -1) {
            values[1] = rangeValues[rangeValues.indexOf(values[1]) + 1]
        }
        if (rangeValues.indexOf(values[0]) == rangeValues.indexOf(values[2]) && rangeValues.indexOf(values[0]) != -1) {
            values[2] = rangeValues[rangeValues.indexOf(values[2]) + 1]
        }
        if (rangeValues.indexOf(values[0]) == rangeValues.indexOf(values[3]) && rangeValues.indexOf(values[0]) != -1) {
            values[3] = rangeValues[rangeValues.indexOf(values[3]) + 1]
        }

        sliderRanges = {
            Never: [],
            Try: [],
            Occasionally: [],
            Allow: []
        };

        if (values[3] != 'Start' && rangeValues.indexOf(values[3]) > -1) {
          sliderRanges['Allow'] = rangeValues.splice(rangeValues.indexOf(values[3]), rangeValues.length);
        }


        if (values[2] != 'Start' && rangeValues.indexOf(values[2]) > -1) {
            sliderRanges['Occasionally'] = rangeValues.splice(rangeValues.indexOf(values[2]), rangeValues.length);
        }

        if (values[1] != 'Start' && rangeValues.indexOf(values[1]) >-1) {
            sliderRanges['Try'] = rangeValues.splice(rangeValues.indexOf(values[1]), rangeValues.length);
        }

        sliderRanges['Never'] = rangeValues.splice(0, rangeValues.indexOf(values[0]) + 1);

        $('.rangeValues[id="allow"]').html(sliderRanges['Allow'].toString());
        $('.rangeValues[id="occasionally"]').html(sliderRanges['Occasionally'].toString());
        $('.rangeValues[id="try"]').html(sliderRanges['Try'].toString());
        $('.rangeValues[id="never"]').html(sliderRanges['Never'].toString());

        // console.log("handle: ",$('.rangeValues[id="never"]'));
        // console.log("handle: ",sliderRanges['Never'].toString());

        if (isSliderRangeSet(sliderRanges)) {
            PRECRIPTION.sliderRanges = sliderRanges;
        }
        if(values[0] =='End' && values[1] =='Start' && values[2] =='Start' &&  values[3] =='Start')
        {
          PRECRIPTION.sliderRanges = null;
        }
        // Apply Slide Range
        //console.log(sliderRanges);

    });


    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target = $(e.target).attr("href") // activated tab
        switch (target) {
            case '#step1':
                // console.log("scope: ",scope);

                scopeUI = angular.element("#dietprescriptionapp").scope();
                PRECRIPTION['patient'] = scope.selectedPatient;
                if (PRECRIPTION.fooditems == null)
                {
                  PRECRIPTION.setFoodList(scope.prescribeData.Foodlist);
                }
                break;
            case '#step2':
                //console.log(scope);
                PRECRIPTION.foodPanels = {};
                $.each(scope.IGARecords, function(IGAkey, IGAObj) {
                  PRECRIPTION.setFoodPanel(IGAObj);
                });

                $.each(scope.IGGRecords, function(IGGkey, IGGObj) {
                  PRECRIPTION.setFoodPanel(IGGObj);
                });

                $.each(scope.IGERecords, function(IGEkey, IGEObj) {
                  PRECRIPTION.setFoodPanel(IGEObj);
                });
                // if ("IGARecords" in scope)
                //     PRECRIPTION.setFoodPanel(scope.IGARecords);
                // if ("IGGRecords" in scope)
                //     PRECRIPTION.setFoodPanel(scope.IGGRecords);
                // if ("IGERecords" in scope)
                //     PRECRIPTION.setFoodPanel(scope.IGERecords);

                break;
            case '#step3':
                PRECRIPTION.setDietTypes(scope.diettypes);
                PRECRIPTION.setFoodAllow();
                PRECRIPTION.formatFoodList(scope.FOOD_ITEM_TABLE);

                break;

            case '#step4':
                PRECRIPTION.generateComment();
                PRECRIPTION.generateFinalList();

                scope.savePrescription();

                break;
        }
        console.log(PRECRIPTION);
    });

});

function countElements(obj) {
    return Object.keys(obj).length;
}

///***Ajax Request for getting Categories with food items list***///
function getCatorizedFoods() {

    var items = null;
    $.ajax({
        url: "/api/v1/foodlist/",
        success: function(data) {
            items = data;
            // console.log("items: ",items);
        },
        async: false
    });
    return items;
}
///***Ajax Request for getting Recipe List***///
function getRecipes() {
    var recipeslist = null;
    $.ajax({
        url: "/api/v1/recipelist/",
        success: function(data) {
            recipeslist = data;
            console.log("recipeslist: ",recipeslist);
        },
        async: false
    });
    return recipeslist;
}

function DietPlanner() {
    this.MOList          = [];
    this.MOInDietList    = [];
    this.MOExceptionList = [];
    this.status = 'pending';
    this.last_modified = '24/7/2017 10:26 AM';
    this.include_reaction = false;
    this.autoimmune = false;
    this.foodPanels = {};
    this.ingreduentsLookup = {};
    this.fooditems = null;
    this.diettypes = {};
    this.shoppingList = {};
    this.sliderRanges = null;
    this.finalList = null;
    this.recipelist = null;
    this.comment = "";
    this.generateComment = function(){
      try {
      this.last_modified = $('#currentTime').html();
      this.status = 'Completed';
    	var comment = "";
      //Show Diets selected
      if (PRECRIPTION.autoimmune) {
        comment += "Autoimmune: Checked \n";
      }
      comment += "Following Diet Types are selected:";
      for (x in this.diettypes) {
        var DietName = this.diettypes[x]['name'];
        var exp_lvl  = this.diettypes[x]['exp_level'];
        ++x;
        comment += "\n\t * "+DietName+" (Experimentation Level = "+exp_lvl+")";
      }
      //  comment += "*Patient Name: "+ PRECRIPTION['patient']['fname'] +" "+ PRECRIPTION['patient']['lname'];
        if (this.sliderRanges!= null) {
              //end sho diwt types
    	        comment += "\n\nReaction Level Experimentation:";
    	        comment += "\n\t* Allow: "+this.sliderRanges['Allow'].toString();
    	        comment += "\n\t* Occasionally: "+this.sliderRanges['Occasionally'].toString();
    	        comment += "\n\t* Try: "+this.sliderRanges['Try'].toString();
    	        comment += "\n\t* Never: "+this.sliderRanges['Never'].toString();

              comment += "\n\nand with exception to manually overridden foods mentioned below:";
        }
        else{
          comment += "\n\nwith manually overridden foods mentioned below:";
        }

      if(this.MOInDietList != null || this.MOInDietList.length != 0)
      {
        comment += "\n  *In Diet:"
        for (x in this.MOInDietList) {
  	        var FID = this.MOInDietList[x];
  	        item = this.fooditems[FID];
          	var codes = item['codes'];
  	        var allow = FONT_ATTR[codes['fontcode']];
  	        comment += "\n\t"+(++x)+". "+item['name']+" (In Diet = "+allow+")";
      	}
      }

      // console.log("this.MOExceptionList: ",this.MOExceptionList);
      if(this.MOExceptionList == null || this.MOExceptionList.length == 0)
      {
        if(this.MOList != null || this.MOList.length != 0)
        {
          this.MOExceptionList = this.MOList;
          comment += "\n\n  *In Experimentation Level:";
        }
      }
      else {
        comment += "\n\n  *In Experimentation Level:";
      }
    	for (x in this.MOExceptionList) {
	        var FID = this.MOExceptionList[x];
	        item = this.fooditems[FID];
        	var codes = item['codes'];
	        var bor = EXP_CODE_LEVEL[codes['bordercode']];
	        comment += "\n\t"+(++x)+". "+item['name']+" (Experimentation Level = "+bor+")";
    	}

    	// console.log(comment);
    	this.comment = comment;
    	$('#finalComment').html(comment);
    }
      catch (err) {
        alert(" error in generateComment function " + '    ' + err);
        console.log(" error in generateComment function in diet planer .js", err);

      }
    }

    this.addMO = function(FID) {
      try{
        	// FID = parseInt(FID);
        	if(this.MOList.indexOf(FID) < 0)
            	this.MOList.push(FID);
        }
        catch (err) {
          alert(" error in addMO function" + '    ' + err);
          console.log(" error in addMO function diet planer.js", err);

        }
    }

    this.removeMO = function(FID) {
      try{
          for (var i = 0; i < this.MOList.length; i++) {
            if (this.MOList[i] == FID) {
              this.MOList.splice(i,1);
            }
          }
        }
        catch (err) {
          alert(" error in removeMO function" + '    ' + err);
          console.log(" error in removeMO function diet planer.js", err);
        }
    }

    this.addMOInDietList = function(FID) {
      try{
        	// FID = parseInt(FID);
        	if(this.MOInDietList.indexOf(FID) < 0)
            	this.MOInDietList.push(FID);
        }
        catch (err) {
          alert(" error in addMOInDietList function" + '    ' + err);
          console.log(" error in addMOInDietList function i dietplaner.js", err);
        }
    }

    this.removeMOInDietList = function(FID) {
      try{
          for (var i = 0; i < this.MOInDietList.length; i++) {
            if (this.MOInDietList[i] == FID) {
              this.MOInDietList.splice(i,1);
            }
          }
        }
        catch (err) {
          alert(" error in removeMOInDietList function" + '    ' + err);
          console.log(" error in removeMOInDietList function i dietplaner.js", err);
        }
    }

    this.generateFinalList = function() {
    try{
      RECIPES = getRecipes();
      this.recipelist = RECIPES;
      FITEMS = getCatorizedFoods();

        // console.log('F ITEMS CHECK', FITEMS);
        FOODITEMS = this.fooditems;



        $.each(FITEMS, function(i, cat) {
            catFoods = cat['FoodItems'];
            var nameCheck= false;
            $.each(catFoods, function(j, item) {
                if (item['AkaItem'] == true) {
                  FID = 'Aka-' + item.FID;
                }
                else {
                  FID = item.FID;
                }
                if(typeof FOODITEMS[FID] == 'undefined')
                {
                  PRECRIPTION.getFoodItem(FID);
                }
                temp = FOODITEMS[FID];
                // console.log('FID', temp);
                // console.log('ITEM', item);
                item['codes'] = temp['codes'];
                item['color'] = codesToColor(temp['codes']);
                item['comprehensiveList'] = temp['comprehensiveList'];
                if (isItemOnShoppingList(temp['codes'])) {
                    item['inshoppinglist'] = true;
                    nameCheck = true;
                } else {
                    item['inshoppinglist'] = false;
                }
            });
            cat['IsEmpty'] = nameCheck;
        });
        this.finalList = FITEMS;
        finalList = FITEMS;
        console.log("this.finalList: ",this.finalList);

        this.RECIPELIST = RECIPES;
        }
        catch (err) {
          alert(" error in generateFinalList function" + '    ' + err);
          console.log(" error in generateFinalList function in dietplanne.js", err);

        }

    }
    this.finalizeList = function() {
        //this.finalList = this.fooditems;

    }

    //Set Foods Diets Allow True/False
    this.setFoodAllow = function() {
    try{
      //Update Diets Allow
      $.each(PRECRIPTION.fooditems, function(fkey, foods) {
        Fid = foods['id'];
        if(PRECRIPTION.isFoodIn_MO_InDiet_List(Fid) == true)
        {
          var fontcode = PRECRIPTION.fooditems[Fid]['codes']['fontcode'];
          // FONT_CODE = fontcode;
          //Update Diets Allow
          $.each(foods['diettypes'], function(key, diets) {
            if(FONT_ATTR[fontcode] == 'Yes')
            {
              diets['allow'] = false;
            }
            else {
              diets['allow'] = true;
            }
          });
        }
        else
        {
          if (isObjectEmpty(foods['diettypes']))
          {
            $.each(foods['diettypes'], function(key, diets) {
              diets['allow'] = false;
            });
          }
          else
          {
            $.each(foods['diettypes'], function(key, diets) {
              // console.log("**************** WORKING ************************");
              diets['allow'] = true;
            });
          }
        }
      });
        }
        catch (err) {
          alert(" error in setFoodAllow function" + '    ' + err);
          console.log(" error in setFoodAllow function in dietplanner.js", err);

        }
    }

    //Set Datatable Foods Step 4
    this.formatFoodList = function(FOOD_ITEM_TABLE) {
      try
      {
          var tableFoods = $('#table-food-list');
          FOODITEMS = this.fooditems;
          SliderRanges = this.sliderRanges;
          AUTOIMMUNE = this.autoimmune;
          MOExceptionList = this.MOExceptionList;
          FOOD_ITEM_TABLE.rows().every(function(rowIdx, tableLoop, rowLoop) {
              var tempRow = this.node();
              var Fid = $(tempRow).find("td:first").attr('fid');

              var tempItem = $(tempRow).find("td:first > .item-name");
              var code = "";
      			  EXPLEVELS = ["Never", "No", "Try", "Occasionally", "Allow"];
      			  var FONT_CODE = 0;

              //Apply Algoritham
              PRECRIPTION.evaluateFood(Fid,tempRow);
        });
        //Show Wait loader
            $('#pleaseWaitModal').modal('hide');
        }
        catch (err) {
          alert(" error in formatFoodList function" + '    ' + err);
          console.log(" error in formatFoodList function in dietplanner.js", err);

        }

    }

    //Set Datatable Foods Step 4
    this.formatFoodList_OnScroll = function(FOOD_ITEM_TABLE) {
      try{
      // //Show Datatable Hidden Fields
      // scopeUI.FOOD_ITEM_TABLE.columns( [ 5, 6, 7 ] ).visible( true, true );

        var tableFoods = $('#table-food-list');
        FOODITEMS = this.fooditems;
        SliderRanges = this.sliderRanges;
        AUTOIMMUNE = this.autoimmune;
        MOExceptionList = this.MOExceptionList;

        var displayIndexes = FOOD_ITEM_TABLE.scroller.page();
        console.log("displayIndexes: ",displayIndexes);

        for (var i = displayIndexes['start']; i <= displayIndexes['end']; i++)
        {
          var data = FOOD_ITEM_TABLE.row( ':eq('+ i +')', {order:'applied', search:'applied'} ).data();
          // scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 7).data(expLevel).draw();
          var tempRow = $("#"+data['DT_RowId']);
          console.log("data: ",data);
          console.log("tempRow: ",tempRow);
          var Fid = $(tempRow).find("td:first").attr('fid');
          console.log("Fid: ",Fid);
          PRECRIPTION.evaluateFood(Fid,tempRow);
        }

        //Show Wait loader
        $('#pleaseWaitModal').modal('hide');
        }
        catch (err) {
          alert(" error in formatFoodList function" + '    ' + err);
          console.log(" error in formatFoodList function in dietplanner.js", err);

        }

    }

    // Return Exp_level  ///function evaluateFood(FID){
    this.evaluateFood = function(Fid,tempRow) {
      try
      {
        //calculate background code based on food reaction level (0 for white, 1 for yellow … )
        var reactionLevel = PRECRIPTION.getReactionLevel(Fid); //  fooditems[Fid]["reactions"]["level"]
        var Back_Code     = REACTION_COLOR_CODE[reactionLevel]; // 0 in no reaction
        var SliderRanges  = PRECRIPTION.sliderRanges;

        //calculate font code
        Font_Code = 0;
        if (PRECRIPTION.isFoodIn_MO_InDiet_List(Fid) == true){
          Font_Code = PRECRIPTION.fooditems[Fid]['codes']['fontcode'];
        }
        else{
          if( PRECRIPTION.getAllowedDietTypesCount(Fid) == 0){ //Check if it's diet types and it's ingredient diet types count is zero
            Font_Code = 0; // black
          }
          else{
            Font_Code = 1;// grey
          }
       }

      // Calculate Experimentation Level using calculateExp Level Function 4 in potato chips , 0 , 1
      if (PRECRIPTION.isFoodIn_MO_List(Fid) == true){
        var Bordercode = PRECRIPTION.fooditems[Fid]['codes']['bordercode'];
        ExpLevel = EXP_CODE_LEVEL[Bordercode];
        Exp_DT_Level = ExpLevel;
      }
      else{
        if( PRECRIPTION.getAllowedDietTypesCount(Fid) == 0){ //Check if it's diet types and it's ingredient diet types count is zero
          if(Back_Code == 0)
            Exp_DT_Level = 'No';
          else
          {
            Exp_DT_Level = 'No';
            if(SliderRanges != null)
              Exp_DT_Level = 'Allow'; // Start with lowest priority if SliderRanges are set
          }
        }
        else{
          Exp_DT_Level = PRECRIPTION.calculateDTExpLevel(Back_Code,Font_Code,Fid);
        }
        RecLevel = "Allow"; // Start with lowest priority
        if(Back_Code > 0){
          if(SliderRanges == null){
            RecLevel = "Allow"; // Start with lowest priority
          }
          else
          {
              if (SliderRanges['Never'].indexOf(reactionLevel) >= 0 &&  Font_Code !=1)
              {
                RecLevel = 'Never';
              }
              else if (SliderRanges['Try'].indexOf(reactionLevel) >= 0  &&  Font_Code !=1)
              {
                RecLevel = 'Try';
              }
              else if (SliderRanges['Occasionally'].indexOf(reactionLevel) >= 0  &&  Font_Code !=1)
              {
                RecLevel = 'Occasionally';
              }
              else if (SliderRanges['Allow'].indexOf(reactionLevel) >= 0   &&  Font_Code !=1)
              {
                RecLevel = 'Allow';
              }
              else {
                RecLevel = 'No';
              }
          }
        }

        //Compare Both Levels EXP DT was TRY and EXP Reac NO
        if(EXP_CODE_ORDER.indexOf(Exp_DT_Level) > EXP_CODE_ORDER.indexOf(RecLevel))
        {
          Exp_DT_Level = RecLevel;
        }

        // //Check if Exp Level is less than NO and border color is Red
        // if (EXP_CODE_ORDER.indexOf(Exp_DT_Level) > 2 && Back_Code > 3)
        // {
        //   Exp_DT_Level = 'No';
        // }
      }

      //Apply and Display changes
      PRECRIPTION.applyCodes(reactionLevel,Back_Code,Font_Code,Exp_DT_Level,tempRow,Fid);
    }
    catch (err) {
      alert(" error in evaluateFood function" + '    ' + err);
      console.log(" error in evaluateFood function diet planer.js", err);
    }
  }

  //Calculate Diet Experimentation Level
  this.applyCodes = function(reactLevel,Back_Code,Font_Code,Exp_DT_Level,tempRow,FiD){
    try
    {
      //Get Name td of TempRow
      var tempItem = $(tempRow).find("td:first > .item-name");

      //Set Font_Code for In-Diet
      $(tempRow).css("color", FONT_COLOR[Font_Code]);

      //Set select value
      // $(tempRow).find("td:eq(1)").find('select')[0].value = FONT_ATTR[Font_Code];

      // if (Font_Code == 0)
      // {
      //   console.log("Font_Code 0: ",Font_Code);
      //   var html = '<select  class="form-control in-diet-class" onchange="toggleAllow(this);">'
      //   html +=        '<option value="Yes" selected="selected">Yes</option>'
      //   html +=        '<option value="No">No</option>'
      //   html +=    '</select>'
      // }
      // else {
      //   console.log("Font_Code 1: ",Font_Code);
      //   var html = '<select  class="form-control in-diet-class" onchange="toggleAllow(this);">'
      //   html +=        '<option value="Yes">Yes</option>'
      //   html +=        '<option value="No" selected="selected">No</option>'
      //   html +=    '</select>'
      // }
      // console.log("Before: ",scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 1).data());
      // scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 1).data(html);
      // console.log("After: ",scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 1).data());
      $(tempRow).find(".in-diet-class")[0].value = FONT_ATTR[Font_Code];
      $(tempRow).attr('fontcode', Font_Code);

      var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
      scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 5).data(FONT_ATTR[Font_Code]);

      //Set Background-color based on ReactionLevel
      $(tempRow).attr('backcode', Back_Code);
      $(tempItem).css("background-color", BACKGROUND_COLOR[Back_Code]);

      //Set Border based on Calculated ExpLevel
      tempItem = appplyBorder(Exp_DT_Level, tempItem);
      // TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
      scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 7).data(Exp_DT_Level);
      // $(tempRow).find("td:eq(7)").html(Exp_DT_Level);

      // var selectBox = $(tempRow).find("td:eq(3) select");
      var selectBox = $(tempRow).find(".exp-level-class");
      // console.log("Exp Select: ",selectBox);
      $(selectBox).val(Exp_DT_Level);
      $(tempRow).attr('bordercode', EXP_CODE_LEVEL.indexOf(Exp_DT_Level));

      //Set Reaction Level
      var reactLevelType = '';
      if (reactLevel === 'IgA0' || reactLevel == 'IgG0' || reactLevel == 'IgE0')
      {
        reactLevel     = 'No Reaction';
        reactLevelType = 'No Reaction';
      }
      if (reactLevel === 'IgA1' || reactLevel == 'IgA2' || reactLevel == 'IgA3' || reactLevel == 'IgA4' || reactLevel == 'IgA5' || reactLevel == 'IgA6' || reactLevel == 'IgA7')
        reactLevelType = 'IgA';
      if (reactLevel === 'IgG1' || reactLevel == 'IgG2' || reactLevel == 'IgG3' || reactLevel == 'IgG4' || reactLevel == 'IgG5' || reactLevel == 'IgG6' || reactLevel == 'IgG7')
        reactLevelType = 'IgG';
      if (reactLevel === 'IgE0/1' || reactLevel == 'IgE1' || reactLevel == 'IgE2' || reactLevel == 'IgE3' || reactLevel == 'IgE4' || reactLevel == 'IgE5' || reactLevel == 'IgE6' || reactLevel == 'IgE7')
        reactLevelType = 'IgE';
      // $(tempRow).find("td:eq(2)").html(reactLevel);
      // console.log("Reacion :",$(tempRow).find(".reaction-lvl-class"));
      // $(tempRow).find(".reaction-lvl-class").html(reactLevel);
      //Set Hidden Column reactLevelType
      scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 2).data(reactLevel);
      scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 6).data(reactLevelType);
      // $(tempRow).find("td:eq(6)").html(reactLevelType);

      //Managing Experimentation Level Options
      var optionsSelect = $(selectBox).find('option');
      optionsSelect.css('display', 'block');
      if ($(tempRow).attr('backcode') == '0' && $(tempRow).attr('fontcode') == '0') {
          $(selectBox).find('option[value="Try"]').css('display', 'none');
          $(selectBox).find('option[value="Occasionally"]').css('display', 'none');
          $(selectBox).find('option[value="Allow"]').css('display', 'none');
      }
      //console.log($(tempRow).find("td:first > .item-name").attr('class'));
      PRECRIPTION.fooditems[FiD]['codes'] = {
                  fontcode: $(tempRow).attr('fontcode'),
                  backcode: $(tempRow).attr('backcode'),
                  bordercode: $(tempRow).attr('bordercode')
      };
    }
    catch (err) {
      alert(" error in applyCodes function" + '    ' + err);
      console.log(" error in applyCodes function in dietplanner.js", err);
    }
  }

  //Calculate Diet Experimentation Level
  this.calculateDTExpLevel = function(Back_Code,Font_Code,FiD){
     try {

    AUTOIMMUNE = PRECRIPTION.autoimmune;
    ExpLevel = "Allow"; // Start with lowest priority
    if(AUTOIMMUNE && Back_Code > 0 && FOODITEMS[FiD]['immuneReaction']){
      ExpLevel = "Never";
      // console.log("fn calculateDTExpLevel: FiD: ",FiD, " AUTOIMMUNE ExpLevel: ",ExpLevel);
    }
    else{
      DT_Self = PRECRIPTION.getAllowedDietTypes(FiD); // In case of potato chips  A(NO),B(NO),C(Allow),D(NO),E(NO)
      // console.log("fn calculateDTExpLevel: FiD: ",FiD, " DT_Self: ",DT_Self);
      DT_Ings = [];
      // Ingredients = PRECRIPTION[FiD]['ingredients'];
      // console.log("//////////////////////////  Ingredients Loop ////////////////////////");
      $.each(PRECRIPTION.fooditems[FiD]['ingredients'], function(Ikey, Ing) {
        var ingDiets = PRECRIPTION.getAllowedDietTypes(Ing['IID']);
        if(ingDiets.length > 0)
        {
          DT_Ings.push(ingDiets);
        }
      });
      // console.log("fn calculateDTExpLevel: FiD: ",FiD, " DT_Ings: ",DT_Ings);

      // console.log("//////////////////////////  END Ingredients Loop ////////////////////////");
      // In case of potato chips DT_Ings will have A(TRY),B(TRY),D(Oc),E(Oc),B(Allow),D(Allow)
      // Get intersection of DT_Self and DT_Ings
      // console.log("//////////////////////////  intersection Loop ////////////////////////");
      DT_Ins = PRECRIPTION.intersection(DT_Self,DT_Ings);
      // console.log("fn calculateDTExpLevel: FiD: ",FiD, " DT_Ins: ",DT_Ins);

      // //Now DT_Ins will have A(TRY),B(TRY),D(Oc),E(Oc),B(Allow),D(Allow),C(Allow)
      // DT_Mrg = PRECRIPTION.mergerDTs(DT_Ins); // will result  A(TRY),B(TRY),C(Allow),D(Oc),E(Oc)
      // calculate DT Exp Level
      ExpLevel = PRECRIPTION.calculateLevel(DT_Ins); // will return highest of all TRY
      // console.log("fn calculateDTExpLevel: FiD: ",FiD, " ExpLevel: ",ExpLevel);
      // console.log("//////////////////////////  End intersection Loop ////////////////////////");
    }
    return ExpLevel;
    }
    catch (err) {
      alert(" error in calculateDTExpLevel function" + '    ' + err);
      console.log(" error in calculateDTExpLevel function in diet planner.js", err);

    }
  }

  //Check Food in MOInDietList
  this.isFoodIn_MO_InDiet_List = function(Fid) {
      try{
      // console.log("Check in MOInDietList Fid: ",Fid);
      var check = false;
      for (var i = 0; i < PRECRIPTION.MOInDietList.length; i++)
      {
        if(PRECRIPTION.MOInDietList[i] == Fid)
        {
          check = true;
          break;
        }
      }
      return check;
    }
    catch (err) {
      alert(" error in isFoodIn_MO_InDiet_List function" + '    ' + err);
      console.log(" error in isFoodIn_MO_InDiet_List function in diet planner.js", err);

    }
  }

  //Check Food in MOInDietList
  this.isFoodIn_MO_List = function(Fid) {
      try{
      // console.log("Check in MOList Fid: ",Fid);
      var check = false;
      for (var i = 0; i < PRECRIPTION.MOList.length; i++)
      {
        if(PRECRIPTION.MOList[i] == Fid)
        {
          check = true;
          break;
        }
      }
      return check;
    }
    catch (err) {
      alert(" error in isFoodIn_MO_List function" + '    ' + err);
      console.log(" error in isFoodIn_MO_List function in diet planner.js", err);

    }
  }

  //Count Allowed Diets of FID and its Ingredients
  this.getAllowedDietTypesCount = function(Fid) {
      try{
      // console.log("getEnabledDietTypesCount Fid: ",Fid);
      CHECKED_FOODS = [];
      COUNT_DIETS   = 0;
      CHECKED_FOODS.push(Fid);
      var CountAllowedDiets = 0;
      $.each(PRECRIPTION.fooditems[Fid]['diettypes'], function(key, diets) {
          if(diets['allow'] == true)
          {
            COUNT_DIETS++;
            CountAllowedDiets++;
          }
      });
      PRECRIPTION.getAllowedParent_Food_DietTypesCount(Fid);
      // console.log("**********************************************************");
      // console.log("Fn getAllowedDietTypesCount: CHECKED_FOODS: ",CHECKED_FOODS," COUNT_DIETS: ",COUNT_DIETS);
      // console.log("**********************************************************");
      return COUNT_DIETS;
    }
    catch (err) {
      alert(" error in getAllowedDietTypesCount function" + '    ' + err);
      console.log(" error in getAllowedDietTypesCount function in diet planner.js", err);

    }
  }

  //Get Allowed Diets of FID
  this.getAllowedParent_Food_DietTypesCount = function(Fid) {
     try{
    //Check For Ingredients Diets
    $.each(PRECRIPTION.fooditems[Fid]['ingredients'], function(key, Ing) {
      var IngID = Ing['IID'];
      if(jQuery.inArray(IngID, CHECKED_FOODS) == -1)
      {
        $.each(PRECRIPTION.fooditems[IngID]['diettypes'], function(Ikey, diets) {
            if(diets['allow'] == true)
            {
              COUNT_DIETS++;
            }
        });
        CHECKED_FOODS.push(IngID);
        PRECRIPTION.getAllowedParent_Food_DietTypesCount(IngID);
      }
    });
    }
    catch (err) {
      alert(" error in getAllowedParent_Food_DietTypesCount function" + '    ' + err);
      console.log(" error in getAllowedParent_Food_DietTypesCount function in diet planner.js", err);

    }
  }

  //Get Allowed Diets of FID
  this.getAllowedDietTypes = function(Fid) {
      try{
      var Diets = [];
      $.each(PRECRIPTION.fooditems[Fid]['diettypes'], function(key, diets) {
          if(diets['allow'] == true)
          {
            Diets.push(diets);
          }
      });
      // console.log("getEnabledDietTypes Fid: ",Fid,"Diets: ",Diets);
      return Diets;
    }
    catch (err) {
      alert(" error in getAllowedDietTypes function" + '    ' + err);
      console.log(" error in getAllowedDietTypes function in diet planner.js", err);

    }
  }

  //Get intersection of two Diet array
  this.intersection = function(DT_Self,DT_Ings) {
    try{
    if(DT_Ings.length > 0) //If Ings Diets are not empty
    {
      var temp = DT_Self.length;
      for (var i = 0; i < DT_Ings.length; i++)
      {
        for (var j = 0; j < DT_Ings[i].length; j++)
        {
          DT_Self[temp] = DT_Ings[i][j];
          temp++;
        }
      }
    }
    return DT_Self;
    }
    catch (err) {
      alert(" error in intersection function" + '    ' + err);
      console.log(" error in intersection function in dietplanner.js", err);

    }
  }

  //Get Merge DTS in array
  this.calculateLevel = function(DT_Ins) {
    try{
    var Exp_level = 'No'; //Defualt
    if(DT_Ins.length > 0) //If Ings Diets are not empty
    {
      // var type         = DT_Ins[i]['type'];
      Exp_level = DT_Ins[0]['exp_level'];
      for (var i = 1; i < DT_Ins.length; i++)
      {
        if(EXP_CODE_ORDER.indexOf(Exp_level) > EXP_CODE_ORDER.indexOf(DT_Ins[i]['exp_level']))
        {
          Exp_level = DT_Ins[i]['exp_level'];
        }
      }
    }
    // console.log("calculateLevel: ",Exp_level);
    return Exp_level;
    }
    catch (err) {
      alert(" error in calculateLevel function" + '    ' + err);
      console.log(" error in calculateLevel function in dietplanner.js", err);

    }
  }

  // this refers to diet planner
  this.setDietTypes = function(DTs) {
    try{
    var EXP_ORDER = ['Never', 'Try', 'Occasionally', 'Allow', 'No'];
    this.diettypes = {};
    // console.log(this.fooditems);
    for (var i in this.fooditems) {
      this.fooditems[i]['diettypes'] = {};
    }

    for (var i = 0; i < (DTs.length); i++)
    {
      //console.log(DTs[i]);
      if (DTs[i].selected == "true")
      {
        DT_temp = {};
        DT_temp['id'] = DTs[i].id;
        DT_temp['exp_level'] = DTs[i].experimentation_level;
        DT_temp['name'] = DTs[i].Name;
        DT_temp['fooditems'] = {};

        for (var j = 0; j < (DTs[i].FoodItems.length); j++)
        {
          FI_temp = {};
          FI_temp['id'] = DTs[i].FoodItems[j].FID;
          FI_temp['exp_level'] = DTs[i].FoodItems[j].experimentation_level;
          DT_temp['fooditems'][FI_temp['id']] = FI_temp;
          FI_temp['type'] = DTs[i].Name;
          // console.log("DTs[i]: ",DTs[i]);
          // console.log("FI_temp['id']: ",FI_temp['id']);
          // console.log("All Foods: ",this.fooditems);
          // console.log("Food: ",this.fooditems[FI_temp['id']]);
          if(typeof this.fooditems[FI_temp['id']] == 'undefined')
          {
            this.getFoodItem(FI_temp['id']);
          }
          if (DT_temp['id'] in this.fooditems[FI_temp['id']]['diettypes'])
          {
            ///	this.fooditems[FI_temp['id']]['diettypes'][DT_temp['id']] = FI_temp;e
            explevel = this.fooditems[FI_temp['id']]['diettypes'][DT_temp['id']]['exp_level'];
            if (EXP_ORDER.indexOf(explevel) < FI_temp['exp_level'])
            {
              this.fooditems[FI_temp['id']]['diettypes'][DT_temp['id']] = FI_temp;
              //Set Aka Names of this Food
              var Fid = FI_temp['id'];
              if (PRECRIPTION.fooditems[Fid]['AkaItem'] == false )
              {
                for (var k = 0; k < PRECRIPTION.fooditems[Fid]['FoodAka'].length; k++)
                {
                  var AkaID = 'Aka-' + PRECRIPTION.fooditems[Fid]['FoodAka'][k]['id'];
                  PRECRIPTION.fooditems[AkaID]['diettypes'][DT_temp['id']] = FI_temp;
                }
              }
            }
          } else {
            this.fooditems[FI_temp['id']]['diettypes'][DT_temp['id']] = FI_temp;
            //Set Aka Names of this Food
            var Fid = FI_temp['id'];
            if (PRECRIPTION.fooditems[Fid]['AkaItem'] == false )
            {
              for (var k = 0; k < PRECRIPTION.fooditems[Fid]['FoodAka'].length; k++)
              {
                var AkaID = 'Aka-' + PRECRIPTION.fooditems[Fid]['FoodAka'][k]['id'];
                PRECRIPTION.fooditems[AkaID]['diettypes'][DT_temp['id']] = FI_temp;
              }
            }
          }

          // Ingrdients
          IID = DTs[i].FoodItems[j].FID;
          for (var k in this.ingreduentsLookup[IID])
          {
            FID = this.ingreduentsLookup[IID][k];
            II_temp = {};
            II_temp['id'] = FID;
            II_temp['exp_level'] = DTs[i].FoodItems[j].experimentation_level;
            II_temp['type'] = DTs[i].Name;
            if (DT_temp['id'] in this.fooditems[FID]['diettypes'])
            {
              ///	this.fooditems[FI_temp['id']]['diettypes'][DT_temp['id']] = FI_temp;e
              explevel = this.fooditems[FID]['diettypes'][DT_temp['id']]['exp_level'];
              if (EXP_ORDER.indexOf(explevel) < II_temp ['exp_level'])
              this.fooditems[FID]['diettypes'][DT_temp['id']] = II_temp;
            } else {
              this.fooditems[FID]['diettypes'][DT_temp['id']] = II_temp;
            }
          }
        }
        this.diettypes[DT_temp['id']] = DT_temp;
      }
    }
    }
    catch (err) {
      alert(" error in setDietTypes function" + '    ' + err);
      console.log(" error in setDietTypes function dietplanner.js", err);

    }
  }

    this.setFoodPanel = function(panel) {
        try{
            console.log("panel: ",panel);
            pan = {};
            pan.id = panel.panelid;
            pan.name = panel.panelName.trim();
            pan.type = panel.panelType;
            pan.items = {};
            if (panel.panelType == 'Categorized') {
                pan.catagories = {};
                for (var i = 0; i < (panel.length); i++) {
                    temp = panel[i].Category[0];
                    pan.catagories[temp.id] = {};
                    pan.catagories[temp.id].id = temp.id;
                    pan.catagories[temp.id].name = temp.Name;
                    pan.catagories[temp.id].color = temp.color;
                    temp = panel[i].FoodItems;
                    for (var j = 0; j < (temp.length); j++) {
                        panelitem = {};
                        panelitem.panelItemId = temp[j].id;
                        panelitem.name = temp[j].Name.trim();
                        panelitem.FID = temp[j].FID;
                        pan.items[panelitem.FID] = panelitem;
                    }
                }
            } else {
                for (var i = 0; i < (panel.length); i++) {
                    panelitem = {};
                    panelitem.panelItemId = panel[i].id;
                    panelitem.name = panel[i].foodName.trim();
                    panelitem.FID = panel[i].FID;
                    pan.items[panelitem.FID] = panelitem;
                }
            }
            this.foodPanels[pan.name] = pan;
            // this.foodPanels[panel.panelCatagory] = pan;
        }
        catch (err) {
          alert(" error in setFoodPanel function" + '    ' + err);
          console.log(" error in setFoodPanel function in diet planner.js", err);

        }
    }
    this.setReaction = function(FID, reaction) {
        try{
        reactionType = 'IgA';
        // console.log("reaction: ",reaction);
        if (reaction.indexOf("IgG") >= 0)
            reactionType = 'IgG';
        if (reaction.indexOf("IgE") >= 0)
            reactionType = 'IgE';
        this.fooditems[FID]['reactions'][reactionType] = reaction;
        this.fooditems[FID]['reactions']['Level'] = this.calculateReactionLevel(this.fooditems[FID]['reactions']);
        //console.log(this.fooditems[FID]['reactions']['Level']);
        }
        catch (err) {
          alert(" error in setReaction function" + '    ' + err);
          console.log(" error in setReaction function in diet planner.js", err);

        }
    }
    this.setIngredientReaction = function(FID, IID, reaction) {
        try{
        reactionType = 'IgA';
        if (reaction.indexOf("IgG") >= 0)
            reactionType = 'IgG';
        if (reaction.indexOf("IgE") >= 0)
            reactionType = 'IgE';
        this.fooditems[FID]['ingredients'][IID]['reactions'][reactionType] = reaction;
        this.fooditems[FID]['ingredients'][IID]['reactions']['Level'] = this.calculateReactionLevel(this.fooditems[FID]['ingredients'][IID]['reactions']);
        //console.log(this.fooditems[FID]['reactions']['Level']);
        }
        catch (err) {
          alert(" error in setIngredientReaction function" + '    ' + err);
          console.log(" error in setIngredientReaction function in dietplanner.js", err);

        }
    }
    this.getReactionLevel = function(FiD) {
        try{
          if(typeof this.fooditems[FiD] == 'undefined')
            this.getFoodItem(FiD);
        // console.log("DietPlanner FiD: ",FiD);
        ownLevel = this.fooditems[FiD]['reactions']['Level'];
        ingrdients = this.fooditems[FiD]['ingredients'];
        var sortOrder = ['IgE7', 'IgE6', 'IgE5', 'IgE4', 'IgE3', 'IgE2', 'IgE1', 'IgE0/1', 'IgG7', 'IgA7', 'IgG6', 'IgA6', 'IgG5', 'IgA5', 'IgG4', 'IgA4', 'IgG3', 'IgA3', 'IgG2', 'IgA2', 'IgG1', 'IgA1', 'IgE0', 'IgG0', 'IgA0'];
        for (var i in ingrdients) {
            indLevel = ingrdients[i]['reactions']['Level'];
            if (sortOrder.indexOf(indLevel) < sortOrder.indexOf(ownLevel))
                ownLevel = indLevel;

        }
        return ownLevel;
        }
        catch (err) {
          alert(" error in getReactionLevel function" + '    ' + err);
          console.log(" error in getReactionLevel function in dietplanner.js", err);

        }
    }
    this.calculateReactionLevel = function(reactions) {
        try{
        var array = [];
        array.push(reactions['IgA']);
        array.push(reactions['IgG']);
        array.push(reactions['IgE']);
        //console.log(array);
        var sortOrder = ['IgE7', 'IgE6', 'IgE5', 'IgE4', 'IgE3', 'IgE2', 'IgE1', 'IgE0/1', 'IgG7', 'IgA7', 'IgG6', 'IgA6', 'IgG5', 'IgA5', 'IgG4', 'IgA4', 'IgG3', 'IgA3', 'IgG2', 'IgA2', 'IgG1', 'IgA1', 'IgE0', 'IgG0', 'IgA0'];
        array.sort(function(a, b) {
            return sortOrder.indexOf(a) - sortOrder.indexOf(b);
        });
        return array[0];

        }
        catch (err) {
      alert(" error in calculateReactionLevel function" + '    ' + err);
      console.log(" error in calculateReactionLevel function in dietplanner.js", err);

    }
    }
    this.setFoodList = function(foodData) {
        try{
        fooditems = {};
        IngreduentsLookup = {};
        $(foodData).each(function(i, ele) {
            var temp = {};
            item = ele;
            temp.id = item.id;
            temp.FoodAka = item.FoodAka;
            temp.AkaItem = item.AkaItem;
            if(temp.AkaItem == true)
            {
              temp.OrgNameID = item.FID
            }
            temp.comprehensiveList = ((item.Comprehensivelist == 1) ? true : false);
            temp.foodList = ((item.Foodlist == 1) ? true : false);
            temp.immuneReaction = ((item.ImmuneReaction == 1) ? true : false);
            temp.name = item.Name.trim();
            temp.reactions = {
                'IgA': 'IgA0',
                'IgG': 'IgG0',
                'IgE': 'IgG0',
                'Level': 'IgA0'
            };
            temp.codes = {
                'fontcode': 0,
                'backcode': 0,
                'bordercode': 0,
            };
            temp.diettypes = {};
            temp.ingredients = {};
            $(ele.Ingredients).each(function(j, ind) {
                tempInd = {};
                tempInd.IID = ind.IID;
                tempInd.FID = ind.FID;
                tempInd.name = ind.foodingredientName.trim();
                tempInd.reactions = {
                    'IgA': 'IgA0',
                    'IgG': 'IgG0',
                    'IgE': 'IgG0',
                    'Level': 'IgA0'
                };
                temp.ingredients[ind.IID] = tempInd;

                if (!(IngreduentsLookup.hasOwnProperty(ind.IID))) {
                    IngreduentsLookup[ind.IID] = [ind.FID];
                } else
                    IngreduentsLookup[ind.IID].push(ind.FID);
            });
            fooditems[temp.id] = temp;
        });
        this.fooditems = fooditems;
        this.ingreduentsLookup = IngreduentsLookup;
        }
        catch (err) {
          alert(" error in setFoodList function" + '    ' + err);
          console.log(" error in setFoodList function in dietplaner.js", err);

        }
    }
    this.updateReaction = function(flag) {
        this.include_reaction = flag;
    }

    this.getFoodItem = function(Fid) {
      console.log("getFoodItem Fid: ",Fid);
        try{
      $.ajax({
          url: "/api/v1/fooditems/"+Fid,
          success: function(data) {
              returnedItem = data;
              console.log("returnedItem: ",returnedItem);
              fooditems = {};
              IngreduentsLookup = {};
              var temp = {};
              item = returnedItem;
              temp.id                = item.id;
              temp.FoodAka           = item.FoodAka;
              temp.comprehensiveList = ((item.Comprehensivelist == 1) ? true : false);
              temp.foodList          = ((item.Foodlist == 1) ? true : false);
              temp.immuneReaction    = ((item.ImmuneReaction == 1) ? true : false);
              temp.name              = item.Name.trim();
              temp.reactions = {
                  'IgA': 'IgA0',
                  'IgG': 'IgG0',
                  'IgE': 'IgG0',
                  'Level': 'IgA0'
              };
              temp.codes = {
                  'fontcode': 0,
                  'backcode': 0,
                  'bordercode': 0,
              };
              temp.diettypes = {};
              temp.ingredients = {};
              $(item.Ingredients).each(function(j, ind) {
                  tempInd = {};
                  tempInd.IID = ind.IID;
                  tempInd.FID = ind.FID;
                  tempInd.name = ind.Name.trim();
                  tempInd.reactions = {
                      'IgA': 'IgA0',
                      'IgG': 'IgG0',
                      'IgE': 'IgG0',
                      'Level': 'IgA0'
                  };
                  temp.ingredients[ind.IID] = tempInd;

                  if (!(PRECRIPTION.ingreduentsLookup.hasOwnProperty(ind.IID))) {
                      PRECRIPTION.ingreduentsLookup[ind.IID] = [ind.FID];
                  } else
                      PRECRIPTION.ingreduentsLookup[ind.IID].push(ind.FID);
              });
          PRECRIPTION.fooditems[temp.id] = temp;
          },
          async: false
      });
    }
    catch (err) {
      alert(" error in getFoodItem function" + '    ' + err);
      console.log(" error in getFoodItem function in dietlanner.js", err);

    }
    }
};
