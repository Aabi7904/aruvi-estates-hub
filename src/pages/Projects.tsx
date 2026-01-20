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
  const [filter, setFilter] = useState<
    'all' | 'ongoing' | 'completed' | 'upcoming'
  >('all');

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

        {/* HERO */}
        <section className="pt-32 pb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold"
          >
            Premium <span className="gradient-text">Projects</span>
          </motion.h1>
        </section>

        {/* FILTER */}
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

        {/* GRID */}
        <section className="section-padding pt-8">
          <div className="container-custom mx-auto">
            {loading ? (
              <div className="text-center py-20 text-muted-foreground">
                Loading projects...
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="glass rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all h-full flex flex-col">

                      {/* IMAGE */}
                      <div className="relative h-72 bg-white">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* VERY subtle depth only */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />

                        {/* STATUS */}
                        <div
                          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                            project.status.toLowerCase() === 'ongoing'
                              ? 'bg-primary text-primary-foreground'
                              : project.status.toLowerCase() === 'upcoming'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {project.status}
                        </div>

                        {project.plots && (
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/90 text-xs font-semibold">
                            {project.plots}
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="p-6 flex flex-col flex-grow text-center">

                        {/* PROJECT NAME */}
                        <motion.h3
                          whileHover={{ scale: 1.04 }}
                          transition={{ type: 'spring', stiffness: 220 }}
                          className="text-2xl md:text-3xl font-bold text-primary tracking-wide truncate"
                        >
                          {project.title}
                        </motion.h3>

                        {/* DIVIDER */}
                        <div className="w-16 h-[2px] bg-primary/40 mx-auto my-3 group-hover:w-24 transition-all duration-300" />

                        {/* LOCATION */}
                        <div className="flex justify-center items-center gap-2 text-muted-foreground text-base md:text-lg mb-8">
                          <MapPin className="w-5 h-5" />
                          {project.location}
                        </div>

                        {/* CTA */}
                        <div className="mt-auto">
                          <Link to={`/project/${project.id}`}>
                            <Button className="w-full">
                              View Details
                              <ArrowRight className="ml-2 w-4 h-4" />
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
