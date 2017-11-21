<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Auth;



class Category extends Controller
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

            $categoriesRaw = Categories::orderBy('Order', 'asc')
                            // ->where('CID', 0)
                            ->where('CID', $user->CID)
                            ->get();
            $categories = array();
            for ($i=0; $i < sizeof($categoriesRaw) ; $i++)
            {
              $categories[$i]              =  $categoriesRaw[$i];
              $categories[$i]['FoodItems'] = DB::table('foodcategories')
                                          ->join('fooditems', 'foodcategories.FID', '=', 'fooditems.id')
                                          ->where('foodcategories.CatID', $categoriesRaw[$i]->id)
                                          ->get(['foodcategories.id','foodcategories.CatID','foodcategories.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);
            }

            // return $user;
            return $categories;
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

        $category = new Categories;

        $Order = DB::table('categories')->orderBy('Order', 'desc')->first();
        $Order = $Order->Order;
        $Order++;
        $Color = "755942";
        $category->Name  = $request->input('Name');
        $category->CID   = $user->CID;
        // $category->CID   = 0;
        $category->Color = $Color;
        $category->Order = $Order;
        $category->save();

        $FoodItems = $request->input('FoodItems');
        for ($i=0; $i < sizeof($FoodItems); $i++)
        {
          DB::insert('insert into foodcategories (FID, CatID) values (?, ?)', [$FoodItems[$i], $category->id]);
        }

        $category['FoodItems'] = DB::table('foodcategories')
                                    ->join('fooditems', 'foodcategories.FID', '=', 'fooditems.id')
                                    ->where('foodcategories.CatID', $category->id)
                                    ->get(['foodcategories.id','foodcategories.CatID','foodcategories.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);

        return $category;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        $category = Categories::find($id);

        $category['FoodItems'] = DB::table('foodcategories')
                                    ->join('fooditems', 'foodcategories.FID', '=', 'fooditems.id')
                                    ->where('foodcategories.CatID', $category->id)
                                    ->get(['foodcategories.id','foodcategories.CatID','foodcategories.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);

        return $category;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $category = Categories::find($id);

        $category->Name = $request->input('Name');
        // $category->Order = $request->input('Order');
        $category->save();
        $OldFoodItems = DB::table('foodcategories')->where('CatID', $id)->get();
        $oldFoodsArr = [];
        for ($i=0; $i < sizeof($OldFoodItems); $i++)
        {
          $oldFoodsArr[$i] = $OldFoodItems[$i]->FID;
        }
        $foodcategory = DB::table('foodcategories')->where('CatID', $id)->delete();
        $FoodItems = $request->input('FoodItems');

        //Get difference between old and new Foods
        $addedItems   = array_diff($FoodItems,$oldFoodsArr);
        $removedItems = array_diff($oldFoodsArr,$FoodItems);

        for ($i=0; $i < sizeof($FoodItems); $i++)
        {
          // $foodcategory = DB::table('foodcategories')->where('FID', $FoodItems[$i])->delete();
          DB::insert('insert into foodcategories (FID, CatID) values (?, ?)', [$FoodItems[$i], $category->id]);
        }

        $category['FoodItems'] = DB::table('foodcategories')
                                    ->join('fooditems', 'foodcategories.FID', '=', 'fooditems.id')
                                    ->where('foodcategories.CatID', $category->id)
                                    ->get(['foodcategories.id','foodcategories.CatID','foodcategories.FID','fooditems.Name','fooditems.ImmuneReaction','fooditems.Foodlist','fooditems.Comprehensivelist','fooditems.created_by']);

        //Add to DietTypes having this category
        $relatedDiets = DB::table('diettypecategories')
                                    ->where('CatID', $category->id)
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
        return $category;
        // return $relatedDiets;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
   	 public function destroy($id) {
        $foodcategory = DB::table('foodcategories')->where('CatID', $id)->delete();
        $diettypecategories = DB::table('diettypecategories')->where('CatID', $id)->delete();
        $category = Categories::find($id);
        $category->delete();


        return "Category record successfully deleted #" . $id;
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
          $id       = $order[$i]['catID'];
          $catOrder = $order[$i]['catOrder'];
          $category = Categories::find($id);

          $category->Order = $catOrder;
          $category->save();
        }

        return "Updated" . $category->id;
    }
}
