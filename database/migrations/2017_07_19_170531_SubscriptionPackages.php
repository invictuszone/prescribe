<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SubscriptionPackages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up() {
        Schema::create('SubscriptionPackages', function (Blueprint $table) {
            $table->increments('ID')->unique();
            $table->string('Name');
            $table->string('NoOfPeople');
            $table->string('Price');
            $table->string('NoOfPatients');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('SubscriptionPackages');
    }
}
