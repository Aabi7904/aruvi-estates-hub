import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFAB from '../components/WhatsAppFAB';
import { Button } from '../components/ui/button';
import {
  MapPin,
  ArrowLeft,
  Phone,
  Camera,
  ScanLine,
  Map as MapIcon
} from 'lucide-react';

/* HIGHLIGHTS */
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
  tamilThendralHighlights
} from '../data/highlights';

/* MAP */
import { getMapData } from '../data/maps/mapRegistry';

/* ASSETS */
import locationQr from '../assets/location-qr.jpeg';
import semmozhiQr from '../assets/semlocation.png';
import comingSoonImg from '../assets/coming-soon.jpg';
import tamilAruviImg from '../assets/tamil-aruvi.png';
import sivanmalaiSamuLogo from '../assets/sivanmalai_samu.png';
import thulasiLogo from '../assets/Thulasi_Nagar.png';
import tamilThendralLogo from '../assets/Tamil_Thendral_Nagar.png';

/* DEFAULT */
import g1 from '../assets/g1.jpg';
import g2 from '../assets/g2.jpg';
import g3 from '../assets/g3.jpg';
import g4 from '../assets/g4.jpg';
import g5 from '../assets/g5.jpg';
import g6 from '../assets/g6.jpg';
import g7 from '../assets/g7.jpg';

/* AMUTHA SURABI */
import asn1 from '../assets/asn1.jpeg';
import asn2 from '../assets/asn2.jpeg';
import asn3 from '../assets/asn3.jpeg';
import asn4 from '../assets/asn4.jpeg';
import asn5 from '../assets/asn5.jpeg';
import asn6 from '../assets/asn6.jpeg';
import asn7 from '../assets/asn7.jpeg';
import asn8 from '../assets/asn8.jpeg';
import asn9 from '../assets/asn9.jpeg';

/* RAGHAVENDRA */
import rg1 from '../assets/rg1.jpeg';
import rg2 from '../assets/rg2.jpeg';
import rg3 from '../assets/rg3.jpeg';
import rg4 from '../assets/rg4.jpeg';
import rg6 from '../assets/rg6.jpeg';
import rg8 from '../assets/rg8.jpeg';
import rg9 from '../assets/rg9.jpeg';

/* TAMIL THENDRAL */
import ttn1 from '../assets/ttn1.jpeg';
import ttn2 from '../assets/ttn2.jpeg';
import ttn3 from '../assets/ttn3.jpeg';
import ttn4 from '../assets/ttn4.jpeg';
import ttn5 from '../assets/ttn5.jpeg';
import ttn6 from '../assets/ttn6.jpeg';
import ttn7 from '../assets/ttn7.jpeg';

/* TAMIL ARUVI */
import tan1 from '../assets/tan1.jpeg';
import tan2 from '../assets/tan2.jpeg';
import tan3 from '../assets/tan3.jpeg';
import tan4 from '../assets/tan4.jpeg';
import tan5 from '../assets/tan5.jpeg';
import tan6 from '../assets/tan6.jpeg';
import tan7 from '../assets/tan7.jpeg';
import tan8 from '../assets/tan8.jpeg';
import tan9 from '../assets/tan9.jpeg';

/* MASTER PLAN */
import { MasterPlanContainer } from '../components/MasterPlan/MasterPlanContainer';

/* SWIPER */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SHARED_GALLERY = [g1, g2, g3, g4, g5, g6, g7];
const AMUTHA_SURABI_GALLERY = [asn1, asn2, asn3, asn4, asn5, asn6, asn7, asn8, asn9];
const RAGHAVENDRA_GALLERY = [rg1, rg2, rg3, rg4, rg6, rg8, rg9];
const TAMIL_THENDRAL_GALLERY = [ttn1, ttn2, ttn3, ttn4, ttn5, ttn6, ttn7];
const TAMIL_ARUVI_GALLERY = [tan1, tan2, tan3, tan4, tan5, tan6, tan7, tan8, tan9];

interface Project {
  id: string;
  title: string;
  location: string;
  status: string;
  imageUrl: string;
  mapLink?: string;
  layoutImage?: string;
}

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!id) return;
    getDoc(doc(db, 'projects', id)).then((snap) => {
      if (snap.exists()) {
        setProject({ id: snap.id, ...snap.data() } as Project);
      }
    });
  }, [id]);

  if (!project) return null;

  const titleLower = project.title.toLowerCase();
  const locLower = project.location?.toLowerCase() || '';

  const gallery =
    titleLower.includes('amutha') ? AMUTHA_SURABI_GALLERY :
    titleLower.includes('raghavendra') ? RAGHAVENDRA_GALLERY :
    titleLower.includes('tamil thendral') ? TAMIL_THENDRAL_GALLERY :
    titleLower.includes('tamil aruvi') ? TAMIL_ARUVI_GALLERY :
    SHARED_GALLERY;

  let activeHighlights = commonHighlights;
  if (titleLower.includes('amutha')) activeHighlights = amuthaSurabiHighlights;
  else if (titleLower.includes('raghavendra')) activeHighlights = raghavendraHighlights;
  else if (titleLower.includes('tamil aruvi')) activeHighlights = tamilAruviHighlights;
  else if (titleLower.includes('tamil thendral')) activeHighlights = tamilThendralHighlights;
  else if (titleLower.includes('sivan')) activeHighlights = sivanmalaiHighlights;
  else if (titleLower.includes('thulasi')) activeHighlights = thulasiHighlights;
  else if (titleLower.includes('semmozhi')) activeHighlights = semmozhiHighlights;
  else if (titleLower.includes('aa avenue')) activeHighlights = aaAvenueHighlights;
  else if (titleLower.includes('highway city')) activeHighlights = highwayCityHighlights;

  let displayImage = project.imageUrl || comingSoonImg;
  if (titleLower.includes('tamil aruvi')) displayImage = tamilAruviImg;
  else if (titleLower.includes('tamil thendral')) displayImage = tamilThendralLogo;
  else if (titleLower.includes('sivan') && locLower.includes('samuthiram')) displayImage = sivanmalaiSamuLogo;
  else if (titleLower.includes('thulasi')) displayImage = thulasiLogo;

  const activeQr = titleLower.includes('semmozhi') ? semmozhiQr : locationQr;

  const googleMapsUrl =
    project.mapLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      project.title + ' ' + project.location
    )}`;

  const currentMapData = getMapData(project.id);

  return (
    <>
      <Helmet>
        <title>{project.title}</title>
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">

          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="flex flex-col lg:flex-row gap-12 mb-16">

            {/* LEFT */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="bg-white rounded-3xl h-[320px] flex items-center justify-center p-8 relative">
                <img src={displayImage} className="max-h-full object-contain" />
                <span className="absolute top-4 left-4 bg-[#108e66] text-white text-xs px-3 py-1 rounded-full">
                  {project.status}
                </span>
              </div>

              <div className="rounded-3xl overflow-hidden h-[400px] bg-black relative">
                <div className="absolute top-4 left-4 z-20 bg-black/60 text-white text-xs px-3 py-1 rounded-full flex gap-2">
                  <Camera className="w-4 h-4 text-emerald-400" /> SITE VIEW
                </div>

                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  autoplay={{ delay: 3000 }}
                  pagination={{ clickable: true }}
                  loop
                  className="h-full"
                >
                  {gallery.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img src={img} className="w-full h-full object-cover" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* RIGHT (UNCHANGED) */}
            <div className="w-full lg:w-1/2 space-y-8">

              <div className="p-6 bg-white rounded-3xl flex justify-between items-center gap-6">
                <div>
                  <h1 className="text-3xl font-extrabold text-[#108e66]">{project.title}</h1>
                  <p className="flex items-center mt-2 text-gray-500">
                    <MapPin className="w-4 h-4 mr-2 text-[#108e66]" />
                    {project.location}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <a href={googleMapsUrl} target="_blank" rel="noreferrer"
                     className="w-24 h-24 p-2 bg-white rounded-xl shadow border">
                    <img src={activeQr} className="w-full h-full object-contain" />
                  </a>
                  <span className="text-[10px] mt-2 font-bold text-[#108e66] flex items-center gap-1">
                    <ScanLine className="w-3 h-3" />
                    SCAN OR CLICK TO REACH SITE
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeHighlights.map((h, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl flex items-center gap-3">
                    {h.icon}
                    <span className="text-xs font-semibold">{h.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-[#108e66] h-14 text-lg">
                  WhatsApp
                </Button>
                <Button variant="outline"
                        className="flex-1 h-14 border-2 border-[#108e66] text-[#108e66] text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>

            </div>
          </div>

          {(currentMapData || project.layoutImage) && (
  <div className="mt-16">
    <div className="flex items-center gap-3 mb-6">
      <MapIcon className="w-6 h-6 text-[#108e66]" />
      <h2 className="text-2xl font-bold">Check Plot Availability</h2>
    </div>

    <MasterPlanContainer
                imageUrl={currentMapData?.imageSrc || project.layoutImage || ""}
                mapData={currentMapData}
              />
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
