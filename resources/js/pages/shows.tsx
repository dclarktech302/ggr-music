import { Head } from "@inertiajs/react";
import { HeroHeader } from "@/components/header";
import ContentSection from "@/components/content-5";
import FooterSection from "@/components/footer";

export default function Shows() {
    return (
        <>
            <Head>
                <title>Shows - GGR Music Group</title>
                <meta name="description" content="Subscribe to GGR Music Group for exclusive alerts and updates" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <HeroHeader />

            <ContentSection />

            <FooterSection />
        </>
    );
}