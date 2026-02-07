<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubscribeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'communication_frequency' => 'required|in:weekly,biweekly,urgent_only',
            'discovery_source' => 'required|string|max:100',
            'discovery_source_other' => 'nullable|string|max:255',
            'preferred_platform' => 'required|string|max:100',
            'satisfaction_rating' => 'required|integer|min:1|max:5',
            'content_preferences' => 'required|array|min:1',
            'content_preferences.*' => 'string|max:100',
            'content_preferences_other' => 'nullable|string|max:255',
            'would_share' => 'required|in:yes,maybe,no',
            'consent_agreed' => 'required|accepted',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email address',
            'phone.required' => 'Mobile phone number is required',
            'communication_frequency.required' => 'Please select a communication frequency',
            'communication_frequency.in' => 'Invalid communication frequency selected',
            'discovery_source.required' => 'Please select where you discovered GGR',
            'preferred_platform.required' => 'Please select your preferred platform',
            'satisfaction_rating.required' => 'Please rate your satisfaction',
            'satisfaction_rating.min' => 'Rating must be between 1 and 5',
            'satisfaction_rating.max' => 'Rating must be between 1 and 5',
            'content_preferences.required' => 'Please select at least one content type',
            'content_preferences.min' => 'Please select at least one content type',
            'would_share.required' => 'Please indicate if you would share content',
            'would_share.in' => 'Invalid selection for sharing preference',
            'consent_agreed.required' => 'You must agree to the terms to continue',
            'consent_agreed.accepted' => 'You must agree to the terms to continue',
        ];
    }
}
