app.controller('superadminController', function($scope, $http, API_URL) {

        var id = 1;
        console.log(id);
        $http.get('account/' + id)
                        .success(function(response) {
                          $scope.admin = response;
                          console.log("response",$scope.admin);
                        });
   /*$http.get(API_URL + 'admin/' + 1)
    .success(function(response) {
                          $scope.admin = response;
                          console.log("hello");
                          console.log($scope.admin);
                        });*/

    //save new record / update existing record
    $scope.update = function() 
    {
       var id = 1;
        $http.get('account/' + id)
                        .success(function(response) {
                          $scope.admin = response;
                          console.log("response",response);
                        });
     //  console.log("abc");

       var url ="accountupdate/"+id;

        //Request for Storing or Updating Record
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.admin),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            console.log(response);
            var adminResponse = response;
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

/*function checkPasswordMatch() 
{
    var password = $("#password").val();
    var confirmPassword = $("#repassword").val();
    var form = $("#updateform");

    if (password != confirmPassword)
    {
        $('#passwordErrorMsg').show();

        form.find('.submit').prop('disabled', true);

        return false;
    }
    else
    {
          $('#passwordErrorMsg').hide();
           form.find('.submit').prop('disabled', false);
    }
}

function checkPassword() 
{
    var pass= $("#password").val();
    var form = $("#updateform");

    //checking password length 

     if(pass.length < 6)
     {
       form.find('.submit').prop('disabled', true);
      $('#passwordErrorMsg1').show();
     }
     else
     {
      $('#passwordErrorMsg1').hide();
      form.find('.submit').prop('disabled', false);
     }
}

function checkEmail() 
{
   var form = $("#updateform");
   var x = $('#inputEmail1').val();
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) 
    {
        form.find('.submit').prop('disabled', true);
        $('#emailerrormsg').show();
        return false;
    }
    else
    {
      form.find('.submit').prop('disabled', false);
       $('#emailerrormsg').hide();
    }
}*/

     /* $(function() {
      //  $("#password").keyup(checkPassword);
      //  $("#repassword").keyup(checkPasswordMatch);
      //  $("#inputEmail1").keyup(checkEmail);
    
      });*/
    });
