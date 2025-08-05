export const companyInfo = {
  name: 'SupplySide Flooring Installation',
  phone: '312-210-0606',
  email: 'info@supplysidefloors.com',
  address: {
    street: '1111 W 35th Street',
    city: 'Chicago',
    state: 'IL',
    zip: '60609'
  },
  hours: {
    weekdays: 'Monday - Friday: 7:00 AM - 7:00 PM',
    saturday: 'Saturday: 8:00 AM - 5:00 PM',
    sunday: 'Sunday: Closed'
  },
  serviceArea: [
    'Chicago',
    'Oak Park',
    'Evanston',
    'Skokie',
    'Cicero',
    'Berwyn',
    'Oak Lawn',
    'Naperville',
    'Aurora',
    'Joliet'
  ],
  socialMedia: {
    facebook: '#',
    instagram: '#',
    yelp: '#'
  }
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: companyInfo.name,
  image: 'https://mediumblue-chamois-837591.hostingersite.com/images/logo.jpg',
  telephone: companyInfo.phone,
  email: companyInfo.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: companyInfo.address.street,
    addressLocality: companyInfo.address.city,
    addressRegion: companyInfo.address.state,
    postalCode: companyInfo.address.zip,
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.8298,
    longitude: -87.6562
  },
  url: 'https://mediumblue-chamois-837591.hostingersite.com',
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '19:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '17:00'
    }
  ],
  areaServed: companyInfo.serviceArea.map(city => ({
    '@type': 'City',
    name: city
  }))
};