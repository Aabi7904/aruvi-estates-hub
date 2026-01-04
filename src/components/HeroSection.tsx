import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Shield, Award, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';
import logo from '@/assets/logo.png';

// Your slideshow images
const slideImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  heroBg
];

const HeroSection = () => {
  const [showLogoIntro, setShowLogoIntro] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 1. Logo Animation Timer (3.8 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogoIntro(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  // 2. Slideshow Loop (Starts after logo intro)
  useEffect(() => {
    if (!showLogoIntro) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showLogoIntro]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      
      {/* BACKGROUND (Fades in after intro) */}
      <AnimatePresence>
        {!showLogoIntro && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={heroBg}
              alt="Premium residential development"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6 border border-secondary/20"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">RERA & DTCP Approved Projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              Building Your{' '}
              <span className="gradient-text">Future</span> in{' '}
              <span className="relative inline-block">
                Tiruvannamalai
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 10" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Premium plots by Thamizh Aruvi Real Estate. 
              <span className="block">
              <span className="text-foreground font-medium"> 12+ Years of Trust</span> {" "}with 1000+ happy families.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link to="/projects">
                <Button size="lg" className="group text-white w-full sm:w-auto text-lg h-12 px-8 bg-primary hover:bg-primary-glow shadow-lg hover:shadow-glow transition-all">
                  View Projects
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button variant="outline" size="lg" className="group border-input bg-background/50 hover:bg-accent hover:text-accent-foreground w-full sm:w-auto text-lg h-12 px-8 backdrop-blur-sm">
                  <Play className="w-5 h-5 mr-2 text-primary" />
                  Contact Us
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-sm">
                <Award className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium text-foreground/80">Award Winning</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground/80">Prime Locations</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - THE ANIMATION CONTAINER */}
          <div className="relative h-[500px] w-full flex items-center justify-center">
             <AnimatePresence mode="wait">
                
                {/* --- 1. LOGO INTRO ANIMATION --- */}
                {showLogoIntro ? (
                  <motion.div
                    key="logo-intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <div className="relative z-10 flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          duration: 1.5 
                        }}
                        className="mb-6 relative"
                      >
                         <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse" />
                         <img src={logo} alt="Logo" className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10 drop-shadow-2xl" />
                      </motion.div>

                      <div className="flex flex-col items-center overflow-hidden">
                        <motion.h2 
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                          className="text-4xl md:text-5xl font-bold text-primary tracking-tight"
                        >
                          Thamizh Aruvi
                        </motion.h2>
                        
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "100%", opacity: 1 }}
                          transition={{ delay: 1.0, duration: 0.8 }}
                          className="h-1 bg-secondary w-full my-2 rounded-full"
                        />

                        <motion.span 
                          initial={{ y: -20, opacity: 0, letterSpacing: "0em" }}
                          animate={{ y: 0, opacity: 1, letterSpacing: "0.3em" }}
                          transition={{ delay: 1.2, duration: 0.8 }}
                          className="text-sm md:text-base font-bold text-secondary uppercase"
                        >
                          Real Estate
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  
                  /* --- 2. SLIDESHOW + YOUR ORIGINAL FLOATING BOXES --- */
                  <motion.div
                    key="slideshow-container"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-full max-w-lg mx-auto"
                  >
                    {/* Glass Frames */}
                    <div className="absolute inset-0 glass-strong rounded-[2rem] shadow-2xl transform rotate-3 z-0 border border-white/40" />
                    <div className="absolute inset-0 glass rounded-[2rem] shadow-card -rotate-3 z-0 border border-white/40" />
                    
                    {/* Main Image */}
                    <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-inner border-[6px] border-white/50 z-10 bg-white">
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={currentSlide}
                          src={slideImages[currentSlide]}
                          alt="Property Slideshow"
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.1, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* --- YOUR ORIGINAL FLOATING BOXES RESTORED HERE --- */}
                    
                    {/* 1. DTCP Approved Box (Left) */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }} // Slight delay after slideshow appears
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

                    {/* 2. Happy Families Box (Right) */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
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

                  </motion.div>
                )}
             </AnimatePresence>
          </div>
          
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
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