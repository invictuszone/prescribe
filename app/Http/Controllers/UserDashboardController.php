<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\PatientHistory;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Auth;

class UserDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
            if (Auth::guard('web')->check()) {
              $user   = Auth::user();
            }
            elseif (Auth::guard('staff')->check()) {
              $user = Auth::guard('staff')->user();
            }
            if ($user->CID == "") {
              $user->CID = 0;
            }

            $patient = [];
            $patient['Patients']     = DB::table('patient')
                                    // ->leftjoin('dietprescriptions', 'patient.id', '=', 'dietprescriptions.PID')
                                    ->leftjoin('staff', 'patient.staffID', '=', 'staff.id')
                                    ->select('patient.*','staff.FName as staffFname','staff.LName as staffLName'/*,'dietprescriptions.id as prescID'*/)
                                    ->orderBy('patient.id', 'DESC')
                                    ->where('patient.CID', $user->CID)
                                    ->take(6)
                                    ->get();

            $patientPrescriptionRaw = DB::table('dietprescriptions')
                                    ->select('dietprescriptions.id','dietprescriptions.PID')
                                    ->orderBy('dietprescriptions.id', 'DESC')
                                    ->where('CID', $user->CID)
                                    ->take(50)
                                    ->get();
              for ($j = 0; $j < sizeof($patientPrescriptionRaw); $j++)
              {
                $patientRaw                               = DB::table('patient')
                                                            ->leftjoin('staff', 'patient.staffID', '=', 'staff.id')
                                                            ->where('patient.id','=', $patientPrescriptionRaw[$j]->PID)
                                                            ->first(['patient.*','staff.FName as staffFname','staff.LName as staffLName'/*,'dietprescriptions.id as prescID'*/]);

                $HistoryFiles                             = DB::table('patienthistory')
                                                          ->where('patienthistory.dietprescriptionid','=',$patientPrescriptionRaw[$j]->id)
                                                          ->get(['patienthistory.*']);

                                                          // return $HistoryFiles[0]->id;
                if($patientRaw != null && isset($HistoryFiles[0]))
                {
                  $patient['recentDiets'][$j]                        = $patientRaw;
                  $patient['recentDiets'][$j]->pid                   = $patientRaw->id;
                  $patient['recentDiets'][$j]->HistoryFiles          = $HistoryFiles;
                  $patient['recentDiets'][$j]->id                    = $HistoryFiles[0]->dietprescriptionid;
                }
              }

            $patient['PatientCount'] =  DB::table('patient')
                                        ->where('CID', $user->CID)
                                        ->count();

            $patient['PatientCountWeekly'] =  DB::table('patient')
                                              ->whereBetween('created_at', [
                                                                      Carbon::parse('last monday')->startOfDay(),
                                                                      Carbon::parse('next sunday')->endOfDay(),
                                                                      ])
                                              ->where('CID', $user->CID)
                                              ->count();

            $patient['DietPresCount'] =  DB::table('dietprescriptions')
                                        ->where('CID', $user->CID)
                                        ->count();

            $patient['DietPresCountWeekly'] =  DB::table('dietprescriptions')
                                              ->whereBetween('created_at', [
                                                                      Carbon::parse('last monday')->startOfDay(),
                                                                      Carbon::parse('next sunday')->endOfDay(),
                                                                      ])
                                              ->where('CID', $user->CID)
                                              ->count();


            $patient['CatCount'] =  DB::table('categories')
                                    ->where('CID', $user->CID)
                                    ->count();

            $patient['CharCount'] =  DB::table('characteristics')
                                    ->where('CID', $user->CID)
                                    ->count();

            $patient['DietCount'] =  DB::table('diettype')
                                    ->where('CID', $user->CID)
                                    ->count();

            $patient['RecipeCount'] =  DB::table('recipes')
                                      ->where('CID', $user->CID)
                                      ->count();

            $patient['FoodCount'] =  DB::table('fooditems')
                                    ->where('CID', $user->CID)
                                    ->count();

            $patient['PanelCount'] =  DB::table('foodpanel')
                                      ->where('CID', $user->CID)
                                      ->count();

            // return $patientRaw;
            return $patient;

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
        $patient = new Patient;

        $patient->orgID            = $request->input('orgID');
        $patient->staffID          = $request->input('staffID');
        $patient->fname            = $request->input('FName');
        $patient->lname            = $request->input('LName');
        $patient->DOB              = $request->input('DOB');
        $patient->gender           = $request->input('Gender');
        $patient->email            = $request->input('Email');
        $patient->image            = $request->input('Picture');
        $patient->infusionrecordID = $request->input('infusionrecordID');

        $patient->save();



        return $patient->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

              $patient = DB::table('patient')
                  ->join('organizationtypes', 'patient.orgID', '=', 'organizationtypes.id')
                  ->join('staff', 'patient.staffID', '=', 'staff.id')
                  //->join('integration', 'patient.infusionrecordID', '=', 'integration.id')
                  ->select('patient.*','organizationtypes.Name as organizationName','staff.FName as staffFname','staff.LName as staffLName'/*,'integration.Name as infusionrecordName'*/)
                  ->where('patient.id','=',$id)
                  ->get();

              return $patient;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
         $patient = Patient::find($id);

        $patient->fname            = $request->input('fname');
        $patient->lname            = $request->input('lname');
        $patient->DOB              = $request->input('dob');
        $patient->gender           = $request->input('patientgender');
        $patient->email            = $request->input('email');
        $patient->image            = $request->input('Picture');
        $patient->save();
        return "Sucess updating Patient #" . $patient->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $patient = Patient::find($id);

        $patient->delete();

        return "Patient record successfully deleted #" . $id;
    }
}
