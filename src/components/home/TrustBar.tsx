import { Shield, Award, Clock, CheckCircle } from 'lucide-react';

export default function TrustBar() {
  const trustItems = [
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Fully protected'
    },
    {
      icon: Award,
      title: 'Expert Craftsmanship',
      description: 'Meticulous attention to detail'
    },
    {
      icon: Clock,
      title: '80+ Years Experience',
      description: 'Combined expertise'
    },
    {
      icon: CheckCircle,
      title: '1000+ Happy Homes',
      description: 'Across Chicagoland'
    }
  ];

  return (
    <section className="py-16 bg-crisp-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center">
                <Icon className="w-12 h-12 text-burnt-sienna mx-auto mb-3" />
                <h3 className="font-inter font-medium text-deep-charcoal text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-medium-gray font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}