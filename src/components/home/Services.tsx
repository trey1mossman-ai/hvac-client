import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import ServiceCard from '../common/ServiceCard';

export default function Services() {
  return (
    <section id="services" className="py-20 bg-soft-taupe">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-deep-navy mb-4 uppercase tracking-wider">
            Our Flooring Services
          </h2>
          <p className="text-xl text-cool-gray max-w-2xl mx-auto font-light">
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
            className="inline-block bg-olive-green text-crisp-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-sage transition uppercase tracking-wider"
          >
            Get Free Quote for Any Service
          </Link>
        </div>
      </div>
    </section>
  );
}