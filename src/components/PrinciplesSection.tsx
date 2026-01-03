import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, Heart, Shield, Star, Users, Zap } from 'lucide-react';

const principles = [
  {
    icon: Award,
    title: 'Service Excellence',
    description: 'Delivering exceptional service that exceeds expectations at every step of your journey.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Heart,
    title: 'Craftsmanship',
    description: 'Meticulous attention to detail in every plot, every road, and every amenity we provide.',
    color: 'from-red-500 to-rose-600',
  },
  {
    icon: Shield,
    title: 'Trust & Integrity',
    description: 'Building lasting relationships through transparency, honesty, and ethical practices.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Star,
    title: 'Quality Assurance',
    description: 'DTCP and RERA approved projects ensuring your investment is safe and valuable.',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Your dreams are our priority. We listen, understand, and deliver what you need.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Embracing modern infrastructure and sustainable development practices.',
    color: 'from-purple-500 to-violet-600',
  },
];

interface TiltCardProps {
  principle: typeof principles[0];
  index: number;
}

const TiltCard = ({ principle, index }: TiltCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setRotateX(-mouseY / 10);
    setRotateY(mouseX / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const Icon = principle.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="relative group cursor-pointer transition-transform duration-200 ease-out"
    >
      <div className="glass rounded-2xl p-8 h-full shadow-card hover:shadow-glow transition-all duration-300 border-2 border-transparent hover:border-primary/20">
        {/* Icon */}
        <div 
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${principle.color} flex items-center justify-center mb-6 shadow-lg transform transition-transform duration-300 group-hover:scale-110`}
          style={{ transform: 'translateZ(30px)' }}
        >
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        
        {/* Content */}
        <h3 
          className="text-xl font-bold text-foreground mb-3"
          style={{ transform: 'translateZ(20px)' }}
        >
          {principle.title}
        </h3>
        <p 
          className="text-muted-foreground text-sm leading-relaxed"
          style={{ transform: 'translateZ(10px)' }}
        >
          {principle.description}
        </p>
      </div>
    </motion.div>
  );
};

const PrinciplesSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container-custom mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Our Foundation
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Principles That <span className="gradient-text">Guide Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our core values have been the cornerstone of our success for over decades, 
            helping us create homes that families cherish for generations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {principles.map((principle, index) => (
            <TiltCard key={principle.title} principle={principle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
