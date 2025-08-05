import { Link } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            SupplySide Flooring
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <Link to="/about" className="hover:text-primary transition">About</Link>
            <div className="relative group">
              <span className="hover:text-primary transition cursor-pointer">Services</span>
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-2 py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/services/tile-installation-chicago-il" className="block px-4 py-2 hover:bg-gray-100">
                  Tile Installation
                </Link>
              </div>
            </div>
            <a href="tel:3122100606" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              <Phone size={18} />
              312-210-0606
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="block py-2" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block py-2" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/services/tile-installation-chicago-il" className="block py-2" onClick={() => setIsOpen(false)}>
              Tile Installation
            </Link>
            <a href="tel:3122100606" className="block py-2 text-primary font-semibold">
              Call: 312-210-0606
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}