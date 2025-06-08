import React, { useRef } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectFiltersProps {
  categoryMap: { [key: string]: string };
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  tabsRef: React.RefObject<HTMLDivElement>;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ 
  categoryMap, 
  activeCategory, 
  setActiveCategory,
  tabsRef
}) => {
  return (
    <Tabs defaultValue={activeCategory} className="w-full max-w-3xl mx-auto" ref={tabsRef}>
      <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-12 bg-white/10 backdrop-blur-md h-[5rem] md:h-auto">
        {Object.entries(categoryMap).map(([value, label]) => (
          <TabsTrigger 
            key={value} 
            value={value}
            onClick={() => setActiveCategory(value)}
            className="data-[state=active]:bg-portfolio-purple data-[state=active]:text-white text-gray-300"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ProjectFilters;
