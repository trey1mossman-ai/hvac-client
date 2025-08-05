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
    name: 'Sarah M.',
    location: 'Lincoln Park, Chicago',
    rating: 5,
    review: 'SupplySide installed luxury vinyl throughout our first floor. They showed up on time every day and finished ahead of schedule. The floors look amazing!',
    service: 'Luxury Vinyl Flooring'
  },
  {
    id: '2',
    name: 'Mike R.',
    location: 'Wicker Park, Chicago',
    rating: 5,
    review: 'Professional team that knows their stuff. They helped us choose the perfect tile for our bathroom renovation. Clean work and fair pricing.',
    service: 'Tile Installation'
  },
  {
    id: '3',
    name: 'Jennifer L.',
    location: 'Oak Park, IL',
    rating: 5,
    review: 'After getting multiple quotes, SupplySide was the most honest and straightforward. They refinished our 100-year-old hardwood floors beautifully.',
    service: 'Hardwood Flooring'
  },
  {
    id: '4',
    name: 'David K.',
    location: 'Evanston, IL',
    rating: 5,
    review: 'They installed carpet tiles in our office space. Very minimal disruption to our business and the result looks fantastic. Highly recommend!',
    service: 'Carpet Tile Installation'
  },
  {
    id: '5',
    name: 'Lisa T.',
    location: 'River North, Chicago',
    rating: 5,
    review: 'The team did an incredible job on our kitchen backsplash. They were meticulous with the pattern and the grout lines are perfect.',
    service: 'Backsplash Installation'
  },
  {
    id: '6',
    name: 'Robert H.',
    location: 'Naperville, IL',
    rating: 5,
    review: 'Complete master bathroom shower renovation. They handled everything from waterproofing to the final grout seal. Couldn\'t be happier!',
    service: 'Shower Tile Installation'
  }
];