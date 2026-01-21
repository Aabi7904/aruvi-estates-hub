import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase'; 
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFAB from '../components/WhatsAppFAB';
import { Button } from '../components/ui/button';
import { MapPin, ArrowLeft, Phone, Camera, ScanLine, Map as MapIcon } from 'lucide-react';

// --- DATA IMPORTS ---
import { 
  commonHighlights, 
  semmozhiHighlights, 
  aaAvenueHighlights,
  sivanmalaiHighlights,
  thulasiHighlights,
  highwayCityHighlights,
  raghavendraHighlights,
  amuthaSurabiHighlights,
  tamilAruviHighlights,
  tamilThendralHighlights,
  deepaMalaiHighlights
} from '../data/highlights';

// --- ASSET IMPORTS ---
import locationQr from '../assets/location-qr.jpeg'; 
import semmozhiQr from '../assets/semlocation.png'; 
import comingSoonImg from '../assets/coming-soon.jpg';
import tamilAruviImg from '../assets/tamil-aruvi.png'; 
import sivanmalaiSamuLogo from '../assets/sivanmalai_samu.png'; 
import thulasiLogo from '../assets/Thulasi_Nagar.png';
import tamilThendralLogo from '../assets/Tamil_Thendral_Nagar.png';

import g1 from '../assets/g1.jpg';
import g2 from '../assets/g2.jpg';
import g3 from '../assets/g3.jpg';
import g4 from '../assets/g4.jpg';
import g5 from '../assets/g5.jpg';
import g6 from '../assets/g6.jpg';
import g7 from '../assets/g7.jpg';

// --- COMPONENT IMPORTS ---
import { MasterPlanContainer } from '../components/MasterPlan/MasterPlanContainer'; // Ensure path is correct

// --- SWIPER ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const SHARED_GALLERY = [g1, g2, g3, g4, g5, g6, g7];

interface Project {
  id: string;
  title: string;
  location: string;
  status: string;
  imageUrl: string;
  mapLink?: string;
  layoutImage?: string; // Added this field
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

  if (loading) return <div className="flex h-screen items-center justify-center font-bold text-[#108e66]">Loading...</div>;
  if (!project) return <div className="flex h-screen items-center justify-center">Project not found.</div>;

  const titleLower = project.title.toLowerCase();
  const locLower = project.location?.toLowerCase() || "";

  // HIGHLIGHTS SELECTION LOGIC
  let activeHighlights = commonHighlights;
  if (titleLower.includes('semmozhi')) activeHighlights = semmozhiHighlights;
  else if (titleLower.includes('aa avenue')) activeHighlights = aaAvenueHighlights;
  else if (titleLower.includes('sivan')) activeHighlights = sivanmalaiHighlights;
  else if (titleLower.includes('thulasi') || titleLower.includes('tulasi')) activeHighlights = thulasiHighlights;
  else if (titleLower.includes('highway city')) activeHighlights = highwayCityHighlights;
  else if (titleLower.includes('raghavendra')) activeHighlights = raghavendraHighlights;
  else if (titleLower.includes('amutha surabi')) activeHighlights = amuthaSurabiHighlights;
  else if (titleLower.includes('thendral')) activeHighlights = tamilThendralHighlights;
  else if (titleLower.includes('deepa malai')) activeHighlights = deepaMalaiHighlights;
  else if (titleLower.includes('tamil aruvi') || titleLower.includes('tamizh aruvi')) activeHighlights = tamilAruviHighlights;

  // IMAGE OVERRIDE LOGIC
  let displayImage = project.imageUrl || comingSoonImg;
  if (titleLower.includes('thendral')) displayImage = tamilThendralLogo;
  else if (titleLower.includes('tamil aruvi') || titleLower.includes('tamizh aruvi')) displayImage = tamilAruviImg;
  else if (titleLower.includes('sivan') && (titleLower.includes('samuthiram') || locLower.includes('samuthiram'))) displayImage = sivanmalaiSamuLogo;
  else if (titleLower.includes('thulasi') || titleLower.includes('tulasi')) displayImage = thulasiLogo;

  const isSemmozhi = titleLower.includes("semmozhi");
  const activeQr = isSemmozhi ? semmozhiQr : locationQr;
  const googleMapsUrl = project.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.title + ' ' + project.location)}`;

  return (
    <>
      <Helmet><title>{project.title} | Thamizh Aruvi</title></Helmet>
      <Navbar />
      <main className="pt-20 md:pt-28 pb-12 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <Button variant="ghost" className="mb-6 hover:bg-emerald-50 font-semibold" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
            {/* LEFT SIDE: LOGO AND SLIDESHOW */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="rounded-3xl bg-white h-[280px] md:h-[350px] flex items-center justify-center p-8 border border-gray-100 shadow-sm relative">
                <img src={displayImage} className="max-h-full object-contain" alt="Project Logo" />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-bold text-white bg-[#108e66] uppercase tracking-widest">
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-xl bg-gray-900 h-[300px] md:h-[400px] relative">
                <div className="absolute top-4 left-4 z-20 bg-black/60 text-white text-[10px] px-3 py-1.5 rounded-full flex gap-2 items-center">
                  <Camera className="w-3 h-3 text-emerald-400" /> SITE VIEW
                </div>
                <Swiper modules={[Autoplay, Pagination, Navigation, EffectFade]} autoplay={{ delay: 3000 }} pagination={{ clickable: true }} loop className="h-full">
                  {SHARED_GALLERY.map((img, i) => (
                    <SwiperSlide key={i}><img src={img} className="w-full h-full object-cover" /></SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* RIGHT SIDE: DETAILS AND ACTIONS */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <h1 className="text-2xl md:text-4xl font-extrabold text-[#108e66] leading-tight">{project.title}</h1>
                  <p className="flex items-center justify-center md:justify-start mt-2 text-slate-500 font-medium">
                    <MapPin className="w-4 h-4 mr-2 text-[#108e66]" /> {project.location}
                  </p>
                </div>
                <div className="flex flex-col items-center shrink-0">
                  <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="w-20 h-20 md:w-24 md:h-24 p-2 bg-white rounded-xl shadow-md border hover:scale-105 transition-transform">
                    <img src={activeQr} className="w-full h-full object-contain" alt="Location QR" />
                  </a>
                  <span className="text-[9px] font-bold text-[#108e66] mt-3 tracking-tighter flex items-center gap-1">
                    <ScanLine className="w-3 h-3" /> CLICK TO REACH SITE!
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                  <span className="w-8 h-1 bg-[#108e66] rounded-full" /> Project Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeHighlights.map((f, i) => (
                    <div key={i} className="flex items-center p-3 md:p-4 bg-white rounded-2xl border border-gray-100 hover:border-emerald-100 transition-colors">
                      <div className="mr-3 p-2 bg-slate-50 rounded-lg">{f.icon}</div>
                      <span className="text-[11px] md:text-xs font-semibold text-slate-700 leading-tight">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-[#108e66] h-14 text-lg font-bold rounded-2xl" onClick={() => window.open(`https://wa.me/919443729991?text=Hi, I am interested in ${project.title}`)}>WhatsApp</Button>
                <Button variant="outline" className="flex-1 h-14 text-lg font-bold border-2 rounded-2xl border-[#108e66] text-[#108e66]" onClick={() => window.location.href = 'tel:+919443729991'}><Phone className="w-5 h-5 mr-2" /> Call Now</Button>
              </div>
            </div>
          </div>

          {/* --- MASTER PLAN SECTION --- */}
          {project.layoutImage && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-[#108e66]/10">
                  <MapIcon className="w-8 h-8 text-[#108e66]" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Check Plot Availability</h2>
                  <p className="text-gray-500">Explore the layout map. Click on plots to see real-time status.</p>
                </div>
              </div>
              
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                 <MasterPlanContainer imageUrl={project.layoutImage} />
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer /><WhatsAppFAB />
    </>
  );
};

export default ProjectDetails;