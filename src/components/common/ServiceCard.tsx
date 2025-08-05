import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Service } from '../../data/services';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">
          {service.name}
        </h3>
        <p className="text-gray-600 mb-4">
          {service.description}
        </p>
        <ul className="space-y-2 mb-4">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <span className="text-primary mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center text-primary font-semibold hover:text-green-700 transition"
        >
          Learn More
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
}