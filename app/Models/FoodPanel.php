<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodPanel extends Model
{
   protected $table = 'foodpanel'; 
   protected $fillable = array('Name','Type');
}
