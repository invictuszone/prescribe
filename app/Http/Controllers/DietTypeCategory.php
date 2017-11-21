<?php

namespace App\Http\Controllers;

use App\Models\DietTypeCategories;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class DietTypeCategory extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        	$diettypecategory = DB::table('diettypecategories')
                  ->join('diettype', 'diettypecategories.DTID', '=', 'diettype.id')
                  ->join('categories', 'diettypecategories.CatID', '=', 'categories.id')
                  ->select('diettypecategories.*','diettype.Name as diettypeName','diettype.Type as dietType','categories.Name as categoryName')
                  ->get();

              return $diettypecategory;



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
        $diettypecategories = new DietTypeCategories;
        $diettypecategories->DTID  = $request->input('DTID');
        $diettypecategories->CatID = $request->input('CatID');
        $diettypecategories->save();
        return 'Diet Type Category record successfully created with id ' . $diettypecategories->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

              	$diettypecategory = DB::table('diettypecategories')
                  ->join('diettype', 'diettypecategories.DTID', '=', 'diettype.id')
                  ->join('categories', 'diettypecategories.CatID', '=', 'categories.id')
                  ->select('diettypecategories.*','diettype.Name as diettypeName','diettype.Type as dietType','categories.Name as categoryName')
                  ->where('diettypecategories.id','=',$id)
                  ->get();

              return $diettypecategory;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $diettypecategories = DietTypeCategories::find($id);

         $diettypecategories->DTID = $request->input('DTID');
        $diettypecategories->CatID = $request->input('CatID');
        $diettypecategories->save();

        return "Success updating Diet Type Category #" . $diettypecategories->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $diettypecategories = DietTypeCategories::find($id);

        $diettypecategories->delete();

        return "Diet Type Category record successfully deleted #" . $id;
    }
}
