import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Phone } from 'lucide-react';
import { services } from '../../data/services';
import { companyInfo } from '../../data/company';
import ContactForm from '../../components/common/ContactForm';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{service.name} Chicago | SupplySide Flooring</title>
        <meta 
          name="description" 
          content={`Professional ${service.name.toLowerCase()} in Chicago. ${service.description} Licensed & insured. Free quotes: ${companyInfo.phone}`} 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.name} in Chicago
            </h1>
            <p className="text-xl mb-8 opacity-95">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Get Free Quote
              </a>
              <a
                href={`tel:${companyInfo.phone}`}
                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
              >
                <Phone className="inline-block mr-2" size={20} />
                {companyInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  About Our {service.name} Service
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  {service.detailedDescription || service.description}
                </p>
                <p className="text-gray-700 mb-6">
                  With over 80 years of combined experience, our team delivers exceptional 
                  {' ' + service.name.toLowerCase()} services throughout Chicago and surrounding suburbs. 
                  We use only premium materials and proven installation techniques to ensure 
                  your floors last for years to come.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Why Choose SupplySide for {service.name}?
                </h3>
                <ul className="space-y-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Licensed, bonded & insured professionals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Free, detailed estimates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Financing options available</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Service Area */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {service.name} Service Areas
              </h3>
              <p className="text-gray-700 mb-4">
                We provide professional {service.name.toLowerCase()} throughout Chicago and the surrounding suburbs including:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {companyInfo.serviceArea.map((area, index) => (
                  <span key={index} className="text-gray-600">• {area}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}