import { Service } from '../../data/services';
import { serviceDescriptions } from '../../data/serviceDescriptions';

interface ServiceDetailsProps {
  service: Service;
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const descriptions = serviceDescriptions[service.id];
  return (
    <section className="py-24 md:py-32 bg-soft-taupe">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-inter font-medium text-deep-charcoal mb-8 text-center">
            About {service.name}
          </h2>
          
          <div className="bg-crisp-white rounded-xl p-10 shadow-sm mb-12">
            {descriptions ? (
              <>
                <p className="text-base text-medium-gray font-normal leading-relaxed mb-6">
                  {descriptions.paragraph1}
                </p>
                <p className="text-base text-medium-gray font-normal leading-relaxed mb-8">
                  {descriptions.paragraph2}
                </p>
              </>
            ) : (
              <p className="text-base text-medium-gray font-normal leading-relaxed mb-8">
                {service.detailedDescription || service.description}
              </p>
            )}
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-base font-inter font-medium text-deep-charcoal mb-4">
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-burnt-sienna mr-3 mt-1">✓</span>
                      <span className="text-medium-gray font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-base font-inter font-medium text-deep-charcoal mb-4">
                  Ideal For
                </h3>
                <ul className="space-y-3 text-medium-gray font-light">
                  <li>• Residential homes</li>
                  <li>• Commercial properties</li>
                  <li>• High-traffic areas</li>
                  <li>• Moisture-prone spaces</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a
              href="#service-form"
              className="inline-block bg-burnt-sienna text-crisp-white px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300"
            >
              Get Free Estimate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}