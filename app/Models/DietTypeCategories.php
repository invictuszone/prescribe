<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class DietTypeCategories extends Model
{
    protected $table = 'diettypecategories'; 
    protected $fillable = array('DTID','CatID');
}
