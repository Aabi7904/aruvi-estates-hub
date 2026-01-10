import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowLeft, Phone, Map as MapIcon, X, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';
// IMPORT THE MASTER PLAN CONTAINER
import { MasterPlanContainer } from '@/components/MasterPlan/MasterPlanContainer';
// IMPORT STATIC FEATURES WITH ICONS
import { staticFeatures } from "@/data/projectFeatures";

// --- SWIPER IMPORTS ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface Project {
  id: string;
  title: string;
  location: string;
  price: string;
  status: string;
  imageUrl: string;
  layoutImage?: string; 
  galleryImages?: string[];
}

const ProjectDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  // --- LIGHTBOX HANDLERS ---
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project?.galleryImages && lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % project.galleryImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project?.galleryImages && lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + project.galleryImages.length) % project.galleryImages.length);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Loading Details...</div>;
  if (!project) return <div className="flex h-screen items-center justify-center">Project not found.</div>;

  return (
    <>
      <Helmet>
        <title>{project.title} | Thamizh Aruvi</title>
      </Helmet>
      <Navbar />
      
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          
          {/* Back Button */}
          <Button variant="ghost" className="mb-6 hover:bg-primary/10 hover:text-primary transition-colors" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
          </Button>

          {/* MAIN DETAILS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Left Column: Images */}
            <div className="space-y-6">
              
              {/* 1. Main Project Logo/Image */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-white/50 bg-white relative group h-[320px] flex items-center justify-center p-10 transition-all duration-300 hover:shadow-2xl">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                   <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm backdrop-blur-sm ${
                    project.status === 'Ongoing' || project.status === 'ongoing' 
                    ? 'bg-green-500/90 text-white' 
                    : 'bg-blue-500/90 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* 2. Site Photos Carousel (Modernized) */}
              {project.galleryImages && project.galleryImages.length > 0 && (
                <div className="rounded-3xl overflow-hidden shadow-xl border border-white/50 bg-gray-900 h-[360px] relative group">
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                    <Camera className="w-3 h-3 text-primary" />
                    <span>Site Gallery • {project.galleryImages.length} Photos</span>
                  </div>

                  <Swiper
                    modules={[Autoplay, Pagination, Navigation, EffectFade]}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    pagination={{ 
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    effect="fade"
                    loop={true}
                    className="w-full h-full"
                  >
                    {project.galleryImages.map((img, index) => (
                      <SwiperSlide key={index} onClick={() => setLightboxIndex(index)} className="cursor-pointer">
                        <div className="relative w-full h-full">
                          <img 
                            src={img} 
                            alt={`Site Photo ${index + 1}`} 
                            className="w-full h-full object-fit transition-transform duration-700 hover:scale-110" 
                          />
                          {/* Gradient Overlay on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                          
                          {/* Center Icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                              <Maximize2 className="text-white w-6 h-6 drop-shadow-md" />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>

            {/* Right Column: Project Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3 tracking-tight">{project.title}</h1>
                <div className="flex items-center text-gray-600 text-lg font-medium">
                  <div className="p-2 bg-primary/10 rounded-full mr-3">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  {project.location}
                </div>
              </div>

              <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8" />
                <p className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-wider">Price Range</p>
                <div className="text-4xl font-bold text-primary">{project.price}</div>
              </div>

              {/* Static Features */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  Project Highlights
                  <div className="h-1 w-12 bg-primary rounded-full ml-2 mt-1"></div>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {staticFeatures.map((feature) => (
                    <div 
                      key={feature.id} 
                      className="flex items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
                    >
                      <div className="mr-4 p-3 bg-gray-50 rounded-xl group-hover:bg-primary/10 transition-colors">
                        {/* Clone icon to pass className for hover effect if needed, usually CSS handles color */}
                        <div className="text-gray-500 group-hover:text-primary transition-colors">
                          {feature.icon}
                        </div>
                      </div>
                      <span className="text-gray-700 font-medium text-sm group-hover:text-gray-900 transition-colors">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-6 text-gray-900">Interested? Contact us directly:</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="flex-1 h-14 text-lg font-semibold bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1" 
                    onClick={() => window.open(`https://wa.me/919443729991?text=Hi, I am interested in ${project.title}`)}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6 mr-3 filter brightness-0 invert" alt="WA"/>
                    Chat on WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 h-14 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-2xl transition-all hover:-translate-y-1" 
                    onClick={() => window.location.href = "tel:+919443729991"}
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    Call Now
                  </Button>
                </div>
              </div>

            </div>
          </div>

          {/* --- MASTER PLAN SECTION (Conditional Render) --- */}
          {project.layoutImage && (
            <div className="mt-20 pt-16 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                    <MapIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Check Plot Availability</h2>
                    <p className="text-gray-500 mt-1">Interactive Map • Click on plots to see real-time status</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium border border-yellow-100">
                  Live Updates Enabled
                </div>
              </div>
              
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white ring-1 ring-black/5">
                 {/* @ts-ignore */}
                 <MasterPlanContainer imageUrl={project.layoutImage} />
              </div>
            </div>
          )}

        </div>
      </main>

      {/* --- MODERN LIGHTBOX MODAL --- */}
      {lightboxIndex !== null && project.galleryImages && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={closeLightbox}>
          {/* Close Button */}
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all z-50">
            <X className="w-8 h-8" />
          </button>
          
          {/* Prev Button */}
          <button 
            onClick={prevImage} 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-white/10 p-4 rounded-full transition-all hidden md:block z-50"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          
          {/* Main Image */}
          <div className="relative max-w-7xl max-h-[85vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={project.galleryImages[lightboxIndex]} 
              alt="Gallery Preview" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />
            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
              <span className="text-white/90 text-sm font-medium tracking-wide">
                Image {lightboxIndex + 1} of {project.galleryImages.length}
              </span>
            </div>
          </div>
          
          {/* Next Button */}
          <button 
            onClick={nextImage} 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-white/10 p-4 rounded-full transition-all hidden md:block z-50"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}

      <Footer />
      <WhatsAppFAB />
    </>
  );
};

export default ProjectDetails;