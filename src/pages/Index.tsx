import React, { useState, useEffect } from 'react';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Home from '@/components/sections/Home';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatBot } from '@/components/chatbot/ChatBotProvider';
import LottieAnimation from '@/components/animation/LottieAnimation';
import TechMascots from '@/components/animation/TechMascots';
import AnimatedBackground from '@/components/3d/AnimatedBackground';
import Globe from '@/components/3d/Globe';
import AnimatedCube from '@/components/3d/AnimatedCube';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import TechGlobe from '@/components/tech/TechGlobe';
import TechMatrix from '@/components/tech/TechMatrix';

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { openChatBot } = useChatBot();
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Init smooth scrolling
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          if (targetId && targetId !== '#') {
            gsap.to(window, {
              duration: 1, 
              scrollTo: {
                y: targetId,
                offsetY: 80
              },
              ease: "power3.inOut"
            });
          }
        });
      });
      
      // Initialize page animations
      const tl = gsap.timeline();
      
      // Get elements with class animate-fade-in instead of using the selector directly
      const fadeElements = document.querySelectorAll('.animate-fade-in');
      if (fadeElements.length > 0) {
        tl.fromTo(
          fadeElements,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
        );
      }
      
      // Add scroll-based animations
      const scrollElements = document.querySelectorAll('.scroll-animate');
      if (scrollElements.length > 0) {
        scrollElements.forEach((element) => {
          gsap.fromTo(
            element,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      }
      
      // 3D parallax effect on scroll
      const parallaxContainers = document.querySelectorAll('.parallax-container');
      parallaxContainers.forEach((container) => {
        const elements = container.querySelectorAll('.parallax-element');
        elements.forEach((element, index) => {
          const depth = 0.1 * (index + 1);
          
          ScrollTrigger.create({
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              gsap.to(element, {
                y: self.progress * 100 * depth,
                duration: 0.5,
                ease: "none",
                overwrite: "auto"
              });
            }
          });
        });
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-48 h-48">
          <LottieAnimation 
            src="/animations/developer-animation.json"
            loop={true}
            autoplay={true}
          />
        </div>
        <h2 className="text-white text-xl mt-8 animate-pulse font-poppins">Loading amazing content...</h2>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col scroll-smooth bg-gray-900 relative overflow-x-hidden">
      <Nav />
      <main className="flex-grow">
        <section className="min-h-screen relative">
          <AnimatedBackground className="opacity-30" />
          <Home />
        </section>
        <About />
        <div className="py-12 relative bg-gradient-to-r from-[#14203a] via-black to-[#020b21] parallax-container overflow-x-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              <span className="bg-gradient-to-r from-portfolio-teal via-portfolio-purple to-portfolio-pink text-transparent bg-clip-text">
                Technologies I Work With
              </span>
            </h2>
            
            {/* New Tech Matrix */}
            <div className="flex justify-center parallax-element">
              <TechMatrix className="opacity-90" />
            </div>
          </div>
        </div>
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      
      {/* Chat Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <Button 
          className="bg-portfolio-purple hover:bg-portfolio-purple/90 text-white rounded-full p-4 shadow-lg transform transition-transform duration-300 hover:scale-110"
          onClick={() => openChatBot()}
        >
          <MessageCircle size={24} />
        </Button>
      </div>
    </div>
  );
};

export default Index;
