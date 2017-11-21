<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrescriptionDietType extends Model
{
    protected $table = 'prescriptiondiettypes'; 
    protected $fillable = array('DPID','DTID','Type','ExperimentationLevel');
}
