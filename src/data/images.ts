// Service-specific images data structure

export interface ServiceImages {
  heroImage: string;
  galleryImages: string[];
}

export const serviceImages: Record<string, ServiceImages> = {
  'vinyl-flooring': {
    heroImage: '/images/services/vinyl/vinyl-hero-bg.webp',
    galleryImages: [
      '/images/services/vinyl/vinyl-gallery-1.webp',
      '/images/services/vinyl/vinyl-gallery-2.webp',
      '/images/services/vinyl/vinyl-gallery-3.webp',
      '/images/services/vinyl/vinyl-gallery-4.webp',
      '/images/services/vinyl/vinyl-gallery-5.webp',
      '/images/services/vinyl/vinyl-gallery-6.webp'
    ]
  },
  'laminate-flooring': {
    heroImage: '/images/services/laminate/laminate-hero-bg.webp',
    galleryImages: [
      '/images/services/laminate/laminate-gallery-1.webp',
      '/images/services/laminate/laminate-gallery-2.webp',
      '/images/services/laminate/laminate-gallery-3.webp',
      '/images/services/laminate/laminate-gallery-4.webp',
      '/images/services/laminate/laminate-gallery-5.webp',
      '/images/services/laminate/laminate-gallery-6.webp'
    ]
  },
  'hardwood-floors': {
    heroImage: '/images/services/hardwood/hardwood-hero-bg.webp',
    galleryImages: [
      '/images/services/hardwood/hardwood-gallery-1.webp',
      '/images/services/hardwood/hardwood-gallery-2.webp',
      '/images/services/hardwood/hardwood-gallery-3.webp',
      '/images/services/hardwood/hardwood-gallery-4.webp',
      '/images/services/hardwood/hardwood-gallery-5.webp',
      '/images/services/hardwood/hardwood-gallery-6.webp'
    ]
  },
  'tile-installation': {
    heroImage: '/images/services/tile/tile-hero-bg.webp',
    galleryImages: [
      '/images/services/tile/tile-gallery-1.webp',
      '/images/services/tile/tile-gallery-2.webp',
      '/images/services/tile/tile-gallery-3.webp',
      '/images/services/tile/tile-gallery-4.webp',
      '/images/services/tile/tile-gallery-5.webp',
      '/images/services/tile/tile-gallery-6.webp'
    ]
  },
  'carpet-tile': {
    heroImage: '/images/services/carpet-tile/carpet-tile-hero-bg.webp',
    galleryImages: [
      '/images/services/carpet-tile/carpet-tile-gallery-1.webp',
      '/images/services/carpet-tile/carpet-tile-gallery-2.webp',
      '/images/services/carpet-tile/carpet-tile-gallery-3.webp',
      '/images/services/carpet-tile/carpet-tile-gallery-4.webp',
      '/images/services/carpet-tile/carpet-tile-gallery-5.webp',
      '/images/services/carpet-tile/carpet-tile-gallery-6.webp'
    ]
  },
  'stone-tile': {
    heroImage: '/images/services/stone/stone-hero-bg.webp',
    galleryImages: [
      '/images/services/stone/stone-gallery-1.webp',
      '/images/services/stone/stone-gallery-2.webp',
      '/images/services/stone/stone-gallery-3.webp',
      '/images/services/stone/stone-gallery-4.webp',
      '/images/services/stone/stone-gallery-5.webp',
      '/images/services/stone/stone-gallery-6.webp'
    ]
  },
  'shower-tile': {
    heroImage: '/images/services/shower/shower-hero-bg.webp',
    galleryImages: [
      '/images/services/shower/shower-gallery-1.webp',
      '/images/services/shower/shower-gallery-2.webp',
      '/images/services/shower/shower-gallery-3.webp',
      '/images/services/shower/shower-gallery-4.webp',
      '/images/services/shower/shower-gallery-5.webp',
      '/images/services/shower/shower-gallery-6.webp'
    ]
  },
  'backsplash': {
    heroImage: '/images/services/backsplash/backsplash-hero-bg.webp',
    galleryImages: [
      '/images/services/backsplash/backsplash-gallery-1.webp',
      '/images/services/backsplash/backsplash-gallery-2.webp',
      '/images/services/backsplash/backsplash-gallery-3.webp',
      '/images/services/backsplash/backsplash-gallery-4.webp',
      '/images/services/backsplash/backsplash-gallery-5.webp',
      '/images/services/backsplash/backsplash-gallery-6.webp'
    ]
  }
};

// About page images
export const aboutImages = {
  teamPhoto: '/images/about/team-photo.webp',
  donWorking: '/images/about/don-working.webp',
  mattPortrait: '/images/about/matt-portrait.webp'
};
