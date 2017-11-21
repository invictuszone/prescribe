<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFOODITEMTABLE extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fooditems', function (Blueprint $table) {
           $table->increments('id')->unique();
           $table->string('Name');
           $table->boolean('ImmuneReaction');
           $table->boolean('Foodlist');
           $table->boolean('Comprehensivelist');
           $table->timestamps();
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
              Schema::drop('fooditems');

    }
}
