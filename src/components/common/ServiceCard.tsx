import { Link } from 'react-router-dom';
import { Service } from '../../data/services';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link 
      to={service.url}
      className="block group service-card hover:shadow-2xl transition-all duration-300"
    >
      <div className="bg-crisp-white rounded-lg shadow-md h-full overflow-hidden flex flex-col">
        <div className="h-48 overflow-hidden">
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-montserrat font-bold mb-3 text-deep-navy uppercase tracking-header">
            {service.name}
          </h3>
          <p className="text-cool-gray mb-4 font-light">
            {service.description}
          </p>
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-cool-gray">
                <span className="text-olive-green mr-2 font-bold">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full bg-olive-green text-crisp-white py-3 rounded-lg font-montserrat font-bold text-sm hover:bg-sage transition-all duration-300 uppercase tracking-header mt-auto cta-button">
            Get Free {service.name} Quote
          </button>
        </div>
      </div>
    </Link>
  );
}