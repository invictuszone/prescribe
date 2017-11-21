<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
		protected $table = 'staffroles'; 
    protected $fillable = array('ID', 'Name', 'FoodManagement','FoodPanel','DietPrescription');
}
