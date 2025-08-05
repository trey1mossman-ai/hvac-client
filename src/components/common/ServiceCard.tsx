import { Link } from 'react-router-dom';
import { Service } from '../../data/services';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link 
      to={service.url}
      className="block group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="bg-crisp-white rounded-lg shadow-md h-full">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 text-deep-navy uppercase tracking-wider">
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
          <button className="w-full bg-olive-green text-crisp-white py-3 rounded-lg font-bold text-sm hover:bg-sage transition group-hover:bg-sage uppercase tracking-wider">
            Get Free {service.name} Quote
          </button>
        </div>
      </div>
    </Link>
  );
}