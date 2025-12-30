import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, CheckCircle, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- FIREBASE IMPORTS ---
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Define the shape of your project data from Firebase
interface Project {
  id: string;
  title: string;
  location: string;
  price: string; // "price" in DB, mapped to UI
  status: string;
  features: string; // It comes as a long string "DTCP, RERA" from DB
  imageUrl: string; // "imageUrl" in DB
  // Optional fields if you add them later:
  plots?: string; 
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all');

  // 1. FETCH DATA FROM FIREBASE
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 2. FILTER LOGIC
  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.status?.toLowerCase() === filter;
  });

  // 3. HELPER TO CONVERT COMMA STRING TO ARRAY (e.g. "Road, Light" -> ["Road", "Light"])
  const getFeaturesArray = (featuresString: string) => {
    if (!featuresString) return [];
    return featuresString.split(',').map(f => f.trim());
  };

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
            
            {loading ? (
               <div className="text-center py-20 text-gray-500">Loading Projects...</div>
            ) : filteredProjects.length === 0 ? (
               <div className="text-center py-20 text-gray-500">No projects found. Add them in the Admin Panel!</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                    <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                    >
                    <div className="glass rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden shrink-0">
                        <img
                            src={project.imageUrl} // Changed from .image to .imageUrl (DB field name)
                            alt={project.title}    // Changed from .name to .title (DB field name)
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        
                        {/* Status Badge */}
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                            project.status?.toLowerCase() === 'ongoing' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}>
                            {project.status}
                        </div>

                        {/* Plots Badge (Optional, hardcoded or needs DB field) */}
                        {project.plots && (
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/90 text-foreground text-xs font-semibold">
                            {project.plots}
                            </div>
                        )}

                        {/* Title */}
                        <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-xl font-bold text-background mb-1">{project.title}</h3>
                            <div className="flex items-center gap-1 text-background/80 text-sm">
                            <MapPin className="w-4 h-4" />
                            {project.location}
                            </div>
                        </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                        <p className="text-primary font-semibold text-lg mb-4">{project.price}</p>
                        
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            {/* Logic to split the comma-separated string from DB into pills */}
                            {getFeaturesArray(project.features).slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-muted-foreground text-sm">
                                <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                                <span>{feature}</span>
                            </div>
                            ))}
                        </div>

                        <div className="mt-auto">
                          <Link to={`/project/${project.id}`}>
                            <Button className="w-full">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            </Link>
                        </div>
                        </div>
                    </div>
                    </motion.div>
                ))}
                </div>
            )}
            
          </div>
        </section>

        <Footer />
        <WhatsAppFAB />
      </main>
    </>
  );
};

export default Projects;