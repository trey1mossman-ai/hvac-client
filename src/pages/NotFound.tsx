import { Link } from 'react-router-dom';
import { Home, Phone } from 'lucide-react';
import { companyInfo } from '../data/company';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-soft-taupe flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-extrabold text-deep-charcoal mb-4 font-montserrat" style={{fontSize: 'clamp(4rem, 8vw, 8rem)'}}>
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-deep-charcoal mb-6 font-montserrat" style={{fontSize: 'clamp(1.5rem, 4vw, 3rem)'}}>
          Page Not Found
        </h2>
        <p className="text-xl text-medium-gray mb-8 font-light">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="bg-burnt-sienna text-crisp-white px-8 py-4 rounded-lg font-montserrat font-bold text-lg hover:bg-terracotta transition inline-flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Go to Homepage
          </Link>
          <a
            href={`tel:${companyInfo.phone}`}
            className="bg-terracotta text-deep-charcoal px-8 py-4 rounded-lg font-montserrat font-bold text-lg hover:bg-burnt-sienna hover:text-crisp-white transition inline-flex items-center justify-center gap-2"
          >
            <Phone size={20} />
            Call Us: {companyInfo.phone}
          </a>
        </div>
        
        <div className="text-left bg-crisp-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-deep-charcoal mb-4" style={{fontSize: 'clamp(1rem, 2vw, 1.125rem)'}}>Popular Services:</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/luxury-vinyl-flooring-installation-chicago-il" className="text-burnt-sienna hover:text-terracotta transition">
                → Luxury Vinyl Flooring Installation
              </Link>
            </li>
            <li>
              <Link to="/hardwood-floor-installation-chicago-il" className="text-burnt-sienna hover:text-terracotta transition">
                → Hardwood Floor Installation
              </Link>
            </li>
            <li>
              <Link to="/tile-installation-chicago-il" className="text-burnt-sienna hover:text-terracotta transition">
                → Tile Installation
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-burnt-sienna hover:text-terracotta transition">
                → Get Free Estimate
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}