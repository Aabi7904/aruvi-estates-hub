import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import PrinciplesSection from '@/components/PrinciplesSection';
import ProjectsSpotlight from '@/components/ProjectsSpotlight';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Thamizh Aruvi Real Estate | Premium Plots in Tiruvannamalai</title>
        <meta name="description" content="Discover premium DTCP & RERA approved plots in Tiruvannamalai. 12+ years of trust, 1000+ happy families. Your dream home starts here with Thamizh Aruvi Real Estate." />
        <meta name="keywords" content="real estate, plots, Tiruvannamalai, DTCP approved, RERA registered, land, property, Thamizh Aruvi" />
        <link rel="canonical" href="https://thamizharvui.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Thamizh Aruvi Real Estate | Premium Plots in Tiruvannamalai" />
        <meta property="og:description" content="Premium DTCP & RERA approved plots in Tiruvannamalai. 12+ years of excellence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thamizharvui.com" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Thamizh Aruvi Real Estate" />
        <meta name="twitter:description" content="Premium DTCP & RERA approved plots in Tiruvannamalai." />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <PrinciplesSection />
        <ProjectsSpotlight />
        <AboutSection />
        <CTASection />
        <ContactSection />
        <Footer />
        <WhatsAppFAB />
      </main>
    </>
  );
};

export default Index;
