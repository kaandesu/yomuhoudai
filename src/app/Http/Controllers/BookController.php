<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BookController extends Controller
{
    public function create()
    {
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'status' => 'nullable|in:completed,ongoing,on-hold,plan-to-read,dropped',
            'categories' => 'nullable|array',
            'currentPage' => 'nullable|string',
            'cover' => 'nullable|string',
            'description' => 'nullable|string',
            'pageCount' => 'nullable|string',
            'language' => 'nullable|string',
            'publisher' => 'nullable|string',
            'publishedDate' => 'nullable|string',
            'averageRating' => 'nullable|string',
            'ratingsCount' => 'nullable|string',
        ]);

        $book = Book::create($data);
        return response()->json($book, 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $book = Book::findOrFail($id);

        $data = $request->validate([
            'title' => 'sometimes|required|string',
            'author' => 'sometimes|required|string',
            'status' => 'nullable|required|in:completed,ongoing,on-hold,plan-to-read,dropped',
            'categories' => 'nullable|array',
            'currentPage' => 'nullable|string',
            'cover' => 'nullable|string',
            'description' => 'nullable|string',
            'pageCount' => 'nullable|string',
            'language' => 'nullable|string',
            'publisher' => 'nullable|string',
            'publishedDate' => 'nullable|string',
            'averageRating' => 'nullable|string',
            'ratingsCount' => 'nullable|string',
        ]);

        $book->update($data);
        return response()->json($book);
    }

    public function show($id): JsonResponse
    {
        $book = Book::findOrFail($id);
        return response()->json($book);
    }

    public function searchTitle(Request $request): JsonResponse
    {
        $q = $request->query('q');
        return response()->json(Book::where('title', 'like', "%$q%") ->get());
    }

    public function searchAuthor(Request $request): JsonResponse
    {
        $q = $request->query('q');
        return response()->json(Book::where('author', 'like', "%$q%") ->get());
    }

    public function index(Request $request): JsonResponse
    {
        $sort = $request->query('sort_by');
        $query = Book::query();

        if ($sort && in_array($sort, ['title', 'author'])) {
            $query->orderBy($sort);
        }

        return response()->json($query->get());
    }

    public function destroy($id): JsonResponse
    {
        if (!Book::find($id)) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        Book::destroy($id);
        return response()->json(['code' => 200], 200);
    }
}
