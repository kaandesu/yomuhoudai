<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use Faker\Generator as Faker;

$factory->define(
    Book::class,
    function (Faker $faker) {
        return [
            'title' => $faker->sentence(3),
            'author' => $faker->name,
            'status' => $faker->randomElement(['completed', 'ongoing', 'on-hold', 'plan-to-read', 'dropped']),
            'categories' => [$faker->word, $faker->word],
            'currentPage' => $faker->numberBetween(0, 300),
            'cover' => $faker->imageUrl(200, 300, null, true), // no invalid category
            'description' => $faker->paragraph,
            'pageCount' => $faker->numberBetween(100, 1000),
            'publishedDate' => $faker->date('Y-m-d'),
            'rating' => $faker->numberBetween(1, 10),
        ];
    }
);
