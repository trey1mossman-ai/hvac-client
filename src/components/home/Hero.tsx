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

  const [rotatingText, setRotatingText] = useState(0);
  const rotatingWords = ['RELIABLE', 'PROFESSIONAL', 'COURTEOUS', 'EXPERIENCED'];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    
    // Preload hero image
    const img = new Image();
    img.src = '/images/hero/homepage-hero.jpg';
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
      className={`bg-cream py-24 md:py-32 relative transition-opacity duration-700 ${heroImageLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: 'url(/images/hero/homepage-hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-cream/90"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center hero-grid">
          {/* Left Side - 60% */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-navy mb-6 leading-relaxed font-inter">
              Chicago's Most Reliable<br />
              Flooring Installation
            </h1>
            <p className="text-lg md:text-xl text-cool-gray mb-8 font-inter font-light leading-relaxed">
              Combined 80+ Years of Professional Installation Across Chicagoland
            </p>
            
            {/* Trust Bar */}
            <div className="flex flex-wrap gap-4 mb-10 text-warm-wood font-medium">
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
                className="bg-olive-green text-crisp-white px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300 inline-flex items-center justify-center"
              >
                Get Free Estimate
              </a>
              <a
                href="#services"
                className="border-2 border-olive-green text-olive-green px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-olive-green hover:text-crisp-white transition-all duration-300 inline-flex items-center justify-center"
              >
                See Our Work
              </a>
            </div>
            
            {/* Rotating Text */}
            <div className="mt-8">
              <span className="text-xl md:text-2xl font-inter font-medium text-warm-wood">
                We are{' '}
              </span>
              <div className="rotating-words-container">
                <div
                  className="rotating-words-inner"
                  style={{ transform: `translateY(-${rotatingText * 40}px)` }}
                >
                  {rotatingWords.map((word) => (
                    <span
                      key={word}
                      className="rotating-word text-xl md:text-2xl font-inter font-medium text-warm-wood"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - 40% Form */}
          <div id="hero-form" className="bg-crisp-white p-10 rounded-2xl shadow-lg hero-form-wrapper glass-effect">
            <h2 className="text-xl font-inter font-medium text-deep-navy mb-8 text-center">
              Get Your Free Estimate
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-olive-green/20 focus:border-olive-green font-inter bg-gray-50 hover:bg-white transition-all duration-200 text-deep-navy placeholder-gray-400"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-olive-green/20 focus:border-olive-green font-inter bg-gray-50 hover:bg-white transition-all duration-200 text-deep-navy placeholder-gray-400"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-olive-green/20 focus:border-olive-green font-inter bg-gray-50 hover:bg-white transition-all duration-200 text-deep-navy placeholder-gray-400"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-olive-green/20 focus:border-olive-green font-inter bg-gray-50 hover:bg-white transition-all duration-200 text-deep-navy placeholder-gray-400"
                />
              </div>
              
              <div>
                <select
                  name="serviceType"
                  required
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-olive-green/20 focus:border-olive-green font-inter bg-gray-50 hover:bg-white transition-all duration-200 text-deep-navy placeholder-gray-400"
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
                className="w-full bg-olive-green text-crisp-white py-2.5 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300"
              >
                Get Free Estimate
              </button>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-cool-gray mb-2">Or Call:</p>
              <a
                href={`tel:${companyInfo.phone}`}
                className="text-xl font-medium text-olive-green hover:text-opacity-80 transition"
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