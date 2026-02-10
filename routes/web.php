<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SubscriptionController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/subscribe', function () {
    return Inertia::render('subscribe');
})->name('subscribe.page');

Route::get('/shows', function () {
    return Inertia::render('shows');
})->name('shows.page');

Route::post('/subscribe', [SubscriptionController::class, 'store'])->name('subscribe');

// Protected dashboard route - demonstrates Inertia.js data flow and authentication
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
