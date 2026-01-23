import { Mail, SendHorizonal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { HeroHeader } from '@/components/header'
import { LogoCloud } from '@/components/logo-cloud'
import * as React from 'react'


const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    const [lightboxOpen, setLightboxOpen] = React.useState(false)
    const [currentImage, setCurrentImage] = React.useState('')

    const openLightbox = (imageSrc: string) => {
        setCurrentImage(imageSrc)
        setLightboxOpen(true)
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
        setCurrentImage('')
    }
    return (
        <>
            <HeroHeader />

            <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
                <section>
                    <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pt-48">
                        <div className="relative z-10 mx-auto max-w-4xl text-center">
                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="text-balance text-5xl font-medium md:text-6xl">
                                GGR Music Group
                            </TextEffect>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="p"
                                className="mx-auto mt-6 max-w-2xl text-pretty text-lg">
                                Welcome to the next generation of entertainment on the Eastern Shore
                            </TextEffect>

                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-12">

                                <div className="mx-auto max-w-100% relative">
                                    <img
                                        className="w-full object-cover object-center cursor-pointer hover:opacity-90 transition-opacity"
                                        src="/images/3d-music-related-scene.jpg"
                                        alt="new age music scene"
                                        onClick={() => openLightbox('/images/3d-music-related-scene.jpg')}
                                    />
                                </div>
                                {/* <form
                                    action=""
                                    className="mx-auto max-w-sm">
                                    <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.5rem)] border pr-2 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                                        <Mail className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4" />

                                        <input
                                            placeholder="Your mail address"
                                            className="h-12 w-full bg-transparent pl-12 focus:outline-none"
                                            type="email"
                                        />

                                        <div className="md:pr-1.5 lg:pr-0">
                                            <Button
                                                aria-label="submit"
                                                size="sm"
                                                className="rounded-(--radius)">
                                                <span className="hidden md:block">Get Started</span>
                                                <SendHorizonal
                                                    className="relative mx-auto size-5 md:hidden"
                                                    strokeWidth={2}
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                </form> */}

                            </AnimatedGroup>
                        </div>
                        {lightboxOpen && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                                onClick={closeLightbox}
                            >
                                <div className="relative max-w-4xl max-h-full p-4">
                                    <img
                                        src={currentImage}
                                        alt="New age music scene"
                                        className="max-w-full max-h-full object-contain"
                                        onClick={(e) => e.stopPropagation()}
                                    />

                                    <button
                                        className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 transition-all duration-200 hover:bg-opacity-70 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                                        onClick={closeLightbox}
                                        aria-label="Close lightbox"
                                    >
                                        <svg className="w-6 h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
                {/*
                 TODO: 
                 active once sponsors are confirmed and logos are provided
                 */}
                {/* <LogoCloud /> */}
            </main>
        </>
    )
}
