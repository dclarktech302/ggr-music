<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscribeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class SubscriptionController extends Controller
{
    /**
     * Handle the subscription form submission.
     *
     * @param SubscribeRequest $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function store(SubscribeRequest $request)
    {
        try {
            // Get the Google Apps Script webhook URL from config
            $webhookUrl = config('services.google.webhook_url');

            // Debug logging
            Log::info('Webhook URL check', [
                'url' => $webhookUrl,
                'empty' => empty($webhookUrl),
                'length' => strlen($webhookUrl ?? '')
            ]);

            if (empty($webhookUrl)) {
                throw new \Exception('Google Apps Script webhook URL not configured');
            }

            // Prepare the data to send to Google Sheets
            $data = [
                'timestamp' => now()->toIso8601String(),
                'email' => $request->email,
                'phone' => $request->phone,
                'communication_frequency' => $this->formatCommunicationFrequency($request->communication_frequency),
                'discovery_source' => $this->formatDiscoverySource($request->discovery_source),
                'discovery_source_other' => $request->discovery_source_other ?? '',
                'preferred_platform' => $this->formatPreferredPlatform($request->preferred_platform),
                'satisfaction_rating' => $request->satisfaction_rating,
                'content_preferences' => implode(', ', array_map(
                    fn($pref) => $this->formatContentPreference($pref),
                    $request->content_preferences
                )),
                'content_preferences_other' => $request->content_preferences_other ?? '',
                'would_share' => ucfirst($request->would_share),
                'consent_agreed' => $request->consent_agreed ? 'Yes' : 'No',
                'ip_address' => $request->ip(),
            ];

            // Send POST request to Google Apps Script
            Log::info('Sending to Google Apps Script', [
                'url' => $webhookUrl,
                'data' => $data
            ]);

            $response = Http::timeout(10)->post($webhookUrl, $data);

            Log::info('Google Apps Script response', [
                'status' => $response->status(),
                'successful' => $response->successful(),
                'body' => $response->body(),
                'headers' => $response->headers()
            ]);

            if (!$response->successful()) {
                throw new \Exception('Google Apps Script returned error: ' . $response->body());
            }

            $result = $response->json();

            Log::info('Google Apps Script parsed result', [
                'result' => $result
            ]);

            // Check if the script returned an error
            if (isset($result['result']) && $result['result'] === 'error') {
                throw new \Exception($result['error'] ?? 'Unknown error from Google Sheets');
            }

            // Log successful submission
            Log::info('Subscription sent to Google Sheets', [
                'email' => $request->email,
                'status' => $result['result'] ?? 'success',
                'row' => $result['row'] ?? null,
            ]);

            // Check if request expects JSON (SPA) or traditional redirect
            if ($request->expectsJson() || $request->header('X-Inertia')) {
                // Return Inertia response for SPA
                return redirect()->back()->with('success', 'Thank you for subscribing! You will receive updates based on your preferences.');
            }

            // Traditional redirect response
            return redirect()->back()->with('success', 'Thank you for subscribing! You will receive updates based on your preferences.');

        } catch (\Exception $e) {
            // Log the error
            Log::error('Failed to send subscription to Google Sheets', [
                'error' => $e->getMessage(),
                'email' => $request->email ?? 'unknown',
                'trace' => $e->getTraceAsString(),
            ]);

            // Check if request expects JSON (SPA) or traditional redirect
            if ($request->expectsJson() || $request->header('X-Inertia')) {
                // Return Inertia error response for SPA
                return redirect()->back()
                    ->with('error', 'We encountered an issue processing your subscription. Please try again later.')
                    ->withInput();
            }

            // Traditional redirect with error
            return redirect()->back()
                ->with('error', 'We encountered an issue processing your subscription. Please try again later.')
                ->withInput();
        }
    }

    /**
     * Format communication frequency for display
     *
     * @param string $frequency
     * @return string
     */
    private function formatCommunicationFrequency(string $frequency): string
    {
        return match($frequency) {
            'weekly' => 'Weekly Updates',
            'biweekly' => 'Bi-weekly Updates',
            'urgent_only' => 'Urgent Only',
            default => $frequency,
        };
    }

    /**
     * Format discovery source for display
     *
     * @param string $source
     * @return string
     */
    private function formatDiscoverySource(string $source): string
    {
        return match($source) {
            'instagram' => 'Instagram',
            'youtube' => 'YouTube',
            'live_event___performance' => 'Live event / performance',
            'friend_or_word_of_mouth' => 'Friend or word of mouth',
            'search__google__etc.' => 'Search (Google, etc.)',
            'other' => 'Other',
            default => ucwords(str_replace('_', ' ', $source)),
        };
    }

    /**
     * Format preferred platform for display
     *
     * @param string $platform
     * @return string
     */
    private function formatPreferredPlatform(string $platform): string
    {
        return match($platform) {
            'instagram' => 'Instagram',
            'tiktok' => 'TikTok',
            'youtube' => 'YouTube',
            'facebook' => 'Facebook',
            'x__formally_twitter_' => 'X (Formally Twitter)',
            'short_form_video__reels___tiktok___shorts_' => 'Short-form video',
            'long_form_video__youtube_' => 'Long-form video',
            'live_streams' => 'Live Streams',
            default => ucwords(str_replace('_', ' ', $platform)),
        };
    }

    /**
     * Format content preference for display
     *
     * @param string $preference
     * @return string
     */
    private function formatContentPreference(string $preference): string
    {
        return match($preference) {
            'behind_the_scenes_footage' => 'Behind-the-scenes footage',
            'exclusive_interviews_with_talent' => 'Exclusive interviews with talent',
            'giveaways_and_contests' => 'Giveaways and contests',
            'event_highlights_and_recaps' => 'Event highlights and recaps',
            'upcoming_schedule_previews' => 'Upcoming schedule previews',
            'fan_spotlights_and_interactions' => 'Fan spotlights and interactions',
            'other' => 'Other',
            default => ucwords(str_replace('_', ' ', $preference)),
        };
    }
}