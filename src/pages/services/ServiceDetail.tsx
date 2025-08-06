import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Phone, Clock, Shield, Award } from 'lucide-react';
import { services } from '../../data/services';
import { companyInfo } from '../../data/company';
import { getServiceFAQs } from '../../data/faqs';
import FAQAccordion from '../../components/common/FAQAccordion';
import ServiceDetails from '../../components/services/ServiceDetails';

export default function ServiceDetail() {
  const { slug } = useParams();
  const location = window.location.pathname.slice(1); // Remove leading slash
  
  // Try to find service by slug from params or by matching the pathname
  const service = services.find(s => 
    s.slug === slug || 
    s.slug === location || 
    s.url === window.location.pathname
  );

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    serviceType: service?.id || ''
  });

  if (!service) {
    return <Navigate to="/" replace />;
  }

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

  const processsteps = [
    { step: '1', title: 'Free Consultation', description: 'Schedule your free in-home estimate' },
    { step: '2', title: 'Professional Measurement', description: 'Accurate measurements for perfect fit' },
    { step: '3', title: 'Material Selection', description: 'Choose from premium flooring options' },
    { step: '4', title: 'Expert Installation', description: 'Professional installation with meticulous attention to detail' }
  ];

  const serviceFaqs = getServiceFAQs(service.id);
  
  // Fallback FAQs if service doesn't have specific ones
  const defaultFaqs = [
    { 
      question: `How long does ${service.name.toLowerCase()} installation take?`, 
      answer: 'Most installations are completed in 1-3 days depending on the project size and complexity. We\'ll provide a detailed timeline during your free consultation.' 
    },
    { 
      question: `Is ${service.name.toLowerCase()} suitable for my home?`, 
      answer: `Our flooring experts will assess your specific needs during a free consultation to ensure ${service.name.toLowerCase()} is the perfect choice for your space and lifestyle.` 
    },
    { 
      question: 'Do you move furniture?', 
      answer: 'Yes, we offer professional furniture moving services as part of our comprehensive installation package to ensure a smooth, hassle-free experience.' 
    },
    { 
      question: 'What guarantees do you provide?', 
      answer: 'We guarantee professional installation with meticulous attention to detail on all flooring projects. Our expert craftsmanship ensures your investment is protected with quality workmanship.' 
    },
    { 
      question: 'What about pricing and payment?', 
      answer: 'We provide transparent pricing with free, no-obligation quotes. No hidden costs - you\'ll know exactly what you\'re paying upfront with our straightforward pricing structure.' 
    }
  ];
  
  const faqs = serviceFaqs.length > 0 ? serviceFaqs : defaultFaqs;

  return (
    <>
      <Helmet>
        <title>{service.name} Chicago | SupplySide Flooring</title>
        <meta 
          name="description" 
          content={`Professional ${service.name.toLowerCase()} in Chicago. ${service.description} Licensed & insured. Free quotes: ${companyInfo.phone}`} 
        />
      </Helmet>

      {/* Hero Section with 60/40 Split */}
      <section 
        className="bg-soft-beige py-24 md:py-32 relative"
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-soft-beige/90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center">
            {/* Left Side - Service Content */}
            <div>
              <h1 className="text-2xl md:text-3xl font-inter font-semibold text-deep-charcoal mb-6 leading-relaxed">
                {service.name} Installation<br />
                in Chicago
              </h1>
              <p className="text-lg text-medium-gray mb-8 font-light leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10 text-burnt-sienna font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Licensed & Insured
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Free Estimates
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Expert Craftsmanship
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#service-form"
                  className="bg-burnt-sienna text-crisp-white px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300 inline-flex items-center justify-center"
                >
                  Get Free Estimate
                </a>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="border-2 border-burnt-sienna text-burnt-sienna px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-burnt-sienna hover:text-crisp-white transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {companyInfo.phone}
                </a>
              </div>
            </div>

            {/* Right Side - Form */}
            <div id="service-form" className="bg-crisp-white p-10 rounded-2xl shadow-lg">
              <h2 className="text-xl font-inter font-medium text-deep-charcoal mb-3 text-center">
                Get Your Free {service.name} Estimate
              </h2>
              <p className="text-sm text-medium-gray text-center mb-8">
                Accurate pricing in 30 minutes or less
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-burnt-sienna/20 focus:border-burnt-sienna font-inter bg-gray-50 hover:bg-white transition-all duration-200"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-burnt-sienna/20 focus:border-burnt-sienna font-inter bg-gray-50 hover:bg-white transition-all duration-200"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-burnt-sienna/20 focus:border-burnt-sienna font-inter bg-gray-50 hover:bg-white transition-all duration-200"
                />
                
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code *"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-burnt-sienna/20 focus:border-burnt-sienna font-inter bg-gray-50 hover:bg-white transition-all duration-200"
                />
                
                <button
                  type="submit"
                  className="w-full bg-burnt-sienna text-crisp-white py-2.5 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300"
                >
                  Get Free Estimate
                </button>
              </form>
              
              <p className="text-xs text-medium-gray text-center mt-4">
                We'll call within 2 hours during business hours
              </p>
              
              <div className="text-center mt-6">
                <p className="text-medium-gray mb-2">Or Call Now:</p>
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

      {/* Service Details Section */}
      <ServiceDetails service={service} />

      {/* Why Choose Section */}
      <section className="py-24 md:py-32 bg-soft-beige">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-inter font-medium text-deep-charcoal mb-16 text-center">
            Why Choose {service.name}?
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <Award className="w-16 h-16 text-burnt-sienna mx-auto mb-4" />
              <h3 className="text-lg font-inter font-medium text-deep-charcoal mb-3">Premium Quality</h3>
              <p className="text-medium-gray">We use only the highest quality materials from trusted manufacturers</p>
            </div>
            <div className="text-center">
              <Shield className="w-16 h-16 text-burnt-sienna mx-auto mb-4" />
              <h3 className="text-lg font-inter font-medium text-deep-charcoal mb-3">Expert Craftsmanship</h3>
              <p className="text-medium-gray">Our installations are backed by meticulous attention to detail and professional expertise</p>
            </div>
            <div className="text-center">
              <Clock className="w-16 h-16 text-burnt-sienna mx-auto mb-4" />
              <h3 className="text-lg font-inter font-medium text-deep-charcoal mb-3">On-Time Service</h3>
              <p className="text-medium-gray">We show up on time and complete your project as promised</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 md:py-32 bg-soft-taupe">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-inter font-medium text-deep-charcoal mb-16 text-center">
            Our Simple Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processsteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-burnt-sienna text-crisp-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-inter font-medium text-deep-charcoal mb-2">{step.title}</h3>
                <p className="text-medium-gray text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-24 md:py-32 bg-soft-beige">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-inter font-medium text-deep-charcoal mb-12">
              What's Included
            </h2>
            <div className="bg-crisp-white p-10 rounded-2xl shadow-sm">
              <p className="text-xl font-inter font-medium text-burnt-sienna mb-6">
                Complete Installation Service
              </p>
              <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
                {[
                  'Free in-home consultation',
                  'Professional measurement',
                  'Material & labor included',
                  'Furniture moving available',
                  'Old flooring removal',
                  'Clean-up included'
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-burnt-sienna mr-3 flex-shrink-0" size={20} />
                    <span className="text-medium-gray">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#service-form"
                className="bg-burnt-sienna text-crisp-white px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300 inline-block"
              >
                Get Free Estimate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="py-24 md:py-32 bg-soft-taupe">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-inter font-medium text-deep-charcoal mb-16 text-center">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-midnight-navy text-crisp-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-inter font-medium mb-8">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of satisfied Chicago homeowners who trust SupplySide for their flooring needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#service-form"
              className="bg-burnt-sienna text-crisp-white px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300 inline-flex items-center justify-center"
            >
              Get Free Estimate
            </a>
            <a
              href={`tel:${companyInfo.phone}`}
              className="bg-transparent border-2 border-crisp-white px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-crisp-white hover:text-deep-charcoal transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now: {companyInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}