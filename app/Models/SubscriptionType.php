<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscriptionType extends Model
{
		protected $table = 'subscriptionpackages'; 
    protected $fillable = array('ID', 'Name','NoOfPeople', 'Price','NoOfPatients');
}
