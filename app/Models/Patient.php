<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $table = 'patient';
    protected $fillable = array('orgID','staffID','CID','fname','lname','DOB','gender','email','image','infusionrecordID');
}
