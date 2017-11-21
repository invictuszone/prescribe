<?php

namespace App\Http\Controllers;

use App\Models\FoodURLs;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class FoodURL extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        		$foodurls = DB::table('foodurls')
                  ->join('fooditems', 'foodurls.FID', '=', 'fooditems.id')
                  ->select('foodurls.*','fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmune','fooditems.Foodlist as fooditemfoodlist','fooditems.Comprehensivelist as fooditemComprehensivelist')
                  ->get();

              return $foodurls;



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
        $foodurls = new FoodURLs;
        $foodurls->FID  = $request->input('FID');
        $foodurls->Name = $request->input('Name');
        $foodurls->URL  = $request->input('URL');
        $foodurls->save();
        return 'Food URL record successfully created with id ' . $foodurls->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

              	$foodurls = DB::table('foodurls')
                  ->join('fooditems', 'foodurls.FID', '=', 'fooditems.id')
                  ->select('foodurls.*','fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmune','fooditems.Foodlist as fooditemfoodlist','fooditems.Comprehensivelist as fooditemComprehensivelist')
                  ->where('foodurls.id','=',$id)
                  ->get();

              return $foodurls;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $foodurls = FoodURLs::find($id);

        $foodurls->FID  = $request->input('FID');
        $foodurls->Name = $request->input('Name');
        $foodurls->URL  = $request->input('URL');
        $foodurls->save();

        return "Success updating Food URL #" . $foodurls->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $foodurls = FoodURLs::find($id);

        $foodurls->delete();

        return "Food URL record successfully deleted #" . $id;
    }
}
