<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\DietPrescription;
use App\Models\PHistory;
use App\Models\FoodPanel;
use App\Models\DietType;
use App\Models\FoodItem;
use Illuminate\Http\Request;
// use Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Auth;

class PrescribeDiet extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {

            $user = Auth::guard('staff')->user();
            if ($user->CID == "") {
              $user->CID = 0;
            }

            //Get foodpanels Data
            $prescribe['foodpanels'] = FoodPanel::orderBy('id', 'asc')
                                      // ->where('CID', 0)
                                      ->where('CID', $user->CID)
                                      ->get();

            //Get DietType Data
            $dietRaw = DietType::orderBy('Name', 'asc')
                                // ->where('CID', 0)
                                ->where('CID', $user->CID)
                                ->get();
            $diet = [];

            for ($i=0; $i < sizeof($dietRaw) ; $i++)
            {
                $diet[$i]                         =  $dietRaw[$i];
                $diet[$i]->experimentation_level  =  "No";
                $diet[$i]->selected               =  "false";
                $dietfoodsSTDClass              = [];
                $dietfoodsSTDClass              = DB::table('fooddiettypes')
                                            ->join('fooditems', 'fooddiettypes.FID', '=', 'fooditems.id')
                                            ->where('fooddiettypes.DTID', $dietRaw[$i]->id)
                                            ->orderBy('fooditems.Name', 'asc')
                                            ->get(['fooddiettypes.id','fooddiettypes.DTID','fooddiettypes.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);
                for ($j=0; $j < sizeof($dietfoodsSTDClass); $j++)
                {
                  $dietfoodsSTDClass[$j]->experimentation_level  =  "No";
                  $dietfoodsSTDClass[$j]->AkaItem                =  false;
                }
                $dietfoods              = [];
                for ($j=0; $j < sizeof($dietfoodsSTDClass); $j++)
                {
                  $dietfoods[$j] = $dietfoodsSTDClass[$j];
                }

                //Get Related Akas of Foods To diet Type
                $sizeDietFoodsORG = sizeof($dietfoods);
                $sizeDietFoods    = sizeof($dietfoods);
                $DietFoodAka      = [];
                for ($j=0; $j < $sizeDietFoodsORG; $j++)
                {
                  // print_r($dietfoods[$j]);
                  // echo '<br>';
                  if($dietfoods[$j]->AkaItem == false)
                  {
                    $dietfoods[$j]->FoodAka  = DB::table('foodaka')
                                                ->where('FID', $dietfoods[$j]->FID)
                                                ->get();
                    for ($l=0; $l < sizeof($dietfoods[$j]->FoodAka); $l++)
                    {
                        $dietfoods[$sizeDietFoods]['Comprehensivelist']       =  $dietfoods[$j]->FoodAka[$l]->Comprehensivelist;
                        $dietfoods[$sizeDietFoods]['FID']                     =  'Aka-'.$dietfoods[$j]->FoodAka[$l]->id;
                        $dietfoods[$sizeDietFoods]['parentFID']               =  $dietfoods[$j]->FoodAka[$l]->FID;
                        $dietfoods[$sizeDietFoods]['DTID']                    =  $dietfoods[$j]->DTID;
                        $dietfoods[$sizeDietFoods]['id']                      =  'Aka-'.$dietfoods[$j]->FoodAka[$l]->id;
                        $dietfoods[$sizeDietFoods]['Foodlist']                =  $dietfoods[$j]->Foodlist;
                        $dietfoods[$sizeDietFoods]['ImmuneReaction']          =  $dietfoods[$j]->ImmuneReaction;
                        $dietfoods[$sizeDietFoods]['Name']                    =  $dietfoods[$j]->FoodAka[$l]->Name;
                        $dietfoods[$sizeDietFoods]['experimentation_level']   =  $dietfoods[$j]->experimentation_level;
                        $dietfoods[$sizeDietFoods]['FoodAka']                 =  $dietfoods[$j]->FoodAka;
                        $dietfoods[$sizeDietFoods]['AkaItem']                 =  true;

                        $sizeDietFoods++;
                    }
                  }
                }

                $diet[$i]['FoodItems']  = $dietfoods;

                $diet[$i]['childDiets'] = DB::table('childdiettype')
                                            ->join('diettype as childDiet', 'childdiettype.DTIDC', '=', 'childDiet.id')
                                            ->where('childdiettype.DTIDP', $dietRaw[$i]->id)
                                            ->orderBy('childDiet.Name', 'asc')
                                            ->get(['childdiettype.id','childdiettype.DTIDP','childdiettype.DTIDC','childDiet.Name','childDiet.created_by']);

               $diet[$i]['parentDiets'] = DB::table('childdiettype')
                                           ->join('diettype as parentDiet', 'childdiettype.DTIDP', '=', 'parentDiet.id')
                                           ->where('childdiettype.DTIDC', $dietRaw[$i]->id)
                                           ->orderBy('parentDiet.Name', 'asc')
                                           ->get(['childdiettype.id','childdiettype.DTIDP','childdiettype.DTIDC','parentDiet.Name','parentDiet.created_by']);

            }
            $prescribe['dietType'] = $diet;

            //Get Alphabetical Foodlist Data
            $foodListRaw = FoodItem::orderBy('Name', 'asc')
                                      // ->where('CID', 0)
                                      ->where('CID', $user->CID)
                                      ->get();

            $foodingredient = [];
            for ($i=0; $i < sizeof($foodListRaw); $i++)
            {
              $foodingredient[$i]                = $foodListRaw[$i];
              $foodingredient[$i]['Ingredients'] = DB::table('foodingredients')
                                                ->join('fooditems', 'foodingredients.IID', '=', 'fooditems.id')
                                                ->select('foodingredients.*', 'fooditems.Name as foodingredientName')
                                                ->where('foodingredients.FID','=',$foodListRaw[$i]->id)
                                                ->orderBy('fooditems.Name', 'asc')
                                                ->get();
              $foodingredient[$i]['FoodAka']  = DB::table('foodaka')
                                              ->where('FID', $foodListRaw[$i]->id)
                                              ->get();

              $foodingredient[$i]['AkaItem']     = false;
            }

            //Add Foodakas To Foodlist
            $FoodAka = [];
            $size = sizeof($foodingredient);
            for ($i=0; $i < sizeof($foodingredient); $i++)
            {
              if($foodingredient[$i]['AkaItem'] == false)
              {
                $FoodAka       = DB::table('foodaka')
                                 ->where('FID', $foodingredient[$i]->id)
                                 ->get();
                for ($j=0; $j < sizeof($FoodAka); $j++)
                {
                  // $AkaItem      = [];
                  $foodingredient[$size]['CID']                 = $foodingredient[$i]->CID;
                  // $foodingredient[$size]['Categories']          = $foodingredient[$i]->Categories;
                  // $foodingredient[$size]['Characteristics']     = $foodingredient[$i]->Characteristics;
                  // $foodingredient[$size]['DietTypes']           = $foodingredient[$i]->DietTypes;
                  // $foodingredient[$size]['FoodAka']             = $foodingredient[$i]->FoodAka;
                  $foodingredient[$size]['Foodlist']            = $foodingredient[$i]->Foodlist;
                  $foodingredient[$size]['ImmuneReaction']      = $foodingredient[$i]->ImmuneReaction;
                  $foodingredient[$size]['Ingredients']         = $foodingredient[$i]->Ingredients;
                  $foodingredient[$size]['Order']               = $foodingredient[$i]->Order;
                  $foodingredient[$size]['Url']                 = $foodingredient[$i]->Url;
                  $foodingredient[$size]['FoodAka']             = $foodingredient[$i]->FoodAka;

                  $foodingredient[$size]['id']                  = 'Aka-'.$FoodAka[$j]->id;
                  $foodingredient[$size]['Comprehensivelist']   = $FoodAka[$j]->Comprehensivelist;
                  $foodingredient[$size]['FID']                 = $FoodAka[$j]->FID;
                  $foodingredient[$size]['Name']                = $FoodAka[$j]->Name;
                  $foodingredient[$size]['AkaID']               = $FoodAka[$j]->id;
                  $foodingredient[$size]['AkaItem']             = true;

                  $size++;
                }
              }
            }

            // natcasesort($foodingredient);
            $name = array();
            foreach ($foodingredient as $key => $row)
            {
                $name[$key] = $row['Name'];
                // return $name;
            }
            array_multisort($name, SORT_ASC|SORT_NATURAL|SORT_FLAG_CASE, $foodingredient);


            $prescribe['Foodlist'] = $foodingredient;

            return $prescribe;
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
        $patient->lname            = $request->input('LName');
        $patient->CID              = $user->CID;
        $patient->DOB              = $request->input('DOB');
        $patient->gender           = $request->input('Gender');
        $patient->email            = $request->input('Email');
        $patient->image            = $request->input('Picture');
        $patient->infusionrecordID = $request->input('infusionrecordID');

        $patient->save();
        return $patient;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

      $dietFoodItems = DB::table('fooddiettypes')
                                  ->join('fooditems', 'fooddiettypes.FID', '=', 'fooditems.id')
                                  ->where('fooddiettypes.DTID', $id)
                                  ->get(['fooddiettypes.id','fooddiettypes.DTID','fooddiettypes.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);

      return $dietFoodItems;
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

        $patient->orgID            = $request->input('orgID');
        $patient->staffID          = $request->input('staffID');
        $patient->fname            = $request->input('fname');
        $patient->lname            = $request->input('lname');
        $patient->DOB              = $request->input('DOB');
        $patient->gender           = $request->input('gender');
        $patient->email            = $request->input('email');
        $patient->image            = $request->input('image');
        $patient->infusionrecordID = $request->input('infusionrecordID');

        $patient->save();

        return "Sucess updating Patient #" . $patient->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function getPrescription($presID) {
        $dietprescription = DietPrescription::find($presID);


        return $dietprescription;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function storePrescription(Request $request, $pid) {
      $prescription = new DietPrescription;
      $user = Auth::guard('staff')->user();
      if ($user->CID == "") {
        $user->CID = 0;
      }

      $prescription->PID            = $pid;
      $prescription->CID            = $user->CID;

      $prescription->jsonobject     = $request->getContent();

      $prescription->save();
      return $prescription->id;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function updatePrescription(Request $request, $pid,$prescID) {
        $prescription = DietPrescription::find($prescID);

        $prescription->jsonobject     = $request->getContent();
        $patienthistory = DB::table('patienthistory')->where('dietprescriptionid', $prescID)->delete();
        // $patient->staffID          = $request->input('staffID');
        // $patient->fname            = $request->input('fname');
        // $patient->lname            = $request->input('lname');
        // $patient->DOB              = $request->input('DOB');
        // $patient->gender           = $request->input('gender');
        // $patient->email            = $request->input('email');
        // $patient->image            = $request->input('image');
        // $patient->infusionrecordID = $request->input('infusionrecordID');

        $prescription->save();

        return $prescription->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
      //Remove Relating history
      $patienthistory = DB::table('patienthistory')->where('dietprescriptionid', $id)->delete();

      $dietprescription = DietPrescription::find($id);
      $dietprescription->delete();

      return "Diet Prescription record successfully deleted #" . $id;
    }


    public function getpatient(){
        $PatientObj = new Patient;
        $user    = Auth::guard('staff')->user();
        if ($user->CID == "") {
          $user->CID = 0;
        }

        if (isset($_GET['term']) || isset($_GET['_type'])) {
            $term = $_GET['term'];
            $term = urldecode ($term);

            // Check if Tony Ganem is the user
            if ($user->CID == 0)
            {
              //set POST variables
              $PostData   = array();
              $PostData[] = "APIKey=1a02b5410033a5618d31c2b19c3902e0";
              $PostData[] = "q=".$term;
              $PostData[] = "ReturnFields=FirstName,LastName,infId,Email,Birthday,Password";
              $ch         = curl_init();
              $url        = 'https://admin.bodypro.com/prescribedietsAPI/PatientQuery.php';
              curl_setopt($ch, CURLOPT_URL,$url);
              curl_setopt($ch, CURLOPT_POST, true);
              curl_setopt($ch, CURLOPT_POSTFIELDS,implode('&' ,$PostData));
              curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
              $output = curl_exec($ch);
              $result = json_decode($output, false);

              // echo $result[0]->infId;
              curl_close ($ch);

              // print_r($result);
              for ($i = 0; $i < sizeof($result); $i++)
              {
                $patient = DB::table('patient')
                          ->where('infusionrecordID', $result[$i]->infId)
                          ->first();
                if ($patient === null)
                {
                   // $PatientObj->orgID            = $request->input('orgID');
                   $PatientObj->staffID          = $user->id;
                   $PatientObj->CID              = $user->CID;
                   $PatientObj->fname            = $result[$i]->FirstName;
                   $PatientObj->lname            = $result[$i]->LastName;
                   $PatientObj->DOB              = $result[$i]->Birthday;
                   $PatientObj->gender           = NULL;
                   $PatientObj->email            = $result[$i]->Email;
                   $PatientObj->image            = 'avatar.png';
                   $PatientObj->infusionrecordID = $result[$i]->infId;

                   $PatientObj->save();
                }
              }
            }

            $patient = DB::table('patient')
                                          ->where  (DB::raw('CONCAT_WS(" ", fname, lname)'), 'like', '%'.$term.'%')
                                          ->orwhere('email', 'like', '%'.$term.'%')
                                          ->where('CID', $user->CID)
                                          ->get();
                                        // ->where('fname', 'like', $term.'%')
                                        // ->orwhere('email', 'like', $term.'%')
                                        // ->where('CID', $user->CID)
                                        // ->get();
            return $patient;
        }
        if (isset($_GET['q']) ||isset($_GET['_type'])) {
            $term = $_GET['q'];
            $term = urldecode ($term);

            // Check if Tony Ganem is the user
            if ($user->CID == 0)
            {
              //set POST variables
              $PostData   = array();
              $PostData[] = "APIKey=1a02b5410033a5618d31c2b19c3902e0";
              $PostData[] = "q=".$term;
              $PostData[] = "ReturnFields=FirstName,LastName,infId,Email,Birthday,Password";
              $ch         = curl_init();
              $url        = 'https://admin.bodypro.com/prescribedietsAPI/PatientQuery.php';
              curl_setopt($ch, CURLOPT_URL,$url);
              curl_setopt($ch, CURLOPT_POST, true);
              curl_setopt($ch, CURLOPT_POSTFIELDS,implode('&' ,$PostData));
              curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
              $output = curl_exec($ch);
              $result = json_decode($output, false);

              // echo $result[0]->infId;
              curl_close ($ch);
              // print_r($result[2]);
              for ($i = 0; $i < sizeof($result); $i++)
              {
                $patient = DB::table('patient')
                          ->where('infusionrecordID', $result[$i]->infId)
                          ->first();
                if ($patient === null)
                {
                   // $PatientObj->orgID            = $request->input('orgID');
                   $PatientObj->staffID          = $user->id;
                   $PatientObj->CID              = $user->CID;
                   $PatientObj->fname            = $result[$i]->FirstName;
                   $PatientObj->lname            = $result[$i]->LastName;
                   $PatientObj->DOB              = $result[$i]->Birthday;
                   $PatientObj->gender           = NULL;
                   $PatientObj->email            = $result[$i]->Email;
                   $PatientObj->image            = 'avatar.png';
                   $PatientObj->infusionrecordID = $result[$i]->infId;

                   $PatientObj->save();
                }
              }
            }

            $patient = DB::table('patient')
                      ->where  (DB::raw('CONCAT_WS(" ", fname, lname)'), 'like', '%'.$term.'%')
                      ->orwhere('email', 'like', '%'.$term.'%')
                      ->where('CID', $user->CID)
                      ->get();
                                        // ->where('fname', 'like', $term.'%')
                                        // ->orwhere('email', 'like', $term.'%')
                                        // ->where('CID', $user->CID)
                                        // ->get();
            return $patient;
        }
        else
          return "errror";
    }

    public function checkAPI() {
      $patient = new Patient;
      $user    = Auth::guard('staff')->user();
      // Check if Tony Ganem is the user
      if ($user->CID == 0)
      {
        $PostData=array();
        $PostData[]="APIKey=1a02b5410033a5618d31c2b19c3902e0";
        $PostData[]="q=testuser12345@automatehost.com";
        $PostData[]="ReturnFields=FirstName,LastName,infId,Email,Birthday";

        $ch = curl_init();
        $url = "https://admin.bodypro.com/prescribedietsAPI/PatientQuery.php";
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS,implode('&' ,$PostData));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        echo $output = curl_exec ($ch);
        curl_close ($ch);
        return $PostData;
        // echo '<br>';
        // $protocol = strtolower(substr($_SERVER["SERVER_PROTOCOL"],0,5))=='https'?'https':'http';
        // echo $protocol."://".$_SERVER['SERVER_NAME']."/assets/images/patients/16184/1510914248890.jpeg";


        // print_r($result);
        // for ($i = 0; $i < sizeof($result); $i++)
        // {
        //   $patient = DB::table('patient')
        //             ->where('infusionrecordID', $result[$i]->infId)
        //             ->first();
        //   if ($patient === null)
        //   {
        //      // $patient->orgID            = $request->input('orgID');
        //      $patient->staffID          = $user->id;
        //      $patient->CID              = $user->CID;
        //      $patient->fname            = $result[$i]->FirstName;
        //      $patient->lname            = $result[$i]->LastName;
        //      $patient->DOB              = $result[$i]->Birthday;
        //      $patient->gender           = NULL;
        //      $patient->email            = $result[$i]->Email;
        //      $patient->image            = 'avatar.png';
        //      $patient->infusionrecordID = $result[$i]->infId;
        //
        //      $patient->save();
        //   }
        // }
      }

      // $user = Auth::guard('staff')->user();
      // echo $user->id;

      // $fields = array(
      // 	'lname' => urlencode($_POST['last_name']),
      // 	'fname' => urlencode($_POST['first_name']),
      // 	'title' => urlencode($_POST['title']),
      // 	'company' => urlencode($_POST['institution']),
      // 	'age' => urlencode($_POST['age']),
      // 	'email' => urlencode($_POST['email']),
      // 	'phone' => urlencode($_POST['phone'])
      // );
      //
      // //url-ify the data for the POST
      // foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
      // rtrim($fields_string, '&');
      //
      // //open connection
      // $ch = curl_init();
      //
      // //set the url, number of POST vars, POST data
      // curl_setopt($ch,CURLOPT_URL, $url);
      // curl_setopt($ch,CURLOPT_POST, count($fields));
      // curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
      //
      // //execute post
      // $result = curl_exec($ch);
      //
      // //close connection
      // curl_close($ch);
    }

}
