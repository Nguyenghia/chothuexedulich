
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">TravelWheels</h3>
            <p className="text-muted-foreground max-w-xs">
              Providing premium travel experiences and car rental services for unforgettable journeys.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-muted-foreground hover:text-primary transition-colors">
                  Tour Trọn Gói
                </Link>
              </li>
              <li>
                <Link to="/rentals" className="text-muted-foreground hover:text-primary transition-colors">
                  Thuê Xe
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tours nổi bật</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tours/vung-tau" className="text-muted-foreground hover:text-primary transition-colors">
                  Vũng Tàu
                </Link>
              </li>
              <li>
                <Link to="/tours/nha-trang" className="text-muted-foreground hover:text-primary transition-colors">
                  Nha Trang 
                </Link>
              </li>
              <li>
                <Link to="/tours/da-lat" className="text-muted-foreground hover:text-primary transition-colors">
                  Đà Lạt
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-muted-foreground hover:text-primary transition-colors">
                  View All Tours
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  123 Travel Street, District 1, Ho Chi Minh City, Vietnam
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <span className="text-muted-foreground">+84 123 456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary" />
                <span className="text-muted-foreground">info@travelwheels.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} TravelWheels. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
