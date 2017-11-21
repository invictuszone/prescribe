<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PHistory extends Model
{
    protected $table = 'patienthistory';
    protected $fillable = array('pid','prescriptionDate','comments','Status','files');
}
