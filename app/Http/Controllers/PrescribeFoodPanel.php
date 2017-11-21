<?php

namespace App\Http\Controllers;

use App\Models\FoodPanel;
use App\Models\FoodPanelCat;
use App\Models\FoodPanelFoodItem;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class PrescribeFoodPanel extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
            $user = Auth::guard('staff')->user();
            return FoodPanel::orderBy('id', 'asc')->where('CID', $user->CID)->get();
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
        $foodpanel 			= new FoodPanel;
        $foodpanelfooditem  = new FoodPanelFoodItem;

        //record insertion

        $foodpanel->Name    = $request->input('Name');
        $foodpanel->Type    = $request->input('Type');
        $foodpanel->save();

        //get length of food items array
        $length    = sizeof($request->input('fooditems'));
        $fooditems = array();
        $fooditems = $request->input('fooditems');
        $count = 0;

        //if type is categorized, create new object in food panel category

        if($request->input('Type')==1)
        {
        	 $foodpanelcat 		   = new FoodPanelCat;

        	 $foodpanelcat->PID    = $foodpanel->id;
       		 $foodpanelcat->CatID  = $request->input('CatID');
             $foodpanelcat->save();

             //execute loop for all food items

             while($length!=0)
             {

             $foodpanelfooditem->FPCID  = $foodpanelcat->id;
       		 $foodpanelfooditem->PID      = $foodpanel->id;
       		 $foodpanelfooditem->FID      = $fooditems[$count];
             $foodpanelcat->save();
             $length--;
             $count++;
             }
        }
        else
        {
            //execute loop for all food items
         while($length!=0)
             {

             $foodpanelfooditem->FPCID    = '0';
       		 $foodpanelfooditem->PID      = $foodpanel->id;
       		 $foodpanelfooditem->FID      = $fooditems[$count];
             $foodpanelcat->save();
             $length--;
             $count++;
             }
        }
        return 'Food Panel Category record successfully created with id ' . $foodpanel->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

          $foodpanel = FoodPanel::find($id);
          if($foodpanel['Type'] == "Categorized")
          {
            $foodpanelRaw = DB::table('foodpanelcategory')
                            ->where('foodpanelcategory.PID', $id)
                            ->orderBy('foodpanelcategory.Order', 'asc')
                            ->get();
            for ($i=0; $i < sizeof($foodpanelRaw) ; $i++)
            {
              $foodData[$i]['Category'][0]  =  $foodpanelRaw[$i];

              $foodData[$i]['FoodItems'] = DB::table('foodpanelfooditems')
                                          //->join('fooditems', 'fooditems.id', '=', 'foodpanelfooditems.FID')
                                          ->where('foodpanelfooditems.PID', $id)
                                          ->where('foodpanelfooditems.CatID', $foodpanelRaw[$i]->id)
                                          ->get(['foodpanelfooditems.id','foodpanelfooditems.FID','foodpanelfooditems.Name']);
            }
            return $foodData;
          }
          else
          {
            $foodpanel = DB::table('foodpanelfooditems')
                     //->join('fooditems', 'fooditems.id', '=', 'foodpanelfooditems.FID')
                     ->select('foodpanelfooditems.*','foodpanelfooditems.FID as foodID','foodpanelfooditems.Name as foodName'/*,'fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist'*/)
                     ->where('foodpanelfooditems.PID', $id)
                     ->orderBy('foodpanelfooditems.Order', 'asc')
                     ->get();
            //Old Query
            // $foodpanel = DB::table('foodpanelfooditems')
            //          ->join('fooditems', 'fooditems.id', '=', 'foodpanelfooditems.FID')
            //          ->select('foodpanelfooditems.*','fooditems.id as foodID','fooditems.Name as foodName','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist')
            //          ->where('foodpanelfooditems.PID', $id)
            //          ->get();
            return $foodpanel;
          }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id,$fid,$foodpanelcatid) {
        $foodpanel = FoodPanel::find($id);
        $foodpanelfooditem = FoodPanelFoodItem::find($fid);
        $foodpanelcat = FoodPanelCat::find($foodpanelcatid);

        //record insertion

        $foodpanel->Name    = $request->input('Name');
        $foodpanel->Type    = $request->input('Type');
        $foodpanel->save();

        //get length of food items array
        $length = sizeof($request->input('fooditems'));
        $fooditems = array();
        $fooditems = $request->input('fooditems');
        $count = 0;


        if($request->input('Type')==1)
        {

        	 $foodpanelcat->PID    = $foodpanel->id;
       		 $foodpanelcat->CatID  = $request->input('CatID');
             $foodpanelcat->save();

             while($length!=0)
             {

             $foodpanelfooditem->FPCID    = $foodpanelcat->id;
       		 $foodpanelfooditem->PID      = $foodpanel->id;
       		 $foodpanelfooditem->FID      = $fooditems[$count];
             $foodpanelcat->save();
             $length--;
             $count++;
             }
        }
        else
        {
         while($length!=0)
             {
             $foodpanelfooditem->FPCID    = '0';
       		 $foodpanelfooditem->PID      = $foodpanel->id;
       		 $foodpanelfooditem->FID      = $fooditems[$count];
             $foodpanelcat->save();
             $length--;
             $count++;
             }
        }
         return "Success updating Food Panel #" . $foodpanel->id;
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
        $prescriptionreaction = DB::table('prescriptionreactions')->where('PID', $id)->delete();

        $foodpanel = FoodPanel::find($id);
        $foodpanel->delete();

        return "Food Panel record successfully deleted #" . $id;
    }
}
