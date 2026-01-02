import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Shield, Award, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';

// Your slideshow images
const slideImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  heroBg
];

const HeroSection = () => {
  const [showHouse, setShowHouse] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHouse(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showHouse) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showHouse]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Premium residential development"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">RERA & DTCP Approved Projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              Building Your{' '}
              {/* Changed from text-orange-500 to gradient-text (Green/Gold) */}
              <span className="gradient-text">Future</span> in{' '}
              <span className="relative">
                Tiruvannamalai
                {/* Updated SVG Stroke to use Primary Color (Green) */}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 10" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Premium plots and homes by Thamizh Aruvi Real Estate. 
              <span className="text-foreground font-medium"> 20+ Years of Trust</span> with 1000+ happy families.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              {/* FIXED: Removed 'bg-orange-600' so it uses the default Primary (Green) */}
              <Link to="/projects">
                <Button size="lg" className="group text-white w-full sm:w-auto">
                  View Projects
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button variant="outline" size="lg" className="group border-input bg-background hover:bg-accent hover:text-accent-foreground w-full sm:w-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Award Winning Developer</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Prime Locations</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              
              {/* WHITE GLASS CARD */}
              <div className="absolute inset-0 glass rounded-3xl shadow-card overflow-hidden z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                
                <div className="relative h-full w-full">
                  <AnimatePresence mode="wait">
                    {showHouse ? (
                      <motion.div
                        key="house"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                        className="h-full flex items-center justify-center p-8"
                      >
                         <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative"
                          >
                            <svg viewBox="0 0 200 200" className="w-full max-w-xs">
                              {/* FIXED: Roof Color uses --primary variable */}
                              <motion.path d="M100 20L180 80H20L100 20Z" fill="hsl(var(--primary))" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
                              {/* House Body uses --secondary variable (Gold/Bronze) */}
                              <motion.rect x="35" y="80" width="130" height="100" fill="hsl(var(--secondary))" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 1 }} style={{ transformOrigin: 'bottom' }} />
                              {/* Door uses --primary variable */}
                              <motion.rect x="85" y="130" width="30" height="50" fill="hsl(var(--primary))" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }} />
                              
                              <motion.rect x="50" y="100" width="25" height="25" fill="hsl(var(--background))" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.7 }} />
                              <motion.rect x="125" y="100" width="25" height="25" fill="hsl(var(--background))" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.9 }} />
                            </svg>
                         </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="slideshow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                      >
                        <AnimatePresence mode="wait">
                          <motion.img 
                            key={currentSlide}
                            src={slideImages[currentSlide]}
                            alt="Property Slideshow"
                            className="w-full h-full object-cover rounded-3xl"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                          />
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -left-4 top-1/4 glass rounded-xl p-4 shadow-card z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">DTCP Approved</p>
                    <p className="font-semibold text-foreground">100%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -right-4 bottom-1/4 glass rounded-xl p-4 shadow-card z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Happy Families</p>
                    <p className="font-semibold text-foreground">1000+</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;