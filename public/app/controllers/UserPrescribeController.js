//Files adding Directive
app.directive("fileInput", function($parse) {
  return {
    // restrict: 'A',
    link: function($scope, element, attrs) {
      element.on("change", function(event) {
        var files = event.target.files;
        //console.log(files[0].name);
        $parse(attrs.fileInput).assign($scope, element[0].files);
        $scope.$apply();
      });
    }
  }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////   intializeIncludeExcludeTab()      ////////////////////////////////
intializeIncludeExcludeTab();
////////////////////////////////////////////////////////////////////////////////////////////////////////
//            Intializez the table for patient diet history                //
//////////////////////////////////////////////////////////////////////////////////////////////////////

function intializeIncludeExcludeTab() {

  $('.include-reactions').change(function() {
    $('.food-panel-list').toggle(this.checked);
    //////////////////////////////////////////////
    /////////////////////////////////////////////
    PRECRIPTION.updateReaction(this.checked);
    ////////////////////////////////////////////
    ///////////////////////////////////////////
  }).change(); //ensure visible state matches initially

}

var pidfileupload = 0;
app.controller('prescribeController', function($scope, $timeout, $location, $compile, $http, API_URL) {


  ////////////////////////////////////////////////////////////////////
  /////// Retrieve All Prescribe Diet data listing from API. ///////////
  ////////////////////////////////////////////////////////////////////
  $http.get(API_URL + "prescribe/")
  .success(function(response) {
    $scope.prescribeData = response;
    // console.log("$scope.prescribeData: ", $scope.prescribeData);
    //Set Patients Data
    // $scope.patients = $scope.prescribeData['patients'];
    //Set foodpanels Data
    $scope.foodpanels = $scope.prescribeData['foodpanels'];
    //Set diettypes Data
    $scope.diettypes = $scope.prescribeData['dietType'];
    // console.log("$scope.prescribeData: ",$scope.prescribeData);
    //***** Initialize Dietype List *******//
    $timeout(function() {

      var options = {
        valueNames: ['name']
      };

      foodfilters = new List('foodfilters', options);

      SELECTED_TEMPLATE = '<div class="list-group-item listDiv" id="listDiv1"><span class="filter"></span>';
      // SELECTED_TEMPLATE += '<a class="btn btn-circle btn-icon-only pull-right" >';
      SELECTED_TEMPLATE += '<i class="fa fa-remove font-red closeBtn" id="closeBtn1" style="float:right" ng-click="moveBackSelected(event);"></i>';
      SELECTED_TEMPLATE += '<a class="openModalBtn" id="openModalBtn1" ng-click="openFoodList(event)"><i class="fa fa-eye font-blue-hoki" style="float:right;margin-right:10px;" ></i></a>';
      // SELECTED_TEMPLATE += '</a>';
      //  SELECTED_TEMPLATE += '<div class="mt-radio-inline">';
      SELECTED_TEMPLATE += '<label class="mt-radio">';
      SELECTED_TEMPLATE += '<input class="rbtn" type="radio" name="optionsRadios" id="optionsRadios4" value="option1">Never';
      SELECTED_TEMPLATE += '<span></span>';
      SELECTED_TEMPLATE += '  </label>';
      SELECTED_TEMPLATE += '<label class="mt-radio">';
      SELECTED_TEMPLATE += '<input class="rbtn1" type="radio" name="optionsRadios" id="optionsRadios3" value="option5"> ';
      SELECTED_TEMPLATE += 'No';
      SELECTED_TEMPLATE += '<span></span>';
      SELECTED_TEMPLATE += '  </label>';
      SELECTED_TEMPLATE += '  <label class="mt-radio">';
      SELECTED_TEMPLATE += '  <input class="rbtn2" type="radio" name="optionsRadios" id="optionsRadios5" checked value="option2">Try';
      SELECTED_TEMPLATE += '  <span></span>';
      SELECTED_TEMPLATE += '  </label>';
      SELECTED_TEMPLATE += '  <label class="mt-radio mt-radio">';
      SELECTED_TEMPLATE += '  <input class="rbtn3" type="radio" name="optionsRadios" id="optionsRadios6"  value="option3" > ';
      SELECTED_TEMPLATE += 'Occasionally';
      SELECTED_TEMPLATE += '  <span></span>';
      SELECTED_TEMPLATE += '  </label>';
      SELECTED_TEMPLATE += '  <label class="mt-radio mt-radio">';
      SELECTED_TEMPLATE += '  <input class="rbtn4" type="radio" name="optionsRadios" id="optionsRadios7" value="option4"> ';
      SELECTED_TEMPLATE += 'Allow';
      SELECTED_TEMPLATE += '  <span></span>';
      SELECTED_TEMPLATE += '  </label>';
      //  SELECTED_TEMPLATE += '  </div>';
      SELECTED_TEMPLATE += '  </div>';

      var options = {
        valueNames: ['filter', {
          data: ['id']
        }, {
          attr: 'name',
          name: 'rbtn'
        }, {
          attr: 'name',
          name: 'rbtn1'
        }, {
          attr: 'name',
          name: 'rbtn2'
        }, {
          attr: 'name',
          name: 'rbtn3'
        }, {
          attr: 'name',
          name: 'rbtn4'
        }, {
          attr: 'ng-click',
          name: 'openModalBtn'
        }, {
          attr: 'ng-click',
          name: 'closeBtn'
        }, {
          attr: 'id',
          name: 'listDiv'
        }],
        item: SELECTED_TEMPLATE
      };
      foodfiltersselected = new List('foodfiltersselected', options);

    }, 0, false);

    //Set fooditems Data
    $scope.fooditems = $scope.prescribeData['Foodlist'];
    //***** Initialize FoodList DataTable *******//
    $timeout(function() {

      // $scope.FOOD_ITEM_TABLE = $('#table-food-list').DataTable({
      //   "destroy": true,
      //   "iDisplayLength": 793,
      //   "lengthMenu": [
      //     [20, 50, 75, -1],
      //     [20, 50, 75, "All"]
      //   ],
      //   "iDisplayStart": 20,
      //   "scrollY": "250px",
      //   "aoColumnDefs": [{
      //     'bSortable': false,
      //     'aTargets': [1, 2, 3, 4]
      //   }]
      // });
      // $('#column1_search').on('keyup', function() {
      //   $scope.FOOD_ITEM_TABLE
      //   .columns(0).search('YES')
      //   .search(this.value)
      //   .draw();
      // });
$('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
      $($.fn.dataTable.tables(true)).DataTable()
         .columns.adjust();
   });
      $scope.FOOD_ITEM_TABLE = $('#table-food-list').DataTable({
        // "retrieve": true,
        // serverSide: true,
        "lengthMenu": [
          [20, 50, 75, -1],
          [20, 50, 75, "All"]
        ],
        "iDisplayStart": 20,
        "iDisplayLength": -1,
        "scrollY": "250px",
        "aoColumnDefs": [{
          'bSortable': false,
          'aTargets': [1, 2, 3, 4]
        },
        {
          "targets": [ 5 ],
          "visible": false,
          "searchable": true
        },
        {
          "targets": [ 6 ],
          "visible": false,
          "searchable": true
        },
        {
          "targets": [ 7 ],
          "visible": false,
          "searchable": true
        }],
        deferRender:    true,
        // scroller: {
        //         loadingIndicator: true
        //     }
        scroller:       true
      });
      $('#column1_search').on('keyup', function() {
        $scope.FOOD_ITEM_TABLE
        .columns(0).search('YES')
        .search(this.value)
        .draw();
      });
      $('#column2_search').on('change', function() {
        $scope.FOOD_ITEM_TABLE
        .columns(5).search('YES')
        .search(this.value)
        .draw();
      });
      $('#column3_search').on('change', function() {
        $scope.FOOD_ITEM_TABLE
        .columns(6).search('YES')
        .search(this.value)
        .draw();

      });
      $('#column4_search').on('change', function() {
        $scope.FOOD_ITEM_TABLE
        .columns(7).search('YES')
        .search(this.value)
        .draw();

      });

      // $('.dataTables_scrollBody').on('scroll', function() {
      //   console.log("************************************************");
      //   setTimeout( function () {
      //       console.log("////////////////////////////////////////");
      //         // PRECRIPTION.formatFoodList($scope.FOOD_ITEM_TABLE);
      //         PRECRIPTION.formatFoodList_OnScroll($scope.FOOD_ITEM_TABLE);
      //     }, 50 );
      //     // $scope.FOOD_ITEM_TABLE.draw();
      // });


      //Hide Ajax loader
      $('#pleaseWaitModal').modal('hide');

      //Select Patient if passed in url
      //   console.log("$location: ",$location);
      var pid      = $location.search().pid;
      var prescID  = $location.search().prescID;
      if (pid != "" && typeof pid != "undefined") {
        $scope.selectPatient(pid);
        $('#patientbtn').click();

        if (prescID != "" && typeof prescID != "undefined") {
          $scope.getPrescriptionRecord(prescID);
        }
      }
    }, 0, false);
  });
  //initialize single patient Global Variable
  $scope.patient = null;
  /////////////////////////////////////////////////////////
  ////////// Add new Patient //////////////////////////////
  /////////////////////////////////////////////////////////
  var patientfname = '';
  var patientlname = '';
  $scope.addPatient = function() {
    //Show Ajax Loader
    $('#pleaseWaitModal').modal('show');

    var dob =   $("#patientDOB").val();
    var lname = $("#patientLname").val();
    var fname = $("#patientFname").val();
    var email = $("#patientEmaill").val();
    var gender = $("input[name=patientGender]").val();
    $('input[name="patientGender1"][value="' + gender + '"]').prop('checked', true);


    var url = API_URL + "patients";

    //For Unique Image Name
    if (!angular.isUndefined($scope.files)) {
      //console.log("$scope.files: ", $scope.files);
      var oldName = $scope.files[0].name;
      var d = new Date();

      var Picture = d.getTime();

      Picture += ".";
      var str = oldName;
      var n = str.lastIndexOf('.');
      Picture += str.substring(n + 1);
    } else {
      var Picture = "avatar.png";
    }

    var image = {
      Picture: ""
    };
    image['Picture'] = Picture;
    $.extend($scope.patient, image);

    var orgArr = {
      orgID: "1"
    };
    $.extend($scope.patient, orgArr);
    var staffArr = {
      staffID: STAFFID
    };
    $.extend($scope.patient, staffArr);

    var infusionrecordArr = {
      infusionrecordID: "1"
    };
    $.extend($scope.patient, infusionrecordArr);


    //Request for Storing or Updating Record
    $http({
      method: 'POST',
      url: url,
      data: $.param($scope.patient),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success(function(response) {
      //     console.log('ADD RESPONSE',response);
      $scope.selectedPatient = response[0];
      patientfname = $scope.selectedPatient['fname'];
      patientlname = $scope.selectedPatient['lname'];
      $scope.EditPatient = response[0];
      pid = $scope.selectedPatient['id'];
      pidfileupload = $scope.selectedPatient['id'];

      var state = 1;
      //For Uploading image
      var form_data = new FormData();
      angular.forEach($scope.files, function(file) {
        form_data.append('file', file);
      });
      form_data.append('id', pid);
      form_data.append('state', state);
      form_data.append('Picture', image['Picture']);

      $http({
        method: 'POST',
        url: '../app/uploadPatient.php',
        data: form_data,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Process-Data': false
        }
      }).success(function(response) {
        // console.log('PIC RESPONSE',response);
        //Hide Ajax Loader
        $('#pleaseWaitModal').modal('hide');
        var html  = '<img src="../assets/images/patients/'+pid+'/'+ image['Picture'] +'">';
        var html2 = '<img class="img-responsive" src="../assets/images/patients/'+pid+'/'+ image['Picture']  +'">';
        $('#imageSection2').append(html);
        $('#imageSection3').append(html2);

      }).error(function(response) {
        //   console.log(response);
        //Hide Ajax Loader
        $('#pleaseWaitModal').modal('hide');
        alert('This is embarassing. An error has occured. Please check the log for details');
      });

      $('#patient').val(pid);

    }).error(function(response) {
      //console.log(response);
      //Hide Ajax Loader
      $('#pleaseWaitModal').modal('hide');
      alert('This is embarassing. An error has occured. Please check the log for details');
    });
  }


  /////////////////////////////////////////////////////////
  /////*** Show Patient Details (step 0-3) ****////////////
  /////////////////////////////////////////////////////////
  //Set Select2 of step 0-2
  var pic = 0;
  var selectedPatientCheck = 0;
  $('#patient').change(function() {
    var pid = $("#patient").val();
    $scope.selectPatient(pid);
  });

  $scope.selectPatient = function(pid) {
    pidfileupload = pid;

    //If selected set true
    selectedPatientCheck = 1;
    $scope.patientid = pid;

    jQuery.ajax({
      url: API_URL + "patients/" + pid,
      success: function (response) {
        $scope.selectedPatient = response[0];
        $scope.EditPatient     = response[0];
        console.log("$scope.response",response[0]);
      },
      async: false
    });

    $('#patientbtn').html('Add');
    //Set Button text
    if ($('#patient').val() != '') {
      $('#patientbtn').html('Next');
    }
    //Set patient Details
    $(".step02ptnButton").removeAttr("disabled");


    $("#patientFname").val($scope.selectedPatient.fname);
    $("#patientFname").prop("disabled", true);

    $("#firstname").val($scope.selectedPatient.fname);
    $("#lastname").val($scope.selectedPatient.lname);

    patientfname = $scope.selectedPatient.fname;
    patientlname = $scope.selectedPatient.lname;

    $("#patientFname1").val($scope.selectedPatient.fname);

    $("#patientLname").val($scope.selectedPatient.lname);
    $("#patientLname").prop("disabled", true);

    $("#patientLname1").val($scope.selectedPatient.fname);


    $("#patientDOB").val($scope.selectedPatient.DOB);
    $("#patientDOB1").val($scope.selectedPatient.DOB);

    $("#patientDOB").prop("disabled", true);

    $("#patientEmaill").val($scope.selectedPatient.email);
    $("#patientEmail1").val($scope.selectedPatient.email);

    $("#patientEmaill").prop("disabled", true);

    $('input[name="patientGender"][value="' + $scope.selectedPatient.gender + '"]').prop('checked', true);
    $('input[name="patientGender1"][value="' + $scope.selectedPatient.gender + '"]').prop('checked', true);

    $('input[name="patientGender"]').prop("disabled", true);

    if($scope.selectedPatient['infusionrecordID'] != null && $scope.selectedPatient['infusionrecordID'] != "" && $scope.selectedPatient['infusionrecordID'] > 50)
    {
      var html = '<img src="https://admin.bodypro.com/userphoto/' + $scope.selectedPatient['infusionrecordID'] + '.jpg">';
      var html2 = '<img class="img-responsive" src="https://admin.bodypro.com/userphoto/' + $scope.selectedPatient['infusionrecordID'] + '.jpg">';
    }
    else {
      var html = '<img src="../assets/images/patients/' + pid + '/' + $scope.selectedPatient.image + '">';
      var html2 = '<img class="img-responsive" src="../assets/images/patients/' + pid + '/' + $scope.selectedPatient.image + '">';
    }

    //Clear Image Section
    $('#imageSection').html('');
    $('#imageSection2').html('');
    $('#imageSection3').html('');

    //Append Selected Patient Image
    $('#imageSection').append(html);
    $('#imageSection2').append(html);
    $('#imageSection3').append(html2);

    pic = $scope.selectedPatient.image;

    $('#imageDiv').removeClass("fileinput-new");
    $("#imageInput2").prop("disabled", true);
    $("#selectImage").hide();


    //console.log("$scope.selectedPatient: ",$scope.selectedPatient);
  }

  //rest fields
  $scope.resetFields = function(){
    $scope.PateintHistory_Table.clear().draw();
    $scope.PateintHistory_Table.destroy();
  }

  //step two comments
  $scope.getComment = function(id){
    // console.log('id',id);
    for (var i = 0; i < $scope.patienthistory.length; i++)
    {
      //   console.log('kis ko show karnay lagay ho: ', $scope.patienthistory[i]);
      if($scope.patienthistory[i].id == id)
      {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }

        var today = mm + '/' + dd + '/' + yyyy;

        $('#Commentnames').html('');

        $('#Commentnames').append(''+patientfname + ' ' + patientlname);

        $('#PatientComments').html('');
        $('#PatientComments').html($scope.patienthistory[i].HistoryFiles[0].comments);
        $('#comment-date').html('');
        $('#comment-date').html(today);
        //   console.log('comments aa rae hn')
      }
    }
    $('#step-02Modal').modal('show');
    //$scope.Pfname = ;
  }

  //***   Get Pateint History
  $('.step02ptnButton').click(function() {
    if(selectedPatientCheck == 1)
    {
      var pid = $scope.patientid;
      //retrieve patienthistory listing from API.
      $http.get(API_URL + "patienthistory/" + pid)
      .success(function(response) {
        //console.log('response:', response);
        $scope.patienthistory = response;
        $timeout(function(){
          $scope.PateintHistory_Table =  $('#diet-history-datatable').DataTable({
            "pageLength": 5,
            "responsive": true,
            "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
            "scrollY":        "250px",
            "order": [[ 0, "desc" ]]
          });
        });

      });
    }
  });



  ///////////////////////////////////////////////////////////
  ////////////**** Edit Patient Diet History Record****/////
  /////////////////////////////////////////////////////////
  $scope.editPrescriptionRecord = false;
  $scope.panelEditing           = false;
  $scope.dietsEditing           = false;

  $scope.getPrescriptionRecord = function(precID) {
    //   console.log("precID: ",precID);
    $scope.editPrescriptionRecord = true;
    //Show Ajax loader
    $('#pleaseWaitModal').modal('show');

    //retrieve PrescriptionRecord from API.
    $http.get(API_URL + "getPrescription/" + precID)
    .success(function(response) {
      //  console.log('response:', response);
      $scope.editPrescriptionResponse = response;
      // console.log("PRECRIPTION: ",PRECRIPTION);
      var presData = $.parseJSON($scope.editPrescriptionResponse['jsonobject']);

      PRECRIPTION['MOList']             = presData['MOList'];
      if(typeof presData['MOInDietList'] != 'undefined' || PRECRIPTION['MOInDietList'] != null)
      {
        PRECRIPTION['MOInDietList']       = presData['MOInDietList'];
      }
      else {
        PRECRIPTION['MOInDietList']       = [];
      }
      PRECRIPTION['MOExceptionList']    = presData['MOExceptionList'];
      PRECRIPTION['status']             = presData['status'];
      PRECRIPTION['last_modified']      = presData['last_modified'];
      PRECRIPTION['include_reaction']   = presData['include_reaction'];
      PRECRIPTION['autoimmune']         = presData['autoimmune'];
      PRECRIPTION['foodPanels']         = presData['foodPanels'];
      PRECRIPTION['ingreduentsLookup']  = presData['ingreduentsLookup'];
      PRECRIPTION['fooditems']          = presData['fooditems'];
      PRECRIPTION['diettypes']          = presData['diettypes'];
      PRECRIPTION['shoppingList']       = presData['shoppingList'];
      PRECRIPTION['sliderRanges']       = presData['sliderRanges'];
      PRECRIPTION['finalList']          = presData['finalList'];
      //PRECRIPTION['recipelist']         = presData['recipelist'];
      PRECRIPTION['comment']            = presData['comment'];
      PRECRIPTION['patient']            = presData['patient'];
      console.log("PRECRIPTION: ",PRECRIPTION);
      //Populate Prescription Data

      $('#step0-3-AddPresBtn').click();
      setTimeout(function()
      {
        // $('#step0-3-AddPresBtn').click();
        if(PRECRIPTION['include_reaction'] == true)
        {
          $('.include-reactions').prop('checked', true);
          $(".include-reactions").trigger("change");

          // Select FoodPanel in Select 2
          $.each(PRECRIPTION['foodPanels'], function(fkey, foods) {
            var idRaw = foods.id;
            var panelId = "POpt"+idRaw;
            $("#"+ panelId +"").attr("selected", "selected");
          });
          //Set Food panels tabs
          $("#allergySelectr").trigger("change");
          var panels = $("#allergySelectr").select2('data');
          $scope.panelsLength = panels.length;
          $scope.panelsLength--;
          $scope.panelEditing = true;
          $scope.panelInit();

          //Hide Ajax loader
          $('#pleaseWaitModal').modal('hide');
        }
        else {
          //Hide Ajax loader
          $('#pleaseWaitModal').modal('hide');
        }
        ///////// Set Selected DietTypes ////////
        //Set Only Parent Diets First
        $.each(PRECRIPTION['diettypes'], function(dkey, diet) {
          for (var i = 0; i < $scope.diettypes.length; i++)
          {
            if ($scope.diettypes[i].id == diet.id)
            {
              var childDiets  = $scope.diettypes[i].childDiets;
              var parentDiets = $scope.diettypes[i].parentDiets;
              if (childDiets.length > 0 && parentDiets.length <= 0)
              {
                $scope.dietsEditing = true;
                var dietID = diet.id;
                $scope.moveToSelectedChildFn(dietID);
                $scope.setDiet_MO_COUNT(dietID);
                var DietId = "DOpt-"+dietID;

                if(typeof $("#"+ DietId +"")[0] != 'undefined')
                  $("#"+ DietId +"")[0].selected = true;
              }
            }
          }
        });
        //Set Parent + Child Diets
        $.each(PRECRIPTION['diettypes'], function(dkey, diet) {
          for (var i = 0; i < $scope.diettypes.length; i++)
          {
            if ($scope.diettypes[i].id == diet.id)
            {
              var childDiets  = $scope.diettypes[i].childDiets;
              var parentDiets = $scope.diettypes[i].parentDiets;
              if (childDiets.length > 0 && parentDiets.length > 0)
              {
                $scope.dietsEditing = true;
                var dietID = diet.id;
                $scope.moveToSelectedChildFn(dietID);
                $scope.setDiet_MO_COUNT(dietID);
                var DietId = "DOpt-"+dietID;

                if(typeof $("#"+ DietId +"")[0] != 'undefined')
                  $("#"+ DietId +"")[0].selected = true;
              }
            }
          }
        });
        //Set Only Child Diets
        $.each(PRECRIPTION['diettypes'], function(dkey, diet) {
          for (var i = 0; i < $scope.diettypes.length; i++)
          {
            if ($scope.diettypes[i].id == diet.id)
            {
              var childDiets  = $scope.diettypes[i].childDiets;
              var parentDiets = $scope.diettypes[i].parentDiets;
              if (childDiets.length <= 0 && parentDiets.length > 0)
              {
                $scope.dietsEditing = true;
                var dietID = diet.id;
                $scope.moveToSelectedChildFn(dietID);
                $scope.setDiet_MO_COUNT(dietID);
                var DietId = "DOpt-"+dietID;

                if(typeof $("#"+ DietId +"")[0] != 'undefined')
                  $("#"+ DietId +"")[0].selected = true;
              }
            }
          }
        });
        //Set Diets with no parents and no childs
        $.each(PRECRIPTION['diettypes'], function(dkey, diet) {
          for (var i = 0; i < $scope.diettypes.length; i++)
          {
            if ($scope.diettypes[i].id == diet.id)
            {
              var childDiets  = $scope.diettypes[i].childDiets;
              var parentDiets = $scope.diettypes[i].parentDiets;
              if (childDiets.length <= 0 && parentDiets.length <= 0)
              {
                $scope.dietsEditing = true;
                var dietID = diet.id;
                $scope.moveToSelectedChildFn(dietID);
                $scope.setDiet_MO_COUNT(dietID);
                var DietId = "DOpt-"+dietID;

                if(typeof $("#"+ DietId +"")[0] != 'undefined')
                  $("#"+ DietId +"")[0].selected = true;
              }
            }
          }
        });
        $(".selectDietType").trigger("change.select2");
        // Set Selected DietTypes
        $.each(PRECRIPTION['diettypes'], function(dkey, diet) {
          var dietID = diet.id;
          $scope.updateFoodItemsBorder(dietID);
        });

        //Set Auto-immune
        if(PRECRIPTION['autoimmune'] == true)
        {
          $('#autoimmuneCheckBox').prop('checked', true);
          $("#autoimmuneCheckBox").trigger("change");
        }

        // Set Never Handle value of level-slider handles
        if(PRECRIPTION['sliderRanges'] != null)
        {
          var NeverHandle          = "";
          var AllowHandle          = "";
          var OccasionallyHandle   = "";
          var TryHandle            = "";
          if(PRECRIPTION['sliderRanges']['Never'] != null && PRECRIPTION['sliderRanges']['Never'].length > 0)
          {
            var NeverHandleLen   = PRECRIPTION['sliderRanges']['Never'].length;
            NeverHandleLen--;
            NeverHandle          = reactionValue.indexOf(PRECRIPTION['sliderRanges']['Never'][NeverHandleLen]);
          }
          else {
              // var NeverHandleLen = 23;
              NeverHandle = 'End';
          }

          // Set Allow Handle value of level-slider handles
          if (PRECRIPTION['sliderRanges']['Allow'] != null && PRECRIPTION['sliderRanges']['Allow'].length > 0)
          {
            AllowHandle           = reactionValue.indexOf(PRECRIPTION['sliderRanges']['Allow'][0]);
            OccasionallyHandle    = reactionValue.indexOf(PRECRIPTION['sliderRanges']['Allow'][0]);
            TryHandle             = reactionValue.indexOf(PRECRIPTION['sliderRanges']['Allow'][0]);
          }
          else {
            AllowHandle = 'Start';
          }

          // Set Occasionally Handle value of level-slider handles
          if (PRECRIPTION['sliderRanges']['Occasionally'] != null && PRECRIPTION['sliderRanges']['Occasionally'].length > 0)
          {
            OccasionallyHandle           = reactionValue.indexOf(PRECRIPTION['sliderRanges']['Occasionally'][0]);
            TryHandle                    = reactionValue.indexOf(PRECRIPTION['sliderRanges']['Occasionally'][0]);
          }
          else if (OccasionallyHandle == "") {
            OccasionallyHandle = 'Start';
          }

          // Set Try Handle value of level-slider handles
          if (PRECRIPTION['sliderRanges']['Try'] != null && PRECRIPTION['sliderRanges']['Try'].length > 0)
          {
            TryHandle           = reactionValue.indexOf(PRECRIPTION['sliderRanges']['Try'][0]);
          }
          else if (TryHandle == "") {
            TryHandle = 'Start';
          }
          levelSlider.noUiSlider.set([NeverHandle, TryHandle, OccasionallyHandle, AllowHandle]);
        }

      }, 300);

    }).error(function(response) {
        console.log(response);
      //Hide Ajax Loader
      $('#pleaseWaitModal').modal('hide');
      alert('This is embarassing. An error has occured. Please check the log for details');
    });
  }

  //*** Populate Panels For Editing Prescription only
  var editPanel_Count = 0;
  $scope.panelInit = function() {
    if($scope.panelEditing == true && $scope.panelsLength >= 0)
    {
      var panels = $("#allergySelectr").select2('data');
      if (editPanel_Count <= panels.length)
      {
        $scope.selectPanel(panels[editPanel_Count]);
        editPanel_Count++;
      }
    }
  }

  $scope.setPanelFoodsColor = function(panelTabID) {
    if($scope.panelEditing == true)
    {
      if(panelTabID == "IgEFoodPanel" )
      {
        var IgEpanelItem = $(".IgEpanelItem");

        $(".IgEpanelItem").each(function(){
          var fid = $(this).attr('fid');
          if(typeof PRECRIPTION.fooditems[fid] != 'undefined')
          {
            var level = PRECRIPTION.getReactionLevel(fid);
            $('li[fid="' + fid + '"]').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
            $('.food-item[id="' + fid + '"]').find('.ListFoodName').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
            level = PRECRIPTION['fooditems'][fid]['reactions']['IgE'];
            if(level != 'IgE0/1' && level != 'IgE1' && level != 'IgE2' && level != 'IgE3' && level != 'IgE4' && level != 'IgE5' && level != 'IgE6' && level != 'IgE7')
            {
              level = 'IgE0';
            }
            $(this).find("select").val(level);
          }

        });
      }

      else if(panelTabID == "IgAFoodPanel" )
      {
        $(".IgAPanelItem").each(function(){
          var fid = $(this).attr('fid');
          if(typeof PRECRIPTION.fooditems[fid] != 'undefined')
          {
            var level = PRECRIPTION.getReactionLevel(fid);
            $('li[fid="' + fid + '"]').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
            $('.food-item[id="' + fid + '"]').find('.ListFoodName').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
            level = PRECRIPTION['fooditems'][fid]['reactions']['IgA'];
            $(this).find("select").val(level);
          }
        });
      }

      else if(panelTabID == "IgGFoodPanel" )
      {
        var IgAPanelItem = $(".IgAPanelItem");
        $(".IgGPanelItem").each(function(){
          var fid = $(this).attr('fid');
          if(typeof PRECRIPTION.fooditems[fid] != 'undefined')
          {
            var level = PRECRIPTION.getReactionLevel(fid);
            $('li[fid="' + fid + '"]').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
            $('.food-item[id="' + fid + '"]').find('.ListFoodName').css("background-color", BACKGROUND_COLOR[REACTION_COLOR_CODE[level]]);
            level = PRECRIPTION['fooditems'][fid]['reactions']['IgG'];
            $(this).find("select").val(level);
          }
        });
      }
    }
  }

  $scope.updateFoodItemsBorder= function(dietTypeId) {
    if($scope.editPrescriptionRecord == true)
    {
      var DietFoodItems = PRECRIPTION['diettypes'][dietTypeId].fooditems;
      for (var i = 0; i < $scope.diettypes.length; i++)
      {
        if ($scope.diettypes[i].id == dietTypeId)
        {
          var diettypeName = $scope.diettypes[i].Name;
          var FoodList = $scope.diettypes[i].FoodItems;
          // Set Selected DietTypes
          $.each(DietFoodItems, function(dkey, food) {
            var fID = food.id;
            for (var j = 0; j < FoodList.length; j++)
            {
              if(FoodList[j]['FID'] ==  fID)
              {
                $scope.diettypes[i].FoodItems[j]['experimentation_level'] = food['exp_level'];
              }
            }
          });
        }
      }
    }

  }

  $scope.setDiet_MO_COUNT= function(dietTypeId) {
    if($scope.editPrescriptionRecord == true)
    {
      var MO_Count = 0;
      var dieExp_level   = PRECRIPTION['diettypes'][dietTypeId].exp_level;
      var FoodList       = PRECRIPTION['diettypes'][dietTypeId].fooditems;
      // Set Counter
      $.each(FoodList, function(fkey, food) {
        var fID = food.id;
        var FoodExpLevel = food['exp_level'];
        if(FoodExpLevel != dieExp_level)
        {
          MO_Count++;
        }
      });
      $('#MO_COUNT-'+dietTypeId).html(MO_Count);
    }
  }


  ///////////////////////////////////////////////////////////
  ////////////**** Delete Patient Diet History Record****///
  /////////////////////////////////////////////////////////
  $scope.confirmDelete = function(id) {
    var isConfirmDelete = confirm('Are you sure you want this record?');
    if (isConfirmDelete) {
      $http({
        method: 'DELETE',
        url: API_URL + 'prescribe/' + id
      }).
      success(function(data) {

        //Remove the row
        //Remove the row
        var rowId = "PH-"+id;
        $scope.PateintHistory_Table.row("#"+rowId).remove().draw();
      }).
      error(function(data) {

        alert('Unable to delete');
      });
    } else {
      return false;
    }
  }

  ///////////////////////////////////////////////////////////
  ////////////**** Delete Patient  ****/////////////////////
  /////////////////////////////////////////////////////////
  $scope.deletePatient = function(id) {

    var id = $scope.selectedPatient.id;
    $scope.staff.id =  STAFFID;

    var isConfirmDelete = confirm('Are you sure you want this record?');
    if (isConfirmDelete) {
      $http({
        method: 'Post',
        url   : API_URL + 'deletePatient/' + id,
        data  : $scope.staff,
      }).
      success(function(data) {

        {
          location.reload();
        }
      }).
      error(function(data) {

        alert('Unable to delete');
      });
    } else {
      return false;
    }
  }

  ///////////////////////////////////////////////////////////
  //*** Update Patient **//
  //////////////////////////////////////////////////////////
  $scope.updatePatient = function() {
    // console.log("$scope.EditPatient: ",$scope.EditPatient);
    // console.log("$scope.selectedPatient: ",$scope.selectedPatient);
    var pid = $scope.selectedPatient['id'];
    pidfileupload = pid;

    //For Unique Image Name
    if (!angular.isUndefined($scope.files)) {

      var oldName = $scope.files[0].name;
      var d = new Date();

      var Picture = d.getTime();

      Picture += ".";
      var str = oldName;
      var n = str.lastIndexOf('.');
      Picture += str.substring(n + 1);
      $scope.EditPatient['image'] = Picture
    } else {
      var Picture = pic;
    }

    var image = {
      Picture: ""
    };
    image['Picture'] = Picture;

    var url = API_URL + "patients/" + pid;


    if (!angular.isUndefined($scope.files))
    {
      //For Uploading image
      var form_data = new FormData();
      angular.forEach($scope.files, function(file)
      {
        form_data.append('file', file);
        form_data.append('id', pid);
        form_data.append('state', 'edit');
      });
      form_data.append('Picture', image['Picture']);
      $http({
        method: 'POST',
        url: '../app/uploadPatient.php',
        data: form_data,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Process-Data': false
        }
      }).success(function(response) {
            //Request for Storing or Updating Record with image
            $http({
              method: 'POST',
              url: url,
              data: $.param($scope.EditPatient),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).success(function(response) {
              var patientresponse = response;
            }).error(function(response) {
              alert('This is embarassing. An error has occured. Please check the log for details');
            });

      }).error(function(response) {
        alert('This is embarassing. An error has occured. Please check the log for details');
      });
    }
    else {
      //Request for Storing or Updating Record without image
      $http({
        method: 'POST',
        url: url,
        data: $.param($scope.EditPatient),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function(response) {
        var patientresponse = response;
      }).error(function(response) {
        alert('This is embarassing. An error has occured. Please check the log for details');
      });
    }
  }


  //Set Select2 of step 0-1
  $('#selectr1').change(function() {
    $("#step0-3").addClass("active");
    $("#step0-1").removeClass("active");
    //console.log($("#selectr1").val());
    var id = $("#selectr1").val();
    $scope.patientDetails(id);
  });

  //Set Select2 of step 0-2
  $('#selectr').change(function() {
    $("#step0-3").addClass("active");
    $("#step0-2").removeClass("active");
    //console.log($("#selectr").val());
    var id = $("#selectr").val();
    $scope.patientDetails(id);
  });

  //Set Select2 of step 0-3
  $('#selectr2').change(function() {
    //console.log($("#selectr2").val());
    var id = $("#selectr2").val();
    $scope.patientDetails(id);
  });

  /////////////////////////////////////////////////////////
  ////*** Get Panel Data (Step 2) ****/////////////////////
  /////////////////////////////////////////////////////////
  intializeAlletess();
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////     intializeAlletess()       ////////////////////////////////
  //Assign random colors to alletess headings, register events to manage reaction colors and columnize //
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  function intializeAlletess() {

    function deselect($selector, idToDeselect) {
      if ($selector.val() !== null) {
        new_data = $.grep($selector.val(), function(id) {
          return id != idToDeselect;
        });
        $selector.val(new_data).trigger('change');
      }
    }

    //Panels Variables

    $scope.panelsLength = 0;
    $scope.IGERecords   = {};
    $scope.IGARecords   = {};
    $scope.IGGRecords   = {};
    $scope.IGElist      = [];
    $scope.IGAlist      = [];
    $scope.IGGlist      = [];
    // var columnizerIgA   = null;
    // var columnizerIgG   = null;
    // var columnizerIgE = null;
    var columnizerIgA = [];
    var columnizerIgG = [];
    var columnizerIgE = [];

    var panelsSelected_Count     = 0;
    var panelsSelected_Count_IGA = 0;
    var panelsSelected_Count_IGG = 0;
    var panelsSelected_Count_IGE = 0;

    $("#allergySelectr").attr("data-placeholder", "Select Panel");
    $('#allergySelectr').select2({});

    //Select Panel on Step1
    $scope.selectPanel = function(panel) {
      $scope.panelsLength--;
      var panelID = panel.id;
      var panelName = $('#POpt' + panelID).attr('panelName');
      var panelType = $('#POpt' + panelID).attr('panelType');

      var html = '<li id="Tab-Head-'+ panelsSelected_Count +'" class="active" tab-panel-id="'+ panelID +'" panelCount="'+ panelsSelected_Count +'">';
      html    += '    <a href="#Tab-Body-'+ panelsSelected_Count +'" data-toggle="tab"> '+ panelName +'  </a>';
      html    += '</li>';
      $('#mytabs').append(html);

      if (panel.title == "IgE") {
        // //Deselects same category option in Select2
        // for (var i = 0; i < $('#IgEGroup')[0]['children'].length; i++) {
        //   var deSelectID = $('#IgEGroup')[0]['children'][i].value;
        //   if (deSelectID != panelID) {
        //     deselect($('#allergySelectr'), deSelectID);
        //     delete $scope.IGERecords;
        //   }
        // }

        //Set Panel
        $(".tabbable-custom").show();
        $(".form-group1").hide();

        for (var i = 0; i < panelsSelected_Count; i++)
        {
          $("#Tab-Head-"+i).removeClass("active");
          $("#Tab-Body-"+i).removeClass("active");
        }


      //Get Panel Data
      $.ajax({
        url: API_URL + 'foodpanelP/' + panelID,
        success: function(response) {
          $scope.IGERecords[panelsSelected_Count_IGE]                  = response;
          $scope.IGERecords[panelsSelected_Count_IGE]['panelid']       = panelID;
          $scope.IGERecords[panelsSelected_Count_IGE]['panelName']     = panelName;
          $scope.IGERecords[panelsSelected_Count_IGE]['panelType']     = panelType;
          $scope.IGERecords[panelsSelected_Count_IGE]['panelCatagory'] = 'IgE';

          var html = '<div class="tab-pane active" id="Tab-Body-'+ panelsSelected_Count +'">';
          if (panelName == "Alletess 25 IgE ImmunoCAP & ImmunoGLOBULINS Report")
          {
            html += '    <div class="row margin-bottom-20" id="SelectFileInput-IGE-'+ panelsSelected_Count_IGE +'">';
            html += '        <div class="col-xs-12 col-md-offset-4">';
            html += '            <div class="fileinput fileinput-new" data-provides="fileinput">';
            html += '                <div class="input-group input-large">';
            html += '                    <div class="form-control uneditable-input input-fixed input-medium" data-trigger="fileinput">';
            html += '                        <i class="fa fa-file fileinput-exists"></i>&nbsp;';
            html += '                        <span class="fileinput-filename"> </span>';
            html += '                    </div>';
            html += '                    <span class="input-group-addon btn default btn-file hideSpanIGE">';
            html += '                        <span class="fileinput-new"> Select file </span>';
            html += '                        <span class="fileinput-exists"> Change </span>';
            html += '                        <input type="file" class="panelfileuploadIGE">';
            html += '                    </span>';
            html += '                    <a href="javascript:;" class="input-group-addon btn red fileinput-exists showSpanIGE" data-dismiss="fileinput"> Remove </a>';
            html += '                </div>';
            html += '            </div>';
            html += '        </div>';
            html += '    </div>';
          }
          html += '    <div class="row">';
          html += '        <div class="Ige12" id="igePanel-'+ panelsSelected_Count_IGE +'">';
          html += '            <div class="scroller" style="height:500px; overflow-y: auto;" data-rail-color="#67809f" data-handle-color="#67809f" data-always-visible="1" data-rail-visible="1" >';
          html += '                <div class="input-icon right" style="padding-bottom:10px;">';
          html += '                    <i class="icon-magnifier"></i>';
          html += '                    <input type="text" style="padding-bottom:10px;" class="search IGESearch form-control" id="IGESearch-'+ panelsSelected_Count_IGE +'" placeholder="search...">';
          html += '                </div>';
          html += '                <div class="col-md-12 col-sm-12 food-Panel" id="IgEFoodPanel-'+ panelsSelected_Count_IGE +'" panelID="'+ panelID +'" panelName="'+ panelName +'" panelType="'+ panelType +'">';
          html += '<div class=" food-panel-cat">';
          html += '    <ul class="list-group list" id="IgEList">';
          html += '      <div class="dontend"></div>';
          for (var i = 0; i < $scope.IGERecords[panelsSelected_Count_IGE].length; i++)
          {
            html += '<li class="list-group-item IgEpanelItem" panelItemID="' + $scope.IGERecords[panelsSelected_Count_IGE][i]['id'] + '" catID="' + $scope.IGERecords[panelsSelected_Count_IGE][i]['CatID'] + '" fID="' + $scope.IGERecords[panelsSelected_Count_IGE][i]['foodID'] + '">';
            html += '<form class="form-horizontal" role="form">';
            html += '  <div class="form-body">';
            html += '    <div class="form-group">';
            // style="padding: 3px 0px;"
            html += '      <label class="col-md-3 control-label name" style="padding: 3px 0px;"> ' + $scope.IGERecords[panelsSelected_Count_IGE][i]['foodName'] + ' </label>';
            html += '      <div class="col-md-9">';
            // style="padding-left:0px; padding-right:0px;"
            html += '        <div class="pull-right">';
            html += '          <select onchange="changeColor(this);" class="form-control input-xs ig-type IgESelector" placeholder="IgA">';
            html += '              <option color="0" value="IgE0" selected>IgE0</option>';
            html += '              <option color="5" value="IgE0/1">IgE0/1</option>';
            html += '              <option color="5" value="IgE1">IgE1</option>';
            html += '              <option color="5" value="IgE2">IgE2</option>';
            html += '              <option color="5" value="IgE3">IgE3</option>';
            html += '              <option color="5" value="IgE4">IgE4</option>';
            html += '              <option color="5" value="IgE5">IgE5</option>';
            html += '              <option color="5" value="IgE6">IgE6</option>';
            html += '              <option color="5" value="IgE7">IgE7</option>';
            html += '          </select>';
            html += '        </div>';
            html += '      </div>';
            html += '    </div>';
            html += '  </div>';
            html += '</form>';
            html += '</li>';
          }
          html += '</ul>';
          html += '</div>';
          html += '                    <!-- Panel Populated from UserPrescibeController -->';
          html += '                </div>';
          html += '            </div>';
          html += '            <!-- End OF IGE -->';
          html += '        </div>';
          html += '    </div>';
          html += '</div>';

          $('#tabs-body').append(html);

          //Set Panel Attributes
          $('#IgEFoodPanel-'+ panelsSelected_Count_IGE).attr('panelID', panelID);
          $('#IgEFoodPanel-'+ panelsSelected_Count_IGE).attr('panelName', panelName);
          $('#IgEFoodPanel-'+ panelsSelected_Count_IGE).attr('panelType', panelType);


          columnizerIgE[panelsSelected_Count_IGE] = $('#IgEFoodPanel-'+ panelsSelected_Count_IGE).columnize({
            width: 250,
            buildOnce: true,
            doneFunc: function() {
              // $scope.IGElist = [];
              var count = 0;
              setTimeout(function()
              {
                // var panelCounter              = panelsSelected_Count - 1;
                var panelCounter              = panelsSelected_Count_IGE - 1;
                $scope.IGElist[panelID]       = [];
                for (var i = 0; i < columnizerIgE[panelCounter][0]['childNodes'].length; i++)
                {
                  for (var j = 0; j < columnizerIgE[panelCounter][0]['childNodes'][i]['children'].length; j++)
                  {
                    var divID = "IGE"+ i + j + panelCounter;
                    columnizerIgE[panelCounter][0]['childNodes'][i]['children'][j]['id'] = divID;
                    var checkULExists = false;
                    for (var k = 0; k < $('#'+divID)[0]['childNodes'].length; k++)
                    {
                      if($('#'+divID)[0]['childNodes'][k]['tagName'] == "UL")
                      {
                        checkULExists = true;
                      }
                    }

                    if(checkULExists == true)
                    {
                      var options = {
                        valueNames: ['name']
                      };
                      var IGELIST = new List(divID, options);
                      $scope.IGElist[panelID][count] = IGELIST;
                      count++;
                    }
                  }
                }

                //Search IGE Columnizer
                $("#IGESearch-"+panelCounter).keyup(function(e){
                  for (var i = 0; i < $scope.IGElist[panelID].length; i++)
                  {
                    var IGElist =  $scope.IGElist[panelID][i];
                    IGElist.search($(this).val());
                  }
                });

                // File Upload Of IgE Panel //////////
                $scope.checkSpanToggleIGE = 0;
                $('.panelfileuploadIGE').on('change', function(){

                        if($scope.checkSpanToggleIGE == 0)
                        {
                          $(".hideSpanIGE").hide();
                          $scope.checkSpanToggleIGE = 1;
                        }
                        else if($scope.checkSpanToggleIGE == 2){
                          $scope.checkSpanToggleIGE = 0;
                        }

                      });
                $('.showSpanIGE').on('click', function(){
                        $(".hideSpanIGE").show();
                        $scope.checkSpanToggleIGE = 2;
                    });
                $('.panelfileuploadIGE').on('change', prepareUpload);
              }, 100);
              $scope.setPanelFoodsColor("IgEFoodPanel");
              $scope.panelInit();
            }
          });
          //Num of IGE panels Selected
          panelsSelected_Count_IGE++;
          //Ending of Success Fn
          },
          async: false
        //Ending os Ajax Call
        });
      }

      if (panel.title == "IgA") {

        // //Deselects same category
        // for (var i = 0; i < $('#IgAGroup')[0]['children'].length; i++) {
        //   var deSelectID = $('#IgAGroup')[0]['children'][i].value;
        //   if (deSelectID != panelID) {
        //     deselect($('#allergySelectr'), deSelectID);
        //     delete $scope.IGARecords;
        //   }
        // }

        //Set Panel
        $(".tabbable-custom").show();
        $(".form-group1").hide();

        for (var i = 0; i < panelsSelected_Count; i++)
        {
          $("#Tab-Head-"+i).removeClass("active");
          $("#Tab-Body-"+i).removeClass("active");
        }

      //Get Panel Data
      $.ajax({
        url: API_URL + 'foodpanelP/' + panelID,
        success: function(response) {
          $scope.IGARecords[panelsSelected_Count_IGA]                   = response;
          $scope.IGARecords[panelsSelected_Count_IGA]['panelid']        = panelID;
          $scope.IGARecords[panelsSelected_Count_IGA]['panelName']      = panelName;
          $scope.IGARecords[panelsSelected_Count_IGA]['panelType']      = panelType;
          $scope.IGARecords[panelsSelected_Count_IGA]['panelCatagory']  = 'IgA';
          //console.log('$scope.IGARecords[panelsSelected_Count]: ', $scope.IGARecords[panelsSelected_Count]);

          var html = '<div class="tab-pane active" id="Tab-Body-'+ panelsSelected_Count +'">';
          html += '    <div class="row">';
          html += '        <div class="Iga12" id="igaPanel-'+ panelsSelected_Count_IGA +'">';
          html += '            <div class="scroller" style="height:500px; overflow-y: auto;" data-rail-color="#67809f" data-handle-color="#67809f" data-always-visible="1" data-rail-visible="1" >';
          html += '                <div class="input-icon right" style="padding-bottom:10px;">';
          html += '                    <i class="icon-magnifier"></i>';
          html += '                    <input type="text" style="padding-bottom:10px;" class="search IGASearch form-control" id="IGASearch-'+ panelsSelected_Count_IGA +'" placeholder="search...">';
          html += '                </div>';
          html += '                <div class="col-md-12 col-sm-12 food-Panel" id="IgAFoodPanel-'+ panelsSelected_Count_IGA +'" panelID="'+ panelID +'" panelName="'+ panelName +'" panelType="'+ panelType +'">';
          for (var i = 0; i < $scope.IGARecords[panelsSelected_Count_IGA].length; i++)
          {
            html += '<div class="food-panel-cat">';
            html += '<h3 class="uppercase dontend" style="color:#fff; background:' + $scope.IGARecords[panelsSelected_Count_IGA][i]['Category'][0]['Color'] + '">' + $scope.IGARecords[panelsSelected_Count_IGA][i]['Category'][0]['Name'] + '</h3>';
            html += '    <ul class="list-group list">';
            html += '      <div class="dontend"></div>';
            for (var j = 0; j < $scope.IGARecords[panelsSelected_Count_IGA][i]['FoodItems'].length; j++) {
              html += '      <li class="list-group-item IgAPanelItem" panelItemID="' + $scope.IGARecords[panelsSelected_Count_IGA][i]['FoodItems'][j]['id'] + '" catID="' + $scope.IGARecords[panelsSelected_Count_IGA][i]['Category'][0]['id'] + '" fID="' + $scope.IGARecords[panelsSelected_Count_IGA][i]['FoodItems'][j]['FID'] + '">';
              html += '        <form class="form-horizontal" role="form">';
              html += '          <div class="form-body">';
              html += '            <div class="form-group">';
              html += '              <label class="col-md-8 control-label name">' + $scope.IGARecords[panelsSelected_Count_IGA][i]['FoodItems'][j]['Name'] + '</label>';
              html += '              <div class="col-md-3">';
              html += '                <div class="pull-right">';
              html += '                  <select onchange="changeColor(this);" class="form-control input-xs ig-type IgASelector" placeholder="IgA">';
              html += '                      <option color="0" value="IgA0" selected>IgA0</option>';
              html += '                      <option color="1" value="IgA1">IgA1</option>';
              html += '                      <option color="2" value="IgA2">IgA2</option>';
              html += '                      <option color="3" value="IgA3">IgA3</option>';
              html += '                      <option color="4" value="IgA4">IgA4</option>';
              html += '                      <option color="4" value="IgA5">IgA5</option>';
              html += '                      <option color="4" value="IgA6">IgA6</option>';
              html += '                      <option color="4" value="IgA7">IgA7</option>';
              html += '                  </select>';
              html += '                </div>';
              html += '              </div>';
              html += '            </div>';
              html += '          </div>';
              html += '        </form>';
              html += '      </li>';
            }
            html += '    </ul>';
            html += '</div>';
          }
          html += '                    <!-- Panel Populated from UserPrescibeController -->';
          html += '                </div>';
          html += '            </div>';
          html += '            <!-- End OF IGE -->';
          html += '        </div>';
          html += '    </div>';
          html += '</div>';

          $('#tabs-body').append(html);
          // $('#IgAFoodPanel').append(html);

          //Set Panel Attributes
          $('#IgAFoodPanel-'+ panelsSelected_Count_IGA).attr('panelID', panelID);
          $('#IgAFoodPanel-'+ panelsSelected_Count_IGA).attr('panelName', panelName);
          $('#IgAFoodPanel-'+ panelsSelected_Count_IGA).attr('panelType', panelType);

          columnizerIgA[panelsSelected_Count_IGA] = $('#IgAFoodPanel-'+ panelsSelected_Count_IGA).columnize({
            width: 250,
            buildOnce: true,
            doneFunc: function() {
              // $scope.IGAlist = [];
              var count = 0;
              setTimeout(function()
              {
                // var panelCounter              = panelsSelected_Count - 1;
                var panelCounter              = panelsSelected_Count_IGA;
                $scope.IGAlist[panelID]       = [];
                for (var i = 0; i < columnizerIgA[panelCounter][0]['childNodes'].length; i++)
                {
                  for (var j = 0; j < columnizerIgA[panelCounter][0]['childNodes'][i]['children'].length; j++)
                  {
                    var divID = "IGA"+ i + j + panelCounter;
                    columnizerIgA[panelCounter][0]['childNodes'][i]['children'][j]['id'] = divID;
                    var checkULExists = false;
                    for (var k = 0; k < $('#'+divID)[0]['childNodes'].length; k++)
                    {
                      if($('#'+divID)[0]['childNodes'][k]['tagName'] == "UL")
                      {
                        checkULExists = true;
                      }
                    }

                    if(checkULExists == true)
                    {
                      var options = {
                        valueNames: ['name']
                      };
                      var IGALIST = new List(divID, options);
                      $scope.IGAlist[panelID][count] = IGALIST;
                      count++;
                    }
                  }
                }

                //Search IGE Columnizer
                $("#IGASearch-"+panelCounter).keyup(function(){
                  for (var i = 0; i < $scope.IGAlist[panelID].length; i++)
                  {
                    var IGAlist =  $scope.IGAlist[panelID][i];
                    IGAlist.search($(this).val());
                  }
                });

                //Num of IGA panels Selected
                panelsSelected_Count_IGA++;
                $scope.setPanelFoodsColor("IgAFoodPanel");
                $scope.panelInit();
              }, 100);
            }
          });
        //Ending os Success Fn
        },
        async: false
      //Ending of Ajax Call
      });

      }

      if (panel.title == "IgG") {

        //Set Panel
        $(".tabbable-custom").show();
        $(".form-group1").hide();

        for (var i = 0; i < panelsSelected_Count; i++)
        {
          $("#Tab-Head-"+i).removeClass("active");
          $("#Tab-Body-"+i).removeClass("active");
        }

      //Get Panel Data
      $.ajax({
        url: API_URL + 'foodpanelP/' + panelID,
        success: function(response) {
          $scope.IGGRecords[panelsSelected_Count_IGG]                  = response;
          $scope.IGGRecords[panelsSelected_Count_IGG]['panelid']       = panelID;
          $scope.IGGRecords[panelsSelected_Count_IGG]['panelName']     = panelName;
          $scope.IGGRecords[panelsSelected_Count_IGG]['panelType']     = panelType;
          $scope.IGGRecords[panelsSelected_Count_IGG]['panelCatagory'] = 'IgG';

          var html = '<div class="tab-pane active" id="Tab-Body-'+ panelsSelected_Count +'">';
          if (panelName == 'Alletess IgG ELISA 184 Food Panel')
          {
            html += '    <div class="row margin-bottom-20" id="SelectFileInput-IGG-'+ panelsSelected_Count_IGG +'">';
            html += '        <div class="col-xs-12 col-md-offset-4">';
            html += '            <div class="fileinput fileinput-new" data-provides="fileinput">';
            html += '                <div class="input-group input-large">';
            html += '                    <div class="form-control uneditable-input input-fixed input-medium" data-trigger="fileinput">';
            html += '                        <i class="fa fa-file fileinput-exists"></i>&nbsp;';
            html += '                        <span class="fileinput-filename"> </span>';
            html += '                    </div>';
            html += '                    <span class="input-group-addon btn default btn-file hideSpanIGG">';
            html += '                        <span class="fileinput-new"> Select file </span>';
            html += '                        <span class="fileinput-exists"> Change </span>';
            html += '                        <input type="file" class="panelfileuploadIGG">';
            html += '                    </span>';
            html += '                    <a href="javascript:;" class="input-group-addon btn red fileinput-exists showSpanIGG" data-dismiss="fileinput"> Remove </a>';
            html += '                </div>';
            html += '            </div>';
            html += '        </div>';
            html += '    </div>';
          }
          html += '    <div class="row">';
          html += '        <div class="igg128" id="iggPanel-'+ panelsSelected_Count_IGG +'">';
          html += '            <div class="scroller" style="height:500px; overflow-y: auto;" data-rail-color="#67809f" data-handle-color="#67809f" data-always-visible="1" data-rail-visible="1" >';
          html += '                <div class="input-icon right" style="padding-bottom:10px;">';
          html += '                    <i class="icon-magnifier"></i>';
          html += '                    <input type="text" style="padding-bottom:10px;" class="search IGGSearch form-control" id="IGGSearch-'+ panelsSelected_Count_IGG +'" placeholder="search...">';
          html += '                </div>';
          html += '                <div class="col-md-12 col-sm-12 food-Panel" id="IgGFoodPanel-'+ panelsSelected_Count_IGG +'" panelID="'+ panelID +'" panelName="'+ panelName +'" panelType="'+ panelType +'">';
          if (typeof $scope.IGGRecords[panelsSelected_Count_IGG][0]['CatID'] == 'undefined')
          {
            for (var i = 0; i < $scope.IGGRecords[panelsSelected_Count_IGG].length; i++)
            {
              html += '<div class=" food-panel-cat">';
              html += '<h3 class="uppercase dontend" style="color:#fff; background:' + $scope.IGGRecords[panelsSelected_Count_IGG][i]['Category'][0]['Color'] + '">' + $scope.IGGRecords[panelsSelected_Count_IGG][i]['Category'][0]['Name'] + '</h3>';
              html += '    <ul class="list-group list">';
              html += '      <div class="dontend"></div>';
              for (var j = 0; j < $scope.IGGRecords[panelsSelected_Count_IGG][i]['FoodItems'].length; j++) {
                html += '      <li class="list-group-item IgGPanelItem" panelItemID="' + $scope.IGGRecords[panelsSelected_Count_IGG][i]['FoodItems'][j]['id'] + '" catID="' + $scope.IGGRecords[panelsSelected_Count_IGG][i]['Category'][0]['id'] + '" fID="' + $scope.IGGRecords[panelsSelected_Count_IGG][i]['FoodItems'][j]['FID'] + '">';
                html += '        <form class="form-horizontal" role="form">';
                html += '          <div class="form-body">';
                html += '            <div class="form-group">';
                html += '              <label class="col-md-8 control-label name">' + $scope.IGGRecords[panelsSelected_Count_IGG][i]['FoodItems'][j]['Name'] + '</label>';
                html += '              <div class="col-md-3">';
                html += '                <div class="pull-right">';
                html += '                  <select onchange="changeColor(this);" class="form-control input-xs ig-type IgGSelector" placeholder="IgA">';
                html += '                      <option color="0" value="IgG0" selected>IgG0</option>';
                html += '                      <option color="1" value="IgG1">IgG1</option>';
                html += '                      <option color="2" value="IgG2">IgG2</option>';
                html += '                      <option color="3" value="IgG3">IgG3</option>';
                html += '                      <option color="4" value="IgG4">IgG4</option>';
                html += '                      <option color="4" value="IgG5">IgG5</option>';
                html += '                      <option color="4" value="IgG6">IgG6</option>';
                html += '                      <option color="4" value="IgG7">IgG7</option>';
                html += '                  </select>';
                html += '                </div>';
                html += '              </div>';
                html += '            </div>';
                html += '          </div>';
                html += '        </form>';
                html += '      </li>';
              }
              html += '    </ul>';
              html += '</div>';

              // $('#IgGFoodPanel').append(html);
            }
          }
          else if ($scope.IGGRecords[panelsSelected_Count_IGG][0]['CatID'] == null)
          {
            html += '<div class=" food-panel-cat">';
            html += '    <ul class="list-group list">';
            html += '      <div class="dontend"></div>';
            for (var j = 0; j < $scope.IGGRecords[panelsSelected_Count_IGG].length; j++)
            {
              html += '      <li class="list-group-item IgGPanelItem" panelItemID="' + $scope.IGGRecords[panelsSelected_Count_IGG][j]['id'] + '" catID="' + $scope.IGGRecords[panelsSelected_Count_IGG][j]['CatID'] + '" fID="' + $scope.IGGRecords[panelsSelected_Count_IGG][j]['foodID'] + '">';
              html += '        <form class="form-horizontal" role="form">';
              html += '          <div class="form-body">';
              html += '            <div class="form-group">';
              html += '              <label class="col-md-5 control-label name">' + $scope.IGGRecords[panelsSelected_Count_IGG][j]['foodName'] + '</label>';
              html += '              <div class="col-md-7">';
              html += '                <div class="pull-right">';
              html += '                  <select onchange="changeColor(this);" class="form-control input-xs ig-type IgGSelector" placeholder="IgA">';
              html += '                      <option color="0" value="IgG0" selected>IgG0</option>';
              html += '                      <option color="1" value="IgG1">IgG1</option>';
              html += '                      <option color="2" value="IgG2">IgG2</option>';
              html += '                      <option color="3" value="IgG3">IgG3</option>';
              html += '                      <option color="4" value="IgG4">IgG4</option>';
              html += '                      <option color="4" value="IgG5">IgG5</option>';
              html += '                      <option color="4" value="IgG6">IgG6</option>';
              html += '                      <option color="4" value="IgG7">IgG7</option>';
              html += '                  </select>';
              html += '                </div>';
              html += '              </div>';
              html += '            </div>';
              html += '          </div>';
              html += '        </form>';
              html += '      </li>';
            }
            html += '    </ul>';
            html += '</div>';

            // $('#IgGFoodPanel').append(html);
          }
          html += '                    <!-- Panel Populated from UserPrescibeController -->';
          html += '                </div>';
          html += '            </div>';
          html += '            <!-- End OF IGE -->';
          html += '        </div>';
          html += '    </div>';
          html += '</div>';

          $('#tabs-body').append(html);

          //Set Panel Attributes
          $('#IgGFoodPanel-'+ panelsSelected_Count_IGG).attr('panelID', panelID);
          $('#IgGFoodPanel-'+ panelsSelected_Count_IGG).attr('panelName', panelName);
          $('#IgGFoodPanel-'+ panelsSelected_Count_IGG).attr('panelType', panelType);

          //Columinizer Function
          columnizerIgG[panelsSelected_Count_IGG] = $('#IgGFoodPanel-'+ panelsSelected_Count_IGG).columnize({
            width: 250,
            buildOnce: true,
            doneFunc: function() {
              // $scope.IGGlist = [];
              var count = 0;
              setTimeout(function()
              {
                // var panelCounter              = panelsSelected_Count - 1;
                var panelCounter              = panelsSelected_Count_IGG;
                $scope.IGGlist[panelID]       = [];
                for (var i = 0; i < columnizerIgG[panelCounter][0]['childNodes'].length; i++)
                {
                  for (var j = 0; j < columnizerIgG[panelCounter][0]['childNodes'][i]['children'].length; j++)
                  {
                    var divID = "IGG"+ i + j + panelCounter;
                    columnizerIgG[panelCounter][0]['childNodes'][i]['children'][j]['id'] = divID;
                    var checkULExists = false;
                    for (var k = 0; k < $('#'+divID)[0]['childNodes'].length; k++)
                    {
                      if($('#'+divID)[0]['childNodes'][k]['tagName'] == "UL")
                      {
                        checkULExists = true;
                      }
                    }

                    if(checkULExists == true)
                    {
                      var options = {
                        valueNames: ['name']
                      };
                      var IGGLIST = new List(divID, options);
                      $scope.IGGlist[panelID][count] = IGGLIST;
                      count++;
                    }
                  }
                }

                //Search IGG Columnizer
                $("#IGGSearch-"+panelCounter).keyup(function(){
                  for (var i = 0; i < $scope.IGGlist[panelID].length; i++)
                  {
                    var IGGlist =  $scope.IGGlist[panelID][i];
                    IGGlist.search($(this).val());
                  }
                });

                // File Upload Of IgG Panel //////////
                $scope.checkSpanToggle = 0;
                $('.panelfileuploadIGG').on('change', function(){
                        if($scope.checkSpanToggle == 0)
                        {
                          $(".hideSpanIGG").hide();
                          $scope.checkSpanToggle = 1;
                        }
                        else if($scope.checkSpanToggle == 2){
                          $scope.checkSpanToggle = 0;
                        }
                      });
                $('.showSpanIGG').on('click', function(){
                        $(".hideSpanIGG").show();
                        $scope.checkSpanToggle = 2;
                    });
                $('.panelfileuploadIGG').on('change', prepareUpload);

                //Num of IGG panels Selected
                panelsSelected_Count_IGG++;

                $scope.setPanelFoodsColor("IgGFoodPanel");
                $scope.panelInit();
              }, 100);
            }
          });
          //Ending os Success Fn
          },
          async: false
        //Ending of Ajax Call
        });
      }
      //Total Num of panels Selected
      panelsSelected_Count++;
    //End of selectPanel Fn
    }

    $('#allergySelectr').on('select2:select', function(e) {
      // console.log("selecte: ",e);
      $scope.panelEditing = false;
      var panel = e.params.data;
      $scope.selectPanel(panel);
    });

    $('#allergySelectr').on('select2:unselect', function(e) {
      var panel = e.params.data;
      var panelID = panel.id;
      // panelsSelected_Count--;
      var panelCount = $("li[tab-panel-id='"+ panelID +"']").attr('panelCount');

      if (panel.title == "IgA") {
        $(".tabbable-custom").show();
        $(".form-group1").hide();
        // $("#igaPanel-"+panelCount).hide();
        // $("#Tab-Head-"+panelCount).hide();
        // $("#Tab-Head-"+panelCount).removeClass("active");
        // $("#Tab-Body-"+panelCount).removeClass("active");
        $("#Tab-Head-"+panelCount).remove();
        $("#Tab-Body-"+panelCount).remove();
        delete $scope.IGARecords[panelCount];
        //console.log('iga: ', PRECRIPTION.fooditems.length);
        $.each(PRECRIPTION.fooditems, function(key, Food)
        {
          var Fid = Food['id'];
          //FOODS_REACTION Array
          FOODS_REACTION_SETTED = [];
          changeColor_IngLookUp(Fid,'IgA0');
          Food['reactions']['IgA'] = 'IgA0';
          var reactLevel = Food['reactions']['Level'];
          if (reactLevel === 'IgA1' || reactLevel == 'IgA2' || reactLevel == 'IgA3' || reactLevel == 'IgA4' || reactLevel == 'IgA5' || reactLevel == 'IgA6' || reactLevel == 'IgA7')
          {
            PRECRIPTION.setReaction(Fid,'IgA0');
          }
        })
      }


      if (panel.title == "IgG") {
        $(".tabbable-custom").show();
        $(".form-group1").hide();
        $("#Tab-Head-"+panelCount).remove();
        $("#Tab-Body-"+panelCount).remove();
        delete $scope.IGGRecords[panelCount];
        $.each(PRECRIPTION.fooditems, function(key, Food)
        {
          var Fid = Food['id'];
          //FOODS_REACTION Array
          FOODS_REACTION_SETTED = [];
          changeColor_IngLookUp(Fid,'IgG0');
          Food['reactions']['IgG'] = 'IgG0';
          var reactLevel = Food['reactions']['Level'];
          if (reactLevel === 'IgG1' || reactLevel == 'IgG2' || reactLevel == 'IgG3' || reactLevel == 'IgG4' || reactLevel == 'IgG5' || reactLevel == 'IgG6' || reactLevel == 'IgG7')
          {
            PRECRIPTION.setReaction(Fid,'IgA0');
          }
        })
      }

      if (panel.title == "IgE") {
        $(".tabbable-custom").show();
        $(".form-group1").hide();
        $("#Tab-Head-"+panelCount).remove();
        $("#Tab-Body-"+panelCount).remove();
        delete $scope.IGERecords[panelCount];
        $.each(PRECRIPTION.fooditems, function(key, Food)
        {
          var Fid = Food['id'];
          //FOODS_REACTION Array
          FOODS_REACTION_SETTED = [];
          changeColor_IngLookUp(Fid,'IgG0');
          Food['reactions']['IgE'] = 'IgG0';
          var reactLevel = Food['reactions']['Level'];
          if (reactLevel === 'IgE0/1' || reactLevel == 'IgE1' || reactLevel == 'IgE2' || reactLevel == 'IgE3' || reactLevel == 'IgE4' || reactLevel == 'IgE5' || reactLevel == 'IgE6' || reactLevel == 'IgE7')
          {
            PRECRIPTION.setReaction(Fid,'IgA0');
          }
        })
      }

    });
  }




  ////////////////////////////////////////////////////////////////////
  //** Dietype Step 3 Moving List (moveToSelected function) ****//////
  ///////////////////////////////////////////////////////////////////
  function formatItems (state) {
    var iid = state.id;
    var checkChilds = false;
    for (var i = 0; i < $scope.diettypes.length; i++)
    {
      if ($scope.diettypes[i].id == iid)
      {
        //$scope.moveToSelectedChildFn(iid);
        childDiets = $scope.diettypes[i].childDiets;
        if(childDiets.length >0)
        {
          checkChilds  = true;
        }

        break;
      }
    }

    if(checkChilds == true)
    {
      var $state = $(
        '<span><i class="fa fa-check select2-checks"></i>' + state.text + '<span class="label label-warning" style="float:right;"> Group/Macro </span></span>'
      );


    }
    else
    {
      var $state = $(
        '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
      );
    }


    return $state;
  };


  //function formatItems (state) {
  //console.log(state.id);
  //  var $state = $(
  // '<span><i class="fa fa-check select2-checks"></i>' + state.text + '</span>'
  // );
  // return $state;
  //};

  $(".selectDietType").select2({
    placeholder: "Select Food Filters ",
    templateResult: formatItems
  });

  $('.selectDietType').on('select2:select', function(e)
  {
    var dietId = e.params.data.id;
    $scope.moveToSelected(dietId);
  });

  //** UnSelect Function of diet Types Select2's
  $('.selectDietType').on('select2:unselect', function(e)
  {
    var dietID = e.params.data.id;
    $scope.moveBackSelected(dietID);
  });

  //Move Selected Diet Parent Function
  $scope.moveToSelected = function(dietId) {

    var iid = dietId;
    for (var i = 0; i < $scope.diettypes.length; i++)
    {
      if ($scope.diettypes[i].id == iid)
      {
        $scope.moveToSelectedChildFn(iid);
        var childDiets = $scope.diettypes[i].childDiets;
        var dietName = $scope.diettypes[i].Name;
        break;
      }
    }
    //Move Child Diets too
    if(childDiets.length>0)
    {
      for (var i = 0; i < childDiets.length; i++)
      {
        var childID = childDiets[i].DTIDC;

        for (var j = 0; j < $scope.diettypes.length; j++)
        {
          if ($scope.diettypes[j].id == childID)
          {
            if($scope.diettypes[j].selected != "true")
            {
              $scope.moveToSelectedChildFn(childID);
              var DietId = "DOpt-"+childID;
              $("#"+ DietId +"")[0].selected = true;
            }
            else
            {
              var DTitem = $('#'+childID).find('.chidSpan');
              var Html = '<kbd class="more parentSpan-'+ iid +'" style="margin-left:3px; margin-right:4px;">'+ dietName +'</kbd>';
              DTitem.append(Html);
            }
          }
        }
      }
      $(".selectDietType").trigger("change.select2");
    }
  }

  //Move Selected Diet Child Function
  $scope.moveToSelectedChildFn = function(dietTypeId) {

    var iid = dietTypeId;
    //console.log('iid',iid);

    for (var i = 0; i < $scope.diettypes.length; i++) {
      // console.log('$scope.diettypes',$scope.diettypes);
      if ($scope.diettypes[i].id == iid) {
        var value = $scope.diettypes[i].Name;
        var experimentation_level = $scope.diettypes[i].experimentation_level;
        var childDiets = $scope.diettypes[i].childDiets;
        var parentDiets = $scope.diettypes[i].parentDiets;
        $scope.diettypes[i].selected = "true";
      }
    }
    //If PRECRIPTION is being Edited
    if($scope.dietsEditing == true)
    {
      var value = PRECRIPTION['diettypes'][iid].name;
      var experimentation_level = PRECRIPTION['diettypes'][iid].exp_level;
      $scope.dietsEditing = false;
      for (var i = 0; i < $scope.diettypes.length; i++) {
        if ($scope.diettypes[i].id == iid) {
          $scope.diettypes[i].experimentation_level = experimentation_level;
        }
      }
    }




    SELECTED_TEMPLATE = '<div class="list-group-item listDiv" id="'+ iid + '"><span class="filter" style="padding: 2px 5px;">' + value + '</span>';
    if (childDiets.length > 0)
    {
      SELECTED_TEMPLATE += '<a class="openModalBtn" id="highlight" ng-click="toggleHighlight(' + iid + ')" style="margin-left:20px; text-decoration:none;">View Sub Diet Types</a>';
    }
    SELECTED_TEMPLATE += '<span class="pull-right">';
    SELECTED_TEMPLATE += '<i class="fa fa-remove font-red closeBtn" id="closeBtn1" style="float:right" ng-click="moveBackSelected(' + iid + ')"></i>';
    SELECTED_TEMPLATE += '<a class="openModalBtn" id="openModalBtn1" ng-click="openFoodList(' + iid + ')"><i class="fa fa-eye font-blue-hoki" style="float:right;margin-right:10px;" ></i></a>';
    SELECTED_TEMPLATE += '</span>';
    SELECTED_TEMPLATE += '<div class="row">';
    SELECTED_TEMPLATE += '<div class="col-md-12 col-xs-12" id="diet-types-options">';
    SELECTED_TEMPLATE += '<label class="mt-radio col-md-2 col-xs-8 col-sm-2">';
    if (experimentation_level == "Never") {
      SELECTED_TEMPLATE += '<input class="rbtn" type="radio" name="' + iid + '" id="optionsRadios4" value="Never" ng-click="updateDietType(' + iid + ',1)" checked>Never';
    } else {
      SELECTED_TEMPLATE += '<input class="rbtn" type="radio" name="' + iid + '" id="optionsRadios4" value="Never" ng-click="updateDietType(' + iid + ',1)">Never';
    }

    SELECTED_TEMPLATE += '<span></span>';
    SELECTED_TEMPLATE += '  </label>';
    SELECTED_TEMPLATE += '<label class="mt-radio col-md-2 col-xs-8 col-sm-2">';
    if (experimentation_level == "No") {
      SELECTED_TEMPLATE += '<input class="rbtn1" type="radio" name="' + iid + '" id="optionsRadios3" value="No" ng-click="updateDietType(' + iid + ',2)" checked>No';
    } else {
      SELECTED_TEMPLATE += '<input class="rbtn1" type="radio" name="' + iid + '" id="optionsRadios3" value="No" ng-click="updateDietType(' + iid + ',2)">No';
    }

    SELECTED_TEMPLATE += '<span></span>';
    SELECTED_TEMPLATE += '  </label>';
    SELECTED_TEMPLATE += '  <label class="mt-radio col-md-2 col-xs-8 col-sm-2">';
    if (experimentation_level == "Try") {
      SELECTED_TEMPLATE += '  <input class="rbtn2" type="radio" name="' + iid + '" id="optionsRadios5" checked value="Try" ng-click="updateDietType(' + iid + ',3)" checked="checked">Try';
    } else {
      SELECTED_TEMPLATE += '  <input class="rbtn2" type="radio" name="' + iid + '" id="optionsRadios5" value="Try" ng-click="updateDietType(' + iid + ',3)">Try';
    }

    SELECTED_TEMPLATE += '  <span></span>';
    SELECTED_TEMPLATE += '  </label>';
    SELECTED_TEMPLATE += '  <label class="mt-radio col-md-3 col-xs-8 col-sm-3">';
    if (experimentation_level == "Occasionally") {
      SELECTED_TEMPLATE += '  <input class="rbtn3" type="radio" name="' + iid + '" id="optionsRadios6"  value="Occasionally" ng-click="updateDietType(' + iid + ',4)" checked> Occasionally';
    } else {
      SELECTED_TEMPLATE += '  <input class="rbtn3" type="radio" name="' + iid + '" id="optionsRadios6"  value="Occasionally" ng-click="updateDietType(' + iid + ',4)"> Occasionally';
    }

    SELECTED_TEMPLATE += '  <span></span>';
    SELECTED_TEMPLATE += '  </label>';
    SELECTED_TEMPLATE += '  <label class="mt-radio col-md-2 col-xs-8 col-sm-2">';
    if (experimentation_level == "Allow") {
      SELECTED_TEMPLATE += '  <input class="rbtn4" type="radio" name="' + iid + '" id="optionsRadios7" value="Allow" ng-click="updateDietType(' + iid + ',5)" checked> Allow';
    } else {
      SELECTED_TEMPLATE += '  <input class="rbtn4" type="radio" name="' + iid + '" id="optionsRadios7" value="Allow" ng-click="updateDietType(' + iid + ',5)"> Allow';
    }

    SELECTED_TEMPLATE += '  <span></span>';
    SELECTED_TEMPLATE += '  </label>';
    SELECTED_TEMPLATE += '  </div>';
    if (parentDiets.length > 0)
    {
      SELECTED_TEMPLATE += '<span class="col-xs-12 col-md-9 chidSpan">Parent Diets:';
      for (var i = 0; i < parentDiets.length; i++)
      {
        for (var j = 0; j < $scope.diettypes.length; j++)
        {
          if ($scope.diettypes[j].id == parentDiets[i]['DTIDP'])
          {
            if ($scope.diettypes[j].selected == "true")
            {
              SELECTED_TEMPLATE += '<kbd class="bg-blue-hoki more parentSpan-'+ parentDiets[i]['DTIDP'] +'" style="margin-left:3px; margin-right:4px;padding: 5px;">'+ parentDiets[i]['Name'] +'</kbd>';
            }
          }
        }
      }
      SELECTED_TEMPLATE += '</span>';
    }
    SELECTED_TEMPLATE += '  <span class="col-md-3 bg-blue-chambray pull-right" style="padding:8px;">';
    SELECTED_TEMPLATE += '  <a class="font-white" ng-click="openMOList(' + iid + ')">';
    SELECTED_TEMPLATE += ' <span class="badge bg-blue-soft pull-right MO_COUNT" id="MO_COUNT-'+ iid + '" style="font-size:14px;"> 0 </span> Manual Overrides</a>';
    SELECTED_TEMPLATE += '  </span>';
    SELECTED_TEMPLATE += '  </div>';
    SELECTED_TEMPLATE += '  </div>';

    var listDivID = "LD" + iid;
    $('#foodfilters').attr('selectedIDs', iid);


    foodfiltersselected = null;
    var temp = $compile(SELECTED_TEMPLATE)($scope);
    angular.element(document.getElementById('foodfiltersselected-div')).append(temp);
    // $('#foodfiltersselected-div').append(temp);

    var ngmodel = 'radio' + iid;
    $scope.ngmodel = experimentation_level;
    //***** ReInitialize Dietype foodfiltersselected List *******//
    $timeout(function() {
      var options = {
        valueNames: ['filter', {
          data: ['id']
        }, {
          attr: 'name',
          name: 'rbtn'
        }, {
          attr: 'name',
          name: 'rbtn1'
        }, {
          attr: 'name',
          name: 'rbtn2'
        }, {
          attr: 'name',
          name: 'rbtn3'
        }, {
          attr: 'name',
          name: 'rbtn4'
        }, {
          attr: 'ng-click',
          name: 'openModalBtn'
        }, {
          attr: 'ng-click',
          name: 'closeBtn'
        }, {
          attr: 'id',
          name: 'listDiv'
        }],
      };
      foodfiltersselected = new List('foodfiltersselected', options);
      foodfiltersselected.sort('filter', { order: "asc" });

    }, 0, false);
    // foodfilters.remove('name', value);


    //console.log("experimentation_level ++: ",experimentation_level);
    //Set experimentation_level
    if (experimentation_level == "Never") {
      DTitem = $('.listDiv[id="' + dietTypeId + '"]').find('.filter');
      DTitem.attr('class', 'filter ' + BORDER_CLASSESS[0]);
      // $scope.updateDietType(iid, 1);
    } else if (experimentation_level == "No") {
      DTitem = $('.listDiv[id="' + dietTypeId + '"]').find('.filter');
      DTitem.attr('class', 'filter ' + BORDER_CLASSESS[1]);
      // $scope.updateDietType(iid, 2);
    } else if (experimentation_level == "Try") {
      DTitem = $('.listDiv[id="' + dietTypeId + '"]').find('.filter');
      DTitem.attr('class', 'filter ' + BORDER_CLASSESS[2]);
      // $scope.updateDietType(iid, 3);
    } else if (experimentation_level == "Occasionally") {
      DTitem = $('.listDiv[id="' + dietTypeId + '"]').find('.filter');
      DTitem.attr('class', 'filter ' + BORDER_CLASSESS[3]);
      // $scope.updateDietType(iid, 4);
    } else if (experimentation_level == "Allow") {
      DTitem = $('.listDiv[id="' + dietTypeId + '"]').find('.filter');
      DTitem.attr('class', 'filter ' + BORDER_CLASSESS[4]);
      // $scope.updateDietType(iid, 5);
    }
  }

  //Search foodfiltersselected List only
  $(".foodFilerSearch").keyup(function(){
    foodfiltersselected.search($(this).val());
  });

  /////////////////////////////////////////
  // Update Diet and its Foods Exp_level //
  /////////////////////////////////////////
  $scope.updateDietType = function(dietTypeId, value) {
    DTitem = $('.listDiv[id="' + dietTypeId + '"]').find('.filter');
    DTitem.attr('class', 'filter ' + BORDER_CLASSESS[value - 1]);
    //Reset MO_COUNT
    $('#MO_COUNT-'+dietTypeId).html(0);
    for (var i = 0; i < $scope.diettypes.length; i++)
    {
      if ($scope.diettypes[i].id == dietTypeId)
      {
        var  childDiets = $scope.diettypes[i].childDiets;
        if (value == 1)
        {
          $scope.diettypes[i].experimentation_level = "Never";
          for (var j = 0; j < $scope.diettypes[i].FoodItems.length; j++)
          {
            $scope.diettypes[i].FoodItems[j].experimentation_level = "Never";
            var fid = $scope.diettypes[i].FoodItems[j].FID;
            PRECRIPTION.fooditems[fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf("Never");
            PRECRIPTION.removeMO(fid);

            //Call Recursive Function For Setting Exp_level O Parent Foods
            FOODS_EXP_LEVEL_SETTED = [];
            FOODS_EXP_LEVEL_SETTED.push(fid);
            resetIngredientLookup(fid,"Never");
          }

          if(childDiets.length > 0)
          {
            for(var k=0; k < childDiets.length; k++)
            {
              for (var m = 0; m < foodfiltersselected['items'].length; m++)
              {
                if(foodfiltersselected['items'][m]['elm'].id == childDiets[k].DTIDC)
                {
                  //Reset MO_COUNT
                  $(foodfiltersselected['items'][m]['elm']).find('.MO_COUNT').html(0);
                  //Set Border
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.filter');
                  DTitem.attr('class', 'filter ' + BORDER_CLASSESS[value - 1]);
                  //Set Radio Button
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn1');
                  DTitem.prop('checked', false);
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn2');
                  DTitem.prop('checked', false);
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn3');
                  DTitem.prop('checked', false);
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn4');
                  DTitem.prop('checked', false);
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn');

                  DTitem.prop('checked', true);
                  //Update in $scope variable
                  for(var l=0;l<$scope.diettypes.length;l++)
                  {
                    if($scope.diettypes[l].id == childDiets[k].DTIDC)
                    {
                      $scope.diettypes[l].experimentation_level = "Never";
                      for (var j = 0; j < $scope.diettypes[l].FoodItems.length; j++)
                      {
                        $scope.diettypes[l].FoodItems[j].experimentation_level = "Never";
                        var fid = $scope.diettypes[l].FoodItems[j].FID;
                        PRECRIPTION.fooditems[fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf("Never");
                        PRECRIPTION.removeMO(fid);

                        //Call Recursive Function For Setting Exp_level O Parent Foods
                        FOODS_EXP_LEVEL_SETTED = [];
                        FOODS_EXP_LEVEL_SETTED.push(fid);
                        resetIngredientLookup(fid,"Never");
                      }
                    }
                  }
                }
              }
            }
          }
        }
        else if (value == 2)
        {

          $scope.diettypes[i].experimentation_level = "No";
          for (var j = 0; j < $scope.diettypes[i].FoodItems.length; j++)
          {
            $scope.diettypes[i].FoodItems[j].experimentation_level = "No";
            var fid = $scope.diettypes[i].FoodItems[j].FID;
            PRECRIPTION.fooditems[fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf("No");
            PRECRIPTION.removeMO(fid);

            //Call Recursive Function For Setting Exp_level O Parent Foods
            FOODS_EXP_LEVEL_SETTED = [];
            FOODS_EXP_LEVEL_SETTED.push(fid);
            resetIngredientLookup(fid,"No");
          }

          if(childDiets.length>0)
          {
            for(var k=0; k < childDiets.length; k++)
            {
              for (var m = 0; m < foodfiltersselected['items'].length; m++)
              {
                if(foodfiltersselected['items'][m]['elm'].id == childDiets[k].DTIDC)
                {
                  //Reset MO_COUNT
                  $(foodfiltersselected['items'][m]['elm']).find('.MO_COUNT').html(0);
                  //Set Border
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.filter');
                  DTitem.attr('class', 'filter ' + BORDER_CLASSESS[value - 1]);
                  //Set Radio Button
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn');
                  DTitem.prop('checked', false);
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn2');
                  DTitem.prop('checked', false);
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn3');
                  DTitem.prop('checked', false);
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn4');
                  DTitem.prop('checked', false);
                  DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn1');
                  DTitem.prop('checked', true);
                  //Update in $scope variable
                  for(var l=0;l<$scope.diettypes.length;l++)
                  {
                    if($scope.diettypes[l].id == childDiets[k].DTIDC)
                    {
                      $scope.diettypes[l].experimentation_level = "No";
                      for (var j = 0; j < $scope.diettypes[l].FoodItems.length; j++)
                      {
                        $scope.diettypes[l].FoodItems[j].experimentation_level = "No";
                        var fid = $scope.diettypes[l].FoodItems[j].FID;
                        PRECRIPTION.fooditems[fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf("No");
                        PRECRIPTION.removeMO(fid);

                        //Call Recursive Function For Setting Exp_level O Parent Foods
                        FOODS_EXP_LEVEL_SETTED = [];
                        FOODS_EXP_LEVEL_SETTED.push(fid);
                        resetIngredientLookup(fid,"No");
                      }
                    }
                  }
                }
              }
            }
          }
      }
      else if (value == 3) {
        $scope.diettypes[i].experimentation_level = "Try";
        for (var j = 0; j < $scope.diettypes[i].FoodItems.length; j++) {
          $scope.diettypes[i].FoodItems[j].experimentation_level = "Try";
          var fid = $scope.diettypes[i].FoodItems[j].FID;
          PRECRIPTION.fooditems[fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf("Try");
          PRECRIPTION.removeMO(fid);

          //Call Recursive Function For Setting Exp_level O Parent Foods
          FOODS_EXP_LEVEL_SETTED = [];
          FOODS_EXP_LEVEL_SETTED.push(fid);
          resetIngredientLookup(fid,"Try");
        }

        if(childDiets.length>0)
        {
          for(var k=0; k < childDiets.length; k++)
          {
            for (var m = 0; m < foodfiltersselected['items'].length; m++)
            {
              if(foodfiltersselected['items'][m]['elm'].id == childDiets[k].DTIDC)
              {
                //Reset MO_COUNT
                $(foodfiltersselected['items'][m]['elm']).find('.MO_COUNT').html(0);
                //Set Border
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.filter');
                DTitem.attr('class', 'filter ' + BORDER_CLASSESS[value - 1]);
                //Set Radio Button
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn1');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn3');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn4');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn2');
                DTitem.prop('checked', true);
                //Update in $scope variable
                for(var l=0;l<$scope.diettypes.length;l++)
                {
                  if($scope.diettypes[l].id == childDiets[k].DTIDC)
                  {
                    $scope.diettypes[l].experimentation_level = "Try";
                    for (var j = 0; j < $scope.diettypes[l].FoodItems.length; j++)
                    {
                      $scope.diettypes[l].FoodItems[j].experimentation_level = "Try";
                      var fid = $scope.diettypes[l].FoodItems[j].FID;
                      PRECRIPTION.fooditems[fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf("Try");
                      PRECRIPTION.removeMO(fid);

                      //Call Recursive Function For Setting Exp_level O Parent Foods
                      FOODS_EXP_LEVEL_SETTED = [];
                      FOODS_EXP_LEVEL_SETTED.push(fid);
                      resetIngredientLookup(fid,"Try");
                    }
                  }
                }
              }
            }
          }
        }
      } else if (value == 4) {
        $scope.diettypes[i].experimentation_level = "Occasionally";
        for (var j = 0; j < $scope.diettypes[i].FoodItems.length; j++) {
          $scope.diettypes[i].FoodItems[j].experimentation_level = "Occasionally";
          var fid = $scope.diettypes[i].FoodItems[j].FID;
          PRECRIPTION.fooditems[fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf("Occasionally");
          PRECRIPTION.removeMO(fid);

          //Call Recursive Function For Setting Exp_level O Parent Foods
          FOODS_EXP_LEVEL_SETTED = [];
          FOODS_EXP_LEVEL_SETTED.push(fid);
          resetIngredientLookup(fid,"Occasionally");
        }

        if(childDiets.length>0)
        {
          for(var k=0; k < childDiets.length; k++)
          {
            for (var m = 0; m < foodfiltersselected['items'].length; m++)
            {
              if(foodfiltersselected['items'][m]['elm'].id == childDiets[k].DTIDC)
              {
                //Reset MO_COUNT
                $(foodfiltersselected['items'][m]['elm']).find('.MO_COUNT').html(0);
                //Set Border
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.filter');
                DTitem.attr('class', 'filter ' + BORDER_CLASSESS[value - 1]);
                //Set Radio Button
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn1');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn2');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn4');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn3');
                DTitem.prop('checked', true);
                //Update in $scope variable
                for(var l=0;l<$scope.diettypes.length;l++)
                {
                  if($scope.diettypes[l].id == childDiets[k].DTIDC)
                  {
                    $scope.diettypes[l].experimentation_level = "Occasionally";
                    for (var j = 0; j < $scope.diettypes[l].FoodItems.length; j++)
                    {
                      $scope.diettypes[l].FoodItems[j].experimentation_level = "Occasionally";
                      var fid = $scope.diettypes[l].FoodItems[j].FID;
                      PRECRIPTION.fooditems[fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf("Occasionally");
                      PRECRIPTION.removeMO(fid);

                      //Call Recursive Function For Setting Exp_level O Parent Foods
                      FOODS_EXP_LEVEL_SETTED = [];
                      FOODS_EXP_LEVEL_SETTED.push(fid);
                      resetIngredientLookup(fid,"Occasionally");
                    }
                  }
                }
              }
            }
          }
        }

      } else if (value == 5) {
        $scope.diettypes[i].experimentation_level = "Allow";
        for (var j = 0; j < $scope.diettypes[i].FoodItems.length; j++) {
          $scope.diettypes[i].FoodItems[j].experimentation_level = "Allow";
          var fid = $scope.diettypes[i].FoodItems[j].FID;
          PRECRIPTION.fooditems[fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf("Allow");
          PRECRIPTION.removeMO(fid);

          //Call Recursive Function For Setting Exp_level O Parent Foods
          FOODS_EXP_LEVEL_SETTED = [];
          FOODS_EXP_LEVEL_SETTED.push(fid);
          resetIngredientLookup(fid,"Allow");
        }

        if(childDiets.length>0)
        {
          for(var k=0; k < childDiets.length; k++)
          {
            for (var m = 0; m < foodfiltersselected['items'].length; m++)
            {
              if(foodfiltersselected['items'][m]['elm'].id == childDiets[k].DTIDC)
              {
                //Reset MO_COUNT
                $(foodfiltersselected['items'][m]['elm']).find('.MO_COUNT').html(0);
                //Set Border
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.filter');
                DTitem.attr('class', 'filter ' + BORDER_CLASSESS[value - 1]);
                //Set Radio Button
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn1');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn2');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn3');
                DTitem.prop('checked', false);
                DTitem = $(foodfiltersselected['items'][m]['elm']).find('.rbtn4');
                DTitem.prop('checked', true);
                //Update in $scope variable
                for(var l=0;l<$scope.diettypes.length;l++)
                {
                  if($scope.diettypes[l].id == childDiets[k].DTIDC)
                  {
                    $scope.diettypes[l].experimentation_level = "Allow";
                    for (var j = 0; j < $scope.diettypes[l].FoodItems.length; j++)
                    {
                      $scope.diettypes[l].FoodItems[j].experimentation_level = "Allow";
                      var fid = $scope.diettypes[l].FoodItems[j].FID;
                      PRECRIPTION.fooditems[fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf("Allow");
                      PRECRIPTION.removeMO(fid);

                      //Call Recursive Function For Setting Exp_level O Parent Foods
                      FOODS_EXP_LEVEL_SETTED = [];
                      FOODS_EXP_LEVEL_SETTED.push(fid);
                      resetIngredientLookup(fid,"Allow");
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

////////////////////////////////////////////////////////////////////
//** Dietype Step 3 Moving List (moveBackSelected function) ****////
///////////////////////////////////////////////////////////////////
$scope.moveBackSelected = function(dietTypeId) {
  var iid = dietTypeId;
  for (var i = 0; i < $scope.diettypes.length; i++)
  {
    if ($scope.diettypes[i].id == iid)
    {
      $scope.moveTodeSelectedChildFn(iid);
      $('.parentSpan-'+ iid ).remove();
      // $scope.moveToSelectedChildFn(iid);
      var childDiets = $scope.diettypes[i].childDiets;
      break;
    }
  }
  // console.log("childDiets: ",childDiets);
  //Move Child Diets too
  if(childDiets.length > 0)
  {
    for (var i = 0; i < childDiets.length; i++)
    {
      var childID = childDiets[i].DTIDC;

      for (var j = 0; j < $scope.diettypes.length; j++)
      {
        if ($scope.diettypes[j].id == childID)
        {
          if($scope.diettypes[j].selected == "true")
          {

            //Check for other Parent Diets Selected
            var parentDiets = $scope.diettypes[j].parentDiets;
            // console.log("parentDiets: ",parentDiets);
            var check = false;
            for (var l = 0; l < parentDiets.length; l++)
            {
              var parentID = parentDiets[l].DTIDP;
              if(iid != parentID)
              {
                for (var m = 0; m < $scope.diettypes.length; m++)
                {
                  if ($scope.diettypes[m].id == parentID)
                  {
                    // console.log("$scope.diettypes[m]: ",$scope.diettypes[m]);
                    if($scope.diettypes[m].selected == "true")
                    {
                      check = true;
                    }
                    if (parentID == childID) {
                      check = false;
                    }
                  }
                }
              }
            }
            if(check == false)
            {
              $scope.moveTodeSelectedChildFn(childID);
              //  var value = $scope.diettypes[i].Name;
              // $scope.diettypes[i].selected = "false";
              var dietId = "DOpt-"+ childID ;
              $("#"+ dietId +"").attr("selected",false);
            }

          }
        }
      }
    }

    $(".selectDietType").trigger("change.select2");
  }
}

$scope.moveTodeSelectedChildFn = function(dietTypeId) {
  var iid = dietTypeId;
  console.log('moveTodeSelectedChildFn',dietTypeId);

  for (var i = 0; i < $scope.diettypes.length; i++) {

    if ($scope.diettypes[i].id == iid) {
      var value                                 = $scope.diettypes[i].Name;
      $scope.diettypes[i].selected              = "false";
      $scope.diettypes[i].experimentation_level = "No";
      if($scope.diettypes[i].FoodItems)
      {
        for (var j = 0; j < $scope.diettypes[i].FoodItems.length; j++)
        {
          $scope.diettypes[i].FoodItems[j].experimentation_level = "No";
        }
      }
      var dietId   = "DOpt-"+  iid ;
      $("#"+ dietId +"").attr("selected",false);

    }
  }
  $(".selectDietType").trigger("change.select2");
  foodfilters = null;
  var html = '<a data-id="filter1" ng-click="moveToSelected(' + iid + ')" id="' + iid + '" class=" list-group-item"><span class="name">' + value + '</span></a>';
  var temp = $compile(html)($scope);
  angular.element(document.getElementById('foodfilters-div')).append(temp);
  //***** ReInitialize Dietype foodfilters List *******//
  $timeout(function() {
    var options = {
      valueNames: ['name']
    };
    foodfilters = new List('foodfilters', options);
  }, 0, false);

  foodfiltersselected.remove('filter', value);
}

//Open Diet Foods List
$scope.openFoodList = function(dietTypeId) {

  $('#responsive').modal('show');
  $('#dietTypeFoodList-Heading').html('');
  $('#dietTypeFoodList').html('');
  dietTypeFoodListModal = null;

  for (var i = 0; i < $scope.diettypes.length; i++) {
    if ($scope.diettypes[i].id == dietTypeId) {
      var diettypeName = $scope.diettypes[i].Name;
      var FoodList = $scope.diettypes[i].FoodItems;
    }
  }
  // console.log("FoodList: ",FoodList);
  EXPLEVELS = ["Never", "No", "Try", "Occasionally", "Allow"];
  $('#dietTypeFoodList-Heading').append(diettypeName);

  for (var i = 0; i < FoodList.length; i++) {

    colorLevel = PRECRIPTION.getReactionLevel(FoodList[i]['FID']);
    borderClass = BORDER_CLASSESS[EXPLEVELS.indexOf(FoodList[i]['experimentation_level'])] + ' ListFoodName';
    var html = '<a href="javascript:;" id="' + FoodList[i]['FID'] + '" class="list-group-item food-item"><span style="padding: 2px 5px;background-color: ' + BACKGROUND_COLOR[REACTION_COLOR_CODE[colorLevel]] + ';" class="' + borderClass + '">' + FoodList[i]['Name'] + '</span>';
    html += '  <div class="form-group">';
    html += '                <div class="row mt-radio-inline">';
    html += '                    <label class="col-xs-6 col-md-2 mt-radio">';
    if (FoodList[i]['experimentation_level'] == "Allow") {
      html += '                      <input type="radio" name="N' + FoodList[i]['id'] + '" id="Al' + FoodList[i]['FID'] + '" onchange="updateBorderFoodItem(this,4);" value="Allow" checked> Allow';
    } else {
      html += '                      <input type="radio" name="N' + FoodList[i]['id'] + '" id="Al' + FoodList[i]['FID'] + '" onchange="updateBorderFoodItem(this,4);" value="Allow"> Allow';
    }
    html += '                      <span></span>';
    html += '                    </label>';
    html += '                    <label class="col-xs-6 col-md-2 mt-radio">';
    if (FoodList[i]['experimentation_level'] == "Occasionally") {
      html += '                      <input type="radio" name="N' + FoodList[i]['id'] + '" id="OC' + FoodList[i]['FID'] + '" onchange="updateBorderFoodItem(this,3);" value="Occasionally" checked> Occasionally';
    } else {
      html += '                      <input type="radio" name="N' + FoodList[i]['id'] + '" id="OC' + FoodList[i]['FID'] + '" onchange="updateBorderFoodItem(this,3);" value="Occasionally"> Occasionally';
    }
    html += '                      <span></span>';
    html += '                    </label>';
    html += '                    <label class="col-xs-6 col-md-1 mt-radio">';
    if (FoodList[i]['experimentation_level'] == "Try") {
      html += '                      <input type="radio" name="N' + FoodList[i]['id'] + '" id="TR' + FoodList[i]['FID'] + '" onchange="updateBorderFoodItem(this,2);" value="Try" checked> Try';
    } else {
      html += '                      <input type="radio" name="N' + FoodList[i]['id'] + '" id="TR' + FoodList[i]['FID'] + '" onchange="updateBorderFoodItem(this,2);" value="Try" > Try';
    }
    html += '                      <span></span>';
    html += '                    </label>';
    html += '                    <label class="col-xs-6 col-md-1 mt-radio">';
    if (FoodList[i]['experimentation_level'] == "No") {
      html += '                      <input type="radio" name="N' + FoodList[i]['id'] + '" id="NO' + FoodList[i]['FID'] + '" onchange="updateBorderFoodItem(this,1);" value="No" checked> No';
    } else {
      html += '                      <input type="radio" name="N' + FoodList[i]['id'] + '" id="NO' + FoodList[i]['FID'] + '" onchange="updateBorderFoodItem(this,1);" value="No"> No';
    }
    html += '                      <span></span>';
    html += '                    </label>';
    html += '                    <label class="col-xs-6 col-md-2 mt-radio last-radio-child">';
    if (FoodList[i]['experimentation_level'] == "Never") {
      html += '                      <input type="radio" name="N' + FoodList[i]['id'] + '" id="NE' + FoodList[i]['FID'] + '" onchange="updateBorderFoodItem(this,0);" value="Never" checked> Never';
    } else {
      html += '                      <input type="radio" name="N' + FoodList[i]['id'] + '" id="NE' + FoodList[i]['FID'] + '" onchange="updateBorderFoodItem(this,0);" value="Never"> Never';
    }
    html += '                      <span></span>';
    html += '                    </label>';
    html += '            </div>';
    html += '    </div>';
    html += '</a>';
    $('#dietTypeFoodList').append(html);
  }
  $timeout(function() {
    var options = {
      valueNames: ['ListFoodName']
    };
    dietTypeFoodListModal = new List('dietTypeFoodList-List', options);
    dietTypeFoodListModal.sort('ListFoodName', { order: "asc" });
  }, 0, false);
  $("#dietTypeFoodList-ModalBtn").remove();
  var html2 = '<button type="button" class="btn green" id="dietTypeFoodList-ModalBtn" ng-click="saveDietFoodItems(' + dietTypeId + ')">Save changes</button>';
  var temp = $compile(html2)($scope);
  angular.element(document.getElementById('dietTypeFoodList-ModalFooter')).append(temp);
}

//Open Diet MO List
$scope.openMOList = function(dietTypeId) {

  $('#responsive-1').modal('show');
  $('#dietTypeMOList-Heading').html('');
  $('#dietTypeMOList').html('');
  // dietTypeFoodListModal = null;

  for (var i = 0; i < $scope.diettypes.length; i++) {
    if ($scope.diettypes[i].id == dietTypeId) {
      var diettypeName = $scope.diettypes[i].Name;
      var dieExp_level = $scope.diettypes[i].experimentation_level;
      var FoodList = $scope.diettypes[i].FoodItems;
      break;
    }
  }
  // console.log("FoodList: ",FoodList);
  EXPLEVELS = ["Never", "No", "Try", "Occasionally", "Allow"];
  $('#dietTypeMOList-Heading').append(diettypeName);

  var html = '<div class="col-md-3 col-sm-3 col-xs-3">';
  html += '    <ul class="nav nav-tabs tabs-left">';
  if (dieExp_level != 'Allow') {
    html += '        <li class="active">';
    html += '            <a href="#Allow_Tab_List" data-toggle="tab"> Allow </a>';
    html += '        </li>';
  }
  if (dieExp_level != 'Occasionally') {
    if (dieExp_level == 'Allow') {
      html += '        <li class="active">';
    }
    else {
      html += '        <li>';
    }
    html += '            <a href="#Occasionally_Tab_List" data-toggle="tab"> Occasionally </a>';
    html += '        </li>';
  }
  if (dieExp_level != 'Try') {
    html += '        <li>';
    html += '            <a href="#Try_Tab_List" data-toggle="tab"> Try </a>';
    html += '        </li>';
  }
  if (dieExp_level != 'No') {
    html += '        <li>';
    html += '            <a href="#No_Tab_List" data-toggle="tab"> No </a>';
    html += '        </li>';
  }
  if (dieExp_level != 'Never') {
    html += '        <li>';
    html += '            <a href="#Never_Tab_List" data-toggle="tab"> Never </a>';
    html += '        </li>';
  }
  html += '    </ul>';
  html += '</div>';
  html += '<div class="col-md-9 col-sm-9 col-xs-9">';
  html += '    <div class="tab-content">';
  if (dieExp_level != 'Allow') {
    html += '        <div class="tab-pane active" id="Allow_Tab_List">';
    html += '            <span>';
    html += '             <input type="text" class="form-control Allow_Tab_List-search search" placeholder="Search Food Items">';
    html += '            </span><br>';
    html += '            <div class="list list-group">';
    for (var i = 0; i < FoodList.length; i++)
    {
      if (FoodList[i]['experimentation_level'] == "Allow")
      {
        var fid = FoodList[i]['FID'];
        var recLevel = PRECRIPTION.getReactionLevel(fid);
        var food     = PRECRIPTION.fooditems[fid];

        var Code       = food['codes']['fontcode'];
        var color      = FONT_COLOR[Code];
        var bordercode = food['codes']['bordercode'];
        var expLevel   = FoodList[i]['experimentation_level'];

        var colorLevel = PRECRIPTION.getReactionLevel(fid);
        var borderClass = BORDER_CLASSESS[EXPLEVELS.indexOf(expLevel)] + ' ListFoodName Allow-filter item-name';

        html += '<a class=" list-group-item row" id="MO_FOOD_Item-' + fid + '" iid="' + fid + '" data-id="' + fid + '">';
        html += '  <span style="padding: 2px 5px;background-color: ' + BACKGROUND_COLOR[REACTION_COLOR_CODE[colorLevel]] + ';" class="' + borderClass + '">' + FoodList[i]['Name'] + '</span>';
        html += '<span class="col-md-1 col-xs-2 pull-right">';
        html += '<i class="fa fa-remove"></i>';
        html += '</span>';
        html += '<span>';
        html += '<select class="bs-select form-control MO_Food_List_Select" onchange="updateBorderMO_List(this,\''+ dieExp_level +'\');" style="margin-top:10px;">';
        html += '  <option value="No">No Experimentation</option>';
        html += '  <option value="Never">Never</option>';
        html += '  <option value="Allow" selected>Allow</option>';
        html += '  <option value="Occasionally">Occasionally</option>';
        html += '  <option value="Try">Try</option>';
        html += ' </select>';
        html += '</span>';
        html += '</a>';
      }
    }
    html += '            </div>';
    html += '        </div>';
  }
  if (dieExp_level != 'Occasionally') {
    if (dieExp_level == 'Allow') {
      html += '        <div class="tab-pane active" id="Occasionally_Tab_List">';
    }
    else {
      html += '        <div class="tab-pane fade" id="Occasionally_Tab_List">';
    }
    html += '            <span>';
    html += '             <input type="text" class="form-control Occasionally_Tab_List-search search" placeholder="Search Food Items">';
    html += '            </span>';
    html += '            <div class="list list-group">';
    for (var i = 0; i < FoodList.length; i++)
    {
      if (FoodList[i]['experimentation_level'] == "Occasionally")
      {
        var fid = FoodList[i]['FID'];
        var recLevel = PRECRIPTION.getReactionLevel(fid);
        var food     = PRECRIPTION.fooditems[fid];

        var Code       = food['codes']['fontcode'];
        var color      = FONT_COLOR[Code];
        var bordercode = food['codes']['bordercode'];
        var expLevel   = FoodList[i]['experimentation_level'];

        var colorLevel = PRECRIPTION.getReactionLevel(fid);
        var borderClass = BORDER_CLASSESS[EXPLEVELS.indexOf(expLevel)] + ' ListFoodName Occasionally-filter item-name';

        html += '<a class=" list-group-item row" id="MO_FOOD_Item-' + fid + '" iid="' + fid + '" data-id="' + fid + '">';
        html += '  <span style="padding: 2px 5px;background-color: ' + BACKGROUND_COLOR[REACTION_COLOR_CODE[colorLevel]] + ';" class="' + borderClass + '">' + FoodList[i]['Name'] + '</span>';
        html += '<span class="col-md-1 col-xs-2 pull-right">';
        html += '<i class="fa fa-remove"></i>';
        html += '</span>';
        html += '<span>';
        html += '<select class="bs-select form-control MO_Food_List_Select" onchange="updateBorderMO_List(this,\''+ dieExp_level +'\');" style="margin-top:10px;">';
        html += '  <option value="No">No Experimentation</option>';
        html += '  <option value="Never">Never</option>';
        html += '  <option value="Allow">Allow</option>';
        html += '  <option value="Occasionally" selected>Occasionally</option>';
        html += '  <option value="Try">Try</option>';
        html += ' </select>';
        html += '</span>';
        html += '</a>';
      }
    }
    html += '            </div>';
    html += '        </div>';
  }
  if (dieExp_level != 'Try') {
    html += '        <div class="tab-pane fade" id="Try_Tab_List">';
    html += '            <span>';
    html += '             <input type="text" class="form-control Try_Tab_List-search search" placeholder="Search Food Items">';
    html += '            </span>';
    html += '            <div class="list list-group">';
    for (var i = 0; i < FoodList.length; i++)
    {
      if (FoodList[i]['experimentation_level'] == "Try")
      {
        var fid = FoodList[i]['FID'];
        var recLevel = PRECRIPTION.getReactionLevel(fid);
        var food     = PRECRIPTION.fooditems[fid];

        var Code       = food['codes']['fontcode'];
        var color      = FONT_COLOR[Code];
        var bordercode = food['codes']['bordercode'];
        var expLevel   = FoodList[i]['experimentation_level'];

        var colorLevel = PRECRIPTION.getReactionLevel(fid);
        var borderClass = BORDER_CLASSESS[EXPLEVELS.indexOf(expLevel)] + ' ListFoodName Try-filter item-name';

        html += '<a class=" list-group-item row" id="MO_FOOD_Item-' + fid + '" iid="' + fid + '" data-id="' + fid + '">';
        html += '  <span style="padding: 2px 5px;background-color: ' + BACKGROUND_COLOR[REACTION_COLOR_CODE[colorLevel]] + ';" class="' + borderClass + '">' + FoodList[i]['Name'] + '</span>';
        html += '<span class="col-md-1 col-xs-2 pull-right">';
        html += '<i class="fa fa-remove"></i>';
        html += '</span>';
        html += '<span>';
        html += '<select class="bs-select form-control MO_Food_List_Select" onchange="updateBorderMO_List(this,\''+ dieExp_level +'\');" style="margin-top:10px;">';
        html += '  <option value="No">No Experimentation</option>';
        html += '  <option value="Never">Never</option>';
        html += '  <option value="Allow">Allow</option>';
        html += '  <option value="Occasionally">Occasionally</option>';
        html += '  <option value="Try" selected>Try</option>';
        html += ' </select>';
        html += '</span>';
        html += '</a>';
      }
    }
    html += '            </div>';
    html += '        </div>';
  }
  if (dieExp_level != 'No') {
    html += '        <div class="tab-pane fade" id="No_Tab_List">';
    html += '            <span>';
    html += '             <input type="text" class="form-control No_Tab_List-search search" placeholder="Search Food Items">';
    html += '            </span>';
    html += '           <div class="list list-group">';
    for (var i = 0; i < FoodList.length; i++)
    {
      if (FoodList[i]['experimentation_level'] == "No")
      {
        var fid = FoodList[i]['FID'];
        var recLevel = PRECRIPTION.getReactionLevel(fid);
        var food     = PRECRIPTION.fooditems[fid];

        var Code       = food['codes']['fontcode'];
        var color      = FONT_COLOR[Code];
        var bordercode = food['codes']['bordercode'];
        var expLevel   = FoodList[i]['experimentation_level'];

        var colorLevel = PRECRIPTION.getReactionLevel(fid);
        var borderClass = BORDER_CLASSESS[EXPLEVELS.indexOf(expLevel)] + ' ListFoodName No-filter item-name';

        html += '<a class=" list-group-item row" id="MO_FOOD_Item-' + fid + '" iid="' + fid + '" data-id="' + fid + '">';
        html += '  <span style="padding: 2px 5px;background-color: ' + BACKGROUND_COLOR[REACTION_COLOR_CODE[colorLevel]] + ';" class="' + borderClass + '">' + FoodList[i]['Name'] + '</span>';
        html += '<span class="col-md-1 col-xs-2 pull-right">';
        html += '<i class="fa fa-remove"></i>';
        html += '</span>';
        html += '<span>';
        html += '<select class="bs-select form-control MO_Food_List_Select" onchange="updateBorderMO_List(this,\''+ dieExp_level +'\');" style="margin-top:10px;">';
        html += '  <option value="No" selected>No Experimentation</option>';
        html += '  <option value="Never">Never</option>';
        html += '  <option value="Allow">Allow</option>';
        html += '  <option value="Occasionally">Occasionally</option>';
        html += '  <option value="Try">Try</option>';
        html += ' </select>';
        html += '</span>';
        html += '</a>';
      }
    }
    html += '            </div>';
    html += '        </div>';
  }
  if (dieExp_level != 'Never') {
    html += '         <div class="tab-pane fade" id="Never_Tab_List">';
    html += '            <span>';
    html += '             <input type="text" class="form-control Never_Tab_List-search search" placeholder="Search Food Items">';
    html += '            </span>';
    html += '           <div class="list list-group">';
    for (var i = 0; i < FoodList.length; i++)
    {
      if (FoodList[i]['experimentation_level'] == "Never")
      {
        var fid = FoodList[i]['FID'];
        var recLevel = PRECRIPTION.getReactionLevel(fid);
        var food     = PRECRIPTION.fooditems[fid];

        var Code       = food['codes']['fontcode'];
        var color      = FONT_COLOR[Code];
        var bordercode = food['codes']['bordercode'];
        var expLevel   = FoodList[i]['experimentation_level'];

        var colorLevel = PRECRIPTION.getReactionLevel(fid);
        var borderClass = BORDER_CLASSESS[EXPLEVELS.indexOf(expLevel)] + ' ListFoodName Never-filter item-name';

        html += '<a class=" list-group-item row" id="MO_FOOD_Item-' + fid + '" iid="' + fid + '" data-id="' + fid + '">';
        html += '  <span style="padding: 2px 5px;background-color: ' + BACKGROUND_COLOR[REACTION_COLOR_CODE[colorLevel]] + ';" class="' + borderClass + '">' + FoodList[i]['Name'] + '</span>';
        html += '<span class="col-md-1 col-xs-2 pull-right">';
        html += '<i class="fa fa-remove"></i>';
        html += '</span>';
        html += '<span>';
        html += '<select class="bs-select form-control MO_Food_List_Select" onchange="updateBorderMO_List(this,\''+ dieExp_level +'\');" style="margin-top:10px;">';
        html += '  <option value="No">No Experimentation</option>';
        html += '  <option value="Never" selected>Never</option>';
        html += '  <option value="Allow">Allow</option>';
        html += '  <option value="Occasionally">Occasionally</option>';
        html += '  <option value="Try">Try</option>';
        html += ' </select>';
        html += '</span>';
        html += '</a>';
      }
    }
    html += '            </div>';
    html += '        </div>';
  }
  html += '    </div>';
  html += '</div>';

  $('#dietTypeMOList').append(html);
  $('.MO_Food_List_Select').find('option[value="'+ dieExp_level +'"]').css('display', 'none');

  //Initialize ListJs on MO_Lists
  $timeout(function() {
    if (dieExp_level != 'Allow') {
      var options = {
        valueNames: ['Allow-filter']
      };
      $scope.Allow_MOList = new List('Allow_Tab_List', options);
      $scope.Allow_MOList.sort('Allow-filter', { order: "asc" });
    }

    if (dieExp_level != 'Occasionally') {
       var options = {
        valueNames: ['Occasionally-filter']
      };
      $scope.Occasionally_MOList = new List('Occasionally_Tab_List', options);
      $scope.Occasionally_MOList.sort('Occasionally-filter', { order: "asc" });
    }

    if (dieExp_level != 'Try') {
      var options = {
        valueNames: ['Try-filter']
      };
      $scope.Try_MOList = new List('Try_Tab_List', options);
      $scope.Try_MOList.sort('Try-filter', { order: "asc" });
    }

    if (dieExp_level != 'No') {
      var options = {
        valueNames: ['No-filter']
      };
      $scope.No_MOList = new List('No_Tab_List', options);
      $scope.No_MOList.sort('No-filter', { order: "asc" });
    }

    if (dieExp_level != 'Never') {
      var options = {
        valueNames: ['Never-filter']
      };
      $scope.Never_MOList = new List('Never_Tab_List', options);
      $scope.Never_MOList.sort('Never-filter', { order: "asc" });
    }
  }, 0, false);

  $("#dietTypeMOList-ModalBtn").remove();
  var html2 = '<button type="button" class="btn green" id="dietTypeMOList-ModalBtn" ng-click="saveDietMO_List(' + dietTypeId + ')">Save changes</button>';
  var temp = $compile(html2)($scope);
  angular.element(document.getElementById('dietTypeMOList-ModalFooter')).append(temp);
}


//// HighLight Parent and Child LI's
$scope.toggleHighlight = function(dietTypeId) {
  $(".listDiv").removeClass("diet-type-child");
$(".listDiv").removeClass("diet-type-parent");
$("#" + dietTypeId ).toggleClass("diet-type-parent");
//Get Childs
  for (var i = 0; i < $scope.diettypes.length; i++)
  {
    if ($scope.diettypes[i].id == dietTypeId) {
      var diettypeName = $scope.diettypes[i].Name;
      var childDiets = $scope.diettypes[i].childDiets;
      break;
    }
  }
  //Childs Loop
  for (var i = 0; i < childDiets.length; i++)
  {
    console.log("childDiets[i]: ",childDiets[i]);
    var childDietID = childDiets[i]['DTIDC'];
    $("#" + childDietID ).toggleClass("diet-type-child");
  }
}

//Search dietTypeFoodListModal List only
$(".food-list-modal-search").keyup(function(){
  dietTypeFoodListModal.search($(this).val());
});

$(".more").shorten({
  "showChars" : 50,
  "moreText"    : "See More",
  "lessText"    : "Less",
  });


///////////////////////////////////////////////////////////
//*** Update Diet Type FoodList experimentation_level **//
//////////////////////////////////////////////////////////
$scope.saveDietFoodItems = function(dietTypeId) {
  for (var i = 0; i < $scope.diettypes.length; i++)
  {
    if ($scope.diettypes[i].id == dietTypeId)
    {
      var diettypeName = $scope.diettypes[i].Name;
      var dieExp_level = $scope.diettypes[i].experimentation_level;
      var FoodList     = $scope.diettypes[i].FoodItems;
      break;
    }
  }
  var MO_Count = 0;
  for (var i = 0; i < dietTypeFoodListModal['items'].length; i++)
  {
    var FoodsID = dietTypeFoodListModal['items'][i]['elm'].id;
    var radioName = $(dietTypeFoodListModal['items'][i]['elm']).find('input[type=radio]:checked');
    var experimentation_level = radioName.val();

    for (var j = 0; j < FoodList.length; j++)
    {
      if(FoodsID ==  FoodList[j]['FID'])
      {
        // var oldExpLevel = FoodList[j]['experimentation_level'];
        var oldExpLevel = dieExp_level;
        if(typeof experimentation_level != 'undefined')
        {
          if(oldExpLevel != experimentation_level){
            MO_Count++;
            var Fid = FoodsID;
            PRECRIPTION.addMO(Fid);
            PRECRIPTION.fooditems[Fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(experimentation_level);

            //Call Recursive Function For Setting Exp_level O Parent Foods
            FOODS_EXP_LEVEL_SETTED = [];
            FOODS_EXP_LEVEL_SETTED.push(Fid);
            updateIngredientLookup(Fid,experimentation_level);
          }
          FoodList[j]['experimentation_level'] = experimentation_level;
        }
      }
    }
  }
  $('#MO_COUNT-'+dietTypeId).html(MO_Count);
  $('#responsive').modal('hide');
}

///////////////////////////////////////////////////////////
//*** Update Diet Type MOList experimentation_level **//
//////////////////////////////////////////////////////////
$scope.saveDietMO_List = function(dietTypeId) {
  for (var i = 0; i < $scope.diettypes.length; i++)
  {
    if ($scope.diettypes[i].id == dietTypeId)
    {
      var diettypeName = $scope.diettypes[i].Name;
      var dieExp_level = $scope.diettypes[i].experimentation_level;
      var FoodList = $scope.diettypes[i].FoodItems;
      break;
    }
  }

  if (dieExp_level != 'Allow')
  {
    for (var i = 0; i < $scope.Allow_MOList['items'].length; i++)
    {
      var FoodsID = $($scope.Allow_MOList['items'][i]['elm']).attr('data-id');
      var select = $($scope.Allow_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
      var experimentation_level = select.val();

      for (var j = 0; j < FoodList.length; j++)
      {
        if(FoodsID ==  FoodList[j]['FID'])
        {
          var Fid = FoodsID;
          PRECRIPTION.fooditems[Fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(experimentation_level);

          //Call Recursive Function For Setting Exp_level On Parent Foods
          FOODS_EXP_LEVEL_SETTED = [];
          FOODS_EXP_LEVEL_SETTED.push(Fid);
          updateIngredientLookup(Fid,experimentation_level);
          FoodList[j]['experimentation_level'] = experimentation_level;
        }
      }
    }
  }

  if (dieExp_level != 'Occasionally')
  {
    for (var i = 0; i < $scope.Occasionally_MOList['items'].length; i++)
    {
      var FoodsID = $($scope.Occasionally_MOList['items'][i]['elm']).attr('data-id');
      var select = $($scope.Occasionally_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
      var experimentation_level = select.val();

      for (var j = 0; j < FoodList.length; j++)
      {
        if(FoodsID ==  FoodList[j]['FID'])
        {
          var Fid = FoodsID;
          PRECRIPTION.fooditems[Fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(experimentation_level);

          //Call Recursive Function For Setting Exp_level O Parent Foods
          FOODS_EXP_LEVEL_SETTED = [];
          FOODS_EXP_LEVEL_SETTED.push(Fid);
          updateIngredientLookup(Fid,experimentation_level);
          FoodList[j]['experimentation_level'] = experimentation_level;
        }
      }
    }
  }

  if (dieExp_level != 'Try')
  {
    for (var i = 0; i < $scope.Try_MOList['items'].length; i++)
    {
      var FoodsID = $($scope.Try_MOList['items'][i]['elm']).attr('data-id');
      var select = $($scope.Try_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
      var experimentation_level = select.val();

      for (var j = 0; j < FoodList.length; j++)
      {
        if(FoodsID ==  FoodList[j]['FID'])
        {
          var Fid = FoodsID;
          PRECRIPTION.fooditems[Fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(experimentation_level);

          //Call Recursive Function For Setting Exp_level O Parent Foods
          FOODS_EXP_LEVEL_SETTED = [];
          FOODS_EXP_LEVEL_SETTED.push(Fid);
          updateIngredientLookup(Fid,experimentation_level);
          FoodList[j]['experimentation_level'] = experimentation_level;
        }
      }
    }
  }

  if (dieExp_level != 'No')
  {
    for (var i = 0; i < $scope.No_MOList['items'].length; i++)
    {
      var FoodsID = $($scope.No_MOList['items'][i]['elm']).attr('data-id');
      var select = $($scope.No_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
      var experimentation_level = select.val();

      for (var j = 0; j < FoodList.length; j++)
      {
        if(FoodsID ==  FoodList[j]['FID'])
        {
          var Fid = FoodsID;
          PRECRIPTION.fooditems[Fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(experimentation_level);

          //Call Recursive Function For Setting Exp_level O Parent Foods
          FOODS_EXP_LEVEL_SETTED = [];
          FOODS_EXP_LEVEL_SETTED.push(Fid);
          updateIngredientLookup(Fid,experimentation_level);
          FoodList[j]['experimentation_level'] = experimentation_level;
        }
      }
    }
  }

  if (dieExp_level != 'Never')
  {
    for (var i = 0; i < $scope.Never_MOList['items'].length; i++)
    {
      var FoodsID = $($scope.Never_MOList['items'][i]['elm']).attr('data-id');
      var select = $($scope.Never_MOList['items'][i]['elm']).find('.MO_Food_List_Select');
      var experimentation_level = select.val();

      for (var j = 0; j < FoodList.length; j++)
      {
        if(FoodsID ==  FoodList[j]['FID'])
        {
          var Fid = FoodsID;
          PRECRIPTION.fooditems[Fid]['codes']['bordercode'] = EXP_CODE_LEVEL.indexOf(experimentation_level);

          //Call Recursive Function For Setting Exp_level O Parent Foods
          FOODS_EXP_LEVEL_SETTED = [];
          FOODS_EXP_LEVEL_SETTED.push(Fid);
          updateIngredientLookup(Fid,experimentation_level);
          FoodList[j]['experimentation_level'] = experimentation_level;
        }
      }
    }
  }

  $('#responsive-1').modal('hide');
}

/////////////////////////////////////////////////////////
/////*** RefreshDatatable of Foods  (STEP 4)****/////////
/////////////////////////////////////////////////////////
$scope.refreshDatatable = function() {
  // console.log("Refreshing");
  // $scope.FOOD_ITEM_TABLE.columns( [ 5, 6, 7 ] ).visible( true, true );
  $scope.FOOD_ITEM_TABLE.destroy();
  $scope.FOOD_ITEM_TABLE = $('#table-food-list').DataTable({
    "retrieve": true,
    // serverSide: true,
    "lengthMenu": [
      [20, 50, 75, -1],
      [20, 50, 75, "All"]
    ],
    "iDisplayStart": 20,
    "iDisplayLength": -1,
    "scrollY": "250px",
    "aoColumnDefs": [{
      'bSortable': false,
      'aTargets': [1, 2, 3, 4]
    },
    {
      "targets": [ 5 ],
      "visible": false,
      "searchable": true
    },
    {
      "targets": [ 6 ],
      "visible": false,
      "searchable": true
    },
    {
      "targets": [ 7 ],
      "visible": false,
      "searchable": true
    }],
    deferRender:    true,
    scroller: {
            loadingIndicator: true
        }
    // scroller:       true
  });
  $('#column1_search').on('keyup', function() {
    $scope.FOOD_ITEM_TABLE
    .columns(0).search('YES')
    .search(this.value)
    .draw();
  });
  $('#column2_search').on('change', function() {
    $scope.FOOD_ITEM_TABLE
    .columns(5).search('YES')
    .search(this.value)
    .draw();
  });
  $('#column3_search').on('change', function() {
    $scope.FOOD_ITEM_TABLE
    .columns(6).search('YES')
    .search(this.value)
    .draw();

  });
  $('#column4_search').on('change', function() {
    $scope.FOOD_ITEM_TABLE
    .columns(7).search('YES')
    .search(this.value)
    .draw();

  });
  //Hide Ajax loader
  $('#pleaseWaitModal').modal('hide');

  var displayIndexes = $scope.FOOD_ITEM_TABLE.scroller.page();
  console.log("displayIndexes: ",displayIndexes);

  for (var i = displayIndexes['start']; i <= displayIndexes['end']; i++)
  {
    var data = $scope.FOOD_ITEM_TABLE.row( ':eq('+ i +')', {order:'applied', search:'applied'} ).data();
    // scopeUI.FOOD_ITEM_TABLE.cell(TabelRow, 7).data(expLevel).draw();
    console.log("data: ",data);
  }

  $('.dataTables_scrollBody').on('scroll', function() {
      console.log("Here!!!!!!!!!!!!!!");
  });

}

$scope.IGAlist = [];
$(".IGASearch").keyup(function(){
  for (var i = 0; i < $scope.IGAlist.length; i++)
  {
    var IGAlist =  $scope.IGAlist[i];
    IGAlist.search($(this).val());
  }
});



$scope.IGGlist = [];
$(".IGGSearch").keyup(function(){
  for (var i = 0; i < $scope.IGGlist.length; i++)
  {
    var IGGlist =  $scope.IGGlist[i];
    IGGlist.search($(this).val());
  }
});
/////////////////////////////////////////////////////////
/////*** Apply Ingredients Border (STEP 4)****///////////
/////////////////////////////////////////////////////////
$scope.applyIngBorder = function(id) {
  //  var dietLen = Object.keys(PRECRIPTION.diettypes).length;

  // console.log("PRECRIPTION.diettypes!!",PRECRIPTION.fooditems);
  // diettypes Loop
  $.each(PRECRIPTION.diettypes, function(key, value) {
    // diettypes FoodItems Loop

    $.each(value['fooditems'], function(fkey, foods) {

      var ingID = foods['id'];
      var ingExp_level = foods['exp_level'];
      var listItem = $('#IngItem-' + ingID);
      if (listItem.length > 0) {
        appplyBorder(ingExp_level, listItem);
      }
    });
  });
}

/////////////////////////////////////////////////////////
/////*** Get Ingredients Details (STEP 4) ****///////////
////////////////////////////////////////////////////////
$scope.GetFoodIngredients = function(id, FoodName) {
  $scope.FoodName = FoodName;
  $('#showIngredients').modal('show');


  var options = {
    valueNames: ['filter', {
      data: ['id']
    }],
  };

  var foodIngs = new List('foodIngredients', options);
  foodIngs.clear();

  foodIngs = null;
  //Populate list
  for (var i = 0; i < $scope.fooditems.length; i++) {
    if (id == $scope.fooditems[i].id) {
      var length = $scope.fooditems[i]['Ingredients'].length;
      if (length != 0) {
        for (var j = 0; j < length; j++) {

          var recLevel = PRECRIPTION.getReactionLevel($scope.fooditems[i]['Ingredients'][j].IID);
          var fontCode = PRECRIPTION.fooditems[$scope.fooditems[i]['Ingredients'][j].IID];

          var Code       = fontCode['codes']['fontcode'];
          var color      = FONT_COLOR[Code];
          var bordercode = fontCode['codes']['bordercode'];
          var expLevel   = EXP_CODE_LEVEL[bordercode];

          SELECTABLE_TEMPLATE = '<a class=" list-group-item" id="IngItem-' + $scope.fooditems[i]['Ingredients'][j].IID + '" iid="' + $scope.fooditems[i]['Ingredients'][j].IID + '" data-id="' + $scope.fooditems[i]['Ingredients'][j].IID + '">';
          SELECTABLE_TEMPLATE += '  <span class="filter item-name" style="color:'+ color +'">' + $scope.fooditems[i]['Ingredients'][j].foodingredientName + '</span>';
          if(recLevel != 'IgA0' && recLevel != 'IgG0' && recLevel != 'IgG0')
          {
            SELECTABLE_TEMPLATE += '  <span class="name label label-sm label-info pull-right" style="margin-bottom:10px;"> ' + recLevel + ' </span>';
          }

          SELECTABLE_TEMPLATE += '<span>';
          SELECTABLE_TEMPLATE += '<select class="bs-select form-control" onchange="updateIngredientReactionType(this);">';
          SELECTABLE_TEMPLATE += '  <option value="No">No Experimentation</option>';
          SELECTABLE_TEMPLATE += '  <option value="Never">Never</option>';
          SELECTABLE_TEMPLATE += '  <option value="Allow">Allow</option>';
          SELECTABLE_TEMPLATE += '  <option value="Occasionally">Occasionally</option>';
          SELECTABLE_TEMPLATE += '  <option value="Try">Try</option>';
          SELECTABLE_TEMPLATE += ' </select>';
          SELECTABLE_TEMPLATE += '</span>';
          SELECTABLE_TEMPLATE += '</a>';

          $('#ingrdientsList').append(SELECTABLE_TEMPLATE);

          var listItem = $('#IngItem-' + $scope.fooditems[i]['Ingredients'][j].IID);

          if(expLevel != 'No')
          {
            appplyBorder(expLevel, listItem);
          }
          var IngRcode = REACTION_COLOR_CODE[recLevel];
          $(listItem).attr('backcode', IngRcode);
          $(listItem).css("background-color", BACKGROUND_COLOR[IngRcode]);
          //Show 2 options if font in Black
          if(Code == 0)
          {
            $($(listItem).find('select')[0].options).each(function(index, option) {
              if( option.value == 'Allow' || option.value == 'Try' || option.value == 'Occasionally' )
              {
                option.style.display = 'none';
              }
            });
          }
          //Set select value
          $(listItem).find('select')[0].value = expLevel;
        }
      } else {

        var recLevel = PRECRIPTION.getReactionLevel(id);
        var fontCode = PRECRIPTION.fooditems[id];

        var Code       = fontCode['codes']['fontcode'];
        var color      = FONT_COLOR[Code];
        var bordercode = fontCode['codes']['bordercode'];
        var expLevel   = EXP_CODE_LEVEL[bordercode];
        // console.log("color: ",color);
        SELECTABLE_TEMPLATE = '<a class=" list-group-item" data-id="' + id + '" id="IngItem-' + id + '" iid="' + id + '">';
        SELECTABLE_TEMPLATE += '  <span class="filter item-name" style="color:'+ color +'">' + FoodName + '</span>';
        if(recLevel != 'IgA0' && recLevel != 'IgG0' && recLevel != 'IgG0')
        {
          SELECTABLE_TEMPLATE += '  <span class="name label label-sm label-info pull-right"> ' + recLevel + ' </span>';
        }
        SELECTABLE_TEMPLATE += '<span>';
        SELECTABLE_TEMPLATE += '<select class="bs-select form-control" onchange="updateIngredientReactionType(this);">';
        SELECTABLE_TEMPLATE += '  <option value="No">No Experimentation</option>';
        SELECTABLE_TEMPLATE += '  <option value="Never">Never</option>';
        SELECTABLE_TEMPLATE += '  <option value="Allow">Allow</option>';
        SELECTABLE_TEMPLATE += '  <option value="Occasionally">Occasionally</option>';
        SELECTABLE_TEMPLATE += '  <option value="Try">Try</option>';
        SELECTABLE_TEMPLATE += ' </select>';
        SELECTABLE_TEMPLATE += '</span>';
        SELECTABLE_TEMPLATE += '</a>';

        $('#ingrdientsList').append(SELECTABLE_TEMPLATE);

        var listItem = $('#IngItem-' + id);

        if(expLevel != 'No')
        {
          appplyBorder(expLevel, listItem);
        }
        var IngRcode = REACTION_COLOR_CODE[recLevel];
        $(listItem).attr('backcode', IngRcode);
        $(listItem).css("background-color", BACKGROUND_COLOR[IngRcode]);
        //Show 2 options if font in Black
        if(Code == 0)
        {
          $($(listItem).find('select')[0].options).each(function(index, option) {
            if( option.value == 'Allow' || option.value == 'Occasionally' || option.value == 'Try' )
            {
              // option.hidden = true; // not fully compatible. option.style.display = 'none'; would be an alternative or $(option).hide();
              option.style.display = 'none';
            }
          });
        }
        //Set select value
        $(listItem).find('select')[0].value = expLevel;
      }
    }
  }
  //Reset Ingredients List
  var options = {
    valueNames: ['filter', {
      data: ['id']
    }],
  };
  foodIngs = new List('foodIngredients', options);
  // $scope.applyIngBorder(id);
}


//////////////////////////////////////////
/////*** Save Prescription (Step 5) **///
////////////////////////////////////////
$scope.savePrescription = function() {
  //Show Ajax Loader
  $('#pleaseWaitModal').modal('show');

  var pid = PRECRIPTION['patient']['id'];
  var url = API_URL + "storePrescription/" + pid;

  if($scope.editPrescriptionRecord == true)
  {
    url = API_URL + "updatePrescription/" + pid + "/" + $scope.editPrescriptionResponse['id'];

  }
  else if (typeof $scope.patientPrescriptionID != 'undefined' && $scope.patientPrescriptionID != null) {
    url = API_URL + "updatePrescription/" + pid + "/" + $scope.patientPrescriptionID;

  }
  else {

  }

  var data = {};
  data['MOList']             = PRECRIPTION['MOList'];
  data['MOInDietList']       = PRECRIPTION['MOInDietList'];
  data['MOExceptionList']    = PRECRIPTION['MOExceptionList'];
  data['status']             = PRECRIPTION['status'];
  data['last_modified']      = PRECRIPTION['last_modified'];
  data['include_reaction']   = PRECRIPTION['include_reaction'];
  data['autoimmune']         = PRECRIPTION['autoimmune'];
  data['foodPanels']         = PRECRIPTION['foodPanels'];
  data['ingreduentsLookup']  = PRECRIPTION['ingreduentsLookup'];
  data['fooditems']          = PRECRIPTION['fooditems'];
  data['diettypes']          = PRECRIPTION['diettypes'];
  data['shoppingList']       = PRECRIPTION['shoppingList'];
  data['sliderRanges']       = PRECRIPTION['sliderRanges'];
  data['finalList']          = PRECRIPTION['finalList'];
  data['recipelist']         = PRECRIPTION['recipelist'];
  data['comment']            = PRECRIPTION['comment'];
  data['patient']            = PRECRIPTION['patient'];

  var presData = JSON.stringify(data);


  // console.log("url:", url);
  $http({
    method: 'POST',
    url: url,
    data: presData,
    contentType: "json",
    processData: false,
  }).success(function(response) {

    $scope.patientPrescriptionID = response;
    $scope.genShoppingList();
    $scope.genComprehensiveList();
    $scope.genRecipeList();
    $scope.UploadFiles();
    // //Hide Ajax Loader
    // $('#pleaseWaitModal').modal('hide');
  }).error(function(response) {
    //console.log(response);
    //Hide Ajax Loader
    $('#pleaseWaitModal').modal('hide');
    alert('This is embarassing. An error has occured. Please check the log for details');
  });


}
$scope.editNewPrescription = function() {
  // $scope.editPrescriptionRecord = true;
  // $scope.editPrescriptionResponse['id'] = $scope.patientPrescriptionID;
  // console.log("$scope.patientPrescriptionID: ",$scope.patientPrescriptionID);
  // console.log("$scope.editPrescriptionResponse: ",$scope.editPrescriptionResponse);
}

$scope.UploadFiles = function() {
  var url = API_URL + "files";
  $http({
    method: 'POST',
    url: url,
    data: {
      ShoppingListData      : $scope.ShoppingListData,
      ComprehensiveListData : $scope.ComprehensiveListData,
      RecipeListData        : $scope.RecipeListData,
      pid                   : PRECRIPTION.patient['id'],
      infusionrecordID      : PRECRIPTION.patient['infusionrecordID'],
      comment               : PRECRIPTION['comment'],
    },
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  }).success(function(response) {
    //Hide Ajax loader
    $('#pleaseWaitModal').modal('hide');

    var patientresponse = response;
    console.log("Recipe response:",response);
  }).error(function(response) {
    //Hide Ajax loader
    $('#pleaseWaitModal').modal('hide');
    console.log("Recipe response:",response);
  });
}

/////////////////////////////////////////
////////LEGEND FILE////////
//////////////////////////////////////

$scope.genLegend = function() {

  var doc = new jsPDF();
  doc.page = 1;
  var count = 0;

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(76, 36, 'Legend for this Shopping List');
  doc.text(14, 56, 'Foods in Black');
  doc.text(68, 56, 'These are foods that maybe allowed on this diet.');
  doc.setTextColor(211, 211, 211);
  doc.text(14, 70, 'Light Gray Foods');
  doc.setTextColor(0, 0, 0);
  doc.text(68, 70, 'These are foods restricted from this diet.');

  doc.setFillColor(255, 255, 0);
  doc.rect(12, 79, 34, 8, 'F');
  doc.text(14, 84, 'Foods in Black');
  doc.text(68, 84, 'These are foods that are slightly sensitive and need to avoid today.');

  doc.setFillColor(255, 192,0);
  doc.rect(12, 93, 34, 8, 'F');
  doc.text(14, 98, 'Foods in Black');
  doc.text(68, 98, 'These are foods that are moderately sensitive and need to avoid them');
  doc.text(68, 103, 'for 3 months.');

  doc.setFillColor(237, 125, 49);
  doc.rect(12, 112, 34, 8, 'F');
  doc.text(14, 117, 'Foods in Black');
  doc.text(68, 117, 'These are foods that are little more sensitive and need to avoid them');
  doc.text(68, 122, 'for 6 months.');

  doc.setFillColor(255, 0, 0);
  doc.rect(12, 131, 34, 8, 'F');
  doc.text(14, 136, 'Foods in Black');
  doc.text(68, 136, 'These are foods that are highly sensitive and need to avoid them as');
  doc.text(68, 141, 'they produce allergic reactions.');
  doc.setFillColor(192, 0, 0);
  doc.rect(12, 150, 34, 8, 'F');
  doc.text(14, 155, 'Foods in Black');
  doc.text(68, 155, 'These are foods that are  most highly sensitive and need to avoid them as');
  doc.text(68, 160, 'they produce allergic reactions.');


  doc.setFillColor(255, 255, 0);
  doc.rect(12, 169, 34, 8, 'F');

  doc.setTextColor(211, 211, 211);
  doc.text(14, 174, 'Foods in Gray');

  doc.setFillColor(255, 192, 0);
  doc.rect(12, 177, 34, 8, 'F');
  doc.text(14, 182, 'Foods in Gray');

  doc.setFillColor(237, 125, 49);
  doc.rect(12, 186, 34, 8, 'F');
  doc.text(14, 191, 'Foods in Gray');

  doc.setTextColor(0, 0, 0);
  doc.text(68, 174, 'These foods have various sensitivities but moreover, they are');
  doc.text(68, 182, 'not allowed on this diet at this time.');
  doc.setDrawColor(0, 255, 255);
  doc.rect(12, 200, 34, 8);
  doc.setTextColor(211, 211, 211);
  doc.text(13, 205, 'Light Gray Foods');
  doc.setTextColor(0, 0, 0);
  doc.text(68, 205, 'These are foods that are going to experiment at this time');

  doc.setFillColor(255, 255, 0);
  doc.rect(12, 213, 34, 8, 'F');
  doc.setDrawColor(0, 255, 255);
  doc.rect(12,213, 34, 8);
  doc.setTextColor(0, 0, 0);
  doc.text(14, 218, 'Foods in Black');
  doc.setFillColor(255, 192, 0);
  doc.rect(12, 221, 34, 8, 'F');
  doc.setDrawColor(0, 255, 255);
  doc.rect(12, 221, 34, 8);
  doc.text(14, 226, 'Foods in Black');
  doc.setFillColor(237, 125, 49);
  doc.rect(12, 229, 34, 8, 'F');
  doc.setDrawColor(0, 255, 255);
  doc.rect(12, 229, 34, 8);
  doc.text(14, 234, 'Foods in Black');
  doc.setFillColor(255, 0, 0);
  doc.rect(12, 237, 34, 8, 'F');
  doc.setDrawColor(0, 255, 255);
  doc.rect(12, 237, 34, 8);
  doc.text(14, 242, 'Foods in Black');
  doc.setFillColor(192, 0, 0);
  doc.rect(12, 245, 34, 8, 'F');
  doc.setDrawColor(0, 255, 255);
  doc.rect(12, 245, 34, 8);
  doc.text(14, 250, 'Foods in Black');

  doc.text(68, 218, 'These are foods that are allowed for experimenting');
  doc.text(68, 226, 'in diet.');

  //Occasionally
  // doc.setFillColor(255, 255, 0);
  // doc.rect(12, 223, 34, 8, 'F');
  // doc.setDrawColor(0, 128, 0);
  // doc.rect(12, 223, 34, 8);
  // doc.setTextColor(0, 0, 0);
  // doc.text(14, 228, 'Foods in Black');
  //
  // doc.setFillColor(255, 127, 80);
  // doc.rect(12, 231, 34, 8, 'F');
  // doc.setDrawColor(0, 128, 0);
  // doc.rect(12, 231, 34, 8);
  // doc.text(14, 236, 'Foods in Black');
  //
  // doc.setFillColor(255, 160, 122);
  // doc.rect(12, 239, 34, 8, 'F');
  // doc.setDrawColor(0, 128, 0);
  // doc.rect(12, 239, 34, 8);
  // doc.text(14, 244, 'Foods in Black');

  //

  footer();

  doc.addPage();
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  var x = 14;
  var y = 41;
  var rectx = 12;
  var recty = 36;
  var br = 255;
  var bg = 255;
  var bb = 0;
  for (var i = 0; i < 5; i++)
  {
    if(i == 1)
    {
      br = 255;
      bg = 192;
      bb = 0;
    }
    else if (i == 2) {
      br = 237;
      bg = 125;
      bb = 49;
    }
    else if (i == 3) {
      br = 255;
      bg = 0;
      bb = 0;
    }
    else if (i == 4) {
      br = 192;
      bg = 0;
      bb = 0;
    }
    dottedLine(doc, rectx - 0.3, recty + 0.1, rectx - 0.3, recty + 8, 1); // first vertical line
    dottedLine(doc, rectx + 34.5, recty , rectx + 34.5, recty + 8, 1); // second vertical line
    dottedLine(doc, rectx - 0.3, recty - 0.5, rectx + 34.5, recty - 0.5, 1); //first horizontal line
    dottedLine(doc, rectx - 0.3, recty + 8.5, rectx + 34.5, recty + 8.5, 1); //second horizontal line
    ///function for dotted line////
    function dottedLine(doc, xFrom, yFrom, xTo, yTo, segmentLength) {
      // Calculate line length (c)
      var a = Math.abs(xTo - xFrom);
      var b = Math.abs(yTo - yFrom);
      var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

      // Make sure we have an odd number of line segments (drawn or blank)
      // to fit it nicely
      var fractions = c / segmentLength;
      var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));

      // Calculate x, y deltas per segment
      var deltaX = adjustedSegmentLength * (a / c);
      var deltaY = adjustedSegmentLength * (b / c);

      var curX = xFrom,
      curY = yFrom;
      while (curX <= xTo && curY <= yTo) {
        doc.setDrawColor(18, 215, 18);
        doc.line(curX, curY, curX + deltaX, curY + deltaY);
        curX += 2 * deltaX;
        curY += 2 * deltaY;
      }
    }
    doc.setFillColor(br, bg, bb);
    doc.rect(rectx, recty, 34, 8, 'F');
    doc.text(x, y, 'Foods in Black');
    y = y + 8;
    recty = recty + 8;
  }

  doc.text(68, 41, 'These foods with dashed green border are');
  doc.text(68, 49, 'foods that are used occasionally.');








  doc.setFillColor(255, 255, 0);
  doc.rect(12, 83, 34, 8, 'F');
  doc.setDrawColor(0,  128, 0);
  doc.rect(12, 83, 34, 8);
  doc.text(14, 88, 'Foods in Black');
  doc.setFillColor(255, 192, 0);
  doc.rect(12, 91, 34, 8, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setDrawColor(0, 128, 0);
  doc.rect(12, 91, 34, 8);

  doc.text(14,96, 'Foods in Black');
  doc.setFillColor(237, 125, 49);
  doc.rect(12, 99, 34, 8, 'F');
  doc.setDrawColor(0, 128, 0);
  doc.rect(12, 99, 34, 8);
  doc.setTextColor(0, 0, 0);
  doc.text(14,104, 'Foods in Black');

  doc.setFillColor(255, 0,0);
  doc.rect(12, 107 ,34, 8, 'F');
  doc.setDrawColor(0, 128, 0);
  doc.rect(12, 107, 34, 8);
  doc.setTextColor(0, 0, 0);
  doc.text(14, 112, 'Foods in Black');
  doc.setFillColor(192,0, 0);
  doc.rect(12, 115, 34, 8, 'F');
  doc.setDrawColor(0, 128, 0);
  doc.rect(12, 115, 34, 8);
  doc.setTextColor(0, 0, 0);
  doc.text(14, 120, 'Foods in Black');
  doc.text(68, 88, 'These foods are included in diet.');

  doc.setFillColor(255, 255, 0);
  doc.rect(12, 134, 34, 8, 'F');
  doc.setDrawColor(0, 1255, 0, 0);
  doc.rect(12, 134, 34, 8);
  doc.setTextColor(0, 0, 0);
  doc.text(14, 139, 'Foods in Black');
  doc.setFillColor(255, 192, 0);
  doc.rect(12,142 ,34, 8, 'F');
  doc.setDrawColor(255, 0, 0);
  doc.rect(12, 142, 34, 8);
  doc.text(14, 147, 'Foods in Black');
  doc.setFillColor(237, 125, 49);
  doc.rect(12, 150, 34, 8, 'F');
  doc.setDrawColor(255, 0, 0);
  doc.rect(12, 150, 34, 8);
  doc.text(14, 155, 'Foods in Black');
  doc.setDrawColor(255, 0, 0);
  doc.rect(12, 158, 34, 8);
  doc.text(14, 163, 'Foods in Black');

  doc.setFillColor(255, 0,0);
  doc.rect(12, 166, 34, 8, 'F');
  doc.setDrawColor(255, 0, 0);
  doc.rect(12, 166, 34, 8);
  doc.text(14, 171, 'Foods in Black');
  doc.setFillColor(192,0, 0);
  doc.rect(12, 174, 34, 8, 'F');
  doc.setDrawColor(255, 0, 0);
  doc.rect(12, 174, 34, 8);
  doc.text(14, 179, 'Foods in Black');
  doc.text(68, 139, 'Foods with red border are totally removed from diet because ');
  doc.text(68, 147, 'it may contain ingredients that cause auto-immune issues.');
  footer();

  var pdf = doc.output();

  var data = new FormData();
  data.append('data', pdf);
  data.append('filename', 'Legend');
  data.append('id', 'pdffileupload');


  var xhr = new XMLHttpRequest();
  xhr.open('post', '../app/uploadFile.php', true); //Post to php Script to save to server
  xhr.send(data);
  doc.save('Legend.pdf');

  function footer() {
    doc.setFontSize(10);
    doc.text(58, 290, 'Copyrights - 2017 Prescribe Diets. All Rights Reserved'); //print number bottom right
    doc.setFontSize(14);
    doc.text(88, 12, 'Diet Specification');
  };
}


///////////////////////////////////////////////////////
//////////END OF LEGEND FILE//////
/////////////////////////////////////////////////////





////////////////////////////////////////
////////SHOPPING LIST FILE////////
//////////////////////////////////////

$scope.genShoppingList = function() {
  console.log("In Shopping");
  var doc = new jsPDF();
  doc.page = 1;
  var count = 0;
  var prevcount = 0;

  footer();

  var categoriescount = Object.keys(PRECRIPTION.finalList).length;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  var i = 0;
  var j = 0;
  var x = 20;//20
  var xx = 10;//10
  var y = 31;//35
  var yy = 38;//42
  var check = 0;
  var check2 = 0;
  var rectx = 16;//16
  var recty = 16;//20

  var pageTop = true;



  while (categoriescount != 0) {
    if(y < 31)//35
    {
      y = y + 6+2;//10
      yy = yy + 6+2;//10
      recty = recty + 6+2;//10
    }
    if (y > 206) {//210
      y = y + 31;//35
      yy = yy + 21;//25
      recty = recty + 21;//25
    }
    if ((y > 236/*240**/ || yy > 236/*240**/) && (x == 20/*20*/ || x == 19/*19*/)) {
      x = 85;//85
      xx = 75;//75
      y = 31;//35
      yy = 38;//38
      rectx = 81;//81
      recty = 16;//20
    }
    if ((y > 244/*240**/) && ((x == 85/*85*/) || (xx == 75/*75*/))) {
      x = 150;//150
      xx = 140;//140
      y = 31;//35
      yy = 38;//42
      rectx = 146;//146
      recty = 16;//20
    }
    if ((y > 204/*200**/) && (x > 140/*140*/)) {
      check = 0;
      doc.addPage();
      prevcount = count;
      count++;
      footer();
      var x = 20;//20
      var xx = 10;//10
      var y = 31;//35
      var yy = 38;//42
      rectx = 16;//16
      recty = 16;//20
    }
    doc.setFontSize(10);
    doc.setDrawColor(0, 0, 0);
    doc.rect(xx, yy/**-4*/, 4, 4);
    doc.setFillColor(0, 0, 0);

    y = y + 6+4;//10
    yy = yy + 6+4;//10
    recty = recty + 6+4;//10




    doc.setTextColor(255, 255, 255);
    doc.setFillColor(0, 0, 0);
    doc.rect(rectx, y - 5, 55, 8, 'FD');
    var splitCatTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['Category'].Name, 50);
    doc.text(x, y, splitCatTitle[0]);


    var itemscount = Object.keys(PRECRIPTION.finalList[j]['FoodItems']).length;
    i = 0;
    check2 = 0;
    // console.log("////////////////////////////////////////////////////////////////////////////");
    // console.log("PRECRIPTION.finalList[j]['Category']",PRECRIPTION.finalList[j]['Category'].Name);
    // console.log("A",itemscount);
    // console.log("PRECRIPTION.finalList[j]['IsEmpty']",PRECRIPTION.finalList[j]['IsEmpty']);
    // console.log("////////////////////////////////////////////////////////////////////////////");


    if(PRECRIPTION.finalList[j]['IsEmpty'] == false)
    {
      doc.setTextColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      // console.log("itemscount",itemscount);
      y = y + 10;//10
      yy = yy + 10;//10
      recty = recty + 10;//10
      doc.rect(rectx, y - 5, 55, 8, 'FD');
      doc.text(x, y, 'No foods in this Category');
      //PRECRIPTION.finalList[j]['IsEmpty'] == true;
      //  doc.textWithLink('No foods in this Category', x, y-2, { url: "#" });
    }
    while (itemscount != 0) {
      if (y > 264/*260**/ || yy > 264/*260**/) {
        check = 0;
        if (x > 140) {
          doc.addPage();
          footer();
          x = 20;//20
          xx = 10;//10
          check = 1;
          rectx = 16;//16
        }
        if (x == 85) {//85
          x = 150; //150
          xx = 140;//140
          rectx = 146;//146
        }
        if (x == 20) {//20
          if (check != 1) {
            x = 85;//85
            xx = 75;//75
            rectx = 81;//81
          }
        }
        y = 27;//35
        yy = 34;//42
        recty = 12;//20
      }
      doc.setFontType("normal");
      doc.setFontSize(9);

      var fontr = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.r;
      var fontg = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.g;
      var fontb = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.b;

      var backr = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.r;
      var backg = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.g;
      var backb = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.b;



      var border_r = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.r;

      var border_g = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.g;

      var border_b = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.b;

      check2 = 1;

      if (PRECRIPTION.finalList[j]['FoodItems'][i].inshoppinglist == true)
      {
        if(((backr =='255' && backg =='0' && backb =='0' ) || (backr =='237' && backg =='125' && backb =='49' )) && (fontr =='155' && fontg =='155' && fontb == '155'))
        {
          fontr = 214;
          fontg = 209;
          fontb = 209;
        }
        else if(backr =='255' && backg =='192' && backb =='0' )
        {
          fontr = 239;
          fontg = 239;
          fontb = 239;
        }
        doc.setTextColor(fontr, fontg, fontb);
        doc.setDrawColor(0, 0, 0);
        doc.rect(xx, yy, 4, 4);


        // console.log('BACKGROUND R', bgr);
        // console.log('BACKGROUND G', bgg);
        // console.log('BACKGROUND B', bgb);

        var borderr = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.r;
        var borderg = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.g;
        var borderb = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.b;

        if(y<31)
        {

          y=y+4+4;
          yy=yy+4+4;
          recty=recty+4+4;
        }

        y = y + 10;
        if (check2 == 1) {
          recty = yy + 4;
        }
        // console.log('border r', borderr);
        // console.log('border g', borderg);
        // console.log('border b', borderb);

        var br = parseInt(borderr);
        var bg = parseInt(borderg);
        var bb = parseInt(borderb);

        var bgr = parseInt(backr);
        var bgg = parseInt(backg);
        var bgb = parseInt(backb);

        var bordertype = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.type;
        if (bordertype == 'solid') {


          doc.setDrawColor(br, bg, bb);
          // if((bgr == 237) && (bgg == 125) && (bgb == 49))
          doc.setFillColor(bgr, bgg, bgb);
          doc.setLineWidth(0.65);
          doc.rect(rectx, recty - 6, 55, 8, 'FD');
          doc.setLineWidth(0.30);

          doc.setDrawColor(255, 255, 255);
          //doc.rect(rectx+3, recty - 3, 54, 2);  //1

          //doc.rect(rectx+0.25, recty - 4, 56, 4);  //2
          doc.rect(rectx+0.25, recty - 5.75, 59.5, 7.5);


          doc.setLineWidth(0.15);
          var splitTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['FoodItems'][i].Name, 45);
          var foodName = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
          if(splitTitle.length >1)
          {
            doc.setFontSize(7.5);

            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(splitTitle[0], x, y-2, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(splitTitle[0], x, y-2, { url: "http://amazon.com" });
            }
            // y = y + 2;
            doc.text(x, y+2, splitTitle[1]);

          }
          else{
            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(foodName, x, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(foodName, x, y, { url: "http://amazon.com" });
            }
          }


        } else if (bordertype == 'dashed') {
          dottedLine(doc, rectx - 0.5, recty - 6, rectx - 0.5, recty + 2.5, 1); // first vertical line
          dottedLine(doc, rectx + 55.5, recty - 6, rectx + 55.5, recty + 2.5, 1); // second vertical line
          dottedLine(doc, rectx - 0.5, recty - 6.5, rectx + 55.2, recty - 6.5, 1); //first horizontal line
          dottedLine(doc, rectx - 0.5, recty + 2.5, rectx + 55.2, recty + 2.5, 1); //second horizontal line
          ///function for dotted line////
          function dottedLine(doc, xFrom, yFrom, xTo, yTo, segmentLength) {
            // Calculate line length (c)
            var a = Math.abs(xTo - xFrom);
            var b = Math.abs(yTo - yFrom);
            var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

            // Make sure we have an odd number of line segments (drawn or blank)
            // to fit it nicely
            var fractions = c / segmentLength;
            var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));

            // Calculate x, y deltas per segment
            var deltaX = adjustedSegmentLength * (a / c);
            var deltaY = adjustedSegmentLength * (b / c);

            var curX = xFrom,
            curY = yFrom;
            while (curX <= xTo && curY <= yTo) {
              doc.setDrawColor(br, bg, bb);
              doc.setLineWidth(0.65);
              doc.line(curX, curY, curX + deltaX, curY + deltaY);
              doc.setLineWidth(0.15);
              curX += 2 * deltaX;
              curY += 2 * deltaY;
            }
          }

          doc.setFillColor(bgr, bgg, bgb);
          doc.rect(rectx , recty - 6, 55, 8, 'F');
          var splitTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['FoodItems'][i].Name, 51);
          var foodName = PRECRIPTION.finalList[j]['FoodItems'][i].Name;

          // console.log('',foodName);
          // console.log("PRECRIPTION.finalList[j]['FoodItems'][i]",PRECRIPTION.finalList[j]['FoodItems'][i]);
          // if (foodName == '' || splitTitle=='') {
          //   console.log('empty food name');
          // }

          // var splitTitle = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
          if(splitTitle.length >1)
          {
            doc.setFontSize(8.5);

            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(splitTitle[0], x, y-2, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(splitTitle[0], x, y-2, { url: "http://amazon.com" });
            }
            // y = y + 2;
            doc.text(x, y+2.5, splitTitle[1]);

          }
          else{
            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(foodName, x, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(foodName, x, y, { url: "http://amazon.com" });
            }
          }

          // doc.text(x, y, splitTitle[0]);
        }

        doc.setDrawColor(255, 255, 255);
        yy = yy + 10;
      }
      i++;
      itemscount--;
    }
    categoriescount--;
    j++;
  }

  url = API_URL + "files";

  var timeStamp = Math.floor(Date.now() / 1000);
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }


  var today = mm + '/' + dd + '/' + yyyy;
  var filename  = patientfname+'_'+patientlname+'-Shopping_List-'+timeStamp+'.pdf';
  var filename2 = patientfname+'_'+patientlname+'-Shopping_List-'+timeStamp;
  var filetype  = 'ShoppingList';

  //Request for Storing or Updating Record
  //Base64 Enc for large data file
  var pdf = btoa(doc.output());

  // $http({
  //   method: 'POST',
  //   url: url,
  //   data: {
  //     prescriptionID   : $scope.patientPrescriptionID,
  //     prescriptionDate : PRECRIPTION['last_modified'],
  //     comments         : PRECRIPTION['comment'],
  //     Status           : PRECRIPTION['status'],
  //     pid              : pidfileupload,
  //     filename         : filename,
  //     filename2        : filename2,
  //     filetype         : filetype,
  //     // finalList        : PRECRIPTION.finalList
  //     pdf              : pdf
  //   },
  //   headers: { 'Content-Type': 'application/json; charset=utf-8' }
  // }).success(function(response) {
  //   var patientresponse = response;
  //   console.log("Shopping response:",response);
  // });

  $scope.ShoppingListData = {
    prescriptionID   : $scope.patientPrescriptionID,
    prescriptionDate : PRECRIPTION['last_modified'],
    comments         : PRECRIPTION['comment'],
    Status           : PRECRIPTION['status'],
    pid              : pidfileupload,
    filename         : filename,
    filename2        : filename2,
    filetype         : filetype,
    // finalList        : PRECRIPTION.finalList
    pdf              : pdf
  };

  // // var pdf = doc.output();
  // //Base64 Enc for large data file
  // var pdf = btoa(doc.output());
  //
  // var data = new FormData();
  // data.append('data', pdf);
  // data.append('filename', filename2);
  // data.append('id', pidfileupload);
  //
  //
  // var xhr = new XMLHttpRequest();
  // xhr.open('post', '../app/uploadFile.php', true); //Post to php Script to save to server
  // xhr.send(data);


  //Set for Downloading file from object
  //doc.save('ShoppingList.pdf');
  $scope.ShoppingListPdf = doc;

  function footer() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    var today = mm + '/' + dd + '/' + yyyy;

    doc.setFontSize(10);
    doc.text(58, 290, 'Copyrights - 2017 Prescribe Diets. All Rights Reserved'); //print number bottom right
    doc.setFontSize(12);
    doc.setFillColor(0, 128, 0);
    doc.rect(10, 8, 190, 18, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(12, 12, 'Shopping List Page ' + doc.page);
    doc.text(140, 12, 'All ingredients must be organic');
    doc.text(12, 22, patientfname + ' ' + patientlname);
    doc.text(177, 22, today);
    doc.page++;
  };

}

$scope.downloadfile = function(fileName)
{
  // $("#patientFname").val($scope.selectedPatient.fname);
  // PFName= $scope.selectedPatient.fname;
  // $("#lastname").val($scope.selectedPatient.lname);
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  var today = mm + '/' + dd + '/' + yyyy;


  if(fileName == 'ShoppingList')
  {
    $scope.ShoppingListPdf.save(patientfname + '_' + patientlname + '-' + today + '-' +'ShoppingList.pdf');
  }
  else if (fileName == 'ComprehensiveList')
  {
    $scope.ComprehensiveListPdf.save(patientfname + '_' + patientlname + '-' + today + '-' +'ComprehensiveList.pdf');
  }
  else if (fileName == 'RecipeList')
  {
    $scope.RecipeListPdf.save(patientfname + '_' + patientlname + '-' + today + '-' +'RecipeList.pdf');
  }
}

///////////////////////////////////////////////////////
//////////END OF SHOPPING LIST FILE//////
/////////////////////////////////////////////////////


///////////////////////////////////////
////////COMPREHENSIVE LIST FILE////////
//////////////////////////////////////

$scope.genComprehensiveList = function() {
  var details = JSON.stringify(PRECRIPTION.finalList);

  // var pdfdata = new FormData();
  // pdfdata.append('data', details);
  // // data.append('filename', filename2);
  // // data.append('id', pidfileupload);
  //
  // var xhr1 = new XMLHttpRequest();
  // xhr1.open('post', '../app/pdf.php', true); //Post to php Script to save to server
  // xhr1.send(pdfdata);

  var doc = new jsPDF();
  doc.page = 1;
  var count = 0;
  var prevcount = 0;


  footer();

  doc.addPage();
  footer();
  var categoriescount = Object.keys(PRECRIPTION.finalList).length;
  doc.setTextColor(0, 0, 0);

  var i = 0;
  var j = 0;
  var x = 14;//20
  var xx = 4;//10
  var y = 31;//35
  var yy = 38;//42
  var check = 0;
  var check2 = 0;
  var rectx = 10;//16
  var recty = 16;//20
  var checkcolor = 0;
  var checkTop = 0;





///////section 1
    doc.setFontType("bold");
  //  doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    // // var splitheading = doc.splitTextToSize('The following foods were foods that were removed from your deit and are now ok to have');
    //
    //
    // doc.text(x, y, 'The following foods were foods that were removed from your deit and are now ok to have');
    // //doc.writeText(x, y ,'align - center ', { align: 'center' });
    //
    //
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(103, 128, 159);
    doc.setDrawColor(103, 128, 159);
    doc.rect(rectx+2, y - 4, 180, 8, 'FD');
     doc.text(x+3, y, 'The following foods were foods that were removed from your diet and are now ok to have.');



    y=y+6;
    yy=yy+6;
    recty=recty+6;


  while (categoriescount != 0) {

    if(y < 36)//35
    {
      y = y + 6+ 4;//6//10
      yy = yy + 6+ 4;//6//10
      recty = recty + 6+ 4;//6//10
    }
    if (y > 206) {//210
      y = y + 31+ 4;//31//35
      yy = yy + 21+ 4;//21,25
      recty = recty + 11+ 4;//21.25
    }
    if ((y > 244/*240**/ || yy > 244/*240**/) && (x == 14/*20**/ || x == 13/*19*/)) {
      x = 79;//85
      xx = 69+2;//75
      y = 31 + 4;//31,35
      yy = 38+ 4;//38,42
      rectx = 71+2;//81
      recty = 16+ 4;//16,20
    }
    if ((y > 244/*240**/) && ((x == 79/*85*/) || (xx == 69/*75*/))) {
      x = 144;//150
      xx = 134+2;//140
      y = 31+ 4;//31,35
      yy = 38+ 4;//38,42
      rectx = 140;//146
      recty = 16+ 4;//16,20
    }
    if ((y > 204/*200**/) && (x > 136/*140*/)) {
      check = 0;
      doc.addPage();
      prevcount = count;
      count++;
      footer();
      var x = 14;//20
      var xx = 4;//10
      var y = 31+ 4;//31,35
      var yy = 38+ 4;//38,42
      rectx = 10;//16
      recty = 16+ 4;//16,20
    }

    doc.setFontSize(10);
    doc.setDrawColor(255, 255, 255);
    doc.rect(xx, yy, 4, 4);
    doc.setFillColor(0, 0, 0);


    if (checkTop == 0)
    {
      y = y + 6;
      yy = yy + 6;
      recty = recty + 6;
      checkTop = 1;
    }
    else {
      y = y + 6+4;
      yy = yy + 6+4;
      recty = recty + 6+4;
    }


    // doc.text(x, y, PRECRIPTION.finalList[j]['Category'].Name);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(0, 0, 0);
    // if(PRECRIPTION.finalList[j]['IsEmpty'] == true)
    // {
      // console.log("PRECRIPTION.finalList[j]['IsEmpty']",PRECRIPTION.finalList[j]['IsEmpty']);
        doc.rect(rectx, y - 5, 59, 8, 'FD');
        var splitCatTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['Category'].Name, 50);


        doc.text(x, y, splitCatTitle[0]);

        var itemscount = Object.keys(PRECRIPTION.finalList[j]['FoodItems']).length;
        i = 0;
        check2 = 0;
        while (itemscount != 0) {
          doc.setFontType("normal");

          if (y > 264/*260**/ || yy > 264/*260**/) {
            check = 0;
            if (x > 140) {
              doc.addPage();
              footer();
              x = 14;//20
              xx = 4;//10
              check = 1;
              rectx = 10;//16
            }
            if (x == 79/**85*/) {
              x = 144;//150
              xx = 134+2;//140
              rectx = 140;//146
            }

            if (x == 14/*20*/) {
              if (check != 1) {
                x = 79;//85
                xx = 69+2;//75
                rectx = 75;//81
              }
            }
            y = 27+ 4;//27//29//31//35
            yy = 34+ 4;//34//36//38//42
            recty = 12+ 4;//12//14//16//20
          }
          doc.setFontType("normal");
          doc.setFontSize(9);

          var fontr = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.r;
          var fontg = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.g;
          var fontb = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.b;

          var backr = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.r;
          var backg = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.g;
          var backb = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.b;

          var borr = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.r;

          var borg = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.g;

          var borb = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.b;

          var fcode    = PRECRIPTION.finalList[j]['FoodItems'][i].codes.fontcode;
          var borcode  = PRECRIPTION.finalList[j]['FoodItems'][i].codes.bordercode;
          var backcode = PRECRIPTION.finalList[j]['FoodItems'][i].codes.backcode;

          // console.log("'PRECRIPTION.finalList[j]['FoodItems'][i].codes'",PRECRIPTION.finalList[j]['FoodItems'][i].codes);



          check2 = 1;


          if (PRECRIPTION.finalList[j]['FoodItems'][i].comprehensiveList == true) {
            doc.setDrawColor(0, 0, 0);

            if(((backr =='255' && backg =='0' && backb =='0' ) || (backr =='237' && backg =='125' && backb =='49' )) && (fontr =='155' && fontg =='155' && fontb == '155'))
            {
              fontr = 214;
              fontg = 209;
              fontb = 209;
            }
            else if(backr =='255' && backg =='192' && backb =='0' )
            {
              fontr = 239;
              fontg = 239;
              fontb = 239;
            }
            doc.setTextColor(fontr, fontg, fontb);
            //doc.rect(xx, yy, 4, 4);



            var br = parseInt(borr);
            var bg = parseInt(borg);
            var bb = parseInt(borb);
            // console.log('borderR',br );
            // console.log('borderG',bg );
            // console.log('borderB',bb );
            var bgr = parseInt(backr);
            var bgg = parseInt(backg);
            var bgb = parseInt(backb);

            var bordertype = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.type;


            if (bordertype == 'solid') {
              if ((br == 18 && bg== 215 && bb == 18) || (fcode=='0' && borcode =='0' && backcode == '0' ))
               {
                 y = y + 10;
                 if (check2 == 1) {
                   recty = yy + 4;
                  //  xx=xx+4;
                 }
                  //  console.log('br',br);
                  //  console.log('bg',bg);
                  // console.log('borb',bb);


                doc.setDrawColor(br, bg, bb);

                doc.setFillColor(bgr, bgg, bgb);
                var splitTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['FoodItems'][i].Name, 51);
                // if(splitTitle.length > 1){
                //  doc.setFontSize(7.5);
                //  console.log('Y before split', y);
                //  //doc.text(x, y, splitTitle[0]);
                //  console.log('title first part', splitTitle[0]);
                //  y=y+2;
                //  console.log('Y after split', y);
                //  //doc.text(x, y, splitTitle[1]);
                //
                //    console.log('title second part', splitTitle[1]);
                // // recty=recty+2;
                // //     console.log('shift text within rectangle to next line', splitTitle.length);
                // //doc.rect(rectx, recty - 6, 55, 8, 'FD');
                //  }
                doc.setLineWidth(0.65);

                doc.rect(rectx, recty - 6, 60, 8, 'FD');
                // doc.rect(rectx +3, recty - 9, 66, 14, 'FD');
                doc.setLineWidth(0.30);

                doc.setDrawColor(255, 255, 255);
                //doc.rect(rectx+3, recty - 3, 54, 2);  //1

                //doc.rect(rectx+0.25, recty - 4, 56, 4);  //2
                doc.rect(rectx+0.25, recty - 5.75, 59.5, 7.5);




                var foodName = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
                // var splitTitle = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
                if(splitTitle.length >1)
                {
                  doc.setFontSize(8);
                  //   if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
                  //   {
                  //     doc.textWithLink(foodName, x-3, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
                  //   }
                  //   else {
                  //     doc.textWithLink(foodName, x-3, y, { url: "http://amazon.com" });
                  //   }


                  if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
                  {
                    doc.textWithLink(splitTitle[0], x, y-1.65, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
                  }
                  else {
                    doc.textWithLink(splitTitle[0], x, y-1.65, { url: "http://amazon.com" });
                  }
                  // y = y + 2;
                  doc.text(x, y+1.75, splitTitle[1]);

                }
                else if(splitTitle.length >= 2)
                {
                  //console.log('length greater or equal to 2');
                  doc.setFontSize(5.5);
                  if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
                  {
                    doc.textWithLink(foodName, x-3.5, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
                  }
                  else {
                    doc.textWithLink(foodName, x-3.5, y, { url: "http://amazon.com" });
                  }
                }
                else{
                  if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
                  {
                    doc.textWithLink(foodName, x, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
                  }
                  else {
                    doc.textWithLink(foodName, x, y, { url: "http://amazon.com" });
                  }
                }
              doc.setDrawColor(255, 255, 255);

              yy = yy + 10;
              }

              // doc.text(x, y, splitTitle[0]);
            }




          }
          i++;
          itemscount--;
        }
  //}////empty category remove check
    categoriescount--;
    j++;

  }

/////// Section 2



categoriescount = Object.keys(PRECRIPTION.finalList).length;
// console.log('categoriescount before second');
 i = 0;
 j = 0;



 x = 14;//20
 xx = 4;//10
 y = 31;//35
 yy = 38;//42
 check = 0;
 check2 = 0;
 rectx = 10;//16
 recty = 16;//20
 checkcolor = 0;
 var section2Page = doc.page;
 // console.log('section2Page',section2Page);
 doc.addPage();
 footer();

// doc.setPage(1);
 doc.setFontType("bold");
 // doc.setTextColor(0, 0, 0);
 doc.setFontSize(8.5);
 doc.setTextColor(255, 255, 255);
 doc.setFillColor(103, 128, 159);
 doc.setDrawColor(103, 128, 159);
 doc.rect(rectx+2, y - 4, 180, 10, 'FD');
 // var splitheading = doc.splitTextToSize('The following foods were foods that were removed from your deit and are now ok to have');

 doc.text(x, y, 'These are foods that we are waiting for you to experiment with. Please enter them into your dietary area by Capitalizing each food');
   doc.text(x, y+3, ' so that our nutritionist can look out for health patterns with regard to this/these food(s)');


 // doc.text(10, 149, 'Some Definitions')
 y=y+6;
 yy=yy+6;
 recty=recty+6

  while (categoriescount != 0) {

    //  console.log('x in second while',x);
    //  console.log('y in second while',y);
    //  console.log('yy in second while',y);
    //  console.log('xx in second while',xx);
    // console.log('in while 2');
    if(y <36)//36,35
    {
      y = y + 6+ 4+2;//6//10
      yy = yy + 6+ 4+2;//6//10
      recty = recty + 6+ 4+2;//6//10
    }
    if (y > 206) {//210
      y = y + 31+ 4+2;//31//35
      yy = yy + 21+ 4+2;//21,25
      recty = recty + 11+ 4+2;//21.25
    }
    if ((y > 244/*240**/ || yy > 244/*240**/) && (x == 14/*20**/ || x == 13/*19*/)) {
      x = 79;//85
      xx = 69;//75
      y = 31 + 4+2;//31,35
      yy = 38+ 4+2;//38,42
      rectx = 76;//81
      recty = 16+ 4+2;//16,20
    }
    if ((y > 244/*240**/ || yy > 244/*240**/) && (x == 14/*20**/ || x == 13/*19*/)) {
      x = 79;//85
      xx = 69+2;//75
      y = 31 + 4;//31,35
      yy = 38+ 4;//38,42
      rectx = 71+4;//81
      recty = 16+ 4;//16,20
    }
    if ((y > 244/*240**/) && ((x == 79/*85*/) || (xx == 69/*75*/))) {
      x = 144;//150
      xx = 134+2;//140
      y = 31+ 4;//31,35
      yy = 38+ 4;//38,42
      rectx = 140;//146
      recty = 16+ 4;//16,20
    }
    if ((y > 204/*200**/) && (x > 136/*140*/)) {
      check = 0;
      doc.addPage();
      prevcount = count;
      count++;
      footer();
      var x = 14;//20
      var xx = 4;//10
      var y = 31+ 4;//31,35
      var yy = 38+ 4;//38,42
      rectx = 10;//16
      recty = 16+ 4;//16,20
    }

    doc.setFontSize(10);
    doc.setDrawColor(255, 255, 255);
    doc.rect(xx, yy, 4, 4);
    doc.setFillColor(0, 0, 0);


    if (checkTop == 0)
    {
      y = y + 6;
      yy = yy + 6;
      recty = recty + 6;
      checkTop = 1;
    }
    else {
      y = y + 6+4;
      yy = yy + 6+4;
      recty = recty + 6+4;
    }


    // doc.text(x, y, PRECRIPTION.finalList[j]['Category'].Name);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(0, 0, 0);
    // if(PRECRIPTION.finalList[j]['IsEmpty'] == true)
    // {
      // console.log("PRECRIPTION.finalList[j]['IsEmpty']",PRECRIPTION.finalList[j]['IsEmpty']);
        doc.rect(rectx, y - 5, 59, 8, 'FD');
        var splitCatTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['Category'].Name, 50);


        doc.text(x, y, splitCatTitle[0]);

        var itemscount = Object.keys(PRECRIPTION.finalList[j]['FoodItems']).length;
        i = 0;
        check2 = 0;
        while (itemscount != 0) {
          doc.setFontType("normal");

          if (y > 264/*260**/ || yy > 264/*260**/) {
            check = 0;
            if (x > 140) {
              doc.addPage();
              footer();
              x = 14;//20
              xx = 4;//10
              check = 1;
              rectx = 10;//16
            }
            if (x == 79/**85*/) {
              x = 144;//150
              xx = 134+2;//140
              rectx = 140;//146
            }

            if (x == 14/*20*/) {
              if (check != 1) {
                x = 79;//85
                xx = 69+2;//75
                rectx = 75;//81
              }
            }
            y = 27+ 4;//27//29//31//35
            yy = 34+ 4;//34//36//38//42
            recty = 12+ 4;//12//14//16//20
          }
      doc.setFontType("normal");
      doc.setFontSize(9);

      var fontr = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.r;
      var fontg = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.g;
      var fontb = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.b;

      var backr = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.r;
      var backg = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.g;
      var backb = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.b;

      var borr = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.r;

      var borg = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.g;

      var borb = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.b;

      var fcode    = PRECRIPTION.finalList[j]['FoodItems'][i].codes.fontcode;
      var borcode  = PRECRIPTION.finalList[j]['FoodItems'][i].codes.bordercode;
      var backcode = PRECRIPTION.finalList[j]['FoodItems'][i].codes.backcode;

      // console.log("'PRECRIPTION.finalList[j]['FoodItems'][i].codes'",PRECRIPTION.finalList[j]['FoodItems'][i].codes);



      check2 = 1;


      if (PRECRIPTION.finalList[j]['FoodItems'][i].comprehensiveList == true) {
        doc.setDrawColor(0, 0, 0);

        if(((backr =='255' && backg =='0' && backb =='0' ) || (backr =='237' && backg =='125' && backb =='49' )) && (fontr =='155' && fontg =='155' && fontb == '155'))
        {
          fontr = 214;
          fontg = 209;
          fontb = 209;
        }
        else if(backr =='255' && backg =='192' && backb =='0' )
        {
          fontr = 239;
          fontg = 239;
          fontb = 239;
        }
        doc.setTextColor(fontr, fontg, fontb);
        //doc.rect(xx, yy, 4, 4);

        // if(y<38)
        // {
        //   console.log("y38",y);
        //   console.log("yy38",y);
        //   console.log("recty38",y);
        //   y=y+6;
        //   yy=yy+6;
        //   recty=recty+6;
        // }
        // y = y + 10;
        // if (check2 == 1) {
        //   recty = yy + 4;
        // }


        var br = parseInt(borr);
        var bg = parseInt(borg);
        var bb = parseInt(borb);
        // console.log('borderR',br );
        // console.log('borderG',bg );
        // console.log('borderB',bb );
        var bgr = parseInt(backr);
        var bgg = parseInt(backg);
        var bgb = parseInt(backb);

        var bordertype = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.type;


        if (bordertype == 'solid') {
          if (br == 16 && bg == 158 && bb == 231)
           {
             if(y <36)//35
             {
               y = y + 6+ 4;//6//10
               yy = yy + 6+ 4;//6//10
               recty = recty + 6+ 4;//6//10
             }
             y = y + 10;
             if (check2 == 1) {
               recty = yy + 4;
             }
            //  console.log('br in sec2 ',br);
            //  console.log('bg in sec2 ',bg);
            //    console.log('bb in sec2 ',bb);




            doc.setDrawColor(br, bg, bb);

            doc.setFillColor(bgr, bgg, bgb);
            var splitTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['FoodItems'][i].Name, 51);

            doc.setLineWidth(0.65);

            doc.rect(rectx, recty - 6, 60, 8, 'FD');
            // doc.rect(rectx +3, recty - 9, 66, 14, 'FD');
            doc.setLineWidth(0.30);

            doc.setDrawColor(255, 255, 255);
            //doc.rect(rectx+3, recty - 3, 54, 2);  //1

            //doc.rect(rectx+0.25, recty - 4, 56, 4);  //2
            doc.rect(rectx+0.25, recty - 5.75, 59.5, 7.5);




            var foodName = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
            // var splitTitle = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
            if(splitTitle.length >1)
            {
              doc.setFontSize(8);
              //   if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
              //   {
              //     doc.textWithLink(foodName, x-3, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
              //   }
              //   else {
              //     doc.textWithLink(foodName, x-3, y, { url: "http://amazon.com" });
              //   }


              if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
              {
                doc.textWithLink(splitTitle[0], x, y-1.65, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
              }
              else {
                doc.textWithLink(splitTitle[0], x, y-1.65, { url: "http://amazon.com" });
              }
              // y = y + 2;
              doc.text(x, y+1.75, splitTitle[1]);

            }
            else if(splitTitle.length >= 2)
            {
              //console.log('length greater or equal to 2');
              doc.setFontSize(5.5);
              if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
              {
                doc.textWithLink(foodName, x-3.5, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
              }
              else {
                doc.textWithLink(foodName, x-3.5, y, { url: "http://amazon.com" });
              }
            }
            else{
              if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
              {
                doc.textWithLink(foodName, x, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
              }
              else {
                doc.textWithLink(foodName, x, y, { url: "http://amazon.com" });
              }
            }
          doc.setDrawColor(255, 255, 255);

          yy = yy + 10;
          }

          // doc.text(x, y, splitTitle[0]);
        }




      }
      i++;
      itemscount--;
    }
    categoriescount--;
    j++;

  }



  ////// Section 3



  // doc.text(10, 149, 'Some Definitions')

  categoriescount = Object.keys(PRECRIPTION.finalList).length;

  // console.log('categoriescount before third');
   i = 0;
   j = 0;
   x = 14;//20
   xx = 4;//10
   y = 31;//35
   yy = 38;//42
   check = 0;
   check2 = 0;
   rectx = 10;//16
   recty = 16;//20
   checkcolor = 0;
   var section3Page = doc.page;
   // console.log('section3Page',section3Page);
   doc.addPage();
   footer();

   doc.setFontType("bold");
  //  doc.setTextColor(0, 0, 0);//
  //  doc.setFontSize(8);
   // var splitheading = doc.splitTextToSize('The following foods were foods that were removed from your deit and are now ok to have');
   doc.setFontSize(8.5);
   doc.setTextColor(255, 255, 255);
   doc.setFillColor(103, 128, 159);
   doc.setDrawColor(103, 128, 159);
   doc.rect(rectx+2, y - 4, 180, 8, 'FD');

     doc.text(x, y, 'These are foods that you can have occasionally. Please consume one choice from amongst these foods each day');
     y=y+6;
     yy=yy+6;
     recty=recty+6;

    while (categoriescount != 0) {
      if(y <36)//35
      {
        y = y + 6+ 4;//6//10
        yy = yy + 6+ 4;//6//10
        recty = recty + 6+ 4;//6//10
      }
      if (y > 206) {//210
        y = y + 31+ 4;//31//35
        yy = yy + 21+ 4;//21,25
        recty = recty + 11+ 4;//21.25
      }
      if ((y > 244/*240**/ || yy > 244/*240**/) && (x == 14/*20**/ || x == 13/*19*/)) {
        x = 79;//85
        xx = 69+2;//75
        y = 31 + 4;//31,35
        yy = 38+ 4;//38,42
        rectx = 71+4;//2,81
        recty = 16+ 4;//16,20
      }
      if ((y > 244/*240**/) && ((x == 79/*85*/) || (xx == 69/*75*/))) {
        x = 144;//150
        xx = 134+2;//140
        y = 31+ 4;//31,35
        yy = 38+ 4;//38,42
        rectx = 140;//146
        recty = 16+ 4;//16,20
      }
      if ((y > 204/*200**/) && (x > 136/*140*/)) {
        check = 0;
        doc.addPage();
        prevcount = count;
        count++;
        footer();
        var x = 14;//20
        var xx = 4;//10
        var y = 31+ 4;//31,35
        var yy = 38+ 4;//38,42
        rectx = 10;//16
        recty = 16+ 4;//16,20
      }

      doc.setFontSize(10);
      doc.setDrawColor(255, 255, 255);
      doc.rect(xx, yy, 4, 4);
      doc.setFillColor(0, 0, 0);


      if (checkTop == 0)
      {
        y = y + 6;
        yy = yy + 6;
        recty = recty + 6;
        checkTop = 1;
      }
      else {
        y = y + 6+4;
        yy = yy + 6+4;
        recty = recty + 6+4;
      }


      // doc.text(x, y, PRECRIPTION.finalList[j]['Category'].Name);
      doc.setTextColor(255, 255, 255);
      doc.setFillColor(0, 0, 0);
      // if(PRECRIPTION.finalList[j]['IsEmpty'] == true)
      // {
        // console.log("PRECRIPTION.finalList[j]['IsEmpty']",PRECRIPTION.finalList[j]['IsEmpty']);
          doc.rect(rectx, y - 5, 59, 8, 'FD');
          var splitCatTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['Category'].Name, 50);


          doc.text(x, y, splitCatTitle[0]);

          var itemscount = Object.keys(PRECRIPTION.finalList[j]['FoodItems']).length;
          i = 0;
          check2 = 0;
          while (itemscount != 0) {
            doc.setFontType("normal");

            if (y > 264/*260**/ || yy > 264/*260**/) {
              check = 0;
              if (x > 140) {
                doc.addPage();
                footer();
                x = 14;//20
                xx = 4;//10
                check = 1;
                rectx = 10;//16
              }
              if (x == 79/**85*/) {
                x = 144;//150
                xx = 134+2;//140
                rectx = 140;//146
              }

              if (x == 14/*20*/) {
                if (check != 1) {
                  x = 79;//85
                  xx = 69+2;//75
                  rectx = 75;//81
                }
              }
              y = 27+ 4;//27//29//31//35
              yy = 34+ 4;//34//36//38//42
              recty = 12+ 4;//12//14//16//20
            }
        doc.setFontType("normal");
        doc.setFontSize(9);

        var fontr = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.r;
        var fontg = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.g;
        var fontb = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.b;

        var backr = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.r;
        var backg = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.g;
        var backb = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.b;

        var borr = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.r;

        var borg = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.g;

        var borb = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.b;

        var fcode    = PRECRIPTION.finalList[j]['FoodItems'][i].codes.fontcode;
        var borcode  = PRECRIPTION.finalList[j]['FoodItems'][i].codes.bordercode;
        var backcode = PRECRIPTION.finalList[j]['FoodItems'][i].codes.backcode;

        // console.log("'PRECRIPTION.finalList[j]['FoodItems'][i].codes'",PRECRIPTION.finalList[j]['FoodItems'][i].codes);



        check2 = 1;


        if (PRECRIPTION.finalList[j]['FoodItems'][i].comprehensiveList == true) {
          doc.setDrawColor(0, 0, 0);

          if(((backr =='255' && backg =='0' && backb =='0' ) || (backr =='237' && backg =='125' && backb =='49' )) && (fontr =='155' && fontg =='155' && fontb == '155'))
          {
            fontr = 214;
            fontg = 209;
            fontb = 209;
          }
          else if(backr =='255' && backg =='192' && backb =='0' )
          {
            fontr = 239;
            fontg = 239;
            fontb = 239;
          }
          doc.setTextColor(fontr, fontg, fontb);
          //doc.rect(xx, yy, 4, 4);

          // y = y + 10;
          // if (check2 == 1) {
          //   recty = yy + 4;
          // }


          var br = parseInt(borr);
          var bg = parseInt(borg);
          var bb = parseInt(borb);
          // console.log('borderR',br );
          // console.log('borderG',bg );
          // console.log('borderB',bb );
          var bgr = parseInt(backr);
          var bgg = parseInt(backg);
          var bgb = parseInt(backb);

          var bordertype = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.type;

         if (bordertype == 'dashed')
         {

           if (borr =='18' && borg=='215' && borb == '18')
            {
              if(y<36)
              {

                y=y+6+4;
                yy=yy+6+4;
                recty=recty+6+4;
              }
              y = y + 10;
              if (check2 == 1)
              {
                recty = yy + 4;
              }

          dottedLine(doc, rectx - 0.5, recty - 5.5, rectx - 0.5, recty + 2.2, 1); // first vertical line
          dottedLine(doc, rectx + 60.3, recty - 5.5, rectx + 60.3, recty + 2.2, 1); // second vertical line
          dottedLine(doc, rectx - 0.5, recty - 6.5, rectx + 60.2, recty - 6.5, 1); //first horizontal line
          dottedLine(doc, rectx - 0.5, recty + 2.5, rectx + 60.2, recty + 2.5, 1); //second horizontal line

          //function for dotted line
          function dottedLine(doc, xFrom, yFrom, xTo, yTo, segmentLength) {
            // Calculate line length (c)
            var a = Math.abs(xTo - xFrom);
            var b = Math.abs(yTo - yFrom);
            var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

            // Make sure we have an odd number of line segments (drawn or blank)
            // to fit it nicely
            var fractions = c / segmentLength;
            var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));

            // Calculate x, y deltas per segment
            var deltaX = adjustedSegmentLength * (a / c);
            var deltaY = adjustedSegmentLength * (b / c);

            var curX = xFrom,
            curY = yFrom;
            while (curX <= xTo && curY <= yTo) {
              doc.setDrawColor(br, bg, bb);
              doc.setLineWidth(0.65);
              doc.line(curX, curY, curX + deltaX, curY + deltaY);
              doc.setLineWidth(0.15);
              curX += 2 * deltaX;
              curY += 2 * deltaY;
            }
          }
          doc.setFillColor(bgr, bgg, bgb);

          doc.rect(rectx, recty - 6, 59, 8, 'F');
          var splitTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['FoodItems'][i].Name, 51);

          var foodName = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
          // var splitTitle = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
          if(splitTitle.length >1)
          {
            doc.setFontSize(9);
            //   if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            //   {
            //     doc.textWithLink(foodName, x-3, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            //   }
            //   else {
            //     doc.textWithLink(foodName, x-3, y, { url: "http://amazon.com" });
            //   }



            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(splitTitle[0], x, y-1.75, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(splitTitle[0], x, y-1.75, { url: "http://amazon.com" });
            }
            // y = y + 2;
            doc.text(x, y+1.75, splitTitle[1]);

          }
          else if(splitTitle.length >= 2)
          {
            //console.log('length greater or equal to 2');
            doc.setFontSize(5.5);
            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(foodName, x-3.5, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(foodName, x-3.5, y, { url: "http://amazon.com" });
            }
          }
          else{
            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(foodName, x, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(foodName, x, y, { url: "http://amazon.com" });
            }
          }

        }//inner if
        doc.setDrawColor(255, 255, 255);

        yy = yy + 10;

        }




        }
        i++;
        itemscount--;
      }
      categoriescount--;
      j++;
    }


///// Section 4


// doc.text(10, 149, 'Some Definitions')


categoriescount = Object.keys(PRECRIPTION.finalList).length;
// console.log('categoriescount before 4',categoriescount);
 i = 0;
 j = 0;



 x = 14;//20
 xx = 4;//10
 y = 31;//35
 yy = 38;//42
 check = 0;
 check2 = 0;
 rectx = 10;//16
 recty = 16;//20
 checkcolor = 0;
 var section4Page = doc.page;
 // console.log('section4Page',section4Page);
 doc.addPage();
 footer();


 doc.setFontType("bold");
 //  doc.setTextColor(0, 0, 0);//
 //  doc.setFontSize(8);
  // var splitheading = doc.splitTextToSize('The following foods were foods that were removed from your deit and are now ok to have');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(103, 128, 159);
  doc.setDrawColor(103, 128, 159);
  doc.rect(rectx+2, y - 4, 180, 7.5, 'FD');
   doc.text(x-2, y, 'The following foods will be in your diet at some point, but based on food reactions or dietry restrictions they are not currently in your diet');
   //doc.text(x, y, 'The Following food swill be in your diet at some point, but baised on food reactions or dietry restrictions they are not currently in your deit');
   y=y+4+2;
   yy=yy+4+2;
   recty=recty+4+2;

  while (categoriescount != 0) {
    if(y <36)//35
    {
      y = y + 6+ 4+2;//6//10
      yy = yy + 6+ 4+2;//6//10
      recty = recty + 6+ 4+2;//6//10
    }
    if (y > 206) {//210
      y = y + 31+ 4;//31//35
      yy = yy + 21+ 4;//21,25
      recty = recty + 11+ 4;//21.25
    }
    if ((y > 244/*240**/ || yy > 244/*240**/) && (x == 14/*20**/ || x == 13/*19*/)) {
      x = 79;//85
      xx = 69+2;//75
      y = 31 + 4;//31,35
      yy = 38+ 4;//38,42
      rectx = 71+4;//2,81
      recty = 16+ 4;//16,20
    }
    if ((y > 244/*240**/) && ((x == 79/*85*/) || (xx == 69/*75*/))) {
      x = 144;//150
      xx = 134+2;//140
      y = 31+ 4;//31,35
      yy = 38+ 4;//38,42
      rectx = 140;//146
      recty = 16+ 4;//16,20
    }
    if ((y > 204/*200**/) && (x > 136/*140*/)) {
      check = 0;
      doc.addPage();
      prevcount = count;
      count++;
      footer();
      var x = 14;//20
      var xx = 4;//10
      var y = 31+ 4;//31,35
      var yy = 38+ 4;//38,42
      rectx = 10;//16
      recty = 16+ 4;//16,20
    }

    doc.setFontSize(10);
    doc.setDrawColor(255, 255, 255);
    doc.rect(xx, yy, 4, 4);
    doc.setFillColor(0, 0, 0);


    if (checkTop == 0)
    {
      y = y + 6;
      yy = yy + 6;
      recty = recty + 6;
      checkTop = 1;
    }
    else {
      y = y + 6+4;
      yy = yy + 6+4;
      recty = recty + 6+4;
    }


    // doc.text(x, y, PRECRIPTION.finalList[j]['Category'].Name);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(0, 0, 0);
    // if(PRECRIPTION.finalList[j]['IsEmpty'] == true)
    // {
      // console.log("PRECRIPTION.finalList[j]['IsEmpty']",PRECRIPTION.finalList[j]['IsEmpty']);
        doc.rect(rectx, y - 5, 59, 8, 'FD');
        var splitCatTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['Category'].Name, 50);


        doc.text(x, y, splitCatTitle[0]);



        var itemscount = Object.keys(PRECRIPTION.finalList[j]['FoodItems']).length;
        i = 0;
        check2 = 0;
        while (itemscount != 0) {
          doc.setFontType("normal");

          if (y > 264/*260**/ || yy > 264/*260**/) {
            check = 0;
            if (x > 140) {
              doc.addPage();
              footer();
              x = 14;//20
              xx = 4;//10
              check = 1;
              rectx = 10;//16
            }
            if (x == 79/**85*/) {
              x = 144;//150
              xx = 134+2;//140
              rectx = 140;//146
            }

            if (x == 14/*20*/) {
              if (check != 1) {
                x = 79;//85
                xx = 69+2;//75
                rectx = 75;//81
              }
            }
            y = 27+ 4;//27//29//31//35
            yy = 34+ 4;//34//36//38//42
            recty = 12+ 4;//12//14//16//20
          }
      doc.setFontType("normal");
      doc.setFontSize(9);

      var fontr = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.r;
      var fontg = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.g;
      var fontb = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.b;

      var backr = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.r;
      var backg = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.g;
      var backb = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.b;

      var borr = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.r;

      var borg = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.g;

      var borb = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.b;

      var fcode    = PRECRIPTION.finalList[j]['FoodItems'][i].codes.fontcode;
      var borcode  = PRECRIPTION.finalList[j]['FoodItems'][i].codes.bordercode;
      var backcode = PRECRIPTION.finalList[j]['FoodItems'][i].codes.backcode;

      // console.log("'PRECRIPTION.finalList[j]['FoodItems'][i].codes'",PRECRIPTION.finalList[j]['FoodItems'][i].codes);



      check2 = 1;


      if (PRECRIPTION.finalList[j]['FoodItems'][i].comprehensiveList == true) {
        doc.setDrawColor(0, 0, 0);

        if(((backr =='255' && backg =='0' && backb =='0' ) || (backr =='237' && backg =='125' && backb =='49' )) && (fontr =='155' && fontg =='155' && fontb == '155'))
        {
          fontr = 214;
          fontg = 209;
          fontb = 209;
        }
        else if(backr =='255' && backg =='192' && backb =='0' )
        {
          fontr = 239;
          fontg = 239;
          fontb = 239;
        }
        doc.setTextColor(fontr, fontg, fontb);
        //doc.rect(xx, yy, 4, 4);

        // y = y + 10;
        // if (check2 == 1) {
        //   recty = yy + 4;
        // }


        var br = parseInt(borr);
        var bg = parseInt(borg);
        var bb = parseInt(borb);
        // console.log('borderR',br );
        // console.log('borderG',bg );
        // console.log('borderB',bb );
        var bgr = parseInt(backr);
        var bgg = parseInt(backg);
        var bgb = parseInt(backb);

        var bordertype = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.type;


        if (bordertype == 'solid') {
          if (((fontr == '155' && fontg == '155' && fontb == '155') && (borcode =='0')) || ((fontr == '0' && fontg == '0' && fontb == '0') && (backcode != '0') && (borcode =='0')))
           {
             if(y<36)
             {
              //  console.log("y38",y);
              //  console.log("yy38",y);
              //  console.log("recty38",y);
               y=y+6+4;
               yy=yy+6+4;
               recty=recty+6+4;
             }
             y = y + 10;
             if (check2 == 1) {
               recty = yy + 4;
             }

            //  console.log('in 4th case');




            doc.setDrawColor(br, bg, bb);

            doc.setFillColor(bgr, bgg, bgb);
            var splitTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['FoodItems'][i].Name, 51);

            doc.setLineWidth(0.65);

            doc.rect(rectx, recty - 6, 60, 8, 'FD');
            // doc.rect(rectx +3, recty - 9, 66, 14, 'FD');
            doc.setLineWidth(0.30);

            doc.setDrawColor(255, 255, 255);
            //doc.rect(rectx+3, recty - 3, 54, 2);  //1

            //doc.rect(rectx+0.25, recty - 4, 56, 4);  //2
            doc.rect(rectx+0.25, recty - 5.75, 59.5, 7.5);




            var foodName = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
            // var splitTitle = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
            if(splitTitle.length >1)
            {
              doc.setFontSize(8);
              if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
              {
                doc.textWithLink(splitTitle[0], x, y-1.65, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
              }
              else {
                doc.textWithLink(splitTitle[0], x, y-1.65, { url: "http://amazon.com" });
              }
              doc.text(x, y+1.75, splitTitle[1]);

            }
            else if(splitTitle.length >= 2)
            {
              //console.log('length greater or equal to 2');
              doc.setFontSize(5.5);
              if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
              {
                doc.textWithLink(foodName, x-3.5, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
              }
              else {
                doc.textWithLink(foodName, x-3.5, y, { url: "http://amazon.com" });
              }
            }
            else{
              if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
              {
                doc.textWithLink(foodName, x, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
              }
              else {
                doc.textWithLink(foodName, x, y, { url: "http://amazon.com" });
              }
            }
          doc.setDrawColor(255, 255, 255);

          yy = yy + 10;
          }

        }




      }
      i++;
      itemscount--;
    }
    categoriescount--;
    j++;

  }


  ///// Section 5



  // doc.text(10, 149, 'Some Definitions')

  categoriescount = Object.keys(PRECRIPTION.finalList).length;
  // console.log('categoriescount before 4',categoriescount);
   i = 0;
   j = 0;



   x = 14;//20
   xx = 4;//10
   y = 31;//35
   yy = 38;//42
   check = 0;
   check2 = 0;
   rectx = 10;//16
   recty = 16;//20
   checkcolor = 0;
   var section5Page = doc.page;
   // console.log('section5Page',section5Page);
   doc.addPage();
   footer();

   doc.setFontType("bold");
   //  doc.setTextColor(0, 0, 0);
     doc.setFontSize(10);
     // // var splitheading = doc.splitTextToSize('The following foods were foods that were removed from your deit and are now ok to have');
     //
     //
     // doc.text(x, y, 'The following foods were foods that were removed from your deit and are now ok to have');
     // //doc.writeText(x, y ,'align - center ', { align: 'center' });
     //
     //
     doc.setTextColor(255, 255, 255);
     doc.setFillColor(103, 128, 159);
     doc.setDrawColor(103, 128, 159);
     doc.rect(rectx+2, y - 4, 180, 8, 'FD');
     doc.text(x+24, y, 'These are the foods that have been removed from your diet');
     y=y+1;
     yy=yy+1;
     recty=recty+1;

    while (categoriescount != 0) {

      //  console.log('x in second while',x);
      //  console.log('y in second while',y);
      //  console.log('yy in second while',y);
      //  console.log('xx in second while',xx);
      // console.log('in while 2');
      if(y <36)//35
      {
        y = y + 6+ 4;//6//10
        yy = yy + 6+ 4;//6//10
        recty = recty + 6+ 4;//6//10
      }
      if (y > 206) {//210
        y = y + 31+ 4;//31//35
        yy = yy + 21+ 4;//21,25
        recty = recty + 11+ 4;//21.25
      }
      if ((y > 244/*240**/ || yy > 244/*240**/) && (x == 14/*20**/ || x == 13/*19*/)) {
        x = 79;//85
        xx = 69+2;//75
        y = 31 + 4;//31,35
        yy = 38+ 4;//38,42
        rectx = 71+4;//81
        recty = 16+ 4;//16,20
      }
      if ((y > 244/*240**/) && ((x == 79/*85*/) || (xx == 69/*75*/))) {
        x = 144;//150
        xx = 134+2;//140
        y = 31+ 4;//31,35
        yy = 38+ 4;//38,42
        rectx = 140;//146
        recty = 16+ 4;//16,20
      }
      if ((y > 204/*200**/) && (x > 136/*140*/)) {
        check = 0;
        doc.addPage();
        prevcount = count;
        count++;
        footer();
        var x = 14;//20
        var xx = 4;//10
        var y = 31+ 4;//31,35
        var yy = 38+ 4;//38,42
        rectx = 10;//16
        recty = 16+ 4;//16,20
      }

      doc.setFontSize(10);
      doc.setDrawColor(255, 255, 255);
      doc.rect(xx, yy, 4, 4);
      doc.setFillColor(0, 0, 0);


      if (checkTop == 0)
      {
        y = y + 6;
        yy = yy + 6;
        recty = recty + 6;
        checkTop = 1;
      }
      else {
        y = y + 6+4;
        yy = yy + 6+4;
        recty = recty + 6+4;
      }


      // doc.text(x, y, PRECRIPTION.finalList[j]['Category'].Name);
      doc.setTextColor(255, 255, 255);
      doc.setFillColor(0, 0, 0);
      // if(PRECRIPTION.finalList[j]['IsEmpty'] == true)
      // {
        // console.log("PRECRIPTION.finalList[j]['IsEmpty']",PRECRIPTION.finalList[j]['IsEmpty']);
          doc.rect(rectx, y - 5, 59, 8, 'FD');
          var splitCatTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['Category'].Name, 50);


          doc.text(x, y, splitCatTitle[0]);

          var itemscount = Object.keys(PRECRIPTION.finalList[j]['FoodItems']).length;
          i = 0;
          check2 = 0;
          while (itemscount != 0) {
            doc.setFontType("normal");

            if (y > 264/*260**/ || yy > 264/*260**/) {
              check = 0;
              if (x > 140) {
                doc.addPage();
                footer();
                x = 14;//20
                xx = 4;//10
                check = 1;
                rectx = 10;//16
              }
              if (x == 79/**85*/) {
                x = 144;//150
                xx = 134+2;//140
                rectx = 140;//146
              }

              if (x == 14/*20*/) {
                if (check != 1) {
                  x = 79;//85
                  xx = 69+2;//75
                  rectx = 75;//81
                }
              }
              y = 27+ 4;//27//29//31//35
              yy = 34+ 4;//34//36//38//42
              recty = 12+ 4;//12//14//16//20
            }
        doc.setFontType("normal");
        doc.setFontSize(9);

        var fontr = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.r;
        var fontg = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.g;
        var fontb = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.b;

        var backr = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.r;
        var backg = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.g;
        var backb = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.b;

        var borr = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.r;

        var borg = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.g;

        var borb = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.b;

        var fcode    = PRECRIPTION.finalList[j]['FoodItems'][i].codes.fontcode;
        var borcode  = PRECRIPTION.finalList[j]['FoodItems'][i].codes.bordercode;
        var backcode = PRECRIPTION.finalList[j]['FoodItems'][i].codes.backcode;

        // console.log("'PRECRIPTION.finalList[j]['FoodItems'][i].codes'",PRECRIPTION.finalList[j]['FoodItems'][i].codes);



        check2 = 1;


        if (PRECRIPTION.finalList[j]['FoodItems'][i].comprehensiveList == true) {
          doc.setDrawColor(0, 0, 0);

          if(((backr =='255' && backg =='0' && backb =='0' ) || (backr =='237' && backg =='125' && backb =='49' )) && (fontr =='155' && fontg =='155' && fontb == '155'))
          {
            fontr = 214;
            fontg = 209;
            fontb = 209;
          }
          else if(backr =='255' && backg =='192' && backb =='0' )
          {
            fontr = 239;
            fontg = 239;
            fontb = 239;
          }
          doc.setTextColor(fontr, fontg, fontb);
          //doc.rect(xx, yy, 4, 4);

          // y = y + 10;
          // if (check2 == 1) {
          //   recty = yy + 4;
          // }


          var br = parseInt(borr);
          var bg = parseInt(borg);
          var bb = parseInt(borb);
          // console.log('borderR',br );
          // console.log('borderG',bg );
          // console.log('borderB',bb );
          var bgr = parseInt(backr);
          var bgg = parseInt(backg);
          var bgb = parseInt(backb);

          var bordertype = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.type;


          if (bordertype == 'solid') {
            if (br == 196 && bg== 0 && bb == 0)
             {
               if(y<36)
               {
                 // console.log("y38",y);
                 // console.log("yy38",y);
                 // console.log("recty38",y);
                 y=y+6;
                 yy=yy+6;
                 recty=recty+6;
               }
               y = y + 10;
               if (check2 == 1) {
                 recty = yy + 4;
               }
               // console.log('in 5th case');




              doc.setDrawColor(br, bg, bb);

              doc.setFillColor(bgr, bgg, bgb);
              var splitTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['FoodItems'][i].Name, 51);

              doc.setLineWidth(0.65);

              doc.rect(rectx, recty - 6, 60, 8, 'FD');
              // doc.rect(rectx +3, recty - 9, 66, 14, 'FD');
              doc.setLineWidth(0.30);

              doc.setDrawColor(255, 255, 255);
              //doc.rect(rectx+3, recty - 3, 54, 2);  //1

              //doc.rect(rectx+0.25, recty - 4, 56, 4);  //2
              doc.rect(rectx+0.25, recty - 5.75, 59.5, 7.5);




              var foodName = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
              // var splitTitle = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
              if(splitTitle.length >1)
              {
                doc.setFontSize(8);
                //   if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
                //   {
                //     doc.textWithLink(foodName, x-3, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
                //   }
                //   else {
                //     doc.textWithLink(foodName, x-3, y, { url: "http://amazon.com" });
                //   }


                if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
                {
                  doc.textWithLink(splitTitle[0], x, y-1.65, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
                }
                else {
                  doc.textWithLink(splitTitle[0], x, y-1.65, { url: "http://amazon.com" });
                }
                // y = y + 2;
                doc.text(x, y+1.75, splitTitle[1]);

              }
              else if(splitTitle.length >= 2)
              {
                //console.log('length greater or equal to 2');
                doc.setFontSize(5.5);
                if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
                {
                  doc.textWithLink(foodName, x-3.5, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
                }
                else {
                  doc.textWithLink(foodName, x-3.5, y, { url: "http://amazon.com" });
                }
              }
              else{
                if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
                {
                  doc.textWithLink(foodName, x, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
                }
                else {
                  doc.textWithLink(foodName, x, y, { url: "http://amazon.com" });
                }
              }
            doc.setDrawColor(255, 255, 255);

            yy = yy + 10;
            }

            // doc.text(x, y, splitTitle[0]);
          }




        }
        i++;
        itemscount--;
      }
      categoriescount--;
      j++;

    }


    ////// Complete List
  //  categoriescount = Object.keys(PRECRIPTION.finalList).length;

    i = 0;
    j = 0;



    x = 14;//20
    xx = 4;//10
    y = 31;//35
    yy = 38;//42
    check = 0;
    check2 = 0;
    rectx = 10;//16
    recty = 16;//20
    checkcolor = 0;
    var section6Page = doc.page;
    // console.log('section5Page',section6Page);
    doc.addPage();
    footer();

    // console.log('section5Page',section5Page);

    doc.setFontType("bold");
    doc.setFontSize(10);
    // // var splitheading = doc.splitTextToSize('The following foods were foods that were removed from your deit and are now ok to have');
    //
    //
    // doc.text(x, y, 'The following foods were foods that were removed from your deit and are now ok to have');
    // //doc.writeText(x, y ,'align - center ', { align: 'center' });
    //
    //
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(103, 128, 159);
    doc.setDrawColor(103, 128, 159);
    doc.rect(rectx+2, y - 4, 180, 8, 'FD');
    doc.text(x+50, y, 'Complete Comprehensive List');
    y=y+6;
    yy=yy+6;
    recty=recty+6;


    // doc.text(10, 149, 'Some Definitions')

    categoriescount = Object.keys(PRECRIPTION.finalList).length;

    while (categoriescount != 0) {
      // console.log('complete list whilw');
      if(y <36)//35
      {
        y = y + 6+ 4;//6//10
        yy = yy + 6+ 4;//6//10
        recty = recty + 6+ 4;//6//10
      }
      if (y > 206) {//210
        y = y + 31+ 4;//31//35
        yy = yy + 21+ 4;//21,25
        recty = recty + 11+ 4;//21.25
      }
      if ((y > 244/*240**/ || yy > 244/*240**/) && (x == 14/*20**/ || x == 13/*19*/)) {
        x = 79;//85
        xx = 69+2;//75
        y = 31 + 4;//31,35
        yy = 38+ 4;//38,42
        rectx = 71+4;//81
        recty = 16+ 4;//16,20
      }
      if ((y > 244/*240**/) && ((x == 79/*85*/) || (xx == 69/*75*/))) {
        x = 144;//150
        xx = 134+2;//140
        y = 31+ 4;//31,35
        yy = 38+ 4;//38,42
        rectx = 140;//146
        recty = 16+ 4;//16,20
      }
      if ((y > 204/*200**/) && (x > 136/*140*/)) {
        check = 0;
        doc.addPage();
        prevcount = count;
        count++;
        footer();
        var x = 14;//20
        var xx = 4;//10
        var y = 31+ 4;//31,35
        var yy = 38+ 4;//38,42
        rectx = 10;//16
        recty = 16+ 4;//16,20
      }

      doc.setFontSize(10);
      doc.setDrawColor(255, 255, 255);
      doc.rect(xx, yy, 4, 4);
      doc.setFillColor(0, 0, 0);


      if (checkTop == 0)
      {
        y = y + 6;
        yy = yy + 6;
        recty = recty + 6;
        checkTop = 1;
      }
      else {
        y = y + 6+4;
        yy = yy + 6+4;
        recty = recty + 6+4;
      }


      // doc.text(x, y, PRECRIPTION.finalList[j]['Category'].Name);
      doc.setTextColor(255, 255, 255);
      doc.setFillColor(0, 0, 0);
      // if(PRECRIPTION.finalList[j]['IsEmpty'] == true)
      // {
        // console.log("PRECRIPTION.finalList[j]['IsEmpty']",PRECRIPTION.finalList[j]['IsEmpty']);
          doc.rect(rectx, y - 5, 59, 8, 'FD');
          var splitCatTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['Category'].Name, 50);


          doc.text(x, y, splitCatTitle[0]);

          var itemscount = Object.keys(PRECRIPTION.finalList[j]['FoodItems']).length;
          i = 0;
          check2 = 0;
          while (itemscount != 0) {
            doc.setFontType("normal");

            if (y > 264/*260**/ || yy > 264/*260**/) {
              check = 0;
              if (x > 140) {
                doc.addPage();
                footer();
                x = 14;//20
                xx = 4;//10
                check = 1;
                rectx = 10;//16
              }
              if (x == 79/**85*/) {
                x = 144;//150
                xx = 134+2;//140
                rectx = 140;//146
              }

              if (x == 14/*20*/) {
                if (check != 1) {
                  x = 79;//85
                  xx = 69+2;//75
                  rectx = 75;//81
                }
              }
              y = 27+ 4;//27//29//31//35
              yy = 34+ 4;//34//36//38//42
              recty = 12+ 4;//12//14//16//20
            }
      doc.setFontType("normal");
      doc.setFontSize(9);

      var fontr = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.r;
      var fontg = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.g;
      var fontb = PRECRIPTION.finalList[j]['FoodItems'][i].color.font.b;

      var backr = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.r;
      var backg = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.g;
      var backb = PRECRIPTION.finalList[j]['FoodItems'][i].color.background.b;

      var borr = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.r;

      var borg = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.g;

      var borb = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.color.b;



      check2 = 1;


      if (PRECRIPTION.finalList[j]['FoodItems'][i].comprehensiveList == true) {
        doc.setDrawColor(0, 0, 0);

        if(((backr =='255' && backg =='0' && backb =='0' ) || (backr =='237' && backg =='125' && backb =='49' )) && (fontr =='155' && fontg =='155' && fontb == '155'))
        {
          fontr = 214;
          fontg = 209;
          fontb = 209;
        }
        else if(backr =='255' && backg =='192' && backb =='0' )
        {
          fontr = 239;
          fontg = 239;
          fontb = 239;
        }
        doc.setTextColor(fontr, fontg, fontb);
        //doc.rect(xx, yy, 4, 4);

        if(y<36)
        {
          // console.log("y38",y);
          // console.log("yy38",y);
          // console.log("recty38",y);
          y=y+6+4;
          yy=yy+6+4;
          recty=recty+6+4;
        }

        y = y + 10;
        if (check2 == 1) {
          recty = yy + 4;
        }


        var br = parseInt(borr);
        var bg = parseInt(borg);
        var bb = parseInt(borb);
        // console.log('borderR',br );
        // console.log('borderG',bg );
        // console.log('borderB',bb );
        var bgr = parseInt(backr);
        var bgg = parseInt(backg);
        var bgb = parseInt(backb);

        var bordertype = PRECRIPTION.finalList[j]['FoodItems'][i].color.border.type;


        if (bordertype == 'solid') {
          doc.setDrawColor(br, bg, bb);

          doc.setFillColor(bgr, bgg, bgb);
          var splitTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['FoodItems'][i].Name, 51);

          doc.setLineWidth(0.65);

          doc.rect(rectx, recty - 6, 60, 8, 'FD');
          // doc.rect(rectx +3, recty - 9, 66, 14, 'FD');
          doc.setLineWidth(0.30);

          doc.setDrawColor(255, 255, 255);
          //doc.rect(rectx+3, recty - 3, 54, 2);  //1

          //doc.rect(rectx+0.25, recty - 4, 56, 4);  //2
          doc.rect(rectx+0.25, recty - 5.75, 59.5, 7.5);




          var foodName = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
          // var splitTitle = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
          if(splitTitle.length >1)
          {
            doc.setFontSize(8);
            //   if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            //   {
            //     doc.textWithLink(foodName, x-3, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            //   }
            //   else {
            //     doc.textWithLink(foodName, x-3, y, { url: "http://amazon.com" });
            //   }


            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(splitTitle[0], x, y-1.65, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(splitTitle[0], x, y-1.65, { url: "http://amazon.com" });
            }
            // y = y + 2;
            doc.text(x, y+1.75, splitTitle[1]);

          }
          else if(splitTitle.length >= 2)
          {
            //console.log('length greater or equal to 2');
            doc.setFontSize(5.5);
            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(foodName, x-3.5, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(foodName, x-3.5, y, { url: "http://amazon.com" });
            }
          }
          else{
            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(foodName, x, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(foodName, x, y, { url: "http://amazon.com" });
            }
          }


          // doc.text(x, y, splitTitle[0]);
        } else if (bordertype == 'dashed') {
          // if(y<38)
          // {
          //   console.log("ycom",y);
          //   console.log("yycom",y);
          //   console.log("rectycom",y);
          //   y=y+6;
          //   yy=yy+6;
          //   recty=recty+6;
          // }
          // y = y + 10;
          // if (check2 == 1)
          // {
          //   recty = yy + 4;
          // }
          dottedLine(doc, rectx - 0.5, recty - 5.5, rectx - 0.5, recty + 2.2, 1); // first vertical line
          dottedLine(doc, rectx + 60.3, recty - 5.5, rectx + 60.3, recty + 2.2, 1); // second vertical line
          dottedLine(doc, rectx - 0.5, recty - 6.5, rectx + 60.2, recty - 6.5, 1); //first horizontal line
          dottedLine(doc, rectx - 0.5, recty + 2.5, rectx + 60.2, recty + 2.5, 1); //second horizontal line

          //function for dotted line
          function dottedLine(doc, xFrom, yFrom, xTo, yTo, segmentLength) {
            // Calculate line length (c)
            var a = Math.abs(xTo - xFrom);
            var b = Math.abs(yTo - yFrom);
            var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

            // Make sure we have an odd number of line segments (drawn or blank)
            // to fit it nicely
            var fractions = c / segmentLength;
            var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));

            // Calculate x, y deltas per segment
            var deltaX = adjustedSegmentLength * (a / c);
            var deltaY = adjustedSegmentLength * (b / c);

            var curX = xFrom,
            curY = yFrom;
            while (curX <= xTo && curY <= yTo) {
              doc.setDrawColor(br, bg, bb);
              doc.setLineWidth(0.65);
              doc.line(curX, curY, curX + deltaX, curY + deltaY);
              doc.setLineWidth(0.15);
              curX += 2 * deltaX;
              curY += 2 * deltaY;
            }
          }
          doc.setFillColor(bgr, bgg, bgb);

          doc.rect(rectx, recty - 6, 59, 8, 'F');
          var splitTitle = doc.splitTextToSize(PRECRIPTION.finalList[j]['FoodItems'][i].Name, 51);

          var foodName = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
          // var splitTitle = PRECRIPTION.finalList[j]['FoodItems'][i].Name;
          if(splitTitle.length >1)
          {
            doc.setFontSize(9);
            //   if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            //   {
            //     doc.textWithLink(foodName, x-3, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            //   }
            //   else {
            //     doc.textWithLink(foodName, x-3, y, { url: "http://amazon.com" });
            //   }



            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(splitTitle[0], x, y-1.75, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(splitTitle[0], x, y-1.75, { url: "http://amazon.com" });
            }
            // y = y + 2;
            doc.text(x, y+1.75, splitTitle[1]);

          }
          else if(splitTitle.length >= 2)
          {
            //console.log('length greater or equal to 2');
            doc.setFontSize(5.5);
            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(foodName, x-3.5, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(foodName, x-3.5, y, { url: "http://amazon.com" });
            }
          }
          else{
            if(PRECRIPTION.finalList[j]['FoodItems'][i].Url != null)
            {
              doc.textWithLink(foodName, x, y, { url: PRECRIPTION.finalList[j]['FoodItems'][i].Url });
            }
            else {
              doc.textWithLink(foodName, x, y, { url: "http://amazon.com" });
            }
          }

        }

        doc.setDrawColor(255, 255, 255);

        yy = yy + 10;
      }
      i++;
      itemscount--;
    }
    categoriescount--;
    j++;
  }

  categoriescount = Object.keys(PRECRIPTION.finalList).length;
  // console.log('categoriescount before second');
   i = 0;
   j = 0;


   doc.setPage(1)
   x = 14;//20
   xx = 4;//10
   y = 31;//35
   yy = 38;//42
   check = 0;
   check2 = 0;
   rectx = 10;//16
   recty = 16;//20
   checkcolor = 0;
  //  doc.addPage();
  //  footer();
//Table of content
  doc.setFontType("bold");
  //  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);

  doc.setTextColor(255, 255, 255);
  doc.setFillColor(103, 128, 159);
  doc.setDrawColor(103, 128, 159);
  doc.rect(rectx+2, y - 4, 180, 8, 'FD');
   doc.text(x+75, y+2, 'Table of Contents');

   y=y+12;
   yy=yy+12;
   recty=recty+12;
     doc.setFontSize(12);
     doc.setTextColor(0, 0, 0);
   doc.setFontType("bold");
   doc.text(x+10, y, 'Title');
   doc.text(x+155, y, 'Page');
   y=y+12;
   yy=yy+12;
   recty=recty+12;
   doc.setFontSize(11);

   doc.setFontType("normal");

   doc.text(x+3, y, '1. ');

   doc.text(x+10, y, 'Foods that are now ok to have .............................................................................');
   doc.text(x+158, y, '2');

   y=y+8;
   yy=yy+8;
   recty=recty+8;

   doc.text(x+3, y, '2. ');

   doc.text(x+10, y, 'Foods that we are waiting for you to experiment with ..........................................');
   // console.log('toc2', section2Page);

   var sec2page = section2Page.toString();
   // console.log('sec2page', sec2page);
   doc.text(x+158, y, sec2page);

   y=y+8;
   yy=yy+8;
   recty=recty+8;

   doc.text(x+3, y, '3. ');

   doc.text(x+10, y, 'Foods that you can have occasionally .................................................................');
   // console.log('toc3',section3Page);
   var sec3page = section3Page.toString();
   // console.log('sec3page', sec3page);
   doc.text(x+158, y, sec3page);

   y=y+8;
   yy=yy+8;
   recty=recty+8;

   doc.text(x+3, y, '4. ');

   doc.text(x+10, y, 'Foods that will be in your diet at some point ......................................................');
   // console.log('toc4',section4Page);
   var sec4page = section4Page.toString();
   // console.log('sec3page', sec4page);
   doc.text(x+158, y, sec4page);

   y=y+8;
   yy=yy+8;
   recty=recty+8;

   doc.text(x+3, y, '5. ');

   doc.text(x+10, y, 'Foods that have been removed from your diet ....................................................');
   // console.log('toc5',section5Page);
   var sec5page = section5Page.toString();
   // console.log('sec5page', sec5page);
   doc.text(x+158, y, sec5page);

   y=y+8;
   yy=yy+8;
   recty=recty+8;

   doc.text(x+3, y, '6. ');

   doc.text(x+10, y, 'Complete Comprehensive List ............................................................................');
   // console.log('toc6',section6Page);
   var sec6page = section6Page.toString();
   // console.log('sec5page', sec6page);
   doc.text(x+158, y, sec6page);











  var timeStamp = Math.floor(Date.now() / 1000);
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }


  var today = mm + '/' + dd + '/' + yyyy;
  var filename = patientfname+'_'+patientlname+'ComprehensiveList_'+timeStamp+'.pdf';
  var filename2 = patientfname+'_'+patientlname+'ComprehensiveList_'+timeStamp;
  var filetype = 'ComprehensiveList';

  url = API_URL + "files";

  // //Request for Storing or Updating Record
  // $http({
  //   method: 'POST',
  //   url: url,
  //   data: {
  //     prescriptionID   : $scope.patientPrescriptionID,
  //     prescriptionDate : PRECRIPTION['last_modified'],
  //     comments         : PRECRIPTION['comment'],
  //     Status           : PRECRIPTION['status'],
  //     pid            : pidfileupload,
  //     filename       : filename,
  //     filetype       : filetype
  //   },
  //   headers: {
  //     'Content-Type': 'application/json; charset=utf-8'
  //   }
  // }).success(function(response) {
  //   var patientresponse = response;
  //
  // });

  //Request for Storing or Updating Record
  //Base64 Enc for large data file
  var pdf = btoa(doc.output());
  // $http({
  //   method: 'POST',
  //   url: url,
  //   data: {
  //     prescriptionID   : $scope.patientPrescriptionID,
  //     prescriptionDate : PRECRIPTION['last_modified'],
  //     comments         : PRECRIPTION['comment'],
  //     Status           : PRECRIPTION['status'],
  //     pid              : pidfileupload,
  //     filename         : filename,
  //     filename2        : filename2,
  //     filetype         : filetype,
  //     // finalList        : PRECRIPTION.finalList
  //     pdf              : pdf
  //   },
  //   headers: { 'Content-Type': 'application/json; charset=utf-8' }
  // }).success(function(response) {
  //   var patientresponse = response;
  //   console.log("Comprehensive response:",response);
  // });

  $scope.ComprehensiveListData = {
    prescriptionID   : $scope.patientPrescriptionID,
    prescriptionDate : PRECRIPTION['last_modified'],
    comments         : PRECRIPTION['comment'],
    Status           : PRECRIPTION['status'],
    pid              : pidfileupload,
    filename         : filename,
    filename2        : filename2,
    filetype         : filetype,
    // finalList        : PRECRIPTION.finalList
    pdf              : pdf
  };

  // // var pdf = doc.output();
  // //Base64 Enc for large data file
  // var pdf = btoa(doc.output());
  //
  // var data = new FormData();
  // data.append('data', pdf);
  // data.append('filename', filename2);
  // data.append('id', pidfileupload);
  //
  //
  // var xhr = new XMLHttpRequest();
  // xhr.open('post', '../app/uploadFile.php', true); //Post to php Script to save to server
  // xhr.send(data);



  //Set for Downloading file from object
  //doc.save('ComprehensiveList.pdf');
  $scope.ComprehensiveListPdf = doc;


  function footer() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }


    var today = mm + '/' + dd + '/' + yyyy;

    doc.setFontSize(10);
    doc.text(58, 290, 'Copyrights - 2017 Prescribe Diets. All Rights Reserved'); //print number bottom right
    doc.setFontSize(12);
    doc.setFillColor(135, 206, 235);
    doc.rect(10, 8, 190, 18, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(12, 12, 'Comprehensive List Page ' + doc.page);
    doc.text(140, 12, 'All ingredients must be organic');
    doc.text(12, 22, patientfname + ' ' + patientlname);
    doc.text(177, 22, today);
    doc.page++;
  };

}

///////////////////////////////////////////////////////
//////////END OF COMPREHENSIVE LIST FILE//////
/////////////////////////////////////////////////////

//Geneerate Base64 Code of Image
function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}




///////////////////////////////////////
////////RECIPE  LIST FILE////////
//////////////////////////////////////


$scope.genRecipeList = function() {
  // //Show Ajax loader
  // $('#pleaseWaitModal').modal('show');
  console.log("In genRecipeList");

  var doc = new jsPDF();

  // var imgData = 'data:image/jpeg;base64,'+ Base64.encode('../assets/layouts/layout3/img/logo-default.png');
  // var imgData = '';
  // doc.setFontSize(20);
  // toDataURL('http://diet.invictuszone.com/assets/layouts/layout3/img/logo-default.png', function(dataUrl) {
  //   console.log('RESULT:', dataUrl)
  //   imgData = dataUrl;
  // })

  doc.addImage(imgData, 'PNG', 15/**25**/, 20, 60/**50**/, 14);
  doc.setTextColor(100, 149, 237);
  doc.text(78, 46, 'Recipes for:');
  doc.setTextColor(0, 0, 0);
  doc.setFontType("bold");
  doc.text(88, 60, patientfname + ' ' + patientlname);
  doc.setTextColor(255, 0, 0);
  doc.text(10, 70, 'Please Read:');
  doc.setTextColor(0, 0, 0);
  doc.setFontType("normal");
  doc.setFontSize(14);
  doc.text(10, 76, 'This is a GENERIC recipe list. Some of our members will be restricted from some');
  doc.text(10, 82, 'of the items below. They will be color coded for you. Refer to your Shopping List');
  doc.text(10, 88, 'Key to know if an ingredient should be substituted for within a recipe.');
  doc.text(10, 101, 'All recipes should be made from:');
  doc.setFontType("bold");
  doc.text(10, 107, 'Organic Ingredients');
  doc.text(10, 113, 'Grass-fed/Pasture-Raised Meats');
  doc.text(10, 119, 'Organic, Pasture-Raised Eggs');
  doc.text(10, 125, 'Gluten-free and Dairy-free items');
  doc.setFontType("normal");
  doc.text(10, 149, 'Some Definitions');
  doc.text(10, 164, 'Baking: A technique of cooking by way of an oven and utilizing its dry heat.');
  doc.text(10, 174, 'Steaming: Cooking foods using moist heat under varying degrees of pressure.');
  doc.text(10, 184, 'Broiling or Grilling: Involves direct heat via a barbecue grill, gridiron or griddle under');
  doc.text(10, 190, 'a flame.');
  doc.text(10, 200, 'Poached: A technique where the food is cooked in liquid with a temperature from 140 ');
  doc.text(10, 206, 'degrees Fahrenheit and 180 degrees Fahrenheit to preserve delicate items.');
  doc.text(10, 216, 'Salute: Lightly cooking or browning in a pan with a small amount of oil or fat.');
  doc.text(10, 226, 'Dredge: Where you use an egg mixture to dip food into to allow dry ingredients to stick');
  doc.text(10, 231, 'to it for cooking.');

  var page = 1;
  var pageCounter = 0;
  doc.page = page;
  footer();
  page++;
  //doc.page = page;
  doc.addPage();
  //footer();

  var TotalMeals     = Object.keys(PRECRIPTION.recipelist).length;
  // console.log("TotalMeals: ",TotalMeals);
  for (var i = 0; i < TotalMeals; i++)
  {
    // console.log("PRECRIPTION.recipelist: ",PRECRIPTION.recipelist[i]);
    var Totalrecipes = Object.keys(PRECRIPTION.recipelist[i].Recipes).length;
    // console.log("Totalrecipes: ",Totalrecipes);
    for (var j = 0; j < Totalrecipes; j++)
    {
      // console.log("PRECRIPTION.recipelist: ",PRECRIPTION.recipelist[i].Recipes[j]);
      var recipesScore = 0;
      var TotalIng = Object.keys(PRECRIPTION.recipelist[i].Recipes[j].Ingredients).length;
      // console.log("TotalIng: ",TotalIng);
      for (var k = 0; k < TotalIng; k++)
      {
        var ingID = PRECRIPTION.recipelist[i].Recipes[j].Ingredients[k].FID;
        // console.log(" PRECRIPTION.fooditems["+ingID+"]: ", PRECRIPTION.fooditems[ingID]['codes']);
        var colorCodes = PRECRIPTION.fooditems[ingID]['codes'];
        if(isItemOnShoppingList(colorCodes))
        {
          recipesScore++;
        }
      }
      // console.log("recipesScore: ",recipesScore);
      var scoreR = (recipesScore / TotalIng) * 100;
      var roundedScoreR = Math.round( scoreR * 10 ) / 10;
      // console.log("scoreR: ",scoreR);
      // console.log("roundedScoreR: ",roundedScoreR);
      // console.log("roundedScore: ",roundedScore);
      PRECRIPTION.recipelist[i].Recipes[j]['score'] = roundedScoreR;
      // console.log("PRECRIPTION.recipelist: ",PRECRIPTION.recipelist[i].Recipes[j]);
    }

    masterList = PRECRIPTION.recipelist[i].Recipes;
    // console.log("masterList: ",masterList);
    masterList.sort(function(a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    });
    // masterList = masterList.sort(function (a, b) {
    //     return a.score.localeCompare( b.score );
    // });
    // console.log("masterList: ",masterList);
    PRECRIPTION.recipelist[i].Recipes = masterList;
  }

  var mealscount      = Object.keys(PRECRIPTION.recipelist).length;
  var mealscountTotal = Object.keys(PRECRIPTION.recipelist).length;
  // console.log('meals count', mealscount);

  var qty = '';
  var i = 0;
  var j = 0;
  var x = 12;
  var y = 28;
  var xx = 12;
  var yy = 22;
  //var pageAdded = false;

  while (mealscount != 0) {
    if(mealscount != mealscountTotal)
    {
      y = 270;
    }
    if ((y > 260)) {
      // var prevPage = page;
      // pageAdded  = true;
      page++;
      doc.page = page;
      // console.log('page value', page);
      footer();
      // console.log("page add");
      doc.addPage();
      var x = 12;
      var xx = 12;
      var y = 28;
      var yy = y - 6;
      doc.setFontSize(14);
      doc.setTextColor(0, 128, 0);
      doc.setFontType("bold");
    }

    doc.setFontSize(14);
    doc.setFontType("bold");
    doc.setFillColor(0, 0, 255);
    doc.rect(x, y - 8, 190, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(x + 5, y, PRECRIPTION.recipelist[j].mealtime);
    // console.log("PRECRIPTION.recipelist[j]: ",PRECRIPTION.recipelist[j]);
    if(typeof PRECRIPTION.recipelist[j].Recipes != 'undefined' && PRECRIPTION.recipelist[j].Recipes != null)
    {
      var recipescount = Object.keys(PRECRIPTION.recipelist[j].Recipes).length;
      // console.log('Recipe Count', recipescount);
    }
    else {
      recipescount = 0;
    }

    i = 0;
    while (recipescount != 0) {
      doc.setFontSize(12);
      if (y > 180) {
        page++;
        doc.page = page;
        // console.log('page value', page);
        doc.setTextColor(0, 0, 0);
        footer();
        // console.log("page add");
        doc.addPage();

        var x = 12;
        var xx = 12;
        var y = 28;
        var yy = 32;
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFontType("bold");
      }
      doc.setTextColor(0, 0, 0);
      doc.setFontType("bold");
      doc.setFontSize(14);
      y = y + 10;
      var splitTitle = doc.splitTextToSize(PRECRIPTION.recipelist[j].Recipes[i][0].recipename, 165);
      if(splitTitle.length > 1)
      {
        var titleX    = x;
        var titleY    = y;
        if(page == 1)
        {
          var titlePage = 2;
        }
        else {
          var titlePage = page;
        }
        doc.text(x, y, splitTitle[0]);
        for (var z = 1; z < splitTitle.length; z++) {
          y = y + 6;
          doc.text(x , y, splitTitle[z]);
        }
      }
      else {
        var titleX = x;
        var titleY = y;
        if(page == 1)
        {
          var titlePage = 2;
        }
        else {
          var titlePage = page;
        }
        doc.text(x, y, splitTitle);
      }
      //Variables for setting Recipe Score
      var recipeScore = 0;

      y = y + 3;

      var ingredientscount = Object.keys(PRECRIPTION.recipelist[j].Recipes[i].Ingredients).length;
      var totalIng         = ingredientscount;
      // console.log("totalIng: ",totalIng);
      var k = 0;
      while (ingredientscount != 0) {
        if ((y > 260)) {
          page++;
          doc.page = page;

          doc.setTextColor(0, 0, 0);
          footer();

          doc.addPage();

          var x = 12;
          var xx = 12;
          var y = 28;
          var yy = 32;
          doc.setFontSize(12);
          doc.setFontType("normal");
          doc.setTextColor(0, 0, 0);
        }
        doc.setFontSize(9);
        doc.setFontType("normal");

        y = y + 8;

        qty = PRECRIPTION.recipelist[j].Recipes[i].Ingredients[k].ingredientQty.toString();
        doc.text(x, y, qty);

        if( PRECRIPTION.recipelist[j].Recipes[i].Ingredients[k].ingredientsUnit != null)
        {
          doc.text(x + 8/**20**/, y, PRECRIPTION.recipelist[j].Recipes[i].Ingredients[k].ingredientsUnit);
        }
        if( PRECRIPTION.recipelist[j].Recipes[i].Ingredients[k].ingredientName != null)
        {
          var ingID = PRECRIPTION.recipelist[j].Recipes[i].Ingredients[k].FID;
          // console.log(" PRECRIPTION.fooditems["+ingID+"]: ", PRECRIPTION.fooditems[ingID]['codes']);
          var colorCodes = PRECRIPTION.fooditems[ingID]['codes'];
          if(isItemOnShoppingList(colorCodes))
          {
            recipeScore++;
          }
          var colors = codesToColor(colorCodes);
          var fontr = colors.font.r;
          var fontg = colors.font.g;
          var fontb = colors.font.b;
          var backr = colors.background.r;
          var backg = colors.background.g;
          var backb = colors.background.b;

          var border_r = colors.border.color.r;
          var border_g = colors.border.color.g;
          var border_b = colors.border.color.b;
          var border_Type = colors.border.type;

          if(((backr =='255' && backg =='0' && backb =='0' ) || (backr =='237' && backg =='125' && backb =='49' )) && (fontr =='155' && fontg =='155' && fontb == '155'))
          {
            fontr = 214;
            fontg = 209;
            fontb = 209;
          }
          else if(backr =='255' && backg =='192' && backb =='0' )
          {
            fontr = 239;
            fontg = 239;
            fontb = 239;
          }

          doc.setTextColor(fontr, fontg, fontb);



          var br = parseInt(border_r);
          var bg = parseInt(border_g);
          var bb = parseInt(border_b);

          var bgr = parseInt(backr);
          var bgg = parseInt(backg);
          var bgb = parseInt(backb);

          if (border_Type == 'solid') {
            doc.setDrawColor(br, bg, bb);
            doc.setFillColor(bgr, bgg, bgb);
            doc.setLineWidth(0.65);
            doc.rect(x + 29/**24,63**/, y - 5, 88, 7.25, 'FD');
            doc.text(x + 32/**26,65**/, y, PRECRIPTION.recipelist[j].Recipes[i].Ingredients[k].ingredientName);
          } else if (border_Type == 'dashed') {
            dottedLine(doc, x + 29/**24,63**/, y - 5, x + 29/**24,63**/, y + 2.5, 1); // first vertical line
            dottedLine(doc, x + 29/**24,63**/ + 88, y - 5, x + 29/**24,63**/ + 88, y + 2.5, 1); // second vertical line
            dottedLine(doc, x + 29/**24,63**/, y - 4.70, x + 29/**63**/ + 87.5, y - 4.70, 1); //first horizontal line
            dottedLine(doc, x + 29/**24,63**/, y + 2.25, x + 29/**63**/ + 87.5, y + 2.25, 1); //second horizontal line
            ///function for dotted line////
            function dottedLine(doc, xFrom, yFrom, xTo, yTo, segmentLength) {
              // Calculate line length (c)
              var a = Math.abs(xTo - xFrom);
              var b = Math.abs(yTo - yFrom);
              var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

              // Make sure we have an odd number of line segments (drawn or blank)
              // to fit it nicely
              var fractions = c / segmentLength;
              var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));

              // Calculate x, y deltas per segment
              var deltaX = adjustedSegmentLength * (a / c);
              var deltaY = adjustedSegmentLength * (b / c);

              var curX = xFrom,
              curY = yFrom;
              while (curX <= xTo && curY <= yTo) {
                doc.setDrawColor(br, bg, bb);
                doc.setLineWidth(0.65);
                doc.line(curX, curY, curX + deltaX, curY + deltaY);
                curX += 2 * deltaX;
                curY += 2 * deltaY;
              }
            }
            doc.setFillColor(bgr, bgg, bgb);
            doc.rect(x + 29.5/**24.563.5**/, y - 4.5, 87/*42*87**/, 6.5, 'F');
            doc.text(x + 32/**65**/, y, PRECRIPTION.recipelist[j].Recipes[i].Ingredients[k].ingredientName);
          }
        }
        //Set defualt text color again
        doc.setTextColor(0, 0, 0);
        if(PRECRIPTION.recipelist[j].Recipes[i].Ingredients[k].ingredientscomment != null)
        {
          doc.setFontType("italic");
          doc.text(x + 50/**20,63**/ + 65/**40,88**/ + 4/**4**/, y, PRECRIPTION.recipelist[j].Recipes[i].Ingredients[k].ingredientscomment);
          doc.setFontType("normal");
        }


        k++;
        ingredientscount--;
      }
      doc.setFontSize(12);
      var score = (recipeScore / totalIng) * 100;
      var roundedScore = Math.round( score * 10 ) / 10;

      doc.setPage(titlePage);
      //Set text color Red
      doc.setTextColor(240, 65, 65);
      doc.text(titleX + 170.5, titleY, "Score: " + roundedScore + "%");
      doc.setPage(page);

      //Set defualt text color again
      doc.setTextColor(0, 0, 0);
      var instructioncount = Object.keys(PRECRIPTION.recipelist[j].Recipes[i].Instructions).length;
      var l = 0;
      y = y + 10;
      count = 1;
      doc.setFontType("bolditalic");
      doc.text(x, y, 'Instructions');
      doc.setFontType("normal");
      while (instructioncount != 0) {
        doc.setFontType('normal');
        doc.setFontSize(12);
        if (y > 260) {
          page++;
          doc.page = page;
          // console.log('page value', page);
          footer();
          // console.log("page add");
          doc.addPage();
          var x = 12;
          var xx = 12;
          var y = 28;
          var yy = 32;
          doc.setFontSize(12);
          doc.setFontType("normal");
          doc.setTextColor(0, 0, 0);

        }
        y = y + 6;
        if( PRECRIPTION.recipelist[j].Recipes[i].Instructions[l].instruction != null)
        {
          var splitIns = doc.splitTextToSize(PRECRIPTION.recipelist[j].Recipes[i].Instructions[l].instruction, 180);
          if(splitIns.length > 1)
          {
            doc.text(x, y, count + '. ' + splitIns[0]);
            for (var z = 1; z < splitIns.length; z++) {
              y = y + 6;
              doc.text(x + 5, y, splitIns[z]);
            }
          }
          else {
            doc.text(x, y, count + '. ' + splitIns);
          }

        }

        // doc.text(x, y, count + '. ' + PRECRIPTION.recipelist[j].Recipes[i].Instructions[l].instruction);


        instructioncount--;
        l++;
        count++;
      }
      recipescount--;
      i++;
      y = y + 6;
    }
    mealscount--;
    y = y + 10;
    j++;
  }

  //Set FileName
  var timeStamp = Math.floor(Date.now() / 1000);
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }


  var today = mm + '/' + dd + '/' + yyyy;
  var filename  = patientfname+'_'+patientlname+'-Recipe_List-'+timeStamp+'.pdf';
  var filename2 = patientfname+'_'+patientlname+'-Recipe_List-'+timeStamp;
  var filetype  = 'Recipe_List';

  url = API_URL + "files";

  //Request for Storing or Updating Record
  //Base64 Enc for large data file
  var pdf = btoa(doc.output());
  // $http({
  //   method: 'POST',
  //   url: url,
  //   data: {
  //     prescriptionID   : $scope.patientPrescriptionID,
  //     prescriptionDate : PRECRIPTION['last_modified'],
  //     comments         : PRECRIPTION['comment'],
  //     Status           : PRECRIPTION['status'],
  //     pid              : pidfileupload,
  //     filename         : filename,
  //     filename2        : filename2,
  //     filetype         : filetype,
  //     // finalList        : PRECRIPTION.finalList
  //     pdf              : pdf
  //   },
  //   headers: { 'Content-Type': 'application/json; charset=utf-8' }
  // }).success(function(response) {
  //   //Hide Ajax loader
  //   $('#pleaseWaitModal').modal('hide');
  //
  //   var patientresponse = response;
  //   console.log("Recipe response:",response);
  // }).error(function(response) {
  //   //Hide Ajax loader
  //   $('#pleaseWaitModal').modal('hide');
  //   console.log("Recipe response:",response);
  // });

  $scope.RecipeListData = {
    prescriptionID   : $scope.patientPrescriptionID,
    prescriptionDate : PRECRIPTION['last_modified'],
    comments         : PRECRIPTION['comment'],
    Status           : PRECRIPTION['status'],
    pid              : pidfileupload,
    filename         : filename,
    filename2        : filename2,
    filetype         : filetype,
    // finalList        : PRECRIPTION.finalList
    pdf              : pdf
  };
  // //Request for Storing or Updating Record
  // $http({
  //   method: 'POST',
  //   url: url,
  //   data: {
  //     prescriptionID   : $scope.patientPrescriptionID,
  //     prescriptionDate : PRECRIPTION['last_modified'],
  //     comments         : PRECRIPTION['comment'],
  //     Status           : PRECRIPTION['status'],
  //     pid: pidfileupload,
  //     filename:filename,
  //     filetype:filetype
  //   },
  //   headers: { 'Content-Type': 'application/json; charset=utf-8' }
  // }).success(function(response) {
  //   var patientresponse = response;
  // });
  //
  // // var pdf = doc.output();
  //
  // //Base64 Enc for large data file
  // var pdf = btoa(doc.output());
  //
  // var data = new FormData();
  // data.append('data', pdf);
  // data.append('filename', filename2);
  // data.append('id', pidfileupload);
  //
  // // console.log("Fdata: ",data.get('data'));
  // console.log("Fdata: ",data);
  //
  // var xhr = new XMLHttpRequest();
  // xhr.open('post', '../app/uploadFile.php', true); //Post to php Script to save to server
  // xhr.send(data);

  //Set for Downloading file from object
  //doc.save('ShoppingList.pdf');
  $scope.RecipeListPdf = doc;


  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  var today = mm + '/' + dd + '/' + yyyy;

  function footer() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var today = mm + '/' + dd + '/' + yyyy;

    doc.setFontSize(10);
    doc.text(58, 285, 'Copyrights - 2017 Prescribe Diets. All Rights Reserved'); //print number bottom right
    doc.setFontSize(14);
    doc.text(10, 10, today); //print number bottom right
    pageCounter++;
    doc.text(185, 10, 'Page#' + pageCounter);
    //page ++;
  };
}

///////////////////////////////////////////////////////
//////////END OF RECIPE LIST FILE//////
/////////////////////////////////////////////////////

////////////////////////
// End of controller //
//////////////////////
});
