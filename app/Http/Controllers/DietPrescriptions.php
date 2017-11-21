<?php

namespace App\Http\Controllers;

use App\Models\DietPrescription;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class DietPrescriptions extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        	$dietprescription = DB::table('dietprescriptions')
                  ->join('patient', 'patient.id', '=', 'dietprescriptions.PID')
                 // ->join('organizationtypes', 'organizationtypes.id', '=', 'patient.orgID')
                 // ->join('staff', 'staff.id', '=', 'patient.staffID')
                  ->select('dietprescriptions.*', 'patient.fname as patientfname','patient.lname as patientlname')
                  ->get();
          return $dietprescription;


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
        $dietprescription = new DietPrescription;
        $dietprescription->PID              = $request->input('PID');
        $dietprescription->status           = $request->input('status');
        $dietprescription->IncludeReactions = $request->input('IncludeReactions');
        $dietprescription->AutoImmune       = $request->input('AutoImmune');

        $dietprescription->save();
        return 'Diet Prescription record successfully created with id ' . $dietprescription->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
                  $dietprescriptions = DB::table('dietprescriptions')
                  ->join('patient', 'patient.id', '=', 'dietprescriptions.PID')
                 // ->join('organizationtypes', 'organizationtypes.id', '=', 'patient.orgID')
                 // ->join('staff', 'staff.id', '=', 'patient.staffID')
                  ->select('dietprescriptions.*', 'patient.fname as patientFName','patient.lname as patientLName')
                  ->where('dietprescriptions.id','=',$id)
                  ->get();

          return $dietprescriptions;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $dietprescription = DietPrescription::find($id);

        $dietprescription->PID              = $request->input('PID');
        $dietprescription->status           = $request->input('status');
        $dietprescription->IncludeReactions = $request->input('IncludeReactions');
        $dietprescription->AutoImmune       = $request->input('AutoImmune');

        $dietprescription->save();

        return "Success updating Diet Prescription #" . $dietprescription->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        // $prescriptiondiettype = DB::table('prescriptiondiettypes')->where('DPID', $id)->delete();
        // $prescriptionreaction = DB::table('prescriptionreactions')->where('DPID', $id)->delete();
        // $prescriptionfood     = DB::table('prescriptionfoods')->where('DPID', $id)->delete();

        //Remove Relating history
        $patienthistory = DB::table('patienthistory')->where('dietprescriptionid', $id)->delete();

        $dietprescription = DietPrescription::find($id);
        $dietprescription->delete();

        return "Diet Prescription record successfully deleted #" . $id;
    }
}
