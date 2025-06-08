
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface ProjectsHeaderProps {
  titleRef: React.RefObject<HTMLHeadingElement>;
  subtitleRef: React.RefObject<HTMLParagraphElement>;
}

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ titleRef, subtitleRef }) => {
  return (
    <>
      <h2 ref={titleRef} className="section-title text-center text-white mb-4">
        <span className="relative inline-block">
          My <span className="text-gradient">Projects</span>
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-portfolio-teal to-portfolio-purple transform scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100"></span>
        </span>
      </h2>
      <p ref={subtitleRef} className="section-subtitle text-center text-gray-300">
        A selection of my recent work and personal projects
      </p>
    </>
  );
};

export default ProjectsHeader;
