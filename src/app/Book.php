<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kyslik\ColumnSortable\Sortable;

class Book extends Model
{
    use Sortable;

    protected $fillable = [
        'title', 'author', 'currentPage', 'cover', 'description', 'categories',
        'pageCount', 'publishedDate',
        'rating', 'status'
    ];

    protected $casts = [
        'categories' => 'array',
    ];

    protected $sortable = ['title', 'author'];
}
