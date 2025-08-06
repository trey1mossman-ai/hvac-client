import { Link } from 'react-router-dom';
import { Service } from '../../data/services';
import LazyImage from './LazyImage';

// Generate specific alt text based on service type
const getServiceAltText = (service: Service): string => {
  const baseText = `Professional ${service.name.toLowerCase()} installation in Chicago`;
  
  switch (service.id) {
    case 'vinyl-flooring':
      return `${baseText} featuring waterproof luxury vinyl plank flooring with realistic wood grain texture and durable wear layer by SupplySide Flooring`;
    case 'laminate-flooring':
      return `${baseText} showcasing scratch-resistant laminate flooring with authentic hardwood appearance and seamless finish by SupplySide Flooring`;
    case 'hardwood-floors':
      return `${baseText} displaying beautiful solid hardwood floors with natural wood grain patterns and professional finishing by SupplySide Flooring`;
    case 'tile-installation':
      return `${baseText} featuring ceramic and porcelain tile work with precise alignment and expert grouting by SupplySide Flooring`;
    case 'carpet-tile':
      return `${baseText} showing commercial-grade modular carpet tiles with professional installation and clean edges by SupplySide Flooring`;
    case 'stone-tile':
      return `${baseText} displaying natural stone tile installation with marble, granite, or travertine featuring expert cutting and sealing by SupplySide Flooring`;
    case 'shower-tile':
      return `${baseText} showcasing waterproof shower tile installation with custom design and professional waterproofing by SupplySide Flooring`;
    case 'backsplash':
      return `${baseText} featuring kitchen backsplash tile installation with precise cuts around outlets and seamless finish by SupplySide Flooring`;
    default:
      return `${baseText} featuring high-quality materials and expert craftsmanship by SupplySide Flooring`;
  }
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link 
      to={service.url}
      className="block group service-card transition-all duration-300 hover:-translate-y-1"
    >
      <div className="bg-crisp-white rounded-2xl shadow-sm hover:shadow-xl h-full overflow-hidden flex flex-col">
        <div className="h-64 md:h-72 overflow-hidden relative">
          <LazyImage 
            src={service.image} 
            alt={getServiceAltText(service)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-inter font-medium mb-3 text-deep-charcoal group-hover:text-burnt-sienna transition-colors duration-300">
            {service.name}
          </h3>
          <p className="text-sm text-medium-gray mb-4 font-light leading-relaxed line-clamp-2">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {service.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="text-xs bg-soft-beige px-3 py-1 rounded-full text-burnt-sienna font-medium">
                {feature}
              </span>
            ))}
          </div>
          <button className="w-full bg-burnt-sienna text-crisp-white py-2.5 px-6 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300 mt-auto">
            Get Free Estimate
          </button>
        </div>
      </div>
    </Link>
  );
}