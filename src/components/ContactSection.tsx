import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent! ✓",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: '', phone: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Request a <span className="gradient-text">Site Visit</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to see your future home? Schedule a site visit with our team and 
            experience our premium plots firsthand.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 shadow-card">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Your Name</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Your Message</label>
                <Textarea
                  placeholder="I'm interested in visiting Semmozhi Nagar..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Visit Us</h4>
                <p className="text-sm text-muted-foreground">
                  No.27, Manaloor Pettai Main Road, Thiruvannamalai - 606601
                </p>
              </div>
              <div className="glass rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Call Us</h4>
                <a href="tel:+919443729991" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +91 94437 29991
                </a>
              </div>
              <div className="glass rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                <a href="mailto:info@thamizharvui.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  info@thamizharvui.com
                </a>
              </div>
              <div className="glass rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Working Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Mon - Sat: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="glass rounded-2xl overflow-hidden shadow-card h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0876987541853!2d79.06892841482259!3d12.231373891324583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad44c4b5555555%3A0x6666666666666666!2sThiruvannamalai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Thamizh Aruvi Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
