<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get(
    '/user',
    function (Request $request) {
        return $request->user();
    }
);

Route::prefix('v1')->
    group(
        function () {
            Route::get('/books', 'BookController@index');
            Route::get('/books/{id}', 'BookController@show');
            Route::post('/books', 'BookController@store');
            Route::put('/books/{id}', 'BookController@update');
            Route::delete('/books/{id}', 'BookController@destroy');

            Route::get('/books/search/title', 'BookController@searchTitle');
            Route::get('/books/search/author', 'BookController@searchAuthor');

            // TODO: Uncomment when implemented
            // Route::get('/books/export/csv/{type}/{search?}', 'BookController@exportToCSV');
            // Route::get('/books/export/xml/{type}/{search?}', 'BookController@exportToXML');
        }
    );

Route::get(
    '/status',
    function () {
        return response()->json(
            [
            'status' => 'ok',
            'timestamp' => now()->toDateTimeString()
            ]
        );
    }
);
