import { Link } from 'react-router-dom';
import { Service } from '../../data/services';
import LazyImage from './LazyImage';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link 
      to={service.url}
      className="block group service-card shadow-hover transition-all duration-300"
    >
      <div className="bg-crisp-white rounded-xl shadow-sm h-full overflow-hidden flex flex-col">
        <div className="h-48 overflow-hidden">
          <LazyImage 
            src={service.image} 
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="text-lg font-inter font-medium mb-4 text-deep-navy">
            {service.name}
          </h3>
          <p className="text-cool-gray mb-6 font-light leading-relaxed">
            {service.description}
          </p>
          <ul className="space-y-3 mb-8">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-cool-gray">
                <span className="text-olive-green mr-3 font-medium">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full bg-olive-green text-crisp-white py-2.5 rounded-md font-inter font-medium text-sm hover:bg-opacity-90 transition-all duration-300 mt-auto">
            Get Free Estimate
          </button>
        </div>
      </div>
    </Link>
  );
}