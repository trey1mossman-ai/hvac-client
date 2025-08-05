import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { CheckCircle, Clock, Shield, Award } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>SupplySide Flooring - Chicago's Most Reliable Flooring Installation</title>
        <meta name="description" content="Professional flooring installation in Chicago. 80+ years experience. Licensed, insured, family owned. Free quotes: 312-210-0606" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Chicago's Most Reliable Flooring Installation
          </h1>
          <p className="text-xl mb-8">
            Combined 80+ Years of Professional Installation Across Chicagoland
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#contact"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Free Quote
            </a>
            <a
              href="tel:3122100606"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
            >
              Call: 312-210-0606
            </a>
          </div>
          
          <div className="flex justify-center gap-8 mt-12">
            <div className="flex items-center gap-2">
              <CheckCircle />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock />
              <span>80+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield />
              <span>5-Year Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Our Flooring Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.slug}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <service.icon size={48} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to={`/services/${service.slug}`}
                  className="text-primary font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Get Your Free Quote
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl mb-8">
              Ready to transform your floors? Call us today for a free, no-obligation estimate.
            </p>
            <a
              href="tel:3122100606"
              className="bg-primary text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition inline-block"
            >
              Call Now: 312-210-0606
            </a>
            <p className="mt-4 text-gray-600">
              Monday - Saturday: 7:00 AM - 7:00 PM
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

const services = [
  {
    slug: 'tile-installation-chicago-il',
    title: 'Tile Installation',
    description: 'Ceramic, porcelain, and natural stone tile for kitchens, bathrooms, and floors.',
    icon: Award,
  },
  {
    slug: 'hardwood-floor-installation-chicago-il',
    title: 'Hardwood Floors',
    description: 'Beautiful solid and engineered hardwood installation, refinishing, and repair.',
    icon: Award,
  },
  {
    slug: 'laminate-flooring-installation-chicago-il',
    title: 'Laminate Flooring',
    description: 'Durable, cost-effective laminate flooring that looks like real wood or stone.',
    icon: Award,
  },
  {
    slug: 'luxury-vinyl-flooring-installation-chicago-il',
    title: 'Luxury Vinyl',
    description: 'Waterproof LVP and LVT installation for modern, low-maintenance flooring.',
    icon: Award,
  },
]