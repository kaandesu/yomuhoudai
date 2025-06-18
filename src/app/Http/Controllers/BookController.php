<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Services\BookExportService;
use Exception;
use App\Rules\NoHtml;

/**
 * @OA\Info(
 *     title="Yomuhoudai API",
 *     version="1.0.0",
 *     description="API for managing Yomuhoudai book tracker",
 *     @OA\Contact(
 *         email="kaandesu00@gmail.com"
 *     )
 * )
 *
 * @OA\Schema(
 *     schema="Book",
 *     type="object",
 *     required={"title", "author"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="The Great Gatsby"),
 *     @OA\Property(property="author", type="string", example="F. Scott Fitzgerald"),
 *     @OA\Property(property="status", type="string", example="completed"),
 *     @OA\Property(property="categories", type="array", @OA\Items(type="string")),
 *     @OA\Property(property="currentPage", type="integer", example=100),
 *     @OA\Property(property="cover", type="string", example="url_to_cover_image"),
 *     @OA\Property(property="description", type="string", example="A novel about the American dream."),
 *     @OA\Property(property="pageCount", type="integer", example=200),
 *     @OA\Property(property="publishedDate", type="string", example="1925-04-10"),
 *     @OA\Property(property="rating", type="integer", example=4),
 * )
 */
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

    /**
     * @OA\Post(
     *     path="/api/v1/books",
     *     tags={"Books"},
     *     summary="Create a new book",
     *     description="Creates a new book record in the database",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "author"},
     *             @OA\Property(property="title", type="string", example="The Great Gatsby"),
     *             @OA\Property(property="author", type="string", example="F. Scott Fitzgerald"),
     *             @OA\Property(property="status", type="string", example="completed"),
     *             @OA\Property(property="categories", type="array", @OA\Items(type="string")),
     *             @OA\Property(property="currentPage", type="integer", example=100),
     *             @OA\Property(property="cover", type="string", example="url_to_cover_image"),
     *             @OA\Property(property="description", type="string", example="A novel about the American dream."),
     *             @OA\Property(property="pageCount", type="integer", example=200),
     *             @OA\Property(property="publishedDate", type="string", example="1925-04-10"),
     *             @OA\Property(property="rating", type="integer", example=8),
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Book created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Book")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */
    public function create()
    {
        return $this->jsonResponse([], 'Create endpoint not implemented');
    }

    /**
     * @OA\Post(
     *     path="/api/v1/books",
     *     tags={"Books"},
     *     summary="Store a new book",
     *     description="Stores a newly created book",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "author"},
     *             @OA\Property(property="title", type="string", example="The Catcher in the Rye"),
     *             @OA\Property(property="author", type="string", example="J.D. Salinger"),
     *             @OA\Property(property="status", type="string", example="ongoing"),
     *             @OA\Property(property="categories", type="array", @OA\Items(type="string")),
     *             @OA\Property(property="currentPage", type="string", example="150"),
     *             @OA\Property(property="cover", type="string", example="url_to_cover_image"),
     *             @OA\Property(property="description", type="string", example="A novel about teenage angst."),
     *             @OA\Property(property="pageCount", type="integer", example=277),
     *             @OA\Property(property="publishedDate", type="string", example="1951-07-16"),
     *             @OA\Property(property="rating", type="integer", example=9),
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Book created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Book")
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate(
                [
                'title' => ['required', 'string', new NoHtml()],
                'author' => ['required', 'string', new NoHtml()],
                'status' => ['nullable', 'in:completed,ongoing,on-hold,plan-to-read,dropped'],
                'categories' => 'nullable|array',
                'currentPage' => ['nullable', 'integer'],
                'cover' => ['nullable', 'string', new NoHtml()],
                'description' => ['nullable', 'string', new NoHtml()],
                'pageCount' => ['nullable', 'integer', 'min:0'],
                'publishedDate' => ['nullable', 'string', new NoHtml()],
                'rating' => ['nullable', 'integer'],
            ]
            );

            // Check if book already exists
            $exists = Book::where('title', $validated['title'])
                          ->where('author', $validated['author'])
                          ->first();

            if ($exists) {
                return $this->jsonResponse($exists, 'A book with the same title and author already exists!', 409);
            }

            // Set defaults
            $defaults = [
                'status' => 'plan-to-read',
                'pageCount' => 0,
                'currentPage' => 0,
                'rating' => 0,
            ];

            $data = array_merge($defaults, $validated);

            $book = Book::create($data);

            return $this->jsonResponse($book, 'Book created successfully', 201);
        } catch (Exception $e) {
            return $this->jsonResponse([], 'An error occurred while creating the book: ' . $e->getMessage(), 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/v1/books/{id}",
     *     tags={"Books"},
     *     summary="Update a book",
     *     description="Updates a book record",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string", example="The Great Gatsby"),
     *             @OA\Property(property="author", type="string", example="F. Scott Fitzgerald"),
     *             @OA\Property(property="status", type="string", example="completed"),
     *             @OA\Property(property="categories", type="array", @OA\Items(type="string")),
     *             @OA\Property(property="currentPage", type="integer", example=200),
     *             @OA\Property(property="cover", type="string", example="url_to_cover_image"),
     *             @OA\Property(property="description", type="string", example="A novel about the American dream."),
     *             @OA\Property(property="pageCount", type="integer", example=200),
     *             @OA\Property(property="publishedDate", type="string", example="1925-04-10"),
     *             @OA\Property(property="rating", type="integer", example=5),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Book updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Book")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Book not found"
     *     )
     * )
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $book = Book::findOrFail($id);

            $data = $request->validate(
                [
                'title' => ['sometimes', 'required', 'string', new NoHtml()],
                'author' => ['sometimes', 'required', 'string', new NoHtml()],
                'status' => ['nullable', 'in:completed,ongoing,on-hold,plan-to-read,dropped'],
                'categories' => 'nullable|array',
                'currentPage' => ['nullable', 'integer'],
                'cover' => ['nullable', 'string', new NoHtml()],
                'description' => ['nullable', 'string', new NoHtml()],
                'pageCount' => ['nullable', 'integer', 'min:0'],
                'publishedDate' => ['nullable', 'string', new NoHtml()],
                'rating' => ['nullable', 'integer'],
            ]
            );

            $book->update($data);

            return $this->jsonResponse($book, 'Book updated successfully');
        } catch (Exception $e) {
            return $this->jsonResponse([], 'An error occurred while updating the book: ' . $e->getMessage(), 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/v1/books/{id}",
     *     tags={"Books"},
     *     summary="Get a book by ID",
     *     description="Retrieve a book by its unique ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(ref="#/components/schemas/Book")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Book not found"
     *     )
     * )
     */
    public function show($id): JsonResponse
    {
        try {
            $book = Book::findOrFail($id);
            return $this->jsonResponse($book, 'Book retrieved successfully');
        } catch (Exception $e) {
            return $this->jsonResponse([], 'Book not found', 404);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/v1/books/search/title",
     *     tags={"Books"},
     *     summary="Search books by title",
     *     description="Search for books using a partial title match",
     *     @OA\Parameter(
     *         name="q",
     *         in="query",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Book"))
     *     )
     * )
     */
    public function searchTitle(Request $request): JsonResponse
    {
        $q = $request->query('q');
        $perPage = $request->query('per_page', 5);

        $results = Book::where('title', 'like', "%$q%")
            ->sortable()
            ->paginate($perPage)
            ->appends($request->query());

        return $this->jsonResponse($results, 'Search by title completed');
    }

    /**
     * @OA\Get(
     *     path="/api/v1/books/search/author",
     *     tags={"Books"},
     *     summary="Search books by author",
     *     description="Search for books using a partial author match",
     *     @OA\Parameter(
     *         name="q",
     *         in="query",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Book"))
     *     )
     * )
     */
    public function searchAuthor(Request $request): JsonResponse
    {
        $q = $request->query('q');
        $perPage = $request->query('per_page', 5);

        $results = Book::where('author', 'like', "%$q%")
            ->sortable()
            ->paginate($perPage)
            ->appends($request->query());

        return $this->jsonResponse($results, 'Search by author completed');
    }

    /**
     * @OA\Get(
     *     path="/api/v1/books",
     *     tags={"Books"},
     *     summary="Get all books",
     *     description="Retrieve a list of all books",
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Book"))
     *     )
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/api/v1/books/{id}",
     *     tags={"Books"},
     *     summary="Delete a book",
     *     description="Deletes a book by its ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Book deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Book not found"
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/v1/books/export",
     *     tags={"Books"},
     *     summary="Export books data",
     *     description="Export book data in CSV or XML format. Returns a downloadable file.",
     *     @OA\Parameter(
     *         name="type",
     *         in="query",
     *         required=false,
     *         description="Fields to export (titles, authors, titles_and_authors)",
     *         @OA\Schema(type="string", enum={"titles", "authors", "titles_and_authors"}, default="titles_and_authors")
     *     ),
     *     @OA\Parameter(
     *         name="format",
     *         in="query",
     *         required=false,
     *         description="Export format (csv or xml)",
     *         @OA\Schema(type="string", enum={"csv", "xml"}, default="csv")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Exported file (CSV or XML)"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Export failed",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Export failed: No books found.")
     *         )
     *     )
     * )
     */
    public function export(Request $request)
    {
        $type = $request->query('type', 'titles_and_authors');
        $format = $request->query('format', 'csv');

        try {
            $service = new BookExportService(); // Make sure this class exists and is imported
            $exportData = $service->export($type, $format);

            $filename = "books_export." . $format;

            return Response::make(
                $exportData,
                200,
                [
                    'Content-Type' => $format === 'csv' ? 'text/csv' : 'application/xml',
                    'Content-Disposition' => "attachment; filename=\"$filename\"",
                ]
            );
        } catch (Exception $e) {
            return response()->json(['message' => 'Export failed: ' . $e->getMessage()], 500);
        }
    }

}
