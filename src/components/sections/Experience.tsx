import React, { useState } from 'react';
import { BriefcaseIcon, GraduationCapIcon, BookOpenIcon, BriefcaseBusinessIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TimelineItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education' | 'course' | 'internship';
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: 'Junior Software Engineer',
    company: 'Kenpath Technologies Pvt. Ltd',
    period: 'NOV 2024 - Present',
    description: 'Full-stack development using Angular, React, TypeScript, Node.js, and Express.js for enterprise-grade applications. Collaborated in agile sprints to deliver scalable and maintainable software features. Integrated APIs and optimized frontend performance for better user experience.',
    type: 'work',
  },
  {
    id: 2,
    title: 'Junior Software Engineer Intern',
    company: 'Kenpath Technologies Pvt. Ltd',
    period: 'FEB 2024 - OCT 2024',
    description: 'Contributed to backend and UI development across internal tools and customer-facing platforms.Assisted in debugging and improving existing modules using Angular and Node.js.Participated in code reviews, daily stand-ups, and sprint planning.',
    type: 'work',
  },
  {
    id: 2.1,
    title: 'Junior Software Engineer Intern',
    company: 'Kenpath Technologies Pvt. Ltd',
    period: 'FEB 2024 - OCT 2024',
    description: 'Contributed to backend and UI development across internal tools and customer-facing platforms.Assisted in debugging and improving existing modules using Angular and Node.js.Participated in code reviews, daily stand-ups, and sprint planning.',
    type: 'internship',
  },
  {
    id: 3,
    title: 'Junior Software Engineer',
    company: 'Yorosis Technologies Pvt. Ltd',
    period: 'JULY 2024 - FEB 2024',
    description: 'Developed web application modules with Angular and Node.js; maintained backend APIs.Wrote JUnit test cases to ensure backend stability and integration accuracy.Actively participated in cross-functional team collaborations.',
    type: 'work',
  },
  {
    id: 4,
    title: 'Java Full Stack Development',
    company: 'JSpiders: Java Training Institute, Bangalore',
    period: 'OCT 2022 - MAY 2023',
    description: 'Enrolled in a well-regarded program for Java Full Stack and obtaining expertise in Java-based software development.',
    type: 'course',
  },
  {
    id: 5,
    title: 'Software Engineer Intern',
    company: 'RND SOFTECH PRIVATE LIMITED',
    period: 'JAN 2022 - FEB 2022',
    description: 'Developed a full-stack web application as part of a team project, implementing the frontend with Angular and the backend using Node.js and Express. Integrated REST APIs, managed basic authentication, and deployed the solution for internal demo purposes.',
    type: 'internship',
  },
  {
    id: 6,
    title: 'WEB DEVELOPMENT INTERN',
    company: 'HACKOWLS SOFTWARE LLP',
    period: 'DEC 2021 - JAN 2022',
    description: 'Built and deployed a basic website. Learned client communication, requirement gathering, and technical implementation of simple UI/UX solutions.', 
    type: 'internship',
  },
  {
    id: 7,
    title: 'Bachelor of Science in Information Technology',
    company: 'bharathiar university',
    period: '2019 - 2022',
    description: 'Studied computer science fundamentals, data structures, algorithms, and web development basics , Developed a College Management System as a team project (Jul 2021 – Sep 2021), a web application built using Java, Servlets, JSP, and MySQL. The system managed student records, attendance, faculty modules, and administrative tasks through a secure login-based interface.',
    type: 'education',
  },
];

const TimelineItem: React.FC<{ item: TimelineItem; isLast: boolean }> = ({ item, isLast }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'work':
        return BriefcaseIcon;
      case 'education':
        return GraduationCapIcon;
      case 'course':
        return BookOpenIcon;
      case 'internship':
        return BriefcaseBusinessIcon;
      default:
        return BriefcaseIcon;
    }
  };
  
  const Icon = getIcon();
  
  return (
    <div className="relative">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="bg-portfolio-purple/80 text-white p-2 rounded-full">
            <Icon size={16} className="sm:w-5 sm:h-5" />
          </div>
          {!isLast && <div className="w-0.5 h-full bg-white/30 mt-2"></div>}
        </div>
        <Card className="w-full mb-6 sm:mb-8 glass-card bg-white/5 backdrop-blur-sm">
          <CardHeader className="pb-2 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg sm:text-xl font-semibold text-white">{item.title}</CardTitle>
                <p className="text-portfolio-purple font-medium text-sm sm:text-base">{item.company}</p>
              </div>
              <span className="text-xs sm:text-sm text-gray-300 whitespace-nowrap">{item.period}</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{item.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const tabMap = [
  { value: 'work', label: 'Work' },
  { value: 'internship', label: 'Internships' },
  { value: 'course', label: 'Courses' },
  { value: 'education', label: 'Education' },
  { value: 'all', label: 'All' },
];

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState('work');

  const filteredTimelineData = timelineData.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  return (
    <section 
      id="experience" 
      className="py-16 sm:py-20 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url(https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=2070)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 font-poppins tracking-tight text-center">Experience & Education</h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto text-center px-4">
          My professional journey and educational background
        </p>

        <div className="flex justify-center mb-8">
          <Tabs defaultValue={activeTab} className="w-full max-w-3xl mx-auto">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-12 bg-white/10 backdrop-blur-md h-[5rem] md:h-auto">
              {tabMap.map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className="data-[state=active]:bg-portfolio-purple data-[state=active]:text-white text-gray-300"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="max-w-3xl mx-auto mt-8 sm:mt-12">
          {filteredTimelineData.map((item, index) => (
            <TimelineItem 
              key={item.id} 
              item={item} 
              isLast={index === filteredTimelineData.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
