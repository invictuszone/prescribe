<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
     {
       Schema::create('Staff', function (Blueprint $table) {
           $table->increments('ID')->unique();
           $table->integer('RID');
           $table->integer('CID');
           $table->string('Title');
           $table->string('FName');
           $table->string('LName');
           $table->integer('PhoneNo');
           $table->string('Email');
           $table->string('Picture');
       });
     }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
         Schema::drop('Staff');
     }
}
