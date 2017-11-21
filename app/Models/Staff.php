<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
		protected $table = 'staff';
    protected $fillable = array('RID','CID', 'Title','FName','LName','PhoneNo','Password','Email','Picture');

		/**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
/*    protected $hidden = [
        'password', 'remember_token',
    ];*/

   /* public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }*/
}
