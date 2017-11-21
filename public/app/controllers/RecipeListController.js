
app.controller('RecipeListController', function($scope,$timeout, $http, API_URL) {

   // retrieve recipe listing from API.
   // to show in dropdown
    $http.get(API_URL + "recipes/")
            .success(function(response) {
                $scope.recipelist = response;
                console.log('RECIPE LIST');
                console.log($scope.recipelist);
            });
    });
