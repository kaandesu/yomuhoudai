<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title', 'author', 'currentPage', 'cover', 'description', 'categories',
        'pageCount', 'language', 'publisher', 'publishedDate',
        'averageRating', 'ratingsCount', 'added', 'status'
    ];

    protected $casts = [
        'categories' => 'array',
        'added' => 'boolean'
    ];
}
