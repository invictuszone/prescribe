<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;

class Roles extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
            $user   = Auth::user();
            $roles = Role::orderBy('id', 'asc')->where('CID', '=' , $user->CID )->get();
            for ($i=0; $i < sizeof($roles) ; $i++) {
              $roles[$i]['FoodManagement']   = explode(',' , $roles[$i]['FoodManagement']);
              $roles[$i]['FoodPanel']        = explode(',' , $roles[$i]['FoodPanel']);
              $roles[$i]['DietPrescription'] = explode(',' , $roles[$i]['DietPrescription']);
            }
            return $roles;
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
        $user   = Auth::user();
        $role = new Role;
        $role->CID               = $user->CID;
        $role->Name              = $request->input('Name');
        $role->FoodManagement    = $request->input('FMR').','.$request->input('FMA').','.$request->input('FME').','.$request->input('FMD');
        $role->FoodPanel         = $request->input('FPR').','.$request->input('FPA').','.$request->input('FPE').','.$request->input('FPD');
        $role->DietPrescription  = $request->input('DPR').','.$request->input('DPA').','.$request->input('DPE').','.$request->input('DPD');

        $role->save();

        $role = Role::find($role->id);
        $role['FoodManagement']   = explode(',' , $role['FoodManagement']);
        $role['FoodPanel']        = explode(',' , $role['FoodPanel']);
        $role['DietPrescription'] = explode(',' , $role['DietPrescription']);

        return $role;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        return Role::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $role = Role::find($id);

        $role->Name              = $request->input('Name');
        $role->FoodManagement    = $request->input('FMR').','.$request->input('FMA').','.$request->input('FME').','.$request->input('FMD');
        $role->FoodPanel         = $request->input('FPR').','.$request->input('FPA').','.$request->input('FPE').','.$request->input('FPD');
        $role->DietPrescription  = $request->input('DPR').','.$request->input('DPA').','.$request->input('DPE').','.$request->input('DPD');

        $role->save();

        $role = Role::find($role->id);
        $role['FoodManagement']   = explode(',' , $role['FoodManagement']);
        $role['FoodPanel']        = explode(',' , $role['FoodPanel']);
        $role['DietPrescription'] = explode(',' , $role['DietPrescription']);

        return $role;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request, $id) {
        $role = Role::find($id);

        $role->delete();

        return "Role record successfully deleted #" . $id;
    }
}
