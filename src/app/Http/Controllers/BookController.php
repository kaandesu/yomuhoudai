<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Exception;

class BookController extends Controller
{
    public function create()
    {
        // Not implemented
        return response()->json(
            [
            'code' => 200,
            'data' => [],
            'message' => 'Create endpoint not implemented'
            ],
            200
        );
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $data = $request->validate(
                [
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
                ]
            );

            $book = Book::create($data);

            return response()->json(
                [
                'code' => 201,
                'data' => $book,
                'message' => 'Book created successfully'
            ],
                201
            );
        } catch (Exception $e) {
            return response()->json(
                [
                'code' => 500,
                'data' => [],
                'message' => 'An error occurred while creating the book: ' . $e->getMessage()
            ],
                500
            );
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $book = Book::findOrFail($id);

            $data = $request->validate(
                [
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
                ]
            );

            $book->update($data);

            return response()->json(
                [
                'code' => 200,
                'data' => $book,
                'message' => 'Book updated successfully'
                ]
            );
        } catch (Exception $e) {
            return response()->json(
                [
                'code' => 500,
                'data' => [],
                'message' => 'An error occurred while updating the book: ' . $e->getMessage()
                ],
                500
            );
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $book = Book::findOrFail($id);

            return response()->json(
                [
                'code' => 200,
                'data' => $book,
                'message' => 'Book retrieved successfully'
                ]
            );
        } catch (Exception $e) {
            return response()->json(
                [
                'code' => 404,
                'data' => [],
                'message' => 'Book not found'
                ],
                404
            );
        }
    }

    public function searchTitle(Request $request): JsonResponse
    {
        $q = $request->query('q');

        $results = Book::where('title', 'like', "%$q%")->get();

        return response()->json(
            [
            'code' => 200,
            'data' => $results,
            'message' => 'Search by title completed'
            ]
        );
    }

    public function searchAuthor(Request $request): JsonResponse
    {
        $q = $request->query('q');

        $results = Book::where('author', 'like', "%$q%")->get();

        return response()->json(
            [
            'code' => 200,
            'data' => $results,
            'message' => 'Search by author completed'
            ]
        );
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $sort = $request->query('sort_by');
            $query = Book::query();

            if ($sort && in_array($sort, ['title', 'author'])) {
                $query->orderBy($sort);
            }

            $books = $query->get();

            return response()->json(
                [
                'code' => 200,
                'data' => $books,
                'message' => 'Books retrieved successfully'
                ]
            );
        } catch (Exception $e) {
            return response()->json(
                [
                'code' => 500,
                'data' => [],
                'message' => 'An error occurred while retrieving books: ' . $e->getMessage()
                ],
                500
            );
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $book = Book::find($id);

            if (!$book) {
                return response()->json(
                    [
                    'code' => 404,
                    'data' => [],
                    'message' => 'Book not found'
                    ],
                    404
                );
            }

            $book->delete();

            return response()->json(
                [
                'code' => 200,
                'data' => [],
                'message' => 'Book deleted successfully'
                ]
            );
        } catch (Exception $e) {
            return response()->json(
                [
                'code' => 500,
                'data' => [],
                'message' => 'An error occurred while deleting the book: ' . $e->getMessage()
                ],
                500
            );
        }
    }
}
