<?php

namespace App\Http\Controllers;

use App\Models\FoodAka;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class FoodAkas extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {

        	$foodaka = DB::table('foodaka')
                  ->join('fooditems', 'foodaka.FID', '=', 'fooditems.id')
                  ->select('foodaka.*', 'fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmune','fooditems.Foodlist as fooditemfoodlist','fooditems.Comprehensivelist as fooditemcomprehensivelist')
                  ->get();
          return $foodaka;
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
        $foodaka = new FoodAka;

        $foodaka->FID  = $request->input('FID');
        $foodaka->Name = $request->input('Name');
        $foodaka->save();

        return 'FoodAka record successfully created with id ' . $foodaka->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

    	$foodaka = DB::table('foodaka')
                  ->join('fooditems', 'foodaka.FID', '=', 'fooditems.id')
                  ->select('foodaka.*', 'fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmune','fooditems.Foodlist as fooditemfoodlist','fooditems.Comprehensivelist as fooditemcomprehensivelist')
                  ->where('foodaka.id','=',$id)
                  ->get();
          return $foodaka;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $foodaka = FoodAka::find($id);

        $foodaka->FID  = $request->input('FID');
        $foodaka->Name = $request->input('Name');
        $foodaka->save();

        return "Success updating Food Aka #" . $foodaka->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $foodaka = FoodAka::find($id);

        $foodaka->delete();

        return "Food Aka record successfully deleted #" . $id;
    }
}
