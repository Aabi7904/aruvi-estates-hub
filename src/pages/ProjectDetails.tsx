import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  ArrowLeft,
  Phone,
  Map as MapIcon,
  Camera,
  ScanLine 
} from 'lucide-react';
import { MasterPlanContainer } from '@/components/MasterPlan/MasterPlanContainer';
import { staticFeatures } from '@/data/projectFeatures';

// --- IMPORT YOUR QR CODE HERE ---
import locationQr from '@/assets/location-qr.jpeg'; 

// --- SWIPER ---
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
  mapLink?: string;
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
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() } as Project);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const closeLightbox = () => setLightboxIndex(null);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Details...
      </div>
    );

  if (!project)
    return (
      <div className="flex h-screen items-center justify-center">
        Project not found.
      </div>
    );

  // --- LOGIC: Only show QR code for "AA Avenue" ---
  const showQrCode = project.title.toLowerCase().includes("aa avenue");

  // --- LOGIC FOR MAP REDIRECT ---
  const googleMapsUrl = project.mapLink 
    ? project.mapLink 
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.title + ' ' + project.location)}`;

  return (
    <>
      <Helmet>
        <title>{project.title} | Thamizh Aruvi</title>
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 hover:bg-primary/10 hover:text-primary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* LEFT COLUMN: Main Image & Gallery */}
            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-xl bg-white relative h-[320px] flex items-center justify-center p-10">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                      project.status.toLowerCase() === 'ongoing'
                        ? 'bg-green-500 text-white'
                        : project.status.toLowerCase() === 'upcoming'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Gallery Swiper */}
              {project.galleryImages?.length > 0 && (
                <div className="rounded-3xl overflow-hidden shadow-xl bg-gray-900 h-[360px] relative">
                  <div className="absolute top-4 left-4 z-20 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex gap-2 items-center">
                    <Camera className="w-3 h-3 text-primary" />
                    {project.galleryImages.length} Photos
                  </div>

                  <Swiper
                    modules={[Autoplay, Pagination, Navigation, EffectFade]}
                    autoplay={{ delay: 3500 }}
                    pagination={{ clickable: true }}
                    effect="fade"
                    loop
                    className="h-full"
                  >
                    {project.galleryImages.map((img, index) => (
                      <SwiperSlide
                        key={index}
                        onClick={() => setLightboxIndex(index)}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover cursor-pointer"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Info, QR Code, Features */}
            <div className="space-y-8">
              
              {/* --- PROJECT INFO CARD --- */}
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                
                {/* Text Content */}
                <div>
                  <h1 className="text-4xl font-bold text-primary mb-3">
                    {project.title}
                  </h1>
                  <div className="flex items-center text-gray-600 text-lg">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    {project.location}
                  </div>
                </div>

                {/* --- QR CODE SECTION (CONDITIONAL RENDER) --- */}
                {/* Only shows if project title includes "AA Avenue" */}
                {showQrCode && (
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
                    title="Click to open exact location in Google Maps"
                  >
                    <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-md border border-gray-200 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                      <img 
                        src={locationQr} 
                        alt="Location QR Code" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="flex items-center gap-1 mt-2 text-xs font-bold text-primary group-hover:underline">
                      <ScanLine className="w-3 h-3" />
                      Click Or Scan To Reach Our Site !
                    </div>
                  </a>
                )}

              </div>

              {/* Features Grid */}
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  Project Highlights
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {staticFeatures.map((f) => (
                    <div
                      key={f.id}
                      className="flex items-center p-4 bg-white rounded-2xl border"
                    >
                      <div className="mr-4">{f.icon}</div>
                      <span className="text-sm font-medium">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-6 border-t">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="flex-1 bg-[#25D366] text-white h-14 text-lg hover:bg-[#20bd5a]"
                    onClick={() =>
                      window.open(
                        `https://wa.me/919443729991?text=Hi, I am interested in ${project.title}`
                      )
                    }
                  >
                    Chat on WhatsApp
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 h-14 text-lg border-2"
                    onClick={() =>
                      (window.location.href = 'tel:+919443729991')
                    }
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* MASTER PLAN SECTION */}
          {project.layoutImage && (
            <div className="mt-20 border-t pt-16">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <MapIcon className="w-8 h-8 text-primary" />
                Check Plot Availability
              </h2>
              <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
                {/* @ts-ignore */}
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