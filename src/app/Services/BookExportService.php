<?php

namespace App\Services;

use DOMDocument;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BookExportService
{
    public function toCsv(array $data, array $fields): StreamedResponse
    {
        $filename = 'books_export.csv';

        $response = new StreamedResponse(
            function () use ($data, $fields) {
                $handle = fopen('php://output', 'w');
                fputcsv($handle, $fields);

                foreach ($data as $row) {
                    fputcsv($handle, array_map(fn ($field) => $row[$field] ?? '', $fields));
                }

                fclose($handle);
            }
        );

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="'.$filename.'"');

        return $response;
    }

    public function toXml(array $data): StreamedResponse
    {
        $doc = new DOMDocument('1.0', 'UTF-8');
        $doc->formatOutput = true;

        $root = $doc->createElement('books');
        $doc->appendChild($root);

        foreach ($data as $book) {
            $bookElement = $doc->createElement('book');
            foreach ($book as $key => $value) {
                $bookElement->appendChild($doc->createElement($key, htmlspecialchars((string) $value)));
            }
            $root->appendChild($bookElement);
        }

        $response = new StreamedResponse(
            function () use ($doc) {
                echo $doc->saveXML();
            }
        );

        $response->headers->set('Content-Type', 'text/xml');
        $response->headers->set('Content-Disposition', 'attachment; filename="books_export.xml"');

        return $response;
    }
}
