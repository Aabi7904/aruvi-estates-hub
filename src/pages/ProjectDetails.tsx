import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // To get ID from URL
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { Button } from '@/components/ui/button';
import { MapPin, CheckCircle, ArrowLeft, Phone } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  location: string;
  price: string;
  status: string;
  features: string;
  imageUrl: string;
}

const ProjectDetails = () => {
  const { id } = useParams(); // Get the ID from the URL (e.g., /project/123)
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: Image */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Optional: Placeholder for future Gallery/Video tabs */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold mb-2 text-gray-900">Project Layout</h3>
                <p className="text-sm text-gray-500">
                  (Add more layout images in Admin Panel to see them here in the future)
                </p>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {project.location}
                </div>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Starting Price</p>
                <div className="text-3xl font-bold text-orange-600">{project.price}</div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Project Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuresList.map((feature, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-white rounded-lg border border-gray-100">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Interested in this property?</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 h-12 text-lg" onClick={() => window.open(`https://wa.me/919443729991?text=Hi, I am interested in ${project.title}`)}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6 mr-2" alt="WA"/>
                    Chat on WhatsApp
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 text-lg" onClick={() => window.location.href = "tel:+919443729991"}>
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
};

export default ProjectDetails;