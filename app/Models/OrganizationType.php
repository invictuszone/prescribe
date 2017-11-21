<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrganizationType extends Model
{
		protected $table = 'organizationtypes';
		protected $fillable = [
        'Name',
    ];
    //protected $fillable = array('ID', 'Name');
}
