import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Shield, ArrowRight } from 'lucide-react';
import { companyInfo } from '../../data/company';
import { services } from '../../data/services';

export default function Hero() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    serviceType: ''
  });

  const [rotatingText, setRotatingText] = useState(0);
  const rotatingWords = ['RELIABLE', 'PROFESSIONAL', 'COURTEOUS', 'EXPERIENCED'];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll contact you within 24 hours with your free quote.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center">
          {/* Left Side - 60% */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-deep-navy mb-4 leading-tight">
              CHICAGO'S MOST RELIABLE<br />
              FLOORING INSTALLATION
            </h1>
            <p className="text-xl md:text-2xl text-cool-gray mb-6 font-montserrat font-light">
              Combined 80+ Years of Professional Installation Across Chicagoland
            </p>
            
            {/* Trust Bar */}
            <div className="flex flex-wrap gap-4 mb-8 text-warm-wood font-semibold">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Licensed
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Insured
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Bonded
              </span>
              <span>•</span>
              <span>Family Owned</span>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#hero-form"
                className="bg-olive-green text-crisp-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-sage transition transform hover:scale-105 inline-flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                Get Free Estimate
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#services"
                className="bg-sage text-deep-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-olive-green hover:text-crisp-white transition inline-flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                See Our Work
              </a>
            </div>
            
            {/* Rotating Text */}
            <div className="text-3xl md:text-4xl font-black text-warm-wood">
              WE ARE{' '}
              <span className="inline-block overflow-hidden h-12 relative">
                {rotatingWords.map((word, index) => (
                  <span
                    key={word}
                    className={`absolute left-0 transition-all duration-500 ${
                      index === rotatingText
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-0 transform -translate-y-full'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </div>
          </div>

          {/* Right Side - 40% Form */}
          <div id="hero-form" className="bg-crisp-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-deep-navy mb-6 text-center uppercase tracking-wider">
              Get Your Free Estimate
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-green focus:border-transparent font-montserrat"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-green focus:border-transparent font-montserrat"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-green focus:border-transparent font-montserrat"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code *"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-green focus:border-transparent font-montserrat"
                />
              </div>
              
              <div>
                <select
                  name="serviceType"
                  required
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-green focus:border-transparent font-montserrat"
                >
                  <option value="">Select Service Type *</option>
                  {services.slice(0, 5).map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-olive-green text-crisp-white py-4 rounded-lg font-bold text-lg hover:bg-sage transition uppercase tracking-wider"
              >
                Get Free Quote
              </button>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-cool-gray mb-2">Or Call:</p>
              <a
                href={`tel:${companyInfo.phone}`}
                className="text-2xl font-bold text-olive-green hover:text-sage transition"
              >
                {companyInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}