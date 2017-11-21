<?php

namespace App\Http\Controllers;

use App\Models\FoodIngredients;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class FoodIngredient extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        	$foodingredient = DB::table('foodingredients')
                  ->join('fooditems', 'foodingredients.FID', '=', 'fooditems.id')
                  ->join('fooditems as fooditems2', 'foodingredients.IID', '=', 'fooditems2.id')
                  ->select('foodingredients.*', 'fooditems.Name as fooditemname', 'fooditems2.Name as foodingredientName')
                  ->get();
          return $foodingredient;


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
        $foodingredient = new FoodIngredients;
        $foodingredient->FID = $request->input('FID');
        $foodingredient->IID = $request->input('IID');
        $foodingredient->save();

        return 'Food Ingredient record successfully created with id ' . $foodingredient->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
       $foodingredient = DB::table('foodingredients')
                                      ->join('fooditems', 'foodingredients.IID', '=', 'fooditems.id')
                                      ->select('foodingredients.*', 'fooditems.Name as foodingredientName')
                                      ->where('foodingredients.FID','=',$id)
                                      ->get();
          // $foodingredient = DB::table('foodingredients')
          //         ->join('fooditems', 'foodingredients.FID', '=', 'fooditems.id')
          //         ->join('fooditems as fooditems2', 'foodingredients.IID', '=', 'fooditems2.id')
          //         ->select('foodingredients.*', 'fooditems.Name as fooditemname', 'fooditems2.Name as foodingredientName')
          //         ->where('foodingredients.FID','=',$id)
          //         ->get();

          return $foodingredient;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $foodingredient = FoodIngredients::find($id);

        $foodingredient->FID = $request->input('FID');
        $foodingredient->IID = $request->input('IID');
        $foodingredient->save();

        return "Success updating Food Ingredient #" . $foodingredient->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $foodingredient = FoodIngredients::find($id);
        $foodingredient->delete();

        return "Food Ingredient record successfully deleted #" . $id;
    }
}
