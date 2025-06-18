<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class NoHtml implements Rule
{
    public function passes($attribute, $value): bool
    {
        return !preg_match('/<[^>]*>/', $value);
    }

    public function message(): string
    {
        return 'The field must not contain HTML or script tags.';
    }
}
