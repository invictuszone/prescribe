<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DietPrescription extends Model
{
    protected $table = 'dietprescriptions';
    protected $fillable = array('PID','jsonobject');
}
