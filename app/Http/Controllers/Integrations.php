<?php

namespace App\Http\Controllers;

use App\Models\Integration;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;



class Integrations extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($cid,$id = null) {
      if ($id == null) {
          $integration = DB::table('integration')
                        ->select('integration.*')
                        ->where('CID', '=' , $cid )
                        ->get();
            return $integration;
        } else {
            return $this->show($integration->$id);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {
        $integration = new integration;

        $integration->Name = $request->input('Name');
        $integration->CID = $request->input('CID');
        $integration->EncryptedKey = $request->input('EncryptedKey');
        $integration->save();

        return 'Integration record successfully created with id ' . $integration->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
         $integration = DB::table('integration')
                  ->join('client', 'integration.CID', '=', 'client.id')
                  ->select('integration.*','client.FName as clientFName','client.LName as clientLName')
                  ->where('integration.id','=',$id)
                  ->get();

              return $integration;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $integration = Integration::find($id);

        $integration->Name = $request->input('Name');
        $integration->EncryptedKey = $request->input('EncryptedKey');
        $integration->save();

        return "Sucess updating Integration #" . $integration->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
   /* public function destroy($id) {
        $integration = Integration::find($id);

        $integration->delete();

        return "Integration record successfully deleted #" . $id;
    }*/
}
