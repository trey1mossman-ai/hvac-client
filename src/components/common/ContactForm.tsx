import { useState } from 'react';
import { companyInfo } from '../../data/company';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can integrate with Formspree, EmailJS, or any other service here
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll contact you within 24 hours.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact-form" className="py-20 bg-soft-taupe">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-inter font-bold text-center mb-8 text-deep-charcoal">
            Ready to get started?
          </h2>
          <p className="text-center text-medium-gray mb-12 text-lg">
            Get your free estimate today - no obligations, just honest pricing.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 font-semibold text-deep-charcoal">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burnt-sienna focus:border-transparent font-montserrat"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-semibold text-deep-charcoal">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burnt-sienna focus:border-transparent font-montserrat"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block mb-2 font-semibold text-deep-charcoal">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burnt-sienna focus:border-transparent font-montserrat"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block mb-2 font-semibold text-deep-charcoal">Service Needed</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burnt-sienna focus:border-transparent font-montserrat"
                >
                  <option value="">Select a service</option>
                  <option value="vinyl">Luxury Vinyl Flooring</option>
                  <option value="tile">Tile Installation</option>
                  <option value="hardwood">Hardwood Flooring</option>
                  <option value="laminate">Laminate Flooring</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-semibold text-deep-charcoal">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burnt-sienna focus:border-transparent font-montserrat"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-burnt-sienna text-crisp-white py-4 rounded-lg font-bold text-lg hover:bg-terracotta transition"
              >
                Get Free Estimate
              </button>
            </form>
            
            <div className="bg-soft-beige p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-deep-charcoal" style={{fontSize: 'clamp(1.25rem, 3vw, 2rem)'}}>Why Choose SupplySide?</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-burnt-sienna mr-2 font-bold">✓</span>
                  <span className="text-medium-gray">80+ years combined experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-burnt-sienna mr-2 font-bold">✓</span>
                  <span className="text-medium-gray">Licensed, bonded & insured</span>
                </li>
                <li className="flex items-start">
                  <span className="text-burnt-sienna mr-2 font-bold">✓</span>
                  <span className="text-medium-gray">Expert craftsmanship guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="text-burnt-sienna mr-2 font-bold">✓</span>
                  <span className="text-medium-gray">Free, no-obligation quotes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-burnt-sienna mr-2 font-bold">✓</span>
                  <span className="text-medium-gray">Transparent pricing</span>
                </li>
              </ul>
              
              <div className="border-t border-terracotta/20 pt-6">
                <h4 className="font-bold mb-2 text-deep-charcoal">Prefer to call?</h4>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-2xl font-bold text-burnt-sienna hover:text-terracotta transition"
                >
                  {companyInfo.phone}
                </a>
                <p className="text-medium-gray mt-2">
                  {companyInfo.hours.weekdays}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}