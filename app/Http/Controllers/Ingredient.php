<?php

namespace App\Http\Controllers;

use App\Models\Ingredients;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class Ingredient extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        	$ingredient = DB::table('ingredients')
                  ->join('recipes', 'ingredients.RID', '=', 'recipes.id')
                  ->select('ingredients.*', 'recipes.Name as recipeName')
                  ->get();
          return $ingredient;
        } else {
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
        $ingredient = new Ingredients;
        $ingredient->RID      = $request->input('RID');
        $ingredient->Name     = $request->input('Name');
        $ingredient->Qty      = $request->input('Qty');
        $ingredient->Units    = $request->input('Units');
        $ingredient->Comments = $request->input('Comments');
        $ingredient->save();

        return 'Ingredient record successfully created with id ' . $ingredient->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

        $ingredient = DB::table('ingredients')
                  ->join('recipes', 'ingredients.RID', '=', 'recipes.id')
                  ->select('ingredients.*', 'recipes.Name as recipeName','recipes.id as recipeID')
                  ->where('ingredients.id','=',$id)
                  ->get();
          return $ingredient;
            }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $ingredient = Ingredients::find($id);

        $ingredient->RID      = $request->input('RID');
        $ingredient->Name     = $request->input('Name');
        $ingredient->Qty      = $request->input('Qty');
        $ingredient->Units    = $request->input('Units');
        $ingredient->Comments = $request->input('Comments');
        $ingredient->save();

        return "Sucess updating Ingredient #" . $ingredient->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $ingredient = Ingredients::find($id);

        $ingredient->delete();

        return "Ingredient record successfully deleted #" . $id;
    }
}
