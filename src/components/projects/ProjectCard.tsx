
import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  codeUrl: string;
  category: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const techBadgesRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cardRef.current) {
      // Initial card animation - removed 3D rotation
      gsap.fromTo(
        cardRef.current,
        { 
          y: 50, 
          opacity: 0
        },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8, 
          ease: "back.out(1.7)",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [index]);
  
  return (
    <Card 
      ref={cardRef}
      className="project-card glass-card overflow-hidden transition-all duration-500 hover:shadow-xl h-full"
    >
      <div className="aspect-video bg-gray-800 relative overflow-hidden group">
        <img 
          ref={imageRef}
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
          <div 
            ref={techBadgesRef} 
            className="p-3 sm:p-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500"
          >
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <Badge key={index} variant="outline" className="bg-white/10 text-gray-200 border-white/10 text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="outline" className="bg-white/10 text-gray-200 border-white/10 text-xs">
                  +{project.technologies.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
        <h3 ref={titleRef} className="text-lg sm:text-xl font-semibold mb-2 text-white">{project.title}</h3>
        <p ref={descRef} className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base flex-1">{project.description}</p>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-0">
          <Button variant="outline" size="sm" className="text-portfolio-purple border-portfolio-purple hover:bg-portfolio-purple/20 text-xs sm:text-sm" asChild>
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <Github size={14} className="mr-2" />
              Code
            </a>
          </Button>
          <Button variant="default" size="sm" className="bg-portfolio-purple hover:bg-portfolio-purple/90 text-xs sm:text-sm" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <ExternalLink size={14} className="mr-2" />
              Live Demo
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
