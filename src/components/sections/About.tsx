import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-20 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 font-poppins tracking-tight text-center">About Me</h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto text-center px-4">
          Get to know more about my background, experience, and what drives me as a developer.
        </p>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="glass-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                  {/* I'm a passionate Angular developer with over 5 years of experience building enterprise-level web applications. 
                  My journey started with AngularJS and evolved with the framework through Angular 2+ to the latest versions. */}
                  With over a year of full-stack development experience, I've contributed to enterprise-level applications at Yorosis and Kenpath Technologies.
                  My journey began with internships and evolved through hands-on experience solving real-world challenges in both corporate roles and freelance projects.
                </p>
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                  I bring strong technical skills, attention to detail, and a user-first mindset to every project. I specialize in building responsive, scalable web applications with clean and maintainable code.
                  In addition to my full-time roles, I've also worked on various freelance projects, helping clients build customized solutions and grow their digital presence. I enjoy continuously learning, improving my craft, and taking on new development challenges.
                </p>
                {/* <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                  When I'm not coding, you can find me contributing to open-source projects, 
                  writing technical articles, and mentoring junior developers.
                </p> */}
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              {['Angular', 'TypeScript', 'RxJS', 'Angular Material', 'Tailwind CSS', 'Node.js', 'Express'].map((skill, index) => (
                <Badge
                  key={skill}
                  className="bg-portfolio-purple hover:bg-portfolio-purple/90 text-white transform transition-all duration-300 hover:scale-110 text-xs sm:text-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className={`glass-card p-6 sm:p-8 rounded-lg overflow-hidden transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative aspect-square rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105">
              <img 
                src="/assets/maheshwari's.png" 
                alt="Maheshwari KM - Angular Developer" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default About;
