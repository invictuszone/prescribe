<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientHistory extends Model
{
    protected $table = 'patienthistory';
    protected $fillable = array('pid','prescriptionDate','filename','filetype');
}
