import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatBot } from '@/components/chatbot/ChatBotProvider';

interface NavLink {
  name: string;
  path: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', path: '#home' },
  { name: 'About', path: '#about' },
  { name: 'Experience', path: '#experience' },
  { name: 'Skills', path: '#skills' },
  { name: 'Projects', path: '#projects' },
  { name: 'Contact', path: '#contact' },
];

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { openChatBot } = useChatBot();
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId.replace('#', ''));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine which section is currently in view
      const sections = navLinks.map(link => link.path.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-[#14203a] via-black to-[#14203a] shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} className="text-2xl font-bold text-portfolio-purple transition-colors duration-300 hover:text-portfolio-purple/80">
              Portfolio
            </a> */}
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.path); }}
                className={`transition-all duration-300 font-medium ${
                  activeSection === link.path.replace('#', '') 
                    ? 'text-portfolio-purple' 
                    : 'text-gray-700 hover:text-portfolio-purple'
                }`}
              >
                {link.name}
              </a>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 bg-portfolio-purple text-white hover:bg-portfolio-purple/90 transition-transform duration-300 hover:scale-105"
              onClick={() => openChatBot()}
            >
              <MessageCircle size={16} />
              <span className="hidden sm:inline">Chat with Me</span>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="pt-2 pb-4 space-y-1 bg-white">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.path); }}
                className={`block px-4 py-3 text-base font-medium ${
                  activeSection === link.path.replace('#', '') 
                    ? 'text-portfolio-purple' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </a>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mx-4 flex items-center justify-center gap-2 bg-portfolio-purple text-white hover:bg-portfolio-purple/90"
              onClick={() => {
                openChatBot();
                setIsMenuOpen(false);
              }}
            >
              <MessageCircle size={16} />
              <span>Chat with Me</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
