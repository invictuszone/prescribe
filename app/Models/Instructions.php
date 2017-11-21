<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instructions extends Model
{
    protected $table = 'recipeinstructions'; 
    protected $fillable = array('RID','instruction');
}
