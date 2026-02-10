# GGR Music

A modern web application for Ghost Gang Records built with Laravel, Inertia.js, React 19, TypeScript, and Tailwind CSS.

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 19 with TypeScript
- **Bridge**: Inertia.js 2.x (with SSR support)
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Authentication**: Laravel Fortify

## Project Structure

### Frontend (resources/js/)
```
resources/js/
├── components/    # Reusable React components
├── hooks/         # Custom React hooks
├── layouts/       # Page layouts
├── lib/           # Utility functions and configuration
├── pages/         # Page components (Inertia pages)
└── types/         # TypeScript type definitions
```

### Backend
```
app/
├── Http/
│   ├── Controllers/      # Application controllers
│   └── Middleware/       # Custom middleware (including Inertia)
├── Models/              # Eloquent models
├── Actions/Fortify/     # Authentication actions
└── Providers/           # Service providers
```

## Getting Started

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- SQLite (or other database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ggr-music
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Set up database**
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

5. **Build assets**
   ```bash
   npm run build
   ```

### Development

**Standard development (without SSR):**
```bash
composer dev
```

This command starts:
- Laravel development server (http://localhost:8000)
- Queue worker
- Log viewer (pail)
- Vite dev server (hot module replacement)

**Development with SSR (recommended for production-like experience):**
```bash
composer dev:ssr
```

This runs everything above plus the Inertia SSR server.

### Building for Production

```bash
# Build client bundle only
npm run build

# Build with SSR support
npm run build:ssr
```

## Features

### ✅ Inertia.js Integration
- Seamless data flow from Laravel to React
- No separate API needed
- SPA-like user experience
- Server-side rendering (SSR) support

### ✅ Authentication
- Complete auth scaffolding with Laravel Fortify
- Login, registration, password reset
- Email verification
- Two-factor authentication
- Protected routes

### ✅ Type Safety
- Full TypeScript support
- Type-safe routing with auto-generated routes
- Typed Inertia props

### ✅ Modern UI
- Tailwind CSS 4 with dark mode
- shadcn/ui components
- Responsive design
- Accessible components

## Key Pages

- `/` - Welcome/landing page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - User dashboard (authenticated, demonstrates data flow)
- `/settings/profile` - Profile management
- `/settings/password` - Password management
- `/settings/two-factor` - Two-factor authentication setup
- `/shows` - Shows listing
- `/subscribe` - Newsletter subscription

## Documentation

- **[Integration Documentation](./INTEGRATION.md)** - Detailed guide on how React, Laravel, and Inertia.js work together
- **[Laravel Documentation](https://laravel.com/docs)**
- **[Inertia.js Documentation](https://inertiajs.com/)**
- **[React Documentation](https://react.dev/)**

## Testing

```bash
# Run PHP tests
php artisan test

# Run type checking
npm run types

# Run linter
npm run lint

# Format code
npm run format
```

## Scripts

```json
{
  "dev": "vite",                          // Start Vite dev server
  "build": "vite build",                  // Build for production
  "build:ssr": "vite build && vite build --ssr",  // Build with SSR
  "format": "prettier --write resources/",         // Format code
  "lint": "eslint . --fix",               // Lint and fix
  "types": "tsc --noEmit"                 // Type check
}
```

## Environment Variables

Key environment variables (see `.env.example`):

```env
APP_NAME="Ghost Gang Records"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite

# Fortify redirects here after login
FORTIFY_HOME=/dashboard
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open-sourced software licensed under the MIT license.

