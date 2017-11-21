<?php

namespace App\Http\Controllers;

use App\Models\PrescriptionDietType;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class PrescriptionDietTypes extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        	$prescriptiondiettype = DB::table('prescriptiondiettypes')
                  ->join('dietprescriptions', 'prescriptiondiettypes.DPID', '=', 'dietprescriptions.id')
                  ->join('diettype', 'prescriptiondiettypes.DTID', '=', 'diettype.id')
                  ->select('prescriptiondiettypes.*', 'dietprescriptions.*','diettype.Name as diettypeName','diettype.Type as diettypeType')
                  ->get();

          return $prescriptiondiettype;
    }


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
        $prescriptiondiettype = new PrescriptionDietType;
        $prescriptiondiettype->DPID                 = $request->input('DPID');
        $prescriptiondiettype->DTID                 = $request->input('DTID');
        $prescriptiondiettype->Type                 = $request->input('Type');
        $prescriptiondiettype->ExperimentationLevel = $request->input('ExperimentationLevel');

        $prescriptiondiettype->save();
        return 'Prescription Diet Type record successfully created with id ' . $prescriptiondiettype->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
                  $prescriptiondiettype = DB::table('prescriptiondiettypes')
                  ->join('dietprescriptions', 'prescriptiondiettypes.DPID', '=', 'dietprescriptions.id')
                  ->join('diettype', 'prescriptiondiettypes.DTID', '=', 'diettype.id')
                  ->select('prescriptiondiettypes.*', 'dietprescriptions.*','diettype.Name as diettypeName','diettype.Type as diettypeType')
                  ->where('prescriptiondiettypes.id','=',$id)
                  ->get();

          return $prescriptiondiettype;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $prescriptiondiettype = PrescriptionDietType::find($id);

        $prescriptiondiettype->DPID                 = $request->input('DPID');
        $prescriptiondiettype->DTID                 = $request->input('DTID');
        $prescriptiondiettype->Type                 = $request->input('Type');
        $prescriptiondiettype->ExperimentationLevel = $request->input('ExperimentationLevel');

        $prescriptiondiettype->save();

        return "Success updating Prescription Diet Type #" . $prescriptiondiettype->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $prescriptiondiettype = PrescriptionDietType::find($id);

        $prescriptiondiettype->delete();

        return "Prescription Diet Type record successfully deleted #" . $id;
    }
}
