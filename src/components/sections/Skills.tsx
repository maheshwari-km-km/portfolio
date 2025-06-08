import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  id: number;
  title: string;
  skills: Skill[];
}

interface Skill {
  id: number;
  name: string;
}

const skillsData: SkillCategory[] = [
  {
    id: 1,
    title: 'Frontend Development',
    skills: [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'RxJS' },
      { id: 4, name: 'HTML/CSS' },
      { id: 5, name: 'JavaScript' },
      // { id: 6, name: 'NgRx' },
    ],
  },
  {
    id: 2,
    title: 'UI Frameworks & Libraries',
    skills: [
      { id: 7, name: 'Angular Material' },
      { id: 8, name: 'Tailwind CSS' },
      { id: 9, name: 'Bootstrap' },
      { id: 10, name: 'SCSS/SASS' },
    ],
  },
  {
    id: 3,
    title: 'Backend & DevOps',
    skills: [
      { id: 11, name: 'Node.js' },
      { id: 12, name: 'Express' },
      { id: 13, name: 'MongoDB' },
      { id: 14, name: 'Git/GitHub' },
      { id: 15, name: 'Docker' },
    ],
  },
];

const SkillItem: React.FC<{ skill: Skill; index: number; categoryIndex: number }> = ({ skill, index, categoryIndex }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!itemRef.current) return;
    
    gsap.fromTo(
      itemRef.current,
      { 
        x: -20, 
        opacity: 0 
      },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.5, 
        ease: "power3.out",
        delay: 0.3 + index * 0.1,
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  }, [index]);
  
  return (
    <div 
      ref={itemRef}
      className="mb-4 backdrop-blur-md bg-black/20 border border-white/10 rounded-lg p-3 transform transition-all duration-300 
      hover:bg-portfolio-purple/40 hover:translate-x-2 hover:scale-105 hover:shadow-md group"
    >
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-portfolio-purple mr-3 group-hover:scale-150 transition-all duration-300"></div>
        <span className="font-medium text-white text-shadow">{skill.name}</span>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !subtitleRef.current || !cardsRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    
    // GSAP animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });
    
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    ).fromTo(
      cardsRef.current.querySelectorAll('.skill-card'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-24 relative bg-gradient-to-r from-[#14203a] via-black to-[#020b21]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute animate-blob-1 opacity-30 top-1/4 left-1/4 w-72 h-72 bg-portfolio-purple/20 rounded-full filter blur-xl"></div>
        <div className="absolute animate-blob-2 opacity-30 bottom-1/4 right-1/4 w-64 h-64 bg-portfolio-teal/20 rounded-full filter blur-xl"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="section-title text-center text-white text-shadow mb-4">
            <span className="bg-gradient-to-r from-portfolio-teal to-portfolio-purple text-transparent bg-clip-text">Skills & Expertise</span>
          </h2>
          <p ref={subtitleRef} className="section-subtitle text-center text-gray-200 text-shadow">
            My technical expertise and competencies
          </p>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, categoryIndex) => (
            <Card 
              key={category.id} 
              className="skill-card glass-card card-hover"
            >
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6 text-white text-shadow bg-gradient-to-r from-portfolio-teal to-portfolio-purple text-transparent bg-clip-text">
                  {category.title}
                </h3>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem 
                    key={skill.id} 
                    skill={skill} 
                    index={skillIndex} 
                    categoryIndex={categoryIndex} 
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
