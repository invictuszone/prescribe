<?php

namespace App\Http\Controllers;

use App\Models\FoodCharacteristics;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class FoodCharacteristic extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        	$foodcharacteristics = DB::table('foodcharacteristics')
                  ->join('fooditems', 'foodcharacteristics.FID', '=', 'fooditems.id')
                  ->join('characteristics', 'foodcharacteristics.CharID', '=', 'characteristics.id')
                    ->select('foodcharacteristics.*', 'fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmune','fooditems.Foodlist as fooditemfoodlist','fooditems.Comprehensivelist as fooditemComprehensivelist', 'characteristics.Name as characteristicsName')
                  ->get();

              return $foodcharacteristics;



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
        $foodcharacteristics = new FoodCharacteristics;
        $foodcharacteristics->FID    = $request->input('FID');
        $foodcharacteristics->CharID = $request->input('CharID');
        $foodcharacteristics->save();
        return 'Food Characteristic record successfully created with id ' . $foodcharacteristics->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
    	$foodcharacteristics = DB::table('foodcharacteristics')
                  ->join('fooditems', 'foodcharacteristics.FID', '=', 'fooditems.id')
                  ->join('characteristics', 'foodcharacteristics.CharID', '=', 'characteristics.id')
                  ->select('foodcharacteristics.*', 'fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmune','fooditems.Foodlist as fooditemfoodlist','fooditems.Comprehensivelist as fooditemComprehensivelist', 'characteristics.Name as characteristicsName')
                  ->where('foodcharacteristics.id','=',$id)
                  ->get();

          return $foodcharacteristics;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $foodcharacteristics = FoodCharacteristics::find($id);

        $foodcharacteristics->FID    = $request->input('FID');
        $foodcharacteristics->CharID = $request->input('CharID');
        $foodcharacteristics->save();

        return "Success updating Food Characteristic #" . $foodcharacteristics->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $foodcharacteristics = FoodCharacteristics::find($id);

        $foodcharacteristics->delete();

        return "Food Characteristic record successfully deleted #" . $id;
    }
}
