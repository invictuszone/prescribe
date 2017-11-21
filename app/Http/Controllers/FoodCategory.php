<?php

namespace App\Http\Controllers;

use App\Models\FoodCategories;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class FoodCategory extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        	$food = DB::table('foodcategories')
                  ->join('fooditems', 'foodcategories.FID', '=', 'fooditems.id')
                  ->join('categories', 'foodcategories.CatID', '=', 'categories.id')
                  ->select('foodcategories.*', 'fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmune','fooditems.Foodlist as fooditemfoodlist','fooditems.Comprehensivelist as fooditemComprehensivelist', 'categories.Name as categoryName')
                  ->get();
          return $food;


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
        $foodcategories = new FoodCategories;
        $foodcategories->FID   = $request->input('FID');
        $foodcategories->CatID = $request->input('CatID');
        $foodcategories->save();
        return 'Food Category record successfully created with id ' . $foodcategories->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
    	$foodcategories = DB::table('foodcategories')
                  ->join('fooditems', 'foodcategories.FID', '=', 'fooditems.id')
                  ->join('categories', 'foodcategories.CatID', '=', 'categories.id')
                  ->select('foodcategories.*', 'fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmune','fooditems.Foodlist as fooditemfoodlist','fooditems.Comprehensivelist as fooditemComprehensivelist', 'categories.Name as categoryName')
                  ->where('foodcategories.id','=',$id)
                  ->get();

          return $foodcategories;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $foodcategories = FoodCategories::find($id);

        $foodcategories->FID   = $request->input('FID');
        $foodcategories->CatID = $request->input('CatID');
        $foodcategories->save();

        return "Success updating Food Category #" . $foodcategories->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $foodcategories = FoodCategories::find($id);

        $foodcategories->delete();

        return "Food Category record successfully deleted #" . $id;
    }
}
