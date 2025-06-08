
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Tech stack data with logos and colors
const techStack = [
  { name: 'React', color: '#61DAFB', icon: '⚛️' },
  { name: 'Angular', color: '#DD0031', icon: '🅰️' },
  { name: 'Vue', color: '#4FC08D', icon: '🔷' },
  { name: 'TypeScript', color: '#3178C6', icon: '📘' },
  { name: 'JavaScript', color: '#F7DF1E', icon: '📜' },
  { name: 'Node.js', color: '#339933', icon: '🟢' },
  { name: 'Express', color: '#000000', icon: '🚀' },
  { name: 'MongoDB', color: '#47A248', icon: '🍃' },
  { name: 'PostgreSQL', color: '#336791', icon: '🐘' },
  // { name: 'Python', color: '#3776AB', icon: '🐍' },
  { name: 'Docker', color: '#2496ED', icon: '🐳' },
  { name: 'AWS', color: '#FF9900', icon: '☁️' },
  { name: 'Git', color: '#F05032', icon: '📚' },
  { name: 'Linux', color: '#FCC624', icon: '🐧' },
  { name: 'GitHub', color: '#181717', icon: '🐙' },
];

const TechGlobe: React.FC<{ className?: string }> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Responsive sizing
    const size = isMobile ? 320 : 400;
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create main globe
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    
    const globe = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    scene.add(globe);
    
    // Create rotating ring geometry
    const ringGeometry = new THREE.RingGeometry(2.8, 3.0, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2; // Make ring horizontal
    scene.add(ring);
    
    // Create canvas for tech logos
    const createTechTexture = (tech: typeof techStack[0]) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 96;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Background
        context.fillStyle = tech.color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Icon
        context.font = '32px Arial';
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillText(tech.icon, canvas.width / 2, 40);
        
        // Tech name
        context.font = 'bold 12px Arial';
        context.fillStyle = 'white';
        context.fillText(tech.name, canvas.width / 2, 70);
      }
      
      return new THREE.CanvasTexture(canvas);
    };
    
    // Create tech rectangles on the ring
    const techObjects: Array<{
      mesh: THREE.Mesh;
      tech: typeof techStack[0];
      angle: number;
    }> = [];
    
    techStack.forEach((tech, index) => {
      // Create rectangle geometry
      const rectGeometry = new THREE.PlaneGeometry(0.6, 0.45);
      const texture = createTechTexture(tech);
      const rectMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
      });
      
      const rectMesh = new THREE.Mesh(rectGeometry, rectMaterial);
      
      // Position rectangles on the ring
      const angle = (index / techStack.length) * Math.PI * 2;
      const radius = 2.9; // Position on the ring
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0; // Keep on the same horizontal plane as the ring
      
      rectMesh.position.set(x, y, z);
      rectMesh.lookAt(0, 0, 0); // Face the center
      
      scene.add(rectMesh);
      techObjects.push({
        mesh: rectMesh,
        tech,
        angle
      });
    });
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = isMobile ? 6 : 5;
    
    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Rotate globe when not dragging
      if (!isDragging) {
        globe.rotation.y += 0.005;
        globe.rotation.x = Math.sin(time * 0.3) * 0.1;
      }
      
      // Rotate the ring continuously
      ring.rotation.z += 0.01;
      
      // Animate tech rectangles - rotate around the globe in a ring
      techObjects.forEach((obj, index) => {
        const { mesh, tech } = obj;
        
        // Continuous rotation on the ring
        const currentAngle = obj.angle + time * 0.5; // Rotation speed
        const radius = 2.9;
        
        const x = Math.cos(currentAngle) * radius;
        const z = Math.sin(currentAngle) * radius;
        const y = Math.sin(time + index) * 0.1; // Slight vertical floating
        
        mesh.position.set(x, y, z);
        mesh.lookAt(0, y, 0); // Always face center
        
        // Pulsing effect for hovered tech
        if (hoveredTech === tech.name) {
          const scale = 1.2 + Math.sin(time * 8) * 0.1;
          mesh.scale.setScalar(scale);
        } else {
          mesh.scale.setScalar(1);
        }
      });
      
      // Camera subtle movement
      camera.position.x = mouseX * 0.3;
      camera.position.y = mouseY * 0.3;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Mouse interaction for dragging
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / size) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / size) * 2 + 1;
      
      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y
        };
        
        globe.rotation.y += deltaMove.x * 0.01;
        globe.rotation.x += deltaMove.y * 0.01;
        
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };
    
    const onMouseUp = () => {
      isDragging = false;
    };
    
    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    
    const onTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length !== 1) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = ((e.touches[0].clientX - rect.left) / size) * 2 - 1;
      mouseY = -((e.touches[0].clientY - rect.top) / size) * 2 + 1;
      
      if (isDragging) {
        const deltaMove = {
          x: e.touches[0].clientX - previousMousePosition.x,
          y: e.touches[0].clientY - previousMousePosition.y
        };
        
        globe.rotation.y += deltaMove.x * 0.01;
        globe.rotation.x += deltaMove.y * 0.01;
        
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    
    const onTouchEnd = () => {
      isDragging = false;
    };
    
    // Raycaster for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const onMouseHover = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / size) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / size) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const allMeshes = techObjects.map(obj => obj.mesh);
      const intersects = raycaster.intersectObjects(allMeshes);
      
      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const techObj = techObjects.find(obj => obj.mesh === intersectedObject);
        if (techObj) {
          setHoveredTech(techObj.tech.name);
          document.body.style.cursor = 'pointer';
        }
      } else {
        setHoveredTech(null);
        document.body.style.cursor = 'default';
      }
    };
    
    // Event listeners
    containerRef.current.addEventListener('mousedown', onMouseDown);
    containerRef.current.addEventListener('mousemove', onMouseMove);
    containerRef.current.addEventListener('mousemove', onMouseHover);
    containerRef.current.addEventListener('mouseup', onMouseUp);
    containerRef.current.addEventListener('touchstart', onTouchStart);
    containerRef.current.addEventListener('touchmove', onTouchMove);
    containerRef.current.addEventListener('touchend', onTouchEnd);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const newSize = window.innerWidth < 768 ? 320 : 400;
      renderer.setSize(newSize, newSize);
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', onMouseDown);
        containerRef.current.removeEventListener('mousemove', onMouseMove);
        containerRef.current.removeEventListener('mousemove', onMouseHover);
        containerRef.current.removeEventListener('mouseup', onMouseUp);
        containerRef.current.removeEventListener('touchstart', onTouchStart);
        containerRef.current.removeEventListener('touchmove', onTouchMove);
        containerRef.current.removeEventListener('touchend', onTouchEnd);
        if (containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      window.removeEventListener('resize', handleResize);
      document.body.style.cursor = 'default';
    };
  }, [hoveredTech, isMobile]);
  
  return (
    <div className={`relative ${className}`}>
      <div 
        ref={containerRef} 
        className={`mx-auto rounded-full bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 shadow-2xl cursor-grab active:cursor-grabbing ${
          isMobile ? 'w-[320px] h-[320px]' : 'w-[400px] h-[400px]'
        }`}
      />
      
      {/* Tech info overlay */}
      {hoveredTech && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 z-10">
          <p className="text-sm font-medium">{hoveredTech}</p>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs text-center">
        {isMobile ? 'Touch to explore' : 'Drag to explore • Hover for details'}
      </div>
      
      {/* Tech stack legend - responsive grid */}
      <div className={`mt-6 gap-3 max-w-2xl mx-auto ${
        isMobile ? 'grid grid-cols-2' : 'grid grid-cols-3 md:grid-cols-5'
      }`}>
        {techStack.map((tech) => (
          <div 
            key={tech.name}
            className={`flex flex-col items-center p-2 rounded-lg border transition-all duration-300 ${
              hoveredTech === tech.name 
                ? 'bg-white/10 border-white/30 scale-105' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <span className={`mb-1 ${isMobile ? 'text-xl' : 'text-2xl'}`}>{tech.icon}</span>
            <span 
              className={`font-medium text-center ${isMobile ? 'text-xs' : 'text-xs'}`}
              style={{ color: tech.color }}
            >
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechGlobe;
