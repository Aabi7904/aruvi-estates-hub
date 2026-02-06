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

/* MAP REGISTRY */
import { getMapData } from '../data/maps/mapRegistry';

/* ASSETS */
import locationQr from '../assets/location-qr.jpeg';
import semmozhiQr from '../assets/semlocation.png';
import comingSoonImg from '../assets/coming-soon.jpg';
import tamilAruviImg from '../assets/tamil-aruvi.png';
import sivanmalaiSamuLogo from '../assets/sivanmalai_samu.png';
import thulasiLogo from '../assets/Thulasi_Nagar.png';
import tamilThendralLogo from '../assets/Tamil_Thendral_Nagar.png';

/* DEFAULT GALLERY */
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

interface Project {
  id: string;
  title: string;
  location: string;
  status: string;
  imageUrl?: string;
  mapLink?: string;
  layoutImage?: string;
}

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getDoc(doc(db, 'projects', id)).then((snap) => {
      if (snap.exists()) {
        setProject({ id: snap.id, ...snap.data() } as Project);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading || !project) return null;

  const titleLower = project.title.toLowerCase();
  const locLower = project.location?.toLowerCase() || '';

  const isAmuthaSurabi = titleLower.includes('amutha surabi');
  const isTamilAruvi = titleLower.includes('tamil aruvi');
  const isTamilThendral = titleLower.includes('tamil thendral');
  const isRaghavendra = titleLower.includes('raghavendra');

  /* HIGHLIGHTS */
  let activeHighlights = commonHighlights;
  if (isAmuthaSurabi) activeHighlights = amuthaSurabiHighlights;
  else if (isTamilAruvi) activeHighlights = tamilAruviHighlights;
  else if (isTamilThendral) activeHighlights = tamilThendralHighlights;
  else if (isRaghavendra) activeHighlights = raghavendraHighlights;
  else if (titleLower.includes('sivan')) activeHighlights = sivanmalaiHighlights;
  else if (titleLower.includes('thulasi')) activeHighlights = thulasiHighlights;
  else if (titleLower.includes('semmozhi')) activeHighlights = semmozhiHighlights;
  else if (titleLower.includes('aa avenue')) activeHighlights = aaAvenueHighlights;
  else if (titleLower.includes('highway city')) activeHighlights = highwayCityHighlights;

  /* LOGO ABOVE SITE VIEW */
  let displayImage = project.imageUrl || comingSoonImg;
  if (isTamilAruvi) displayImage = tamilAruviImg;
  else if (isTamilThendral) displayImage = tamilThendralLogo;
  else if (titleLower.includes('sivan') && locLower.includes('samuthiram')) displayImage = sivanmalaiSamuLogo;
  else if (titleLower.includes('thulasi')) displayImage = thulasiLogo;

  /* SITE PHOTOS */
  const gallery = isAmuthaSurabi ? AMUTHA_SURABI_GALLERY : SHARED_GALLERY;

  /* QR */
  const activeQr = titleLower.includes('semmozhi') ? semmozhiQr : locationQr;

  const googleMapsUrl =
    project.mapLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      project.title + ' ' + project.location
    )}`;

  /* MASTER PLAN DATA */
  const currentMapData = getMapData(project.id);
  const masterPlanImage = project.layoutImage || currentMapData?.imageSrc;

  return (
    <>
      <Helmet>
        <title>{project.title} | Thamizh Aruvi</title>
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

            {/* RIGHT */}
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
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-24 h-24 p-2 bg-white rounded-xl shadow border hover:scale-105 transition"
                  >
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
                <Button
                  className="flex-1 bg-[#108e66] h-14 text-lg"
                  onClick={() =>
                    window.open(`https://wa.me/919443729991?text=Hi, I am interested in ${project.title}`)
                  }
                >
                  WhatsApp
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 h-14 border-2 border-[#108e66] text-[#108e66] text-lg"
                  onClick={() => (window.location.href = 'tel:+919443729991')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>

          {/* ✅ MASTER PLAN — FIXED */}
          {(currentMapData || project.layoutImage) && masterPlanImage && (
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <MapIcon className="w-6 h-6 text-[#108e66]" />
                <h2 className="text-2xl font-bold">Check Plot Availability</h2>
              </div>

              <MasterPlanContainer
                imageUrl={masterPlanImage}
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
