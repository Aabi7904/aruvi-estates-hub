import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { Award, Users, Building2, Heart, Shield, Star, Target, Eye } from 'lucide-react';

const milestones = [
  { year: '2014', title: 'Foundation', description: 'Thamizh Aruvi Real Estate was founded with a vision to provide quality plots.' },
  { year: '2016', title: 'First 10 Projects', description: 'Completed 10 successful residential projects in Tiruvannamalai.' },
  { year: '2017', title: 'RERA Compliance', description: 'Became one of the first developers to achieve full RERA compliance.' },
  { year: '2020', title: '500 Happy Families', description: 'Reached the milestone of serving 500 families with their dream plots.' },
  { year: '2023', title: 'Digital Transformation', description: 'Launched virtual site visits and online booking platform.' },
  { year: '2026', title: '1000+ Families', description: 'Celebrating 12 years with over 1000 happy families and 20+ projects.' },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Thamizh Aruvi Real Estate</title>
        <meta name="description" content="Learn about Thamizh Aruvi Real Estate's 12+ year journey in building trust and delivering premium plots in Tiruvannamalai." />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero / Our Story Section */}
        {/* UPDATED: Changed pt-32 to pt-24 to move the section up */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <div className="container-custom mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  Our Story
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Decades of{' '}
                  <span className="gradient-text">Trust & Excellence</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Since 2014, Thamizh Aruvi Real Estate has been the cornerstone of residential 
                  development in Tiruvannamalai. Under the visionary leadership of Mr.A.R. Shabeer Ahamed, 
                  we have transformed the real estate landscape, helping over 1000 families 
                  realize their dreams of property ownership.
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">12+</p>
                    <p className="text-sm text-muted-foreground">Years</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">20+</p>
                    <p className="text-sm text-muted-foreground">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">1000+</p>
                    <p className="text-sm text-muted-foreground">Families</p>
                  </div>
                </div>
              </motion.div>

              {/* Image Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                // UPDATED: Added max-w-md and mx-auto to restrict width and center it (making it smaller)
                className="relative max-w-md mx-auto"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-card">
                  <img
                    src="shabeer.jpeg"
                    alt="Mr. Shabeer - Founder"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-background mb-1">Mr.A.R.Shabeer Ahamed</h3>
                    <p className="text-background/80">Founder & Managing Director</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 shadow-card"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted and preferred real estate developer in Tamil Nadu, 
                  known for delivering exceptional quality, transparent dealings, and 
                  creating communities that families are proud to call home.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-8 shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide affordable, high-quality residential plots with all 
                  legal approvals and modern amenities, ensuring every customer 
                  experiences a seamless journey from purchase to ownership.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding">
          <div className="container-custom mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Milestones That <span className="gradient-text">Define Us</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="glass rounded-2xl p-6 shadow-soft inline-block">
                        <span className="text-3xl font-bold gradient-text">{milestone.year}</span>
                        <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full gradient-primary shadow-glow hidden md:block flex-shrink-0" />
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-foreground">
          <div className="container-custom mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                Core Values
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background">
                What We <span className="text-primary">Stand For</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: 'Integrity', description: 'Transparent dealings and honest communication' },
                { icon: Star, title: 'Quality', description: 'Premium plots with best-in-class amenities' },
                { icon: Heart, title: 'Customer First', description: 'Your satisfaction is our top priority' },
                { icon: Award, title: 'Excellence', description: '12+ years of trusted service' },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-6 text-center hover:border-primary/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-background mb-2">{value.title}</h3>
                  <p className="text-background/70 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppFAB />
      </main>
    </>
  );
};

export default About;