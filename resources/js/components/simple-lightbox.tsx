import * as React from "react";

const ESCAPE_KEY = 'Escape';
const ARROW_LEFT_KEY = 'ArrowLeft';
const ARROW_RIGHT_KEY = 'ArrowRight';

export default function SimpleLightbox() {
  const [open, setOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(0);
  const [imageLoadError, setImageLoadError] = React.useState<Record<number, boolean>>({});

  const images = [
    {
      src: "/images/hst5409-enhanced-nr.JPG",
      alt: "Live music performance with dynamic lighting effects",
      caption: "Stage Lighting - Dynamic lighting effects during live performance"
    },
    {
      src: "/images/0286CBA7-8496-4BA6-B2F7-ACC9691751B1.JPG",
      alt: "Music event crowd enjoying live performance",
      caption: "Crowd Energy - Audience enjoying the live music experience"
    },
    {
      src: "/images/IMG_4045.jpeg",
      alt: "Concert venue with stage setup and lighting rig",
      caption: "Venue Setup - Stage production and lighting rig preparation"
    },
    {
      src: "/images/IMG_4515.jpeg",
      alt: "Musician performing on stage with instruments",
      caption: "Performance - Musician live on stage with instruments"
    },
    {
      src: "/images/IMG_4510.jpeg",
      alt: "Audience view from concert photography",
      caption: "Audience Perspective - View from the crowd during performance"
    },
    {
      src: "/images/hst3437-enhanced-nr.JPG",
      alt: "Enhanced concert photography with vibrant stage lighting",
      caption: "Live Performance - Enhanced concert photography with dynamic lighting"
    },
    {
      src: "/images/IMG_4508.jpeg",
      alt: "Live music event with stage production",
      caption: "Event Production - Complete stage setup for live music event"
    },
    {
      src: "/images/photo_095202374210.jpg",
      alt: "Live music event with stage production",
      caption: "GGR Performance"
    },
    {
      src: "/images/photo_0915202381027.jpg",
      alt: "Live music event with stage production",
      caption: "GGR Performance"
    },
  ];

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setOpen(true);
  };

  const nextImage = React.useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = React.useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const closeLightbox = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleImageError = React.useCallback((index: number) => {
    setImageLoadError(prev => ({ ...prev, [index]: true }));
  }, []);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return;

      switch (event.key) {
        case ARROW_RIGHT_KEY:
          nextImage();
          break;
        case ARROW_LEFT_KEY:
          prevImage();
          break;
        case ESCAPE_KEY:
          closeLightbox();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, nextImage, prevImage, closeLightbox]);

  // Lock body scroll when lightbox is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            {imageLoadError[index] ? (
              <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Image unavailable</span>
              </div>
            ) : (
              <img
                src={image.src}
                alt={image.alt}
                className="cursor-pointer rounded-lg object-cover w-full h-32 hover:opacity-90 transition-opacity"
                onClick={() => openLightbox(index)}
                onError={() => handleImageError(index)}
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            {images[currentImage].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 text-center">
                <p className="text-sm md:text-base">{images[currentImage].caption}</p>
              </div>
            )}

            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image counter */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
