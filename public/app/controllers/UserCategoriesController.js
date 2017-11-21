app.controller('categoriesController', function($scope, $timeout, $compile, $http, API_URL) {

  //retrieve fooditems listing from API.
  $http.get(API_URL + "fooditems/")
  .success(function(response) {
    $scope.fooditems = response;
    console.log("$scope.fooditems: ",$scope.fooditems);
    //retrieve categories listing from API.
    $http.get(API_URL + "characteristics/")
    .success(function(response) {
      $scope.characteristics = response;

      //***** Initialize characteristics DataTable *******//
      $timeout(function(){
        $scope.Char_TABLE =	$('#table-char-list').DataTable({
          "lengthMenu": [ [20, 50, 75, -1], [20, 50, 75, "All"] ],
          "scrollY": "250px"
        });

      }, 0, false);
      //Hide Ajax Loader
      $('#pleaseWaitModal').modal('hide');
    });

    //retrieve categories listing from API.
    $http.get(API_URL + "category/")
    .success(function(response) {
      $scope.categories = response;
      console.log("$scope.categories: ",$scope.categories);
      //***** Initialize categories DataTable *******//
      $timeout(function(){
        $scope.Cat_TABLE =	$('#table-cat-list').DataTable({
          "lengthMenu": [ [20, 25, 50, -1], [20, 25, 50, "All"] ],
          "scrollY" : "250px",
          rowReorder: true,
          columnDefs: [
            { orderable: true, className: 'reorder', targets: 0 },
            { orderable: true, className: 'reorder', targets: 1 },
            { orderable: false, targets: '_all' },
          ]
        });

        //On re-orderimg event
        $scope.Cat_TABLE.on( 'row-reorder', function ( e, diff, edit ) {
          $scope.catorder = [];
          $scope.corder   = {};

          if(diff.length != "")
          {

            for ( var i=0, ien=diff.length ; i<ien ; i++ )
            {
              var order = {};
              order['catID']    = diff[i]['node']['attributes']['cid'].value;
              order['catOrder'] = diff[i].newData;
              $scope.catorder.push(order);
            }
            $scope.corder['order'] = $scope.catorder;
            var url = API_URL + "category-reorder";

            //Request for Reordering Records
            $http({
              method: 'POST',
              url: url,
              data: $.param($scope.corder),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(response) {
              console.log(response);

            }).error(function(response) {
              console.log(response);
              alert('This is embarassing. An error has occured. Please check the log for details');
            });
          }
        });
      }, 0, false);
    });




    $timeout(function(){

      function formatFoods (state) {

        var $state = $(
          '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
        );
        return $state;
      };
      $(".addFood").select2({
        placeholder: "Select food item",
        templateResult: formatFoods,
        closeOnSelect: false

      });


      $('.addFood').on("select2:select", function( event ){
        event.preventDefault();
      });


      function formatCat (state) {

        var $state = $(
          '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
        );
        return $state;
      };
      $(".select2-cat-panel").select2({
        placeholder: "Select food item",
        templateResult: formatCat,
        closeOnSelect: false
      });

      $("select").on("select2:unselect", function (evt) {
        if (!evt.params.originalEvent) {
          return;
        }
        evt.params.originalEvent.stopPropagation();
      });

      $(".clear-all").click(function(){
        $("#char-select2").select2('val', 'All');
      });


      $(".clear-all").click(function(){
        $("#cat-select2").select2('val', 'All');
      });

      function formatChar (state) {

        var $state = $(
          '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
        );
        return $state;
      };
      $(".select2-char-panel").select2({
        placeholder: "Select food item",
        templateResult: formatChar,
        closeOnSelect: false
      });


      $('.cat-food-item').click(function(e){
        ele = $(e.target);
        counter = $(ele.closest('.panel'));
        counter = $(counter.find('.cat-selectCount'));

        if(ele[0]['classList'][0]=='name')
        {
          ele = $(ele.closest('.cat-food-item'));
        }

        if(ele.attr('selected')!='selected')
        {
          ele.attr('selected',true);
          ele.css("background-color", "#67809f");
          ele.css("color", "#ffffff");
          counter.html(parseInt(counter.html())+1)
        }else
        {
          ele.attr('selected',false);
          ele.css("background-color", "#ffffff");
          ele.css("color", "#000000");
          counter.html(parseInt(counter.html())-1);
        }
      });

      $('.char-food-item').click(function(e){
        ele = $(e.target);
        counter = $(ele.closest('.panel'));
        counter = $(counter.find('.selectCount'));

        if(ele[0]['classList'][0]=='name')
        {
          ele = $(ele.closest('.char-food-item'));
        }

        if(ele.attr('selected')!='selected')
        {
          ele.attr('selected',true);
          ele.css("background-color", "#67809f");
          ele.css("color", "#ffffff");
          counter.html(parseInt(counter.html())+1);
          var id = ele.attr('id');
        }else
        {
          ele.attr('selected',false);
          ele.css("background-color", "#ffffff");
          ele.css("color", "#000000");
          counter.html(parseInt(counter.html())-1);
          var id = ele.attr('id');
        }
      });

      var options = {valueNames: ['name']};
      //	var catList = new List('food-items-cat', options);
      //	var charrList = new List('food-items-char', options);
      $scope.modalCatSelect2 = $('#cat-select2').html();
      $scope.modalcharSelect2 = $('#char-select2').html();
    }, 0, false);
  });

  /////////////////////////////////////////////////////
  ///*******  Category Functions  *************///////
  /////////////////////////////////////////////////////

  //show modal form
  $scope.catToggle = function(modalstate, id) {
    $scope.modalstate = modalstate;
    $scope.category = null;
    $scope.selectedCatFoodItems =  null;

    $('.cat-food-item[selected="selected"]').css("background-color", "#ffffff");
    $('.cat-food-item[selected="selected"]').css("color", "#000000");
    $('.cat-food-item[selected="selected"]').attr('selected',false);
    $('.cat-selectCount').html('0');
    $('#cat-select2').html('');
    $('#cat-select2').append( $scope.modalCatSelect2);

    $('#cat-select2').on('select2:select', function(e)
    {
      $scope.AKASelectionsFn_CAT();
    });
    $('#cat-select2').on('select2:unselect', function(e)
    {
      var IngID = e.params.data.id;
      $scope.AKaUnSelectingFn_CAT(IngID);
    });

    switch (modalstate) {
      case 'add':
      $scope.form_title = "Add Category";
      $('#CategoryModal').modal('toggle');
      break;
      case 'edit':
      $scope.form_title = "Edit Category";
      $scope.id = id;

      //Show Ajax Loader
      $('#pleaseWaitModal').modal('show');
      $http.get(API_URL + "category/" + id)
      .success(function(response) {
        $scope.category = response;
        console.log("$scope.category: ",$scope.category);

        //Hide Ajax Loader
        $('#pleaseWaitModal').modal('hide');
        $('#CategoryModal').modal('show');
        for (var j = 0; j < $scope.category['FoodItems'].length; j++)
        {
          var selectedID = '#cat-'+$scope.category['FoodItems'][j]['FID'];
          var idARaw = $scope.category['FoodItems'][j]['FID'];
          var FoodId = "cat-"+idARaw;
          console.log("selectIng: ", FoodId);
          $("#"+ FoodId +"").attr("selected", "selected");
          $scope.SelectFoodsAkaFor_Edit_CAT($scope.category['FoodItems'][j]['FID']);
        }
        $(".select2-cat-panel").trigger("change.select2");


        $('.cat-selectCount').html($scope.category['FoodItems'].length);
      });
      break;
      default:
      break;
    }
  }

  //save new record / update existing record
  $scope.saveCategory = function(modalstate, id) {

    //Show Ajax Loader
    $('#pleaseWaitModal').modal('show');

    //get selected FoodItems
    // cats = $('#food-items-cat').find('.cat-food-item[selected="selected"]');
    var selectedCatFoodItems=$('.select2-cat-panel').select2('data');
    $scope.selectedCatFoodItems = [];
    var j = 0;
    for (var i = 0; i < selectedCatFoodItems.length; i++) {
      // $scope.selectedCatFoodItems[i] = selectedCatFoodItems[i].id;
      var intID = parseInt(selectedCatFoodItems[i].id);
      if (intID > 0)
      {
        $scope.selectedCatFoodItems[j] = intID;
        j++;
      }
    }

    var foods = {FoodItems:""};
    foods['FoodItems'] = $scope.selectedCatFoodItems;

    $.extend( $scope.category, foods );
    console.log("$scope.category: ", $scope.category);

    var url = API_URL + "category";

    //append staff id to the URL if the form is in edit mode
    if (modalstate === 'edit'){
      url += "/" + id;
    }

    //Request for Storing or Updating Record
    $http({
      method: 'POST',
      url: url,
      data: $.param($scope.category),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(response) {
      console.log(response);
      var categoryResponse = response;
      console.log("roleResponse: ", categoryResponse);
      //Hide Ajax Loader
      $('#pleaseWaitModal').modal('hide');
      //append the new record
      if(categoryResponse != "")
      {
        if (modalstate === 'edit')
        {
          //Update the row
          var rowId = "CR-"+id;
          $scope.Cat_TABLE.row("#"+rowId).remove().draw();

          var newRow = '<tr id="CR-'+ categoryResponse['id'] +'">';
          newRow    +=    '<td>'+ categoryResponse['Order'] +'</td>';
          newRow    +=    '<td>'+ categoryResponse['Name'] +'</td>';
          newRow    +=    '<td>';
          newRow    +=    '  <a href="javascript:;" ng-click="catToggle(\'edit\', '+ categoryResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
          newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ categoryResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
          newRow    +=    '</td>';
          newRow    +='</tr>';

          var temp = $compile(newRow)($scope);
          $scope.Cat_TABLE.row.add($(temp )).draw();

          //Reset fooditems ategoreies;
          for (var j = 0; j < $scope.fooditems.length; j++)
          {
            if($scope.fooditems[j]['Categories'] != "" && $scope.fooditems[j]['Categories'] != null)
            {
              if ($scope.fooditems[j]['Categories'][0]['CatID'] == categoryResponse['id'])
              {
                $scope.fooditems[j]['Categories'] = [];
              }
            }
          }
        }
        else
        {
          var newRow = '<tr id="CR-'+ categoryResponse['id'] +'">';
          newRow    +=    '<td>'+ categoryResponse['Order'] +'</td>';
          newRow    +=    '<td>'+ categoryResponse['Name'] +'</td>';
          newRow    +=    '<td>';
          newRow    +=    '  <a href="javascript:;" ng-click="catToggle(\'edit\', '+ categoryResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
          newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ categoryResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
          newRow    +=    '</td>';
          newRow    +='</tr>';

          var temp = $compile(newRow)($scope);
          $scope.Cat_TABLE.row.add($(temp )).draw();
        }
        //Update FoodItems to new/Updated Category
        for (var i = 0; i < categoryResponse['FoodItems'].length; i++)
        {
          for (var j = 0; j < $scope.fooditems.length; j++)
          {
            if (categoryResponse['FoodItems'][i]['FID'] == $scope.fooditems[j]['id'])
            {
              $scope.fooditems[j]['Categories'][0] = categoryResponse;
            }
          }
        }
      }

    }).error(function(response) {
      console.log(response);
      //Hide Ajax Loader
      $('#pleaseWaitModal').modal('hide');
      alert('This is embarassing. An error has occured. Please check the log for details');
    });

    $('#CategoryModal').modal('hide');
  }

  //delete record
  $scope.confirmDelete = function(id) {
    console.log("id: ", id);
    var isConfirmDelete = confirm('Are you sure you want this record?');
    if (isConfirmDelete)
    {
      $http({
        method: 'DELETE',
        url: API_URL + 'category/' + id
      }).
      success(function(data) {
        console.log(data);
        //Remove the row
        var rowId = "CR-"+id;
        $scope.Cat_TABLE.row("#"+rowId).remove().draw();

        //Reset fooditems categoreies;
        for (var j = 0; j < $scope.fooditems.length; j++)
        {
          //console.log("here");
          if($scope.fooditems[j]['Categories'] != "" && $scope.fooditems[j]['Categories'] != null)
          {
            console.log("here2");
            if ($scope.fooditems[j]['Categories'][0]['CatID'] == id)
            {
              $scope.fooditems[j]['Categories'] = [];
              console.log(" Dommo");
            }
          }
        }
      }).
      error(function(data) {
        console.log(data);
        alert('Unable to delete');
      });
    } else {
      return false;
    }
  }

  /////////////////////////////////////////////////////////////////////////
  ///*******  Select Food AKA Selection  Functions  (select2) **//////////
 ////////////////////////////////////////////////////////////////////////
  $scope.AKASelectionsFn_CAT = function() {
        //** Set SubDiet Types

    var Ings = $('#cat-select2').select2('data');

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
              var AkaFoodId = "cat-"+ AkaIDRaw;
              $("#"+ AkaFoodId +"")[0].selected = true;
              $("#cat-select2").trigger("change.select2");
            }
            if($scope.fooditems[k]['FoodAka'] != null)
            {
              for (var l = 0; l < $scope.fooditems[k]['FoodAka'].length; l++)
              {
                var AkaIDRaw =$scope.fooditems[k]['FoodAka'][l]['id'];
                var AkaFoodId = "cat-Aka-"+ AkaIDRaw;
                $("#"+ AkaFoodId +"")[0].selected = true;
              }
              $("#cat-select2").trigger("change.select2");
            }
        }
      }
    }
    //end function
  }

  $scope.AKaUnSelectingFn_CAT = function(id) {
    //unselect category
    for (var k = 0; k < $scope.fooditems.length; k++)
    {
        if(id == $scope.fooditems[k].id)
        {
          //unSelect Ingredients
          if($scope.fooditems[k]['AkaItem'] == true)
          {
            var AkaIDRaw =$scope.fooditems[k]['FID'];
            var AkaFoodId = "cat-"+ AkaIDRaw;
            $("#"+ AkaFoodId +"")[0].selected = false;
            $("#cat-select2").trigger("change.select2");
          }
          if($scope.fooditems[k]['FoodAka'] != null)
          {
            for (var l = 0; l < $scope.fooditems[k]['FoodAka'].length; l++)
            {
              var AkaIDRaw =$scope.fooditems[k]['FoodAka'][l]['id'];
              var AkaFoodId = "cat-Aka-"+ AkaIDRaw;
              $("#"+ AkaFoodId +"")[0].selected = false;
            }
            $("#cat-select2").trigger("change.select2");
          }
      }
    }
  }

  //Selection For Editing FoodItem
  $scope.SelectFoodsAkaFor_Edit_CAT = function(id) {

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
              var AkaFoodId = "cat-Aka-"+ AkaIDRaw;
              $("#"+ AkaFoodId +"")[0].selected = true;
            }
            // $(".select2-food-items-panel").trigger("change.select2");
          }
      }
    }
  }

  /////////////////////////////////////////////////////
  ///*******  Characteristics Functions  ******///////
  /////////////////////////////////////////////////////

  //show modal form
  $scope.charToggle = function(modalstate, id) {
    $scope.modalstate = modalstate;
    $scope.characteristic = null;
    $scope.selectedCharFoodItems =  null;

    $('.char-food-item[selected="selected"]').css("background-color", "#ffffff");
    $('.char-food-item[selected="selected"]').css("color", "#000000");
    $('.char-food-item[selected="selected"]').attr('selected',false);
    $('.selectCount').html('0');
    $('#char-select2').html('');
    $('#char-select2').append($scope.modalcharSelect2);

    $('#char-select2').on('select2:select', function(e)
    {
      $scope.AKASelectionsFn_CHAR();
    });
    $('#char-select2').on('select2:unselect', function(e)
    {
      var IngID = e.params.data.id;
      $scope.AKaUnSelectingFn_CHAR(IngID);
    });

    switch (modalstate) {
      case 'add':
      $scope.form_title = "Add Characteristic";
      $('#CharModal').modal('toggle');
      break;
      case 'edit':
      $scope.form_title = "Edit Characteristics";
      $scope.id = id;
      //Show Ajax Loader
      $('#pleaseWaitModal').modal('show');
      $http.get(API_URL + "characteristics/" + id)
      .success(function(response) {
        $scope.characteristic = response;
        console.log("$scope.characteristic: ",$scope.characteristic);

        //Hide Ajax Loader
        $('#pleaseWaitModal').modal('hide');
        $('#CharModal').modal('show');

        for (var j = 0; j < $scope.characteristic['FoodItems'].length; j++)
        {
          var idARaw =$scope.characteristic['FoodItems'][j]['FID'];
          var FoodId = "char-"+idARaw;
          console.log("selectIng: ", FoodId);
          $("#"+ FoodId +"").attr("selected", "selected");
          $scope.SelectFoodsAkaFor_Edit_CHAR($scope.characteristic['FoodItems'][j]['FID']);
        }
        $(".select2-char-panel").trigger("change.select2");

        $('.selectCount').html($scope.characteristic['FoodItems'].length);
      });
      break;
      default:
      break;
    }
  }



  //save new record / update existing record
  $scope.savecharacteristic = function(modalstate, id) {
    //Show Ajax Loader
    $('#pleaseWaitModal').modal('show');

    //Get selected fooditems
    var  selectedCharFoodItems =$('.select2-char-panel').select2('data');
    $scope.selectedCharFoodItems = [];
    var j = 0;
    for (var i = 0; i < selectedCharFoodItems.length; i++) {
      //  $scope.selectedCharFoodItems[i] = selectedCharFoodItems[i].id;
      var intID = parseInt(selectedCharFoodItems[i].id);
      if (intID > 0)
      {
        $scope.selectedCharFoodItems[j] = intID;
        j++;
      }
    }
    var foods = {FoodItems:""};
    foods['FoodItems'] = $scope.selectedCharFoodItems;

    $.extend( $scope.characteristic, foods );
    console.log("$scope.characteristic: ", $scope.characteristic);

    var url = API_URL + "characteristics";

    //append staff id to the URL if the form is in edit mode
    if (modalstate === 'edit'){
      url += "/" + id;
    }

    //Request for Storing or Updating Record
    $http({
      method: 'POST',
      url: url,
      data: $.param($scope.characteristic),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(response) {
      console.log(response);
      var characteristicResponse = response;
      console.log("characteristicResponse: ", characteristicResponse);

      //Hide Ajax Loader
      $('#pleaseWaitModal').modal('hide');
      //append the new record
      if(characteristicResponse != "")
      {
        if (modalstate === 'edit')
        {
          //Update the row
          var rowId = "CHR-"+id;
          $scope.Char_TABLE.row("#"+rowId).remove().draw();

          var newRow = '<tr id="CHR-'+ characteristicResponse['id'] +'">';
          newRow    +=    '<td>'+ characteristicResponse['Name'] +'</td>';
          newRow    +=    '<td>';
          newRow    +=    '  <a href="javascript:;" ng-click="charToggle(\'edit\', '+ characteristicResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
          newRow    +=    '  <a href="javascript:;" ng-click="Deletecharacteristic('+ characteristicResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
          newRow    +=    '</td>';
          newRow    +='</tr>';

          var temp = $compile(newRow)($scope);
          $scope.Char_TABLE.row.add($(temp )).draw();
        }
        else
        {
          var newRow = '<tr id="CHR-'+ characteristicResponse['id'] +'">';
          newRow    +=    '<td>'+ characteristicResponse['Name'] +'</td>';
          newRow    +=    '<td>';
          newRow    +=    '  <a href="javascript:;" ng-click="charToggle(\'edit\', '+ characteristicResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
          newRow    +=    '  <a href="javascript:;" ng-click="Deletecharacteristic('+ characteristicResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
          newRow    +=    '</td>';
          newRow    +='</tr>';

          var temp = $compile(newRow)($scope);
          $scope.Char_TABLE.row.add($(temp )).draw();
        }
      }

    }).error(function(response) {
      console.log(response);
      //Hide Ajax Loader
      $('#pleaseWaitModal').modal('hide');

      alert('This is embarassing. An error has occured. Please check the log for details');
    });

    $('#CharModal').modal('hide');
  }

  //delete record
  $scope.Deletecharacteristic = function(id) {
    console.log("id: ", id);
    var isConfirmDelete = confirm('Are you sure you want this record?');
    if (isConfirmDelete)
    {
      $http({
        method: 'DELETE',
        url: API_URL + 'characteristics/' + id
      }).
      success(function(data) {
        console.log(data);
        //Remove the row
        var rowId = "CHR-"+id;
        $scope.Char_TABLE.row("#"+rowId).remove().draw();
      }).
      error(function(data) {
        console.log(data);
        alert('Unable to delete');
      });
    } else {
      return false;
    }
  }

  /////////////////////////////////////////////////////////////////////////
  ///*******  Select Food AKA Selection Char  Functions  (select2) **//////
 ////////////////////////////////////////////////////////////////////////
  $scope.AKASelectionsFn_CHAR = function() {
        //** Set SubDiet Types

    var Ings = $('#char-select2').select2('data');

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
              var AkaFoodId = "char-"+ AkaIDRaw;
              $("#"+ AkaFoodId +"")[0].selected = true;
              $("#char-select2").trigger("change.select2");
            }
            if($scope.fooditems[k]['FoodAka'] != null)
            {
              for (var l = 0; l < $scope.fooditems[k]['FoodAka'].length; l++)
              {
                var AkaIDRaw =$scope.fooditems[k]['FoodAka'][l]['id'];
                var AkaFoodId = "char-Aka-"+ AkaIDRaw;
                $("#"+ AkaFoodId +"")[0].selected = true;
              }
              $("#char-select2").trigger("change.select2");
            }
        }
      }
    }
    //end function
  }

  $scope.AKaUnSelectingFn_CHAR = function(id) {
    //unselect category
    for (var k = 0; k < $scope.fooditems.length; k++)
    {
        if(id == $scope.fooditems[k].id)
        {
          //unSelect Ingredients
          if($scope.fooditems[k]['AkaItem'] == true)
          {
            var AkaIDRaw =$scope.fooditems[k]['FID'];
            var AkaFoodId = "char-"+ AkaIDRaw;
            $("#"+ AkaFoodId +"")[0].selected = false;
            $("#char-select2").trigger("change.select2");
          }
          if($scope.fooditems[k]['FoodAka'] != null)
          {
            for (var l = 0; l < $scope.fooditems[k]['FoodAka'].length; l++)
            {
              var AkaIDRaw =$scope.fooditems[k]['FoodAka'][l]['id'];
              var AkaFoodId = "char-Aka-"+ AkaIDRaw;
              $("#"+ AkaFoodId +"")[0].selected = false;
            }
            $("#char-select2").trigger("change.select2");
          }
      }
    }
  }

  //Selection For Editing FoodItem
  $scope.SelectFoodsAkaFor_Edit_CHAR = function(id) {

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
              var AkaFoodId = "char-Aka-"+ AkaIDRaw;
              $("#"+ AkaFoodId +"")[0].selected = true;
            }
            // $(".select2-food-items-panel").trigger("change.select2");
          }
      }
    }
  }

});
