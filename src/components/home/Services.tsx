import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import ServiceCard from '../common/ServiceCard';

export default function Services() {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Flooring Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From luxury vinyl to natural stone, we install it all with precision and care
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Get Free Quote for Any Service
          </Link>
        </div>
      </div>
    </section>
  );
}