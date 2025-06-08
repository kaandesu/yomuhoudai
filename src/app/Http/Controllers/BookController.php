<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Exception;

class BookController extends Controller
{
    private function jsonResponse($data, $message = '', $status = 200): JsonResponse
    {
        return response()->json(
            [
            'data' => $data,
            'message' => $message,
            ],
            $status
        );
    }

    public function create()
    {
        return $this->jsonResponse([], 'Create endpoint not implemented');
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

            return $this->jsonResponse($book, 'Book created successfully', 201);
        } catch (Exception $e) {
            return $this->jsonResponse([], 'An error occurred while creating the book: ' . $e->getMessage(), 500);
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

            return $this->jsonResponse($book, 'Book updated successfully');
        } catch (Exception $e) {
            return $this->jsonResponse([], 'An error occurred while updating the book: ' . $e->getMessage(), 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $book = Book::findOrFail($id);
            return $this->jsonResponse($book, 'Book retrieved successfully');
        } catch (Exception $e) {
            return $this->jsonResponse([], 'Book not found', 404);
        }
    }

    public function searchTitle(Request $request): JsonResponse
    {
        $q = $request->query('q');
        $results = Book::where('title', 'like', "%$q%")->get();
        return $this->jsonResponse($results, 'Search by title completed');
    }

    public function searchAuthor(Request $request): JsonResponse
    {
        $q = $request->query('q');
        $results = Book::where('author', 'like', "%$q%")->get();
        return $this->jsonResponse($results, 'Search by author completed');
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
            return $this->jsonResponse($books, 'Books retrieved successfully');
        } catch (Exception $e) {
            return $this->jsonResponse([], 'An error occurred while retrieving books: ' . $e->getMessage(), 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $book = Book::find($id);

            if (!$book) {
                return $this->jsonResponse([], 'Book not found', 404);
            }

            $book->delete();

            return $this->jsonResponse([], 'Book deleted successfully');
        } catch (Exception $e) {
            return $this->jsonResponse([], 'An error occurred while deleting the book: ' . $e->getMessage(), 500);
        }
    }
}
