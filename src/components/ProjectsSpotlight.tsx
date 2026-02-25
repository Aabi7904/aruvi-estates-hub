import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow, Navigation } from 'swiper/modules';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// Images
import g1 from '@/assets/g1.webp';
import g2 from '@/assets/g2.webp';
import g3 from '@/assets/g3.webp';
import g4 from '@/assets/g4.webp';
import g5 from '@/assets/g5.webp';
import g6 from '@/assets/g6.webp';
import g7 from '@/assets/g7.webp';

const galleryImages = [
  { src: g1, alt: 'Premium Layout View' },
  { src: g2, alt: 'Modern Entrance Arch' },
  { src: g3, alt: 'Landscape Garden' },
  { src: g4, alt: 'Drone View of Plots' },
  { src: g5, alt: 'Strategic Location' },
  { src: g6, alt: 'Wide Blacktop Roads' },
  { src: g7, alt: 'Avenue Plantation' },
];

const ProjectsSpotlight = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  // Helper Functions for Buttons
  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // --- FIXED KEYBOARD NAVIGATION ---
  useEffect(() => {
    // If the lightbox is closed (null), do not attach any listener
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault(); // Stop page scroll
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault(); // Stop page scroll
        prevImage();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      }
    };

    // Attach listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener when index changes or component unmounts
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]); // <--- This dependency ensures the listener always knows the current index

  return (
    <section className="section-padding bg-foreground relative overflow-hidden">
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-5 pointer-events-none" />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4 backdrop-blur-sm">
            Visual Tour
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-background mb-4">
            Project <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-background/70 max-w-xl mx-auto text-lg">
            Immerse yourself in the premium quality of our developments.
          </p>
        </motion.div>

        {/* --- MODERN SWIPER CAROUSEL --- */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView="auto"
            initialSlide={2}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 300,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 20 },
              640: { slidesPerView: 1.5, spaceBetween: 30 },
              1024: { slidesPerView: 2.5, spaceBetween: 40 },
            }}
            className="gallery-swiper !pb-16"
          >
            {galleryImages.map((img, index) => (
              <SwiperSlide key={index} className="max-w-[300px] md:max-w-[500px] lg:max-w-[600px]">
                {({ isActive }) => (
                  <motion.div
                    layoutId={`gallery-card-${index}`}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl transition-all duration-500
                      ${isActive ? 'ring-4 ring-primary/20' : 'opacity-60 scale-90 blur-[1px]'}
                    `}
                    onClick={() => openLightbox(index)}
                  >
                    {/* Image */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-[350px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 transition-opacity duration-300" />
                    
                    {/* ICON OVERLAY ONLY (No text captions) */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <div className="bg-black/30 p-3 rounded-full backdrop-blur-sm text-white">
                           <Maximize2 className="w-5 h-5" />
                         </div>
                    </div>

                  </motion.div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link to="/projects">
             <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-primary hover:border-primary px-8">
               View All Projects
             </Button>
          </Link>
        </motion.div>
      </div>

      {/* --- LIGHTBOX (Modal) --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Image Container */}
            <motion.div
              className="relative max-w-6xl w-full mx-4 h-[85vh] flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
              />
              
              {/* No Text Captions */}
              
            </motion.div>

            {/* Controls */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-primary text-white p-4 rounded-full transition-all group backdrop-blur-sm z-50"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-primary text-white p-4 rounded-full transition-all group backdrop-blur-sm z-50"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 bg-white/10 hover:bg-red-500 text-white p-3 rounded-full transition-all backdrop-blur-sm z-50"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="absolute top-6 left-6 text-white/60 font-mono text-sm tracking-widest">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-swiper .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.3;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .gallery-swiper .swiper-pagination-bullet-active {
          background: hsl(var(--primary));
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSpotlight;