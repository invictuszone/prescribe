
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

app.controller('clientController', function($scope, $http, API_URL) {

    //retrieve clients listing from API.
    $http.get(API_URL + "clients/")
            .success(function(response) {
                $scope.clients = response;
                console.log("Clients:", $scope.clients);
            });

   //retrieve organizations listing from API.
   $http.get(API_URL + "organizations")
          .success(function(response) {
              $scope.organizations = response;
              console.log("$scope.organizations: ",$scope.organizations);
            });

   //retrieve subscriptions listing from API.
   $http.get(API_URL + "subscriptions")
          .success(function(response) {
              $scope.subscriptions = response;
              console.log($scope.subscriptions);
            });

    //save new record / update existing record
    $scope.check = function()
    {
       var url = API_URL + "clients";

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
        else
        {
          var Picture = "dummy.png";
        }

        var image = {Picture:""};
        image['Picture'] = Picture;
        $.extend( $scope.client, image );
        console.log("$.param($scope.client)", $scope.client);

        //Request for Storing or Updating Record
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.client),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            console.log(response);
            var clientResponse = response;
          });

       /* }).error(function(response) {
            console.log(response);
            alert('This is embarassing. An error has occured. Please check the log for details');
        });*/

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
          });
         /* .success(function(response) {
              console.log(response);
          }).error(function(response) {
              console.log(response);
              alert('This is embarassing. An error has occured. Please check the log for details');
          });*/
        }
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
        }
        else
        {
            return false;
        }
    }

// confirm password and password match
function checkPasswordMatch()
{
    var password = $("#password").val();
    var confirmPassword = $("#repassword").val();
    var form = $("#payment-form");

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

//password length check
function checkPassword()
{
    var pass= $("#password").val();
    var form = $("#payment-form");

    //checking password length

     if(pass.length < 6)
     {
        $('#passwordErrorMsg1').show();
        form.find('.submit').prop('disabled', true);
     }
     else
     {
        $('#passwordErrorMsg1').hide();
        form.find('.submit').prop('disabled', false);
     }
}


//valid email input function
function checkEmail()
{
   var form = $("#payment-form");
   var x = $('#email').val();
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
    {
        $('#email').focus();
        form.find('.submit').prop('disabled', true);
        $('#emailerrormsg').show();
        return false;
    }
    else
    {
      form.find('.submit').prop('disabled', false);
       $('#emailerrormsg').hide();
    }
}

//check for duplicate email address
function checkuniqueemail()
{
  var form = $('#payment-form');
  var check = 0;
   $http({
            method: 'POST',
            url: API_URL + 'checkemail',
            data: $.param($scope.client),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            // console.log(response);
            var check = response;
            console.log(check);
                if(check == 1)
                {
                  $('#validemailerror').show();
                  $('#email').focus();
                  form.find('.submit').prop('disabled', true);
                }
                else
                {
                  $('#validemailerror').hide();
                  form.find('.submit').prop('disabled', false);
                }
          });
}

      $(function() {
        var $form = $("#payment-form");
        $("#password").keyup(checkPassword);
        $("#repassword").keyup(checkPasswordMatch);
        $("#email").blur(checkEmail);
        $("#email").blur(checkuniqueemail);

        $form.on('submit', function(e) {
              ///////////check for checked checkbox//////////
              if($("#termscheckbox").prop('checked') == true)
              {
                 ////////////payment method/////////////////
                if (!$form.data('cc-on-file'))
                {
                  console.log("In Here E: ",e);
                  e.preventDefault();
                  Stripe.setPublishableKey($form.data('stripe-publishable-key'));
                  Stripe.createToken({
                    number: $('.card-number').val(),
                    cvc: $('.card-cvc').val(),
                    exp_month: $('.card-expiry-month').val(),
                    exp_year: $('.card-expiry-year').val()
                  }, stripeResponseHandler);
                }
              }
              else
              {
                $('#errorMsg').show();
                  return false;
              }
        });

        ////////////payment method/////////////////
        function stripeResponseHandler(status, response) {
          var $form = $('#payment-form');
          if (response.error) {
            // Show the errors on the form
            $("#payerror").show();
            $form.find('.payment-errors').text(response.error.message);
            $form.find('.submit').prop('disabled', false);
          }
          else
          {
            //Send Add Client Request
            $scope.check();

            //Show Splash Page
            $("#account-details").delay(600).fadeOut();
            $(".form-title").delay(600).fadeOut();
            $(".portlet-body").delay(600).fadeOut();
           $("#register-submit").show();
           $('.progress .progress-bar').delay(5000).css("width",
             function() {
                           return $(this).attr("aria-valuenow") + "%";
                       }
               )
          $(".heading-2").hide();
          $(".heading-1").show();

          setTimeout(function() {
            $(".heading-1").hide();
            $(".heading-2").show();
          },3000);

            // token contains id, last4, and card type
           var token = response['id'];

           setTimeout(function() {
             // insert the token into the form so it gets submitted to the server
             $form.find('input[type=text]').empty();
             $form.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
             $form.get(0).submit();
           },6000);

          }
        }
      });
    });
