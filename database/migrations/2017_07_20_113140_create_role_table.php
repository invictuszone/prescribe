<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
       Schema::create('StaffRoles', function (Blueprint $table) {
           $table->increments('ID')->unique();
           $table->string('Name');
           $table->string('FoodManagement');
           $table->string('FoodPanel');
           $table->string('DietPrescription');
       });
     }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
   public function down()
     {
         Schema::drop('StaffRoles');
     }
}
