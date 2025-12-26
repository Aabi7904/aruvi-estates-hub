import { Link } from 'react-router-dom';
import { Home, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-foreground text-background">
      {/* Gradient Top Border */}
      <div className="h-1 gradient-primary w-full" />

      <div className="container-custom mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Home className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Thamizh Aruvi</h3>
                <p className="text-sm text-background/60">Real Estate</p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Building your future in Tiruvannamalai with premium plots and homes. 
              Trusted by 1000+ happy families over 20+ years of excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Projects', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-background/70 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Projects</h4>
            <ul className="space-y-3">
              {['Semmozhi Nagar', 'Amudha Surabhi Nagar', 'View All Projects'].map((item) => (
                <li key={item}>
                  <Link to="/projects" className="text-background/70 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  No.27, Manaloor Pettai Main Road, Thiruvannamalai - 606601
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919443729991" className="text-background/70 hover:text-primary transition-colors text-sm">
                  +91 94437 29991
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@thamizharvui.com" className="text-background/70 hover:text-primary transition-colors text-sm">
                  info@thamizharvui.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © 2025 Thamizh Aruvi Real Estate. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-background/60 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-background/60 hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 bottom-6 w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-110"
      >
        <ArrowUp className="w-5 h-5 text-primary-foreground" />
      </button>
    </footer>
  );
};

export default Footer;
