<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIngredientTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('Ingredients', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('RID');
            $table->string('Name');
            $table->integer('Qty');
            $table->string('Units');
            $table->string('Comments');
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
      Schema::dropIfExists('Ingredients');
    }
}
