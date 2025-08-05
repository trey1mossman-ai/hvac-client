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
    <section id="contact-form" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Get Your Free Quote
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block mb-2 font-medium">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block mb-2 font-medium">Service Needed</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                <label htmlFor="message" className="block mb-2 font-medium">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Get Free Quote
              </button>
            </form>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Why Choose SupplySide?</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>80+ years combined experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Licensed, bonded & insured</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>5-year installation warranty</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Free, no-obligation quotes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Financing available</span>
                </li>
              </ul>
              
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-2">Prefer to call?</h4>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-2xl font-bold text-primary hover:text-green-700 transition"
                >
                  {companyInfo.phone}
                </a>
                <p className="text-gray-600 mt-2">
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