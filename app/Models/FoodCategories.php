<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class FoodCategories extends Model
{
   	protected $table = 'foodcategories'; 
    protected $fillable = array('FID','CatID');
}
