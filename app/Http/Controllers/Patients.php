<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\PatientHistory;
use App\Staff;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Auth;

class Patients extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        		$patient = DB::table('patient')
                  ->join('organizationtypes', 'patient.orgID', '=', 'organizationtypes.id')
                  ->join('staff', 'patient.staffID', '=', 'staff.id')
                  //->join('integration', 'patient.infusionrecordID', '=', 'integration.id')
                  ->select('patient.*','organizationtypes.Name as organizationName','staff.FName as staffFname','staff.LName as staffLName'/*,'integration.Name as infusionrecordName'*/)
                  ->get();

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
        $user = Auth::guard('staff')->user();
        if ($user->CID == "") {
          $user->CID = 0;
        }

        $patient->orgID            = $request->input('orgID');
        $patient->staffID          = $request->input('staffID');
        $patient->fname            = $request->input('FName');
        $patient->CID              = $user->CID;
        $patient->lname            = $request->input('LName');
        $patient->DOB              = $request->input('DOB');
        $patient->gender           = $request->input('Gender');
        $patient->email            = $request->input('Email');
        $patient->image            = $request->input('Picture');
        $patient->infusionrecordID = $request->input('infusionrecordID');

        $patient->save();
        return $this->show($patient->id);
        // return $patient->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

              $patient = DB::table('patient')
                  ->leftjoin('organizationtypes', 'patient.orgID', '=', 'organizationtypes.id')
                  ->leftjoin('staff', 'patient.staffID', '=', 'staff.id')
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
         $user    = Auth::guard('staff')->user();

        $patient->staffID          = $request->input('staffID');
        $patient->fname            = $request->input('fname');
        $patient->lname            = $request->input('lname');
        $patient->DOB              = $request->input('DOB');
        $patient->gender           = $request->input('gender');
        $patient->email            = $request->input('email');
        $patient->image            = $request->input('image');
        $patient->infusionrecordID = $request->input('infusionrecordID');
        $patient->save();

        // Check if Tony Ganem is the user
        if ($user->CID == 0 && $patient->infusionrecordID > 50)
        {
          //Set base Url
          $protocol = strtolower(substr($_SERVER["SERVER_PROTOCOL"],0,5))=='https'?'https':'http';
          $img_Path = $protocol."://".$_SERVER['SERVER_NAME']."/assets/images/patients/".$patient->id.'/'.$patient->image;

          // $img_Path = 'http://prescribediet.socialjarvis.com/assets/images/patients/'.$patient->id.'/'.$patient->image;
          // $img_Path = 'http://prescribediet.socialjarvis.com/assets/images/patients/16184/1510914248890.jpeg';
          //set POST variables
          $PostData   =  array();
          $PostData[] = "APIKey=1a02b5410033a5618d31c2b19c3902e0";
          $PostData[] = "UserImage=".$img_Path;
          $PostData[] = "infId=".$patient->infusionrecordID;
          $PostData[] = "ContactFields=".json_encode(array('FirstName'=> $patient->fname,'LastName'=> $patient->lname, 'Birthday' => $patient->DOB));
          $ch         =  curl_init();
          $url        = "https://admin.bodypro.com/prescribedietsAPI/PatientUpdate.php";
          curl_setopt($ch, CURLOPT_URL,$url);
          curl_setopt($ch, CURLOPT_POST, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS,implode('&' ,$PostData));
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          echo $output = curl_exec($ch);
          echo '<br>';
          // echo $img_Path;
          curl_close ($ch);
        }
        // return $PostData;
        return $patient;
    }
    ///****file store***///
    public function filestore(Request $request) {
      //Get User
      $user                      = Auth::guard('staff')->user();

      //Set base Url
      $protocol = strtolower(substr($_SERVER["SERVER_PROTOCOL"],0,5))=='https'?'https':'http';
      $baseURL  = $protocol."://".$_SERVER['SERVER_NAME']."/assets/images/patients";

      //Get Post variables for files
      $ShoppingListData          = $request->input('ShoppingListData');
      $ComprehensiveListData     = $request->input('ComprehensiveListData');
      $RecipeListData            = $request->input('RecipeListData');
      $infusionrecordID          = $request->input('infusionrecordID');
      $comment                   = $request->input('comment');

        /////////////////////////
        // Store Shopping list //
        /////////////////////////
        $pid                           = $ShoppingListData['pid'];
        $prescriptionID                = $ShoppingListData['prescriptionID'];
        $prescriptionDate              = $ShoppingListData['prescriptionDate'];
        $comments                      = $ShoppingListData['comments'];
        $Status                        = $ShoppingListData['Status'];
        $name                          = $ShoppingListData['filename'];
        $filetype                      = $ShoppingListData['filetype'];

        $dpid =  DB::table('patienthistory')
          ->insertGetId(['dietprescriptionid' => $prescriptionID, 'patientID'=>$pid, 'prescriptionDate'=>$prescriptionDate, 'comments'=>$comments, 'Status'=>$Status, 'filename'=>$name,'filetype'=>$filetype]);

        // Get path to public folder
        $path = public_path();
        $myNewFolderPath = $path.'/assets/images/patients/'.$pid;

        //Make directory if it doesnt exists
        if(!file_exists($myNewFolderPath)) {
          mkdir($myNewFolderPath,0777, true);
        }

        $pdf                = base64_decode($ShoppingListData['pdf']);
        $Shopping_filename  = $ShoppingListData['filename2']; // name the file
        $Shopping_URL       = $baseURL."/".$pid."/".$Shopping_filename.".pdf";
        $file               = fopen($myNewFolderPath."/".$Shopping_filename.".pdf", "w"); // open the file path
        fwrite($file, $pdf); //save data
        fclose($file);

        ///////////////////////////////
        // Store Comprehensive list //
        /////////////////////////////
        $pid                           = $ComprehensiveListData['pid'];
        $prescriptionID                = $ComprehensiveListData['prescriptionID'];
        $prescriptionDate              = $ComprehensiveListData['prescriptionDate'];
        $comments                      = $ComprehensiveListData['comments'];
        $Status                        = $ComprehensiveListData['Status'];
        $name                          = $ComprehensiveListData['filename'];
        $filetype                      = $ComprehensiveListData['filetype'];

        $dpid =  DB::table('patienthistory')
          ->insertGetId(['dietprescriptionid' => $prescriptionID, 'patientID'=>$pid, 'prescriptionDate'=>$prescriptionDate, 'comments'=>$comments, 'Status'=>$Status, 'filename'=>$name,'filetype'=>$filetype]);

        // Get path to public folder
        $path = public_path();
        $myNewFolderPath = $path.'/assets/images/patients/'.$pid;

        //Make directory if it doesnt exists
        if(!file_exists($myNewFolderPath)) {
          mkdir($myNewFolderPath,0777, true);
        }

        $pdf            = base64_decode($ComprehensiveListData['pdf']);
        $Comp_filename  = $ComprehensiveListData['filename2']; // name the file
        $Comp_URL       = $baseURL."/".$pid."/".$Comp_filename.".pdf";
        $file           = fopen($myNewFolderPath."/".$Comp_filename.".pdf", "w"); // open the file path
        fwrite($file, $pdf); //save data
        fclose($file);


        ///////////////////////////////
        // Store Recipe list /////////
        /////////////////////////////
        $pid                           = $RecipeListData['pid'];
        $prescriptionID                = $RecipeListData['prescriptionID'];
        $prescriptionDate              = $RecipeListData['prescriptionDate'];
        $comments                      = $RecipeListData['comments'];
        $Status                        = $RecipeListData['Status'];
        $name                          = $RecipeListData['filename'];
        $filetype                      = $RecipeListData['filetype'];

        $dpid =  DB::table('patienthistory')
          ->insertGetId(['dietprescriptionid' => $prescriptionID, 'patientID'=>$pid, 'prescriptionDate'=>$prescriptionDate, 'comments'=>$comments, 'Status'=>$Status, 'filename'=>$name,'filetype'=>$filetype]);

        // Get path to public folder
        $path = public_path();
        $myNewFolderPath = $path.'/assets/images/patients/'.$pid;

        //Make directory if it doesnt exists
        if(!file_exists($myNewFolderPath)) {
          mkdir($myNewFolderPath,0777, true);
        }

        $pdf           = base64_decode($RecipeListData['pdf']);
        $Rec_filename  = $RecipeListData['filename2']; // name the file
        $Rec_URL       = $baseURL."/".$pid."/".$Rec_filename.".pdf";
        $file          = fopen($myNewFolderPath."/".$Rec_filename.".pdf", "w"); // open the file path
        fwrite($file, $pdf); //save data
        fclose($file);

        $Legend_URL       = $baseURL."/legend.pdf";
        if ($user->CID == 0 && $infusionrecordID > 50)
        {
          //set POST variables
          $PostData   =  array();
          $PostData[] = "APIKey=1a02b5410033a5618d31c2b19c3902e0";
          $PostData[] = "infId=".$infusionrecordID;
          $PostData[] = "FilesURLS=".json_encode(array('ComprehensiveList'=>$Comp_URL,'ShoppingList'=>$Shopping_URL,'RecipieList'=>$Rec_URL,'Legend'=>$Legend_URL));

          $ch         =  curl_init();
          $url        = "https://admin.bodypro.com/prescribedietsAPI/PatientAddPrescription.php";
          curl_setopt($ch, CURLOPT_URL,$url);
          curl_setopt($ch, CURLOPT_POST, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS,implode('&' ,$PostData));
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          echo $output_Files = curl_exec($ch);
          curl_close ($ch);

          $PostData_Com   = array();
          $PostData_Com[] = "APIKey=1a02b5410033a5618d31c2b19c3902e0";
          $PostData_Com[] = "infId=".$infusionrecordID;
          $PostData_Com[] = "Status=1"; // 0(Private) OR 1 (Public)
          $PostData_Com[] = "Comments=".$comment;

          $ch  = curl_init();
          $url = "https://admin.bodypro.com/prescribedietsAPI/PatientAddComment.php";
          curl_setopt($ch, CURLOPT_URL,$url);
          curl_setopt($ch, CURLOPT_POST, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS,implode('&' ,$PostData_Com));
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          echo $output_Comment = curl_exec ($ch);
          curl_close ($ch);
        }
        return $Shopping_filename.": ".$Shopping_URL."  <br>".$Comp_filename.": ".$Comp_URL."  <br>".$Rec_filename.": ".$Rec_URL."  <br> legend: ".$Legend_URL;
    }

    //***get patient files***///
    public function files($id) {

        $patient['ComprehensiveList']        =  DB::table('patienthistory')
                                            ->select('patienthistory.filename')
                                            ->where('patienthistory.pid','=',$id)
                                            ->where('patienthistory.filetype', '=', "ComprehensiveList")
                                            ->latest('id')->first();

        $patient['ShoppingList']        =  DB::table('patienthistory')
                                            ->select('patienthistory.filename')
                                            ->where('patienthistory.pid','=',$id)
                                            ->where('patienthistory.filetype', '=', "ShoppingList")
                                            ->latest('id')->first();

              return $patient;
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
    */
    public static function deleteDir($dirPath) {
        if (! is_dir($dirPath)) {
            throw new InvalidArgumentException("$dirPath must be a directory");
        }
        if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
            $dirPath .= '/';
        }
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                self::deleteDir($file);
            } else {
                unlink($file);
            }
        }
        rmdir($dirPath);
    }
    public function destroy(Request $request, $id) {
        $patient = Patient::find($id);
        $patientFolder = public_path('assets/images/patients/'.$id);
        $staff = Staff::find($request->input('id'));
        if (Hash::check($request->input('Pass'), $staff->password))
        {
          $this->deleteDir($patientFolder);
          // deleteDir($patientFolder);
          // unlink(public_path('assets/images/patients/'.$id));
          //Remove Relating history
          $patienthistory = DB::table('patienthistory')->where('patientID', $id)->delete();
          //Remove Relating Prescription
          $patienthistory = DB::table('dietprescriptions')->where('PID', $id)->delete();

          //Remove Patient
          $patient->delete();

          return "true";
        }
        else {
          return "Invalid Pass" . $id;
        }

    }
}
