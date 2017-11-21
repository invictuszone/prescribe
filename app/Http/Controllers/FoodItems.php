<?php

namespace App\Http\Controllers;

use App\Models\FoodItem;
use App\Models\Categories;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use Illuminate\Routing\ResponseFactory;
use Auth;

class FoodItems extends Controller
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
            // return $user->CID;
            if ($user->CID == "") {
              $user->CID = 0;
            }

            $FoodsRaw = FoodItem::orderBy('Name', 'asc')
            // ->where('CID', 0)
            ->where('CID', $user->CID)
            ->get();

            $FoodsItems = [];
            for ($i=0; $i < sizeof($FoodsRaw) ; $i++)
            {
              $FoodsItems[$i]           =  $FoodsRaw[$i];

              $FoodsItems[$i]['Ingredients'] = DB::table('foodingredients')
                                            ->join('fooditems as Ingredients', 'foodingredients.IID', '=', 'Ingredients.id')
                                            ->where('foodingredients.FID', $FoodsRaw[$i]->id)
                                            ->get(['foodingredients.id','foodingredients.IID','foodingredients.FID','Ingredients.Name','Ingredients.ImmuneReaction','Ingredients.Foodlist','Ingredients.Comprehensivelist','Ingredients.created_by']);
              $FoodsItems[$i]['FoodAka']  = DB::table('foodaka')
                                            ->where('FID', $FoodsRaw[$i]->id)
                                            ->get();

              $FoodsItems[$i]['DietTypes'] = DB::table('fooddiettypes')
                                            ->join('diettype', 'fooddiettypes.DTID', '=', 'diettype.id')
                                            ->where('fooddiettypes.FID', $FoodsRaw[$i]->id)
                                            ->get(['fooddiettypes.id','fooddiettypes.DTID','fooddiettypes.FID','diettype.Name','diettype.created_by']);

              $FoodsItems[$i]['Characteristics'] = DB::table('foodcharacteristics')
                                                ->join('characteristics', 'foodcharacteristics.CharID', '=', 'characteristics.id')
                                                ->where('foodcharacteristics.FID', $FoodsRaw[$i]->id)
                                                ->get(['foodcharacteristics.id','foodcharacteristics.CharID','foodcharacteristics.FID','characteristics.Name','characteristics.created_by']);

              $FoodsItems[$i]['Categories'] = DB::table('foodcategories')
                                              ->join('categories', 'foodcategories.CatID', '=', 'categories.id')
                                              ->where('foodcategories.FID', $FoodsRaw[$i]->id)
                                              ->get(['foodcategories.id','foodcategories.CatID','foodcategories.FID','categories.Name','categories.Color','categories.Order']);

              $FoodsItems[$i]['AkaItem']    = false;
            }

            //Add Foodakas To Foodlist
            $FoodAka = [];
            $size = sizeof($FoodsItems);
            for ($i=0; $i < sizeof($FoodsItems); $i++)
            {
              if($FoodsItems[$i]['AkaItem'] == false)
              {
                $FoodAka       = DB::table('foodaka')
                                 ->where('FID', $FoodsItems[$i]->id)
                                 ->get();
                for ($j=0; $j < sizeof($FoodAka); $j++)
                {
                  // $AkaItem      = [];
                  $FoodsItems[$size]['CID']                 = $FoodsItems[$i]->CID;
                  $FoodsItems[$size]['Categories']          = $FoodsItems[$i]->Categories;
                  $FoodsItems[$size]['Characteristics']     = $FoodsItems[$i]->Characteristics;
                  $FoodsItems[$size]['DietTypes']           = $FoodsItems[$i]->DietTypes;
                  $FoodsItems[$size]['FoodAka']             = $FoodsItems[$i]->FoodAka;
                  $FoodsItems[$size]['Foodlist']            = $FoodsItems[$i]->Foodlist;
                  $FoodsItems[$size]['ImmuneReaction']      = $FoodsItems[$i]->ImmuneReaction;
                  $FoodsItems[$size]['Ingredients']         = $FoodsItems[$i]->Ingredients;
                  $FoodsItems[$size]['Order']               = $FoodsItems[$i]->Order;
                  $FoodsItems[$size]['Url']                 = $FoodsItems[$i]->Url;

                  $FoodsItems[$size]['id']                  = 'Aka-'.$FoodAka[$j]->id;
                  $FoodsItems[$size]['Comprehensivelist']   = $FoodAka[$j]->Comprehensivelist;
                  $FoodsItems[$size]['FID']                 = $FoodAka[$j]->FID;
                  $FoodsItems[$size]['Name']                = $FoodAka[$j]->Name;
                  $FoodsItems[$size]['AkaID']               = $FoodAka[$j]->id;
                  $FoodsItems[$size]['AkaItem']             = true;

                  $size++;
                }
              }
            }

            // natcasesort($FoodsItems);
            $name = array();
            foreach ($FoodsItems as $key => $row)
            {
                $name[$key] = $row['Name'];
            }
            array_multisort($name, SORT_ASC|SORT_NATURAL|SORT_FLAG_CASE, $FoodsItems);
            // return $name;
            // return Response::json($FoodsItems);
            // return response()->json(['data'=>$FoodsItems]);
            return json_encode($FoodsItems);
            // return $FoodsItems;
        } else {
            return $this->show($id);
        }
    }

    /**
      * Display a listing of the resource.
      *
      * @return Response
      */
     public function simpleFoodList() {

         if (Auth::guard('web')->check()) {
           $user   = Auth::user();
         }
         elseif (Auth::guard('staff')->check()) {
           $user = Auth::guard('staff')->user();
         }

         if ($user->CID == "") {
           $user->CID = 0;
         }

         $FoodsRaw = FoodItem::orderBy('Name', 'asc')
                                //  ->where('CID', 0)
                                 ->where('CID', $user->CID)
                                 ->get();

         for ($i=0; $i < sizeof($FoodsRaw) ; $i++)
         {
           $FoodsItems[$i]           =  $FoodsRaw[$i];


           $FoodsItems[$i]['Categories'] = DB::table('foodcategories')
                                           ->join('categories', 'foodcategories.CatID', '=', 'categories.id')
                                           ->where('foodcategories.FID', $FoodsRaw[$i]->id)
                                           ->get(['foodcategories.id','foodcategories.CatID','foodcategories.FID','categories.Name','categories.Color','categories.Order']);

          $FoodsItems[$i]['Ingredients'] = DB::table('foodingredients')
                                        ->join('fooditems as Ingredients', 'foodingredients.IID', '=', 'Ingredients.id')
                                        ->where('foodingredients.FID', $FoodsRaw[$i]->id)
                                        ->get(['foodingredients.id','foodingredients.IID','foodingredients.FID','Ingredients.Name','Ingredients.ImmuneReaction','Ingredients.Foodlist','Ingredients.Comprehensivelist','Ingredients.created_by']);

         }
         return json_encode($FoodsItems);
     }

    /**
     * Return a new JSON response from the application.
     *
     * @param  string|array  $data
     * @param  int  $status
     * @param  array  $headers
     * @param  int  $options
     * @return \Illuminate\Http\JsonResponse
     */

    public function json($data = [], $status = 200, array $headers = [], $options = 0)
    {
        if ($data instanceof Arrayable && ! $data instanceof JsonSerializable) {
            $data = $data->toArray();
        }
        return new JsonResponse($data, $status, $headers, $options);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {
        $fooditem = new FoodItem;

        if (Auth::guard('web')->check()) {
          $user   = Auth::user();
        }
        elseif (Auth::guard('staff')->check()) {
          $user = Auth::guard('staff')->user();
        }

        if ($user->CID == "") {
          $user->CID = 0;
        }

        //Get last order Number
        $Order = DB::table('fooditems')->orderBy('Order', 'desc')->first();
        $Order = $Order->Order;
        $Order++;

        $fooditem->Name              = $request->input('Name');
        $fooditem->CID               = $user->CID;
        // $fooditem->CID               = 0;
        $fooditem->Order             = $Order;
        $fooditem->ImmuneReaction    = $request->input('ImmuneReaction');
        $fooditem->Foodlist          = $request->input('Comprehensivelist');
        $fooditem->Comprehensivelist = $request->input('Comprehensivelist');
        $fooditem->Url               = $request->input('Url');
        $fooditem->save();

        $delete = DB::table('fooddiettypes')->where('FID', $fooditem->id)->delete();
        $DietType = $request->input('DietTypes');
        for ($i=0; $i < sizeof($DietType); $i++)
        {
          if($DietType[$i] != "")
          {
            DB::insert('insert into fooddiettypes (FID, DTID) values (?, ?)', [$fooditem->id, $DietType[$i]]);
          }
        }

        $delete = DB::table('foodcategories')->where('FID', $fooditem->id)->delete();
        $categories= $request->input('Categories');
        for ($i=0; $i < sizeof($categories); $i++)
        {
          if($categories[$i] != "")
          {
            DB::insert('insert into foodcategories (FID, CatID) values (?, ?)', [$fooditem->id, $categories[$i]]);
          }
        }

        $delete = DB::table('foodcharacteristics')->where('FID', $fooditem->id)->delete();
        $characteristics= $request->input('Characteristics');
        for ($i=0; $i < sizeof($characteristics); $i++)
        {
          if($characteristics[$i] != "")
          {
            DB::insert('insert into foodcharacteristics (FID, CharID) values (?, ?)', [$fooditem->id, $characteristics[$i]]);
          }
        }

        $delete = DB::table('foodingredients')->where('FID', $fooditem->id)->delete();
        $Ingredients= $request->input('Ingredients');
        for ($i=0; $i < sizeof($Ingredients); $i++)
        {
          DB::insert('insert into foodingredients (FID, IID) values (?, ?)', [$fooditem->id, $Ingredients[$i]]);
        }

        $delete = DB::table('foodaka')->where('FID', $fooditem->id)->delete();
        $Aka = $request->input('AkaName');
        $count = 0;
        for ($i=0; $i < sizeof($Aka); $i++)
        {
          DB::insert('insert into foodaka (FID, Name, Comprehensivelist) values (?, ?, ?)', [$fooditem->id, $Aka[$i]['akaName'],$Aka[$i]['inList'] ]);
          $count++;
        }

        // return $request;
        return $this->show($fooditem->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
      //If id is not of AKAFood
      if(is_numeric( $id ))
      {
        $FoodsItem = FoodItem::find($id);

        $FoodsItem['Ingredients'] = DB::table('foodingredients')
                                      ->join('fooditems as Ingredients', 'foodingredients.IID', '=', 'Ingredients.id')
                                      ->where('foodingredients.FID', $FoodsItem->id)
                                      ->get(['foodingredients.id','foodingredients.IID','foodingredients.FID','Ingredients.Name','Ingredients.ImmuneReaction','Ingredients.Foodlist','Ingredients.Comprehensivelist','Ingredients.created_by']);
        // $FoodsItem['FoodAka'] = DB::table('foodaka')
        //                                    ->join('fooditems as Aka', 'foodaka.AkaID', '=', 'Aka.id')
        //                                    ->where('foodaka.FID', $FoodsItem->id)
        //                                    ->get(['foodaka.id','foodaka.AkaID','foodaka.FID','Aka.Name']);
        $FoodsItem['FoodAka'] = DB::table('foodaka')
                                           ->where('foodaka.FID', $FoodsItem->id)
                                           ->get(['foodaka.id','foodaka.Name','foodaka.FID','foodaka.Comprehensivelist']);
        $FoodsItem['DietTypes'] = DB::table('fooddiettypes')
                                      ->join('diettype', 'fooddiettypes.DTID', '=', 'diettype.id')
                                      ->where('fooddiettypes.FID', $FoodsItem->id)
                                      ->get(['fooddiettypes.id','fooddiettypes.DTID','fooddiettypes.FID','diettype.Name','diettype.created_by']);

        $FoodsItem['Characteristics'] = DB::table('foodcharacteristics')
                                          ->join('characteristics', 'foodcharacteristics.CharID', '=', 'characteristics.id')
                                          ->where('foodcharacteristics.FID', $FoodsItem->id)
                                          ->get(['foodcharacteristics.id','foodcharacteristics.CharID','foodcharacteristics.FID','characteristics.Name','characteristics.created_by']);

        $FoodsItem['Categories'] = DB::table('foodcategories')
                                        ->join('categories', 'foodcategories.CatID', '=', 'categories.id')
                                        ->where('foodcategories.FID', $FoodsItem->id)
                                        ->get(['foodcategories.id','foodcategories.CatID','foodcategories.FID','categories.Name','categories.Color','categories.Order']);

        //Add Foodakas To Foodlist
        $FoodAka       = DB::table('foodaka')
                         ->where('FID', $FoodsItem->id)
                         ->get();
        $AkaItems      = [];
        for ($j=0; $j < sizeof($FoodAka); $j++)
        {
          $AkaItems[$j]['CID']                 = $FoodsItem->CID;
          $AkaItems[$j]['Categories']          = $FoodsItem->Categories;
          $AkaItems[$j]['Characteristics']     = $FoodsItem->Characteristics;
          $AkaItems[$j]['DietTypes']           = $FoodsItem->DietTypes;
          $AkaItems[$j]['FoodAka']             = $FoodsItem->FoodAka;
          $AkaItems[$j]['Foodlist']            = $FoodsItem->Foodlist;
          $AkaItems[$j]['ImmuneReaction']      = $FoodsItem->ImmuneReaction;
          $AkaItems[$j]['Ingredients']         = $FoodsItem->Ingredients;
          $AkaItems[$j]['Order']               = $FoodsItem->Order;
          $AkaItems[$j]['Url']                 = $FoodsItem->Url;

          $AkaItems[$j]['id']                  = 'Aka-'.$FoodAka[$j]->id;
          $AkaItems[$j]['Comprehensivelist']   = $FoodAka[$j]->Comprehensivelist;
          $AkaItems[$j]['FID']                 = $FoodAka[$j]->FID;
          $AkaItems[$j]['Name']                = $FoodAka[$j]->Name;
          $AkaItems[$j]['AkaID']               = $FoodAka[$j]->id;
          $AkaItems[$j]['AkaItem']             = true;
        }

        $FoodsItem['RelatedAkas'] = $AkaItems;


        return $FoodsItem;
      }
      else
      {
        preg_match_all('!\d+!', $id, $intID);
        $id = $intID[0][0];
        $Aka       = DB::table('foodaka')
                         ->where('id', $id)
                         ->first();
        $Fid   = $Aka->FID;
        $FoodsItem = FoodItem::find($Fid);
        //Orginal Food Related
        $FoodsItem['FoodAka'] = DB::table('foodaka')
                                           ->where('foodaka.FID', $FoodsItem->id)
                                           ->get(['foodaka.id','foodaka.Name','foodaka.FID','foodaka.Comprehensivelist']);

        $FoodsItem['Ingredients'] = DB::table('foodingredients')
                                      ->join('fooditems as Ingredients', 'foodingredients.IID', '=', 'Ingredients.id')
                                      ->where('foodingredients.FID', $FoodsItem->id)
                                      ->get(['foodingredients.id','foodingredients.IID','foodingredients.FID','Ingredients.Name','Ingredients.ImmuneReaction','Ingredients.Foodlist','Ingredients.Comprehensivelist','Ingredients.created_by']);

        $FoodsItem['FoodAka'] = DB::table('foodaka')
                                           ->where('foodaka.FID', $FoodsItem->id)
                                           ->get(['foodaka.id','foodaka.Name','foodaka.FID','foodaka.Comprehensivelist']);
        $FoodsItem['DietTypes'] = DB::table('fooddiettypes')
                                      ->join('diettype', 'fooddiettypes.DTID', '=', 'diettype.id')
                                      ->where('fooddiettypes.FID', $FoodsItem->id)
                                      ->get(['fooddiettypes.id','fooddiettypes.DTID','fooddiettypes.FID','diettype.Name','diettype.created_by']);

        $FoodsItem['Characteristics'] = DB::table('foodcharacteristics')
                                          ->join('characteristics', 'foodcharacteristics.CharID', '=', 'characteristics.id')
                                          ->where('foodcharacteristics.FID', $FoodsItem->id)
                                          ->get(['foodcharacteristics.id','foodcharacteristics.CharID','foodcharacteristics.FID','characteristics.Name','characteristics.created_by']);

        $FoodsItem['Categories'] = DB::table('foodcategories')
                                        ->join('categories', 'foodcategories.CatID', '=', 'categories.id')
                                        ->where('foodcategories.FID', $FoodsItem->id)
                                        ->get(['foodcategories.id','foodcategories.CatID','foodcategories.FID','categories.Name','categories.Color','categories.Order']);

        $FoodAka['CID']                 = $FoodsItem->CID;
        $FoodAka['Categories']          = $FoodsItem->Categories;
        $FoodAka['Characteristics']     = $FoodsItem->Characteristics;
        $FoodAka['DietTypes']           = $FoodsItem->DietTypes;
        $FoodAka['FoodAka']             = $FoodsItem->FoodAka;
        $FoodAka['Foodlist']            = $FoodsItem->Foodlist;
        $FoodAka['ImmuneReaction']      = $FoodsItem->ImmuneReaction;
        $FoodAka['Ingredients']         = $FoodsItem->Ingredients;
        $FoodAka['Order']               = $FoodsItem->Order;
        $FoodAka['Url']                 = $FoodsItem->Url;

        $FoodAka['id']                  = 'Aka-'.$Aka->id;
        $FoodAka['Comprehensivelist']   = $Aka->Comprehensivelist;
        $FoodAka['FID']                 = $Aka->FID;
        $FoodAka['Name']                = $Aka->Name;
        $FoodAka['AkaID']               = $Aka->id;
        $FoodAka['AkaItem']             = true;

        return $FoodAka;
      }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $fooditem = FoodItem::find($id);

        $fooditem->Name              = $request->input('Name');
        $fooditem->Url               = $request->input('Url');
        $fooditem->ImmuneReaction    = $request->input('ImmuneReaction');
        $fooditem->Foodlist          = $request->input('Comprehensivelist');
        $fooditem->Comprehensivelist = $request->input('Comprehensivelist');
        $fooditem->save();

        $delete = DB::table('fooddiettypes')->where('FID', $id)->delete();
        $DietType = $request->input('DietTypes');
        for ($i=0; $i < sizeof($DietType); $i++)
        {
          if($DietType[$i] != "")
          {
            DB::insert('insert into fooddiettypes (FID, DTID) values (?, ?)', [$fooditem->id, $DietType[$i]]);
          }
        }

        $delete = DB::table('foodcategories')->where('FID', $id)->delete();
        $categories= $request->input('Categories');
        for ($i=0; $i < sizeof($categories); $i++)
        {
          if($categories[$i] != "")
          {
            DB::insert('insert into foodcategories (FID, CatID) values (?, ?)', [$fooditem->id, $categories[$i]]);
          }
        }

        $delete = DB::table('foodcharacteristics')->where('FID', $id)->delete();
        $characteristics= $request->input('Characteristics');
        for ($i=0; $i < sizeof($characteristics); $i++)
        {
          if($characteristics[$i] != "")
          {
            DB::insert('insert into foodcharacteristics (FID, CharID) values (?, ?)', [$fooditem->id, $characteristics[$i]]);
          }
        }

        $delete = DB::table('foodingredients')->where('FID', $id)->delete();
        $Ingredients= $request->input('Ingredients');
        for ($i=0; $i < sizeof($Ingredients); $i++)
        {
          DB::insert('insert into foodingredients (FID, IID) values (?, ?)', [$fooditem->id, $Ingredients[$i]]);
        }

        // $delete = DB::table('foodaka')->where('FID', $fooditem->id)->delete();
        // $Aka = $request->input('AkaName');
        // for ($i=0; $i < sizeof($Aka); $i++)
        // {
        //   DB::insert('insert into foodaka (FID, AkaID) values (?, ?)', [$fooditem->id, $Aka[$i]]);
        // }
        $delete = DB::table('foodaka')->where('FID', $fooditem->id)->delete();
        $Aka = $request->input('AkaName');
        for ($i=0; $i < sizeof($Aka); $i++)
        {
          // return $Aka[$i]['edit'];
          if ($Aka[$i]['edit'] == 'false') {
            DB::insert('insert into foodaka (FID, Name, Comprehensivelist) values (?, ?, ?)', [$fooditem->id, $Aka[$i]['akaName'],$Aka[$i]['inList'] ]);
          }
          else {
            DB::insert('insert into foodaka (id, FID, Name, Comprehensivelist) values (?, ?, ?, ?)', [$Aka[$i]['id'], $fooditem->id, $Aka[$i]['akaName'],$Aka[$i]['inList'] ]);
          }
        }

        return $this->show($fooditem->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
   	 public function destroy($id) {
        $foodcategories      = DB::table('foodcategories')->where('FID', $id)->delete();
        $foodcharacteristics = DB::table('foodcharacteristics')->where('FID', $id)->delete();
        $fooddiettypes       = DB::table('fooddiettypes')->where('FID', $id)->delete();
        $prescriptionfoods   = DB::table('prescriptionfoods')->where('FID', $id)->delete();
        $foodaka             = DB::table('foodaka')->where('FID', $id)->delete();

        //FID and IID in Food Ingredients
        $foodingredient = DB::table('foodingredients')->where('FID', $id)->delete();


        $fooditem = FoodItem::find($id);
        $fooditem->delete();
        return "Food Item record successfully deleted #" . $id;
    }

    /**
     * Reorder the specified resource from storage.
     *
     * @param  Request  $request
     * @return Response
     */
   	 public function reorder(Request $request) {

        $order = $request->input('order');
        for ($i=0; $i < sizeof($order); $i++)
        {
          $id        = $order[$i]['FID'];
          $FoodOrder = $order[$i]['itemOrder'];
          $fooditem  = FoodItem::find($id);

          $fooditem->Order = $FoodOrder;
          $fooditem->save();
        }

        return "Updated" . $fooditem->id;
    }
/////****FOOD LIST****////
  public function getFoodlist()
     {
      $user = Auth::guard('staff')->user();
      if ($user->CID == "") {
        $user->CID = 0;
      }

      $CategoriesRaw = Categories::orderBy('Order', 'asc')
                                // ->where('CID', 0)
                                ->where('CID', $user->CID)
                                ->get(['categories.id','categories.Name']);
            for ($i=0; $i < sizeof($CategoriesRaw) ; $i++)
            {
              $FoodItems[$i]['Category']           =  $CategoriesRaw[$i];

              $FoodItems[$i]['FoodItems'] = DB::table('foodcategories')
                                              ->leftjoin('categories', 'foodcategories.CatID', '=', 'categories.id')
                                              ->leftjoin('fooditems','foodcategories.FID','=','fooditems.id')
                                              ->where('foodcategories.CatID', $CategoriesRaw[$i]->id)
                                              ->orderBy('fooditems.Name', 'asc')
                                              ->get(['foodcategories.FID','fooditems.Name','fooditems.Url']);

              for ($j=0; $j < sizeof($FoodItems[$i]['FoodItems']); $j++)
              {
                $FoodItems[$i]['FoodItems'][$j]->AkaItem = false;
              }
              //Add Foodakas To Foodlist
              $FoodAka = [];
              $size = sizeof($FoodItems[$i]['FoodItems']);
              for ($j=0; $j < sizeof($FoodItems[$i]['FoodItems']); $j++)
              {
                if($FoodItems[$i]['FoodItems'][$j]->AkaItem == false)
                {
                  $AKA       = DB::table('foodaka')
                             ->where('FID', $FoodItems[$i]['FoodItems'][$j]->FID)
                             ->get();

                  // return $FoodItems[$i]['FoodItems'];
                  for ($k=0; $k < sizeof($AKA); $k++)
                  {
                    $Arr = new \stdClass;
                    $Arr->FID      = $FoodItems[$i]['FoodItems'][$j]->FID;
                    $Arr->FID      = $AKA[$k]->id;
                    $Arr->Name     = $AKA[$k]->Name;
                    $Arr->Url      = $FoodItems[$i]['FoodItems'][$j]->Url;
                    $Arr->AkaItem  = true;
                    $FoodItems[$i]['FoodItems'][$size] = $Arr;
                    $size++;
                  }
                }
              }
              $name = array();
              $foods = array();
              for ($j=0; $j < sizeof($FoodItems[$i]['FoodItems']); $j++)
              {
                //Move to array for sorting
                $foods[$j] = $FoodItems[$i]['FoodItems'][$j];
              }

              //Sort Alphabetically
              foreach ($foods as $key => $row)
              {
                  $name[$key] = $row->Name;
              }
              array_multisort($name, SORT_ASC|SORT_NATURAL|SORT_FLAG_CASE, $foods);
              $FoodItems[$i]['FoodItems'] = $foods;
             }
        return $FoodItems;
     }
}
