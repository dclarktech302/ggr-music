import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Appearance settings"
                        description="Dark mode is always enabled"
                    />
                    <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <p className="text-sm font-medium">Dark mode is permanently enabled</p>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            The application is configured to always use dark mode for the best viewing experience.
                        </p>
                    </div>
                </div>
            </SettingsLayout>
        </>
    );
}
