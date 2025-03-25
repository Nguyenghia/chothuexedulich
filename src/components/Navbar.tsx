
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Tour Trọn Gói', path: '/tours' },
    { name: 'Thuê Xe', path: '/rentals' },
    { name: 'Liên Hệ', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="text-2xl md:text-3xl font-bold text-primary transition-all"
          >
            Thuê xe du lịch 
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-all hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-foreground/80'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/Tours"
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5"
            >
              Đặt Ngay
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg py-6 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-base font-medium transition-all ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-foreground/80'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-primary text-white px-5 py-2 rounded-full text-base font-medium text-center"
            >
              Đặt Ngay
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
