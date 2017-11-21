<?php

namespace App\Http\Controllers;

use App\Models\OrganizationType;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class OrganizationTypes extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
            return OrganizationType::orderBy('id', 'asc')->get();
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
        $organizationtypes = new OrganizationType;

        $organizationtypes->Name = $request->input('Name');
        $organizationtypes->save();

        return $organizationtypes;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        return OrganizationType::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $organizationtypes = OrganizationType::findOrFail($id);

        $organizationtypes->Name = $request->input('Name');
        $organizationtypes->save();

        // $organizationtypes = OrganizationType::find($id);
        return $organizationtypes;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request,$id) {
        $organizationtypes = OrganizationType::find($id);

        $organizationtypes->delete();

        return "Organization record successfully deleted #" . $organizationtypes;
    }
}
