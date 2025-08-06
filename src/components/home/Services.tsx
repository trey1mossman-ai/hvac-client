import { services } from '../../data/services';
import ServiceCard from '../common/ServiceCard';

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-inter font-medium text-deep-charcoal mb-6">
            Our Flooring Services
          </h2>
          <p className="text-base text-medium-gray max-w-3xl mx-auto font-light leading-relaxed">
            From luxury vinyl to natural stone, we install it all with precision and care
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}