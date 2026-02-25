import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// IMPORT IMAGES
import comingSoonImg from '@/assets/coming-soon.webp';
import tamilAruviImg from '@/assets/tamil-aruvi.webp'; 
import sivanmalaiSamuLogo from '@/assets/sivanmalai_samu.webp'; 
import thulasiLogo from '@/assets/Thulasi_Nagar.webp';
import tamilThendralLogo from '@/assets/Tamil_Thendral_Nagar.webp';

interface Project {
  id: string;
  title: string;
  location: string;
  status: string;
  imageUrl: string;
  plots?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed' | 'upcoming'>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'projects'));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status?.toLowerCase() === filter;
  });

  return (
    <>
      <Helmet>
        <title>Our Projects | Thamizh Aruvi Real Estate</title>
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="pt-32 pb-16 text-center">
          <motion.h1 className="text-5xl font-bold">
            Our Premium <span className="gradient-text">Projects</span>
          </motion.h1>
        </section>

        <section className="pb-8">
          <div className="flex justify-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {(['all', 'ongoing', 'completed', 'upcoming'] as const).map(status => (
              <Button
                key={status}
                size="sm"
                variant={filter === status ? 'default' : 'outline'}
                onClick={() => setFilter(status)}
                className="capitalize"
              >
                {status === 'all' ? 'All Projects' : status}
              </Button>
            ))}
          </div>
        </section>

        <section className="section-padding pt-8">
          <div className="container-custom mx-auto">
            {loading ? (
              <div className="text-center py-20 text-muted-foreground">Loading projects...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => {
                  const isUpcoming = project.status?.toLowerCase() === 'upcoming';
                  
                  // Convert both Title and Location to lowercase for checking
                  const titleLower = project.title?.toLowerCase() || "";
                  const locLower = project.location?.toLowerCase() || "";
                  
                  let displayImage = project.imageUrl || comingSoonImg;
                  
                  // LOGIC REFINED:
                  
                  // 1. Sivan Malai @ Samuthiram (Checks both title and location string)
                  if (titleLower.includes('sivan') && (titleLower.includes('samuthiram') || locLower.includes('samuthiram'))) {
                    displayImage = sivanmalaiSamuLogo;
                  }
                  // 2. Tamil Aruvi
                  else if (titleLower.includes('tamil aruvi') || titleLower.includes('tamizh aruvi')) {
                    displayImage = tamilAruviImg;
                  } 
                  // 3. Thulasi Nagar
                  else if (titleLower.includes('thulasi') || titleLower.includes('tulasi')) {
                    displayImage = thulasiLogo;
                  }
                  // 4. Tamil Thendral
                  else if (titleLower.includes('thendral')) {
                    displayImage = tamilThendralLogo;
                  }

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="glass rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all h-full flex flex-col">
                        <div className="relative h-72 bg-white">
                          <img
                            src={displayImage}
                            alt={project.title}
                            onError={(e) => { e.currentTarget.src = comingSoonImg; }}
                            className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                            project.status.toLowerCase() === 'ongoing' ? 'bg-primary text-primary-foreground' : 
                            isUpcoming ? 'bg-yellow-500 text-white' : 'bg-secondary text-secondary-foreground'
                          }`}>
                            {project.status}
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow text-center">
                          <h3 className="text-2xl font-bold text-primary truncate">{project.title}</h3>
                          <div className="flex justify-center items-center gap-2 text-muted-foreground my-4">
                            <MapPin className="w-4 h-4" /> {project.location}
                          </div>
                          <div className="mt-auto">
                            {isUpcoming ? (
                              <div className="py-3 px-4 rounded-xl bg-amber-50 text-amber-600 font-bold border border-amber-200 italic animate-pulse">
                                Stay Tuned.....
                              </div>
                            ) : (
                              <Link to={`/project/${project.id}`}>
                                <Button className="w-full">View Details</Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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