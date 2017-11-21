<?php

namespace App\Http\Controllers;

use App\Models\Recipes;
use App\Models\Ingredients;
use App\Models\Instructions;
use App\Models\Meal;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Auth;


class Recipe extends Controller
{
  /**
  * Display a listing of the resource.
  *
  * @return Response
  */

  public function index($id = null) {
    if ($id == null) {

      if (Auth::guard('web')->check()) {
        $user   = Auth::user();
      }
      elseif (Auth::guard('staff')->check()) {
        $user = Auth::guard('staff')->user();
      }

      if ($user->CID == "") {
        $user->CID = 0;
      }

      $RecipeRaw = Recipes::orderBy('Name', 'asc')
      // ->where('CID', 0)
      ->where('CID', $user->CID)
      ->get();

      for ($i=0; $i < sizeof($RecipeRaw) ; $i++)
      {
        $Recipes[$i]           =  $RecipeRaw[$i];

        $Recipes[$i]['Meals'] = DB::table('meal')
        ->where('id',$RecipeRaw[$i]->mealID)
        ->get();

        $Recipes[$i]['Ingredients'] = DB::table('ingredients')
        ->join('fooditems', 'ingredients.FID', '=', 'fooditems.id')
        ->where('RID', $RecipeRaw[$i]->id)
        ->get(['ingredients.id as ingredientID','fooditems.Name as ingredientName','ingredients.Qty as ingredientQty','ingredients.Units as ingredientsUnit','ingredients.Comments as ingredientscomment']);
        $Recipes[$i]['Instructions']  = DB::table('recipeinstructions')
        ->where('RID', $RecipeRaw[$i]->id)
        ->get();
      }
      return $Recipes;

    }
    else
    {
      return $this->show($id);
    }
  }

  /**
  * Store a newly created resource in storage.
  *
  * @param  Request  $request
  * @return Response
  */
  public function store(Request $request) {
    $foodrecipe = new Recipes;

    if (Auth::guard('web')->check()) {
      $user   = Auth::user();
    }
    elseif (Auth::guard('staff')->check()) {
      $user = Auth::guard('staff')->user();
    }
    if ($user->CID == "") {
      $user->CID = 0;
    }



    $foodrecipe->Name         = $request->input('Name');
    $foodrecipe->CID          = $user->CID;
    //  $foodrecipe->CID          = 0;
    $foodrecipe->mealID       = $request->input('mealID');
    $foodrecipe->save();



    $ingredientscount  = $request->input('ingredientcount');
    $instructionscount = $request->input('instructioncount');

    $i=1;

    while($ingredientscount!=0)
    {
      $ingredient 		      = new Ingredients;
      $ingredient->RID      = $foodrecipe->id;
      $ingredient->FID      = $request->input('ingredientname'.$i);
      $ingredient->Qty      = $request->input('ingredientqty'.$i);
      $ingredient->Units    = $request->input('ingredientunit'.$i);
      $ingredient->Comments = $request->input('ingredientcomment'.$i);
      $ingredient->save();
      $i++;
      $ingredientscount--;
    }
    $i=1;
    // return $foodrecipe->id;

    while($instructionscount!=0)
    {
      $instructions = new Instructions;
      $instructions->RID             = $foodrecipe->id;
      $instructions->instruction     = $request->input('instructionname'.$i);
      $instructions->save();
      $i++;
      $instructionscount--;
    }

    $recipes         =  DB::table('recipes')
    ->join('meal','recipes.mealID','=','meal.id')
    ->where('recipes.id',$foodrecipe->id)
    // ->first(['recipes.*','meal.Name as MealTime']);
    ->get(['recipes.*','meal.Name as MealTime']);

    $recipes['Ingredients'] = DB::table('ingredients')
    ->join('fooditems', 'ingredients.FID', '=', 'fooditems.id')
    ->where('RID',$foodrecipe->id)
    ->get(['ingredients.id as ingredientID','fooditems.Name as ingredientName','ingredients.Qty as ingredientQty','ingredients.Units as ingredientsUnit','ingredients.Comments as ingredientscomment']);
    return $recipes;
  }

  /**
  * Display the specified resource.
  *
  * @param  int  $id
  * @return Response
  */
  public function show($id)
  {
    $recipes         =  DB::table('recipes')
    ->join('meal','recipes.mealID','=','meal.id')
    ->where('recipes.id',$id)
    ->get(['recipes.*','meal.Name as MealTime']);

    $recipes['Ingredients'] = DB::table('ingredients')
    // ->join('fooditems', 'ingredients.FID', '=', 'fooditems.id')
    ->where('RID',$id)
    // ->get(['ingredients.id as ingredientID','fooditems.Name as ingredientName','fooditems.id as FID','ingredients.Qty as ingredientQty','ingredients.Units as ingredientsUnit','ingredients.Comments as ingredientscomment']);
    ->get(['ingredients.id as ingredientID','ingredients.FID as FID', 'ingredients.Qty as ingredientQty','ingredients.Units as ingredientsUnit','ingredients.Comments as ingredientscomment']);
    $recipes['Instructions']  = DB::table('recipeinstructions')
    ->where('RID',$id)
    ->get();

    return $recipes;
  }

  /**
  * Update the specified resource in storage.
  *
  * @param  Request  $request
  * @param  int  $id
  * @return Response
  */
  public function update(Request $request, $id)
  {
    $foodrecipe = Recipes::find($id);
    $instructions = DB::table('recipeinstructions')->where('RID', $id)->delete();
    $ingredients  = DB::table('ingredients')->where('RID', $id)->delete();


    $foodrecipe->Name         = $request->input('Name');
    $foodrecipe->mealID 	  = $request->input('mealID');
    $foodrecipe->save();

    $ingredientscount  = $request->input('ingredientcount');
    $instructionscount = $request->input('instructioncount');

    $i=1;

    while($ingredientscount!=0)
    {
      $ingredient           = new Ingredients;
      $ingredient->RID      = $foodrecipe->id;
      $ingredient->FID      = $request->input('ingredientname'.$i);
      $ingredient->Qty      = $request->input('ingredientqty'.$i);
      $ingredient->Units    = $request->input('ingredientunit'.$i);
      $ingredient->Comments = $request->input('ingredientcomment'.$i);
      $ingredient->save();
      $i++;
      $ingredientscount--;
    }
    $i=1;
    // return $foodrecipe->id;

    while($instructionscount!=0)
    {
      $instructions = new Instructions;
      $instructions->RID             = $foodrecipe->id;
      $instructions->instruction     = $request->input('instructionname'.$i);
      $instructions->save();
      $i++;
      $instructionscount--;
    }

    $recipes         =  DB::table('recipes')
    ->join('meal','recipes.mealID','=','meal.id')
    ->where('recipes.id',$id)
    ->get(['recipes.*','meal.Name as MealTime']);

    $recipes['Ingredients'] = DB::table('ingredients')
    ->join('fooditems', 'ingredients.FID', '=', 'fooditems.id')
    ->where('RID',$id)
    ->get(['ingredients.id as ingredientID','fooditems.Name as ingredientName','ingredients.Qty as ingredientQty','ingredients.Units as ingredientsUnit','ingredients.Comments as ingredientscomment']);

    return $recipes;

  }

  /**
  * Remove the specified resource from storage.
  *
  * @param  int  $id
  * @return Response
  */
  public function destroy($id)
  {
    $instructions = DB::table('recipeinstructions')->where('RID', $id)->delete();
    $ingredients  = DB::table('ingredients')->where('RID', $id)->delete();
    $foodrecipe   = Recipes::find($id);
    $foodrecipe->delete();

    return "Food Recipe record successfully deleted #" . $id;
  }

  /**
  * Get Recipe List
  *
  *
  *
  */
  public function getRecipeList() {

    $user = Auth::guard('staff')->user();
    if ($user->CID == "") {
      $user->CID = 0;
    }

    $MealRaw = Meal::orderBy('id', 'asc')->get(['meal.Name as mealtime' ,'meal.id']);

    $Data = array();
    $count = 0;

    for ($i=0; $i < sizeof($MealRaw) ; $i++)
    {
      $Meals[$i]           =  $MealRaw[$i];

      $MealsRecipeRaw    = DB::table('recipes')
      ->where('recipes.mealID',$MealRaw[$i]->id)
      //  ->where('CID', 0)
      ->where('CID', $user->CID)
      ->get(['recipes.id']);

      $MealsRecipe = [];

      for($j=0; $j<sizeof($MealsRecipeRaw); $j++)
      {
        $MealsRecipe[$j]       =  DB::table('recipes')
        ->where('recipes.id',$MealsRecipeRaw[$j]->id)
        ->get(['recipes.Name as recipename']);

        // $MealsRecipe[$j]['Ingredients'] = DB::table('ingredients')
        // ->leftjoin('fooditems', 'ingredients.FID', '=', 'fooditems.id')
        // ->leftjoin('units', 'ingredients.Units', '=', 'units.id')
        // ->where('RID', $MealsRecipeRaw[$j]->id)
        // ->get(['ingredients.id as ingredientID', 'ingredients.FID as FID','fooditems.Name as ingredientName','ingredients.Qty as ingredientQty','units.unit_name as ingredientsUnit','ingredients.Comments as ingredientscomment']);

        $RawIngs = DB::table('ingredients')
                  ->leftjoin('units', 'ingredients.Units', '=', 'units.id')
                  ->where('RID', $MealsRecipeRaw[$j]->id)
                  ->get(['ingredients.id as ingredientID', 'ingredients.FID as FID',/*'fooditems.Name as ingredientName',*/'ingredients.Qty as ingredientQty','units.unit_name as ingredientsUnit','ingredients.Comments as ingredientscomment']);

        for ($k = 0; $k < sizeof($RawIngs); $k++)
        {
          if(is_numeric( $RawIngs[$k]->FID ))
          {
            $FoodName  = DB::table('fooditems')
                        ->where('id', $RawIngs[$k]->FID)
                        ->first(['Name']);
            if ($FoodName != "") {
              $RawIngs[$k]->ingredientName  = $FoodName->Name;
            }
          }
          else {
            preg_match_all('!\d+!', $RawIngs[$k]->FID, $intID);
            $FoodName  = DB::table('foodaka')
                        ->where('id', $intID)
                        ->first(['Name']);
            if ($FoodName != "") {
              $RawIngs[$k]->ingredientName  = $FoodName->Name;
            }
          }
        }
        $MealsRecipe[$j]['Ingredients'] = $RawIngs;

        $MealsRecipe[$j]['Instructions']  = DB::table('recipeinstructions')
        ->where('RID', $MealsRecipeRaw[$j]->id)
        ->get(['recipeinstructions.instruction']);

        $Meals[$i]['Recipes'] = $MealsRecipe;
      }

    }
    return $Meals;
  }
}
