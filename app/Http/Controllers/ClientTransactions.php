<?php

namespace App\Http\Controllers;

use App\Models\ClientTransaction;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
//use App\Stripe\init.php;
//use App\Stripe\lib\Stripe.php;


class ClientTransactions extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($id = null) {
        if ($id == null) {
            return ClientTransaction::orderBy('ID', 'asc')->get();
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
        $clienttransaction = new ClientTransaction;

       $clienttransaction->CID = $request->input('CID');
        $clienttransaction->TransactionID = $request->input('TransactionID');
        $clienttransaction->Amount = $request->input('Amount');
        $clienttransaction->BalanceTransaction = $request->input('BalanceTransaction');
        $clienttransaction->Date = $request->input('Date');
        $clienttransaction->save(); 

        return 'Client Transaction record successfully created with id ' . $clienttransaction->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        return ClientTransaction::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $clienttransaction = ClientTransaction::find($id);

         $clienttransaction->CID = $request->input('CID');
        $clienttransaction->TransactionID = $request->input('TransactionID');
        $clienttransaction->Amount = $request->input('Amount');
        $clienttransaction->BalanceTransaction = $request->input('BalanceTransaction');
        $clienttransaction->Date = $request->input('Date');
        $clienttransaction->save();

        return "Sucess updating Client Transaction #" . $clienttransaction->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
  /*  public function destroy(Request $request) {
        $clienttransaction = ClientTransaction::find($request->input('ID'));

        $clienttransaction->delete();

        return "Client Transaction record successfully deleted #" . $request->input('ID');
    }*/
}
