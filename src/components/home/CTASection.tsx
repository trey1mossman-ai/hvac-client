import { Link } from 'react-router-dom';
import { Phone, Clock, Shield } from 'lucide-react';
import { companyInfo } from '../../data/company';

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-deep-charcoal text-crisp-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg md:text-xl mb-12 text-gray-300">
            Get your free, no-obligation quote today. We'll measure, recommend, and provide transparent pricing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-burnt-sienna text-crisp-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-terracotta transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              Get Free Estimate
            </Link>
            <a
              href={`tel:${companyInfo.phone}`}
              className="inline-flex items-center justify-center border-2 border-crisp-white text-crisp-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-crisp-white hover:text-deep-charcoal transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: {companyInfo.phone}
            </a>
          </div>
          
          <div className="flex flex-wrap gap-8 justify-center text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-burnt-sienna" />
              <span>Same-Day Quotes</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-burnt-sienna" />
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