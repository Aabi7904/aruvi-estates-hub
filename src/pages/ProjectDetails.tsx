import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { Button } from '@/components/ui/button';
import { MapPin, CheckCircle, ArrowLeft, Phone, Map as MapIcon } from 'lucide-react';
// IMPORT THE MASTER PLAN CONTAINER
import { MasterPlanContainer } from '@/components/MasterPlan/MasterPlanContainer';

interface Project {
  id: string;
  title: string;
  location: string;
  price: string;
  status: string;
  features: string;
  imageUrl: string;
  // Added layoutImage field from Admin Panel
  layoutImage?: string; 
}

const ProjectDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() } as Project);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div className="flex h-screen items-center justify-center">Loading Details...</div>;
  if (!project) return <div className="flex h-screen items-center justify-center">Project not found.</div>;

  // Convert features string to array
  const featuresList = project.features ? project.features.split(',').map(f => f.trim()) : [];

  return (
    <>
      <Helmet>
        <title>{project.title} | Thamizh Aruvi</title>
      </Helmet>
      <Navbar />
      
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
          </Button>

          {/* MAIN DETAILS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Left Column: Main Image */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white relative group">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-4 left-4">
                   <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
                    project.status === 'Ongoing' || project.status === 'ongoing' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Project Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <div className="flex items-center text-gray-600 text-lg">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  {project.location}
                </div>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1 font-medium uppercase tracking-wide">Price Range</p>
                <div className="text-3xl font-bold text-primary">{project.price}</div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Project Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featuresList.map((feature, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Interested? Contact us directly:</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 h-12 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={() => window.open(`https://wa.me/919443729991?text=Hi, I am interested in ${project.title}`)}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6 mr-2 filter brightness-0 invert" alt="WA"/>
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 text-lg border-primary text-primary hover:bg-primary/5" onClick={() => window.location.href = "tel:+919443729991"}>
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>

            </div>
          </div>

          {/* --- MASTER PLAN SECTION (Conditional Render) --- */}
          {/* Only shows if you uploaded a Layout Image in Admin Panel */}
          {project.layoutImage && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapIcon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Master Plan & Availability</h2>
                  <p className="text-gray-500">Explore the layout map. Click on plots to see real-time status.</p>
                </div>
              </div>
              
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                 {/* Pass the layout image URL to your container */}
                 {/* @ts-ignore - Ignore this line if your Container doesn't have props defined yet */}
                 <MasterPlanContainer imageUrl={project.layoutImage} />
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
};

export default ProjectDetails;