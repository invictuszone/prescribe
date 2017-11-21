<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrescriptionReaction extends Model
{
    protected $table = 'prescriptionreactions'; 
    protected $fillable = array('DPID','PanelID','Level1','Level2','Level3','Level4');
}
