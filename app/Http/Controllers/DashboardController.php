<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the user dashboard.
     */
    public function index(Request $request): Response
    {
        // Example of passing data from backend to frontend via Inertia props
        $stats = [
            'totalUsers' => User::count(),
            'totalShows' => 0, // Placeholder - would be Show::count() if Show model exists
            'recentActivity' => 'Last login: ' . now()->diffForHumans(),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    }
}
