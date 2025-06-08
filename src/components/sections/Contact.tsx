import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageSquare, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { sendEmail } from '@/utils/emailService';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('T9t0SqwKl2KRez2cI');
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await sendEmail({
        to: `${formData.name} <${formData.email}>`,
        subject: formData.subject,
        body: formData.message
      });
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. Your message has been sent successfully.",
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "There was an error sending your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="py-20 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2062)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="section-title text-center text-white font-bold text-4xl mb-4">Get In Touch</h2>
        <p className="section-subtitle text-center text-white text-xl font-medium mb-8">
          Have a question or want to work together? Feel free to contact me.
        </p>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-portfolio-darkPurple">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 transform transition-all duration-300 hover:translate-x-2">
                    <div className="bg-portfolio-purple/10 p-3 rounded-full text-portfolio-purple">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <a href="mailto:maheshwari.km.km@gmail.com" className="text-gray-600 hover:text-portfolio-purple transition-colors">
                        maheshwari.km.km@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 transform transition-all duration-300 hover:translate-x-2">
                    <div className="bg-portfolio-purple/10 p-3 rounded-full text-portfolio-purple">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Phone</h4>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-portfolio-purple transition-colors">
                        +91- 8870800928
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 transform transition-all duration-300 hover:translate-x-2">
                    <div className="bg-portfolio-purple/10 p-3 rounded-full text-portfolio-purple">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Social Media</h4>
                      <div className="flex gap-4 mt-2">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-portfolio-purple transition-colors">
                          LinkedIn
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-portfolio-purple transition-colors">
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Card className="hover:shadow-lg transition-all duration-300 bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-portfolio-darkPurple">
                  Send a Message
                </h3>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="to-email">To</label>
                  <Input
                    id="to-email"
                    value="maheshwari.km.km@gmail.com"
                    disabled
                    className="border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                    <Input 
                      placeholder="Your Name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="focus:ring-0 ring-0 bg-gray-50 focus:outline-none"
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                    <Input 
                      type="email" 
                      placeholder="Your Email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="focus:ring-0 ring-0 bg-gray-50 focus:outline-none"
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                    <Input 
                      placeholder="Subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="focus:ring-0 ring-0 bg-gray-50 focus:outline-none"
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                    <Textarea 
                      placeholder="Your Message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="focus:ring-0 ring-0 bg-gray-50 focus:outline-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-portfolio-purple hover:bg-portfolio-purple/90 transform transition-all duration-300 hover:scale-105 focus:scale-95"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
