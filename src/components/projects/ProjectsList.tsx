
import React, { useEffect, useRef } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ProjectCard from './ProjectCard';
import { Project } from './ProjectsData';
import gsap from 'gsap';

interface ProjectsListProps {
  activeCategory: string;
  projects: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ activeCategory, projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    if (containerRef.current) {
      // Simple fade in without sliding animation
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
      
      // Create 3D hover effect for project cards with glow
      const cards = containerRef.current.querySelectorAll('.project-card');
      cards.forEach((card) => {
        // Add a glow effect element
        const glowEffect = document.createElement('div');
        glowEffect.classList.add('absolute', 'inset-0', 'rounded-xl', 'pointer-events-none', 'opacity-0', 'transition-opacity');
        (glowEffect as HTMLElement).style.boxShadow = '0 0 40px 5px rgba(139, 92, 246, 0.5)';
        (glowEffect as HTMLElement).style.zIndex = '-1';
        card.appendChild(glowEffect);
        
        card.addEventListener('mousemove', (e: any) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          
          // Show glow effect
          (glowEffect as HTMLElement).style.opacity = '1';
          
          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center center",
            boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.2), 0 10px 10px -5px rgba(139, 92, 246, 0.1)'
          });
          
          // Move highlight based on cursor
          const highlight = card.querySelector('.highlight-effect');
          if (highlight) {
            const highlightX = (x / rect.width) * 100;
            const highlightY = (y / rect.height) * 100;
            (highlight as HTMLElement).style.background = `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)`;
          }
        });
        
        card.addEventListener('mouseleave', () => {
          // Hide glow effect
          (glowEffect as HTMLElement).style.opacity = '0';
          
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "elastic.out(1.1, 0.6)",
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          });
        });
        
        // Add highlight effect element
        const highlight = document.createElement('div');
        highlight.classList.add('highlight-effect', 'absolute', 'inset-0', 'pointer-events-none');
        card.appendChild(highlight);
        
        // Add slight floating animation to cards
        gsap.to(card, {
          y: '-=10',
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random()
        });
      });
    }
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        const cards = containerRef.current.querySelectorAll('.project-card');
        cards.forEach((card) => {
          card.removeEventListener('mousemove', () => {});
          card.removeEventListener('mouseleave', () => {});
          // Remove added elements
          const glowEffect = card.querySelector('[style*="box-shadow"]');
          const highlight = card.querySelector('.highlight-effect');
          if (glowEffect) card.removeChild(glowEffect);
          if (highlight) card.removeChild(highlight);
          // Kill animations
          gsap.killTweensOf(card);
        });
      }
    };
  }, [activeCategory]);

  return (
    <Tabs value={activeCategory} defaultValue={activeCategory}>
      <TabsContent value={activeCategory} className="mt-0">
        <div 
          ref={containerRef} 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProjectsList;
