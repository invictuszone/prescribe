<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIntegrationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
     {
       Schema::create('Integration', function (Blueprint $table) {
           $table->increments('ID')->unique();
           $table->string('Name');
           $table->integer('CID');
           $table->string('EncryptedKey');
       });
     }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
     {
         Schema::drop('Integration');
     }
}
