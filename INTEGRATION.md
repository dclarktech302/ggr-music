# Inertia.js Integration Documentation

This document describes how the React frontend and Laravel backend are integrated using Inertia.js in the GGR Music application.

## Overview

GGR Music uses **Inertia.js** as the bridge between the Laravel backend and React frontend, providing:
- **SPA-like experience** without building a separate API
- **Server-side rendering (SSR)** for improved performance and SEO
- **Type-safe data flow** from backend to frontend
- **Laravel Fortify** for authentication scaffolding

## Architecture

### Tech Stack
- **Backend**: Laravel 12
- **Frontend**: React 19 with TypeScript
- **Bridge**: Inertia.js 2.x
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Authentication**: Laravel Fortify

### How It Works

1. **Request Flow**:
   - User navigates to a route (e.g., `/dashboard`)
   - Laravel router handles the request
   - Controller returns an Inertia response with props
   - Inertia.js renders the React component with the props

2. **Subsequent Navigation**:
   - Links using Inertia's router make XHR requests
   - Only JSON data is returned (no full page reload)
   - React components update with new props
   - Browser history is maintained for back/forward navigation

## Key Components

### 1. Inertia Middleware

**File**: `app/Http/Middleware/HandleInertiaRequests.php`

This middleware shares data with all Inertia responses:

```php
public function share(Request $request): array
{
    return [
        ...parent::share($request),
        'name' => config('app.name'),
        'auth' => [
            'user' => $request->user(),
        ],
        // ... other shared data
    ];
}
```

**Shared Props Available in Every Page**:
- `auth.user`: Current authenticated user (or null)
- `name`: Application name
- `quote`: Inspirational quote
- `sidebarOpen`: Sidebar state
- Flash messages and validation errors (from parent)

### 2. Frontend Entrypoints

**Client-side**: `resources/js/app.tsx`
- Handles client-side rendering and hydration
- Sets up Inertia app with React
- Configures progress indicator

**Server-side**: `resources/js/ssr.tsx`
- Handles server-side rendering
- Renders initial HTML on the server
- Runs on Node.js via `php artisan inertia:start-ssr`

### 3. Vite Configuration

**File**: `vite.config.ts`

```typescript
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',  // SSR entrypoint
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        // ...
    ],
});
```

### 4. Inertia Configuration

**File**: `config/inertia.php`

```php
'ssr' => [
    'enabled' => true,  // SSR is enabled
    'url' => 'http://127.0.0.1:13714',  // SSR server URL
],
```

## Authentication

### Laravel Fortify Setup

**Provider**: `app/Providers/FortifyServiceProvider.php`

Fortify is configured to use Inertia views for all authentication pages:

```php
Fortify::loginView(fn () => Inertia::render('auth/login', [...]));
Fortify::registerView(fn () => Inertia::render('auth/register'));
// ... other auth views
```

### Available Auth Routes

- `POST /login` - User login
- `POST /register` - User registration
- `POST /logout` - User logout
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Password reset
- `POST /email/verification-notification` - Resend verification email
- `GET /email/verify/{id}/{hash}` - Email verification

### Protected Routes

Use the `auth` middleware to protect routes:

```php
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/settings/profile', [ProfileController::class, 'edit']);
    // ...
});
```

### Authentication Flow

1. User submits login form via Inertia
2. Laravel Fortify processes authentication
3. On success, redirects to `config/fortify.php` `home` path (default: `/dashboard`)
4. User data is automatically shared via `HandleInertiaRequests` middleware
5. All pages have access to `auth.user` prop

## Data Flow Examples

### Example 1: Simple Page with Props

**Backend** (`routes/web.php`):
```php
Route::get('/welcome', function () {
    return Inertia::render('welcome', [
        'message' => 'Welcome to GGR Music',
    ]);
});
```

**Frontend** (`resources/js/pages/welcome.tsx`):
```tsx
interface WelcomeProps {
    message: string;
}

export default function Welcome({ message }: WelcomeProps) {
    return <h1>{message}</h1>;
}
```

### Example 2: Controller with Database Data

**Backend** (`app/Http/Controllers/DashboardController.php`):
```php
public function index(Request $request): Response
{
    return Inertia::render('dashboard', [
        'stats' => [
            'totalUsers' => User::count(),
            'totalShows' => Show::count(),
        ],
    ]);
}
```

**Frontend** (`resources/js/pages/dashboard.tsx`):
```tsx
interface DashboardProps {
    auth: { user: User };  // From shared middleware
    stats: {
        totalUsers: number;
        totalShows: number;
    };
}

export default function Dashboard({ auth, stats }: DashboardProps) {
    return (
        <div>
            <h1>Welcome, {auth.user.name}!</h1>
            <p>Total Users: {stats.totalUsers}</p>
        </div>
    );
}
```

### Example 3: Form Submission with Inertia

**Frontend**:
```tsx
import { Form } from '@inertiajs/react';
import { store } from '@/routes/subscribe';

export default function Subscribe() {
    return (
        <Form {...store.form()}>
            {({ processing, errors }) => (
                <>
                    <input type="email" name="email" />
                    {errors.email && <span>{errors.email}</span>}
                    <button disabled={processing}>Subscribe</button>
                </>
            )}
        </Form>
    );
}
```

**Backend**:
```php
public function store(Request $request)
{
    $validated = $request->validate([
        'email' => 'required|email|unique:subscriptions',
    ]);
    
    Subscription::create($validated);
    
    return redirect()->back()->with('success', 'Subscribed successfully!');
}
```

## Server-Side Rendering (SSR)

### Benefits
- **Improved SEO**: Search engines see fully rendered HTML
- **Faster initial page load**: Users see content before JavaScript loads
- **Better performance on slow devices**: Less client-side work

### How SSR Works

1. **Build SSR Bundle**:
   ```bash
   npm run build:ssr
   ```
   This creates the SSR bundle in `bootstrap/ssr/`

2. **Start SSR Server**:
   ```bash
   php artisan inertia:start-ssr
   ```
   This starts a Node.js server on port 13714

3. **Development with SSR**:
   ```bash
   composer dev:ssr
   ```
   This runs the Laravel server, SSR server, and Vite concurrently

### SSR Configuration

The SSR server is configured in `config/inertia.php`:

```php
'ssr' => [
    'enabled' => true,
    'url' => 'http://127.0.0.1:13714',
],
```

**Note**: SSR is optional. To disable it, set `'enabled' => false` or run without the SSR server using `composer dev`.

## Navigation

### Using Inertia Router

**Link Component**:
```tsx
import { Link } from '@inertiajs/react';

<Link href="/dashboard">Dashboard</Link>
```

**Programmatic Navigation**:
```tsx
import { router } from '@inertiajs/react';

router.visit('/dashboard');
router.post('/logout');
router.get('/profile', { data: { tab: 'security' } });
```

### Type-Safe Routes

This project uses `@laravel/vite-plugin-wayfinder` for type-safe routing:

```tsx
import { dashboard } from '@/routes/dashboard';

<Link href={dashboard()}>Dashboard</Link>
```

Routes are auto-generated from Laravel route definitions.

## Development Workflow

### Standard Development (No SSR)

```bash
composer dev
```

This starts:
- Laravel dev server (port 8000)
- Queue worker
- Log viewer (pail)
- Vite dev server

### Development with SSR

```bash
composer dev:ssr
```

This runs:
- Laravel dev server (port 8000)
- Queue worker
- Log viewer (pail)
- SSR server (port 13714)

### Building for Production

```bash
# Build client assets only
npm run build

# Build with SSR
npm run build:ssr
```

## Testing

### Testing Inertia Pages

```php
// tests/Feature/DashboardTest.php
public function test_dashboard_loads_for_authenticated_user()
{
    $user = User::factory()->create();
    
    $response = $this->actingAs($user)
        ->get('/dashboard');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->has('stats')
        ->has('auth.user')
    );
}
```

## Common Patterns

### 1. Accessing Shared Data

All pages have access to shared props from `HandleInertiaRequests`:

```tsx
import { usePage } from '@inertiajs/react';

export default function MyPage() {
    const { auth } = usePage().props;
    
    return <div>Hello, {auth.user?.name}</div>;
}
```

### 2. Flash Messages

```php
return redirect()->back()->with('success', 'Action completed!');
```

```tsx
import { usePage } from '@inertiajs/react';

const { flash } = usePage().props;
if (flash.success) {
    toast.success(flash.success);
}
```

### 3. Validation Errors

Errors are automatically available in Inertia forms:

```tsx
<Form {...store.form()}>
    {({ errors }) => (
        <>
            <input name="email" />
            {errors.email && <span>{errors.email}</span>}
        </>
    )}
</Form>
```

## Troubleshooting

### Issue: SSR Not Working

**Check**:
1. SSR is enabled in `config/inertia.php`
2. SSR bundle is built: `npm run build:ssr`
3. SSR server is running: `php artisan inertia:start-ssr`
4. SSR server is accessible at the configured URL

### Issue: Props Not Updating

**Solutions**:
- Ensure middleware is applied to routes
- Check browser console for Inertia errors
- Clear Laravel cache: `php artisan config:clear`
- Rebuild assets: `npm run build`

### Issue: Authentication Not Working

**Check**:
1. Fortify is configured in `config/fortify.php`
2. `FortifyServiceProvider` is registered
3. Session driver is configured correctly
4. CSRF token is being sent with requests

## Resources

- [Inertia.js Documentation](https://inertiajs.com/)
- [Laravel Fortify Documentation](https://laravel.com/docs/fortify)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
