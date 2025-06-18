<?php

namespace Tests\Feature;

use App\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_store_book_with_full_payload()
    {
        $payload = [
            'title' => 'Brave New World',
            'author' => 'Aldous Huxley',
            'status' => 'completed',
            'categories' => ['dystopian', 'sci-fi'],
            'currentPage' => 288,
            'cover' => 'url_to_cover',
            'description' => 'A dystopian novel.',
            'pageCount' => 288,
            'publishedDate' => '1932-01-01',
            'rating' => 9,
        ];

        $response = $this->postJson('/api/v1/books', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment(
                ['title' => 'Brave New World']
            );

        $this->assertDatabaseHas('books', ['title' => 'Brave New World']);
    }

    public function test_store_duplicate_book_returns_409()
    {
        Book::create([
            'title' => '1984',
            'author' => 'George Orwell'
        ]);

        $payload = [
            'title' => '1984',
            'author' => 'George Orwell'
        ];

        $response = $this->postJson('/api/v1/books', $payload);
        $response->assertStatus(409);
    }

    public function test_can_update_book()
    {
        $book = Book::create([
            'title' => 'Old Title',
            'author' => 'Old Author'
        ]);

        $update = ['title' => 'New Title'];

        $response = $this->putJson("/api/v1/books/{$book->id}", $update);
        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'New Title']);
    }

    public function test_update_nonexistent_book_returns_500()
    {
        $response = $this->putJson('/api/v1/books/9999', ['title' => 'No Book']);
        $response->assertStatus(500);
    }

    public function test_can_show_book()
    {
        $book = Book::create([
            'title' => 'Test Show',
            'author' => 'Tester'
        ]);

        $response = $this->getJson("/api/v1/books/{$book->id}");
        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Test Show']);
    }

    public function test_show_nonexistent_book_returns_404()
    {
        $response = $this->getJson('/api/v1/books/9999');
        $response->assertStatus(404);
    }

    public function test_search_title_returns_results()
    {
        Book::create(['title' => 'Search Match', 'author' => 'A']);
        Book::create(['title' => 'No Match', 'author' => 'B']);

        $response = $this->getJson('/api/v1/books/search/title?q=Search');
        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Search Match']);
    }

    public function test_search_author_returns_results()
    {
        Book::create(['title' => 'A', 'author' => 'Author Match']);
        Book::create(['title' => 'B', 'author' => 'Unrelated']);

        $response = $this->getJson('/api/v1/books/search/author?q=Match');
        $response->assertStatus(200)
                 ->assertJsonFragment(['author' => 'Author Match']);
    }
}
