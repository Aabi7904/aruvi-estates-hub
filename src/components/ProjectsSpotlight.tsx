import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import as from '@/assets/as.jpg';
import sem from '@/assets/sem.jpg';
import aa from '@/assets/aa.jpg';

const projects = [
  {
    id: 1,
    
    
    status: 'Ongoing',
    priceStart: 'Starts at ₹5 Lakhs',
    features: ['DTCP Approved', 'RERA Registered', '30ft Tar Road', 'Solar Lights'],
    image: sem,
    plots: '60+ Plots',
  },
  {
    id: 2,
   
    status: 'Completed',
    priceStart: 'Starts at ₹7 Lakhs',
    features: ['DTCP Approved', '24ft Roads', 'Water Supply', 'Street Lights'],
    image: as,
    plots: '45 Plots',
  },
  {
    id: 3,
   
    status: 'Ongoing',
    priceStart: 'Starts at ₹4.5 Lakhs',
    features: ['DTCP Approved', 'Compound Wall', 'Park', 'Wide Roads'],
    image: aa,
    plots: '80+ Plots',
  },
];

const ProjectsSpotlight = () => {
  const navigate = useNavigate();

  return (
    <section className="section-padding bg-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              Featured Projects
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-4">
              Project <span className="text-primary">Spotlight</span>
            </h2>
            <p className="text-background/70 max-w-xl">
              Explore our premium residential plots in the heart of Tiruvannamalai,
              designed for modern families seeking quality and value.
            </p>
          </div>

          <Button
            variant="outline"
            className="border-background/30 text-background hover:bg-background hover:text-foreground"
            onClick={() => navigate('/projects')}
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
          }}
          className="projects-swiper !pb-16"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl overflow-hidden h-full hover:border-primary/40 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={project.image}
                      
                      className="w-full h-full object-fit group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />

                    {/* Status Badge */}
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Ongoing'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {project.status}
                    </div>

                    {/* Plots Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/90 text-foreground text-xs font-semibold">
                      {project.plots}
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-background mb-1">
                        
                      </h3>
                      <div className="flex items-center gap-1 text-background/80 text-sm">
                        
                      
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-primary font-semibold text-lg mb-4">
                      {project.priceStart}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {project.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-background/70 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => navigate('/projects')}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .projects-swiper .swiper-button-next,
        .projects-swiper .swiper-button-prev {
          color: hsl(var(--primary));
          background: hsl(var(--background));
          width: 48px;
          height: 48px;
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .projects-swiper .swiper-button-next:after,
        .projects-swiper .swiper-button-prev:after {
          transform: scale(0.7);
        }

        .projects-swiper .swiper-pagination-bullet {
          background: hsl(var(--background));
          opacity: 0.5;
        }

        .projects-swiper .swiper-pagination-bullet-active {
          background: hsl(var(--primary));
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSpotlight;
