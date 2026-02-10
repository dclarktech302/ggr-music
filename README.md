## Hello GGR Music Group

Created using Laravel, Inertia, Vite, React 19, TypeScript, and Tailwind

## Frontend Directory Structure

```
resources/js/
├── components/    # Reusable React components
├── hooks/         # React hooks
├── layouts/       # Application layouts
├── lib/           # Utility functions and configuration
├── pages/         # Page components
└── types/         # TypeScript definitions
```

## Environment Setup

### Initial Configuration

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Generate application key:**
   ```bash
   php artisan key:generate
   ```

3. **Configure your environment variables** in the `.env` file:
   - Set `APP_NAME` to your application name
   - Set `APP_URL` to your application URL
   - Configure database credentials if not using SQLite
   - Update mail settings for email functionality
   - Add AWS credentials if using S3 storage

### Environment Files

- **`.env`** - Your local development environment file (git-ignored)
- **`.env.local`** - Alternative local environment file (git-ignored)
- **`.env.production`** - Production environment file (git-ignored)
- **`.env.example`** - Template file with all required variables (version controlled)

**⚠️ Important:** Never commit actual `.env` files containing real credentials to version control. These files are automatically ignored by git.

### Security Note

All environment files containing sensitive information (API keys, database passwords, etc.) are excluded from version control. Always use `.env.example` as a template and populate your own `.env` file with your actual credentials.

If you need to add new environment variables, update `.env.example` with placeholder values so other developers know what configuration is needed.

