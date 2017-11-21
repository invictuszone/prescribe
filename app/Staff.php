<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class Staff extends Authenticatable
{
    use Notifiable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $guard = 'staff';
     protected $table = 'staff';
     protected $fillable = array('RID','CID', 'Title','FName','LName','PhoneNo','email','password','Picture');

 		/**
      * The attributes that should be hidden for arrays.
      *
      * @var array
      */
     protected $hidden = [
         'password', 'remember_token',
     ];

     public function setPasswordAttribute($password)
     {
         $this->attributes['password'] = bcrypt($password);
     }
}
