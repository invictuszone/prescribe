app.controller('clientsController', function($scope,$timeout,$compile, $http, API_URL) {
    //retrieve employees listing from API
    $http.get(API_URL + "clients")
            .success(function(response) {
                $scope.clients = response;
                $timeout(function(){
                     $('#client-table').DataTable( {
        dom: 'Bfrtip',
        "order": [[ 3, "desc" ]],
        buttons: [
            {
                extend: 'excelHtml5',
                title: 'Client List',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'pdfHtml5',
                title: 'Client List',
                exportOptions: {
                    columns: ':visible'
                }
            }, 'print',
            'colvis'
        ],
     language: {
            buttons: {
                colvis: 'Select Columns to export'
            }
        }

    } );
 
                //   $('#client-table-btns').DataTable();
                }, 0, false);
                 
            });

    //show modal form
    $scope.toggle = function(modalstate, id) {
        $scope.modalstate = modalstate;

        switch (modalstate) {
            case 'add':
                $scope.form_title = "Add New Client";
                break;
            case 'edit':
                $scope.form_title = "Client Detail";
                $scope.id = id;
                $http.get(API_URL + 'clients/' + id)
                        .success(function(response) {
                            console.log(response);
                            $scope.client = response;
                        });
                break;
            default:
                break;
        }
        console.log(id);
        $('#myModal').modal('show');
    }

    //save new record / update existing record
    $scope.save = function(modalstate, id) {
        var url = API_URL + "clients";

        //append employee id to the URL if the form is in edit mode
        if (modalstate === 'edit'){
            url += "/" + id;
        }

        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.client),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            console.log(response);
            location.reload();
        }).error(function(response) {
            console.log(response);
            alert('This is embarassing. An error has occured. Please check the log for details');
        });
    }

    //delete record
    $scope.confirmDelete = function(id) {
        var isConfirmDelete = confirm('Are you sure you want this record?');
        if (isConfirmDelete) {
            $http({
                method: 'DELETE',
                url: API_URL + 'clients/' + id
            }).
                    success(function(data) {
                        console.log(data);
                        //Remove the row
                        var index = -1;
                    		var comArr = eval( $scope.clients );
                    		for( var i = 0; i < comArr.length; i++ ) {
                    			if( comArr[i].id === id ) {
                    				index = i;
                    				break;
                    			}
                    		}
                    		if( index === -1 ) {
                    			alert( "Something gone wrong" );
                    		}
                    		$scope.clients.splice( index, 1 );
                        // location.reload();
                    }).
                    error(function(data) {
                        console.log(data);
                        alert('Unable to delete');
                    });
        } else {
            return false;
        }
    }


});
