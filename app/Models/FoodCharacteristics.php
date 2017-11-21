<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class FoodCharacteristics extends Model
{
  	protected $table = 'foodcharacteristics'; 
    protected $fillable = array('FID','CharID');
}
