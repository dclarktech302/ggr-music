import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { HeroHeader } from '@/components/header'
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
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [isPaused, setIsPaused] = React.useState(false)

    const carouselImages = [
        {
            src: "/images/3d-music-related-scene.jpg",
            alt: "3D music visualization",
            title: "Live Performances",
            description: "Experience the energy of live music events"
        },
        {
            src: "/images/3f56658e-7c79-42ae-bed1-38c3f6ff7b4c.jpg",
            alt: "music festival",
            title: "Artist Showcases",
            description: "Discover talented local and regional artists"
        },
        {
            src: "/images/back-view-audience-with-arms-raised-front-stage-music-concert.jpg",
            alt: "music concert",
            title: "Community Events",
            description: "Join our growing music community"
        }
    ]

    const openLightbox = (imageSrc: string) => {
        setCurrentImage(imageSrc)
        setLightboxOpen(true)
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
        setCurrentImage('')
    }

    const nextSlide = React.useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, [carouselImages.length])

    const prevSlide = React.useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
    }, [carouselImages.length])

    React.useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(nextSlide, 5000)
            return () => clearInterval(interval)
        }
    }, [nextSlide, isPaused])
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

                                {/* Carousel */}
                                <div
                                    className="relative mx-auto max-w-full overflow-hidden rounded-(--radius)"
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >
                                    <div className="relative h-96 md:h-[500px]">
                                        {carouselImages.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`absolute inset-0 transition-opacity duration-1000 cursor-pointer ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                                    }`}
                                                onClick={() => openLightbox(image.src)}
                                            >
                                                <img
                                                    src={image.src}
                                                    alt={image.alt}
                                                    className="w-full h-full object-cover pointer-events-none"
                                                    loading="lazy"
                                                />

                                                {/* Overlapping Text Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none">
                                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                                        <h3 className="text-3xl font-bold mb-2">{image.title}</h3>
                                                        <p className="text-lg opacity-90">{image.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Carousel Controls */}
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-20"
                                        aria-label="Previous slide"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-20"
                                        aria-label="Next slide"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    {/* Carousel Indicators */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                        {carouselImages.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSlide(index)}
                                                className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                                                    }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>

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
