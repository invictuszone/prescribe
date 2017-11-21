<?php

namespace App\Http\Controllers;

use App\Models\PrescriptionReaction;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class PrescriptionReactions extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        	 $prescriptionreaction = DB::table('prescriptionreactions')
                    ->join('dietprescriptions', 'prescriptionreactions.DPID', '=', 'dietprescriptions.id')
                    ->join('panel', 'prescriptionreactions.PanelID', '=', 'panel.id')
                  ->select('prescriptionreactions.*', 'dietprescriptions.*')
                  ->get();
          return $prescriptionreaction;


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
        $prescriptionreaction = new PrescriptionReaction;
        $prescriptionreaction->DPID    = $request->input('DPID');
        $prescriptionreaction->PanelID = $request->input('PanelID');
        $prescriptionreaction->Level1  = $request->input('Level1');
        $prescriptionreaction->Level2  = $request->input('Level2');
        $prescriptionreaction->Level3  = $request->input('Level3');
        $prescriptionreaction->Level4  = $request->input('Level4');

        $prescriptionreaction->save();
        return 'Prescription Reaction record successfully created with id ' . $prescriptionreaction->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
                  $prescriptionreaction = DB::table('prescriptionreactions')
                    ->join('dietprescriptions', 'prescriptionreactions.DPID', '=', 'dietprescriptions.id')
                    ->join('panel', 'prescriptionreactions.PanelID', '=', 'panel.id')
                  ->select('prescriptionreactions.*', 'dietprescriptions.*')
                  ->where('prescriptionreactions.id','=',$id)
                  ->get();

          return $prescriptionreaction;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $prescriptionreaction = PrescriptionReaction::find($id);

        $prescriptionreaction->DPID    = $request->input('DPID');
        $prescriptionreaction->PanelID = $request->input('PanelID');
        $prescriptionreaction->Level1  = $request->input('Level1');
        $prescriptionreaction->Level2  = $request->input('Level2');
        $prescriptionreaction->Level3  = $request->input('Level3');
        $prescriptionreaction->Level4  = $request->input('Level4');

        $prescriptionreaction->save();

        return "Success updating Prescription Reaction #" . $prescriptionreaction->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $prescriptionreaction = PrescriptionReaction::find($id);

        $prescriptionreaction->delete();

        return "Prescription Reaction record successfully deleted #" . $id;
    }
}
