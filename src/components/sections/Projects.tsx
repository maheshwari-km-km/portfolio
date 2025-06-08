
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import the new components
import ProjectsHeader from '@/components/projects/ProjectsHeader';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectsList from '@/components/projects/ProjectsList';
import { projectsData, categoryMap } from '@/components/projects/ProjectsData';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate section title and subtitle
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });
    
    timeline.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    ).fromTo(
      tabsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
    
    // Add animation for category changes
    const projectsContainer = projectsRef.current;
    if (projectsContainer) {
      gsap.set(projectsContainer, { opacity: 1 });
    }
  }, []);
  
  // Animation for category changes
  useEffect(() => {
    if (projectsRef.current) {
      gsap.fromTo(
        projectsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeCategory]);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-xl opacity-20"
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
      
      {/* Add 3D Laptop Video in Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <video
          autoPlay
          muted
          loop
          className="object-cover w-full h-full"
        >
          <source 
            src="https://cdn.pixabay.com/vimeo/744626024/computer-128714.mp4?width=1280&hash=9e74ec8de7310e4d1122e5e7cb14824114584ccb" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="section-container">
        <ProjectsHeader 
          titleRef={titleRef} 
          subtitleRef={subtitleRef} 
        />
        
        <ProjectFilters 
          categoryMap={categoryMap} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          tabsRef={tabsRef}
        />
        
        <div ref={projectsRef} className="transition-all duration-500">
          <ProjectsList 
            activeCategory={activeCategory} 
            projects={projectsData} 
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
