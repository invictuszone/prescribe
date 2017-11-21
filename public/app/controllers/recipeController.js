
app.controller('recipeController', function($scope,$timeout,$compile, $http, API_URL) {

  // retrieve meals listing from API.
  // to show in dropdown

  $http.get(API_URL + "meals/")
  .success(function(response) {
    $scope.meals = response;
    //   console.log("Meals:", $scope.meals);
  });

  //// loading units
  $http.get(API_URL + "units/")
  .success(function(response) {
    $scope.units = response;
    console.log('sucess retriving units',response);
  }).error(function(response) {
    console.log('error',response);
    alert('This is embarassing. An error has occured. Please check the log for details');
  });

  ////loading units end


  //retrieve fooditems listing from API.
  //to show in dropdown
  $http.get(API_URL + "fooditems/")
  .success(function(response) {
    $scope.fooditems = response;


    //retrieve recipes listing from API.
    //to show in dropdown
    $http.get(API_URL + "recipes/")
    .success(function(response) {
      $scope.recipes = response;


      $timeout(function(){
        $(".more").shorten({
          "showChars" : 400,
          "moreText"	: "See More",
          "lessText"	: "Less",
        });
        $scope.Recipe_TABLE =  $('.table-recipes-list').DataTable({
          "lengthMenu": [ [20, 50, 75, -1], [20, 50, 75, "All"] ],
          "scrollY" : "250px",
        });
        $('#pleaseWaitModal').modal('hide');
      }, 0, false);
    });

    $timeout(function(){
      FormRepeater.init();
      // $('#ingredient').select2({
      //     //templateResult: formatState,
      //     closeOnSelect: false
      // });
      // $('#select_units').select2({
      //     //templateResult: formatState,
      //     closeOnSelect: false
      // });
    }, 0, false);

  });


  ////for loading food items in the dropdown////



  //show modal form
  $scope.toggle = function(modalstate,id) {
    $scope.modalstate = modalstate;
    // setTimeout(formrepeater, 5000);

    $('[data-repeater-list]').empty();
    setTimeout(function(){
      $('[data-repeater-create]').click();
    }, 10);


    //  $scope.modalstate = modalstate;
    $scope.recipe = null;

    switch (modalstate) {
      case 'add':
      //setTimeout(formrepeater, 5000);
      $scope.form_title = "Add Recipe";
      $('#addRecipie').modal('show');
      // setTimeout(formrepeater, 5000);
      break;
      case 'edit':

      $scope.form_title = "Edit Recipe Details";
      // setTimeout(formrepeater, 5000);
      $scope.id = id;
      // console.log('id',id)

      //Show Ajax Loader
      $('#pleaseWaitModal').modal('show');
      $http.get(API_URL + 'recipes/' + id)
      .success(function(response) {
        $scope.recipe = response[0];
        console.log('response toggle',response);
        $scope.ingredients = response['Ingredients'];
        $scope.instruction = response['Instructions'];
        $scope.ingredientscount1 = response['Ingredients'].length;
        $('[data-repeater-list="ingredients"]').empty();
        // $scope.ingredientscount1--;
        // console.log('count1',$ingredientscount1);
        $instructioncount1 = response['Instructions'].length;
        //console.log('count2',$instructioncount1);
        //   console.log('Ingredients');
        //    console.log($scope.ingredients);
        //    console.log('Instructions');
        //    console.log($scope.instruction);

        //Hide Ajax Loader
        $('#pleaseWaitModal').modal('hide');
        //Show Modal
        $('#addRecipie').modal('show');

        if( $scope.ingredients!=null)
        {
          for (var j = 0; j <$scope.ingredientscount1; j++)
          {
            var i =0;
            console.log('$scope.ingredients[i].ingredientsUnit',$scope.ingredients[i].ingredientsUnit);
            setTimeout(function(){
              $("#addingredient").click();
              console.log("$: ",$("select[name='ingredients["+i+"][ingredientunit]']"));
              $("select[name='ingredients["+i+"][ingredientunit]']").val($scope.ingredients[i].ingredientsUnit).find("option[value=" + $scope.ingredients[i].ingredientsUnit +"]").attr('selected', true);
              $("input[name='ingredients["+i+"][ingredientqty]']").val($scope.ingredients[i].ingredientQty);
              $("input[name='ingredients["+i+"][ingredientcomment]']").val($scope.ingredients[i].ingredientscomment);
              $("select[name='ingredients["+i+"][ingredientname]']").val($scope.ingredients[i].FID).find("option[value=" + $scope.ingredients[i].FID +"]").attr('selected', true);
              i++;
              // $("select[name='ingredients["+i+"][ingredientunit]']").trigger("change.select2");
            }, 0);
          }
          setTimeout(function(){
            $(".ingSelect2").trigger("change.select2");
          }, 1000);
        }
        while($instructioncount1!=0)
        {
          $('[data-repeater-list="instructions"]').empty();
          var j=0;
          setTimeout(function(){
            $("#addinstruction").click();
            $("input[name='instructions["+j+"][instructionname]']").val($scope.instruction[j].instruction);
            j++;
          }, 0);
          $instructioncount1--;
        }
        setTimeout(function(){
          $(".unitSelect2").trigger("change.select2");
        }, 1000);
      });
      break;
      default:
      break;
    }
  }
  var mealtime ='';

  $scope.changedValue=function(item){
    mealtime = item;

  }

  //save new record / update existing record
  $scope.save = function(modalstate,id)
  {
    //Show Ajax Loader
    $('#pleaseWaitModal').modal('show');


    var url = API_URL + "recipes";
    if (modalstate === 'edit'){
      url += "/" + id;
    }

    //Request for Storing or Updating Record
    var ingredientscount = $('.count1').length;
    var instructioncount = $('.count2').length;
    var count1 = ingredientscount;
    var count2 = instructioncount;
    var i =0;
    var k =1;

    while(ingredientscount!=0)
    {
      var j = 0;

      var ingredient = {ingredients:""};

      var check1 = document.getElementsByName("ingredients["+i+"][ingredientqty]")[j].value;
      // var IngID  = document.getElementsByName("ingredients["+i+"][ingredientname]")[j].value;
      // var intID = parseInt(document.getElementsByName("ingredients["+i+"][ingredientname]")[j].value);
      // var check2 = true;
      // if (intID > 0)
      // {
      // }
      // else {
      //   check2 = false;
      //   count1--;
      //   // ingredientscount--;
      //   // k--;
      // }

      // if(check1!='' && check2 == true)
      if(check1!='')
      {

        ingredient['ingredientname'+k]    = document.getElementsByName("ingredients["+i+"][ingredientname]")[j].value;


        ingredient['ingredientqty'+k]     = document.getElementsByName("ingredients["+i+"][ingredientqty]")[j].value;


        ingredient['ingredientunit'+k]    = document.getElementsByName("ingredients["+i+"][ingredientunit]")[j].value;

        ingredient['ingredientcomment'+k] = document.getElementsByName("ingredients["+i+"][ingredientcomment]")[j].value;


        ingredient['ingredientcount'] = count1;
        $.extend( $scope.recipe, ingredient);
        k++;
      }
      ingredientscount--;

      i++;

      j++;
    }


    i = 0;

    var k =1;
    while(instructioncount!=0)
    {
      var j = 0;
      var instruction = {instructions:""};
      var check2 = document.getElementsByName("instructions["+i+"][instructionname]")[j].value;
      if(check2!='')
      {
        instruction['instructionname'+k]  = document.getElementsByName("instructions["+i+"][instructionname]")[j].value;
        instruction['instructioncount']   = count2;
        $.extend( $scope.recipe, instruction);
      }
      instructioncount--;
      i++;
      k++;
      j++;
    }
    var recipeResponse=[];
    console.log('$scope.recipe',$scope.recipe);

    $http({
      method: 'POST',
      url: url,
      data: $.param($scope.recipe),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(response) {
      console.log("recipe sucess response: ", response);

      recipeResponse = response[0];
      //  console.log("recipeResponse ", recipeResponse);
      //  console.log("response[0] ", response[0]);
      //  console.log("recipeResponse['id'] ", response['id']);

      ingredientsResponse = response['Ingredients']
      //  console.log("ingredientsResponse?:", ingredientsResponse);

      //Hide Ajax Loader
      $('#pleaseWaitModal').modal('hide');

      if(recipeResponse!="")
      {

        if (modalstate === 'edit')
        {
          //Update the row
          var rowId = "RR-"+id;
          $scope.Recipe_TABLE.row("#"+rowId).remove().draw();

          var newRow = '<tr id="RR-'+ recipeResponse['id'] +'">';
          newRow    +=    '<td>'+ recipeResponse['Name'] +'</td>';
          newRow    +=    '<td><span class="label label-sm label-info"> '+ recipeResponse['MealTime'] +' </span></td>';
          newRow    +=     '<td class="more">';
          for (var i = 0; i < ingredientsResponse.length; i++) {
            console.log("'ingredientsResponse[i]['ingredientName']'",ingredientsResponse[i]['ingredientName']);
            newRow    +=         '<span> '+ ingredientsResponse[i]['ingredientName'] +' </span>'} '</td>';
            newRow    +=    '<td>';
            newRow    +=    '  <a href="javascript:;" ng-click="toggle(\'edit\', '+ recipeResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
            newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ recipeResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
            newRow    +=    '</td>';
            newRow    +='</tr>';

            var temp = $compile(newRow)($scope);
            $scope.Recipe_TABLE.row.add($(temp )).draw();
          }
          else
          {
            var newRow = '<tr id="RR-'+ recipeResponse['id'] +'">';
            newRow    +=    '<td>'+ recipeResponse['Name'] +'</td>';
            newRow    +=    '<td><span class="label label-sm label-info"> '+ recipeResponse['MealTime'] +' </span></td>';
            newRow    +=     '<td class="more">';
            for (var i = 0; i < ingredientsResponse.length; i++) {
              console.log("'ingredientsResponse[i]['ingredientName']'",ingredientsResponse[i]['ingredientName']);
              newRow    +=         '<span> '+ ingredientsResponse[i]['ingredientName'] +' ,</span>'} '</td>';
              newRow    +=    '<td>';
              newRow    +=    '  <a href="javascript:;" ng-click="toggle(\'edit\', '+ recipeResponse['id'] +')" class="blue-hoki"><i class="fa fa-edit font-blue-hoki"></i></a>';
              newRow    +=    '  <a href="javascript:;" ng-click="confirmDelete('+ recipeResponse['id'] +')" class="red-soft"><i class="fa fa-remove font-red-soft"></i></a>';
              newRow    +=    '</td>';
              newRow    +='</tr>';

              var temp = $compile(newRow)($scope);
              $scope.Recipe_TABLE.row.add($(temp )).draw();
            }
          }
        })
        .error(function(response) {

          //Hide Ajax Loader
          $('#pleaseWaitModal').modal('hide');

          alert('This is embarassing. An error has occured. Please check the log for details');
        });


        $('#addRecipie').modal('hide');
      }

      //delete record
      $scope.confirmDelete = function(id) {

        var isConfirmDelete = confirm('Are you sure you want to delete this record?');
        if (isConfirmDelete)
        {
          $http({
            method: 'DELETE',
            url: API_URL + 'recipes/' + id
          }).
          success(function(data) {

            //Remove the row
            var rowId = "RR-"+id;
            $scope.Recipe_TABLE.row("#"+rowId).remove().draw();
          }).
          error(function(data) {

            alert('Unable to delete');
          });
        }
        else {
          return false;
        }
      }
      function formrepeater()
      {
        FormRepeater.init();
      }
      $("#addingredient").on('click', function(){
        var myDiv = $(".scroller");
        myDiv.animate({ scrollTop: myDiv.prop("scrollHeight") - myDiv.height() }, 1000);
        console.log("IN");
      });



    });
