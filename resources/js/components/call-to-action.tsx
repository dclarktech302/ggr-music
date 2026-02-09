import { Button } from '@/components/ui/button'

export default function CallToAction() {
    return (
        <section className="flex pb-16">
            <div className="mx-auto max-w-5xl px-6 flex justify-center">
                <div className="text-center">
                    <h2 className="text-balance text-2xl font-semibold lg:text-4xl">Ready to Get Started?</h2>
                    <p className="mt-4">Let's discuss how we can help bring your vision to life.</p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg">
                            <a href="/">
                                <span>Schedule</span>
                            </a>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <a href="/">
                                <span>See More</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
