// Service-specific images data structure

export interface ServiceImages {
  heroImage: string;
  galleryImages: string[];
}

export const serviceImages: Record<string, ServiceImages> = {
  'vinyl-flooring': {
    heroImage: '/images/services/vinyl/vinyl-hero-bg.jpg',
    galleryImages: [
      '/images/services/vinyl/vinyl-gallery-1.jpg',
      '/images/services/vinyl/vinyl-gallery-2.jpg',
      '/images/services/vinyl/vinyl-gallery-3.jpg',
      '/images/services/vinyl/vinyl-gallery-4.jpg',
      '/images/services/vinyl/vinyl-gallery-5.jpg',
      '/images/services/vinyl/vinyl-gallery-6.jpg'
    ]
  },
  'laminate-flooring': {
    heroImage: '/images/services/laminate/laminate-hero-bg.jpg',
    galleryImages: [
      '/images/services/laminate/laminate-gallery-1.jpg',
      '/images/services/laminate/laminate-gallery-2.jpg',
      '/images/services/laminate/laminate-gallery-3.jpg',
      '/images/services/laminate/laminate-gallery-4.jpg',
      '/images/services/laminate/laminate-gallery-5.jpg',
      '/images/services/laminate/laminate-gallery-6.jpg'
    ]
  },
  'hardwood-floors': {
    heroImage: '/images/services/hardwood/hardwood-hero-bg.jpg',
    galleryImages: [
      '/images/services/hardwood/hardwood-gallery-1.jpg',
      '/images/services/hardwood/hardwood-gallery-2.jpg',
      '/images/services/hardwood/hardwood-gallery-3.jpg',
      '/images/services/hardwood/hardwood-gallery-4.jpg',
      '/images/services/hardwood/hardwood-gallery-5.jpg',
      '/images/services/hardwood/hardwood-gallery-6.jpg'
    ]
  },
  'tile-installation': {
    heroImage: '/images/services/tile/tile-hero-bg.jpg',
    galleryImages: [
      '/images/services/tile/tile-gallery-1.jpg',
      '/images/services/tile/tile-gallery-2.jpg',
      '/images/services/tile/tile-gallery-3.jpg',
      '/images/services/tile/tile-gallery-4.jpg',
      '/images/services/tile/tile-gallery-5.jpg',
      '/images/services/tile/tile-gallery-6.jpg'
    ]
  },
  'carpet-tile': {
    heroImage: '/images/services/carpet-tile/carpet-tile-hero-bg.jpg',
    galleryImages: [
      '/images/services/carpet-tile/carpet-tile-gallery-1.jpg',
      '/images/services/carpet-tile/carpet-tile-gallery-2.jpg',
      '/images/services/carpet-tile/carpet-tile-gallery-3.jpg',
      '/images/services/carpet-tile/carpet-tile-gallery-4.jpg',
      '/images/services/carpet-tile/carpet-tile-gallery-5.jpg',
      '/images/services/carpet-tile/carpet-tile-gallery-6.jpg'
    ]
  },
  'stone-tile': {
    heroImage: '/images/services/stone/stone-hero-bg.jpg',
    galleryImages: [
      '/images/services/stone/stone-gallery-1.jpg',
      '/images/services/stone/stone-gallery-2.jpg',
      '/images/services/stone/stone-gallery-3.jpg',
      '/images/services/stone/stone-gallery-4.jpg',
      '/images/services/stone/stone-gallery-5.jpg',
      '/images/services/stone/stone-gallery-6.jpg'
    ]
  },
  'shower-tile': {
    heroImage: '/images/services/shower/shower-hero-bg.jpg',
    galleryImages: [
      '/images/services/shower/shower-gallery-1.jpg',
      '/images/services/shower/shower-gallery-2.jpg',
      '/images/services/shower/shower-gallery-3.jpg',
      '/images/services/shower/shower-gallery-4.jpg',
      '/images/services/shower/shower-gallery-5.jpg',
      '/images/services/shower/shower-gallery-6.jpg'
    ]
  },
  'backsplash': {
    heroImage: '/images/services/backsplash/backsplash-hero-bg.jpg',
    galleryImages: [
      '/images/services/backsplash/backsplash-gallery-1.jpg',
      '/images/services/backsplash/backsplash-gallery-2.jpg',
      '/images/services/backsplash/backsplash-gallery-3.jpg',
      '/images/services/backsplash/backsplash-gallery-4.jpg',
      '/images/services/backsplash/backsplash-gallery-5.jpg',
      '/images/services/backsplash/backsplash-gallery-6.jpg'
    ]
  }
};

// About page images
export const aboutImages = {
  teamPhoto: '/images/about/team-photo.jpg',
  donWorking: '/images/about/don-working.jpg',
  mattPortrait: '/images/about/matt-portrait.jpg'
};
