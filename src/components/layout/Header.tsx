import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { companyInfo } from '../../data/company';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      window.location.href = `/#${targetId}`;
      return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const navigationItems = [
    { name: 'Vinyl', url: '/luxury-vinyl-flooring-installation-chicago-il' },
    { name: 'Laminate', url: '/laminate-flooring-installation-chicago-il' },
    { name: 'Hardwood', url: '/hardwood-floor-installation-chicago-il' },
    { name: 'Tile', url: '/tile-installation-chicago-il' },
    { name: 'Showers', url: '/shower-tile-installation-chicago-il' },
    { name: 'About', url: '#about', isAnchor: true },
    { name: 'FAQ', url: '#faq', isAnchor: true },
  ];

  return (
    <header className="bg-deep-charcoal shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a 
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, 'hero')}
            className="text-3xl font-black text-crisp-white font-logo uppercase tracking-header hover:text-terracotta transition cursor-pointer"
          >
            SupplySide
          </a>
          
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              item.isAnchor ? (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={(e) => handleSmoothScroll(e, item.url.substring(1))}
                  className="text-crisp-white hover:text-terracotta transition font-semibold text-sm nav-item"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.url}
                  className="text-crisp-white hover:text-terracotta transition font-semibold text-sm nav-item"
                >
                  {item.name}
                </Link>
              )
            ))}
            <a
              href="#hero-form"
              onClick={(e) => handleSmoothScroll(e, 'hero-form')}
              className="bg-burnt-sienna text-crisp-white px-6 py-2.5 rounded-md hover:bg-opacity-90 transition-all duration-300 font-inter font-medium text-sm"
            >
              Get Free Estimate
            </a>
            <a 
              href={`tel:${companyInfo.phone}`} 
              className="flex items-center gap-2 text-terracotta hover:text-dusty-gold transition font-inter font-medium"
            >
              <Phone size={18} />
              {companyInfo.phone}
            </a>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:312-210-0606"
              className="flex items-center justify-center w-11 h-11 bg-burnt-sienna text-crisp-white rounded-full hover:bg-opacity-90 transition-all duration-300"
              aria-label="Call us at 312-210-0606"
            >
              <Phone size={20} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-crisp-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="lg:hidden bg-deep-charcoal border-t border-terracotta/20">
          <div className="px-4 py-2 space-y-2">
            {navigationItems.map((item) => (
              item.isAnchor ? (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={(e) => {
                    handleSmoothScroll(e, item.url.substring(1));
                    setIsOpen(false);
                  }}
                  className="block py-2 text-crisp-white hover:text-terracotta font-inter font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.url}
                  className="block py-2 text-crisp-white hover:text-terracotta font-inter font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            <a
              href="#hero-form"
              onClick={(e) => {
                handleSmoothScroll(e, 'hero-form');
                setIsOpen(false);
              }}
              className="block py-2 text-burnt-sienna font-inter font-medium"
            >
              Get Free Estimate
            </a>
            <a 
              href={`tel:${companyInfo.phone}`} 
              className="block py-3 text-terracotta font-inter font-medium text-lg"
            >
              Call: {companyInfo.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}