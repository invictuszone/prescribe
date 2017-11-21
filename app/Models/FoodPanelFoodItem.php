<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodPanelFoodItem extends Model
{
    protected $table = 'foodpanelfooditems'; 
    protected $fillable = array('FPCID','PID','FID');
}
