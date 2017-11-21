app.controller('rolesController', function($scope, $http, API_URL) {

    //retrieve staffs listing from API.
    $http.get(API_URL + "roles/")
            .success(function(response) {
                $scope.roles = response;
                console.log($scope.roles);
            });

    //show modal form
    $scope.toggle = function(modalstate, id) {
        $scope.modalstate = modalstate;
        $scope.role = null;

        switch (modalstate) {
            case 'add':
                $scope.form_title = "Add New Role";
                //Set the checkboxes for adding Role
                $scope.role = {
                    FMR    : '1',
                    FMA    : '0',
                    FME    : '0',
                    FMD    : '0',
                    FPR    : '1',
                    FPA    : '0',
                    FPE    : '0',
                    FPD    : '0',
                    DPR    : '1',
                    DPA    : '0',
                    DPE    : '0',
                    DPD    : '0'
                  };
                break;
            case 'edit':
                $scope.form_title = "Edit Staff Details";
                $scope.id = id;
                $http.get(API_URL + 'roles/' + id)
                        .success(function(response) {
                          $scope.role = response;

                          $scope.role = {
                              id     : $scope.role.id,
                              Name   : $scope.role.Name,
                              FMR    : $scope.role.FoodManagement[0],
                              FMA    : $scope.role.FoodManagement[2],
                              FME    : $scope.role.FoodManagement[4],
                              FMD    : $scope.role.FoodManagement[6],
                              FPR    : $scope.role.FoodPanel[0],
                              FPA    : $scope.role.FoodPanel[2],
                              FPE    : $scope.role.FoodPanel[4],
                              FPD    : $scope.role.FoodPanel[6],
                              DPR    : $scope.role.DietPrescription[0],
                              DPA    : $scope.role.DietPrescription[2],
                              DPE    : $scope.role.DietPrescription[4],
                              DPD    : $scope.role.DietPrescription[6]
                            };
                            console.log($scope.role);
                      });
                break;
            default:
                break;
        }
        console.log(id);
        $('#RoleModal').modal('toggle');
    }

    //save new record / update existing record
    $scope.save = function(modalstate, id) {
        var url = API_URL + "roles";

        //append staff id to the URL if the form is in edit mode
        if (modalstate === 'edit'){
            url += "/" + id;
        }

        console.log("($scope.staff)", $scope.role);

        //Request for Storing or Updating Record
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.role),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            console.log(response);
            var roleResponse = response;
            console.log("roleResponse: ", roleResponse);
            //append the new record
            if(roleResponse != "")
            {
              if (modalstate === 'edit')
              {
                  //Update the row
                  var index = -1;
                  var comArr = eval( $scope.roles );
                  for( var i = 0; i < comArr.length; i++ ) {
                    if( comArr[i].id === id )
                    {
                      $scope.roles[i].Name              = roleResponse['Name'];
                      $scope.roles[i].FoodManagement    = roleResponse['FoodManagement'];
                      $scope.roles[i].FoodPanel         = roleResponse['FoodPanel'];
                      $scope.roles[i].DietPrescription  = roleResponse['DietPrescription'];
                      break;
                    }
                  }
              }
              else
              {
                  $scope.roles.push({ 'Name':roleResponse['Name'], 'FoodManagement': roleResponse['FoodManagement'], 'FoodPanel':roleResponse['FoodPanel'],
                  'DietPrescription':roleResponse['DietPrescription'], 'id':roleResponse['id']  });
              }
            }

        }).error(function(response) {
            console.log(response);
            alert('This is embarassing. An error has occured. Please check the log for details');
        });

         $('#RoleModal').modal('hide');
        // $('#imageSection').html('');
    }

    //delete record
    $scope.confirmDelete = function(id) {
        var isConfirmDelete = confirm('Are you sure you want this record?');
        if (isConfirmDelete) {
            $http({
                method: 'DELETE',
                url: API_URL + 'roles/' + id
            }).
                    success(function(data) {
                        console.log(data);
                        //Remove the row
                        var index = -1;
                    		var comArr = eval( $scope.roles );
                    		for( var i = 0; i < comArr.length; i++ ) {
                    			if( comArr[i].id === id ) {
                    				index = i;
                    				break;
                    			}
                    		}
                    		if( index === -1 ) {
                    			alert( "Something gone wrong" );
                    		}
                    		$scope.roles.splice( index, 1 );
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
