<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Http\Request;
// use Auth;

require_once ('Stripe/init.php');
require_once ('Stripe/lib/Stripe.php');


Route::get('/', function () {
    return view('index');
});

// Route::get('/{name?}', function () {
//     return view('name');
// });

// Route::get('/{name?}', function ($name = "welcome") {
//     return view("$name");
// });

Route::get('login', function () {
    // Auth::logout();
    return view('auth/login');
});

Route::get('login2', function () {
    // Auth::logout();
    return view('auth/login2');
});
Route::get('userlogin', function () {
    // Auth::logout();
    return view('auth/userlogin');
});

Route::get('register', function () {
    // Auth::logout();
    return view('clients/register');
});

Route::post ( '/', function (Request $request) {
    \Stripe\Stripe::setApiKey ( 'sk_test_oiytx7XhVwWvDk79glFs4iPd' );

          $plan =$request->input('Subscription');
          if($plan==1)
          {
            $subscription = "Gold-monthly";
          }
          else if($plan==2)
          {
            $subscription = "Silver-monthly";
          }

try
    {
         $customer = \Stripe\Customer::create(array(
         "source"=>$request->input('stripeToken'),
         "email" =>$request->input('Email'),
         "plan" =>$subscription
        ));
       return view('auth/userlogin');
    }
     catch (Exception $e)
     {
        $error = $e->getMessage();
        echo $error;
     }
});


///////////////////////////////////////////////////
////////          SuperAdmins  ////////////////////
///////////////////////////////////////////////////

Route::group(['prefix' => 'superadmin','middleware' => 'auth:web'],function()
{
    Route::get('/dashboard', function(){
        return view('superadmin/dashboard');
    });

    Route::get('/clients', function(){
        return view('superadmin/clients');
    });
    Route::get('/sub_packages', function(){
        return view('superadmin/sub_packages');
    });
    Route::get('/organization', function(){
        return view('superadmin/organization');
    });
    Route::get('/account', function(){
        return view('superadmin/account');
    });
    Route::get('/panel', function(){
        return view('superadmin/panel');
    });
    Route::get('/fooditems', function(){
        return view('superadmin/fooditems');
    });
    Route::get('/catagories', function(){
        return view('superadmin/catagories');
    });
    Route::get('/diettype', function(){
        return view('superadmin/diettype');
    });
    Route::get('/recipies', function(){
        return view('superadmin/recipies');
    });
    Route::get('/units', function(){
        return view('superadmin/units');
    });
});

//***Super Adnin DashBoard***//

Route::get('/api/v1/superAdmindashboard/{id?}', 'superAdminDashboardController@index');

/////////***Organization Types***//////////////

Route::get('/api/v1/organizations/{id?}', 'OrganizationTypes@index');
Route::post('/api/v1/organizations', 'OrganizationTypes@store');
Route::post('/api/v1/organizations/{id}', 'OrganizationTypes@update');
Route::delete('/api/v1/organizations/{id}', 'OrganizationTypes@destroy');

/////////***Subscription Packages***//////////////

Route::get('/api/v1/subscriptions/{id?}', 'SubscriptionTypes@index');
Route::post('/api/v1/subscriptions', 'SubscriptionTypes@store');
Route::post('/api/v1/subscriptions/{id}', 'SubscriptionTypes@update');
Route::delete('/api/v1/subscriptions/{id}', 'SubscriptionTypes@destroy');

//////////***Clients***///////////////////////////

Route::get('/api/v1/clients/{id?}', 'Clients@index');
Route::post('/api/v1/clients', 'Clients@store');
Route::post('/api/v1/clients/{id}', 'Clients@update');
Route::post('/api/v1/checkemail', 'Clients@checkemail');
Route::delete('/api/v1/clients/{id}', 'Clients@destroy');


///////////////////////////////////////////////////
/////////////////*** Admin ****////////////////////
///////////////////////////////////////////////////
Route::group(['prefix' => 'admin','middleware' => 'auth:web'],function()
{
    Route::get('/dashboard', function(){
        return view('admin/dashboard');
    });

    Route::get('/staff', function(){
        return view('admin/staff');
    });
    Route::get('/roles', function(){
        return view('admin/roles');
    });
    Route::get('/integrations', function(){
        return view('admin/integrations');
    });
    Route::get('/account', function(){
        return view('admin/account');
    });
});

Route::post('/api/v1/admin/accountupdate/{id}', 'AdminController@update');


//***Roles***//

Route::get('/api/v1/roles/{id?}', 'Roles@index');
Route::post('/api/v1/roles', 'Roles@store');
Route::post('/api/v1/roles/{id}', 'Roles@update');
Route::delete('/api/v1/roles/{id}', 'Roles@destroy');

//***Staff***//

Route::get('/api/v1/staffs/{id?}', 'Staffs@index');
Route::post('/api/v1/staffs/', 'Staffs@store');
Route::post('/api/v1/staffs/{id}', 'Staffs@update');
Route::delete('/api/v1/staffs/{id}', 'Staffs@destroy');

//***Integrations***//

Route::get('/api/v1/integrations/{cid}/{id?}', 'Integrations@index');
Route::post('/api/v1/integrations', 'Integrations@store');
Route::post('/api/v1/integrations/{id}', 'Integrations@update');
Route::delete('/api/v1/integrations/{id}', 'Integrations@destroy');


/////////////////////////////////////////////////////////////
/////////////////*** Users (aka Staffs) ****////////////////////
/////////////////////////////////////////////////////////////
//** Auth ** //
Route::get('/staff/login', 'Auth\StaffLoginController@showLoginForm')->name('staff.login');
Route::post('/staff/login', 'Auth\StaffLoginController@login')->name('staff.login.submit');

Route::group(['prefix' => 'user','middleware' => 'auth:staff'],function()
{
    Route::get('/dashboard', function(){
        return view('user/dashboard');
    })->name('user.dashboard');

    Route::get('/prescribe', function(){
        return view('user/prescribe');
    })->name('user.prescribe');

    Route::get('/panel', function(){
        return view('user/panel');
    });
    Route::get('/fooditems', function(){
        return view('user/fooditems');
    });
    Route::get('/catagories', function(){
        return view('user/catagories');
    });
    Route::get('/diettype', function(){
        return view('user/diettype');
    });
    Route::get('/recipies', function(){
        return view('user/recipies');
    });
    Route::get('/units', function(){
        return view('user/units');
    });
    Route::get('/account', function(){
        return view('user/account');
    });
});
Route::get('/dbmerge', function(){
    return view('dbmerge/index');
});

//***DashBoard***//

Route::get('/api/v1/userdashboard/{id?}', 'UserDashboardController@index');
Route::post('/api/v1/characteristics', 'Characteristics@store');
Route::post('/api/v1/characteristics/{id}', 'Characteristics@update');
Route::delete('/api/v1/characteristics/{id}', 'Characteristics@destroy');


//***Account***//
Route::post('/api/v1/user/updateAccount/{id}', 'StaffAccountController@update');

//***Categories***//
Route::get('/api/v1/category/{id?}', 'Category@index');
Route::post('/api/v1/category', 'Category@store');
Route::post('/api/v1/category/{id}', 'Category@update');
Route::post('/api/v1/category-reorder', 'Category@reorder');
Route::delete('/api/v1/category/{id}', 'Category@destroy');

//***Characteristics***//
Route::get('/api/v1/characteristics/{id?}', 'Characteristics@index');
Route::post('/api/v1/characteristics', 'Characteristics@store');
Route::post('/api/v1/characteristics/{id}', 'Characteristics@update');
Route::delete('/api/v1/characteristics/{id}', 'Characteristics@destroy');

//***PrescribeDiet***//
Route::get('/api/v1/prescribe/{id?}', 'PrescribeDiet@index');
Route::post('/api/v1/prescribe', 'PrescribeDiet@store');
Route::get('/api/v1/getPrescription/{presID}', 'PrescribeDiet@getPrescription');
Route::get('/api/v1/getPatientSelect2', 'PrescribeDiet@getpatient');
Route::post('/api/v1/storePrescription/{pid}', 'PrescribeDiet@storePrescription');
Route::post('/api/v1/updatePrescription/{pid}/{prescID}', 'PrescribeDiet@updatePrescription');
Route::post('/api/v1/prescribe/{id}', 'PrescribeDiet@update');
Route::delete('/api/v1/prescribe/{id}', 'PrescribeDiet@destroy');
Route::get('/api/v1/checkAPI', 'PrescribeDiet@checkAPI');

//***Patients***//

Route::get('/api/v1/patients/{id?}', 'Patients@index');
Route::post('/api/v1/patients', 'Patients@store');
Route::post('/api/v1/patients/{id}', 'Patients@update');
Route::post('/api/v1/deletePatient/{id}', 'Patients@destroy');

Route::post('/api/v1/files', 'Patients@filestore');
Route::get('/api/v1/setPDF', 'Patients@setPdf');


//***Food Item***//

Route::get('/api/v1/fooditems/{id?}', 'FoodItems@index');
Route::get('/api/v1/simpleFooditems', 'FoodItems@simpleFoodList');
Route::post('/api/v1/fooditems', 'FoodItems@store');
Route::post('/api/v1/fooditems/{id}', 'FoodItems@update');
Route::post('/api/v1/fooditems-reorder', 'FoodItems@reorder');
Route::delete('/api/v1/fooditems/{id}', 'FoodItems@destroy');

//***Diet Type***//

Route::get('/api/v1/diettype/{id?}', 'DietTypes@index');
Route::post('/api/v1/diettype', 'DietTypes@store');
Route::post('/api/v1/diettype/{id}', 'DietTypes@update');
Route::delete('/api/v1/diettype/{id}', 'DietTypes@destroy');

//***Food Diet Types***//

Route::get('/api/v1/fooddiettypes/{id?}', 'FoodDietType@index');
Route::post('/api/v1/fooddiettypes', 'FoodDietType@store');
Route::post('/api/v1/fooddiettypes/{id}', 'FoodDietType@update');
Route::delete('/api/v1/fooddiettypes/{id}', 'FoodDietType@destroy');


//***Food Categories***//

Route::get('/api/v1/foodcategories/{id?}', 'FoodCategory@index');
Route::post('/api/v1/foodcategories', 'FoodCategory@store');
Route::post('/api/v1/foodcategories/{id}', 'FoodCategory@update');
Route::delete('/api/v1/foodcategories/{id}', 'FoodCategory@destroy');

//***Food Panel***//

Route::get('/api/v1/foodpanel/{id?}', 'FoodPanels@index');
Route::post('/api/v1/foodpanel', 'FoodPanels@store');
Route::post('/api/v1/foodpanel/{id}', 'FoodPanels@update');
Route::delete('/api/v1/foodpanel/{id}', 'FoodPanels@destroy');

//***Prescribe Food Panel***//

Route::get('/api/v1/foodpanelP/{id?}', 'PrescribeFoodPanel@index');
Route::post('/api/v1/foodpanelP', 'PrescribeFoodPanel@store');
Route::post('/api/v1/foodpanelP/{id}', 'PrescribeFoodPanel@update');
Route::delete('/api/v1/foodpanelP/{id}', 'PrescribeFoodPanel@destroy');

//****Recipes Meals ***//

Route::get('/api/v1/meals/{id?}', 'Meals@index');
Route::post('/api/v1/meals', 'Meals@store');
Route::post('/api/v1/meals/{id}', 'Meals@update');
Route::delete('/api/v1/meals/{id}', 'Meals@destroy');

//****Recipes ***//
Route::get('/api/v1/recipes/{id?}', 'Recipe@index');
Route::post('/api/v1/recipes/', 'Recipe@store');
Route::post('/api/v1/recipes/{id}', 'Recipe@update');
Route::delete('/api/v1/recipes/{id}', 'Recipe@destroy');

//***Ingredients***//

Route::get('/api/v1/ingredients/{id?}', 'Ingredients@index');
Route::post('/api/v1/ingredients', 'Ingredients@store');
Route::post('/api/v1/ingredients/{id}', 'Ingredients@update');
Route::delete('/api/v1/ingredients/{id}', 'Ingredients@destroy');

//***Food Ingredients***//

Route::get('/api/v1/foodingredients/{id?}', 'FoodIngredient@index');
Route::post('/api/v1/foodingredients', 'FoodIngredient@store');
Route::post('/api/v1/foodingredients/{id}', 'FoodIngredient@update');
Route::delete('/api/v1/foodingredients/{id}', 'FoodIngredient@destroy');

//***units***//

Route::get('/api/v1/units/{id?}', 'UserUnitsController@index');
Route::post('/api/v1/units', 'UserUnitsController@store');
Route::post('/api/v1/units/{id}', 'UserUnitsController@update');
Route::delete('/api/v1/units/{id}', 'UserUnitsController@destroy');

//****FoodItems List***//
Route::get('/api/v1/foodlist/', 'FoodItems@getFoodlist');

//***Recipe List***//
Route::get('/api/v1/recipelist/', 'Recipe@getRecipeList');


//****patienthistory ***//
Route::get('/api/v1/patienthistory/{id?}', 'PatientHistory@index');
Route::delete('/api/v1/patienthistory/{id}', 'PatientHistory@destroy');


Route::get('/api/v1/patientfiles/{id?}', 'Patients@files');



///////////////////////////////////////////////////
///////////////////////////////////////////////////


Route::get('/api/v1/employees/{id?}', 'Employees@index');
Route::post('/api/v1/employees', 'Employees@store');
Route::post('/api/v1/employees/{id}', 'Employees@update');
Route::delete('/api/v1/employees/{id}', 'Employees@destroy');

Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');

//Post Example
Route::get('/home', 'PostController@index')->name('home');

Route::resource('users', 'UserController');

Route::resource('roles', 'RoleController');

Route::resource('permissions', 'PermissionController');

Route::resource('posts', 'PostController');
