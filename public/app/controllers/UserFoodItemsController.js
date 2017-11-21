app.controller('FoodItemsController', function($scope, $timeout, $compile, $http, API_URL) {

//Step-wise get data lising
  //(1) retrieve categories listing from API.
  $http.get(API_URL + "category/")
          .success(function(response) {
              $scope.categories = response;

                //(2) retrieve categories listing from API.
                $http.get(API_URL + "diettype/")
                        .success(function(response) {
                            $scope.diettypes = response;

                            //(3) retrieve categories listing from API.
                            $http.get(API_URL + "characteristics/")
                                    .success(function(response) {
                                        $scope.characteristics = response;

                                        //(4) retrieve fooditems listing from API.
                                        $http.get(API_URL + "fooditems")
                                                .success(function(response) {
                                                    $scope.fooditems       = response;
                                                    console.log("$scope.fooditems: ",$scope.fooditems);

                                                    //Hide Ajax Loader
                                                    $('#pleaseWaitModal').modal('hide');

                                                    $timeout(function(){

                                                      $('.food-item').click(function(e){
                                                        ele = $(e.target);
                                                        if(ele[0]['classList'][0]=='name')
                                                        {
                                                          ele = $(ele.closest('.food-item'));
                                                        }
                                                        if(ele.attr('selected')!='selected')
                                                        {
                                                          ele.attr('selected',true);
                                                          ele.css("background-color", "#67809f");
                                                          ele.css("color", "#ffffff");
                                                          $('.selectCount').html(parseInt($('.selectCount').html())+1);
                                                        }else
                                                        {
                                                          ele.attr('selected',false);
                                                          ele.css("background-color", "#ffffff");
                                                          ele.css("color", "#000000");
                                                          $('.selectCount').html(parseInt($('.selectCount').html())-1);
                                                        }
                                                      });

                                                      var options = {valueNames: ['name']};
                                                     // var userList = new List('food-items', options);
  $(".more").shorten({
	"showChars" : 20,
	"moreText"	: "See More",
	"lessText"	: "Less"
});

                                                      //***** Initialize FoodItems DataTable *******//
                                                        $scope.FOOD_Items_TABLE =	$('#table-items-list').DataTable({
                                                          // "iDisplayLength": "All",
                                                          "lengthMenu": [ [20, 50, 75, -1], [20, 50, 75, "All"] ],
                                                          iDisplayLength: -1,
                                                          // rowReorder: true,
                                                          // columnDefs: [
                                                          //     { orderable: true, className: 'reorder', targets: 0 },
                                                          //     // { orderable: true, className: 'reorder', targets: 1 },
                                                          //     // { orderable: true, className: 'reorder', targets: 2 },
                                                          //     { orderable: false, targets: '_all' },
                                                          // ],
                                                          "scrollY": "250px",
                                                          deferRender:    true,
                                                          scroller:       true

                                                        });

                                                        //On re-orderimg event
                                                        $scope.FOOD_Items_TABLE.on( 'row-reorder', function ( e, diff, edit ) {
                                                            $scope.itemOrder = [];
                                                            $scope.fOrder   = {};

                                                            if(diff.length != "")
                                                            {

                                                              for ( var i=0, ien=diff.length ; i<ien ; i++ )
                                                              {

                                                                  var order = {};
                                                                  order['FID']    = diff[i]['node']['attributes']['fid'].value;
                                                                  order['itemOrder'] = diff[i].newData;
                                                                  $scope.itemOrder.push(order);
                                                              }
                                                              $scope.fOrder['order'] = $scope.itemOrder;

                                                              var url = API_URL + "fooditems-reorder";

                                                              //Request for Reordering Records
                                                              $http({
                                                                  method: 'POST',
                                                                  url: url,
                                                                  data: $.param($scope.fOrder),
                                                                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                                              }).success(function(response) {


                                                              }).error(function(response) {

                                                                  alert('This is embarassing. An error has occured. Please check the log for details');
                                                              });
                                                            }
                                                        });

                                                      $scope.modalDietSelect2 = $('#diet-select2').html();
                                                      $scope.modalIngSelect2  = $('#Ing-select2').html();
                                                      $scope.modalCatSelect2  = $('#cat-select2').html();
                                                      $scope.modalAkaSelect2  = $('#akaSelect').html();
                                                      $scope.modalCharSelect2 = $('#char-select2').html();
                                                    }, 0, false);
                                                });
                                    });
                        });
            });

     /////////////////////////////////////////////////////
     ///*******  Food Items Functions  *************///////
    /////////////////////////////////////////////////////
var $amunecheck;
 var $lists;

    //show modal form
    $scope.Toggle = function(modalstate, id) {

      $scope.modalstate = modalstate;
      $scope.fooditem = null;
      $scope.selectedFoodItems =  [];

      //Reset FormRepeater
         $('[data-repeater-list]').empty();
         setTimeout(function(){
           $('[data-repeater-create]').click();
         }, 5);

      //Set checkboxes
        $('#comprehensive-Food').prop('checked', true);
        $('#autoimmuneCheckBox-Food').removeAttr('checked');

      //Set Modal's Fields to empty
        $('.food-item[selected="selected"]').css("background-color", "#ffffff");
        $('.food-item[selected="selected"]').css("color", "#000000");
        $('.food-item[selected="selected"]').attr('selected',false);
        $('.selectCount').html('0');

        // $('#tagsinputValue').tagsinput('removeAll');

        $('#diet-select2').html('');
        $('#cat-select2').html('');
        $('#akaSelect').html('');
        $('#char-select2').html('');
        $('#Ing-select2').html('');
        $('#diet-select2').append($scope.modalDietSelect2);
        $('#cat-select2').append($scope.modalCatSelect2);
        $('#akaSelect').append($scope.modalAkaSelect2);
        $('#char-select2').append($scope.modalCharSelect2);
        $('#Ing-select2').append($scope.modalIngSelect2 );

        // var parsedHml = $.parseHTML( $scope.modalDietSelect2 );
        // console.log("$scope.parsedHml: ",parsedHml);

        //Set DietType Select2
          function formatState (state) {

            var $state = $(
              '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
            );
            return $state;
          };

          $(".selectDietType").select2({
            placeholder: "Select Diet Types",
            templateResult: formatState,
            closeOnSelect: false
          });

        //Set Category Select2
          function formatCat (state) {
            var $state = $(
              '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
            );
            return $state;
          };

          $(".selectCatagory").select2({
            placeholder: "Select Catagory",
            templateResult: formatCat,
            closeOnSelect: false
          });


        //Set AkA Select2
          function formatAka (state) {

            var $state = $(
              '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
            );
            return $state;
          };
          $(".selectAka").select2({
            placeholder: "Select Aka Name",
            templateResult: formatAka,
            closeOnSelect: false
          });
          $('.selectAka').on('select2:select', function(e)
          {
            $scope.AkaIngSelectFn();
          });

          $('.selectAka').on('select2:unselect', function(e)
          {
            var AkaID = e.params.data.id;
            $scope.AkaIngUnSelectFn(AkaID);
          });

        //Set Ingredients Select2
          function formatItems (state) {

            var $state = $(
              '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
            );
            return $state;
          };
          $(".select2-food-items-panel").select2({
            placeholder: "Select Ingredients",
            templateResult: formatItems,
            closeOnSelect: false
          });
          $('.select2-food-items-panel').on('select2:select', function(e)
          {
            $scope.IngredientsSelectionsFn();
          });
          $('.select2-food-items-panel').on('select2:unselect', function(e)
          {
            var IngID = e.params.data.id;
            $scope.IngredientsUnSelectingFn(IngID);
          });

        //Set Characteristics Select2
          function formatChar (state) {

            var $state = $(
              '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
            );
            return $state;
          };
          $(".selectCharacteristic").select2({
            placeholder: "Select Characteristics",
            templateResult: formatChar,
            closeOnSelect: false
          });


        switch (modalstate) {
            case 'add':
                $scope.form_title = "Add Food Item";
                $('#FoodItmsModal').modal('show');
                break;
            case 'edit':
                $scope.form_title = "Edit Food Item";
                $scope.id = id;
                //Show Ajax Loader
                  $('#pleaseWaitModal').modal('show');

                $http.get(API_URL + "fooditems/"+id)
                        .success(function(response) {
                             $scope.fooditem = response;
                             console.log("$scope.fooditem: ",$scope.fooditem);


                             //Hide Ajax Loader
                               $('#pleaseWaitModal').modal('hide');
                               $('#FoodItmsModal').modal('show');

                            //Reset FormRepeater
                               $('[data-repeater-list]').empty();

                            if($scope.fooditem['ImmuneReaction'] == 1)
                            {
                              $('#autoimmuneCheckBox-Food').prop('checked', true);
                            }
                            else {
                              $('#autoimmuneCheckBox-Food').removeAttr('checked');
                            }

                            if($scope.fooditem['Comprehensivelist'] == 1)
                            {
                              $('#comprehensive-Food').prop('checked', true);
                            }
                            else {
                              $('#comprehensive-Food').removeAttr('checked');
                            }
                             //Set Selected Ingrdients
                               if($scope.fooditem['Ingredients'] != null)
                               {
                                 for (var j = 0; j < $scope.fooditem['Ingredients'].length; j++)
                                 {
                                   var idARaw = $scope.fooditem['Ingredients'][j]['IID'];
                                   var FoodId = "IngOpt-"+idARaw;

                                   $("#"+ FoodId +"").attr("selected", "selected");
                                   $scope.SelectFoodsAkaFor_Edit($scope.fooditem['Ingredients'][j]['IID']);
                                 }
                                 $(".select2-food-items-panel").trigger("change.select2");
                               }
                             //Set Ingrdients Countt
                               $('.selectCount').html($scope.fooditem['Ingredients'].length);

                            //  //Set Food Aka Tags
                            //    for (var j = 0; j < $scope.fooditem['FoodAka'].length; j++)
                            //    {
                            //      $scope.fooditem.AkaName = $scope.fooditem['FoodAka'][j].Name;
                            //      $('#tagsinputValue').tagsinput('add', $scope.fooditem.AkaName);
                            //    }

                            for (var i = 0; i < $scope.fooditem['FoodAka'].length; i++)
                            {
                              $('[data-repeater-create]').click();
                              // setTimeout(function(){
                              //   $('[data-repeater-create]').click();
                              // }, 5);
                            }
                            //Set AKA Names
                            var aka = $('#AkaRepeater').find('.AkaDIv');
                            for (var i = 0; i < aka.length; i++)
                            {
                              var akaArr = {};
                              var akaName     = $(aka[i]).find('.AkaName_Class');
                              $(akaName).val($scope.fooditem['FoodAka'][i]['Name']);
                              $(akaName).attr("editing-name",true);
                              $(akaName).attr("id",$scope.fooditem['FoodAka'][i]['id']);
                              //Dnt Add Empty Fields
                              if($scope.fooditem['FoodAka'][i]['Comprehensivelist'] == 1)
                              {
                                var akaInList  = $(aka[i]).find('.AkaCheckBox_Class');
                                $(akaInList).prop('checked', true);
                              }
                            }

                             setTimeout(function(){
                                  //  //Old Set FoodAka Select2
                                  //    for (var j = 0; j < $scope.fooditem['FoodAka'].length; j++)
                                  //    {
                                  //      var idARaw = $scope.fooditem['FoodAka'][j].AkaID;
                                  //      var FoodId = "AkaOpt-"+idARaw;
                                   //
                                  //      $("#"+ FoodId +"").attr("selected", "selected");
                                  //    }
                                  //    $(".selectAka").trigger("change.select2");

                                   //Set Diet Type Select2
                                     for (var j = 0; j < $scope.fooditem['DietTypes'].length; j++)
                                     {
                                       var idDRaw = $scope.fooditem['DietTypes'][j].DTID;
                                       var DietId = "DOpt-"+idDRaw;

                                       $("#"+ DietId +"").attr("selected", "selected");
                                     }
                                     $(".selectDietType").trigger("change.select2");

                                   //Set Category Select2
                                     for (var j = 0; j < $scope.fooditem['Categories'].length; j++)
                                     {
                                       var idCRaw = $scope.fooditem['Categories'][j].CatID;
                                       var CategId = "CatOpt-"+idCRaw;
                                       $("#"+ CategId +"").attr("selected", "selected");
                                     }
                                     $(".selectCatagory").trigger("change");

                                   //Set Characteristics Select2
                                     for (var j = 0; j < $scope.fooditem['Characteristics'].length; j++)
                                     {
                                       var idCharRaw = $scope.fooditem['Characteristics'][j].CharID;
                                       var ChartId = "CharOpt-"+idCharRaw;
                                       $("#"+ ChartId +"").attr("selected", "selected");
                                     }
                                     $(".selectCharacteristic").trigger("change");
                               }, 100);

                        });

                break;
            default:
                break;
        }
    }

    //save new record / update existing record
    $scope.save = function(modalstate, id) {

      //Show Ajax Loader
        $('#pleaseWaitModal').modal('show');

      //Set Selected Items
      //var selectedFoodCount = $('#food-items').find('.food-item[selected="selected"]');
      var  selectedFoodCount= $('.select2-food-items-panel').select2('data');

      $scope.selectedFoodItems = [];
      for (var i = 0; i < selectedFoodCount.length; i++)
      {
        var intID = parseInt(selectedFoodCount[i].id);
        if (intID > 0)
        {
          $scope.selectedFoodItems[i] = intID;
        }
      }

      var foods = {Ingredients:""};
      foods['Ingredients'] = $scope.selectedFoodItems;

      $.extend( $scope.fooditem, foods );

      $scope.selectedDiets = [];
      $scope.selectedAkas  = [];
      $scope.selectedCats  = [];
      $scope.selectedChars = [];

      // var aka = $('.selectAka').select2('data');
      // for (var i = 0; i < aka.length; i++)
      // {
      //   $scope.selectedAkas[i] = aka[i].id;
      // }
      // $scope.fooditem['AkaName'] = $scope.selectedAkas;

      //Set AKA Names
      var aka = $('#AkaRepeater').find('.AkaDIv');
      for (var i = 0; i < aka.length; i++)
      {
        var akaArr = {};
        var akaName     = $(aka[i]).find('.AkaName_Class');
        //Dnt Add Empty Fields
        if($(akaName).val() != "")
        {
          akaArr['akaName'] = $(akaName).val();
          if ($(akaName).attr('editing-name') == 'true')
          {
            akaArr['edit'] = true;
            akaArr['id'] = $(akaName).attr('id');
          }
          else {
            akaArr['edit'] = false;
          }
          var akaInList  = $(aka[i]).find('.AkaCheckBox_Class');
          akaArr['inList'] = $(akaInList).is(':checked')?1:0;
          $scope.selectedAkas.push(akaArr);
        }
      }
      $scope.fooditem['AkaName'] = $scope.selectedAkas;

      var diets = $('.selectDietType').select2('data');
      for (var i = 0; i < diets.length; i++)
      {
        $scope.selectedDiets[i] = diets[i].id;
      }
      $scope.fooditem['DietTypes'] = $scope.selectedDiets;

      var categories = $('.selectCatagory').select2('data');
      for (var i = 0; i < categories.length; i++)
      {
        $scope.selectedCats[i] = categories[i].id;
      }
      $scope.fooditem['Categories'] = $scope.selectedCats;

      var chars = $('.selectCharacteristic').select2('data');
      for (var i = 0; i < chars.length; i++)
      {
        $scope.selectedChars[i] = chars[i].id;
      }
      $scope.fooditem['Characteristics'] = $scope.selectedChars;

      if(typeof $scope.fooditem['Url'] == 'undefined' ||$scope.fooditem['Url'] == "")
      {
        $scope.fooditem['Url'] = "#";
      }
      //Autoimune checkbox
      if ($('#autoimmuneCheckBox-Food').is(':checked')) {
       $scope.fooditem['ImmuneReaction'] = 1;
      }
      else
      {
        $scope.fooditem['ImmuneReaction'] = 0;
      }

      //comprehensive checkbox
      if ($('#comprehensive-Food').is(':checked')) {
        $scope.fooditem['Comprehensivelist'] = 1;
      }
      else
      {
        $scope.fooditem['Comprehensivelist'] = 0;
      }


        var url = API_URL + "fooditems";

        //append staff id to the URL if the form is in edit mode
        if (modalstate === 'edit'){
            url += "/" + id;
            $scope.fooditem['editCase'] = true;
        }
        else {
          $scope.fooditem['editCase'] = false;
        }
        console.log("$scope.fooditem: ",$scope.fooditem);

        //Request for Storing or Updating Record
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.fooditem),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            // console.log(response);
            var fooditemResponse = response;
            console.log("fooditemResponse: ",fooditemResponse);
            //Hide Ajax Loader
              $('#pleaseWaitModal').modal('hide');
            //append the new record
            if(fooditemResponse != "")
            {
              if (modalstate === 'edit')
              {
                  //Update the row
                  var rowId = "FR-"+id;
                  $scope.FOOD_Items_TABLE.row("#"+rowId).remove().draw();

                  var newRow = '<tr id="FR-'+ fooditemResponse['id'] +'">';
                  // newRow    +=    '<td>'+ fooditemResponse['Order'] +'</td>';
                  newRow    +=    '<td>'+ fooditemResponse['Name'] +'</td>';
                  if(fooditemResponse['Categories'] != "" && fooditemResponse['Categories'] != null)
                  {
                    newRow    +=    '<td>';
                    for (var i = 0; i < fooditemResponse['Categories'].length; i++)
                    {
                      newRow    +=    '<span class="label label-sm label-info"> '+ fooditemResponse['Categories'][i]['Name'] +' </span>';
                    }
                    newRow    +=    '</td>';
                  }
                  else
                  {
                    newRow    +=    '<td></td>';
                  }
                  newRow    +=    '<td><div class="more" style="max-width:300px!important; white-space: normal;">';
                  if(fooditemResponse['Ingredients'] != "" && fooditemResponse['Ingredients'] != null)
                  {
                    for (var i = 0; i < fooditemResponse['Ingredients'].length; i++)
                    {
                      newRow    +=    '<span class="ingredients "> '+ fooditemResponse['Ingredients'][i]['Name'] +', </span>';
                    }
                  }
                  newRow    +=    '</div></td>';
                  newRow    +=    '<td>';
                  newRow    +=    '  <a href="javascript:;" ng-click="Toggle(\'edit\', '+ fooditemResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
                  newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ fooditemResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
                  newRow    +=    '</td>';
                  newRow    +='</tr>';

                  var temp = $compile(newRow)($scope);
                  $scope.FOOD_Items_TABLE.row.add($(temp )).draw();

                  $scope.FOOD_Items_TABLE
                                  .order( [ 0, 'asc' ] )
                                  .draw();

                  // Reset
                  $('#akaSelect').html('');
                  $('#Ing-select2').html('');
                  $('#akaSelect').append($scope.modalAkaSelect2);
                  $('#Ing-select2').append($scope.modalIngSelect2 );

                  //Update Foods and its AKA in Ing Select2
                  $('#IngOpt-'+fooditemResponse['id']).text(fooditemResponse['Name']);
                  for (var i = 0; i < fooditemResponse['FoodAka'].length; i++)
                  {
                    $('#IngOpt-Aka-'+fooditemResponse['FoodAka'][i]['id']).text(fooditemResponse['FoodAka'][i]['Name']);
                  }

                  $scope.modalIngSelect2  = $('#Ing-select2').html();
                  $scope.modalAkaSelect2  = $('#akaSelect').html();
                  for (var i = 0; i < $scope.fooditems.length; i++)
                  {
                    if($scope.fooditems[i]['id'] == fooditemResponse['id'])
                    {
                      $scope.fooditems[i] = fooditemResponse;
                      break;
                    }
                  }
              }
              else
              {
                var newRow = '<tr id="FR-'+ fooditemResponse['id'] +'">';
                // newRow    +=    '<td>'+ fooditemResponse['Order'] +'</td>';
                newRow    +=    '<td>'+ fooditemResponse['Name'] +'</td>';
                if(fooditemResponse['Categories'] != "" && fooditemResponse['Categories'] != null)
                {
                  newRow    +=    '<td>';
                  for (var i = 0; i < fooditemResponse['Categories'].length; i++)
                  {
                    newRow    +=    '<span class="label label-sm label-info"> '+ fooditemResponse['Categories'][i]['Name'] +' </span>';
                  }
                  newRow    +=    '</td>';
                }
                else
                {
                  newRow    +=    '<td></td>';
                }
                newRow    +=    '<td><div class="more" style="max-width:300px!important; white-space: normal;">';
                if(fooditemResponse['Ingredients'] != "" && fooditemResponse['Ingredients'] != null)
                {
                  for (var i = 0; i < fooditemResponse['Ingredients'].length; i++)
                  {
                    newRow    +=    '<span class="ingredients "> '+ fooditemResponse['Ingredients'][i]['Name'] +', </span>';
                  }
                }
                newRow    +=    '</div></td>';
                newRow    +=    '<td>';
                newRow    +=    '  <a href="javascript:;" ng-click="Toggle(\'edit\', '+ fooditemResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
                newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ fooditemResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
                newRow    +=    '</td>';
                newRow    +='</tr>';

                var temp = $compile(newRow)($scope);
                $scope.FOOD_Items_TABLE.row.add($(temp )).draw();
                $scope.FOOD_Items_TABLE
                                .order( [ 0, 'asc' ] )
                                .draw();

                // Reset
                $('#akaSelect').html('');
                $('#Ing-select2').html('');
                $('#akaSelect').append($scope.modalAkaSelect2);
                $('#Ing-select2').append($scope.modalIngSelect2 );

                ///Add new options to foods Select2
                var html = '<option id="IngOpt-'+ fooditemResponse['id'] +'" value="'+ fooditemResponse['id'] +'">'+ fooditemResponse['Name'] +'</option>';
                for (var i = 0; i < fooditemResponse['FoodAka'].length; i++)
                {
                  //Add Aka Names to foods Select2
                  html += '<option id="IngOpt-Aka-'+ fooditemResponse['FoodAka'][i]['id'] +'" value="Aka-'+  fooditemResponse['FoodAka'][i]['id'] +'">'+ fooditemResponse['FoodAka'][i]['Name'] +'</option>';
                }
                $('#Ing-select2').append(html);
                $scope.modalIngSelect2  = $('#Ing-select2').html();

                var html2 = '<option id="AkaOpt-'+ fooditemResponse['id'] +'" value="'+ fooditemResponse['id'] +'">'+ fooditemResponse['Name'] +'</option>';
                $('#akaSelect').append(html2);
                $scope.modalAkaSelect2  = $('#akaSelect').html();

                $scope.fooditems.push(fooditemResponse);
                for (var i = 0; i < fooditemResponse['RelatedAkas'].length; i++)
                {
                  $scope.fooditems.push(fooditemResponse['RelatedAkas'][i]);
                }
              }
            }

        }).error(function(response) {

            //Hide Ajax Loader
              $('#pleaseWaitModal').modal('hide');
            alert('This is embarassing. An error has occured. Please check the log for details');
        });

         $('#FoodItmsModal').modal('hide');
    }

    //delete record
    $scope.confirmDelete = function(id) {

        var isConfirmDelete = confirm('Are you sure you want this record?');
        if (isConfirmDelete)
        {
            $http({
                method: 'DELETE',
                url: API_URL + 'fooditems/' + id
            }).
                    success(function(data) {

                        //Remove the row
                        var rowId = "FR-"+id;
                        $scope.FOOD_Items_TABLE.row("#"+rowId).remove().draw();
                    }).
                    error(function(data) {

                        alert('Unable to delete');
                    });
        } else {
            return false;
        }
    }

    /////////////////////////////////////////////////////////////////////////
    ///*******  Select foodItems Related to Aka Functions  (select2) **/////
   ////////////////////////////////////////////////////////////////////////
    $scope.AkaIngSelectFn = function() {
          //** Set SubDiet Types

      var akas = $('.selectAka').select2('data');

      for (var j = 0; j < akas.length; j++)
      {
       for (var k = 0; k < $scope.fooditems.length; k++)
        {
          if(akas[j].id== $scope.fooditems[k].id)
          {
            //Set Auto-immune if its true
            if($scope.fooditems[k]['ImmuneReaction'] == 1)
            {
              $('#autoimmuneCheckBox-Food').prop('checked', true);
            }
            //Select Ingredients
            if($scope.fooditems[k]['Ingredients'] != null)
            {
              for (var l = 0; l < $scope.fooditems[k]['Ingredients'].length; l++)
              {
                var idFRaw =$scope.fooditems[k]['Ingredients'][l]['IID'];
                var IngId = "IngOpt-"+idFRaw;
                $("#"+ IngId +"")[0].selected = true;
                for (var z = 0; z < $scope.fooditems.length; z++)
                {
                  if(idFRaw == $scope.fooditems[z].id)
                  {
                    //Set Auto-immune if its true
                    if($scope.fooditems[z]['ImmuneReaction'] == 1)
                    {
                      console.log("$scope.fooditems[z]:", $scope.fooditems[z]['ImmuneReaction']);
                      $('#autoimmuneCheckBox-Food').prop('checked', true);
                      // break;
                    }
                  }
                }
              }
              $(".select2-food-items-panel").trigger("change.select2");
            }

          }
        }
      }
      //select categories WRt to AKA
      for (var j = 0; j < akas.length; j++)
      {
       for (var k = 0; k < $scope.fooditems.length; k++)
        {
          if(akas[j].id== $scope.fooditems[k].id)
          {
            if($scope.fooditems[k]['Categories'] != null)
            {

              for (var l = 0; l < $scope.fooditems[k]['Categories'].length; l++)
              {
                var idCRaw =$scope.fooditems[k]['Categories'][l]['CatID'];
                var CatId = "CatOpt-"+idCRaw;
                $("#"+ CatId +"")[0].selected = true;

              }
              $(".selectCatagory").trigger("change.select2");
            }

          }
        }
      }

      //select Characteristics WRt to AKA
      for (var j = 0; j < akas.length; j++)
      {
       for (var k = 0; k < $scope.fooditems.length; k++)
        {
          if(akas[j].id== $scope.fooditems[k].id)
          {
            if($scope.fooditems[k]['Characteristics'] != null)
            {

              for (var l = 0; l < $scope.fooditems[k]['Characteristics'].length; l++)
              {
                var idCRaw =$scope.fooditems[k]['Characteristics'][l]['CharID'];
                var CharId = "CharOpt-"+idCRaw;
                $("#"+ CharId +"")[0].selected = true;

              }
              $(".selectCharacteristic").trigger("change.select2");
            }

          }
        }
      }

      //select Characteristics WRt to Diet type
      for (var j = 0; j < akas.length; j++)
      {
       for (var k = 0; k < $scope.fooditems.length; k++)
        {
          if(akas[j].id== $scope.fooditems[k].id)
          {
            if($scope.fooditems[k]['DietTypes'] != null)
            {

              for (var l = 0; l < $scope.fooditems[k]['DietTypes'].length; l++)
              {
                var idDRaw =$scope.fooditems[k]['DietTypes'][l]['DTID'];
                var DId = "DOpt-"+idDRaw;
                $("#"+ DId +"")[0].selected = true;

              }
              $(".selectDietType").trigger("change.select2");
            }

          }
        }
      }
      //end function
    }

    /////////////////////////////////////////////////////////
    ///*******  unSelect foodItems Functions  (select2) **/////
    /////////////////////////////////////////////////////////
    $scope.AkaIngUnSelectFn = function(id) {
      //$('#item-select2').html('');
      //$('#item-select2').append($scope.modalitemSelect2);
      //var akas = $('.selectAka').select2('data');


      for (var k = 0; k < $scope.fooditems.length; k++)
      {
        if(id == $scope.fooditems[k].id)
        {

          if($scope.fooditems[k]['Ingredients'] != null)
          {

            for (var l = 0; l < $scope.fooditems[k]['Ingredients'].length; l++)
            {
              //  var selectedID = '#food-'+$scope.diettypes[k]['FoodItems'][l]['FID'];
              var idDRaw =$scope.fooditems[k]['Ingredients'][l]['IID'];
              var IngId = "IngOpt-"+idDRaw;

              $("#"+ IngId +"").attr("selected",  false);
            }
            $(".select2-food-items-panel").trigger("change.select2");
          }


        }
      }

      //unselect category
      for (var k = 0; k < $scope.fooditems.length; k++)
      {
        if(id == $scope.fooditems[k].id)
        {

          if($scope.fooditems[k]['Categories'] != null)
          {

            for (var l = 0; l < $scope.fooditems[k]['Categories'].length; l++)
            {
              //  var selectedID = '#food-'+$scope.diettypes[k]['FoodItems'][l]['FID'];
              var idCRaw =$scope.fooditems[k]['Categories'][l]['CatID'];
              var CatId = "CatOpt-"+idCRaw;

              $("#"+ CatId +"").attr("selected",  false);
            }
            $(".selectCatagory").trigger("change.select2");
          }


        }
      }

      //unselect Characteristics
      for (var k = 0; k < $scope.fooditems.length; k++)
      {
        if(id == $scope.fooditems[k].id)
        {

          if($scope.fooditems[k]['Characteristics'] != null)
          {

            for (var l = 0; l < $scope.fooditems[k]['Characteristics'].length; l++)
            {
              //  var selectedID = '#food-'+$scope.diettypes[k]['FoodItems'][l]['FID'];
              var idCharRaw =$scope.fooditems[k]['Characteristics'][l]['CharID'];
              var CharId = "CharOpt-"+idCharRaw;

              $("#"+ CharId +"").attr("selected",  false);
            }
            $(".selectCharacteristic").trigger("change.select2");
          }


        }
      }

      //unselect Diet type
      for (var k = 0; k < $scope.fooditems.length; k++)
      {
        if(id == $scope.fooditems[k].id)
        {

          if($scope.fooditems[k]['DietTypes'] != null)
          {

            for (var l = 0; l < $scope.fooditems[k]['DietTypes'].length; l++)
            {
              //  var selectedID = '#food-'+$scope.diettypes[k]['FoodItems'][l]['FID'];
              var idDRaw =$scope.fooditems[k]['DietTypes'][l]['DTID'];
              var DId = "DOpt-"+idDRaw;

              $("#"+ DId +"").attr("selected",  false);
            }
            $(".selectDietType").trigger("change.select2");
          }


        }
      }
      //Set For Selected Ones
      $scope.AkaIngSelectFn();
    }

    /////////////////////////////////////////////////////////////////////////
    ///*******  Select Ing Diets, Cats & Chars  Functions  (select2) **/////
   ////////////////////////////////////////////////////////////////////////
    $scope.IngredientsSelectionsFn = function() {
          //** Set SubDiet Types

      var Ings = $('.select2-food-items-panel').select2('data');

      for (var j = 0; j < Ings.length; j++)
      {
       for (var k = 0; k < $scope.fooditems.length; k++)
        {
          if(Ings[j].id== $scope.fooditems[k].id)
          {
            //Set Auto-immune if its true
              if($scope.fooditems[k]['ImmuneReaction'] == 1)
              {
                $('#autoimmuneCheckBox-Food').prop('checked', true);
              }

            //Set Akas in FoodItems Selection
              if($scope.fooditems[k]['AkaItem'] == true)
              {
                var AkaIDRaw =$scope.fooditems[k]['FID'];
                var AkaFoodId = "IngOpt-"+ AkaIDRaw;
                $("#"+ AkaFoodId +"")[0].selected = true;
                $(".select2-food-items-panel").trigger("change.select2");
              }
              if($scope.fooditems[k]['FoodAka'] != null)
              {
                for (var l = 0; l < $scope.fooditems[k]['FoodAka'].length; l++)
                {
                  var AkaIDRaw =$scope.fooditems[k]['FoodAka'][l]['id'];
                  var AkaFoodId = "IngOpt-Aka-"+ AkaIDRaw;
                  $("#"+ AkaFoodId +"")[0].selected = true;
                }
                $(".select2-food-items-panel").trigger("change.select2");
              }

            //Set DietTypes
              if($scope.fooditems[k]['DietTypes'] != null)
              {

                for (var l = 0; l < $scope.fooditems[k]['DietTypes'].length; l++)
                {
                  var idDRaw =$scope.fooditems[k]['DietTypes'][l]['DTID'];
                  var DId = "DOpt-"+idDRaw;
                  $("#"+ DId +"")[0].selected = true;
                }
                $(".selectDietType").trigger("change.select2");
              }

            //Set Categoreies
              if($scope.fooditems[k]['Categories'] != null)
              {
                for (var l = 0; l < $scope.fooditems[k]['Categories'].length; l++)
                {
                  var idCRaw =$scope.fooditems[k]['Categories'][l]['CatID'];
                  var CatId = "CatOpt-"+idCRaw;
                  $("#"+ CatId +"")[0].selected = true;
                }
                $(".selectCatagory").trigger("change.select2");
              }

            //Set Characteristics
              if($scope.fooditems[k]['Characteristics'] != null)
              {
                for (var l = 0; l < $scope.fooditems[k]['Characteristics'].length; l++)
                {
                  var idCRaw =$scope.fooditems[k]['Characteristics'][l]['CharID'];
                  var CharId = "CharOpt-"+idCRaw;
                  $("#"+ CharId +"")[0].selected = true;
                }
                $(".selectCharacteristic").trigger("change.select2");
              }

          }
        }
      }
      //end function
    }

    ////////////////////////////////////////////////////////////////////////////////////
    ///*******  unSelect Ingredients (Diets, Cats & Chars) Functions  (select2) **/////
    //////////////////////////////////////////////////////////////////////////////////
    $scope.IngredientsUnSelectingFn = function(id) {

      //unselect category
      for (var k = 0; k < $scope.fooditems.length; k++)
      {
          if(id == $scope.fooditems[k].id)
          {
            //unSelect Ingredients
            if($scope.fooditems[k]['AkaItem'] == true)
            {
              var AkaIDRaw =$scope.fooditems[k]['FID'];
              var AkaFoodId = "IngOpt-"+ AkaIDRaw;
              $("#"+ AkaFoodId +"")[0].selected = false;
              $(".select2-food-items-panel").trigger("change.select2");
            }
            if($scope.fooditems[k]['FoodAka'] != null)
            {
              for (var l = 0; l < $scope.fooditems[k]['FoodAka'].length; l++)
              {
                var AkaIDRaw =$scope.fooditems[k]['FoodAka'][l]['id'];
                var AkaFoodId = "IngOpt-Aka-"+ AkaIDRaw;
                $("#"+ AkaFoodId +"")[0].selected = false;
              }
              $(".select2-food-items-panel").trigger("change.select2");
            }
        //  //unSelect DietTypes
        //   if($scope.fooditems[k]['DietTypes'] != null)
        //   {
        //     for (var l = 0; l < $scope.fooditems[k]['DietTypes'].length; l++)
        //     {
        //       var idDRaw =$scope.fooditems[k]['DietTypes'][l]['DTID'];
        //       var DId = "DOpt-"+idDRaw;
        //       $("#"+ DId +"").attr("selected",  false);
        //     }
        //     $(".selectDietType").trigger("change.select2");
        //   }
        //
        //  //unSelect Categories
        //   if($scope.fooditems[k]['Categories'] != null)
        //   {
        //
        //     for (var l = 0; l < $scope.fooditems[k]['Categories'].length; l++)
        //     {
        //       var idCRaw =$scope.fooditems[k]['Categories'][l]['CatID'];
        //       var CatId = "CatOpt-"+idCRaw;
        //       $("#"+ CatId +"").attr("selected",  false);
        //     }
        //     $(".selectCatagory").trigger("change.select2");
        //   }
        //
        // //unSelect Characteristics
        //   if($scope.fooditems[k]['Characteristics'] != null)
        //   {
        //
        //     for (var l = 0; l < $scope.fooditems[k]['Characteristics'].length; l++)
        //     {
        //       //  var selectedID = '#food-'+$scope.diettypes[k]['FoodItems'][l]['FID'];
        //       var idCharRaw =$scope.fooditems[k]['Characteristics'][l]['CharID'];
        //       var CharId = "CharOpt-"+idCharRaw;
        //
        //       $("#"+ CharId +"").attr("selected",  false);
        //     }
        //     $(".selectCharacteristic").trigger("change.select2");
        //   }
        }
      }

      // //Set For Selected Ones
      // $scope.IngredientsSelectionsFn();
    }

    //Selection For Editing FoodItem
    $scope.SelectFoodsAkaFor_Edit = function(id) {

      //unselect category
      for (var k = 0; k < $scope.fooditems.length; k++)
      {
          if(id == $scope.fooditems[k].id)
          {
            //Select
            if($scope.fooditems[k]['FoodAka'] != null)
            {
              for (var l = 0; l < $scope.fooditems[k]['FoodAka'].length; l++)
              {
                var AkaIDRaw =$scope.fooditems[k]['FoodAka'][l]['id'];
                var AkaFoodId = "IngOpt-Aka-"+ AkaIDRaw;
                $("#"+ AkaFoodId +"")[0].selected = true;
              }
              // $(".select2-food-items-panel").trigger("change.select2");
            }
        }
      }
    }
/** End of Controller **/
});
