//Files adding Directive
app.directive("fileInput", function($parse){
  return {
    // restrict: 'A',
    link: function($scope, element, attrs){
      element.on("change", function(event){
        var files = event.target.files;
        console.log(files[0].name);
        $parse(attrs.fileInput).assign($scope, element[0].files);
        $scope.$apply();
      });
    }
  }
})

app.controller('staffController', function($scope, $timeout, $http, API_URL) {

    //retrieve staffs listing from API.
    $http.get(API_URL + "staffs/")
            .success(function(response) {
                $scope.staffs = response;
                console.log($scope.staffs);
            });

   //retrieve roles listing from API.
   $http.get(API_URL + "roles")
          .success(function(response) {
              $scope.roles = response;
              console.log("roles: ",$scope.roles);
              // $timeout(function(){
              //     $('#rollSelect')[0]['children'][0].remove();
              //     console.log($('#rollSelect')[0]['children']);
              // }, 0, false);
            });

var pic = '';

    //show modal form
    $scope.toggle = function(modalstate, id) {
        $scope.modalstate = modalstate;
        $scope.staff = null;

        //Clear Image Section
        $('#imageSection').html('');

        switch (modalstate) {
            case 'add':
                $scope.form_title = "Add Staff";
                break;
            case 'edit':
                $scope.form_title = "Edit Staff Details";
                $scope.id = id;
                $http.get(API_URL + 'staffs/' + id)
                        .success(function(response) {
                          $scope.staff = response;
                          console.log("$scope.staff: ",$scope.staff);
                          //Set Image Div
                          if($scope.staff.Picture != null && $scope.staff.Picture != "")
                          {
                            console.log("$scope.staff.Picture: ", $scope.staff.Picture)
                            var html  = '<img src="../assets/images/'+ $scope.staff.Picture +'">';
                            $('#imageSection').append(html);
                            $('#imageDiv').removeClass("fileinput-new");
                            $('#imageDiv').addClass("fileinput-exists");
                          }
                          // console.log("$scope.staff.RID: ", $scope.staff.RID);
                          pic = $scope.staff.Picture;

                          // console.log($("#R"+$scope.staff.RID));
                          $("#R"+$scope.staff.RID)[0].selected = true;
                          // console.log($("#R"+$scope.staff.RID));

                          // $('#rollSelect').children().remove();


                          // console.log($scope.staff);
                        });
                break;
            default:
                break;
        }
        console.log(id);
        $('#addStaff').modal('show');
    }

    //save new record / update existing record
    $scope.save = function(modalstate, id) {
        var url = API_URL + "staffs";

        //append staff id to the URL if the form is in edit mode
        if (modalstate === 'edit'){
            url += "/" + id;
        }

        //For Unique Image Name
        if(!angular.isUndefined($scope.files))
        {
          console.log("$scope.files: ", $scope.files);
          var oldName = $scope.files[0].name;
          var d = new Date();

          var Picture = d.getTime();

          Picture += ".";
          var str = oldName;
          var n = str.lastIndexOf('.');
          Picture += str.substring(n + 1);
        }
        else{
          var Picture = pic;
        }

        $scope.staff.RID = $('#rollSelect').val();

        var image = {Picture:""};
        image['Picture'] = Picture;
        $.extend( $scope.staff, image );

        var cidArr = {cid:""};
        cidArr['cid'] = cid;
        $.extend( $scope.staff, cidArr );

        console.log("$scope.staff: ", $scope.staff);

        //Request for Storing or Updating Record
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.staff),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            console.log(response);
            var staffResponse = response;
            //append the new record
            if(staffResponse != "")
            {
              if (modalstate === 'edit')
              {
                  //Update the row
                  var index = -1;
                  var comArr = eval( $scope.staffs );
                  for( var i = 0; i < comArr.length; i++ ) {
                    if( comArr[i].id === id )
                    {
                      $scope.staffs[i].FName    = staffResponse[0]['FName'];
                      $scope.staffs[i].LName    = staffResponse[0]['LName'];
                      $scope.staffs[i].roleName = staffResponse[0]['roleName'];
                      $scope.staffs[i].PhoneNo  = staffResponse[0]['PhoneNo'];
                      $scope.staffs[i].Email    = staffResponse[0]['Email'];
                      break;
                    }
                  }
              }
              else
              {
                  $scope.staffs.push({ 'FName':staffResponse[0]['FName'], 'LName': staffResponse[0]['LName'], 'roleName':staffResponse[0]['roleName'],
                  'PhoneNo':staffResponse[0]['PhoneNo'], 'email':staffResponse[0]['email'], 'id':staffResponse[0]['id']  });
              }
            }

        }).error(function(response) {
            console.log(response);
            alert('This is embarassing. An error has occured. Please check the log for details');
        });

        if(!angular.isUndefined($scope.files))
        {
          //For Uploading image
          var form_data = new FormData();
          angular.forEach($scope.files, function(file){
            form_data.append('file', file);
          });
          form_data.append('Picture', image['Picture']);

          $http({
              method: 'POST',
              url: '../app/upload.php',
              data: form_data,
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined, 'Process-Data': false}
          }).success(function(response) {
              console.log(response);
          }).error(function(response) {
              console.log(response);
              alert('This is embarassing. An error has occured. Please check the log for details');
          });
        }

        $('#addStaff').modal('hide');
        // $('#imageSection').html('');
    }

    //delete record
    $scope.confirmDelete = function(id) {
        var isConfirmDelete = confirm('Are you sure you want this record?');
        if (isConfirmDelete) {
            $http({
                method: 'DELETE',
                url: API_URL + 'staffs/' + id
            }).
                    success(function(data) {
                        console.log(data);
                        //Remove the row
                        var index = -1;
                    		var comArr = eval( $scope.staffs );
                    		for( var i = 0; i < comArr.length; i++ ) {
                    			if( comArr[i].id === id ) {
                    				index = i;
                    				break;
                    			}
                    		}
                    		if( index === -1 ) {
                    			alert( "Something gone wrong" );
                    		}
                    		$scope.staffs.splice( index, 1 );
                        //location.reload();
                    }).
                    error(function(data) {
                        console.log(data);
                        alert('Unable to delete');
                    });
        } else {
            return false;
        }
    }

    //delete record
    $scope.closeModal = function() {
      $('#addStaff').modal('hide');
      $('#imageSection').html('');
      $('#imageDiv').removeClass("fileinput-exists");
      $('#imageDiv').addClass("fileinput-new");
    }
});
