export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ziggy',
    location: 'Property Manager, Refined Realty',
    rating: 5,
    review: 'We use SupplySide for residential and commercial flooring installations at our Chicago properties. They are always professional, reliable, transparent, and very fairly priced. Matt and Don operate at the highest level.',
    service: 'Residential & Commercial Flooring'
  },
  {
    id: '2',
    name: 'Rebecca Maxwell',
    location: 'Owner, TR Contracting',
    rating: 5,
    review: 'I work with flooring installers across Chicago almost every day, and SupplySide is consistently the most professional that we deal with. Their pricing is very fair, and they do great work, job after job.',
    service: 'Professional Flooring Installation'
  },
  {
    id: '3',
    name: 'Pam Williams',
    location: 'Homeowner',
    rating: 5,
    review: 'I hired SupplySide to re-tile our shower as we prepared the house to go on the market. Don did fantastic work. He helped us conceptualize the design from the beginning, and did a beautiful job executing on the design! My husband and I are very pleased, and highly recommend SupplySide for any tilework.',
    service: 'Shower Tile Installation'
  }
];