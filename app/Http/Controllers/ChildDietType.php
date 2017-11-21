<?php

namespace App\Http\Controllers;

use App\Models\ChildDietTypes;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class ChildDietType extends Controller
{
 /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        	$childdiettype = DB::table('childdiettype')
                  ->join('diettype', 'childdiettype.DTIDP', '=', 'diettype.id')
                  ->join('diettype', 'childdiettype.DTIDC', '=', 'diettype.id')
                  ->select('childdiettype.*','diettype.Name as diettypeName','diettype.Type as dietType')
                  ->get();

              return $childdiettype;



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
        $childdiettypes        = new ChildDietTypes;
        $childdiettypes->DTIDP = $request->input('DTIDP');
        $childdiettypes->DTIDC = $request->input('DTIDC');
        $childdiettypes->save();
        return 'Child Diet Type record successfully created with id ' . $childdiettypes->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
 
              $childdiettype = DB::table('childdiettype')
                  ->join('diettype', 'childdiettype.DTIDP', '=', 'diettype.id')
                  ->join('diettype', 'childdiettype.DTIDC', '=', 'diettype.id')
                  ->select('childdiettype.*','diettype.Name as diettypeName','diettype.Type as dietType')
                  ->where('childdiettype.id','=',$id)
                  ->get();

              return $childdiettype;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $childdiettypes        = ChildDietTypes::find($id);
        $childdiettypes->DTIDP = $request->input('DTIDP');
        $childdiettypes->DTIDC = $request->input('DTIDC');
        $childdiettypes->save();

        return "Success updating Child Diet Type #" . $childdiettypes->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $childdiettypes = ChildDietTypes::find($id);

        $childdiettypes->delete();

        return "Child Diet Type record successfully deleted #" . $id;
    }
}
