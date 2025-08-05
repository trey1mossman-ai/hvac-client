import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/common/ContactForm';
import { companyInfo } from '../data/company';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact SupplySide Flooring | Free Quotes Chicago</title>
        <meta 
          name="description" 
          content="Contact SupplySide Flooring for free flooring installation quotes in Chicago. Call 312-210-0606 or fill out our form. Licensed & insured professionals." 
        />
      </Helmet>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Contact SupplySide Flooring
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Get your free, no-obligation flooring installation quote today. 
            We'll respond within 24 hours with a detailed estimate.
          </p>
        </div>
      </div>

      <ContactForm />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <a 
                href={`tel:${companyInfo.phone}`}
                className="text-primary hover:text-green-700 transition"
              >
                {companyInfo.phone}
              </a>
            </div>
            
            <div className="text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <a 
                href={`mailto:${companyInfo.email}`}
                className="text-primary hover:text-green-700 transition"
              >
                {companyInfo.email}
              </a>
            </div>
            
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-600">
                {companyInfo.address.city}, {companyInfo.address.state}
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-gray-600 text-sm">
                Mon-Fri: 7AM-7PM<br />
                Sat: 8AM-5PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}