import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-background" />

      <div className="container-custom mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image - SIZE INCREASED HERE */}
              {/* Changed max-w-sm to max-w-md for wider width */}
              <div className="relative rounded-2xl overflow-hidden shadow-card max-w-md mx-auto lg:mx-0">
                <img
                  src="shabeer.jpeg"
                  alt="Mr. Shabeer - Founder"
                  // Changed h-[420px] to h-[500px] for taller height
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

                {/* Founder Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-background mb-1">
                    Mr.A.R. Shabeer Ahamed
                  </h3>
                  <p className="text-background/80">
                    Founder & Managing Director
                  </p>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -right-8 glass rounded-2xl p-6 shadow-card max-w-xs hidden md:block"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">12+</p>
                    <p className="text-sm text-muted-foreground">
                      Years of Excellence
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recognized as one of the most trusted real estate developers in Tiruvannamalai.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              About Us
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              A Legacy of Trust,{' '}
              <span className="gradient-text">A Vision for Tomorrow</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Since 2014, Thamizh Aruvi Real Estate has been at the forefront of creating
              exceptional living spaces in Tiruvannamalai. Under the visionary leadership of
              Mr. Shabeer, we have transformed dreams into reality for over 1000 families.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our commitment to quality, transparency, and customer satisfaction has made us
              the preferred choice for those seeking premium plots. Every project we
              undertake reflects our dedication to excellence and our deep understanding of
              what families truly need.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">20+</p>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-2xl font-bold text-foreground">1000+</p>
                <p className="text-xs text-muted-foreground">Families</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
            </div>

            {/* Navigation Button */}
            <Button
              variant="default"
              size="lg"
              className="group"
              onClick={() => navigate('/about')}
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;