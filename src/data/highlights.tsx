import { 
  ShieldCheck, Route, Sun, Home, Zap, 
  Trees, Waves, School, TrendingUp, Landmark,
  FileText, Ruler, Droplets, Compass, MapPin,
  Stethoscope, Video, Car, Bike, Building2, Leaf,
  Fence, Bus, Building, Microscope, Fuel, Train
} from 'lucide-react';

// 1. Common Highlights (Fallback)
export const commonHighlights = [
  { id: 'dtcp', text: "DTCP & RERA Approved Plots", icon: <ShieldCheck className="w-5 h-5 text-green-600" /> },
  { id: 'roads', text: "24ft & 30ft Wide Blacktop Roads", icon: <Route className="w-5 h-5 text-slate-600" /> },
  { id: 'const', text: "Ready for Immediate Construction", icon: <Home className="w-5 h-5 text-blue-600" /> },
  { id: 'eb', text: "Electricity Facility Available", icon: <Zap className="w-5 h-5 text-yellow-500" /> },
  { id: 'water', text: "Sweet Ground Water", icon: <Droplets className="w-5 h-5 text-cyan-500" /> },
  { id: 'gated', text: "Avenue Trees & Gated Community", icon: <Trees className="w-5 h-5 text-emerald-600" /> },
];

// 2. Semmozhi Nagar
export const semmozhiHighlights = [
  { id: 1, text: "DTCP and RERA approved plots", icon: <ShieldCheck className="w-5 h-5 text-green-600" /> },
  { id: 2, text: "24-feet wide spacious tar road facility", icon: <Route className="w-5 h-5 text-slate-600" /> },
  { id: 3, text: "Solar street lights", icon: <Sun className="w-5 h-5 text-amber-500" /> },
  { id: 4, text: "Residential houses nearby", icon: <Home className="w-5 h-5 text-blue-600" /> },
  { id: 5, text: "Space for EB and Water Storage Tank", icon: <Zap className="w-5 h-5 text-yellow-500" /> },
  { id: 6, text: "Tree saplings all around the layout", icon: <Trees className="w-5 h-5 text-emerald-600" /> },
  { id: 7, text: "Tasty groundwater availability", icon: <Waves className="w-5 h-5 text-cyan-500" /> },
  { id: 8, text: "Near schools and Govt offices", icon: <School className="w-5 h-5 text-indigo-600" /> },
  { id: 9, text: "High investment potential", icon: <TrendingUp className="w-5 h-5 text-rose-500" /> },
  { id: 10, text: "Bank loan facilities available", icon: <Landmark className="w-5 h-5 text-slate-700" /> },
];

// 3. AA Avenue
export const aaAvenueHighlights = [
  { id: 1, text: "All essential facilities available", icon: <Zap className="w-5 h-5 text-yellow-500" /> },
  { id: 2, text: "Easy access to schools, colleges, and hospitals", icon: <School className="w-5 h-5 text-indigo-600" /> },
  { id: 3, text: "Suitable for immediate construction", icon: <Home className="w-5 h-5 text-blue-600" /> },
  { id: 4, text: "30 ft and 24 ft wide tar roads", icon: <Route className="w-5 h-5 text-slate-600" /> },
  { id: 5, text: "Solar-powered street lights", icon: <Sun className="w-5 h-5 text-amber-500" /> },
  { id: 6, text: "View of Annamalai Hills", icon: <Compass className="w-5 h-5 text-emerald-600" /> },
  { id: 7, text: "Nearby supermarkets and amenities", icon: <Building2 className="w-5 h-5 text-slate-700" /> },
  { id: 8, text: "Excellent long-term investment", icon: <TrendingUp className="w-5 h-5 text-rose-500" /> },
  { id: 9, text: "4 km from Annamalaiyar Temple", icon: <MapPin className="w-5 h-5 text-[#108e66]" /> },
  { id: 10, text: "Rapidly developing zone", icon: <FileText className="w-5 h-5 text-blue-500" /> },
];

// 4. Sivanmalai Nagar
export const sivanmalaiHighlights = [
  { id: 1, text: "DTCP & RERA government approved plots", icon: <ShieldCheck className="w-5 h-5 text-green-600" /> },
  { id: 2, text: "Near Vellore - Thirukovilur 4-lane highway", icon: <Route className="w-5 h-5 text-slate-600" /> },
  { id: 3, text: "33, 30 & 24 feet wide tarred roads", icon: <Ruler className="w-5 h-5 text-blue-500" /> },
  { id: 4, text: "Tree saplings on both sides", icon: <Trees className="w-5 h-5 text-emerald-600" /> },
  { id: 5, text: "2-minute drive to Arunai Medical College", icon: <Stethoscope className="w-5 h-5 text-rose-600" /> },
  { id: 6, text: "Near Engineering & Maharishi Vidya Mandir", icon: <School className="w-5 h-5 text-indigo-600" /> },
  { id: 7, text: "Solar street lighting & CCTV surveillance", icon: <Video className="w-5 h-5 text-amber-500" /> },
  { id: 8, text: "Park with play equipment & walking track", icon: <Bike className="w-5 h-5 text-green-500" /> },
  { id: 9, text: "Residential areas located very close by", icon: <Home className="w-5 h-5 text-blue-600" /> },
  { id: 10, text: "Clean groundwater & fresh natural air", icon: <Waves className="w-5 h-5 text-cyan-500" /> },
  { id: 11, text: "Badminton court available", icon: <Zap className="w-5 h-5 text-yellow-500" /> },
  { id: 12, text: "5-minute drive to Annamalaiyar Temple", icon: <Landmark className="w-5 h-5 text-orange-600" /> },
  { id: 13, text: "24-hour bus transport facility", icon: <Route className="w-5 h-5 text-slate-500" /> },
  { id: 14, text: "4-minute drive to Municipal office", icon: <MapPin className="w-5 h-5 text-red-500" /> },
  { id: 15, text: "Designed according to Vastu Shastra", icon: <Compass className="w-5 h-5 text-emerald-700" /> },
  { id: 16, text: "Clear view of Annamalaiyar hill", icon: <Compass className="w-5 h-5 text-purple-600" /> },
  { id: 17, text: "Free vehicle facility for layout visit", icon: <Car className="w-5 h-5 text-blue-500" /> },
];

// 5. Thulasi Nagar
export const thulasiHighlights = [
  { id: 1, text: "10 minutes from Tiruvannamalai city", icon: <MapPin className="w-5 h-5 text-red-600" /> },
  { id: 2, text: "Apartment complex within walking distance", icon: <Building2 className="w-5 h-5 text-blue-600" /> },
  { id: 3, text: "Roads constructed at 20 feet", icon: <Route className="w-5 h-5 text-slate-600" /> },
  { id: 4, text: "100% Vastu Shastra principles", icon: <Compass className="w-5 h-5 text-emerald-700" /> },
  { id: 5, text: "Delicious drinking water available", icon: <Droplets className="w-5 h-5 text-cyan-500" /> },
  { id: 6, text: "Government school located nearby", icon: <School className="w-5 h-5 text-indigo-600" /> },
  { id: 7, text: "Wonderful view of Annamalaiyar mountain", icon: <Compass className="w-5 h-5 text-purple-600" /> },
  { id: 8, text: "Apartments located very close to plots", icon: <Home className="w-5 h-5 text-blue-500" /> },
  { id: 9, text: "Free transportation for site visits", icon: <Car className="w-5 h-5 text-amber-600" /> },
  { id: 10, text: "Suitable for building farmhouses", icon: <Leaf className="w-5 h-5 text-green-600" /> },
  { id: 11, text: "Unit selection available after full payment", icon: <Landmark className="w-5 h-5 text-slate-700" /> },
];

// 6. Highway City
export const highwayCityHighlights = [
  { id: 1, text: "DTCP & RERA approved layout", icon: <ShieldCheck className="w-5 h-5 text-green-600" /> },
  { id: 2, text: "Premium Gated Community", icon: <Fence className="w-5 h-5 text-blue-600" /> },
  { id: 3, text: "Securely fenced layout", icon: <ShieldCheck className="w-5 h-5 text-slate-500" /> },
  { id: 4, text: "30ft & 24ft paver block roads", icon: <Route className="w-5 h-5 text-slate-600" /> },
  { id: 5, text: "Drainage facilities provided", icon: <Droplets className="w-5 h-5 text-cyan-600" /> },
  { id: 6, text: "Solar street lighting", icon: <Sun className="w-5 h-5 text-amber-500" /> },
  { id: 7, text: "Drinking water facility available", icon: <Waves className="w-5 h-5 text-blue-400" /> },
  { id: 8, text: "On 100-foot ring road, near Chengam", icon: <MapPin className="w-5 h-5 text-red-500" /> },
  { id: 9, text: "Well-ventilated plot layout", icon: <Trees className="w-5 h-5 text-emerald-500" /> },
  { id: 10, text: "Immediate EB connection available", icon: <Zap className="w-5 h-5 text-yellow-500" /> },
  { id: 11, text: "Groundwater at 40 feet depth", icon: <Droplets className="w-5 h-5 text-blue-500" /> },
  { id: 12, text: "Active bus connectivity", icon: <Bus className="w-5 h-5 text-indigo-600" /> },
  { id: 13, text: "On Tiruvannamalai - Bangalore NH", icon: <Route className="w-5 h-5 text-slate-700" /> },
  { id: 14, text: "Hospital & Bus station 2 km away", icon: <Landmark className="w-5 h-5 text-rose-600" /> },
  { id: 15, text: "Office located within layout", icon: <Building className="w-5 h-5 text-slate-600" /> },
  { id: 16, text: "High investment return potential", icon: <TrendingUp className="w-5 h-5 text-green-600" /> },
];

// 7. Raghavendra Nagar
export const raghavendraHighlights = [
  { id: 1, text: "10-minute drive from Annamalaiyar Temple", icon: <Landmark className="w-5 h-5 text-orange-600" /> },
  { id: 2, text: "5-minute drive from Collector's office", icon: <Building2 className="w-5 h-5 text-blue-700" /> },
  { id: 3, text: "DTCP and RERA approved plot", icon: <ShieldCheck className="w-5 h-5 text-green-600" /> },
  { id: 4, text: "24-foot wide paved roads", icon: <Route className="w-5 h-5 text-slate-600" /> },
  { id: 5, text: "Avenue trees on both sides", icon: <Trees className="w-5 h-5 text-emerald-600" /> },
  { id: 6, text: "6-minute drive to Medical College", icon: <Stethoscope className="w-5 h-5 text-rose-600" /> },
  { id: 7, text: "Good quality groundwater", icon: <Droplets className="w-5 h-5 text-cyan-500" /> },
  { id: 8, text: "Space for playground included", icon: <Bike className="w-5 h-5 text-green-500" /> },
  { id: 9, text: "6-foot high compound wall", icon: <Fence className="w-5 h-5 text-slate-500" /> },
  { id: 10, text: "Ready for immediate construction", icon: <Home className="w-5 h-5 text-blue-600" /> },
  { id: 11, text: "Annamalaiyar Deepam view", icon: <Compass className="w-5 h-5 text-purple-600" /> },
  { id: 12, text: "Manifold investment growth", icon: <TrendingUp className="w-5 h-5 text-green-600" /> },
  { id: 13, text: "Soil testing station nearby", icon: <Microscope className="w-5 h-5 text-indigo-500" /> },
];

// 8. Amutha Surabi Nagar
export const amuthaSurabiHighlights = [
  { id: 1, text: "30 Feet & 24 Feet Wide Black Top Road", icon: <Route className="w-5 h-5 text-slate-600" /> },
  { id: 2, text: "Drainage Facility Available", icon: <Droplets className="w-5 h-5 text-cyan-600" /> },
  { id: 3, text: "Street Lighting Is Provided", icon: <Sun className="w-5 h-5 text-amber-500" /> },
  { id: 4, text: "Tasty Ground Water Facility", icon: <Waves className="w-5 h-5 text-blue-400" /> },
  { id: 5, text: "Located On 100 Feet Ring Road", icon: <Route className="w-5 h-5 text-indigo-500" /> },
  { id: 6, text: "Very Close to Tiruvannamalai City", icon: <MapPin className="w-5 h-5 text-red-600" /> },
  { id: 7, text: "Avenue Trees Planted Along The Road", icon: <Trees className="w-5 h-5 text-emerald-600" /> },
  { id: 8, text: "CCTV Surveillance Camera Installed", icon: <Video className="w-5 h-5 text-slate-700" /> },
  { id: 9, text: "Govt Medical College Very Close By", icon: <Stethoscope className="w-5 h-5 text-rose-600" /> },
  { id: 10, text: "Near Government Hospital", icon: <Building2 className="w-5 h-5 text-blue-600" /> },
  { id: 11, text: "Near SRGDS & Gandhi Nagar Schools", icon: <School className="w-5 h-5 text-indigo-600" /> },
  { id: 12, text: "Located Among Existing Houses", icon: <Home className="w-5 h-5 text-emerald-500" /> },
];

// 9. Tamil Aruvi Nagar
export const tamilAruviHighlights = [
  { id: 1, text: "Near city limits & 200ft bypass road", icon: <Route className="w-5 h-5 text-slate-600" /> },
  { id: 2, text: "Government-approved housing units", icon: <ShieldCheck className="w-5 h-5 text-green-600" /> },
  { id: 3, text: "20-foot wide tar roads in complex", icon: <Route className="w-5 h-5 text-slate-500" /> },
  { id: 4, text: "Great entrance feature", icon: <Building2 className="w-5 h-5 text-blue-600" /> },
  { id: 5, text: "Wall erected around the plot", icon: <Fence className="w-5 h-5 text-slate-500" /> },
  { id: 6, text: "Layout per Vastu Shastra", icon: <Compass className="w-5 h-5 text-emerald-700" /> },
  { id: 7, text: "Near Sri Varahi Ambal Temple", icon: <Landmark className="w-5 h-5 text-orange-600" /> },
  { id: 8, text: "Near Gandhi Nagar School & SKP College", icon: <School className="w-5 h-5 text-indigo-600" /> },
  { id: 9, text: "Near Station, Petrol Pump & Showrooms", icon: <Fuel className="w-5 h-5 text-amber-600" /> },
  { id: 10, text: "Electricity, streetlights & avenue trees", icon: <Zap className="w-5 h-5 text-yellow-500" /> },
  { id: 11, text: "Delicious drinking water facility", icon: <Droplets className="w-5 h-5 text-cyan-500" /> },
  { id: 12, text: "Well-ventilated for immediate building", icon: <Home className="w-5 h-5 text-blue-600" /> },
  { id: 13, text: "Houses built with Mountain & Tower view", icon: <Compass className="w-5 h-5 text-purple-600" /> },
  { id: 14, text: "Office located behind Canara Bank", icon: <Building className="w-5 h-5 text-slate-700" /> },
  { id: 15, text: "Rapid investment growth potential", icon: <TrendingUp className="w-5 h-5 text-green-600" /> },
];

// 10. Tamil Thendral Nagar
export const tamilThendralHighlights = [
  { id: 1, text: "Security wire fence around property", icon: <Fence className="w-5 h-5 text-slate-500" /> },
  { id: 2, text: "Security entrance gate installed", icon: <ShieldCheck className="w-5 h-5 text-green-600" /> },
  { id: 3, text: "Government approved land division", icon: <FileText className="w-5 h-5 text-blue-600" /> },
  { id: 4, text: "Overhead tank with individual pipes", icon: <Droplets className="w-5 h-5 text-cyan-500" /> },
  { id: 5, text: "Delicious groundwater availability", icon: <Waves className="w-5 h-5 text-blue-400" /> },
  { id: 6, text: "Quality tar roads in the building", icon: <Route className="w-5 h-5 text-slate-600" /> },
  { id: 7, text: "Beautiful street lights installed", icon: <Sun className="w-5 h-5 text-amber-500" /> },
  { id: 8, text: "Surrounded by residential areas", icon: <Home className="w-5 h-5 text-emerald-600" /> },
  { id: 9, text: "Two saplings planted for each plot", icon: <Trees className="w-5 h-5 text-green-600" /> },
  { id: 10, text: "24-hour transportation facilities", icon: <Bus className="w-5 h-5 text-indigo-600" /> },
  { id: 11, text: "On Tiruvannamalai - Villupuram Highway", icon: <Route className="w-5 h-5 text-slate-700" /> },
  { id: 12, text: "4km from Bus Stand & 3km from Station", icon: <Train className="w-5 h-5 text-blue-500" /> },
  { id: 13, text: "5-minute drive to Annamalaiyar Temple", icon: <Landmark className="w-5 h-5 text-orange-600" /> },
  { id: 14, text: "Located according to Vastu Shastra", icon: <Compass className="w-5 h-5 text-emerald-700" /> },
];

// 11. Deepa Malai Nagar
export const deepaMalaiHighlights = [
  { id: 1, text: "DTCP & RERA government-approved plots", icon: <ShieldCheck className="w-5 h-5 text-green-600" /> },
  { id: 2, text: "30-foot and 24-foot wide tarred roads", icon: <Route className="w-5 h-5 text-slate-600" /> },
  { id: 3, text: "Spiritually uplifting view of Annamalaiyar Hill", icon: <Compass className="w-5 h-5 text-purple-600" /> },
  { id: 4, text: "Near Ramana Maharshi Ashram & Girivalam path", icon: <Landmark className="w-5 h-5 text-orange-600" /> },
  { id: 5, text: "Situated near the 100-foot ring road", icon: <Route className="w-5 h-5 text-indigo-500" /> },
  { id: 6, text: "Availability of good quality groundwater", icon: <Droplets className="w-5 h-5 text-cyan-500" /> },
  { id: 7, text: "Solar streetlights installed throughout", icon: <Sun className="w-5 h-5 text-amber-500" /> },
  { id: 8, text: "Near Central Govt's Kendriya Vidyalaya school", icon: <School className="w-5 h-5 text-blue-700" /> },
  { id: 9, text: "Situated amidst existing residential areas", icon: <Home className="w-5 h-5 text-emerald-600" /> },
  { id: 10, text: "Ready for immediate house construction", icon: <Building2 className="w-5 h-5 text-blue-600" /> },
  { id: 11, text: "High potential for investment to multiply", icon: <TrendingUp className="w-5 h-5 text-green-600" /> },
];