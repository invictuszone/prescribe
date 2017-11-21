var foodfilters, foodfiltersselected, dietTypeFoodListModal;

$(function() {
    intializeTabSetps();
    intializePatientProfile();

    //intializeAlletess();
    processAlphbeticalList();
});

$('#foodfiltersselected-div').on('scroll', function() {
    console.log("Moving");
});

function updateReactionType(ele) {
  try{
    //Show Wait loader
    $('#pleaseWaitModal').modal('show');  /// Hide From UserPrescribeController $scope.refreshDatatable()

    setTimeout(function(){
      // //Show Datatable Hidden Fields
      // scopeUI.FOOD_ITEM_TABLE.columns( [ 5, 6, 7 ] ).visible( true, true );

      var tempRow = $(ele).closest('tr');

      var Fid = $(tempRow).find("td:first").attr('fid');
      var tempItem = $(tempRow).find("td:first > .item-name");
      var expLevel = $(ele).val();
      appplyBorder(expLevel, tempItem);
      // // console.log(PRECRIPTION.fooditems[Fid]['codes']);
      $(tempRow).attr('bordercode', EXP_CODE_LEVEL.indexOf(expLevel));
      PRECRIPTION.fooditems[Fid]['codes']['bordercode'] = $(tempRow).attr('bordercode');
      PRECRIPTION.addMO(Fid);
      // console.log(PRECRIPTION.fooditems[Fid]['codes']);
      //FOODS_REACTION Array
      FOODS_EXP_LEVEL_SETTED = [];
      //Add To Setted Food Allow Array
      FOODS_EXP_LEVEL_SETTED.push(Fid);
      //Update Aka Names of this Food
      updateAkaEXP_LEVEL(Fid,expLevel);
      //Update Ingredients lookup
      updateIngredientLookup(Fid,expLevel);

      // // Update datatable
      var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
      scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 7).data(expLevel);
      // Update datatable
      // $(tempRow).find("td:eq(7)").html(expLevel);
      // scopeUI.refreshDatatable();

      //Hide Wait loader
      $('#pleaseWaitModal').modal('hide');
    }, 1);
    }
    catch (err) {
        alert(" error in updateReactionType function" + '    ' + err);
        console.log(" error in updateReactionType function in dietlanner-ui.js", err);

      }
}

//Step 4 dataTable Food Ingredients Modal
function updateIngredientReactionType(ele) {
  try{
    //Show Wait loader
    $('#pleaseWaitModal').modal('show');  /// Hide From UserPrescribeController $scope.refreshDatatable()
    //Show Datatable Hidden Fields

    setTimeout(function(){
      // scopeUI.FOOD_ITEM_TABLE.columns( [ 5, 6, 7 ] ).visible( true, true );

      var tempRow = $(ele).closest('a');
      var Fid = $(tempRow).attr('iid');
      var tempItem = $(tempRow).find("a:first > .item-name");
      var EXPLEVEL = $(ele).val();

      appplyBorder(EXPLEVEL, tempRow);
      $(tempRow).attr('bordercode', EXP_CODE_LEVEL.indexOf(EXPLEVEL));
      PRECRIPTION.fooditems[Fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(EXPLEVEL);
      PRECRIPTION.addMO(Fid);

      //Get Row From Food Datatable
      scopeUI.FOOD_ITEM_TABLE.rows().every(function(rowIdx, tableLoop, rowLoop) {
        var Row = this.node();
        var td_Fid = $(Row).find("td:first").attr('fid');
        if (td_Fid == Fid)
        {
          // tempRow = $('#Food-'+Fid);
          tempRow = Row;
          Fid = $(tempRow).find("td:first").attr('fid');
          var tempItem = $(tempRow).find("td:first > .item-name");
          appplyBorder(EXPLEVEL, tempItem);
          //Set select value
          // $(tempRow).find('select')[0].value = EXPLEVEL;
          // $(tempRow)[0]['cells'][3]['children'][0].value = EXPLEVEL;
          $(tempRow).find("td:eq(3)").find('select')[0].value = EXPLEVEL;

          //FOODS_REACTION Array
          FOODS_EXP_LEVEL_SETTED = [];
          //Add To Setted Food Allow Array
          FOODS_EXP_LEVEL_SETTED.push(Fid);
          //Update Aka Names of this Food
          updateAkaEXP_LEVEL(Fid,EXPLEVEL);
          //Update Ingredients lookup
          updateIngredientLookup(Fid,EXPLEVEL);

          // // Update datatable
          var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
          scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 7).data(EXPLEVEL);
        }
      });

      //Hide Wait loader
      $('#pleaseWaitModal').modal('hide');
    }, 1);
  }
  catch (err) {
      alert(" error in updateIngredientReactionType function" + '    ' + err);
      console.log(" error in updateIngredientReactionType function in dietlanner-ui.js", err);

    }
}

function updateIngredientLookup(Fid,EXPLEVEL) {
  try
  {
    if(typeof PRECRIPTION.ingreduentsLookup[Fid] != 'undefined' || PRECRIPTION.ingreduentsLookup[Fid] != null)
    {
      for (var i = 0; i < PRECRIPTION.ingreduentsLookup[Fid].length; i++)
      {
        //Check If its Already Not Set
        if(jQuery.inArray(PRECRIPTION.ingreduentsLookup[Fid][i], FOODS_EXP_LEVEL_SETTED) == -1)
        {
          var parentFoodID = PRECRIPTION.ingreduentsLookup[Fid][i];
          var bcode        = PRECRIPTION.fooditems[parentFoodID]['codes']['bordercode'];
          var preEXPLvl    = EXP_CODE_LEVEL[bcode];

          //Get Row From Food Datatable
          scopeUI.FOOD_ITEM_TABLE.rows().every(function(rowIdx, tableLoop, rowLoop) {
            var Row = this.node();
            var td_Fid = $(Row).find("td:first").attr('fid');
            if (td_Fid == parentFoodID)
            {
              var tempRow = Row;
              if(PRECRIPTION.getAllowedDietTypesCount(parentFoodID) == 0 && bcode == 0)
              {
                // var tempRow = $('#Food-'+parentFoodID);
                var ParentFID = $(tempRow).find("td:first").attr('fid');

                var tempItem = $(tempRow).find("td:first > .item-name");
                appplyBorder(EXPLEVEL, tempItem);
                $(tempRow).attr('bordercode', EXP_CODE_LEVEL.indexOf(EXPLEVEL));
                PRECRIPTION.fooditems[parentFoodID]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(EXPLEVEL);
                PRECRIPTION.addMO(parentFoodID);
                //Add To Setted Food Reaction Array
                FOODS_EXP_LEVEL_SETTED.push(parentFoodID);
                //Update Aka Names of this Food
                updateAkaEXP_LEVEL(parentFoodID,EXPLEVEL);
                //Recursive Call
                updateIngredientLookup(parentFoodID,EXPLEVEL);
                $(tempRow)[0]['cells'][3]['children'][0].value = EXPLEVEL;
                // $(tempRow).find("td:eq(7)").html(EXPLEVEL);
                var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
                scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 7).data(EXPLEVEL);
              }
              else if(EXP_CODE_ORDER.indexOf(EXPLEVEL) < EXP_CODE_ORDER.indexOf(preEXPLvl))
              {
                // var parentFoodID = PRECRIPTION.ingreduentsLookup[Fid][i];
                // var tempRow = $('#Food-'+parentFoodID);
                var ParentFID = $(tempRow).find("td:first").attr('fid');

                var tempItem = $(tempRow).find("td:first > .item-name");
                appplyBorder(EXPLEVEL, tempItem);
                $(tempRow).attr('bordercode', EXP_CODE_LEVEL.indexOf(EXPLEVEL));
                PRECRIPTION.fooditems[parentFoodID]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(EXPLEVEL);
                PRECRIPTION.addMO(parentFoodID);
                //Add To Setted Food Reaction Array
                FOODS_EXP_LEVEL_SETTED.push(parentFoodID);

                //Update Aka Names of this Food
                updateAkaEXP_LEVEL(parentFoodID,EXPLEVEL);
                //Recursive Call
                updateIngredientLookup(parentFoodID,EXPLEVEL);
                $(tempRow)[0]['cells'][3]['children'][0].value = EXPLEVEL;
                // $(tempRow).find("td:eq(7)").html(EXPLEVEL);
                var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
                scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 7).data(EXPLEVEL);
                // Update datatable
                // var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
                // scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 7).data(EXPLEVEL).draw();
              }
            }
          });
        }
      }
    }
  }
  catch (err) {
      alert(" error in updateIngredientLookup function" + '    ' + err);
      console.log(" error in updateIngredientLookup function in dietlanner-ui.js", err);

    }
}

//Reset IngredientLookup to Diet Val
function resetIngredientLookup(Fid,EXPLEVEL) {
  try
  {
    if(typeof PRECRIPTION.ingreduentsLookup[Fid] != 'undefined' || PRECRIPTION.ingreduentsLookup[Fid] != null)
    {
      for (var i = 0; i < PRECRIPTION.ingreduentsLookup[Fid].length; i++)
      {
        //Check If its Already Not Set
        if(jQuery.inArray(PRECRIPTION.ingreduentsLookup[Fid][i], FOODS_EXP_LEVEL_SETTED) == -1)
        {
          var parentFoodID = PRECRIPTION.ingreduentsLookup[Fid][i];
          PRECRIPTION.fooditems[parentFoodID]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(EXPLEVEL);
          //Remove From MO_List
          PRECRIPTION.removeMO(parentFoodID);
          //Add To Setted Food Reaction Array
          FOODS_EXP_LEVEL_SETTED.push(parentFoodID);
          //Update Aka Names of this Food
          updateAkaEXP_LEVEL(parentFoodID,EXPLEVEL);
          //Recursive Call
          resetIngredientLookup(parentFoodID,EXPLEVEL);
        }
      }
    }
  }
  catch (err) {
      alert(" error in resetIngredientLookup function" + '    ' + err);
      console.log(" error in resetIngredientLookup function in dietlanner-ui.js", err);
    }
}

//Updates Foods Akas Aswell
function updateAkaEXP_LEVEL(Fid,ExpLevel) {
  if(PRECRIPTION.fooditems[Fid]['AkaItem'] == true)
  {
    var ParentFID = PRECRIPTION.fooditems[Fid]['OrgNameID'];
    console.log("ParentFID: ",ParentFID);
    //Get Row From Food Datatable
    var tempRow = '';
    scopeUI.FOOD_ITEM_TABLE.rows().every(function(rowIdx, tableLoop, rowLoop) {
      var Row = this.node();
      var td_Fid = $(Row).find("td:first").attr('fid');
      if (td_Fid == ParentFID)
      {
        var tempRow = Row;
        // var tempRow = $('#Food-'+ParentFID);
        var tempItem = $(tempRow).find("td:first > .item-name");
        appplyBorder(ExpLevel, tempItem);
        $(tempRow).attr('bordercode', EXP_CODE_LEVEL.indexOf(ExpLevel));
        PRECRIPTION.fooditems[ParentFID]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(ExpLevel);
        PRECRIPTION.addMO(ParentFID);
        $(tempRow)[0]['cells'][3]['children'][0].value = ExpLevel;
        var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
        scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 7).data(ExpLevel);
      }
    });
  }

  for (var j = 0; j < PRECRIPTION.fooditems[Fid]['FoodAka'].length; j++)
  {
    var AkaID = "Aka-" + PRECRIPTION.fooditems[Fid]['FoodAka'][j]['id'];
    //Get Row From Food Datatable
    scopeUI.FOOD_ITEM_TABLE.rows().every(function(rowIdx, tableLoop, rowLoop) {
      var Row = this.node();
      var td_Fid = $(Row).find("td:first").attr('fid');
      if (td_Fid == AkaID)
      {
        var tempRow = Row;
        // var tempRow = $('#Food-'+AkaID);
        var tempItem = $(tempRow).find("td:first > .item-name");
        appplyBorder(ExpLevel, tempItem);
        $(tempRow).attr('bordercode', EXP_CODE_LEVEL.indexOf(ExpLevel));
        PRECRIPTION.fooditems[AkaID]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(ExpLevel);
        PRECRIPTION.addMO(AkaID);
        $(tempRow)[0]['cells'][3]['children'][0].value = ExpLevel;
        var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
        scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 7).data(ExpLevel);
      }
    });
  }
}

function toggleAllow(ele) {
  try{
    //Show Wait loader
    $('#pleaseWaitModal').modal('show');

    setTimeout(function(){

      var tempRow = $(ele).closest('tr');
      // console.log("tempRow: ",tempRow);
      var Fid = $(tempRow).find("td:first").attr('fid');
      // console.log("Fid: ",Fid);
      var tempItem = $(tempRow).find("td:first > .item-name");
      var toggleAllow = $(ele).val();

      //Experimentation Level Select
      var selectBox = $(tempRow).find("td:eq(3) select");
      // console.log("tempRow TD: ",$(tempRow)[0]['children']);
      //FOODS_ALLOW Array
      FOODS_ALLOW_SETTED = [];
      //Add To Setted Food Allow Array
      FOODS_ALLOW_SETTED.push(Fid);
      if(typeof PRECRIPTION.fooditems[Fid] == 'undefined')
        PRECRIPTION.getFoodItem(FiD);

      if(toggleAllow == 'Yes')
      {
        PRECRIPTION.fooditems[Fid]['codes']['fontcode'] = 0;
        $(tempItem).css("color","#000000;  !important");
        var ReactionTD = $(tempRow)[0]['cells'][2];
        $(ReactionTD).css("color","#000000;  !important");
        $(tempRow).attr('fontcode', 0);

        //Update Diets Allow
        $.each(PRECRIPTION.fooditems[Fid]['diettypes'], function(key, diets) {
            diets['allow'] = false;
            // console.log("diets Ing Yes Case: ",diets);
        });
        if ($(tempRow).attr('backcode') == '0' && $(tempRow).attr('fontcode') == '0') {
            $(selectBox).find('option[value="Try"]').css('display', 'none');
            $(selectBox).find('option[value="Occasionally"]').css('display', 'none');
            $(selectBox).find('option[value="Allow"]').css('display', 'none');
        }
        updateAka_Allow(Fid,toggleAllow);
        update_Ing_Parent_Allow(Fid,toggleAllow);
      }
      else if (toggleAllow == 'No') {
        PRECRIPTION.fooditems[Fid]['codes']['fontcode'] = 1;
        $(tempItem).css("color","#9B9B9B;  !important");
        var ReactionTD = $(tempRow)[0]['cells'][2];
        $(ReactionTD).css("color","#9B9B9B;  !important");
        $(tempRow).attr('fontcode', 1);

        //Update Diets Allow
        $.each(PRECRIPTION.fooditems[Fid]['diettypes'], function(key, diets) {
            diets['allow'] = true;
        });

        if ($(tempRow).attr('backcode') != '0' || $(tempRow).attr('fontcode') != '0') {
            $(selectBox).find('option[value="Try"]').css('display', 'block');
            $(selectBox).find('option[value="Occasionally"]').css('display', 'block');
            $(selectBox).find('option[value="Allow"]').css('display', 'block');
        }
        updateAka_Allow(Fid,toggleAllow);
        update_Ing_Parent_Allow(Fid,toggleAllow);
      }
      PRECRIPTION.addMOInDietList(Fid);

      // Update datatable
      // $(tempRow).find("td:eq(5)").html(toggleAllow);
      var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
      scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 5).data(toggleAllow);

      //Hide Wait loader
      $('#pleaseWaitModal').modal('hide');
      // scopeUI.refreshDatatable();
    }, 1);
   }
  catch (err) {
      alert(" error in toggleAllow function" + '    ' + err);
      console.log(" error in toggleAllow function in dietlanner-ui.js", err);
    }

}
function update_Ing_Parent_Allow(Fid,toggleAllow) {
  try
  {
    if(typeof PRECRIPTION.ingreduentsLookup[Fid] != 'undefined' || PRECRIPTION.ingreduentsLookup[Fid] != null)
    {
      for (var i = 0; i < PRECRIPTION.ingreduentsLookup[Fid].length; i++)
      {
        //Check If its Already Not Set
        if(jQuery.inArray(PRECRIPTION.ingreduentsLookup[Fid][i], FOODS_ALLOW_SETTED) == -1)
        {
          var parentFoodID = PRECRIPTION.ingreduentsLookup[Fid][i];

          // var tempRow = $('#Food-'+parentFoodID);
          //Get Row From Food Datatable
          scopeUI.FOOD_ITEM_TABLE.rows().every(function(rowIdx, tableLoop, rowLoop) {
            var Row = this.node();
            var td_Fid = $(Row).find("td:first").attr('fid');
            if (td_Fid == parentFoodID) {
              var tempRow = Row;
              var ParentFID = $(tempRow).find("td:first").attr('fid');
              var tempItem = $(tempRow).find("td:first > .item-name");
              //Experimentation Level Select
              var selectBox = $(tempRow).find("td:eq(3) select");

              if(toggleAllow == 'Yes')
              {
                PRECRIPTION.fooditems[parentFoodID]['codes']['fontcode'] = 0;
                $(tempItem).css("color","#000000;  !important");
                var ReactionTD = $(tempRow)[0]['cells'][2];
                $(ReactionTD).css("color","#000000;  !important");
                $(tempRow)[0]['cells'][1]['children'][0]['value'] = toggleAllow;
                $(tempRow).attr('fontcode', 0);

                //Update Diets Allow
                $.each(PRECRIPTION.fooditems[parentFoodID]['diettypes'], function(key, diets) {
                    diets['allow'] = false;
                });

                if ($(tempRow).attr('backcode') == '0' && $(tempRow).attr('fontcode') == '0') {
                    $(selectBox).find('option[value="Try"]').css('display', 'none');
                    $(selectBox).find('option[value="Occasionally"]').css('display', 'none');
                    $(selectBox).find('option[value="Allow"]').css('display', 'none');
                }
              }
              else if (toggleAllow == 'No')
              {
                PRECRIPTION.fooditems[parentFoodID]['codes']['fontcode'] = 1;
                $(tempItem).css("color","#9B9B9B;  !important");
                var ReactionTD = $(tempRow)[0]['cells'][2];
                $(ReactionTD).css("color","#9B9B9B;  !important");
                $(tempRow)[0]['cells'][1]['children'][0]['value'] = toggleAllow;
                $(tempRow).attr('fontcode', 1);
                //Update Diets Allow
                $.each(PRECRIPTION.fooditems[parentFoodID]['diettypes'], function(key, diets) {
                    diets['allow'] = true;
                });
                if ($(tempRow).attr('backcode') != '0' || $(tempRow).attr('fontcode') != '0') {
                    $(selectBox).find('option[value="Try"]').css('display', 'block');
                    $(selectBox).find('option[value="Occasionally"]').css('display', 'block');
                    $(selectBox).find('option[value="Allow"]').css('display', 'block');
                }
              }
              PRECRIPTION.addMOInDietList(parentFoodID);
              //Add To Setted Food Reaction Array
              FOODS_ALLOW_SETTED.push(parentFoodID);
              //Update Aka Allow
              updateAka_Allow(parentFoodID,toggleAllow);
              //Recursive Call
              update_Ing_Parent_Allow(parentFoodID,toggleAllow);

              // Update datatable
              // $(tempRow).find("td:eq(5)").html(toggleAllow);
              var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
              scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 5).data(tempRow);
              // var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
              // scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 5).data(toggleAllow).draw();
            }
          });

        }
      }
    }
  }
  catch (err) {
      alert(" error in update_Ing_Parent_Allow function" + '    ' + err);
      console.log(" error in update_Ing_Parent_Allow function in dietlanner-ui.js", err);

    }
}

//Updates Foods Akas Allow Aswell
function updateAka_Allow(Fid,toggleAllow) {
  if(PRECRIPTION.fooditems[Fid]['AkaItem'] == true)
  {
    var ParentFID = PRECRIPTION.fooditems[Fid]['OrgNameID'];
    //Get Row From Food Datatable
    scopeUI.FOOD_ITEM_TABLE.rows().every(function(rowIdx, tableLoop, rowLoop) {
      var Row = this.node();
      var td_Fid = $(Row).find("td:first").attr('fid');
      if (td_Fid == ParentFID)
      {
        var tempRow = Row;
        // var tempRow = $('#Food-'+ParentFID);
        var tempItem = $(tempRow).find("td:first > .item-name");
        var selectBox = $(tempRow).find("td:eq(3) select");
        //Set InDiet value
        if (typeof $(tempRow)[0] != 'undefined') {
          $(tempRow)[0]['cells'][1]['children'][0]['value'] = toggleAllow;
        }
        if(toggleAllow == 'Yes')
        {
          PRECRIPTION.fooditems[ParentFID]['codes']['fontcode'] = 0;
          $(tempItem).css("color","#000000;  !important");
          var ReactionTD = $(tempRow)[0]['cells'][2];
          $(ReactionTD).css("color","#000000;  !important");
          $(tempRow).attr('fontcode', 0);
          //Update Diets Allow
          $.each(PRECRIPTION.fooditems[ParentFID]['diettypes'], function(key, diets) {
              diets['allow'] = false;
              // console.log("diets Ing Yes Case: ",diets);
          });
          if ($(tempRow).attr('backcode') == '0' && $(tempRow).attr('fontcode') == '0') {
              $(selectBox).find('option[value="Try"]').css('display', 'none');
              $(selectBox).find('option[value="Occasionally"]').css('display', 'none');
              $(selectBox).find('option[value="Allow"]').css('display', 'none');
          }
        }
        else if (toggleAllow == 'No') {
          PRECRIPTION.fooditems[ParentFID]['codes']['fontcode'] = 1;
          $(tempItem).css("color","#9B9B9B;  !important");
          var ReactionTD = $(tempRow)[0]['cells'][2];
          $(ReactionTD).css("color","#9B9B9B;  !important");
          $(tempRow).attr('fontcode', 1);

          //Update Diets Allow
          $.each(PRECRIPTION.fooditems[ParentFID]['diettypes'], function(key, diets) {
              diets['allow'] = true;
          });

          if ($(tempRow).attr('backcode') != '0' || $(tempRow).attr('fontcode') != '0') {
              $(selectBox).find('option[value="Try"]').css('display', 'block');
              $(selectBox).find('option[value="Occasionally"]').css('display', 'block');
              $(selectBox).find('option[value="Allow"]').css('display', 'block');
          }
        }
        var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
        scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 5).data(toggleAllow);
      }
    });
  }

  for (var j = 0; j < PRECRIPTION.fooditems[Fid]['FoodAka'].length; j++)
  {
    var AkaID = "Aka-" + PRECRIPTION.fooditems[Fid]['FoodAka'][j]['id'];
    //Get Row From Food Datatable
    scopeUI.FOOD_ITEM_TABLE.rows().every(function(rowIdx, tableLoop, rowLoop) {
      var Row = this.node();
      var td_Fid = $(Row).find("td:first").attr('fid');
      if (td_Fid == AkaID)
      {
        var tempRow = Row;
        // var tempRow = $('#Food-'+AkaID);
        var tempItem = $(tempRow).find("td:first > .item-name");
        var selectBox = $(tempRow).find("td:eq(3) select");
        //Set InDiet value
        if (typeof $(tempRow)[0] != 'undefined') {
          $(tempRow)[0]['cells'][1]['children'][0]['value'] = toggleAllow;
        }
        if(toggleAllow == 'Yes')
        {
          PRECRIPTION.fooditems[AkaID]['codes']['fontcode'] = 0;
          $(tempItem).css("color","#000000;  !important");
          var ReactionTD = $(tempRow)[0]['cells'][2];
          $(ReactionTD).css("color","#000000;  !important");
          $(tempRow).attr('fontcode', 0);
          //Update Diets Allow
          $.each(PRECRIPTION.fooditems[AkaID]['diettypes'], function(key, diets) {
              diets['allow'] = false;
              // console.log("diets Ing Yes Case: ",diets);
          });
          if ($(tempRow).attr('backcode') == '0' && $(tempRow).attr('fontcode') == '0') {
              $(selectBox).find('option[value="Try"]').css('display', 'none');
              $(selectBox).find('option[value="Occasionally"]').css('display', 'none');
              $(selectBox).find('option[value="Allow"]').css('display', 'none');
          }
        }
        else if (toggleAllow == 'No') {
          PRECRIPTION.fooditems[AkaID]['codes']['fontcode'] = 1;
          $(tempItem).css("color","#9B9B9B;  !important");
          var ReactionTD = $(tempRow)[0]['cells'][2];
          $(ReactionTD).css("color","#9B9B9B;  !important");
          $(tempRow).attr('fontcode', 1);

          //Update Diets Allow
          $.each(PRECRIPTION.fooditems[AkaID]['diettypes'], function(key, diets) {
              diets['allow'] = true;
          });

          if ($(tempRow).attr('backcode') != '0' || $(tempRow).attr('fontcode') != '0') {
              $(selectBox).find('option[value="Try"]').css('display', 'block');
              $(selectBox).find('option[value="Occasionally"]').css('display', 'block');
              $(selectBox).find('option[value="Allow"]').css('display', 'block');
          }
        }
        var TabelRow = scopeUI.FOOD_ITEM_TABLE.row( tempRow );
        scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 5).data(toggleAllow);
      }
    });
  }
}


function toggleAutoImune(ele) {
  try{

    //Show Ajax loader
    $('#pleaseWaitModal').modal('show');
    /// Hide From UserPrescribeController $scope.refreshDatatable()

    setTimeout(function(){
      var scope = angular.element("#dietprescriptionapp").scope();
      applyAutoImune = $(ele).is(":checked");
      PRECRIPTION.autoimmune = applyAutoImune;

      PRECRIPTION.formatFoodList(scope.FOOD_ITEM_TABLE);
    }, 1);
  }
  catch (err) {
      alert(" error in toggleAutoImune function" + '    ' + err);
      console.log(" error in toggleAutoImune function in dietlanner-ui.js", err);

    }

}

function intializeTabSetps() {
  try{
    $('.tab-change').click(function(event) {
        var ele = $(event.target);
        if (!ele.hasClass("tab-change")) {
            ele = ele.closest('.tab-change');
        }
        link = ele.attr('href');

        if(link == '#step1')
      {
        //$('#navTab1').attr('href','#step1');
        // $('#navTab1').attr('data-toggle','tab');
        $('#navTab1').attr({
            href: '#step1',
            'data-toggle': 'tab'
          });

      }


      if(link == '#step2')
      {
        //$('#navTab2').attr('href','#step2');
        // $('#navTab2').attr('data-toggle','tab');
        $('#navTab2').attr({
            href: '#step2',
            'data-toggle': 'tab'
          });

      }

      if(link == '#step3')
      {
        //$('#navTab3').attr('href data-toggle','#step3 tab');
        // $('#navTab3').attr('data-toggle','tab');
        $('#navTab3').attr({
            href: '#step3',
            'data-toggle': 'tab'
          });

        //Show Ajax loader
        $('#pleaseWaitModal').modal('show');
        // /// Hide From UserPrescribeController $scope.refreshDatatable()
      }



        if(link == '#step4')
        {

          var Time = getCurrentTime();
          $('#currentTime').html('');
          $('#currentTime').html(Time);

          $('#navTab3').removeAttr('href data-toggle');
          $('#navTab2').removeAttr('href data-toggle');
          $('#navTab1').removeAttr('href data-toggle');

          // $('#navTab3').prop("disabled", disable);
          // $('#navTab2').prop("disabled", disable);
          // $('#navTab1').prop("disabled", disable);
        }



        //$("#navTab1").bind('click', false);
        link = link.replace("#step", "");
        active = $('.mt-step-col').eq(link);
        $('.mt-step-col').removeClass("active");
        active.addClass("active");
         $("html, body").animate({ scrollTop: 0 }, 600);
    });
  }
  catch (err) {
      alert(" error in intializeTabSetps function" + '    ' + err);
      console.log(" error in intializeTabSetps function in dietlanner-ui.js", err);

    }
}

function getCurrentTime() {
  var date = new Date();
  var month = date.getMonth() + 1; //months from 1-12
  var day = date.getDate();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = month + '/' + day + '/' + year + '  ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  return strTime;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////		intializePatientProfile()			////////////////////////////////
//						Intializez the table for patient diet history								 //
//////////////////////////////////////////////////////////////////////////////////////////////////////
function intializePatientProfile() {
  try{
  $(".selectpatient").select2({
  ajax: {
    url: '/api/v1/getPatientSelect2/',
    dataType: 'json',
    delay: 250,
    data: function (params) {
      return {
        q: params.term, // search term
        page: params.page
      };
    },
    processResults: function (data, params) {
      console.log("data: ",data);
      console.log("params: ",params);
      // parse the results into the format expected by Select2
      // since we are using custom formatting functions we do not need to
      // alter the remote JSON data, except to indicate that infinite
      // scrolling can be used
      params.page = params.page || 1;

      return {
        results: data,
        pagination: {
          more: (params.page * 30) < data.total_count
        }
      };
    },
    cache: true,
  },
  width: '100%',
  placeholder: "Select Patient",
  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
  minimumInputLength: 1,
  templateResult: formatRepo,
  templateSelection: formatRepoSelection
});

function formatRepo (repo) {
  console.log("repo: ",repo);
  if (repo.loading) {
    return repo.text;
  }

  var markup = "<div class='select2-result-repository clearfix'>";
  markup += "<div class='select2-result-repository__avatar'>";
  if(repo['infusionrecordID'] != null && repo['infusionrecordID'] != "" && repo['infusionrecordID'] > 50)
  {
    markup += "<img src='https://admin.bodypro.com/userphoto/" + repo['infusionrecordID'] + ".jpg' />";
  }
  else {
    markup += "<img src='../assets/images/patients/" + repo.id + "/" + repo.image + "' />";
  }
  markup += "</div>";
  markup +=  "<div class='select2-result-repository__meta'>";
  markup +=    "<div class='select2-result-repository__title'>" + repo.fname +' '+repo.lname + "</div>";

  if (repo.email) {
    markup += "<div class='select2-result-repository__description'>" + repo.email + "</div>";
  }

  markup += "<div class='select2-result-repository__statistics'>" +
    "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> " + repo.created_at + "</div>" +
    // "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> " + repo.stargazers_count + " Stars</div>" +
    // "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
  "</div>" +
  "</div></div>";

  return markup;
}

function formatRepoSelection (repo) {
  if (repo.fname) {
    return repo.fname + " " + repo.lname
  }
  else {
    return repo.text;
  }
  // return repo.fname || repo.text;
  // return repo.fname  +" "+ repo.lname || repo.text;
}

    $(".clear-button").click(function() {
      //  $('.ini-details').find('input:text').val('');

      $(".form1").val(' ');

      $('.form1').prop("disabled", false);

      //$(".selectpatient").val('null').trigger('change');
      //$(".selectpatient").empty().trigger('change');
      //$('.select2-container').select2('val', ' ');
      //$("#step0-3").hide();

    });
  //  $(".selectpatient").select2("val", "", "placeholder", "Select a Patient def");


    $('#selectr').select2();
    $('#selectr1').select2();
    $('#selectr2').select2();

    $('.date-picker').datepicker({
      // format: 'yyyy-mm-dd'
      format: 'mm/dd/yyyy'
    });

    $('#selectr1').change(function() {
        $("#step0-3").addClass("active");
        $("#step0-1").removeClass("active");
    });

    $('#selectr').change(function() {
        $("#step0-3").addClass("active");
        $("#step0-2").removeClass("active");

    });

    $('#select2').change(function() {
        $("#step0-3").addClass("active");

    });


    var table = $('#diet-history-table');


    var oTable = table.dataTable({
        // setup responsive extension: http://datatables.net/extensions/responsive/
        responsive: true,

        "order": [
            [0, 'asc']
        ],
        "lengthChange": false,

        // set the initial value
        "pageLength": 5
    });
  }
  catch (err) {
      alert(" error in intializePatientProfile function" + '    ' + err);
      console.log(" error in intializePatientProfile function in dietlanner-ui.js", err);

    }


}

function changeColor(ele) {
  try{
    // console.log("ele: ",ele);
    var optionSelected = $(ele).find("option:selected");
    // console.log("optionSelected: ",optionSelected);
    var ite = $(optionSelected).closest('li');
    // console.log("ite: ",ite);
    var Fid = $(ite).attr('fid');
    reactionSelected = $(ele).val();
    if(BackTrack_Panel_Color(Fid,reactionSelected))
    {
      PRECRIPTION.setReaction(Fid, reactionSelected);

      //FOODS_REACTION Array
      FOODS_REACTION_SETTED = [];
      //Add To Setted Food Reaction Array
      FOODS_REACTION_SETTED.push(Fid);
      //update Akas Aswell
      updateAka_Panel_Color(Fid,reactionSelected);
      //In lookup table we use Fid as ingredient ID now
      changeColor_IngLookUp(Fid,reactionSelected);
      level = PRECRIPTION.getReactionLevel(Fid);

      $('li[fid="' + Fid + '"]').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
      // $('.food-item[id="' + Fid + '"]').find('.ListFoodName').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
      //console.log(Fid + ' the Fid');
    }
  }
  catch (err) {
      alert(" error in changeColor function" + '    ' + err);
      console.log(" error in changeColor function in dietlanner-ui.js", err);

    }
}

function BackTrack_Panel_Color(FiD,reactionSelected) {
  try{
      var checkReaction = true;
      var reactionOrder = ['IgE7', 'IgE6', 'IgE5', 'IgE4', 'IgE3', 'IgE2', 'IgE1', 'IgE0/1', 'IgG7', 'IgA7', 'IgG6', 'IgA6', 'IgG5', 'IgA5', 'IgG4', 'IgA4', 'IgG3', 'IgA3', 'IgG2', 'IgA2', 'IgG1', 'IgA1', 'IgE0', 'IgG0', 'IgA0'];
      if(typeof PRECRIPTION.fooditems[FiD] != 'undefined')
      {
        var ingredients = PRECRIPTION.fooditems[FiD]['ingredients'];
        $.each(ingredients, function(key, ingObj)
        {
          var IngID = ingObj['IID'];
          if(typeof PRECRIPTION.fooditems[IngID] != 'undefined')
          {
            var ingReaction = PRECRIPTION.fooditems[IngID]['reactions']['Level'];
            if(reactionOrder.indexOf(ingReaction) < reactionOrder.indexOf(reactionSelected))
            {
              checkReaction = false;
            }
          }
        });
      }
      return checkReaction;
  }
  catch (err) {
      // alert(" error in BackTrack_Panel_Color function" + '    ' + err);
      console.log(" error in BackTrack_Panel_Color function in dietlanner-ui.js", err);

    }
}

//match highest of the oldest and currentt reaction and return that for panel
function Highest_Reaction_AI(FiD,reactionSelected) {
  try
  {
      var reactionOrder = ['IgE7', 'IgE6', 'IgE5', 'IgE4', 'IgE3', 'IgE2', 'IgE1', 'IgE0/1', 'IgG7', 'IgA7', 'IgG6', 'IgA6', 'IgG5', 'IgA5', 'IgG4', 'IgA4', 'IgG3', 'IgA3', 'IgG2', 'IgA2', 'IgG1', 'IgA1', 'IgE0', 'IgG0', 'IgA0'];
      if(typeof PRECRIPTION.fooditems[FiD] != 'undefined')
      {
        var FoodOrgReaction = PRECRIPTION.fooditems[FiD]['reactions']['Level'];
        if(reactionOrder.indexOf(FoodOrgReaction) < reactionOrder.indexOf(reactionSelected)) {
          return FoodOrgReaction;
        }
        else {
          return reactionSelected;
        }
      }
  }
  catch (err) {
      // alert(" error in Highest_Reaction_AI function" + '    ' + err);
      console.log(" error in Highest_Reaction_AI function in dietlanner-ui.js", err);

    }
}

//Updates Foods Akas Allow Aswell
function updateAka_Panel_Color(Fid,reactionSelected) {
  //Set OrgName
  if (typeof PRECRIPTION.fooditems[Fid]['AkaItem'] !='undefined')
  {
    if(PRECRIPTION.fooditems[Fid]['AkaItem'] == true)
    {
      var ParentFID = PRECRIPTION.fooditems[Fid]['OrgNameID'];
      console.log("ParentFID: ",ParentFID);
      PRECRIPTION.setReaction(ParentFID, reactionSelected);
      var level = PRECRIPTION.getReactionLevel(ParentFID);
      $('li[fid="' + ParentFID + '"]').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
    }
  }
  //Set Aka's Name
  if (typeof PRECRIPTION.fooditems[Fid]['FoodAka'] !='undefined')
  {
    for (var j = 0; j < PRECRIPTION.fooditems[Fid]['FoodAka'].length; j++)
    {
      var AkaID = "Aka-" + PRECRIPTION.fooditems[Fid]['FoodAka'][j]['id'];
      console.log("AkaID: ",AkaID);
      PRECRIPTION.setReaction(AkaID, reactionSelected);
      var level = PRECRIPTION.getReactionLevel(AkaID);
      $('li[fid="' + AkaID + '"]').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
    }
  }
}

function changeColor_IngLookUp(FiD,reactionSelected) {
  try{
  //In lookup table we use FiD as ingredient ID now
  var IiD = FiD;
  if(typeof PRECRIPTION.ingreduentsLookup[IiD] != 'undefined')
  {
    // console.log("PRECRIPTION.ingreduentsLookup["+ IiD +"]: ",typeof PRECRIPTION.ingreduentsLookup[IiD]);
    for (var i in PRECRIPTION.ingreduentsLookup[IiD])
    {
      //Check If its Already Not Set
      if(jQuery.inArray(PRECRIPTION.ingreduentsLookup[IiD][i], FOODS_REACTION_SETTED) == -1)
      {
        // console.log("Doesnt Exists");
        // console.log("PRECRIPTION.ingreduentsLookup["+ IiD +"]["+ i +"]: ");
        FiD                = PRECRIPTION.ingreduentsLookup[IiD][i];
        var oldReactionLvl = PRECRIPTION.fooditems[FiD]['reactions']['Level'];
        //Add To Setted Food Reaction Array
        FOODS_REACTION_SETTED.push(FiD);
        var reactionOrder = ['IgE7', 'IgE6', 'IgE5', 'IgE4', 'IgE3', 'IgE2', 'IgE1', 'IgE0/1', 'IgG7', 'IgA7', 'IgG6', 'IgA6', 'IgG5', 'IgA5', 'IgG4', 'IgA4', 'IgG3', 'IgA3', 'IgG2', 'IgA2', 'IgG1', 'IgA1', 'IgE0', 'IgG0', 'IgA0'];
        // PRECRIPTION.setIngredientReaction(FiD, IiD, reactionSelected);
        //Compare Both Levels EXP DT was TRY and EXP Reac NO
        if(reactionOrder.indexOf(reactionSelected) < reactionOrder.indexOf(oldReactionLvl))
        {
          PRECRIPTION.setReaction(FiD, reactionSelected);
          level = PRECRIPTION.getReactionLevel(FiD);
          $('li[fid="' + FiD + '"]').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
        }
        // console.log("Sent FiD: ",FiD);
        //update Akas Aswell
        updateAka_Panel_Color(FiD,reactionSelected);
        changeColor_IngLookUp(FiD,reactionSelected);
        // console.log("Recived FiD: ",FiD);
      }
    }

  }
  //Reset orginal FID
  FiD = IiD;
  // return FID;
  }
  catch (err) {
      alert(" error in changeColor_IngLookUp function" + '    ' + err);
      console.log(" error in changeColor_IngLookUp function in dietlanner-ui.js", err);

    }
}


///////////////////////////////////////////////////////////////////////////////////////////
// // File Upload Of IgE Panel //////////
// var checkSpanToggleIGE = 0;
// $('.panelfileuploadIGE').on('change', function(){
//
//         if(checkSpanToggleIGE == 0)
//         {
//           $(".hideSpanIGE").hide();
//           checkSpanToggleIGE = 1;
//         }
//         else if(checkSpanToggleIGE == 2){
//           checkSpanToggleIGE = 0;
//         }
//
//       });
// $('.showSpanIGE').on('click', function(){
//         $(".hideSpanIGE").show();
//         checkSpanToggleIGE = 2;
//
//     });
//
// // File Upload Of IgG Panel //////////
// var checkSpanToggle = 0;
// $('.panelfileuploadIGG').on('change', function(){
//         if(checkSpanToggle == 0)
//         {
//           $(".hideSpanIGG").hide();
//           checkSpanToggle = 1;
//         }
//         else if(checkSpanToggle == 2){
//           checkSpanToggle = 0;
//         }
//       });
// $('.showSpanIGG').on('click', function(){
//         $(".hideSpanIGG").show();
//         checkSpanToggle = 2;
//     });
//
//     $('.panelfileuploadIGG').on('change', prepareUpload);
//     $('.panelfileuploadIGE').on('change', prepareUpload);

function prepareUpload(event) {
  try{
    scopeUI.prepareUploadEVENT = event;
    if (scopeUI.checkSpanToggle == 1 || scopeUI.checkSpanToggleIGE == 1)
    {
      if (PRECRIPTION.autoimmune) {
        $('#autoimune-Yes').removeAttr('disabled');
        $('#autoimune-No').removeAttr('disabled');
        $('#autoimune-Apply-Btn').attr("onclick","prepareUpload_ChildFn_AutoImmune()");
        $('#FoodPanel-FileUpload-Modal').modal('show');
      }
      else {
        prepareUpload_ChildFn_Simple();
      }
    }
  }
  catch (err) {
      // alert(" error in prepareUpload function" + '    ' + err);
      console.log(" error in prepareUpload function in dietlanner-ui.js", err);

    }
}

//Simple
function prepareUpload_ChildFn_Simple() {
  try{
    event = scopeUI.prepareUploadEVENT;
    //Show Ajax loader
    $('#pleaseWaitModal').modal('show');

    files = event.target.files;
    var data = new FormData();
    $.each(files, function(key, value) {
        data.append(key, value);
    });
    var panel = $(event.target).closest('.tab-pane').find('.food-Panel');
    // var panelName = panel.attr('panelname');
    var panelName = panel.attr('panelid');
    console.log("panelName: ",panelName);
    data.append('panel', panelName);
    // console.log("Reading File");
    $.ajax({
        url: 'http://suzukipak.invictuszone.com/pdfToJson.php?files',
        // url: 'http://prescribediets.com/assets/global/plugins/dietplanner/ParseScript/pdfToJson.php?files',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR) {
            //Hide Ajax loader
            $('#pleaseWaitModal').modal('hide');

            console.log("data: ",data);
            orderedItems = data.Scores;
            var viewItems = $(panel).find('li');
            itemNumber = 0;
            $(viewItems).each(function(i, ite) {
                if ($(ite).attr('class').indexOf("split") < 0)
                {
                  // opt = orderedItems[itemNumber]['class'];
                  // optSelect = $(ite).find('option:eq(' + opt + ')').val();
                  // $(ite).find('select').val(optSelect).change();
                  // console.log("$(ite).find('select'): ",$(ite).find('select'));
                  // itemNumber++;

                    opt = orderedItems[itemNumber]['class'];
                    optSelect = $(ite).find('option:eq(' + opt + ')').val();
                    var ele = $(ite).find('select');
                    $(ele).val(optSelect);
                    var optionSelected = $(ele).find("option:selected");
                    var ite = $(optionSelected).closest('li');
                    var Fid = $(ite).attr('fid');
                    var reactionSelected = $(ele).val();
                    PRECRIPTION.setReaction(Fid, reactionSelected);

                    //FOODS_REACTION Array
                    FOODS_REACTION_SETTED = [];
                    //Add To Setted Food Reaction Array
                    FOODS_REACTION_SETTED.push(Fid);
                    //update Akas Aswell
                    updateAka_Panel_Color(Fid,reactionSelected);
                    //In lookup table we use Fid as ingredient ID now
                    changeColor_IngLookUp(Fid,reactionSelected);
                    var level = PRECRIPTION.getReactionLevel(Fid);

                    $('li[fid="' + Fid + '"]').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);

                    itemNumber++;
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //Hide Ajax loader
            $('#pleaseWaitModal').modal('hide');
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
        }
    });
  }
  catch (err) {
      // alert(" error in prepareUpload_ChildFn_Simple function" + '    ' + err);
      console.log(" error in prepareUpload_ChildFn_Simple function in dietlanner-ui.js", err);
    }
}

//Incase of editing and auto-immune is checked
function prepareUpload_ChildFn_AutoImmune() {
  try{
    event = scopeUI.prepareUploadEVENT;
    $('#FoodPanel-FileUpload-Modal').modal('hide');
    //Show Ajax loader
    $('#pleaseWaitModal').modal('show');

    var radioValue = $("input[name='fileCheck-autoimune']:checked").val();

    if (radioValue == 'No')
    {
      prepareUpload_ChildFn_Simple();
    }
    else
    {
      files = event.target.files;
      var data = new FormData();
      $.each(files, function(key, value) {
          data.append(key, value);
      });
      var panel = $(event.target).closest('.tab-pane').find('.food-Panel');
      // var panelName = panel.attr('panelname');
      var panelName = panel.attr('panelid');
      console.log("panelName: ",panelName);
      data.append('panel', panelName);
      // console.log("Reading File");
      $.ajax({
          url: 'http://suzukipak.invictuszone.com/pdfToJson.php?files',
          // url: 'http://prescribediets.com/assets/global/plugins/dietplanner/ParseScript/pdfToJson.php?files',
          type: 'POST',
          data: data,
          cache: false,
          dataType: 'json',
          processData: false, // Don't process the files
          contentType: false, // Set content type to false as jQuery will tell the server its a query string request
          success: function(data, textStatus, jqXHR) {
              //Hide Ajax loader
              $('#pleaseWaitModal').modal('hide');

              console.log("data: ",data);
              orderedItems = data.Scores;
              var viewItems = $(panel).find('li');
              itemNumber = 0;
              $(viewItems).each(function(i, ite) {
                if ($(ite).attr('class').indexOf("split") < 0)
                {
                    opt = orderedItems[itemNumber]['class'];
                    optSelect = $(ite).find('option:eq(' + opt + ')').val();
                    var ele = $(ite).find('select');
                    $(ele).val(optSelect);
                    var optionSelected = $(ele).find("option:selected");
                    var ite = $(optionSelected).closest('li');
                    var reactionSelected = $(ele).val();
                    var Fid = $(ite).attr('fid');

                    //if Food triggers Gluten Reaction
                    if (PRECRIPTION.fooditems[Fid]['immuneReaction'])
                    {
                      reactionSelected = Highest_Reaction_AI(Fid,reactionSelected);
                    }
                    PRECRIPTION.setReaction(Fid, reactionSelected);

                    //FOODS_REACTION Array
                    FOODS_REACTION_SETTED = [];
                    //Add To Setted Food Reaction Array
                    FOODS_REACTION_SETTED.push(Fid);
                    //update Akas Aswell
                    updateAka_Panel_Color(Fid,reactionSelected);
                    //In lookup table we use Fid as ingredient ID now
                    changeColor_IngLookUp(Fid,reactionSelected);
                    var level = PRECRIPTION.getReactionLevel(Fid);

                    $('li[fid="' + Fid + '"]').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
                    itemNumber++;
                }
              });
          },
          error: function(jqXHR, textStatus, errorThrown) {
              //Hide Ajax loader
              $('#pleaseWaitModal').modal('hide');
              // Handle errors here
              console.log('ERRORS: ' + textStatus);
          }
      });
    }
  }
  catch (err) {
      // alert(" error in prepareUpload_ChildFn_AutoImmune function" + '    ' + err);
      console.log(" error in prepareUpload_ChildFn_AutoImmune function in dietlanner-ui.js", err);
    }
}

//Update Diet Food Items Border
function updateBorderFoodItem(ele, level) {
  try {
    ele = $(ele).closest('.food-item').find('.ListFoodName');
    $(ele).attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
    var foodID = $(ele).closest('.food-item').attr('id');
    if(PRECRIPTION.fooditems[foodID]['AkaItem'] == true)
    {
      var ParentFID = PRECRIPTION.fooditems[foodID]['OrgNameID'];
      for (var i = 0; i < dietTypeFoodListModal['items'].length; i++)
      {
        if(dietTypeFoodListModal['items'][i]['elm'].id == ParentFID)
        {
          var ParentTag = $(dietTypeFoodListModal['items'][i]['elm']).find('.ListFoodName');
          ParentTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
          //Reset Radio Buttons
          ParentTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=Al'+ParentFID+']');
          ParentTag.prop('checked', false);
          ParentTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=OC'+ParentFID+']');
          ParentTag.prop('checked', false);
          ParentTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=TR'+ParentFID+']');
          ParentTag.prop('checked', false);
          ParentTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=NO'+ParentFID+']');
          ParentTag.prop('checked', false);
          ParentTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=NE'+ParentFID+']');
          ParentTag.prop('checked', false);
          if(level == 4)
          {
            ParentTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=Al'+ParentFID+']');
            ParentTag.prop('checked', true);
          }
          if(level == 3)
          {
            ParentTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=OC'+ParentFID+']');
            ParentTag.prop('checked', true);
          }
          if(level == 2)
          {
            ParentTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=TR'+ParentFID+']');
            ParentTag.prop('checked', true);
          }
          if(level == 1)
          {
            ParentTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=NO'+ParentFID+']');
            ParentTag.prop('checked', true);
          }
          if(level == 0)
          {
            ParentTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=NE'+ParentFID+']');
            ParentTag.prop('checked', true);
          }
        }
      }
    }

    for (var j = 0; j < PRECRIPTION.fooditems[foodID]['FoodAka'].length; j++)
    {
      var AkaID = "Aka-" + PRECRIPTION.fooditems[foodID]['FoodAka'][j]['id'];
      for (var i = 0; i < dietTypeFoodListModal['items'].length; i++)
      {
        if(dietTypeFoodListModal['items'][i]['elm'].id == AkaID)
        {
          var AkaTag = $(dietTypeFoodListModal['items'][i]['elm']).find('.ListFoodName');
          AkaTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
          //Reset Radio Buttons
          AkaTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=Al'+AkaID+']');
          AkaTag.prop('checked', false);
          AkaTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=OC'+AkaID+']');
          AkaTag.prop('checked', false);
          AkaTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=TR'+AkaID+']');
          AkaTag.prop('checked', false);
          AkaTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=NO'+AkaID+']');
          AkaTag.prop('checked', false);
          AkaTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=NE'+AkaID+']');
          AkaTag.prop('checked', false);
          if(level == 4)
          {
            AkaTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=Al'+AkaID+']');
            AkaTag.prop('checked', true);
          }
          if(level == 3)
          {
            AkaTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=OC'+AkaID+']');
            AkaTag.prop('checked', true);
          }
          if(level == 2)
          {
            AkaTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=TR'+AkaID+']');
            AkaTag.prop('checked', true);
          }
          if(level == 1)
          {
            AkaTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=NO'+AkaID+']');
            AkaTag.prop('checked', true);
          }
          if(level == 0)
          {
            AkaTag = $(dietTypeFoodListModal['items'][i]['elm']).find('input[id=NE'+AkaID+']');
            AkaTag.prop('checked', true);
          }
        }
      }
    }
  }
  catch (err) {
      alert(" error in updateBorderFoodItem function" + '    ' + err);
      console.log(" error in updateBorderFoodItem function in dietlanner-ui.js", err);
  }
}

//Update Diet MO_List Items Border
function updateBorderMO_List(ele, dieExp_level) {
  try {
    var experimentation_level = $(ele).val();
    var level = EXP_CODE_ORDER.indexOf(experimentation_level);
    ele = $(ele).closest('.list-group-item').find('.ListFoodName');
    $(ele).attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
    var foodID = $(ele).closest('.list-group-item').attr('data-id');

    if(PRECRIPTION.fooditems[foodID]['AkaItem'] == true)
    {
      var ParentFID = PRECRIPTION.fooditems[foodID]['OrgNameID'];

      //If Exp is Allow
      if (dieExp_level != 'Allow')
      {
        for (var i = 0; i < scopeUI.Allow_MOList['items'].length; i++)
        {
          var Parent_FoodsID = $(scopeUI.Allow_MOList['items'][i]['elm']).attr('data-id');
          if(Parent_FoodsID == ParentFID)
          {
            var ParentTag = $(scopeUI.Allow_MOList['items'][i]['elm']).find('.ListFoodName');
            ParentTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
            //Set Select's Exp's
            ParentTag = $(scopeUI.Allow_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
            ParentTag.val(experimentation_level);
          }
        }
      }

      //If Exp is Occasionally
      if (dieExp_level != 'Occasionally')
      {
        for (var i = 0; i < scopeUI.Occasionally_MOList['items'].length; i++)
        {
          var Parent_FoodsID = $(scopeUI.Occasionally_MOList['items'][i]['elm']).attr('data-id');
          if(Parent_FoodsID == ParentFID)
          {
            var ParentTag = $(scopeUI.Occasionally_MOList['items'][i]['elm']).find('.ListFoodName');
            ParentTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
            //Set Select's Exp's
            ParentTag = $(scopeUI.Occasionally_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
            ParentTag.val(experimentation_level);
          }
        }
      }

      //If Exp is Try
      if (dieExp_level != 'Try')
      {
        for (var i = 0; i < scopeUI.Try_MOList['items'].length; i++)
        {
          var Parent_FoodsID = $(scopeUI.Try_MOList['items'][i]['elm']).attr('data-id');
          if(Parent_FoodsID == ParentFID)
          {
            var ParentTag = $(scopeUI.Try_MOList['items'][i]['elm']).find('.ListFoodName');
            ParentTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
            //Set Select's Exp's
            ParentTag = $(scopeUI.Try_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
            ParentTag.val(experimentation_level);
          }
        }
      }

      //If Exp is No
      if (dieExp_level != 'No')
      {
        for (var i = 0; i < scopeUI.No_MOList['items'].length; i++)
        {
          var Parent_FoodsID = $(scopeUI.No_MOList['items'][i]['elm']).attr('data-id');
          if(Parent_FoodsID == ParentFID)
          {
            var ParentTag = $(scopeUI.No_MOList['items'][i]['elm']).find('.ListFoodName');
            ParentTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
            //Set Select's Exp's
            ParentTag = $(scopeUI.No_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
            ParentTag.val(experimentation_level);
          }
        }
      }

      //If Exp is Never
      if (dieExp_level != 'Never')
      {
        for (var i = 0; i < scopeUI.Never_MOList['items'].length; i++)
        {
          var Parent_FoodsID = $(scopeUI.Never_MOList['items'][i]['elm']).attr('data-id');
          if(Parent_FoodsID == ParentFID)
          {
            var ParentTag = $(scopeUI.Never_MOList['items'][i]['elm']).find('.ListFoodName');
            ParentTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
            //Set Select's Exp's
            ParentTag = $(scopeUI.Never_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
            ParentTag.val(experimentation_level);
          }
        }
      }
    }
    ////////////////////////////////
    ////////  Set Aka's ////////////
    ////////////////////////////////
    for (var j = 0; j < PRECRIPTION.fooditems[foodID]['FoodAka'].length; j++)
    {
      var AkaID = "Aka-" + PRECRIPTION.fooditems[foodID]['FoodAka'][j]['id'];

      //If Exp is Allow
      if (dieExp_level != 'Allow')
      {
        for (var i = 0; i < scopeUI.Allow_MOList['items'].length; i++)
        {
          var Aka_FoodsID = $(scopeUI.Allow_MOList['items'][i]['elm']).attr('data-id');
          if(Aka_FoodsID == AkaID)
          {
            var AkaTag = $(scopeUI.Allow_MOList['items'][i]['elm']).find('.ListFoodName');
            AkaTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
            //Set Select's Exp's
            AkaTag = $(scopeUI.Allow_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
            AkaTag.val(experimentation_level);
          }
        }
      }

      //If Exp is Occasionally
      if (dieExp_level != 'Occasionally')
      {
        for (var i = 0; i < scopeUI.Occasionally_MOList['items'].length; i++)
        {
          var Aka_FoodsID = $(scopeUI.Occasionally_MOList['items'][i]['elm']).attr('data-id');
          if(Aka_FoodsID == AkaID)
          {
            var AkaTag = $(scopeUI.Occasionally_MOList['items'][i]['elm']).find('.ListFoodName');
            AkaTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
            //Set Select's Exp's
            AkaTag = $(scopeUI.Occasionally_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
            AkaTag.val(experimentation_level);
          }
        }
      }

      //If Exp is Try
      if (dieExp_level != 'Try')
      {
        for (var i = 0; i < scopeUI.Try_MOList['items'].length; i++)
        {
          var Aka_FoodsID = $(scopeUI.Try_MOList['items'][i]['elm']).attr('data-id');
          if(Aka_FoodsID == AkaID)
          {
            var AkaTag = $(scopeUI.Try_MOList['items'][i]['elm']).find('.ListFoodName');
            AkaTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
            //Set Select's Exp's
            AkaTag = $(scopeUI.Try_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
            AkaTag.val(experimentation_level);
          }
        }
      }

      //If Exp is No
      if (dieExp_level != 'No')
      {
        for (var i = 0; i < scopeUI.No_MOList['items'].length; i++)
        {
          var Aka_FoodsID = $(scopeUI.No_MOList['items'][i]['elm']).attr('data-id');
          if(Aka_FoodsID == AkaID)
          {
            var AkaTag = $(scopeUI.No_MOList['items'][i]['elm']).find('.ListFoodName');
            AkaTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
            //Set Select's Exp's
            AkaTag = $(scopeUI.No_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
            AkaTag.val(experimentation_level);
          }
        }
      }

      //If Exp is Never
      if (dieExp_level != 'Never')
      {
        for (var i = 0; i < scopeUI.Never_MOList['items'].length; i++)
        {
          var Aka_FoodsID = $(scopeUI.Never_MOList['items'][i]['elm']).attr('data-id');
          if(Aka_FoodsID == AkaID)
          {
            var AkaTag = $(scopeUI.Never_MOList['items'][i]['elm']).find('.ListFoodName');
            AkaTag.attr('class', 'ListFoodName ' + BORDER_CLASSESS[level]);
            //Set Select's Exp's
            AkaTag = $(scopeUI.Never_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
            AkaTag.val(experimentation_level);
          }
        }
      }
    }
  }
  catch (err) {
      // alert(" error in updateBorderMO_List function" + '    ' + err);
      console.log(" error in updateBorderMO_List function in dietlanner-ui.js", err);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////		processAlphbeticalList()			////////////////////////////////
//Requires name and item-code for each food, generates colors and charachteristics using color codes///
//////////////////////////////////////////////////////////////////////////////////////////////////////

function processAlphbeticalList() {


}
function showSliderSettingsModal(){
  try{
    var listContainer = $('#MO_Food_List');
    var FIDs = PRECRIPTION.MOList;
    var MO_Food_List = $('#MO_Food_List');
    MO_Food_List.html('');
    for (x in FIDs) {
        var FID = FIDs[x];
        item = PRECRIPTION.fooditems[FID];
        var codes = item['codes'];
        var color = FONT_COLOR[codes['fontcode']];
        var bak = codes['backcode'];
        //Check If Reaction is set
        if(bak!=0){
            bak = BACKGROUND_COLOR[bak];
            var bor = EXP_CODE_LEVEL[codes['bordercode']];
            var html = '<a href="javascript:;" class="list-group-item food-item" fid="'+FID+'"><span style="padding:5px;color:'+color+';background-color:'+bak+';" class="name">'+item['name']+'</span></a>';
            MO_Food_List.append(html);
            var tempItem = $(MO_Food_List).find('a[fid="'+FID+'"] > span');
            appplyBorder(bor, tempItem);
        }
    }
    var options = {valueNames: ['name']};
    var userList1 = new List('custom-foods', options);
    $('#sliderSettings').modal('show');
  }
    catch (err) {
        // alert(" error in processAlphbeticalList function" + '    ' + err);
        console.log(" error in processAlphbeticalList function in dietlanner-ui.js", err);

      }

}
function applySliderSettings(){
  try{

    $('#sliderSettings').modal('hide');
    //Show Ajax loader
    $('#pleaseWaitModal').modal('show');
    /// Hide From UserPrescribeController $scope.refreshDatatable()

    setTimeout(function(){
      var scope = angular.element("#dietprescriptionapp").scope();

      var modal = $('#sliderSettings');
      var selectedOpt = modal.find('input[name="radio1"]:checked').val();

      //  console.log(selectedOpt);
      if(selectedOpt==1){
          PRECRIPTION.MOList = [];
          PRECRIPTION.formatFoodList(scope.FOOD_ITEM_TABLE);
      }
      else if(selectedOpt==2){
        ///  PRECRIPTION.MOExceptionList = PRECRIPTION.MOList;
          PRECRIPTION.formatFoodList(scope.FOOD_ITEM_TABLE);
      }
      else if(selectedOpt==3){
          var selectedFood = $(modal).find('.food-item[selected="selected"]');
          //MOExceptionList = PRECRIPTION.MOList.slice(0);
          $(selectedFood).each(function() {
              var fid = $( this ).attr( "fid" );
              var index = PRECRIPTION.MOList.indexOf(fid);
              // var index = PRECRIPTION.MOList.indexOf(parseInt(fid));
              //Remove From array
              PRECRIPTION.MOList.splice(index,1);
          });
          // PRECRIPTION.MOExceptionList = MOExceptionList;
          PRECRIPTION.formatFoodList(scope.FOOD_ITEM_TABLE);

      }

      // scope.refreshDatatable();
    }, 1);
  }
    catch (err) {
        // alert(" error in applySliderSettings function" + '    ' + err);
        console.log(" error in applySliderSettings function in dietlanner-ui.js", err);

      }


}
