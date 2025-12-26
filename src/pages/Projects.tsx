import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, CheckCircle, Filter } from 'lucide-react';
import { useState } from 'react';

const allProjects = [
  {
    id: 1,
    name: 'Semmozhi Nagar',
    location: 'Tiruvannamalai',
    status: 'Ongoing',
    priceStart: 'Starts at ₹5 Lakhs',
    features: ['DTCP Approved', 'RERA Registered', '30ft Tar Road', 'Solar Lights'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
    plots: '60+ Plots',
  },
  {
    id: 2,
    name: 'Amudha Surabhi Nagar',
    location: 'Near Girivalam Road',
    status: 'Completed',
    priceStart: 'Starts at ₹7 Lakhs',
    features: ['DTCP Approved', '24ft Roads', 'Water Supply', 'Street Lights'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075',
    plots: '45 Plots',
  },
  {
    id: 3,
    name: 'Thirumalai Garden',
    location: 'Polur Road',
    status: 'Ongoing',
    priceStart: 'Starts at ₹4.5 Lakhs',
    features: ['DTCP Approved', 'Compound Wall', 'Park', 'Wide Roads'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053',
    plots: '80+ Plots',
  },
  {
    id: 4,
    name: 'Shiva Shakti Nagar',
    location: 'Arani Road',
    status: 'Completed',
    priceStart: 'Starts at ₹3.5 Lakhs',
    features: ['DTCP Approved', '20ft Roads', 'Temple Nearby', 'Good Connectivity'],
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070',
    plots: '35 Plots',
  },
  {
    id: 5,
    name: 'Annamalai Heights',
    location: 'Chengam Road',
    status: 'Ongoing',
    priceStart: 'Starts at ₹6 Lakhs',
    features: ['RERA Registered', 'Hilltop View', 'Premium Location', 'Security'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070',
    plots: '50 Plots',
  },
  {
    id: 6,
    name: 'Sri Lakshmi Enclave',
    location: 'Vandavasi Road',
    status: 'Completed',
    priceStart: 'Starts at ₹4 Lakhs',
    features: ['DTCP Approved', 'Corner Plots', 'Water Tank', 'Electricity'],
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070',
    plots: '40 Plots',
  },
];

const Projects = () => {
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all');

  const filteredProjects = allProjects.filter((project) => {
    if (filter === 'all') return true;
    return project.status.toLowerCase() === filter;
  });

  return (
    <>
      <Helmet>
        <title>Our Projects | Thamizh Aruvi Real Estate</title>
        <meta name="description" content="Explore our portfolio of DTCP & RERA approved residential plots in Tiruvannamalai. Find your perfect plot today." />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container-custom mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              Our Portfolio
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Premium <span className="gradient-text">Projects</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Discover our range of residential plot developments across Tiruvannamalai, 
              each designed with your comfort and investment in mind.
            </motion.p>
          </div>
        </section>

        {/* Filter */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="container-custom mx-auto">
            <div className="flex items-center justify-center gap-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              {(['all', 'ongoing', 'completed'] as const).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className="capitalize"
                >
                  {status === 'all' ? 'All Projects' : status}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding pt-8">
          <div className="container-custom mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="glass rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 h-full">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      
                      {/* Status Badge */}
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Ongoing' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {project.status}
                      </div>

                      {/* Plots Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/90 text-foreground text-xs font-semibold">
                        {project.plots}
                      </div>

                      {/* Title */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-background mb-1">{project.name}</h3>
                        <div className="flex items-center gap-1 text-background/80 text-sm">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-primary font-semibold text-lg mb-4">{project.priceStart}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {project.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-muted-foreground text-sm">
                            <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppFAB />
      </main>
    </>
  );
};

export default Projects;
