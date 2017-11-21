<?php

namespace App\Http\Controllers;

use App\Models\PrescriptionFood;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class PrescriptionFoods extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        	  $prescriptionfood = DB::table('prescriptionfoods')
                    ->join('dietprescriptions', 'prescriptionfoods.DPID', '=', 'dietprescriptions.id')
                    ->join('fooditems', 'prescriptionfoods.FID', '=', 'fooditems.id')
                    ->select('prescriptionfoods.*', 'dietprescriptions.*','fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmuneReaction','fooditems.Foodlist as fooditemsfoodlist','fooditems.Comprehensivelist as fooditemsComprehensivelist')
                    ->get();

          return $prescriptionfood;


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
        $prescriptionfood = new PrescriptionFood;
        $prescriptionfood->DPID                 = $request->input('DPID');
        $prescriptionfood->FID                  = $request->input('FID');
        $prescriptionfood->Allowed              = $request->input('Allowed');
        $prescriptionfood->PRA                  = $request->input('PRA');
        $prescriptionfood->PRG                  = $request->input('PRG');
        $prescriptionfood->PRE                  = $request->input('PRE');
        $prescriptionfood->PRLevel              = $request->input('PRLevel');
        $prescriptionfood->ExperimentationLevel = $request->input('ExperimentationLevel');
        $prescriptionfood->In_Out               = $request->input('In_Out');

        $prescriptionfood->save();
        return 'Prescription Food record successfully created with id ' . $prescriptionfood->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
                  $prescriptionfood = DB::table('prescriptionfoods')
                    ->join('dietprescriptions', 'prescriptionfoods.DPID', '=', 'dietprescriptions.id')
                    ->join('fooditems', 'prescriptionfoods.FID', '=', 'fooditems.id')
                  ->select('prescriptionfoods.*', 'dietprescriptions.*','fooditems.Name as fooditemName','fooditems.ImmuneReaction as fooditemImmuneReaction','fooditems.Foodlist as fooditemsfoodlist','fooditems.Comprehensivelist as fooditemsComprehensivelist')
                  ->where('prescriptionfoods.id','=',$id)
                  ->get();

          return $prescriptionfood;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $prescriptionfood = PrescriptionFood::find($id);

        $prescriptionfood->DPID                 = $request->input('DPID');
        $prescriptionfood->FID                  = $request->input('FID');
        $prescriptionfood->Allowed              = $request->input('Allowed');
        $prescriptionfood->PRA                  = $request->input('PRA');
        $prescriptionfood->PRG                  = $request->input('PRG');
        $prescriptionfood->PRE                  = $request->input('PRE');
        $prescriptionfood->PRLevel              = $request->input('PRLevel');
        $prescriptionfood->ExperimentationLevel = $request->input('ExperimentationLevel');
        $prescriptionfood->In_Out               = $request->input('In_Out');

        $prescriptionfood->save();

        return "Success updating Prescription Food #" . $prescriptionfood->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $prescriptionfood = PrescriptionFood::find($id);

        $prescriptionfood->delete();

        return "Prescription Food record successfully deleted #" . $id;
    }
}
