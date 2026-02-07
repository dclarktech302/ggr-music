import { HeroHeader } from '@/components/header';
import Form from '@/components/form';
import FooterSection from '@/components/footer';
import { Head } from '@inertiajs/react';

export default function Subscribe() {
    // Extract email from URL parameters using window.location
    const urlParams = new URLSearchParams(window.location.search);
    const initialEmail = urlParams.get('email') || undefined;

    return (
        <>
            <Head>
                <title>Subscribe - GGR Music Group</title>
                <meta name="description" content="Subscribe to GGR Music Group for exclusive alerts and updates" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <HeroHeader />

            <main className="min-h-screen pt-24">
                <Form initialEmail={initialEmail} />
            </main>

            <FooterSection />
        </>
    );
}
