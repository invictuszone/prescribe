<?php

namespace App\Http\Controllers;

use App\Models\Characteristic;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Auth;



class Characteristics extends Controller
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

            $characteristicsRaw = Characteristic::orderBy('id', 'asc')
                                  // ->where('CID', 0)
                                  ->where('CID', $user->CID)
                                  ->get();
            // $characteristicsRaw = Characteristic::orderBy('id', 'asc')->get();
            for ($i=0; $i < sizeof($characteristicsRaw) ; $i++)
            {
              $characteristics[$i]              =  $characteristicsRaw[$i];
              $characteristics[$i]['FoodItems'] = DB::table('foodcharacteristics')
                                                ->join('fooditems', 'foodcharacteristics.FID', '=', 'fooditems.id')
                                                ->where('foodcharacteristics.CharID', $characteristicsRaw[$i]->id)
                                                ->get(['foodcharacteristics.id','foodcharacteristics.CharID','foodcharacteristics.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);
            }
            return $characteristics;
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
        if (Auth::guard('web')->check()) {
          $user   = Auth::user();
        }
        elseif (Auth::guard('staff')->check()) {
          $user = Auth::guard('staff')->user();
        }
        if ($user->CID == "") {
          $user->CID = 0;
        }

        $characteristic = new Characteristic;

        $created_by = 0;
        $characteristic->Name       = $request->input('Name');
        $characteristic->CID        = $user->CID;
        // $characteristic->CID        = 0;
        $characteristic->created_by = $created_by;
        $characteristic->save();

        $FoodItems = $request->input('FoodItems');
        for ($i=0; $i < sizeof($FoodItems); $i++)
        {
          DB::insert('insert into foodcharacteristics (FID, CharID, created_by) values (?, ?, ?)', [$FoodItems[$i], $characteristic->id, 0]);
        }

        $characteristic['FoodItems'] = DB::table('foodcharacteristics')
                                        ->join('fooditems', 'foodcharacteristics.FID', '=', 'fooditems.id')
                                        ->where('foodcharacteristics.CharID', $characteristic->id)
                                        ->get(['foodcharacteristics.id','foodcharacteristics.CharID','foodcharacteristics.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);

        return $characteristic;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        $characteristic = Characteristic::find($id);

        $characteristic['FoodItems'] = DB::table('foodcharacteristics')
                                          ->join('fooditems', 'foodcharacteristics.FID', '=', 'fooditems.id')
                                          ->where('foodcharacteristics.CharID', $characteristic->id)
                                          ->get(['foodcharacteristics.id','foodcharacteristics.CharID','foodcharacteristics.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);
        return $characteristic;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $characteristic = Characteristic::find($id);

        $characteristic->Name = $request->input('Name');
        $characteristic->save();

        $OldFoodItems = DB::table('foodcharacteristics')->where('CharID', $id)->get();
        $oldFoodsArr = [];
        for ($i=0; $i < sizeof($OldFoodItems); $i++)
        {
          $oldFoodsArr[$i] = $OldFoodItems[$i]->FID;
        }

        $foodcategory = DB::table('foodcharacteristics')->where('CharID', $id)->delete();
        $FoodItems = $request->input('FoodItems');

        //Get difference between old and new Foods
        $addedItems   = array_diff($FoodItems,$oldFoodsArr);
        $removedItems = array_diff($oldFoodsArr,$FoodItems);

        for ($i=0; $i < sizeof($FoodItems); $i++)
        {
          DB::insert('insert into foodcharacteristics (FID, CharID, created_by) values (?, ?, ?)', [$FoodItems[$i], $characteristic->id, 0]);
        }

        $characteristic['FoodItems'] = DB::table('foodcharacteristics')
                                      ->join('fooditems', 'foodcharacteristics.FID', '=', 'fooditems.id')
                                      ->where('foodcharacteristics.CharID', $characteristic->id)
                                      ->get(['foodcharacteristics.id','foodcharacteristics.CharID','foodcharacteristics.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);

        //Add to DietTypes having this category
        $relatedDiets = DB::table('diettypecharacteristics')
                                    ->where('CharID', $characteristic->id)
                                    ->get();
        for ($i=0; $i < sizeof($relatedDiets); $i++)
        {
          //Add Items
          foreach ($addedItems as $Avalue)
          {
              DB::insert('insert into fooddiettypes (FID, DTID) values (?, ?)', [$Avalue, $relatedDiets[$i]->DTID]);
          }
          //Remove Items
          foreach ($removedItems as $Rvalue)
          {
              $diettypecategories = DB::table('fooddiettypes')->where('FID', $Rvalue)->where('DTID', $relatedDiets[$i]->DTID)->delete();
          }
        }

        return $characteristic;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
   	 public function destroy($id) {
         $foodcharacteristics = DB::table('foodcharacteristics')->where('CharID', $id)->delete();
        $diettypecharacteristics = DB::table('diettypecharacteristics')->where('CharID', $id)->delete();

        $characteristic = Characteristic::find($id);
        $characteristic->delete();



        return "Food Charactericstic record successfully deleted #" . $id;
    }
}
