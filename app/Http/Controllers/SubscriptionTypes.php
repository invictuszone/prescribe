<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionType;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class SubscriptionTypes extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
            return SubscriptionType::orderBy('id', 'asc')->get();
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
        $subscriptiontypes = new SubscriptionType;

        $subscriptiontypes->Name = $request->input('Name');
        $subscriptiontypes->NoOfPeople = $request->input('NoOfPeople');
        $subscriptiontypes->Price = $request->input('Price');
        $subscriptiontypes->NoOfPatients = $request->input('NoOfPatients');
        $subscriptiontypes->save();

        return $subscriptiontypes;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        return SubscriptionType::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $subscriptiontypes = SubscriptionType::find($id);

        $subscriptiontypes->Name = $request->input('Name');
        $subscriptiontypes->NoOfPeople = $request->input('NoOfPeople');
        $subscriptiontypes->Price = $request->input('Price');
        $subscriptiontypes->NoOfPatients = $request->input('NoOfPatients');
        $subscriptiontypes->save();

        return $subscriptiontypes;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request, $id) {
        $subscriptiontypes = SubscriptionType::find($id);

        $subscriptiontypes->delete();

        return "Subscription record successfully deleted #" . $request->input('id');
    }
}
