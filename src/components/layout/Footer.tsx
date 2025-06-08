import React, { useEffect, useRef } from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!footerRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
    
    // Animate footer elements
    tl.fromTo(
      footerRef.current.querySelector('.footer-logo'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      linksRef.current?.querySelectorAll('a') || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(
      socialsRef.current?.querySelectorAll('a') || [],
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.6"
    )
    .fromTo(
      copyrightRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, []);
  
  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-r from-[#14203a] via-black to-[#020b21] text-white py-16 overflow-hidden"
    >
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-xl opacity-10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              background: `radial-gradient(circle, rgba(139,92,246,1) 0%, rgba(30,174,219,1) 100%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left footer-logo">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-portfolio-teal to-portfolio-purple text-transparent bg-clip-text transform transition-all duration-500 hover:scale-110">Portfolio</h3>
            <p className="text-gray-300 mt-1">Junior software engineer</p>
          </div>
          
          <div ref={linksRef} className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8 md:mb-0">
            {[
              { label: "Home", href: "#" },
              { label: "About", href: "#about" },
              { label: "Experience", href: "#experience" },
              { label: "Skills", href: "#skills" },
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" }
            ].map(({ label, href }, index) => (
              <a 
                key={label} 
                href={href} 
                className="text-gray-300 hover:text-white relative px-2 py-1 transition-all duration-300 hover:scale-110 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-portfolio-purple after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {label}
              </a>
            ))}
          </div>

          <div ref={socialsRef} className="flex space-x-4">
            {[
              { Icon: Github, href: "https://github.com", label: "GitHub" },
              { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { Icon: Mail, href: "mailto:example@example.com", label: "Email" }
            ].map(({ Icon, href, label }) => (
              <a 
                key={href} 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={label}
                className="text-gray-300 hover:text-portfolio-purple 
                  transition-all transform hover:scale-125 duration-300
                  bg-black/30 p-3 rounded-full"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
        
        <div ref={copyrightRef} className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-gray-300 flex items-center justify-center">
            {/* Made with <Heart size={16} className="mx-1 text-red-400 animate-pulse-slow" /> using React */}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {/* &copy; {currentYear} John Doe. All rights reserved. */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
