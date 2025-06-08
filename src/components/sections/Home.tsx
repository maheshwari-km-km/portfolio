import React, { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

const Home: React.FC = () => {
  const textBackgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Remove the rotation animation - text will be static
  }, []);
  
  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Animated Background Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-1">
        <div className="absolute animate-blob-1 top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-portfolio-teal to-portfolio-purple rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute animate-blob-2 bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-portfolio-pink to-portfolio-amber rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <div className="w-full max-w-4xl text-center relative z-10 px-4">
        <div className="animate-fade-in">
          {/* Slogan Text */}
          <div className="mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-light tracking-wide mb-1 opacity-80">
              Know Something About Everything
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-light tracking-wide opacity-80">
              Everything About One Thing
            </p>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-white font-poppins tracking-tight
            transition-all duration-300 hover:scale-105">
            <span className="inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>Hi, I'm </span>
            <span className="inline-block bg-gradient-to-r from-portfolio-teal via-portfolio-purple to-portfolio-pink text-transparent bg-clip-text animate-fade-in" style={{ animationDelay: '0.4s' }}>Maheshwari</span>
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-3xl mb-6 sm:mb-8 text-gray-200 font-poppins
            animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Junior Software Engineer
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-xl mb-8 sm:mb-12 text-gray-200 leading-relaxed
            animate-fade-in" style={{ animationDelay: '0.8s' }}>
     Full-stack engineer focused on delivering efficient, maintainable code and seamless user experiences.
      I turn challenges into clean, working solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 
            animate-fade-in" style={{ animationDelay: '1s' }}>
            <a href="#projects" className="w-full sm:w-auto">
            <Button className="bg-gradient-to-r from-portfolio-teal to-portfolio-purple text-white 
                transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-portfolio-purple/20 px-6 py-3 text-base sm:text-lg w-full">
              View My Work
            </Button>
            </a>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="inline-flex w-full sm:w-auto group relative"
            >
              <Button 
                variant="outline" 
                className="border-2 border-white hover:bg-white/10 transform transition-all duration-500 hover:scale-105 hover:shadow-lg px-6 py-3 text-base sm:text-lg flex items-center justify-center gap-2 w-full relative overflow-hidden"
              >
                <Download size={20} className="animate-bounce" />
                <span className="relative z-10">Resume Coming Soon</span>
                <span className="absolute inset-0 bg-gradient-to-r from-portfolio-teal/20 to-portfolio-purple/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              </Button>
              <div className="absolute -top-2 -right-2 bg-portfolio-pink text-white text-xs px-2 py-1 rounded-full animate-pulse">
                🚀
              </div>
            </a>
          </div>
          
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-12 sm:mb-16 
            animate-fade-in" style={{ animationDelay: '1.2s' }}>
            {[
              { Icon: Github, href: "https://github.com" },
              { Icon: Linkedin, href: "https://linkedin.com" },
              { Icon: Mail, href: "mailto:maheshwari.km.km@gmail.com" }
            ].map(({ Icon, href }, index) => (
              <a 
                key={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                href={href}
                className="text-white hover:text-portfolio-purple 
                  transition-all transform hover:scale-125 duration-300
                  bg-black/30 p-2 sm:p-3 rounded-full"
                style={{ animationDelay: `${1.4 + index * 0.2}s` }}
              >
                <Icon size={24} className="sm:w-7 sm:h-7" />
              </a>
            ))}
          </div>
        </div>
        
        {/* 3D Arrow Animation */}
        <a 
          href="#about" 
          className="flex items-center justify-center 
            animate-bounce text-white 
            hover:text-portfolio-purple 
            transition-colors"
        >
          <ArrowDown size={24} className="sm:w-7 sm:h-7" />
        </a>
      </div>
    </section>
  );
};

export default Home;
