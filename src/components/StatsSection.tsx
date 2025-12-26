import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Building2, Users, Award, Briefcase } from 'lucide-react';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}

const StatItem = ({ value, suffix, label, icon, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center text-center group"
    >
      <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        {count}
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 20, suffix: '+', label: 'Years Experience', icon: <Award className="w-7 h-7 text-primary-foreground" /> },
    { value: 50, suffix: '+', label: 'Projects Completed', icon: <Building2 className="w-7 h-7 text-primary-foreground" /> },
    { value: 1000, suffix: '+', label: 'Happy Families', icon: <Users className="w-7 h-7 text-primary-foreground" /> },
    { value: 100, suffix: '%', label: 'Customer Satisfaction', icon: <Briefcase className="w-7 h-7 text-primary-foreground" /> },
  ];

  return (
    <section className="section-padding bg-muted/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container-custom mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Track Record
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Numbers That <span className="gradient-text">Speak Trust</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
