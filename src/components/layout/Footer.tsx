import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { companyInfo } from '../../data/company';
import { services } from '../../data/services';

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-crisp-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">SupplySide Flooring</h3>
            <p className="mb-4 text-sage font-light">
              Chicago's most reliable flooring installation company. 
              80+ years of combined experience.
            </p>
            <p className="text-sm text-sage/80">
              Licensed & Insured<br />
              BBB Accredited
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 4).map(service => (
                <li key={service.id}>
                  <Link 
                    to={service.url}
                    className="text-sage hover:text-light-oak transition font-light"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Contact Info</h3>
            <div className="space-y-3">
              <a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-sage hover:text-light-oak transition font-light"
              >
                <Phone size={18} />
                {companyInfo.phone}
              </a>
              <a 
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2 text-sage hover:text-light-oak transition font-light"
              >
                <Mail size={18} />
                {companyInfo.email}
              </a>
              <div className="flex items-start gap-2 text-sage font-light">
                <MapPin size={18} className="mt-1" />
                <div>
                  {companyInfo.address.street}<br />
                  {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Hours</h3>
            <div className="space-y-2 text-sage font-light">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>Hours of Operation</span>
              </div>
              <p>{companyInfo.hours.weekdays}</p>
              <p>{companyInfo.hours.saturday}</p>
              <p>{companyInfo.hours.sunday}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-sage/20 mt-8 pt-8 text-center text-sage/60">
          <p>&copy; 2025 SupplySide Flooring Installation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}