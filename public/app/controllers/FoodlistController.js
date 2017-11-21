
app.controller('foodlistController', function($scope, $http, API_URL) {

    //retrieve fooditems listing from API.
    $http.get(API_URL + "fooditems/")
            .success(function(response) {
                $scope.fooditems = response;
             
            });

    //show modal form
    $scope.toggle = function(modalstate, id) {
        $scope.modalstate = modalstate;
        $scope.foodlist = null;

        switch (modalstate) {
            case 'add':
                $scope.form_title = "Add Staff";
                break;
            case 'edit':
                $scope.form_title = "Edit Staff Details";
                $scope.id = id;
                $http.get(API_URL + 'staffs/0/' + id)
                        .success(function(response) {
                          $scope.staff = response;
                        });
                break;
            default:
                break;
        }
       
      //  $('#addStaff').modal('show');
    }

    //save new record / update existing record
    $scope.save = function(modalstate, id) {
        var url = API_URL + "staffs";

        //append staff id to the URL if the form is in edit mode
        if (modalstate === 'edit'){
            url += "/" + id;
        }

        //Request for Storing or Updating Record
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.foodlist),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
          
           // var staffResponse = response;
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
                    /*  $scope.staffs[i].FName    = staffResponse[0]['FName'];
                      $scope.staffs[i].LName    = staffResponse[0]['LName'];
                      $scope.staffs[i].roleName = staffResponse[0]['roleName'];
                      $scope.staffs[i].PhoneNo  = staffResponse[0]['PhoneNo'];
                      $scope.staffs[i].Email    = staffResponse[0]['Email'];*/
                      break;
                    }
                  }
              }
             /* else
              {
                  $scope.staffs.push({ 'FName':staffResponse[0]['FName'], 'LName': staffResponse[0]['LName'], 'roleName':staffResponse[0]['roleName'],
                  'PhoneNo':staffResponse[0]['PhoneNo'], 'Email':staffResponse[0]['Email'], 'id':staffResponse[0]['id']  });
              }
*/            }

        }).error(function(response) {
            
            alert('This is embarassing. An error has occured. Please check the log for details');
        });
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
