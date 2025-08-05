import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Phone, ArrowRight, Clock, Shield, Award } from 'lucide-react';
import { services } from '../../data/services';
import { companyInfo } from '../../data/company';
import { getServiceFAQs } from '../../data/faqs';

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
    { step: '4', title: 'Expert Installation', description: 'Professional installation with warranty' }
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
      question: 'What warranty do you offer?', 
      answer: 'We provide a 5-year installation warranty on all flooring projects, plus manufacturer warranties on materials. Your investment is fully protected.' 
    },
    { 
      question: 'Do you offer financing?', 
      answer: 'Yes, we offer flexible financing options with approved credit, making it easy to get the beautiful floors you want with manageable monthly payments.' 
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
        className="bg-cream py-16 relative"
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-cream/90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center">
            {/* Left Side - Service Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-deep-navy mb-4 uppercase tracking-wider">
                {service.name} Installation<br />
                in Chicago
              </h1>
              <p className="text-xl text-cool-gray mb-6 font-light">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8 text-warm-wood font-semibold">
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
                  5-Year Warranty
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#service-form"
                  className="bg-olive-green text-crisp-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-sage transition inline-flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  Get Free Quote
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="bg-sage text-deep-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-olive-green hover:text-crisp-white transition inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {companyInfo.phone}
                </a>
              </div>
            </div>

            {/* Right Side - Form */}
            <div id="service-form" className="bg-crisp-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-deep-navy mb-6 text-center uppercase tracking-wider">
                Get Your Free {service.name} Quote
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-green focus:border-transparent font-montserrat"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-green focus:border-transparent font-montserrat"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-green focus:border-transparent font-montserrat"
                />
                
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code *"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-green focus:border-transparent font-montserrat"
                />
                
                <button
                  type="submit"
                  className="w-full bg-olive-green text-crisp-white py-4 rounded-lg font-bold text-lg hover:bg-sage transition uppercase tracking-wider"
                >
                  Get Free Quote
                </button>
              </form>
              
              <div className="text-center mt-6">
                <p className="text-cool-gray mb-2">Or Call Now:</p>
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

      {/* Why Choose Section */}
      <section className="py-16 bg-soft-taupe">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-deep-navy mb-12 text-center uppercase tracking-wider">
            Why Choose {service.name}?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Award className="w-16 h-16 text-olive-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-deep-navy mb-2 uppercase">Premium Quality</h3>
              <p className="text-cool-gray">We use only the highest quality materials from trusted manufacturers</p>
            </div>
            <div className="text-center">
              <Shield className="w-16 h-16 text-olive-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-deep-navy mb-2 uppercase">Lifetime Warranty</h3>
              <p className="text-cool-gray">Our installations are backed by comprehensive warranty coverage</p>
            </div>
            <div className="text-center">
              <Clock className="w-16 h-16 text-olive-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-deep-navy mb-2 uppercase">On-Time Service</h3>
              <p className="text-cool-gray">We show up on time and complete your project as promised</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-deep-navy mb-12 text-center uppercase tracking-wider">
            Our Simple Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processsteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-olive-green text-crisp-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-deep-navy mb-2 uppercase">{step.title}</h3>
                <p className="text-cool-gray text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-soft-taupe">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-deep-navy mb-8 uppercase tracking-wider">
              Transparent Pricing
            </h2>
            <div className="bg-crisp-white p-8 rounded-2xl shadow-lg">
              <p className="text-2xl font-bold text-olive-green mb-4">
                Starting from ${service.startingPrice === 'Free Quote' ? '2.99' : service.startingPrice}/sq ft
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
                    <CheckCircle className="text-olive-green mr-3 flex-shrink-0" size={20} />
                    <span className="text-cool-gray">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#service-form"
                className="bg-olive-green text-crisp-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-sage transition inline-block uppercase tracking-wider"
              >
                Get Your Exact Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-deep-navy mb-12 text-center uppercase tracking-wider">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-crisp-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-deep-navy mb-2">{faq.question}</h3>
                <p className="text-cool-gray">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-deep-navy text-crisp-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-wider">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-light">
            Join thousands of satisfied Chicago homeowners who trust SupplySide for their flooring needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#service-form"
              className="bg-olive-green text-crisp-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-sage transition inline-flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              Get Free Estimate
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={`tel:${companyInfo.phone}`}
              className="bg-transparent border-2 border-crisp-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-crisp-white hover:text-deep-navy transition inline-flex items-center justify-center gap-2"
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