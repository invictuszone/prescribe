<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserUnits extends Model
{
   protected $table = 'units';
   protected $fillable = array('unit_name','abbrivation');
}
