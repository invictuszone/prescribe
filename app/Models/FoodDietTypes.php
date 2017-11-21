<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class FoodDietTypes extends Model
{
    protected $table = 'fooddiettypes'; 
    protected $fillable = array('FID','DTID');
}
