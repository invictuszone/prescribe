<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Integration extends Model
{
		protected $table = 'integration'; 
    protected $fillable = array('ID', 'Name','CID', 'EncryptedKey');
}
