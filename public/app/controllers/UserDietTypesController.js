var foodSelectCheck = 0;
app.controller('DietypeController', function($scope, $timeout, $compile, $http, API_URL) {

  //retrieve fooditems listing from API.
  $http.get(API_URL + "fooditems/")
  .success(function(response) {
    $scope.fooditems       = response;
    $timeout(function(){
      $scope.modalitemSelect2 = $('#item-select').html();
    }, 0, false);

    //retrieve categories listing from API.
    $http.get(API_URL + "category/")
    .success(function(response) {
      $scope.categories = response;

      $timeout(function(){
        $scope.modalCatSelect2  = $('#cat-select2').html();
      }, 0, false);
    });

    //(1) retrieve categories listing from API.
    $http.get(API_URL + "characteristics/")
    .success(function(response) {
      $scope.characteristics = response;
      $timeout(function(){
        $scope.modalCharSelect2 = $('#char-select2').html();
      }, 0, false);

      //(2) retrieve diettypes listing from API.
      $http.get(API_URL + "diettype/")
      .success(function(response) {
        $scope.diettypes = response;
        console.log('$scope.diettypes my my: ',$scope.diettypes);


        //Hide Ajax Loader
        $('#pleaseWaitModal').modal('hide');
        $timeout(function(){
          $scope.modalDietSelect2 = $('#dietselect2').html();
          $scope.Diet_TABLE =	$('#table-diet-list').DataTable({
            "lengthMenu": [ [20, 50, 75, -1], [20, 50, 75, "All"] ],
            "scrollY" : "250px"
          });

        }, 0, false);

      });
    });

    $timeout(function(){

      //FoodItems Selection
      function selectItem(ele)
      {
        ele.attr('selected',true);
        ele.css("background-color", "#67809f");
        ele.css("color", "#ffffff");
        counter = $(ele).closest('.panel').find('.selectCount');
        counter.html(parseInt(counter.html())+1);
      }
      function unselectItem(ele)
      {
        ele.attr('selected',false);
        ele.css("background-color", "#ffffff");
        ele.css("color", "#000000");
        counter = $(ele).closest('.panel').find('.selectCount');
        counter.html(parseInt(counter.html())-1);
      }

      function toggle(ele)
      {

        if(ele[0]['classList'][0]=='name')
        {
          ele = $(ele.closest('.food-item'));
        }

        if(ele.attr('selected')!='selected')
        {
          selectItem(ele);
        }else
        {
          unselectItem(ele);
        }
      }
      $('#DietTypeModal').on('click', '.food-item', function(e) {
        toggle($(e.target));
      });

      //     var options = {valueNames: ['name']};
      //        var userList = new List('food-items', options);
    }, 0, false);
  });

  /////////////////////////////////////////////////////
  ///*******  Diet Types Curd Functions  ********/////
  /////////////////////////////////////////////////////

  //show modal form
  $scope.Toggle = function(modalstate, id) {
    //Set Diet Modal

    $scope.modalstate        = modalstate;
    $scope.DietType.Name     = null;
    $scope.selectedFoodItems =  [];

    $('.food-item[selected="selected"]').css("background-color", "#ffffff");
    $('.food-item[selected="selected"]').css("color", "#000000");
    $('.food-item[selected="selected"]').attr('selected',false);
    $('.selectCount').html('0');

    $('#dietselect2').html('');
    $('#cat-select2').html('');
    $('#char-select2').html('');
    $('#item-select ').html('');
    $('#item-select').append($scope.modalitemSelect2);

    $('#dietselect2').append($scope.modalDietSelect2);
    $('#cat-select2').append($scope.modalCatSelect2);
    $('#char-select2').append($scope.modalCharSelect2);


    function formatType (state) {

      var $state = $(
        '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
      );
      return $state;
    };

    $(".selectDietType").select2({
      placeholder: "Select Diet Types",
      templateResult: formatType,
      closeOnSelect: false
    });

    function formatCat (state) {

      var $state = $(
        '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
      );
      return $state;
    };

    $(".selectCatagory").select2({
      placeholder: "Select Category",
      templateResult: formatCat,
      closeOnSelect: false
    });


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


    function formatItems (state) {

      var $state = $(
        '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
      );
      return $state;

    };
    $(".select2-diet-types-panel").select2({
      placeholder: "Search Food Items",
      templateResult: formatItems,
      closeOnSelect: false,

    });
    $(".clear-all").click(function(){
      $(".select2-diet-types-panel").select2('val', 'All');
    });

    $("select").on("select2:unselect", function (evt) {
      if (!evt.params.originalEvent) {
        return;
      }

      evt.params.originalEvent.stopPropagation();
    });
    // ** Select Function of diet Types Select2's
    $('.selectDietType').on('select2:select', function(e)
    {
      var DietID = e.params.data.id;
      var selectorID = "DOpt-" + DietID;
      $("#"+ selectorID +"")[0].selected = true;
      $scope.SelectedSubDietsArr = [];
      //$scope.SelectedSubDietsArr.push(DietID);
      $scope.slectSubdiets(DietID);
      $(".selectDietType").trigger("change.select2");
    });

    $('.selectCatagory').on('select2:select', function(e)
    {
      var CatID = e.params.data.id;
      $scope.DietSelectFn();
      $scope.FoodsAKASelectionsFn();
    });

    $('.selectCharacteristic').on('select2:select', function(e)
    {
      var CharID = e.params.data.id;
      $scope.DietSelectFn();
      $scope.FoodsAKASelectionsFn();
    });

    $('#item-select').on('select2:select', function(e)
    {
      $scope.FoodsAKASelectionsFn();
    });


    //** UnSelect Function of diet Types Select2's
    // $('.selectDietType').on('select2:unselect', function(e)
    // {
    //   var dietID = e.params.data.id;
    //
    //   $scope.DietunSelectFn(dietID , "Diet");
    // });

    $('.selectCatagory').on('select2:unselect', function(e)
    {
      var catID = e.params.data.id;
      $scope.DietunSelectFn(catID , "Cat");
    });

    $('.selectCharacteristic').on('select2:unselect', function(e)
    {
      var charID = e.params.data.id;
      $scope.DietunSelectFn(charID, "Char");
    });

    $('#item-select').on('select2:unselect', function(e)
    {
      var IngID = e.params.data.id;
      $scope.FoodsAKAUnSelectingFn(IngID);
    });


    switch (modalstate) {
      case 'add':
      $scope.form_title = "Add New Diet Type";
      $('#DietTypeModal').modal('toggle');
      break;
      case 'edit':
      $scope.form_title = "Edit Diet Type";
      $scope.id = id;
      //Show Ajax Loader
      $('#pleaseWaitModal').modal('show');

      $http.get(API_URL + "diettype/"+id)
      .success(function(response) {
        $scope.DietType = response;
        console.log("open edit model response: ",response);

        //Hide Ajax Loader
        $('#pleaseWaitModal').modal('hide');
        //Show Diet Modal
        $('#DietTypeModal').modal('toggle');

        if($scope.DietType.Type == 'Exclusion' || $scope.DietType.Type == "")
        {
          $scope.DietType.Type = 'Exclusion';
          //Set Selected FoodItems
          console.log("$scope.DietType['FoodItems'] ",$scope.DietType['FoodItems']);
          if($scope.DietType['FoodItems'] != null)
          {
            for (var j = 0; j < $scope.DietType['FoodItems'].length; j++)
            {
              var idDRaw = $scope.DietType['FoodItems'][j].FID;
              var DietId = "item-"+idDRaw;

              $("#"+ DietId +"").attr("selected", "selected");
              $scope.SelectFoodsAkaFor_Edit($scope.DietType['FoodItems'][j].FID);
            }
            $(".select2-diet-types-panel").trigger("change.select2");
          }
          $('.selectCount').html($scope.DietType['FoodItems'].length);
        }
        else if ($scope.DietType.Type == 'Inclusion')
        {
          //Set Selected FoodItems For Inclusion DietType
          var countIncluded = 0;
          if($scope.DietType['FoodItems'] != null)
          {
            var incFoodlist    = [];
            var incFoodlistRaw = [];
            for (var j = 0; j < $scope.fooditems.length; j++)
            {
              incFoodlistRaw[j] = $scope.fooditems[j].id;
            }
            //Sort Out the Included fooditems
            for (var j = 0; j < incFoodlistRaw.length; j++)
            {
              for (var k = 0; k < $scope.DietType['FoodItems'].length; k++)
              {
                if(incFoodlistRaw[j] == $scope.DietType['FoodItems'][k].FID)
                {
                  incFoodlistRaw[j] = "";

                }
              }
            }

            for (var j = 0; j < incFoodlistRaw.length; j++)
            {
              if(incFoodlistRaw[j] != "")
              {
                // var selectedID = '#food-'+incFoodlistRaw[j];
                var idDRaw =incFoodlistRaw[j];
                var DietId = "item-"+idDRaw;

                $("#"+ DietId +"").attr("selected", "selected");


                countIncluded++;
              }
              $(".select2-diet-types-panel").trigger("change.select2");
            }
          }
          //Set Ingrdients Countt
          $('.selectCount').html(countIncluded);
        }

        setTimeout(function(){
          //Set Sub Diet Type Select2
          for (var j = 0; j < $scope.DietType['SubType'].length; j++)
          {
            var idDRaw = $scope.DietType['SubType'][j].DTIDC;
            var DietId = "DOpt-"+idDRaw;

            $("#"+ DietId +"").attr("selected", "selected");
          }
          $(".selectDietType").trigger("change.select2");

          //Set Category Select2
          for (var j = 0; j < $scope.DietType['Categories'].length; j++)
          {
            var idCRaw = $scope.DietType['Categories'][j].CatID;
            var CategId = "CatOpt-"+idCRaw;
            $("#"+ CategId +"").attr("selected", "selected");
          }
          $(".selectCatagory").trigger("change");

          //Set Characteristics Select2
          for (var j = 0; j < $scope.DietType['Characteristics'].length; j++)
          {
            var idCharRaw = $scope.DietType['Characteristics'][j].CharID;
            var ChartId = "CharOpt-"+idCharRaw;
            $("#"+ ChartId +"").attr("selected", "selected");
          }
          $(".selectCharacteristic").trigger("change");
          // $scope.DietSelectFn();
          //    $scope.  DietunSelectFn();
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

    $scope.selectedCats     = [];
    $scope.selectedChars    = [];
    $scope.selectedSubDiets = [];






    //** Set SubDiet Types
    var diets = $('.selectDietType').select2('data');
    //console.log('diets: ',diets);
    for (var i = 0; i < diets.length; i++)
    {
      $scope.selectedSubDiets[i] = diets[i].id;
    }
    //console.log("$scope.selectedSubDiets: ",$scope.selectedSubDiets);

    $scope.DietType['SubType'] = $scope.selectedSubDiets;

    //   console.log("$scope.selectedSubDiets",$scope.selectedSubDiets);

    var foods = {FoodItems:""};

    //Set Selected Items
    var selectedFoodCount =$('.select2-diet-types-panel').select2('data');
    console.log("selectedFoodCount: ",selectedFoodCount);
    //Remove AKA ID's
    var NewFoods = [];
    var k        = 0;
    for (var i = 0; i < selectedFoodCount.length; i++)
    {
      var intID = parseInt(selectedFoodCount[i].id);
      if (intID > 0)
      {
        NewFoods[k] = intID;
        k++;
      }
    }
    selectedFoodCount = [];
    selectedFoodCount = NewFoods;
    // console.log("NewFoods: ",NewFoods);
    // console.log("selectedFoodCount: ",selectedFoodCount);

    //console.log("selectedFoodCount: ", selectedFoodCount);
    $scope.selectedFoodItems = [];
    for (var i = 0; i < selectedFoodCount.length; i++)
    {
      for (var j = 0; j < $scope.selectedSubDiets.length; j++)
      {
        var DietID = $scope.selectedSubDiets[j];
        for (var k = 0; k < $scope.diettypes.length; k++)
        {
          //console.log("$scope.diettypes[k]['id']: out if ", $scope.diettypes[k]['id']);
          if($scope.diettypes[k]['id'] == DietID)
          {
            // console.log("$scope.diettypes[k]['id']:  ", $scope.diettypes[k]);
            for (var l = 0; l < $scope.diettypes[k]['FoodItems'].length; l++)
            {

              var foodID = $scope.diettypes[k]['FoodItems'][l]['FID'];
              // console.log("foodID: ", foodID);
              // console.log('selectedFoodCount[i] comp: ',selectedFoodCount[i]);
              if(foodID == selectedFoodCount[i])
              {
                // console.log('Nulled: ',selectedFoodCount[i]);
                selectedFoodCount[i] = null;
                // console.log('selectedFoodCount[i] comp: ',selectedFoodCount[i]);
              }
            }
          }
        }

      }
      // $scope.selectedFoodItems[i] = selectedFoodCount[i].id;

    }
    //   console.log("selectedFoodCount:" ,selectedFoodCount);
    var temp = 0;
    for (var i = 0; i < selectedFoodCount.length; i++)
    {
      //   console.log("selectedFoodCount["+ i +"].id:" ,selectedFoodCount[i].id);
      if (selectedFoodCount[i] != null)
      {
        $scope.selectedFoodItems[temp] = selectedFoodCount[i];
        //   console.log("$scope.selectedFoodItems["+ temp +"] for save in loop and if:" ,$scope.selectedFoodItems[temp]);
        temp++;
        // console.log("$scope.selectedFoodItems["+ temp +"] for save in loop and if:" ,$scope.selectedFoodItems[temp]);
      }
    }
    console.log("$scope.selectedFoodItems: ",$scope.selectedFoodItems);
    //    console.log("$scope.selectedFoodItems[temp]for save  out of loop and if:" ,$scope.selectedFoodItems);


    //Sort for Inclusion Diet Type
    if($scope.DietType['Type'] === 'Inclusion')
    {
      var foodlist    = [];
      var foodlistRaw = [];
      for (var i = 0; i < $scope.fooditems.length; i++)
      {
        foodlistRaw[i] = $scope.fooditems[i].id;
      }
      //Sort Out the Included fooditems
      for (var i = 0; i < foodlistRaw.length; i++)
      {
        if($scope.selectedFoodItems != null)
        {
          for (var j = 0; j < $scope.selectedFoodItems.length; j++)
          {
            if(foodlistRaw[i] == $scope.selectedFoodItems[j])
            {
              foodlistRaw[i] = "";
            }
          }
        }
      }
      var j = 0;
      for (var i = 0; i < foodlistRaw.length; i++)
      {
        if(foodlistRaw[i] != "")
        {
          foodlist[j] = foodlistRaw[i];
          j++;
        }
      }
      foods['FoodItems'] = foodlist;
    }
    else
    {
      foods['FoodItems'] = $scope.selectedFoodItems;
    }

    //Add Final FoodList to DietType FoodItems
    $.extend( $scope.DietType, foods );

    //Add Categories to DietType
    var categories = $('.selectCatagory').select2('data');
    for (var i = 0; i < categories.length; i++)
    {
      $scope.selectedCats[i] = categories[i].id;
    }
    $scope.DietType['Categories'] = $scope.selectedCats;

    //Add Characteristics to DietType
    var chars = $('.selectCharacteristic').select2('data');
    for (var i = 0; i < chars.length; i++)
    {
      $scope.selectedChars[i] = chars[i].id;
    }
    $scope.DietType['Characteristics'] = $scope.selectedChars;


    console.log("$scope.DietType: ",$scope.DietType);

    var url = API_URL + "diettype";

    //append staff id to the URL if the form is in edit mode
    if (modalstate === 'edit'){
      url += "/" + id;
    }
    //
    //Request for Storing or Updating Record
    $http({
      method: 'POST',
      url: url,
      data: $.param($scope.DietType),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(response) {

      var DietTypeResponse = response;

      //Hide Ajax Loader
      $('#pleaseWaitModal').modal('hide');
      //append the new record
      if(DietTypeResponse != "")
      {
        if (modalstate === 'edit')
        {
          var comArr = eval( $scope.diettypes );
          for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].id === id )
            {
              $scope.diettypes[i].Categories         = DietTypeResponse['Categories'];
              $scope.diettypes[i].Characteristics    = DietTypeResponse['Characteristics'];
              $scope.diettypes[i].FoodItems          = DietTypeResponse['FoodItems'];
              $scope.diettypes[i].Name               = DietTypeResponse['Name'];
              $scope.diettypes[i].SubType            = DietTypeResponse['SubType'];
              $scope.diettypes[i].Type               = DietTypeResponse['Type'];
              $scope.diettypes[i].id                 = DietTypeResponse['id'];
              break;
            }
          }
          //Update the row
          var rowId = "DR-"+id;
          $scope.Diet_TABLE.row("#"+rowId).remove().draw();

          var newRow = '<tr id="DR-'+ DietTypeResponse['id'] +'">';
          newRow    +=    '<td>'+ DietTypeResponse['Name'] +'</td>';
          // newRow    +=    '<td>'+ DietTypeResponse['Type'] +'</td>';
          newRow    +=    '<td>';
          newRow    +=    '  <a href="javascript:;" ng-click="Toggle(\'edit\', '+ DietTypeResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
          newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ DietTypeResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
          newRow    +=    '</td>';
          newRow    +='</tr>';

          var temp = $compile(newRow)($scope);
          $scope.Diet_TABLE.row.add($(temp )).draw();

          $('#dietselect2').html('');
          $('#dietselect2').append($scope.modalDietSelect2);

          $('#DOpt-'+DietTypeResponse['id']).text(DietTypeResponse['Name']);
          $scope.modalDietSelect2 = $('#dietselect2').html();
        }
        else
        {
          $scope.diettypes.push({ 'Categories':DietTypeResponse['Categories'], 'Characteristics': DietTypeResponse['Characteristics'], 'FoodItems':DietTypeResponse['FoodItems'],
          'Name':DietTypeResponse['Name'], 'SubType':DietTypeResponse['SubType'], 'Type':DietTypeResponse['Type'], 'id':DietTypeResponse['id']  });
          console.log("$scope.diettypes: ",$scope.diettypes);

          var newRow = '<tr id="DR-'+ DietTypeResponse['id'] +'">';
          newRow    +=    '<td>'+ DietTypeResponse['Name'] +'</td>';
          // newRow    +=    '<td>'+ DietTypeResponse['Type'] +'</td>';
          newRow    +=    '<td>';
          newRow    +=    '  <a href="javascript:;" ng-click="Toggle(\'edit\', '+ DietTypeResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
          newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ DietTypeResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
          newRow    +=    '</td>';
          newRow    +='</tr>';

          var temp = $compile(newRow)($scope);
          $scope.Diet_TABLE.row.add($(temp )).draw();

          $('#dietselect2').html('');
          $('#dietselect2').append($scope.modalDietSelect2);
          ///Add new options to foods Select2
          var html = '<option class="diet-selection" id="DOpt-'+ DietTypeResponse['id'] +'" value="'+ DietTypeResponse['id'] +'">'+ DietTypeResponse['Name'] +'</option>';
          $('#dietselect2').append(html);
          $scope.modalDietSelect2 = $('#dietselect2').html();
        }
      }

    }).error(function(response) {

      //Hide Ajax Loader
      $('#pleaseWaitModal').modal('hide');

      alert('This is embarassing. An error has occured. Please check the log for details');
    });


    $('#DietTypeModal').modal('hide');

  }

  //delete record
  $scope.confirmDelete = function(id) {

    var isConfirmDelete = confirm('Are you sure you want this record?');
    if (isConfirmDelete)
    {
      $http({
        method: 'DELETE',
        url: API_URL + 'diettype/' + id
      }).
      success(function(data) {

        var rowId = "DR-"+id;
        $scope.Diet_TABLE.row("#"+rowId).remove().draw();
      }).
      error(function(data) {

        alert('Unable to delete');
      });

    } else {
      return false;
    }
  }


  /////////////////////////////////////////////////////////
  ///*******  Select foodItems Functions  (select2) **/////
  /////////////////////////////////////////////////////////
  $scope.DietSelectFn = function() {
    //** Set SubDiet Types


    //       var diets = $('.selectDietType').select2('data');
    //
    // for (var j = 0; j < diets.length; j++)
    //       {
    //            for (var k = 0; k < $scope.diettypes.length; k++)
    //         {
    //           if(diets[j].id== $scope.diettypes[k].id)
    //           {
    //             if($scope.diettypes[k]['FoodItems'] != null)
    //             {
    //
    //               for (var l = 0; l < $scope.diettypes[k]['FoodItems'].length; l++)
    //               {
    //               //  var selectedID = '#food-'+$scope.diettypes[k]['FoodItems'][l]['FID'];
    //                 var idDRaw =$scope.diettypes[k]['FoodItems'][l]['FID'];
    //                                        var DietId = "item-"+idDRaw;
    //
    //                                        //$("#"+ DietId +"").attr("selected", "selected");
    //                                         $("#"+ DietId +"")[0].selected = true;
    //
    //                                      }
    //                          $(".select2-diet-types-panel").trigger("change.select2");
    //             }
    //
    //           }
    //
    // }
    //       }




    //** Set categoreis Types
    var diets = $('.selectCatagory').select2('data');

    for (var j = 0; j < diets.length; j++)
    {

      for (var k = 0; k < $scope.categories.length; k++)
      {
        if(diets[j].id== $scope.categories[k].id)
        {
          if($scope.categories[k]['FoodItems'] != null)
          {

            for (var l = 0; l < $scope.categories[k]['FoodItems'].length; l++)
            {
              //  var selectedID = '#food-'+$scope.categories[k]['FoodItems'][l]['FID'];
              var idDRaw1 =$scope.categories[k]['FoodItems'][l]['FID'];
              var catId = "item-"+idDRaw1;

              $("#"+ catId +"")[0].selected = true;
            }
            $(".select2-diet-types-panel").trigger("change.select2");
          }

        }
      }
    }
    //** Set characteristics Types
    var diets = $('.selectCharacteristic').select2('data');

    for (var j = 0; j < diets.length; j++)
    {
      for (var k = 0; k < $scope.characteristics.length; k++)
      {
        if(diets[j].id== $scope.characteristics[k].id)
        {
          if($scope.characteristics[k]['FoodItems'] != null)
          {

            for (var l = 0; l < $scope.characteristics[k]['FoodItems'].length; l++)
            {
              //  var selectedID = '#food-'+$scope.characteristics[k]['FoodItems'][l]['FID'];
              var idDRaw2 =$scope.characteristics[k]['FoodItems'][l]['FID'];
              var charId = "item-"+idDRaw2;
              $("#"+ charId +"")[0].selected = true;


            }
            $(".select2-diet-types-panel").trigger("change.select2");
          }


        }
      }
    }
    var foods = {FoodItems:""};
    var selectedFoodCount =$('.select2-diet-types-panel').select2('data');
    $scope.selectedFoodItems = [];
    for (var i = 0; i < selectedFoodCount.length; i++)
    {
      $scope.selectedFoodItems[i] = selectedFoodCount[i].id;
    }



    //Sort for Inclusion Diet Type
    if($scope.DietType['Type'] === 'Inclusion')
    {
      var foodlist    = [];
      var foodlistRaw = [];
      for (var i = 0; i < $scope.fooditems.length; i++)
      {
        foodlistRaw[i] = $scope.fooditems[i].id;
      }
      //Sort Out the Included fooditems
      for (var i = 0; i < foodlistRaw.length; i++)
      {
        if($scope.selectedFoodItems != null)
        {
          for (var j = 0; j < $scope.selectedFoodItems.length; j++)
          {
            if(foodlistRaw[i] == $scope.selectedFoodItems[j])
            {
              foodlistRaw[i] = "";
            }
          }
        }
      }
      var j = 0;
      for (var i = 0; i < foodlistRaw.length; i++)
      {
        if(foodlistRaw[i] != "")
        {
          foodlist[j] = foodlistRaw[i];
          j++;
        }
      }
      foods['FoodItems'] = foodlist;
    }
    else
    {
      foods['FoodItems'] = $scope.selectedFoodItems;
    }
  }


  /////////////////////////////////////////////////////////
  ///*******  unSelect foodItems Functions  (select2) **/////
  /////////////////////////////////////////////////////////
  $scope.DietunSelectFn = function(id, state) {
    //$('#item-select2').html('');
    //$('#item-select2').append($scope.modalitemSelect2);
    //       var diets = $('.selectDietType').select2('data');
    //
    // if(state == "Diet")
    // {
    //
    //      for (var k = 0; k < $scope.diettypes.length; k++)
    //         {
    //           if(id == $scope.diettypes[k].id)
    //           {
    //
    //             if($scope.diettypes[k]['FoodItems'] != null)
    //             {
    //
    //               for (var l = 0; l < $scope.diettypes[k]['FoodItems'].length; l++)
    //               {
    //               //  var selectedID = '#food-'+$scope.diettypes[k]['FoodItems'][l]['FID'];
    //                 var idDRaw =$scope.diettypes[k]['FoodItems'][l]['FID'];
                      // //Remove Aka's Aswell
                      // $scope.FoodsAKAUnSelectingFn(idDRaw);
    //                                        var DietId = "item-"+idDRaw;
    //
    //                                        $("#"+ DietId +"").attr("selected",  false);
    //                 }
    //                 $(".select2-diet-types-panel").trigger("change.select2");
    //             }
    //
    //
    // }
    // }
    //  $scope.DietSelectFn();
    //  $scope.FoodsAKASelectionsFn();
    //      /*for (var j = 0; j < diets.length; j++)
    //       {
    //       }*/
    // }


    //** Set categoreis Types
    var diets = $('.selectCatagory').select2('data');

    if(state == "Cat")
    {
      for (var k = 0; k < $scope.categories.length; k++)
      {
        if(id == $scope.categories[k].id)
        {
          if($scope.categories[k]['FoodItems'] != null)
          {
            for (var l = 0; l < $scope.categories[k]['FoodItems'].length; l++)
            {
              var idDRaw1 =$scope.categories[k]['FoodItems'][l]['FID'];
              //Remove Aka's Aswell
              $scope.FoodsAKAUnSelectingFn(idDRaw1);
              //Item Selecter
              var catId = "item-"+idDRaw1;

              $("#"+ catId +"").attr("selected",  false);
            }
            $(".select2-diet-types-panel").trigger("change.select2");
          }
        }
      }
      $scope.DietSelectFn();
      $scope.FoodsAKASelectionsFn();
    }

    //** Set characteristics Types
    var diets = $('.selectCharacteristic').select2('data');
    if(state == "Char")

    {

      for (var k = 0; k < $scope.characteristics.length; k++)
      {
        if(id == $scope.characteristics[k].id)
        {
          if($scope.characteristics[k]['FoodItems'] != null)
          {

            for (var l = 0; l < $scope.characteristics[k]['FoodItems'].length; l++)
            {
              //  var selectedID = '#food-'+$scope.characteristics[k]['FoodItems'][l]['FID'];
              var idDRaw2 =$scope.characteristics[k]['FoodItems'][l]['FID'];
              //Remove Aka's Aswell
              $scope.FoodsAKAUnSelectingFn(idDRaw2);

              //Item Selecter
              var charId = "item-"+idDRaw2;
              $("#"+ charId +"").attr("selected",false);
            }
            $(".select2-diet-types-panel").trigger("change.select2");
          }
        }
      }
      $scope.DietSelectFn();
      $scope.FoodsAKASelectionsFn();
    }
    var foods = {FoodItems:""};
    var selectedFoodCount =$('.select2-diet-types-panel').select2('data');
    $scope.selectedFoodItems = [];
    for (var i = 0; i < selectedFoodCount.length; i++)
    {
      $scope.selectedFoodItems[i] = selectedFoodCount[i].id;
    }



    //Sort for Inclusion Diet Type
    if($scope.DietType['Type'] === 'Inclusion')
    {
      var foodlist    = [];
      var foodlistRaw = [];
      for (var i = 0; i < $scope.fooditems.length; i++)
      {
        foodlistRaw[i] = $scope.fooditems[i].id;
      }
      //Sort Out the Included fooditems
      for (var i = 0; i < foodlistRaw.length; i++)
      {
        if($scope.selectedFoodItems != null)
        {
          for (var j = 0; j < $scope.selectedFoodItems.length; j++)
          {
            if(foodlistRaw[i] == $scope.selectedFoodItems[j])
            {
              foodlistRaw[i] = "";
            }
          }
        }
      }
      var j = 0;
      for (var i = 0; i < foodlistRaw.length; i++)
      {
        if(foodlistRaw[i] != "")
        {
          foodlist[j] = foodlistRaw[i];
          j++;
        }
      }
      foods['FoodItems'] = foodlist;
    }
    else
    {
      foods['FoodItems'] = $scope.selectedFoodItems;
    }


  }
  /////////////////////////////////////////////////////////
  ///*******  Toggle foodItems  *******///////////////////
  /////////////////////////////////////////////////////////
  $scope.toggleAllFoods = function() {

    if(foodSelectCheck == 0)
    {

      $('.food-item').css("background-color", "#67809f");
      $('.food-item').css("color", "#ffffff");
      $('.food-item').attr('selected',true);
      //Set Ingrdients Countt
      var lists = $('.food-item[selected="selected"]');
      var len = Object.keys(lists).length;
      len = len - 4;
      $('.selectCount').html(len);
      foodSelectCheck = 1;
    }
    else if(foodSelectCheck == 1)
    {
      $('.food-item[selected="selected"]').css("background-color", "#ffffff");
      $('.food-item[selected="selected"]').css("color", "#000000");
      $('.food-item[selected="selected"]').attr('selected',false);
      $('.selectCount').html('0');
      foodSelectCheck = 0;
    }
  }

  $scope.slectSubdiets = function(deitID)
  {
    for (var i = 0; i < $scope.diettypes.length; i++)
    {
      if(deitID == $scope.diettypes[i].id)
      {
        for (var j = 0; j< $scope.diettypes[i]['SubType'].length; j++)
        {
          //Check If its Already Not Set
          if(jQuery.inArray($scope.diettypes[i]['SubType'][j]['DTIDC'], $scope.SelectedSubDietsArr) == -1)
          {
            var selectorID = "DOpt-" + $scope.diettypes[i]['SubType'][j]['DTIDC'];
            $("#"+ selectorID +"")[0].selected = true;
            $scope.SelectedSubDietsArr.push($scope.diettypes[i]['SubType'][j]['DTIDC']);
            $scope.slectSubdiets($scope.diettypes[i]['SubType'][j]['DTIDC']);
          }
        }
      }
    }
    //for (var j = 0; j < deitID.length; j++)
    //       {
    //            for (var k = 0; k < $scope.diettypes.length; k++)
    //         {
    //           if(diets[j].id== $scope.diettypes[k].id)
    //           {
    //             if($scope.diettypes[k]['FoodItems'] != null)
    //             {
    //
    //               for (var l = 0; l < $scope.diettypes[k]['FoodItems'].length; l++)
    //               {
    //               //  var selectedID = '#food-'+$scope.diettypes[k]['FoodItems'][l]['FID'];
    //                 var idDRaw =$scope.diettypes[k]['FoodItems'][l]['FID'];
    //                                        var DietId = "item-"+idDRaw;
    //
    //                                        //$("#"+ DietId +"").attr("selected", "selected");
    //                                         $("#"+ DietId +"")[0].selected = true;
    //
    //                                      }
    //                          $(".select2-diet-types-panel").trigger("change.select2");
    //             }
    //
    //           }
    //
    // }
    //     }
  }

  /////////////////////////////////////////////////////////////////////////
  ///*******  Select Ing Diets, Cats & Chars  Functions  (select2) **/////
 ////////////////////////////////////////////////////////////////////////
  $scope.FoodsAKASelectionsFn = function() {
        //** Set SubDiet Types

    var Ings = $('#item-select').select2('data');

    for (var j = 0; j < Ings.length; j++)
    {
     for (var k = 0; k < $scope.fooditems.length; k++)
      {
        if(Ings[j].id== $scope.fooditems[k].id)
        {
          //Set Akas in FoodItems Selection
            if($scope.fooditems[k]['AkaItem'] == true)
            {
              var AkaIDRaw =$scope.fooditems[k]['FID'];
              var AkaFoodId = "item-"+ AkaIDRaw;
              $("#"+ AkaFoodId +"")[0].selected = true;
              $("#item-select").trigger("change.select2");
            }
            if($scope.fooditems[k]['FoodAka'] != null)
            {
              for (var l = 0; l < $scope.fooditems[k]['FoodAka'].length; l++)
              {
                var AkaIDRaw =$scope.fooditems[k]['FoodAka'][l]['id'];
                var AkaFoodId = "item-Aka-"+ AkaIDRaw;
                $("#"+ AkaFoodId +"")[0].selected = true;
              }
              $("#item-select").trigger("change.select2");
            }
        }
      }
    }
    //end function
  }

  ////////////////////////////////////////////////////////////////////////////////////
  ///*******  unSelect Ingredients (Diets, Cats & Chars) Functions  (select2) **/////
  //////////////////////////////////////////////////////////////////////////////////
  $scope.FoodsAKAUnSelectingFn = function(id) {

    //unselect category
    for (var k = 0; k < $scope.fooditems.length; k++)
    {
        if(id == $scope.fooditems[k].id)
        {
          //unSelect Ingredients
          if($scope.fooditems[k]['AkaItem'] == true)
          {
            var AkaIDRaw =$scope.fooditems[k]['FID'];
            var AkaFoodId = "item-"+ AkaIDRaw;
            $("#"+ AkaFoodId +"")[0].selected = false;
            $("#item-select").trigger("change.select2");
          }
          if($scope.fooditems[k]['FoodAka'] != null)
          {
            for (var l = 0; l < $scope.fooditems[k]['FoodAka'].length; l++)
            {
              var AkaIDRaw =$scope.fooditems[k]['FoodAka'][l]['id'];
              var AkaFoodId = "item-Aka-"+ AkaIDRaw;
              $("#"+ AkaFoodId +"")[0].selected = false;
            }
            $("#item-select").trigger("change.select2");
          }
      }
    }
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
              var AkaFoodId = "item-Aka-"+ AkaIDRaw;
              $("#"+ AkaFoodId +"")[0].selected = true;
            }
            // $(".select2-food-items-panel").trigger("change.select2");
          }
      }
    }
  }



  /** End of Controller **/
});
