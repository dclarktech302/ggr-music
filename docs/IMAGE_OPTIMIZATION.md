# Image Optimization Recommendations

This document outlines recommendations for optimizing images in the GGR Music Group website.

## Current Issues

### Large Image Files
Several images are significantly larger than recommended for web use:

- `hst5409-enhanced-nr.JPG` - **3.7MB** (should be < 500KB)
- `hst3437-enhanced-nr.JPG` - **3.2MB** (should be < 500KB)
- `Instagram_Glyph_Gradient.png` - **2.6MB** (should be < 200KB)
- `photo_095202374210.jpg` - **1.9MB** (should be < 500KB)
- `GhocaseV-8.JPG` - **1.8MB** (should be < 500KB)
- `back-view-audience-with-arms-raised-front-stage-music-concert.jpg` - **1.6MB** (should be < 500KB)
- `photo_0915202381027.jpg` - **1.6MB** (should be < 500KB)
- `IMG_4045.jpeg` - **964KB** (should be < 500KB)

### Non-Web-Compatible Formats
- HEIC files are not supported by web browsers and have been removed from the repository

## Recommended Solutions

### 1. Image Compression
Use tools to compress images without significant quality loss:

```bash
# Using ImageMagick
convert input.jpg -quality 85 -strip output.jpg

# Using cwebp for WebP conversion
cwebp -q 85 input.jpg -o output.webp
```

### 2. Responsive Images
Implement responsive images with multiple sizes:

```tsx
<img
  srcSet="
    /images/hero-small.jpg 640w,
    /images/hero-medium.jpg 1024w,
    /images/hero-large.jpg 1920w
  "
  sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
  src="/images/hero-large.jpg"
  alt="Hero image"
/>
```

### 3. Modern Image Formats
Use WebP or AVIF formats with JPEG/PNG fallbacks:

```tsx
<picture>
  <source srcSet="/images/hero.avif" type="image/avif" />
  <source srcSet="/images/hero.webp" type="image/webp" />
  <img src="/images/hero.jpg" alt="Hero image" />
</picture>
```

### 4. CDN Integration
Consider using a CDN with automatic image optimization:
- Cloudinary
- Imgix
- Cloudflare Images
- AWS CloudFront with Lambda@Edge

### 5. Lazy Loading (Already Implemented)
Images are now lazy-loaded except for the first hero image:

```tsx
<img src="/images/hero.jpg" loading="lazy" alt="..." />
```

### 6. Image Sizing Guidelines

| Use Case | Max File Size | Recommended Dimensions |
|----------|--------------|------------------------|
| Hero Images | 500KB | 1920x1080 |
| Gallery Thumbnails | 50KB | 400x300 |
| Gallery Full Size | 300KB | 1200x900 |
| Icons/Logos | 50KB | Variable |
| Social Media Icons | 20KB | 64x64 or SVG |

## Implementation Steps

### Immediate Actions
1. ✅ Remove HEIC files (not web-compatible)
2. ✅ Add lazy loading to all images
3. ✅ Add error handling for failed image loads
4. ✅ Implement accessibility improvements

### Short-term Actions (Recommended)
1. Compress all images over 500KB using tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - ImageMagick
2. Create WebP versions of all JPEG/PNG images
3. Implement `<picture>` elements for critical images

### Long-term Actions (Optional)
1. Set up automated image optimization pipeline
2. Integrate with a CDN for automatic optimization
3. Implement responsive image sizes (srcset)
4. Consider using a dedicated image service

## Performance Impact

**Current Issues:**
- Large images increase page load time
- Poor mobile performance on slower connections
- Higher bandwidth costs

**Expected Improvements After Optimization:**
- 60-80% reduction in image file sizes
- 2-3x faster page load times
- Better mobile experience
- Lower bandwidth costs
- Improved SEO scores

## Tools and Resources

### Compression Tools
- **Online:** [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
- **CLI:** ImageMagick, cwebp, sharp (Node.js)
- **Build Tools:** imagemin (webpack/vite plugin)

### Image CDNs
- [Cloudinary](https://cloudinary.com/)
- [Imgix](https://imgix.com/)
- [Cloudflare Images](https://www.cloudflare.com/products/cloudflare-images/)

### Testing Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

## Code Examples

### Using sharp (Node.js) for batch optimization

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';
const outputDir = './public/images/optimized';

fs.readdirSync(inputDir).forEach(file => {
  if (file.match(/\.(jpg|jpeg|png)$/i)) {
    sharp(path.join(inputDir, file))
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(path.join(outputDir, file))
      .then(() => console.log(`Optimized ${file}`))
      .catch(err => console.error(`Error processing ${file}:`, err));
  }
});
```

### Vite plugin for automatic image optimization

```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 85 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    })
  ]
});
```

## Next Steps

1. Review this document with the team
2. Prioritize images to optimize based on page views
3. Set up automation for new images
4. Monitor performance improvements with analytics
