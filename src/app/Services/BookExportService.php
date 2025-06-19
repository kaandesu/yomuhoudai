<?php

namespace App\Services;

use App\Book;
use Illuminate\Support\Str;
use DOMDocument;
use InvalidArgumentException;

class BookExportService
{
    public function export(string $type, string $format): string
    {
        $fields = $this->_determineFields($type);

        // NOTE: return only the distinct author names
        if ($type === 'authors') {
            $books = Book::select($fields)->distinct()->get();
        } else {
            // NOTE: not deduplicating the titles
            // as they point to different books
            // since they must have different authors
            $books = Book::select($fields)->get();
        }

        if ($books->isEmpty()) {
            throw new InvalidArgumentException('No books found for export.');
        }

        return $format === 'csv'
            ? $this->_toCsv($books, $fields)
            : $this->_toXml($books, $fields);
    }

    private function _determineFields(string $type): array
    {
        switch ($type) {
            case 'titles':
                return ['title'];
            case 'authors':
                return ['author'];
            case 'titles_and_authors':
                return ['title', 'author'];
            default:
                throw new \InvalidArgumentException("Invalid type: $type");
        }
    }

    private function _toCsv($books, array $fields): string
    {
        $handle = fopen('php://temp', 'r+');

        fputcsv($handle, $fields);

        foreach ($books as $book) {
            $row = [];
            foreach ($fields as $field) {
                $row[] = $book->$field;
            }
            fputcsv($handle, $row);
        }

        rewind($handle);
        $csv = stream_get_contents($handle);
        fclose($handle);

        return $csv;
    }

    private function _toXml($books, array $fields): string
    {
        $doc = new DOMDocument('1.0', 'UTF-8');
        $doc->formatOutput = true;

        $root = $doc->createElement('books');
        $doc->appendChild($root);

        foreach ($books as $book) {
            $bookElement = $doc->createElement('book');

            foreach ($fields as $field) {
                $value = htmlspecialchars((string) $book->$field);
                $child = $doc->createElement($field, $value);
                $bookElement->appendChild($child);
            }

            $root->appendChild($bookElement);
        }

        return $doc->saveXML();
    }
}
