<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\PHistory;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class PatientHistory extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        		$patienthistory = DB::table('patienthistory')
                  ->join('dietprescriptions', 'patienthistory.pid', '=', 'dietprescriptions.PID')
                  ->join('files', 'dietprescriptions.id', '=', 'files.dietprescriptionid')
                  ->select('patienthistory.prescriptionDate as prescriptionDate','patienthistory.comments as patienthistorycomments','patienthistory.Status as patienthistoryStatus','files.name as filename')
                  ->get();

              return $patienthistory;

        } else {
            return $this->show($id);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

      $patientPrescriptionRaw = DB::table('dietprescriptions')
                              ->select('dietprescriptions.id')
                              ->where('dietprescriptions.PID','=',$id)
                              ->get();

        $patientPrescription = array();
        for ($i = 0; $i < sizeof($patientPrescriptionRaw); $i++)
        {
          $patientPrescription[$i]             =  $patientPrescriptionRaw[$i];

          $patientPrescription[$i]->HistoryFiles = DB::table('patienthistory')
                                                    // ->select('patienthistory.dietprescriptionid','patienthistory.patientID','patienthistory.filename','patienthistory.filetype')
                                                    ->where('patienthistory.dietprescriptionid','=',$patientPrescriptionRaw[$i]->id)
                                                    ->get();

          // $foodPanels[$i]['fooditems'] = DB::table('foodpanelfooditems')
          //                                             ->join('fooditems', 'foodpanelfooditems.FID', '=', 'fooditems.id')
          //                                             ->where('foodpanelfooditems.PID', $foodPanelsRaw[$i]->id)
          //                                             ->get(['foodpanelfooditems.id','foodpanelfooditems.PID','foodpanelfooditems.CatID','foodpanelfooditems.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);
        }
              return $patientPrescription;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $patienthistory = PHistory::find($id);

        $patienthistory->delete();

        return "Patient History record successfully deleted #" . $id;
    }
}
