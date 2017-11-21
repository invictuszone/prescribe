<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodItem extends Model
{
   	protected $table = 'fooditems';
    protected $fillable = array('Name','Order','ImmuneReaction','Foodlist','Comprehensivelist');
}
