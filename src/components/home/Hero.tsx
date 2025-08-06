import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Shield } from 'lucide-react';
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
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const imageVersion = '2025-01-06'; // Fixed version to prevent regeneration

  const [rotatingText, setRotatingText] = useState(0);
  const rotatingWords = ['EXPERIENCED', 'PROFESSIONAL', 'COURTEOUS', 'TRANSPARENT', 'THOROUGH', 'SKILLED'];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    
    // Preload hero image with fixed version
    const img = new Image();
    img.src = `/images/hero/homepage-hero.webp?v=${imageVersion}`;
    img.onload = () => setHeroImageLoaded(true);
    
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
    <section 
      id="hero"
      className={`bg-soft-beige py-24 md:py-32 relative transition-opacity duration-700 ${heroImageLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `url(/images/hero/homepage-hero.webp?v=${imageVersion})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal/80 via-deep-charcoal/70 to-deep-charcoal/60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center hero-grid">
          {/* Left Side - 60% */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-crisp-white mb-6 leading-relaxed font-inter drop-shadow-lg">
              Chicago's Most Reliable<br />
              Flooring Installation
            </h1>
            <p className="text-base md:text-lg text-crisp-white mb-8 font-medium leading-relaxed drop-shadow-md">
              Combined 80+ Years of Professional Installation Across Chicagoland
            </p>
            
            {/* Trust Bar */}
            <div className="flex flex-wrap gap-4 mb-10 text-crisp-white font-medium bg-deep-charcoal/60 backdrop-blur-sm rounded-lg p-3 inline-flex">
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
            <div className="flex flex-col sm:flex-row gap-4 mb-12 hero-cta-group">
              <a
                href="#hero-form"
                className="bg-burnt-sienna text-crisp-white px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300 inline-flex items-center justify-center shadow-lg"
              >
                Schedule Your Free Consultation
              </a>
              <a
                href="#services"
                className="bg-crisp-white/90 backdrop-blur-sm border-2 border-burnt-sienna text-burnt-sienna px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-burnt-sienna hover:text-crisp-white transition-all duration-300 inline-flex items-center justify-center shadow-lg"
              >
                View Services
              </a>
            </div>
            
            {/* Rotating Text */}
            <div className="mt-8 flex items-baseline">
              <span className="text-lg md:text-xl font-inter font-bold text-crisp-white mr-2 drop-shadow-lg">
                We are
              </span>
              <div className="rotating-words-container">
                <div
                  className="rotating-words-inner"
                  style={{ transform: `translateY(-${rotatingText * 40}px)` }}
                >
                  {rotatingWords.map((word) => (
                    <span
                      key={word}
                      className="rotating-word text-lg md:text-xl font-bold text-crisp-white whitespace-nowrap drop-shadow-lg"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - 40% Form */}
          <div id="hero-form" className="bg-crisp-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl hero-form-wrapper border border-white/50">
            <h2 className="text-xl font-inter font-medium text-deep-charcoal mb-3 text-center">
              Get Your Free Estimate
            </h2>
            <p className="text-sm text-medium-gray text-center mb-8">
              No obligations. No surprises. Just honest pricing.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-burnt-sienna/20 focus:border-burnt-sienna font-inter bg-gray-50 hover:bg-white transition-all duration-200 text-deep-charcoal placeholder-gray-400"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-burnt-sienna/20 focus:border-burnt-sienna font-inter bg-gray-50 hover:bg-white transition-all duration-200 text-deep-charcoal placeholder-gray-400"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-burnt-sienna/20 focus:border-burnt-sienna font-inter bg-gray-50 hover:bg-white transition-all duration-200 text-deep-charcoal placeholder-gray-400"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-burnt-sienna/20 focus:border-burnt-sienna font-inter bg-gray-50 hover:bg-white transition-all duration-200 text-deep-charcoal placeholder-gray-400"
                />
              </div>
              
              <div>
                <select
                  name="serviceType"
                  required
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-burnt-sienna/20 focus:border-burnt-sienna font-inter bg-gray-50 hover:bg-white transition-all duration-200 text-deep-charcoal placeholder-gray-400"
                >
                  <option value="">Select Service Type *</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-burnt-sienna text-crisp-white py-2.5 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300"
              >
                Schedule Your Free Consultation
              </button>
            </form>
            
            <p className="text-xs text-medium-gray text-center mt-4">
              We'll call within 2 hours during business hours
            </p>
            
            <div className="text-center mt-6">
              <p className="text-medium-gray mb-2">Prefer to talk now?</p>
              <a
                href={`tel:${companyInfo.phone}`}
                className="text-xl font-medium text-burnt-sienna hover:text-opacity-80 transition"
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