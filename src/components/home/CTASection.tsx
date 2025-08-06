import { Link } from 'react-router-dom';
import { Phone, Clock, Shield } from 'lucide-react';
import { companyInfo } from '../../data/company';

export default function CTASection() {
  return (
    <section className="py-12 md:py-16 bg-deep-navy text-crisp-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-crisp-white">
            Ready to Transform Your Space?
          </h2>
          <p className="text-base md:text-lg mb-8 text-gray-300">
            Get your free, no-obligation quote today. We'll measure, recommend, and provide transparent pricing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-burnt-sienna text-crisp-white px-6 py-2.5 rounded-md font-medium text-base hover:bg-terracotta transition-all duration-300"
            >
              Get Free Estimate
            </Link>
            <a
              href={`tel:${companyInfo.phone}`}
              className="inline-flex items-center justify-center border-2 border-crisp-white text-crisp-white px-6 py-2.5 rounded-md font-medium text-base hover:bg-crisp-white hover:text-deep-charcoal transition-all duration-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now: {companyInfo.phone}
            </a>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-burnt-sienna" />
              <span>Same-Day Quotes</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-burnt-sienna" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-burnt-sienna font-bold">48</span>
              <span>Years Lead Installer Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}