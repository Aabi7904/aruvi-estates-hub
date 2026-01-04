import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-strong shadow-soft py-2' // Compact when scrolled
            : 'bg-transparent py-4'           // Spacious when at top
        }`}
      >
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* --- LOGO SECTION START --- */}
            <Link to="/" className="flex items-center gap-3 group">
              {/* UPDATED: h-12 for mobile, md:h-16 for desktop */}
              <img 
                src={logo} 
                alt="Thamizh Aruvi Real Estate" 
                className="h-12 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Company Name Text */}
              <div className="flex flex-col">
                {/* UPDATED: text-lg for mobile, md:text-2xl for desktop */}
                <span className="text-lg md:text-2xl font-bold text-primary leading-none tracking-tight font-[Plus Jakarta Sans]">
                  Thamizh Aruvi
                </span>
                {/* UPDATED: text-[10px] for mobile, md:text-xs for desktop */}
                <span className="text-[10px] md:text-xs font-bold text-secondary uppercase tracking-[0.2em] mt-1.5 ml-0.5">
                  Real Estate
                </span>
              </div>
            </Link>
            {/* --- LOGO SECTION END --- */}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-base font-medium transition-colors duration-300 ${
                    isActive(link.href)
                      ? 'text-primary font-semibold'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 gradient-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+919443729991" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91 94437 29991</span>
              </a>
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary-glow text-white shadow-md hover:shadow-glow transition-all px-6">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7 text-foreground" />
              ) : (
                <Menu className="w-7 h-7 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            // UPDATED: Adjusted top to 88px to fit the smaller mobile navbar height
            className="fixed inset-x-0 top-[88px] z-40 glass-strong shadow-card mx-4 rounded-2xl p-6 md:hidden border border-white/20"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium py-3 px-4 rounded-xl transition-colors ${
                    isActive(link.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <a
                  href="tel:+919443729991"
                  className="flex items-center gap-2 text-sm text-muted-foreground mb-4 justify-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 94437 29991</span>
                </a>
                <Button variant="default" className="w-full bg-primary text-white shadow-lg">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;