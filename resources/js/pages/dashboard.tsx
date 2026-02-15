import { Button } from '@/components/ui/button';
import { Head, router } from '@inertiajs/react';

interface DashboardProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            email_verified_at: string | null;
        };
    };
    stats: {
        totalUsers: number;
        totalShows: number;
        recentActivity: string;
    };
}

export default function Dashboard({ auth, stats }: DashboardProps) {
    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-background">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">
                            Welcome, {auth.user.name}!
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            This is your dashboard - demonstrating Inertia.js
                            data flow from Laravel backend to React frontend.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-lg border bg-card p-6 shadow-sm">
                            <h3 className="text-sm font-medium text-muted-foreground">
                                User Information
                            </h3>
                            <div className="mt-4 space-y-2">
                                <p className="text-sm">
                                    <span className="font-medium">Name:</span>{' '}
                                    {auth.user.name}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Email:</span>{' '}
                                    {auth.user.email}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">
                                        Email Verified:
                                    </span>{' '}
                                    {auth.user.email_verified_at ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6 shadow-sm">
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Platform Stats
                            </h3>
                            <div className="mt-4 space-y-2">
                                <p className="text-sm">
                                    <span className="font-medium">
                                        Total Users:
                                    </span>{' '}
                                    {stats.totalUsers}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">
                                        Total Shows:
                                    </span>{' '}
                                    {stats.totalShows}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6 shadow-sm">
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Recent Activity
                            </h3>
                            <p className="mt-4 text-sm">
                                {stats.recentActivity}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Button
                            onClick={() => router.visit('/settings/profile')}
                            variant="outline"
                        >
                            View Profile Settings
                        </Button>
                        <Button onClick={handleLogout} variant="destructive">
                            Logout
                        </Button>
                    </div>

                    <div className="mt-8 rounded-lg border bg-muted/50 p-6">
                        <h2 className="mb-4 text-xl font-semibold">
                            Integration Features Demonstrated
                        </h2>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                                <span className="mr-2 text-green-500">✓</span>
                                <span>
                                    <strong>Inertia.js Data Flow:</strong> User
                                    and stats data passed from Laravel backend
                                    via props
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-green-500">✓</span>
                                <span>
                                    <strong>Authentication:</strong> Protected
                                    route with user authentication
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-green-500">✓</span>
                                <span>
                                    <strong>SSR Support:</strong> Server-side
                                    rendering enabled via Inertia
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-green-500">✓</span>
                                <span>
                                    <strong>Type Safety:</strong> Full
                                    TypeScript support with typed props
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-green-500">✓</span>
                                <span>
                                    <strong>Navigation:</strong> Using Inertia
                                    router for SPA-like navigation
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
