<?php

namespace App\Http\Controllers;

use App\Models\FoodDietTypes;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class FoodDietType extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        	$fooddiettype = DB::table('fooddiettypes')
                  ->leftJoin('fooditems', 'fooddiettypes.FID', '=', 'fooditems.id')
                  ->leftJoin('diettype', 'fooddiettypes.DTID', '=', 'diettype.id')
                   ->select('fooddiettypes.*', 'fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmune','fooditems.Foodlist as fooditemfoodlist','fooditems.Comprehensivelist as fooditemComprehensivelist', 'diettype.Name as diettypeName','diettype.Type as dietType')
                  ->get();

              return $fooddiettype;

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
        $fooddiettypes = new FoodDietTypes;
        $fooddiettypes->FID  = $request->input('FID');
        $fooddiettypes->DTID = $request->input('DTID');
        $fooddiettypes->save();
        return 'Food Diet Type record successfully created with id ' . $fooddiettypes->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

          $fooddiettype = DB::table('fooddiettypes')
                  ->join('fooditems', 'fooddiettypes.FID', '=', 'fooditems.id')
                  ->join('diettype', 'fooddiettypes.DTID', '=', 'diettype.id')
                  ->select('fooddiettypes.*', 'fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmune','fooditems.Foodlist as fooditemfoodlist','fooditems.Comprehensivelist as fooditemComprehensivelist', 'diettype.Name as diettypeName','diettype.Type as dietType')
                  ->where('fooddiettypes.id','=',$id)
                  ->get();

              return $fooddiettype;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $fooddiettypes = FoodDietTypes::find($id);

        $fooddiettypes->FID  = $request->input('FID');
        $fooddiettypes->DTID = $request->input('DTID');
        $fooddiettypes->save();

        return "Success updating Food Diet Type #" . $fooddiettypes->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $fooddiettypes = FoodDietTypes::find($id);

        $fooddiettypes->delete();

        return "Food Diet Type record successfully deleted #" . $id;
    }
}
