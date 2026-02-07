import HeroSection from '@/components/hero-section';
import Features from '@/components/features-2';
import FooterSection from '@/components/footer';
import { Head, Link } from '@inertiajs/react';
import ContentSection from '@/components/content-5';
import { ArrowRight, Bell, Music, Users } from 'lucide-react';

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
            <HeroSection />

            {/* Subscribe CTA Section */}
            <section className="py-20 bg-gray-900">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-3 bg-gray-800 rounded-full">
                                <Bell className="w-8 h-8 text-blue-400" />
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Stay in the Loop
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Get exclusive alerts, behind-the-scenes content, and be the first to know about upcoming events and artist showcases.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <Music className="w-6 h-6 text-blue-400 mb-3" />
                                <h3 className="text-white font-semibold mb-2">Exclusive Content</h3>
                                <p className="text-gray-400 text-sm">Behind-the-scenes footage and artist interviews</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <Users className="w-6 h-6 text-blue-400 mb-3" />
                                <h3 className="text-white font-semibold mb-2">Community Access</h3>
                                <p className="text-gray-400 text-sm">Join our growing music community</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <Bell className="w-6 h-6 text-blue-400 mb-3" />
                                <h3 className="text-white font-semibold mb-2">First Alerts</h3>
                                <p className="text-gray-400 text-sm">Be first to know about events and releases</p>
                            </div>
                        </div>

                        <Link
                            href="/subscribe"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-xl"
                        >
                            Subscribe Now
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <p className="text-gray-400 text-sm mt-4">
                            Join 500+ music lovers already subscribed
                        </p>
                    </div>
                </div>
            </section>

            <Features />
            <ContentSection />
            <FooterSection />
        </>
    );
}
