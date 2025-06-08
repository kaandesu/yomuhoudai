<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'books',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('title');
                $table->string('author');
                $table->string('currentPage')->nullable();
                $table->string('cover')->nullable();
                $table->text('description')->nullable();
                $table->json('categories')->nullable();
                $table->string('pageCount')->nullable();
                $table->string('publishedDate')->nullable();
                $table->string('averageRating')->nullable();
                $table->enum('status', ['completed', 'ongoing', 'on-hold', 'plan-to-read', 'dropped'])->nullable();
                $table->timestamps();
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
