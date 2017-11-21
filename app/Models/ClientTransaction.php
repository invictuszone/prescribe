<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientTransaction extends Model
{
		protected $table = 'clienttransaction'; 
    protected $fillable = array('ID','CID', 'TransactionID','Amount','BalanceTransaction','Date');
}
