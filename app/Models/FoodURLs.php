<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class FoodURLs extends Model
{
    protected $table = 'foodurls'; 
    protected $fillable = array('FID','Name','URL');
}
