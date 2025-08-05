export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  features: string[];
  startingPrice: string;
  image: string;
  detailedDescription?: string;
}

export const services: Service[] = [
  {
    id: 'vinyl-flooring',
    slug: 'luxury-vinyl-flooring-installation-chicago-il',
    name: 'Luxury Vinyl Plank & Tile',
    description: 'Waterproof flooring perfect for Chicago homes. Looks like real wood or stone.',
    features: ['100% Waterproof', 'Pet-Friendly', '25-Year Warranty', 'Scratch Resistant'],
    startingPrice: 'Free Quote',
    image: '/images/vinyl-flooring.jpg',
    detailedDescription: 'Transform your space with luxury vinyl plank (LVP) or luxury vinyl tile (LVT). Perfect for kitchens, bathrooms, and basements.'
  },
  {
    id: 'tile-installation',
    slug: 'tile-installation-chicago-il',
    name: 'Tile Installation',
    description: 'Ceramic, porcelain, and natural stone tile for kitchens, bathrooms, and floors.',
    features: ['Waterproof', 'Easy to Clean', 'Timeless Style', 'Increases Home Value'],
    startingPrice: 'Free Quote',
    image: '/images/tile-installation.jpg',
    detailedDescription: 'Professional tile installation for floors, walls, backsplashes, and showers. We handle everything from subway tile to large format porcelain.'
  },
  {
    id: 'hardwood-floors',
    slug: 'hardwood-floor-installation-chicago-il',
    name: 'Hardwood Flooring',
    description: 'Beautiful solid and engineered hardwood installation, refinishing, and repair.',
    features: ['Timeless Beauty', 'Adds Home Value', 'Can Be Refinished', 'Lasts Decades'],
    startingPrice: 'Free Quote',
    image: '/images/hardwood-floors.jpg',
    detailedDescription: 'From classic oak to exotic species, we install and refinish all types of hardwood flooring with precision and care.'
  },
  {
    id: 'laminate-flooring',
    slug: 'laminate-flooring-installation-chicago-il',
    name: 'Laminate Flooring',
    description: 'Durable, cost-effective laminate that looks like real wood or stone.',
    features: ['Budget-Friendly', 'Scratch Resistant', 'Easy Maintenance', 'Quick Installation'],
    startingPrice: 'Free Quote',
    image: '/images/laminate-flooring.jpg',
    detailedDescription: 'Modern laminate flooring offers the look of hardwood at a fraction of the cost. Perfect for busy households.'
  },
  {
    id: 'carpet-tile',
    slug: 'carpet-tile-installation-chicago-il',
    name: 'Carpet Tile Installation',
    description: 'Commercial-grade carpet tiles for offices and high-traffic areas.',
    features: ['Easy to Replace', 'Durable', 'Sound Absorbing', 'Professional Look'],
    startingPrice: 'Free Quote',
    image: '/images/carpet-tile.jpg',
    detailedDescription: 'Modular carpet tiles are perfect for commercial spaces and basements. Easy to maintain and replace individual tiles as needed.'
  },
  {
    id: 'backsplash',
    slug: 'backsplash-installation-chicago-il',
    name: 'Backsplash Installation',
    description: 'Transform your kitchen with a beautiful tile backsplash.',
    features: ['Protects Walls', 'Easy to Clean', 'Adds Style', 'Quick Installation'],
    startingPrice: 'Free Quote',
    image: '/images/backsplash.jpg',
    detailedDescription: 'From classic subway tile to intricate mosaics, we create stunning backsplashes that protect your walls and enhance your kitchen.'
  },
  {
    id: 'shower-tile',
    slug: 'shower-tile-installation-chicago-il',
    name: 'Shower Tile Installation',
    description: 'Waterproof shower installations with beautiful tile work.',
    features: ['Fully Waterproof', 'Custom Designs', 'Built-in Shelves', 'Lifetime Warranty'],
    startingPrice: 'Free Quote',
    image: '/images/shower-tile.jpg',
    detailedDescription: 'Complete shower renovations with proper waterproofing and stunning tile designs. We handle everything from simple updates to luxury spa showers.'
  },
  {
    id: 'stone-tile',
    slug: 'stone-tile-installation-chicago-il',
    name: 'Natural Stone Installation',
    description: 'Marble, granite, travertine, and slate installation by experts.',
    features: ['Natural Beauty', 'Unique Patterns', 'Extremely Durable', 'Luxury Appeal'],
    startingPrice: 'Free Quote',
    image: '/images/stone-tile.jpg',
    detailedDescription: 'Natural stone flooring adds unmatched elegance to any space. We expertly install and seal all types of natural stone.'
  }
];