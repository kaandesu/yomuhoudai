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
            ->assertJsonFragment(['title' => 'Brave New World']);

        $this->assertDatabaseHas('books', ['title' => 'Brave New World']);
    }

    public function test_can_create_book_with_japanese_characters()
    {
        $response = $this->postJson('/api/v1/books', [
            'title' => '吾輩は猫である',
            'author' => '夏目漱石',
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => '吾輩は猫である']);
    }

    public function test_can_create_book_with_emojis()
    {
        $response = $this->postJson('/api/v1/books', [
            'title' => '🌟 Star Book 📚',
            'author' => 'John ✍️',
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => '🌟 Star Book 📚']);
    }

    public function test_cannot_create_book_with_extremely_long_title()
    {
        $longTitle = str_repeat('A', 1001);

        $response = $this->postJson('/api/v1/books', [
            'title' => $longTitle,
            'author' => 'Some Author',
        ]);

        $response->assertStatus(500);
    }

    public function test_can_create_book_with_special_symbols()
    {
        $response = $this->postJson('/api/v1/books', [
            'title' => '@#$%^&*()_+{}|:"?~`',
            'author' => 'Symbol Author',
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => '@#$%^&*()_+{}|:"?~`']);
    }

    public function test_rejects_html_or_js_injection()
    {
        $payload = [
            'title' => '<script>alert("XSS")</script>',
            'author' => '<b>Malicious Author</b>',
        ];

        $response = $this->postJson('/api/v1/books', $payload);

        $response->assertStatus(500);
    }

    public function test_rejects_negative_page_count()
    {
        $response = $this->postJson('/api/v1/books', [
            'title' => 'Bad Pages',
            'author' => 'Author',
            'pageCount' => -50,
        ]);

        $response->assertStatus(500);
    }

    public function test_rejects_negative_page_count_update()
    {
        $book = Book::create([
            'title' => 'Title',
            'author' => 'Author'
        ]);

        $update = ['pageCount' => -10];

        $response = $this->putJson("/api/v1/books/{$book->id}", $update);
        $response->assertStatus(500);
    }

    public function test_can_store_book_with_zero_width_space()
    {
        $title = "Invisible\u{200B}Book";

        $response = $this->postJson('/api/v1/books', [
            'title' => $title,
            'author' => 'Author',
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => $title]);
    }

    public function test_can_store_book_with_nullables()
    {
        $payload = [
            'title' => 'Valid Book',
            'author' => 'Author',
            'description' => null,
            'cover' => '',
            'pageCount' => null,
        ];

        $response = $this->postJson('/api/v1/books', $payload);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'Valid Book']);
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

    public function test_store_requires_title_and_author()
    {
        $response = $this->postJson('/api/v1/books', []);
        $response->assertStatus(500);
    }

    public function test_update_requires_title_and_author_if_present()
    {
        $book = Book::create(['title' => 'Title', 'author' => 'Author']);
        //  invalid type for title (integer)
        $response = $this->putJson("/api/v1/books/{$book->id}", ['title' => 123]);
        $response->assertStatus(500);
    }

    public function test_update_to_duplicate_book_returns_409()
    {
        $book1 = Book::create([
            'title' => 'Original Title',
            'author' => 'Same Author'
        ]);

        $book2 = Book::create([
            'title' => 'Another Title',
            'author' => 'Same Author'
        ]);

        $updatePayload = [
            'title' => 'Original Title',
            'author' => 'Same Author'
        ];

        $response = $this->putJson("/api/v1/books/{$book2->id}", $updatePayload);

        $response->assertStatus(409);
    }

    public function test_can_delete_book()
    {
        $book = Book::create(['title' => 'To Delete', 'author' => 'Author']);
        $response = $this->deleteJson("/api/v1/books/{$book->id}");
        $response->assertStatus(200);
        $this->assertDatabaseMissing('books', ['id' => $book->id]);
    }

    public function test_delete_nonexistent_book_returns_404()
    {
        $response = $this->deleteJson('/api/v1/books/9999');
        $response->assertStatus(404);
    }

    public function test_index_returns_books_list()
    {
        Book::create(['title' => 'Book 1', 'author' => 'Author 1']);
        Book::create(['title' => 'Book 2', 'author' => 'Author 2']);

        $response = $this->getJson('/api/v1/books');
        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Book 1'])
                 ->assertJsonFragment(['title' => 'Book 2']);
    }

    public function test_export_returns_csv_data()
    {
        Book::create(['title' => 'Exported Book', 'author' => 'Author']);

        $response = $this->get('/api/v1/books/export?format=csv');

        $response->assertStatus(200);

        $contentType = $response->headers->get('Content-Type');
        $this->assertStringContainsString('text/csv', $contentType);

        $content = $response->getContent();
        $this->assertStringContainsString('Exported Book', $content);
        $this->assertStringContainsString('Author', $content);
    }

    public function test_export_returns_xml_data()
    {
        Book::create(['title' => 'Exported Book', 'author' => 'Author']);

        $response = $this->get('/api/v1/books/export?format=xml');

        $response->assertStatus(200);

        $response->assertHeader('Content-Type', 'application/xml');

        $content = $response->getContent();
        $this->assertStringContainsString('<title>Exported Book</title>', $content);
        $this->assertStringContainsString('<author>Author</author>', $content);
    }

    public function test_search_title_pagination_and_sorting()
    {
        //  Book 01, Book 02, ..., Book 10
        for ($i = 1; $i <= 10; $i++) {
            $num = str_pad($i, 2, '0', STR_PAD_LEFT);
            Book::create(['title' => "Book $num", 'author' => "Author $i"]);
        }

        // page 1, 5 per page, sorted by title ascending
        $response = $this->getJson('/api/v1/books/search/title?q=Book&page=1&per_page=5&sort=title&direction=asc');
        $response->assertStatus(200);
        $json = $response->json();

        $this->assertArrayHasKey('data', $json);
        $this->assertArrayHasKey('data', $json['data']);
        $this->assertCount(5, $json['data']['data']);

        $titles = array_column($json['data']['data'], 'title');
        $this->assertEquals(['Book 01', 'Book 02', 'Book 03', 'Book 04', 'Book 05'], $titles);

        // page 2, 5 per page, sorted by title descending
        $responseDesc = $this->getJson('/api/v1/books/search/title?q=Book&page=2&per_page=5&sort=title&direction=desc');
        $responseDesc->assertStatus(200);
        $jsonDesc = $responseDesc->json();

        $this->assertArrayHasKey('data', $jsonDesc);
        $this->assertArrayHasKey('data', $jsonDesc['data']);
        $this->assertCount(5, $jsonDesc['data']['data']);

        $titlesDesc = array_column($jsonDesc['data']['data'], 'title');

        $responseDescPage1 = $this->getJson('/api/v1/books/search/title?q=Book&page=1&per_page=5&sort=title&direction=desc');
        $titlesDescPage1 = array_column($responseDescPage1->json()['data']['data'], 'title');

        $this->assertEquals(['Book 10', 'Book 09', 'Book 08', 'Book 07', 'Book 06'], $titlesDescPage1);

        $this->assertEquals(['Book 05', 'Book 04', 'Book 03', 'Book 02', 'Book 01'], $titlesDesc);

        $this->assertCount(5, $titlesDesc);
    }

    public function test_search_author_pagination_and_sorting()
    {
        for ($i = 1; $i <= 10; $i++) {
            $num = str_pad($i, 2, '0', STR_PAD_LEFT);
            Book::create(['title' => "Book $num", 'author' => "Author $num"]);
        }

        // page 1, 5 per page, sorted by author ascending
        $response = $this->getJson('/api/v1/books/search/author?q=Author&page=1&per_page=5&sort=author&direction=asc');
        $response->assertStatus(200);
        $json = $response->json();

        $this->assertArrayHasKey('data', $json);
        $this->assertArrayHasKey('data', $json['data']);
        $this->assertCount(5, $json['data']['data']);

        $authors = array_column($json['data']['data'], 'author');
        $this->assertEquals(['Author 01', 'Author 02', 'Author 03', 'Author 04', 'Author 05'], $authors);

        // page 2, 5 per page, sorted by author descending
        $responseDesc = $this->getJson('/api/v1/books/search/author?q=Author&page=2&per_page=5&sort=author&direction=desc');
        $responseDesc->assertStatus(200);
        $jsonDesc = $responseDesc->json();

        $this->assertArrayHasKey('data', $jsonDesc);
        $this->assertArrayHasKey('data', $jsonDesc['data']);
        $this->assertCount(5, $jsonDesc['data']['data']);

        $authorsDesc = array_column($jsonDesc['data']['data'], 'author');

        $responseDescPage1 = $this->getJson('/api/v1/books/search/author?q=Author&page=1&per_page=5&sort=author&direction=desc');
        $authorsDescPage1 = array_column($responseDescPage1->json()['data']['data'], 'author');

        $this->assertEquals(['Author 10', 'Author 09', 'Author 08', 'Author 07', 'Author 06'], $authorsDescPage1);

        $this->assertEquals(['Author 05', 'Author 04', 'Author 03', 'Author 02', 'Author 01'], $authorsDesc);

        $this->assertCount(5, $authorsDesc);
    }

    public function test_export_fails_when_no_books_exist()
    {
        $response = $this->get('/api/v1/books/export?format=csv');

        $response->assertStatus(400)
                 ->assertJson([
                     'message' => 'There are no books to export.'
                 ]);
    }

    public function test_export_authors_only_exports_unique_authors()
    {
        Book::create(['title' => 'Book A', 'author' => 'Same Author']);
        Book::create(['title' => 'Book B', 'author' => 'Same Author']);
        Book::create(['title' => 'Book C', 'author' => 'Different Author']);

        $response = $this->get('/api/v1/books/export?type=authors&format=csv');

        $response->assertStatus(200);

        $csv = $response->getContent();
        $lines = array_filter(explode("\n", trim($csv)));

        $this->assertCount(3, $lines);
        $this->assertEquals('author', trim($lines[0]));

        $this->assertStringContainsString('Same Author', $lines[1] . $lines[2]);
        $this->assertStringContainsString('Different Author', $lines[1] . $lines[2]);
    }

    public function test_export_titles_includes_duplicates()
    {
        Book::create(['title' => 'Repeated Title', 'author' => 'Author A']);
        Book::create(['title' => 'Repeated Title', 'author' => 'Author B']);
        Book::create(['title' => 'Unique Title', 'author' => 'Author C']);

        $response = $this->get('/api/v1/books/export?type=titles&format=csv');

        $response->assertStatus(200);

        $csv = $response->getContent();
        $lines = array_filter(explode("\n", trim($csv)));

        $this->assertCount(4, $lines);
        $this->assertEquals('title', trim($lines[0]));

        $joined = implode("\n", $lines);
        $this->assertEquals(2, substr_count($joined, 'Repeated Title'));
        $this->assertStringContainsString('Unique Title', $joined);
    }

}
