<?php

namespace App\Http\Controllers;

use App\Models\DietTypeCharacteristics;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class DietTypeCharacteristic extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
        		$diettypecharacteristic = DB::table('diettypecharacteristics')
                  ->join('diettype', 'diettypecharacteristics.DTID', '=', 'diettype.id')
                  ->join('characteristics', 'diettypecharacteristics.CharID', '=', 'characteristics.id')
                  ->select('diettypecharacteristics.*','diettype.Name as diettypeName','diettype.Type as dietType','characteristics.Name as characteristicsName')
                  ->get();

              return $diettypecharacteristic;



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
        $diettypecharacteristic = new DietTypeCharacteristics;
        $diettypecharacteristic->DTID   = $request->input('DTID');
        $diettypecharacteristic->CharID = $request->input('CharID');
        $diettypecharacteristic->save();
        return 'Diet Type Characteristic record successfully created with id ' . $diettypecharacteristic->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

              	$diettypecharacteristic = DB::table('diettypecharacteristics')
                  ->join('diettype', 'diettypecharacteristics.DTID', '=', 'diettype.id')
                  ->join('characteristics', 'diettypecharacteristics.CharID', '=', 'characteristics.id')
                  ->select('diettypecharacteristics.*','diettype.Name as diettypeName','diettype.Type as dietType','characteristics.Name as characteristicsName')
                  ->where('diettypecharacteristics.id','=',$id)
                  ->get();

              return $diettypecharacteristic;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $diettypecharacteristic = DietTypeCharacteristics::find($id);

         $diettypecharacteristic->DTID  = $request->input('DTID');
        $diettypecharacteristic->CharID = $request->input('CharID');
        $diettypecharacteristic->save();

        return "Success updating Diet Type Characteristic #" . $diettypecharacteristic->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $diettypecharacteristic = DietTypeCharacteristics::find($id);

        $diettypecharacteristic->delete();

        return "Diet Type Characteristic record successfully deleted #" . $id;
    }
}
