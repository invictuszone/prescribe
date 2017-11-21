app.controller('preferencesController', function($scope, $http, API_URL) {
    //retrieve organizations listing from API
    $http.get(API_URL + "organizations")
            .success(function(response) {
                $scope.organizations = response;
            });

    //retrieve subscriptions listing from API
    $http.get(API_URL + "subscriptions")
          .success(function(response) {
              $scope.subscriptions = response;
              console.log("$scope.subscriptions.length: ",$scope.subscriptions.length);

              if($scope.subscriptions.length >= 3)
              {
                $('#btn-add').attr('disabled', true);
              }
          });

    //show modal form
    $scope.toggle = function(modalstate, id, api) {
        $scope.modalstate = modalstate;
        //$scope.api        = api;
        $scope.organization = null;

        switch (modalstate) {
            case 'add':
                if (api == 'organizations')
                {
                  $scope.form_title = "Add New Organization Type";
                }
                else if (api == 'subscriptions')
                {
                  $scope.form_title = "Add New Subscription Package";
                }

                break;
            case 'edit':
                if (api == 'organizations')
                {
                  $scope.form_title = "Edit Organization Type";
                }
                else if (api == 'subscriptions')
                {
                  $scope.form_title = "Edit Subscription Package";
                }
                $scope.id = id;
                $scope.api = api;
                $http.get(API_URL + api + "/" + id)
                        .success(function(response) {

                            $scope.organization = response;
                        });
                break;
              default:
                break;
        }

        if (api == 'organizations')
        {
          $('#OrgType').modal('show');
        }
        else if (api == 'subscriptions')
        {
          $('#Package').modal('show');
        }

    }

    //save new record / update existing record
    $scope.save = function(modalstate, id, api) {
        var url = API_URL + api;

        //append employee id to the URL if the form is in edit mode
        if (modalstate === 'edit'){
            url += "/" + id;

        }

        console.log("$scope.organization: ",$scope.organization)
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.organization),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
          console.log("response: ",response);
            if(api == 'organizations')
            {
              var OrgResponse = response;
              if(OrgResponse != "")
              {
                if (modalstate === 'edit')
                {
                    //Update the row
                    var index = -1;
                    var comArr = eval( $scope.organizations );
                    for( var i = 0; i < comArr.length; i++ ) {
                      if( comArr[i].id === id )
                      {
                        $scope.organizations[i].Name     = OrgResponse['Name'];
                        break;
                      }
                    }
                }
                else
                {
                    $scope.organizations.push({ 'Name':OrgResponse['Name'],'id':OrgResponse['id']  });
                }
              }
            }
            else {
              var SubResponse = response;
              if(SubResponse != "")
              {
                if (modalstate === 'edit')
                {
                    //Update the row
                    var index = -1;
                    var comArr = eval( $scope.subscriptions );
                    for( var i = 0; i < comArr.length; i++ ) {
                      if( comArr[i].id === id )
                      {
                        $scope.subscriptions[i].Name            = SubResponse['Name'];
                        $scope.subscriptions[i].NoOfPatients    = SubResponse['NoOfPatients'];
                        $scope.subscriptions[i].NoOfPeople      = SubResponse['NoOfPeople'];
                        $scope.subscriptions[i].Price           = SubResponse['Price'];
                        break;
                      }
                    }
                }
                else
                {
                    $scope.subscriptions.push({ 'Name':SubResponse['Name'],'id':SubResponse['id'],'NoOfPatients':SubResponse['NoOfPatients'],'NoOfPeople':SubResponse['NoOfPeople'],'Price':SubResponse['Price']  });
                    if($scope.subscriptions.length >= 3)
                    {
                      $('#btn-add').attr('disabled', true);
                    }
                }
              }
            }
            // location.reload();
        }).error(function(response) {

            alert('This is embarassing. An error has occured. Please check the log for details');
        });

        if (api == 'organizations')
        {
          $('#OrgType').modal('hide');
        }
        else if (api == 'subscriptions')
        {
          $('#Package').modal('hide');
        }
    }

    //delete record
    $scope.confirmDelete = function(id, api) {
        var isConfirmDelete = confirm('Are you sure you want this record?');
        if (isConfirmDelete) {
            $http({
                method: 'DELETE',
                url: API_URL + api +'/' + id
            }).
                    success(function(data) {
                      //Remove the row
                      if(api == 'organizations')
                      {
                        var index = -1;
                        var comArr = eval( $scope.organizations );
                        for( var i = 0; i < comArr.length; i++ ) {
                          if( comArr[i].id === id ) {
                            index = i;
                            break;
                          }
                        }
                        if( index === -1 ) {
                          alert( "Something gone wrong" );
                        }
                        $scope.organizations.splice( index, 1 );
                      }
                      else {
                        var index = -1;
                        var comArr = eval( $scope.subscriptions );
                        for( var i = 0; i < comArr.length; i++ ) {
                          if( comArr[i].id === id ) {
                            index = i;
                            break;
                          }
                        }
                        if( index === -1 ) {
                          alert( "Something gone wrong" );
                        }
                        $scope.subscriptions.splice( index, 1 );
                        if($scope.subscriptions.length < 3)
                        {
                          $('#btn-add').removeAttr('disabled');
                        }
                      }

                        // location.reload();
                    }).
                    error(function(data) {

                        alert('Unable to delete');
                    });
        } else {
            return false;
        }
    }
});
