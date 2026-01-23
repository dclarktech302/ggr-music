import { Link } from '@inertiajs/react';

const links = [
    {
        title: 'Home',
        href: '#/',
    },
    {
        title: 'About',
        href: '#about',
    },
    // {
    //     title: 'Features',
    //     href: '#features',
    // },
    {
        title: 'Shows',
        href: '#shows',
    }
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                {/* <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit">
                    <Logo />
                </Link> */}

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <div className="my-8 flex flex-wrap justify-center gap-6">
                    <div>
                        <a
                            href="https://www.facebook.com/share/g/1A3fE4Uqfn/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="text-muted-foreground hover:text-primary block">
                            <img
                                className="size-6"
                                src="/images/Facebook_Logo_Primary.png"
                                alt="Facebook"
                            />
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://youtube.com/@ghostgangrecordsmusicgroup?si=hm_hn8ka57ahLE0M"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            className="text-muted-foreground hover:text-primary block">
                            <img
                                className="size-6"
                                src="/images/yt_icon_red_digital.png"
                                alt="YouTube"
                            />
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://on.soundcloud.com/dmoR0NnBPvOd3XlYPK"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="SoundCloud"
                            className="text-muted-foreground hover:text-primary block">
                            <img
                                className="size-6"
                                src="/images/6862460f240ad9ae4680f211_cloudmark-white.png"
                                alt="SoundCloud"
                            />
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://www.instagram.com/ghostgangmusicgroup/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-muted-foreground hover:text-primary block">
                            <img
                                className="size-6"
                                src="/images/Instagram_Glyph_Gradient.png"
                                alt="Instagram"
                            />
                        </a>
                    </div>
                </div>
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} GGR Music Group, All rights reserved</span>
            </div>
        </footer>
    )
}
