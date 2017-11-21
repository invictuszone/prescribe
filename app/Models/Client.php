<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
		protected $table = 'client';
    protected $fillable = array('id', 'OrgID','PackID','OrgName','Title','FName','LName','PhoneNo','OfficeNo','Email','City','State','Country','Address','Logo');
}
