<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class DietTypeCharacteristics extends Model
{
    protected $table = 'diettypecharacteristics'; 
    protected $fillable = array('DTID','CharID');
}
