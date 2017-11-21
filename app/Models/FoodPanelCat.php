<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodPanelCat extends Model
{
    protected $table = 'foodpanelcategory'; 
    protected $fillable = array('PID','CatID');
}
