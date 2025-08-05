import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { companyInfo } from '../../data/company';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            SupplySide Flooring
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <Link to="/#services" className="hover:text-primary transition">Services</Link>
            <Link to="/#testimonials" className="hover:text-primary transition">Reviews</Link>
            <Link to="/contact" className="hover:text-primary transition">Contact</Link>
            <a 
              href={`tel:${companyInfo.phone}`} 
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Phone size={18} />
              {companyInfo.phone}
            </a>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <Link 
              to="/" 
              className="block py-2 hover:text-primary" 
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/#services" 
              className="block py-2 hover:text-primary" 
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/#testimonials" 
              className="block py-2 hover:text-primary" 
              onClick={() => setIsOpen(false)}
            >
              Reviews
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 hover:text-primary" 
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <a 
              href={`tel:${companyInfo.phone}`} 
              className="block py-2 text-primary font-semibold"
            >
              Call: {companyInfo.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}