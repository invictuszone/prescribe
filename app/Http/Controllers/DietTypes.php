<?php

namespace App\Http\Controllers;

use App\Models\DietType;
use App\Models\ChildDietTypes;
use App\Models\FoodDietTypes;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Auth;


class DietTypes extends Controller
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

            $dietRaw = DietType::orderBy('id', 'asc')
            // ->where('CID', 0)
            ->where('CID', $user->CID)
            ->get();

            for ($i=0; $i < sizeof($dietRaw) ; $i++)
            {
              $diet[$i]             =  $dietRaw[$i];

              $diet[$i]['Categories'] = DB::table('diettypecategories')
                                              ->join('categories', 'diettypecategories.CatID', '=', 'categories.id')
                                              ->where('diettypecategories.DTID', $dietRaw[$i]->id)
                                              ->get(['diettypecategories.id','diettypecategories.CatID','diettypecategories.DTID','categories.Name','categories.Color','categories.Order']);

              $diet[$i]['Characteristics'] = DB::table('diettypecharacteristics')
                                                ->join('characteristics', 'diettypecharacteristics.CharID', '=', 'characteristics.id')
                                                ->where('diettypecharacteristics.DTID', $dietRaw[$i]->id)
                                                ->get(['diettypecharacteristics.id','diettypecharacteristics.CharID','diettypecharacteristics.DTID','characteristics.Name','characteristics.created_by']);

              $diet[$i]['SubType']  = DB::table('childdiettype')
                                          ->join('diettype as SubType', 'childdiettype.DTIDC', '=', 'SubType.id')
                                          ->where('childdiettype.DTIDP', $dietRaw[$i]->id)
                                          ->get(['childdiettype.id','childdiettype.DTIDP','childdiettype.DTIDC','SubType.Name','SubType.created_by','SubType.Type']);

              $diet[$i]['FoodItems'] = DB::table('fooddiettypes')
                                          ->join('fooditems', 'fooddiettypes.FID', '=', 'fooditems.id')
                                          ->where('fooddiettypes.DTID', $dietRaw[$i]->id)
                                          ->get(['fooddiettypes.id','fooddiettypes.DTID','fooddiettypes.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);
            }
            return $diet;
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

        $diettype = new DietType;
        $diettype->Name       = $request->input('Name');
        $diettype->CID        = $user->CID;
        // $diettype->CID        = 0;
        $diettype->Type       = $request->input('Type');
        $diettype->created_by = 0;


        $diettype->save();

        //Adding FoodItems
        $delete = DB::table('fooddiettypes')->where('DTID', $diettype->id)->delete();
        $FoodItems = $request->input('FoodItems');
        if($FoodItems != null)
        {
          for ($i=0; $i < sizeof($FoodItems) ; $i++)
          {
            DB::insert('insert into fooddiettypes (FID, DTID) values (?, ?)', [$FoodItems[$i], $diettype->id]);
          }
        }

        //Adding Categories
        $delete = DB::table('diettypecategories')->where('DTID', $diettype->id)->delete();
        $Categories = $request->input('Categories');
        for ($i=0; $i < sizeof($Categories) ; $i++)
        {
          DB::insert('insert into diettypecategories (DTID, CatID) values (?, ?)', [ $diettype->id, $Categories[$i]]);
        }

        //Adding $Characteristics
        $delete = DB::table('diettypecharacteristics')->where('DTID', $diettype->id)->delete();
        $Characteristics = $request->input('Characteristics');
        for ($i=0; $i < sizeof($Characteristics) ; $i++)
        {
          DB::insert('insert into diettypecharacteristics (DTID, CharID) values (?, ?)', [ $diettype->id, $Characteristics[$i]]);
        }

        //Adding Sub DietType
        $delete = DB::table('childdiettype')->where('DTIDP', $diettype->id)->delete();
        $SubType = $request->input('SubType');
        for ($i=0; $i < sizeof($SubType) ; $i++)
        {
          DB::insert('insert into childdiettype (DTIDP, DTIDC) values (?, ?)', [ $diettype->id, $SubType[$i]]);
        }

        //Return Results
        $diettype['Categories'] = DB::table('diettypecategories')
                                        ->join('categories', 'diettypecategories.CatID', '=', 'categories.id')
                                        ->where('diettypecategories.DTID', $diettype->id)
                                        ->get(['diettypecategories.id','diettypecategories.CatID','diettypecategories.DTID','categories.Name','categories.Color','categories.Order']);

        $diettype['Characteristics'] = DB::table('diettypecharacteristics')
                                          ->join('characteristics', 'diettypecharacteristics.CharID', '=', 'characteristics.id')
                                          ->where('diettypecharacteristics.DTID', $diettype->id)
                                          ->get(['diettypecharacteristics.id','diettypecharacteristics.CharID','diettypecharacteristics.DTID','characteristics.Name','characteristics.created_by']);

        $diettype['SubType']  = DB::table('childdiettype')
                                    ->join('diettype as SubType', 'childdiettype.DTIDC', '=', 'SubType.id')
                                    ->where('childdiettype.DTIDP', $diettype->id)
                                    ->get(['childdiettype.id','childdiettype.DTIDP','childdiettype.DTIDC','SubType.Name','SubType.created_by','SubType.Type']);

        $diettype['FoodItems'] = DB::table('fooddiettypes')
                                    ->join('fooditems', 'fooddiettypes.FID', '=', 'fooditems.id')
                                    ->where('fooddiettypes.DTID', $diettype->id)
                                    ->get(['fooddiettypes.id','fooddiettypes.DTID','fooddiettypes.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);


        return $diettype;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        $diet = DietType::find($id);

        $diet['Categories'] = DB::table('diettypecategories')
                                        ->join('categories', 'diettypecategories.CatID', '=', 'categories.id')
                                        ->where('diettypecategories.DTID', $diet->id)
                                        ->get(['diettypecategories.id','diettypecategories.CatID','diettypecategories.DTID','categories.Name','categories.Color','categories.Order']);

        $diet['Characteristics'] = DB::table('diettypecharacteristics')
                                          ->join('characteristics', 'diettypecharacteristics.CharID', '=', 'characteristics.id')
                                          ->where('diettypecharacteristics.DTID', $diet->id)
                                          ->get(['diettypecharacteristics.id','diettypecharacteristics.CharID','diettypecharacteristics.DTID','characteristics.Name','characteristics.created_by']);

        $diet['SubType']  = DB::table('childdiettype')
                                    ->join('diettype as SubType', 'childdiettype.DTIDC', '=', 'SubType.id')
                                    ->where('childdiettype.DTIDP', $diet->id)
                                    ->get(['childdiettype.id','childdiettype.DTIDP','childdiettype.DTIDC','SubType.Name','SubType.created_by','SubType.Type']);

        $diet['FoodItems'] = DB::table('fooddiettypes')
                                    ->join('fooditems', 'fooddiettypes.FID', '=', 'fooditems.id')
                                    ->where('fooddiettypes.DTID', $diet->id)
                                    ->get(['fooddiettypes.id','fooddiettypes.DTID','fooddiettypes.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);

        return $diet;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $diettype = DietType::find($id);

        $diettype->Name       = $request->input('Name');
        $diettype->Type       = $request->input('Type');
        // $diettype->created_by = 0;

        $diettype->save();

        //Adding FoodItems
        $delete = DB::table('fooddiettypes')->where('DTID', $diettype->id)->delete();
        $FoodItems = $request->input('FoodItems');
        if($FoodItems != null)
        {
          for ($i=0; $i < sizeof($FoodItems) ; $i++)
          {
            if($FoodItems[$i] != null)
            {
              DB::insert('insert into fooddiettypes (FID, DTID) values (?, ?)', [$FoodItems[$i], $diettype->id]);
            }
          }
        }

        //Adding Categories
        $delete = DB::table('diettypecategories')->where('DTID', $diettype->id)->delete();
        $Categories = $request->input('Categories');
        for ($i=0; $i < sizeof($Categories) ; $i++)
        {
          DB::insert('insert into diettypecategories (DTID, CatID) values (?, ?)', [ $diettype->id, $Categories[$i]]);
        }

        //Adding $Characteristics
        $delete = DB::table('diettypecharacteristics')->where('DTID', $diettype->id)->delete();
        $Characteristics = $request->input('Characteristics');
        for ($i=0; $i < sizeof($Characteristics) ; $i++)
        {
          DB::insert('insert into diettypecharacteristics (DTID, CharID) values (?, ?)', [ $diettype->id, $Characteristics[$i]]);
        }

        //Adding Sub DietType
        $delete = DB::table('childdiettype')->where('DTIDP', $diettype->id)->delete();
        $SubType = $request->input('SubType');
        for ($i=0; $i < sizeof($SubType) ; $i++)
        {
          DB::insert('insert into childdiettype (DTIDP, DTIDC) values (?, ?)', [ $diettype->id, $SubType[$i]]);
        }

        //Return Results
        $diettype['Categories'] = DB::table('diettypecategories')
                                        ->join('categories', 'diettypecategories.CatID', '=', 'categories.id')
                                        ->where('diettypecategories.DTID', $diettype->id)
                                        ->get(['diettypecategories.id','diettypecategories.CatID','diettypecategories.DTID','categories.Name','categories.Color','categories.Order']);

        $diettype['Characteristics'] = DB::table('diettypecharacteristics')
                                          ->join('characteristics', 'diettypecharacteristics.CharID', '=', 'characteristics.id')
                                          ->where('diettypecharacteristics.DTID', $diettype->id)
                                          ->get(['diettypecharacteristics.id','diettypecharacteristics.CharID','diettypecharacteristics.DTID','characteristics.Name','characteristics.created_by']);

        $diettype['SubType']  = DB::table('childdiettype')
                                    ->join('diettype as SubType', 'childdiettype.DTIDC', '=', 'SubType.id')
                                    ->where('childdiettype.DTIDP', $diettype->id)
                                    ->get(['childdiettype.id','childdiettype.DTIDP','childdiettype.DTIDC','SubType.Name','SubType.created_by','SubType.Type']);

        $diettype['FoodItems'] = DB::table('fooddiettypes')
                                    ->join('fooditems', 'fooddiettypes.FID', '=', 'fooditems.id')
                                    ->where('fooddiettypes.DTID', $diettype->id)
                                    ->get(['fooddiettypes.id','fooddiettypes.DTID','fooddiettypes.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);


        return $diettype;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        //it will delete all other records with this diet type

        $fooddiettypes = DB::table('fooddiettypes')->where('DTID', $id)->delete();
        //parent diet type and child diet type...not sure which one to use
        $childdiettypes = DB::table('childdiettype')->where('DTIDP', $id)->delete();
        $childdiettypes = DB::table('childdiettype')->where('DTIDC', $id)->delete();

        $diettypecategories = DB::table('diettypecategories')->where('DTID', $id)->delete();
        $diettypecharacteristics = DB::table('diettypecharacteristics')->where('DTID', $id)->delete();
        $prescriptiondiettypes = DB::table('prescriptiondiettypes')->where('DTID', $id)->delete();


        $diettype = DietType::find($id);
        $diettype->delete();

        return "Diet Type record successfully deleted #" . $id;
    }
}
