<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DietType extends Model
{
   protected $table = 'diettype';
    protected $fillable = array('Name','Type', 'created_by');
}
