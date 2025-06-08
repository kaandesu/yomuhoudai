<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title', 'author', 'currentPage', 'cover', 'description', 'categories',
        'pageCount', 'publishedDate',
        'averageRating', 'added', 'status'
    ];

    protected $casts = [
        'categories' => 'array',
        'added' => 'boolean'
    ];
}
