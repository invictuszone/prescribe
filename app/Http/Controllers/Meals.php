<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class Meals extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
            return Meal::orderBy('id', 'asc')->get();
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
        $meal = new Meal;

        $meal->Name              = $request->input('Name');
        $meal->save(); 

        return 'Meal record successfully created with id ' . $meal->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
    	 return Meal::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $meal = Meal::find($id);

        $meal->Name              = $request->input('Name');
        $meal->save(); 

        return "Success updating Meal #" . $meal->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
   	 public function destroy($id) {
        $meal = Meal::find($id);
        $meal->delete();
        return "Meal record successfully deleted #" . $id;
    }
}
