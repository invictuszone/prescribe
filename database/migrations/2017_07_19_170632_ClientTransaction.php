<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ClientTransaction extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
       Schema::create('ClientTransaction', function (Blueprint $table) {
           $table->increments('ID')->unique();
           $table->integer('CID');
           $table->string('TransactionID');
           $table->integer('Amount');
           $table->string('BalanceTransaction');
           $table->string('Date');

       });
     }

     /**
      * Reverse the migrations.
      *
      * @return void
      */
     public function down()
     {
         Schema::drop('ClientTransaction');
     }
}
