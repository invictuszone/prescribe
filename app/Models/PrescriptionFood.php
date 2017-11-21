<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrescriptionFood extends Model
{
    protected $table = 'prescriptionfoods'; 
    protected $fillable = array('DPID','FID','Allowed','PRA','PRG','PRE','PRLevel','ExperimentationLevel','In_Out');
}
