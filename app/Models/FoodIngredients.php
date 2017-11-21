<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodIngredients extends Model
{
    protected $table = 'foodingredients'; 
    protected $fillable = array('FID','IID');
}
