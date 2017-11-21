<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChildDietTypes extends Model
{
    protected $table = 'childdiettype'; 
    protected $fillable = array('DTIDC','DTIDP');
}
