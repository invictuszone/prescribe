<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodAka extends Model
{
   protected $table = 'foodaka'; 
   protected $fillable = array('FID','Name');
}
