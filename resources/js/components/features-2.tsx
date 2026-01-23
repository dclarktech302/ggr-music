import { ReactNode } from 'react'

export default function Features() {
    return (
        <section id="about" className="py-16 md:py-32">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center space-y-4">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Join Our Community</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We are the central hub for music artists, producers, and DJs who are passionate about their craft. 
                        Serving Maryland and Delaware with opportunities to showcase your talent.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mx-5">
                <div className="text-center space-y-3 p-6 rounded-lg border bg-card">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-semibold">Perform</h4>
                    <p className="text-muted-foreground">Showcase your talent at our events and connect with live audiences</p>
                </div>

                <div className="text-center space-y-3 p-6 rounded-lg border bg-card">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-semibold">Grow Your Brand</h4>
                    <p className="text-muted-foreground">Build your following and gain exposure in the regional music scene</p>
                </div>

                <div className="text-center space-y-3 p-6 rounded-lg border bg-card">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-semibold">Get Featured</h4>
                    <p className="text-muted-foreground">Be highlighted in our promotions and reach new fans across the region</p>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
