<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardIntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_requires_authentication()
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect('/login');
    }

    public function test_dashboard_loads_for_authenticated_user()
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->has('auth.user')
            ->where('auth.user.name', 'Test User')
            ->where('auth.user.email', 'test@example.com')
            ->has('stats')
            ->has('stats.totalUsers')
            ->has('stats.totalShows')
            ->has('stats.recentActivity')
        );
    }

    public function test_dashboard_contains_correct_user_data()
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'email_verified_at' => now(),
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertInertia(fn ($page) => $page
            ->where('auth.user.id', $user->id)
            ->where('auth.user.name', 'John Doe')
            ->where('auth.user.email', 'john@example.com')
            ->where('auth.user.email_verified_at', fn ($value) => $value !== null)
        );
    }

    public function test_dashboard_stats_reflect_database_state()
    {
        // Create multiple users
        User::factory()->count(5)->create();
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertInertia(fn ($page) => $page
            ->where('stats.totalUsers', 6) // 5 + 1 authenticated user
            ->where('stats.totalShows', 0) // No shows in database
        );
    }

    public function test_inertia_middleware_shares_auth_data()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        // Verify shared data from HandleInertiaRequests middleware
        $response->assertInertia(fn ($page) => $page
            ->has('auth')
            ->has('auth.user')
            ->has('name') // App name from config
        );
    }
}
