<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Client extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
       Schema::create('Client', function (Blueprint $table) {
           $table->increments('UID')->unique();
           $table->integer('OrgID');
           $table->integer('PackID');
           $table->string('FName');
           $table->string('LName');
           $table->integer('PhoneNo');
           $table->string('Email');
           $table->string('City');
           $table->string('State');
           $table->string('Country');
           $table->string('Address');
           $table->string('Logo');

       });
     }

     /**
      * Reverse the migrations.
      *
      * @return void
      */
     public function down()
     {
         Schema::drop('Client');
     }
}
