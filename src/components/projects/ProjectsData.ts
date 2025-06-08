
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

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive admin dashboard for e-commerce businesses with analytics, inventory management, and order processing.',
    image: 'placeholder.svg',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    category: 'angular',
    technologies: ['Angular', 'NgRx', 'Angular Material', 'Chart.js', 'Firebase'],
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A feature-rich task management application with drag-and-drop functionality, filters, and real-time updates.',
    image: 'placeholder.svg',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    category: 'angular',
    technologies: ['Angular', 'RxJS', 'Tailwind CSS', 'Node.js', 'MongoDB'],
  },
  {
    id: 3,
    title: 'Weather Forecast',
    description: 'A responsive weather forecast application with location search, 5-day predictions, and interactive maps.',
    image: 'placeholder.svg',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    category: 'angular',
    technologies: ['Angular', 'TypeScript', 'OpenWeather API', 'Leaflet.js'],
  },
  {
    id: 4,
    title: 'Company Website',
    description: 'A modern company website with animations, responsive design, and content management system integration.',
    image: 'placeholder.svg',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    category: 'frontend',
    technologies: ['HTML', 'SCSS', 'JavaScript', 'Gsap', 'WordPress'],
  },
  {
    id: 5,
    title: 'RESTful API Service',
    description: 'A complete backend service with authentication, rate limiting, and comprehensive documentation.',
    image: 'placeholder.svg',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    category: 'backend',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
  },
  {
    id: 6,
    title: 'Real-time Chat Application',
    description: 'An instant messaging platform with user authentication, private chats, and group conversations.',
    image: 'placeholder.svg',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    category: 'fullstack',
    technologies: ['Angular', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
  },
];

export const categoryMap: { [key: string]: string } = {
  'all': 'All Projects',
  'angular': 'Angular',
  'frontend': 'Frontend',
  'backend': 'Backend',
  'fullstack': 'Full Stack',
};
