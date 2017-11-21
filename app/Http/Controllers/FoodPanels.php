<?php

namespace App\Http\Controllers;

use App\Models\FoodPanel;
use App\Models\FoodPanelCat;
use App\Models\FoodPanelFoodItem;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Auth;

class FoodPanels extends Controller
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


            $foodPanelsRaw = FoodPanel::orderBy('id', 'asc')
            // ->where('CID', 0)
            ->where('CID', $user->CID)
            ->get();

            if ($user->CID == "") {
              $user->CID = 0;
            }

            $foodPanels = array();
            for ($i = 0; $i < sizeof($foodPanelsRaw); $i++)
            {
              if($foodPanelsRaw[$i]->Type == "Non-Categorized")
              {
                $foodPanels[$i]             =  $foodPanelsRaw[$i];

              }
              elseif ($foodPanelsRaw[$i]->Type == "Categorized")
              {
                $foodPanels[$i]         =  $foodPanelsRaw[$i];
              }

            }
            return $foodPanels;

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
    	//objects creation
        $foodPanelsRaw 			= new FoodPanel;

        if (Auth::guard('web')->check()) {
          $user   = Auth::user();
        }
        elseif (Auth::guard('staff')->check()) {
          $user = Auth::guard('staff')->user();
        }

        if ($user->CID == "") {
          $user->CID = 0;
        }

        //record insertion

        $foodPanelsRaw->Name            = $request->input('Name');
        $foodPanelsRaw->CID             = $user->CID;
        // $foodPanelsRaw->CID               =0;
        $foodPanelsRaw->Type            = $request->input('Type');
        $foodPanelsRaw->ReactionType    = $request->input('ReactionType');
        $foodPanelsRaw->save();

        //For Non-Categorized Type
        if ($foodPanelsRaw->Type == 'Non-Categorized')
        {
          //Adding FoodItems
          $delete = DB::table('foodpanelfooditems')->where('PID', $foodPanelsRaw->id)->delete();
          $FoodItems = $request->input('FoodItems');
          if($FoodItems != null)
          {
            for ($i=0; $i < sizeof($FoodItems) ; $i++)
            {
              DB::insert('insert into foodpanelfooditems (`PID`, `FID`, `Name` , `Order`) values (?, ?, ?, ?)', [$foodPanelsRaw->id, $FoodItems[$i]['FID'], $FoodItems[$i]['Name'], $FoodItems[$i]['FOrder']]);
            }
          }
        }
        elseif ($foodPanelsRaw->Type == 'Categorized')
        {
          //Adding FoodItems
          $delete = DB::table('foodpanelcategory')->where('PID', $foodPanelsRaw->id)->delete();
          $delete = DB::table('foodpanelfooditems')->where('PID', $foodPanelsRaw->id)->delete();
          $Catagories = $request->input('categories');
          if($Catagories != null)
          {
            for ($i=0; $i < sizeof($Catagories) ; $i++)
            {
              $CatIDRaw = DB::table('foodpanelcategory')->insertGetId(
                ['PID' => $foodPanelsRaw->id, 'Name' => $Catagories[$i]['cat_Name'], 'Color' => $Catagories[$i]['cat_Color'], 'Order' => $Catagories[$i]['CatOrder']]
              );
              if($Catagories[$i]['FoodItems'] != null && sizeof($Catagories[$i]['FoodItems']) > 0)
              {
                $FoodItems = $Catagories[$i]['FoodItems'];
                for ($j=0; $j < sizeof($FoodItems) ; $j++)
                {
                  $FID      = $FoodItems[$j]['FoodItemID'];
                  $FoodName = $FoodItems[$j]['FoodName'];
                  // $CatIDRaw    = $Catagories[$i]['category'];
                  DB::insert('insert into foodpanelfooditems (PID, CatID, FID, Name ) values (?, ?, ?, ?)', [$foodPanelsRaw->id, $CatIDRaw, $FID, $FoodName]);
                }
              }
            }
          }
        }
        return $this->show($foodPanelsRaw->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

      $foodPanelsRaw = FoodPanel::find($id);
      //record insertion
      if($foodPanelsRaw->Type == "Non-Categorized")
      {
        $foodPanel             =  $foodPanelsRaw;

        $foodpanelfooditemsRAW = DB::table('foodpanelfooditems')
                                ->where('foodpanelfooditems.PID', $foodPanelsRaw->id)
                                ->orderBy('foodpanelfooditems.Order', 'asc')
                                ->get();
        $foodPanelItmesRAW = [];
        for ($i=0; $i < sizeof($foodpanelfooditemsRAW); $i++)
        {
           if(is_numeric( $foodpanelfooditemsRAW[$i]->FID ))
           {
             $foodPanelItmesRAW[$i]  = DB::table('foodpanelfooditems')
                                            ->leftjoin('fooditems', 'foodpanelfooditems.FID', '=', 'fooditems.id')
                                           //  ->leftjoin('foodaka', 'foodpanelfooditems.FID', '=', 'foodaka.id')
                                            ->select('foodpanelfooditems.id','foodpanelfooditems.PID','foodpanelfooditems.CatID','foodpanelfooditems.FID','foodpanelfooditems.Order','foodpanelfooditems.Name','fooditems.Name as associatedFood')
                                            // ->where('foodpanelfooditems.PID', $foodPanelsRaw->id)
                                            ->where('foodpanelfooditems.FID', $foodpanelfooditemsRAW[$i]->FID)
                                            ->orderBy('foodpanelfooditems.Order', 'asc')
                                            ->first();
           }
           else
           {
            //  $intID = preg_split('#(?<=\d)(?=[a-z])#i', $foodpanelfooditemsRAW[$i]->FID);
            //  $intID = filter_var($foodpanelfooditemsRAW[$i]->FID, FILTER_SANITIZE_NUMBER_INT);
             preg_match_all('!\d+!', $foodpanelfooditemsRAW[$i]->FID, $intID);
             $foodPanelItmesRAW[$i]  = DB::table('foodpanelfooditems')
                                            // ->leftjoin('fooditems', 'foodpanelfooditems.FID', '=', 'fooditems.id')
                                            // ->join('foodaka', 'foodpanelfooditems.FID', '=', 'foodaka.id')
                                            ->select('foodpanelfooditems.id','foodpanelfooditems.PID','foodpanelfooditems.CatID','foodpanelfooditems.FID','foodpanelfooditems.Order','foodpanelfooditems.Name')
                                            // ->where('foodpanelfooditems.PID', $foodPanelsRaw->id)
                                            ->where('foodpanelfooditems.FID', $foodpanelfooditemsRAW[$i]->FID)
                                            // ->where('foodaka.id', $intID[0])
                                            ->orderBy('foodpanelfooditems.Order', 'asc')
                                            ->first();

            $associatedFood           = DB::table('foodaka')
                                           // ->leftjoin('fooditems', 'foodpanelfooditems.FID', '=', 'fooditems.id')
                                          //  ->join('foodaka', 'foodpanelfooditems.FID', '=', 'foodaka.id')
                                           ->select('foodaka.Name as associatedFood')
                                           // ->where('foodpanelfooditems.PID', $foodPanelsRaw->id)
                                          //  ->where('foodpanelfooditems.FID', $foodpanelfooditemsRAW[$i]->FID)
                                           ->where('foodaka.id', $intID[0][0])
                                          //  ->orderBy('foodpanelfooditems.Order', 'asc')
                                           ->first();
            $foodPanelItmesRAW[$i]->associatedFood = $associatedFood->associatedFood;
            // return $associatedFood->associatedFood;
           }
        }

        $foodPanel['fooditems'] = $foodPanelItmesRAW;


      }
      elseif ($foodPanelsRaw->Type == "Categorized")
      {
        $foodPanel       =  $foodPanelsRaw;

        $foodPanelsCatRaw = DB::table('foodpanelcategory')
                            ->where('foodpanelcategory.PID', $id)
                            ->orderBy('foodpanelcategory.Order', 'asc')
                            ->get();

        $foodPanelsCats = [];
        for ($j = 0; $j < sizeof($foodPanelsCatRaw); $j++)
        {
          $foodPanelsCats[$j]  =  $foodPanelsCatRaw[$j];

          // $foodPanelsCats[$j]->fooditems  = DB::table('foodpanelfooditems')
          //                                   ->join('fooditems', 'foodpanelfooditems.FID', '=', 'fooditems.id')
          //                                   ->where('foodpanelfooditems.PID', $foodPanelsRaw->id)
          //                                   ->where('foodpanelfooditems.CatID', $foodPanelsCatRaw[$j]->id)
          //                                   ->get(['foodpanelfooditems.id','foodpanelfooditems.PID','foodpanelfooditems.CatID','foodpanelfooditems.FID','foodpanelfooditems.Name','fooditems.Name as associatedFood']);
          $foodpanelfooditemsRAW = DB::table('foodpanelfooditems')
                                  ->where('foodpanelfooditems.PID', $foodPanelsRaw->id)
                                  ->where('foodpanelfooditems.CatID', $foodPanelsCatRaw[$j]->id)
                                  ->get(['foodpanelfooditems.id','foodpanelfooditems.PID','foodpanelfooditems.CatID','foodpanelfooditems.FID','foodpanelfooditems.Name']);
          // return sizeof($foodpanelfooditemsRAW);
          for ($k=0; $k < sizeof($foodpanelfooditemsRAW); $k++)
          {
            if(is_numeric( $foodpanelfooditemsRAW[$k]->FID ))
            {
              $associatedFood           = DB::table('fooditems')
                                             ->select('fooditems.Name as associatedFood')
                                             ->where('id', $foodpanelfooditemsRAW[$k]->FID)
                                             ->first();
              $foodpanelfooditemsRAW[$k]->associatedFood = $associatedFood->associatedFood;
            }
            else if($foodpanelfooditemsRAW[$k]->FID != 'undefined')
            {
              preg_match_all('!\d+!', $foodpanelfooditemsRAW[$k]->FID, $intID);
              $associatedFood           = DB::table('foodaka')
                                             ->select('foodaka.Name as associatedFood')
                                             ->where('foodaka.id', $intID[0][0])
                                             ->first();

              $foodpanelfooditemsRAW[$k]->associatedFood = $associatedFood->associatedFood;
            }
          }
          $foodPanelsCats[$j]->fooditems = $foodpanelfooditemsRAW;
          $foodPanel['categories']       = $foodPanelsCats;
        }
      }
      return $foodPanel;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $foodPanelsRaw = FoodPanel::find($id);
        //record insertion

        $foodPanelsRaw->Name            = $request->input('Name');
        $foodPanelsRaw->Type            = $request->input('Type');
        $foodPanelsRaw->ReactionType    = $request->input('ReactionType');
        $foodPanelsRaw->save();

        //For Non-Categorized Type
        if ($foodPanelsRaw->Type == 'Non-Categorized')
        {
          //Adding FoodItems
          $delete = DB::table('foodpanelfooditems')->where('PID', $foodPanelsRaw->id)->delete();
          $FoodItems = $request->input('FoodItems');
          if($FoodItems != null)
          {
            for ($i=0; $i < sizeof($FoodItems) ; $i++)
            {
              DB::insert('insert into foodpanelfooditems (`PID`, `FID`, `Name` , `Order`) values (?, ?, ?, ?)', [$foodPanelsRaw->id, $FoodItems[$i]['FID'], $FoodItems[$i]['Name'], $FoodItems[$i]['FOrder']]);
              // DB::insert('insert into foodpanelfooditems (`PID`, `FID`, `Order`) values (?, ?, ?)', [$foodPanelsRaw->id, $FoodItems[$i]['FID'], $FoodItems[$i]['FOrder']]);
            }
          }
        }
        elseif ($foodPanelsRaw->Type == 'Categorized')
        {
          //Adding FoodItems
          $delete = DB::table('foodpanelcategory')->where('PID', $foodPanelsRaw->id)->delete();
          $delete = DB::table('foodpanelfooditems')->where('PID', $foodPanelsRaw->id)->delete();
          $Catagories = $request->input('categories');
          if($Catagories != null)
          {
            for ($i=0; $i < sizeof($Catagories) ; $i++)
            {
              $CatIDRaw = DB::table('foodpanelcategory')->insertGetId(
                ['PID' => $foodPanelsRaw->id, 'Name' => $Catagories[$i]['cat_Name'], 'Color' => $Catagories[$i]['cat_Color'], 'Order' => $Catagories[$i]['CatOrder']]
              );
              if($Catagories[$i]['FoodItems'] != null && sizeof($Catagories[$i]['FoodItems']) > 0)
              {
                $FoodItems = $Catagories[$i]['FoodItems'];
                for ($j=0; $j < sizeof($FoodItems) ; $j++)
                {
                  $FID      = $FoodItems[$j]['FoodItemID'];
                  $FoodName = $FoodItems[$j]['FoodName'];
                  // $CatIDRaw    = $Catagories[$i]['category'];
                  DB::insert('insert into foodpanelfooditems (PID, CatID, FID, Name ) values (?, ?, ?, ?)', [$foodPanelsRaw->id, $CatIDRaw, $FID, $FoodName]);
                }
              }
            }
          }
        }

        return $this->show($foodPanelsRaw->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {

    	  $foodpanelcat = DB::table('foodpanelcategory')->where('PID', $id)->delete();
        $foodpanelfooditems = DB::table('foodpanelfooditems')->where('PID', $id)->delete();
        $prescriptionreaction = DB::table('prescriptionreactions')->where('PanelID', $id)->delete();

        $foodpanel = FoodPanel::find($id);
        $foodpanel->delete();

        return "Food Panel record successfully deleted #" . $id;
    }
}
