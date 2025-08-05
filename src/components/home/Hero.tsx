import { CheckCircle, Clock, Shield } from 'lucide-react';
import { companyInfo } from '../../data/company';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Chicago's Most Reliable<br />
            Flooring Installation
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            Combined 80+ Years of Professional Installation Experience
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#contact-form"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              Get Your Free Quote
            </a>
            <a
              href={`tel:${companyInfo.phone}`}
              className="border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition"
            >
              Call: {companyInfo.phone}
            </a>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-8 h-8" />
              <span className="text-lg">Licensed & Insured</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-8 h-8" />
              <span className="text-lg">80+ Years Experience</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-8 h-8" />
              <span className="text-lg">5-Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}