<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\User;
use App\Models\Staff;
use App\Models\Role as StaffRoles;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

//Importing laravel-permission models
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class Clients extends Controller
{
  /**
  * Display a listing of the resource.
  *
  * @return Response
  */
  public function index($id = null) {
    if ($id == null) {

      $clients = DB::table('client')
      ->leftjoin('organizationtypes', 'client.OrgID', '=', 'organizationtypes.id')
      ->leftjoin('subscriptionpackages', 'client.PackID', '=', 'subscriptionpackages.id')
      ->select('client.*', 'organizationtypes.Name as orgName', 'subscriptionpackages.Name as packName')
      ->get();
      return $clients;
    } else {
      return $this->show($id);
    }


  }

  /**
  * Check for duplicate email
  *
  * @return Response
  */
  public function checkemail(Request $request) {
    $bool = 0;
    $client = DB::table('client')
    ->where('Email','=',$request->input('Email'))
    ->get();
    // return $client;

    if (sizeof($client) > 0)
    {
      $bool = 1;
      return $bool;
    }
    else
    {
      $bool = 2;
      return $bool;
    }
  }

  /**
  * Store a newly created resource in storage.
  *
  * @param  Request  $request
  * @return Response
  */
  public function store(Request $request) {
    $client = new Client;
    $user   = new User;
    $staff  = new Staff;
    $role   = new StaffRoles;
    /*
    $user = Client::where('email',Input::get('Email'))->first();
    if (is_null($user))
    {
    print_r("email is exists");
    // return false;
  }*/

  //record insertion in client table
  $client->OrgID      = $request->input('orgID');
  $client->PackID     = $request->input('PackID');
  $client->Title      = $request->input('Title');
  $client->FName      = $request->input('FName');
  $client->LName      = $request->input('LName');
  $client->OrgName    = $request->input('orgName');
  $client->PhoneNo    = $request->input('PhoneNo');
  $client->OfficeNo   = $request->input('OfficeNo');
  $client->Email      = $request->input('Email');
  $client->City       = $request->input('City');
  $client->State      = $request->input('State');
  $client->Country    = $request->input('Country');
  $client->Address    = $request->input('Address');
  $client->Logo       = $request->input('Picture');

  $client->save();

  $clientid           = $client->id;

  //***** Set DataSet For Client *******//
  //For mapping old foods id to new Foods
  $foodArr = [];
  //Set FoodItems
  $Foods = DB::table('fooditems')->orderBy('id', 'asc')
  ->where('CID', 94)
  ->get();
  for ($i=0; $i < sizeof($Foods); $i++)
  {
    $foodID = DB::table('fooditems')->insertGetId(
      ['CID' => $client->id, 'Name' => $Foods[$i]->Name, 'Order' => $Foods[$i]->Order, 'Url' => $Foods[$i]->Url, 'ImmuneReaction' => $Foods[$i]->ImmuneReaction,
      'Foodlist' => $Foods[$i]->Foodlist, 'Comprehensivelist' => $Foods[$i]->Comprehensivelist, 'created_by' => $Foods[$i]->created_by]
    );
    // $foodArr[$i]['old'] = $Foods[$i]->id;
    // $foodArr[$i]['new'] = $foodID;
    $foodArr[$Foods[$i]->id] = $foodID;
  }

  for ($i=0; $i < sizeof($Foods); $i++)
  {
    //Set Food Related foodaka
    $FoodAka = DB::table('foodaka')
    ->where('FID', $Foods[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($FoodAka); $j++)
    {
      $FID = $FoodAka[$j]->FID;
      DB::insert('insert into foodaka (FID, Name, Comprehensivelist, created_by) values (?, ?, ?, ?)', [$foodArr[$FID], $FoodAka[$j]->Name, $FoodAka[$j]->Comprehensivelist, $FoodAka[$j]->created_by]);
    }
    //Set Foods Related ingredients
    $FoodIng = DB::table('foodingredients')
    ->where('FID', $Foods[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($FoodIng); $j++)
    {
      $IID = $FoodIng[$j]->IID;
      $FID = $FoodIng[$j]->FID;
      DB::insert('insert into foodingredients (FID, IID) values (?, ?)', [$foodArr[$FID], $foodArr[$IID]]);
    }
  }

  //Set DietTypes
  //For mapping old diets id to new diets
  $DietArr = [];
  $Diets   = DB::table('diettype')->orderBy('id', 'asc')
  ->where('CID', 94)
  ->get();
  for ($i=0; $i < sizeof($Diets); $i++)
  {
    $dietID = DB::table('diettype')->insertGetId(
      ['CID' => $client->id, 'Name' => $Diets[$i]->Name, 'created_by' => $Diets[$i]->created_by, 'Type' => $Diets[$i]->Type]
    );
    $DietArr[$Diets[$i]->id] = $dietID;
  }

  for ($i=0; $i < sizeof($Diets); $i++)
  {
    //Set Diets Related Child Diets
    $ChildDiets = DB::table('childdiettype')
    ->where('DTIDP', $Diets[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($ChildDiets); $j++)
    {
      $DTIDP = $ChildDiets[$j]->DTIDP;
      $DTIDC = $ChildDiets[$j]->DTIDC;
      DB::insert('insert into childdiettype (DTIDP, DTIDC) values (?, ?)', [$DietArr[$DTIDP], $DietArr[$DTIDC]]);
    }
    //Set Diets Related Foods
    $DietFoods = DB::table('fooddiettypes')
    ->where('DTID', $Diets[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($DietFoods); $j++)
    {
      $FID  = $DietFoods[$j]->FID;
      $DTID = $DietFoods[$j]->DTID;
      DB::insert('insert into fooddiettypes (FID, DTID) values (?, ?)', [$foodArr[$FID], $DietArr[$DTID]]);
    }
  }

  //Set Categories
  $Categories = DB::table('categories')->orderBy('id', 'asc')
  ->where('CID', 94)
  ->get();
  for ($i=0; $i < sizeof($Categories); $i++)
  {
    $catID = DB::table('categories')->insertGetId(
      ['Name' => $Categories[$i]->Name, 'Color' => $Categories[$i]->Color, 'CID' => $client->id, 'Order' => $Categories[$i]->Order]
    );
    //Set Cats Related Foods
    $foodCats = DB::table('foodcategories')
    ->where('CatID', $Categories[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($foodCats); $j++)
    {
      $FID = $foodCats[$j]->FID;
      DB::insert('insert into foodcategories (FID, CatID) values (?, ?)', [$foodArr[$FID], $catID]);
    }
    //Set Cats Related Diets
    $DietCats = DB::table('diettypecategories')
    ->where('CatID', $Categories[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($DietCats); $j++)
    {
      $DTID = $DietCats[$j]->DTID;
      DB::insert('insert into diettypecategories (DTID, CatID) values (?, ?)', [$DietArr[$DTID], $catID]);
    }
  }

  //Set Characteristics
  $Chars = DB::table('characteristics')->orderBy('id', 'asc')
  ->where('CID', 94)
  ->get();
  for ($i=0; $i < sizeof($Chars); $i++)
  {
    $charID = DB::table('characteristics')->insertGetId(
      ['CID' => $client->id, 'Name' => $Chars[$i]->Name]
    );
    //Set Chars Related Foods
    $foodChars = DB::table('foodcharacteristics')
    ->where('CharID', $Chars[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($foodChars); $j++)
    {
      $FID = $foodChars[$j]->FID;
      DB::insert('insert into foodcharacteristics (FID, CharID) values (?, ?)', [$foodArr[$FID], $charID]);
    }
    //Set Chars Related DietPresCount
    $DietChars = DB::table('diettypecharacteristics')
    ->where('CharID', $Chars[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($DietChars); $j++)
    {
      $DTID = $DietChars[$j]->DTID;
      DB::insert('insert into diettypecharacteristics (DTID, CharID) values (?, ?)', [$DietArr[$DTID], $charID]);
    }
  }


  //Set FoodPanel
  $FoodPanel = DB::table('foodpanel')->orderBy('id', 'asc')
  ->where('CID', 94)
  ->get();
  for ($i=0; $i < sizeof($FoodPanel); $i++)
  {
    $PanelID = DB::table('foodpanel')->insertGetId(
      ['CID' => $client->id, 'Name' => $FoodPanel[$i]->Name, 'Type' => $FoodPanel[$i]->Type, 'ReactionType' => $FoodPanel[$i]->ReactionType]
    );
    //Set FoodPanel Related foodpanelcategory for Categorized
    $PanelCats = DB::table('foodpanelcategory')
    ->where('PID', $FoodPanel[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($PanelCats); $j++)
    {
      $PanelCatID = DB::table('foodpanelcategory')->insertGetId(
        ['PID' => $PanelID, 'Name' => $PanelCats[$j]->Name, 'Color' => $PanelCats[$j]->Color, 'Order' => $PanelCats[$j]->Order]
      );
      //Set FoodPanel Related foodpanelcategory -> foodpanelfooditems
      $Food_P_Cat_Foods = DB::table('foodpanelfooditems')
      ->where('PID', $FoodPanel[$i]->id)
      ->where('CatID', $PanelCats[$j]->id)
      ->get();
      for ($k=0; $k < sizeof($Food_P_Cat_Foods); $k++)
      {
        $FID = $Food_P_Cat_Foods[$k]->FID;
        $Panel_Foods = DB::table('foodpanelfooditems')->insertGetId(
          ['PID' => $PanelID, 'CatID' => $PanelCatID, 'FID' => $foodArr[$FID], 'Name' => $Food_P_Cat_Foods[$k]->Name, 'Order' => $Food_P_Cat_Foods[$k]->Order]
        );
      }
    }

    //Set FoodPanel Related Non-Categorized -> foodpanelfooditems
    $Food_P_Cat_Foods = DB::table('foodpanelfooditems')
    ->where('PID', $FoodPanel[$i]->id)
    ->where('CatID', NULL)
    ->get();
    for ($k=0; $k < sizeof($Food_P_Cat_Foods); $k++)
    {
      $FID = $Food_P_Cat_Foods[$k]->FID;
      $Panel_Foods = DB::table('foodpanelfooditems')->insertGetId(
        ['PID' => $PanelID, 'CatID' => NULL, 'FID' => $foodArr[$FID], 'Name' => $Food_P_Cat_Foods[$k]->Name, 'Order' => $Food_P_Cat_Foods[$k]->Order]
      );
    }
  }

  //Set Recipes
  $Recipes = DB::table('recipes')->orderBy('id', 'asc')
  ->where('CID', 94)
  ->get();
  for ($i=0; $i < sizeof($Recipes); $i++)
  {
    $RecipeID = DB::table('recipes')->insertGetId(
      ['CID' => $client->id, 'Name' => $Recipes[$i]->Name, 'mealID' => $Recipes[$i]->mealID, 'created_by' => $Recipes[$i]->created_by]
    );
    //Set Recipes Related Ins
    $Ins = DB::table('recipeinstructions')
    ->where('RID', $Recipes[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($Ins); $j++)
    {
      DB::insert('insert into recipeinstructions (RID, instruction) values (?, ?)', [$RecipeID, $Ins[$j]->instruction]);
    }
    //Set Recipes Related ingredients
    $Ings = DB::table('ingredients')
    ->where('RID', $Recipes[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($Ings); $j++)
    {
      $FID = $Ings[$j]->FID;
      DB::insert('insert into ingredients (RID, FID, Qty, Units, Comments, created_by) values (?, ?, ?, ?, ?, ?)', [$RecipeID, $foodArr[$FID], $Ings[$j]->Qty, $Ings[$j]->Units, $Ings[$j]->Comments, $Ings[$j]->created_by]);
    }
  }

  //Set Units
  //For mapping old diets id to new diets
  $UnitArr = [];
  $Units = DB::table('units')->orderBy('id', 'asc')
  ->where('CID', 94)
  ->get();
  for ($i=0; $i < sizeof($Units); $i++)
  {
    $unitID = DB::table('units')->insertGetId(
      ['CID' => $client->id, 'unit_name' => $Units[$i]->unit_name, 'abbrivation' => $Units[$i]->abbrivation]
    );
    $UnitArr[$Units[$i]->id] = $dietID;
  }

  for ($i=0; $i < sizeof($Units); $i++)
  {
    //Set units Related unit_measures
    $UnitMeasures = DB::table('unit_measures')
    ->where('parent_unit', $Units[$i]->id)
    ->get();
    for ($j=0; $j < sizeof($UnitMeasures); $j++)
    {
      $parent_unit = $UnitMeasures[$j]->parent_unit;
      $child_unit  = $UnitMeasures[$j]->child_unit;
      DB::insert('insert into unit_measures (parent_unit, child_unit, value, parent_value) values (?, ?, ?, ?)', [$UnitArr[$parent_unit], $UnitArr[$child_unit], $UnitMeasures[$j]->value, $UnitMeasures[$j]->parent_value]);
    }
  }

  //record insertion in user table
  $user->CID        = $client->id;
  $user->type       = "Admin";
  $user->fname      = $request->input('FName');
  $user->lname      = $request->input('LName');
  $user->email      = $request->input('Email');
  $user->password   = Hash::make($request->input('Password'));
  $user->active     = "1";
  $roles = array("3");
  $user->save();

  //record insertion in role table
  $role->CID               = $client->id;
  $role->Name              = 'Doctor';
  $role->FoodManagement    = '1,1,1,1';
  $role->FoodPanel         = '1,1,1,1';
  $role->DietPrescription  = '1,1,1,1';
  $role->save();

  if (isset($roles)) {
    $user->roles()->sync($roles);  //If one or more role is selected associate user to roles
  }
  else {
    $user->roles()->detach(); //If no role is selected remove exisiting role associated to a user
  }
  return $client;
}

/**
* Display the specified resource.
*
* @param  int  $id
* @return Response
*/
public function show($id) {
  return Client::find($id);
}

/**
* Update the specified resource in storage.
*
* @param  Request  $request
* @param  int  $id
* @return Response
*/
public function update(Request $request, $id) {
  $client = Client::find($id);

  $client->OrgID    = $request->input('OrgID');
  $client->PackID   = $request->input('PackID');
  $client->FName    = $request->input('FName');
  $client->LName    = $request->input('LName');
  // $client->OrgName  = "Dummy";
  $client->PhoneNo  = $request->input('PhoneNo');
  $client->Email    = $request->input('Email');
  $client->City     = $request->input('City');
  $client->State    = $request->input('State');
  $client->Country  = $request->input('Country');
  $client->Address  = $request->input('Address');
  $client->Logo     = $request->input('Picture');
  $client->save();

  return "Sucess updating Client #" . $client->id;
}

/**
* Remove the specified resource from storage.
*
* @param  int  $id
* @return Response
*/
public function destroy($id) {
    $Foods = DB::table('fooditems')->orderBy('id', 'asc')
    ->where('CID', $id)
    ->get();
    for ($i=0; $i < sizeof($Foods); $i++)
    {
      $foodaka = DB::table('foodaka')->where('FID', $Foods[$i]->id)->delete();
      $foodingredients = DB::table('foodingredients')->where('FID', $Foods[$i]->id)->delete();
    }
    $Foods = DB::table('fooditems')->where('CID', $id)->delete();

    ////diet types
    $diettype = DB::table('diettype')->orderBy('id', 'asc')
    ->where('CID', $id)
    ->get();
    for ($i=0; $i < sizeof($diettype); $i++)
    {
      $childdiettype = DB::table('childdiettype')->where('DTIDP', $diettype[$i]->id)->delete();
      $fooddiettypes = DB::table('fooddiettypes')->where('DTID', $diettype[$i]->id)->delete();
    }
    $diettype = DB::table('diettype')->where('CID', $id)->delete();

    ////categories
    $categories = DB::table('categories')->orderBy('id', 'asc')
    ->where('CID', $id)
    ->get();
    for ($i=0; $i < sizeof($categories); $i++)
    {
      $foodcategories = DB::table('foodcategories')->where('CatID', $categories[$i]->id)->delete();
      $diettypecategories = DB::table('diettypecategories')->where('CatID', $categories[$i]->id)->delete();
    }
    $categories = DB::table('categories')->where('CID', $id)->delete();

    ////Characteristics
    $characteristics = DB::table('characteristics')->orderBy('id', 'asc')
    ->where('CID', $id)
    ->get();
    for ($i=0; $i < sizeof($characteristics); $i++)
    {
      $foodcharacteristics = DB::table('foodcharacteristics')->where('CharID', $characteristics[$i]->id)->delete();
      $diettypecharacteristics = DB::table('diettypecharacteristics')->where('CharID', $characteristics[$i]->id)->delete();
    }
    $characteristics = DB::table('characteristics')->where('CID', $id)->delete();

    ////Food panel
    $foodpanel = DB::table('foodpanel')->orderBy('id', 'asc')
    ->where('CID', $id)
    ->get();
    for ($i=0; $i < sizeof($foodpanel); $i++)
    {
      $foodpanelcategory = DB::table('foodpanelcategory')->where('PID', $foodpanel[$i]->id)->delete();
      $foodpanelfooditems = DB::table('foodpanelfooditems')->where('PID', $foodpanel[$i]->id)->delete();
    }
    $foodpanel = DB::table('foodpanel')->where('CID', $id)->delete();

    ////recipies
    $recipes = DB::table('recipes')->orderBy('id', 'asc')
    ->where('CID', $id)
    ->get();
    for ($i=0; $i < sizeof($recipes); $i++)
    {
      $recipeinstructions = DB::table('recipeinstructions')->where('RID', $recipes[$i]->id)->delete();
      $ingredients = DB::table('ingredients')->where('RID', $recipes[$i]->id)->delete();
    }
    $recipes = DB::table('recipes')->where('CID', $id)->delete();

    ////Food panel
    $units = DB::table('units')->orderBy('id', 'asc')
    ->where('CID', $id)
    ->get();
    for ($i=0; $i < sizeof($units); $i++)
    {
      $foodpanelcategory = DB::table('unit_measures')->where('parent_unit', $units[$i]->id)->delete();
    }
    $units = DB::table('units')->where('CID', $id)->delete();

    $integration = DB::table('integration')->where('CID', $id)->delete();
    $patient     = DB::table('patient')->where('CID', $id)->delete();
    $staff       = DB::table('staff')->where('CID', $id)->delete();
    $staffroles  = DB::table('staffroles')->where('CID', $id)->delete();
    $users       = DB::table('users')->where('cid', $id)->delete();
    $client      = Client::find($id);
    $client->delete();

    return "Client record successfully deleted #" . $id;
  }
}
