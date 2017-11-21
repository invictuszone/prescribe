app.controller('adminController', function($scope, $http, API_URL) {

        /*var id = 1;
        console.log(id);
        $http.get('account/' + id)
                        .success(function(response) {
                          $scope.admin = response;
                          console.log("response",$scope.admin);
                        });*/
   /*$http.get(API_URL + 'admin/' + 1)
    .success(function(response) {
                          $scope.admin = response;
                          console.log("hello");
                          console.log($scope.admin);
                        });*/

    //save new record / update existing record
    $scope.save = function(id)
    {
      console.log('id');
       console.log(cid);
      // console.log(API_URL);
        /*$http.get('account/' + id)
                        .success(function(response) {
                          $scope.admin = response;
                          console.log("response",response);
                        });*/
     //  console.log("abc");

       var url =API_URL+"admin/accountupdate/"+cid;

        //Request for Storing or Updating Record
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.admin),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            console.log(response);
            var adminResponse = response;
            $('#successfulmsg').fadeIn().delay(2000).fadeOut();
            $('#email').val('');
            $('#password').val('');
            $('#repassword').val('');
          });
    }
    });

 $(function() {
       $("#password").keyup(checkPassword);
       $("#repassword").keyup(checkPasswordMatch);
        $("#email").blur(checkEmail);
        var form = $("#editform");
        form.find('.submit').prop('disabled', true);
      });


//valid email input function
function checkEmail()
{
   var form = $("#editform");
   var x = $('#email').val();
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
    {
        $('#email').focus();
        form.find('.submit').prop('disabled', true);
        $('#emailerrormsg').show();
    }
    else
    {
      form.find('.submit').prop('disabled', false);
       $('#emailerrormsg').hide();
    }
}

// confirm password and password match
function checkPasswordMatch()
{
    var password = $("#password").val();
    var confirmPassword = $("#repassword").val();
    var form = $("#editform");

    if (password != confirmPassword)
    {
        $('#passwordErrorMsg').show();

        form.find('.submit').prop('disabled', true);
    }
    else
    {
          $('#passwordErrorMsg').hide();
          form.find('.submit').prop('disabled', false);
    }
}

//password length check
function checkPassword()
{
    var pass= $("#password").val();
    var form = $("#editform");

    //checking password length

     if(pass.length < 6)
     {
        $('#passwordErrorMsg1').show();
        form.find('.submit').prop('disabled', true);
     }
     else
     {
        $('#passwordErrorMsg1').hide();
        checkPasswordMatch();
        // form.find('.submit').prop('disabled', false);
     }
}
