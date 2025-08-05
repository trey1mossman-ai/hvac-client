import { Link } from 'react-router-dom';
import { Home, Phone } from 'lucide-react';
import { companyInfo } from '../data/company';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-soft-taupe flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-black text-deep-navy mb-4 font-montserrat uppercase tracking-header">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-deep-navy mb-6 font-montserrat uppercase">
          Page Not Found
        </h2>
        <p className="text-xl text-cool-gray mb-8 font-light">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="bg-olive-green text-crisp-white px-8 py-4 rounded-lg font-montserrat font-bold text-lg hover:bg-sage transition inline-flex items-center justify-center gap-2 uppercase tracking-header"
          >
            <Home size={20} />
            Go to Homepage
          </Link>
          <a
            href={`tel:${companyInfo.phone}`}
            className="bg-sage text-deep-navy px-8 py-4 rounded-lg font-montserrat font-bold text-lg hover:bg-olive-green hover:text-crisp-white transition inline-flex items-center justify-center gap-2"
          >
            <Phone size={20} />
            Call Us: {companyInfo.phone}
          </a>
        </div>
        
        <div className="text-left bg-crisp-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold text-deep-navy mb-4 uppercase">Popular Services:</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/luxury-vinyl-flooring-installation-chicago-il" className="text-olive-green hover:text-sage transition">
                → Luxury Vinyl Flooring Installation
              </Link>
            </li>
            <li>
              <Link to="/hardwood-floor-installation-chicago-il" className="text-olive-green hover:text-sage transition">
                → Hardwood Floor Installation
              </Link>
            </li>
            <li>
              <Link to="/tile-installation-chicago-il" className="text-olive-green hover:text-sage transition">
                → Tile Installation
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-olive-green hover:text-sage transition">
                → Contact Us for Free Quote
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}