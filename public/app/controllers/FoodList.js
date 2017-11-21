
app.controller('FoodList', function($scope,$timeout, $http, API_URL) {

   // retrieve foodlist listing from API.
   // to show in dropdown
    $http.get(API_URL + "foodlist/")
            .success(function(response) {
                $scope.foodlist = response;
                console.log('FOOD LIST');
                console.log($scope.foodlist);
            });
    });
