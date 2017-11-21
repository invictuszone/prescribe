<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredients extends Model
{
    protected $table = 'ingredients'; 
    protected $fillable = array('RID','FID','Qty','Units','Comments');
}
