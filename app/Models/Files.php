<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Files extends Model
{
   	protected $table = 'files';
    protected $fillable = array('dietprescriptionid','pid','name');
}