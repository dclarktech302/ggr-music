import { useCallback, useState } from 'react';

export type Appearance = 'dark';

const applyTheme = () => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
};

export function initializeTheme() {
    applyTheme();
}

export function useAppearance() {
    const [appearance] = useState<Appearance>('dark');

    const updateAppearance = useCallback(() => {
        // No-op since we're always in dark mode
    }, []);

    return { appearance, updateAppearance } as const;
}
