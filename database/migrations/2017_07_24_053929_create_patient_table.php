<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePatientTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('Patient', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('orgID');
            $table->integer('staffID');
            $table->string('fname');
            $table->string('lname');
            $table->string('DOB');
            $table->string('gender');
            $table->string('email');
            $table->string('image');
            $table->integer('infusionrecordID');
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
        Schema::dropIfExists('Patient');
    }
}
