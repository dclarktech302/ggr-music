import HeroSection from '@/components/hero-section';
import Features from '@/components/features-2';
import FooterSection from '@/components/footer';
import { Head } from '@inertiajs/react';
import ContentSection from '@/components/content-5';

export default function Welcome() {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            < HeroSection />
            < Features />
            < ContentSection />
            < FooterSection />
        </>
    );
}
