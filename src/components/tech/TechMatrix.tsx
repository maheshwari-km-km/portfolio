
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Tech stack data with enhanced properties
const techStack = [
  { name: 'React', color: '#61DAFB', icon: '⚛️', category: 'Frontend' },
  { name: 'Angular', color: '#DD0031', icon: '🅰️', category: 'Frontend' },
  { name: 'Vue', color: '#4FC08D', icon: '🔷', category: 'Frontend' },
  { name: 'TypeScript', color: '#3178C6', icon: '📘', category: 'Language' },
  { name: 'JavaScript', color: '#F7DF1E', icon: '📜', category: 'Language' },
  { name: 'Node.js', color: '#339933', icon: '🟢', category: 'Backend' },
  { name: 'Express', color: '#000000', icon: '🚀', category: 'Backend' },
  { name: 'MongoDB', color: '#47A248', icon: '🍃', category: 'Database' },
  { name: 'PostgreSQL', color: '#336791', icon: '🐘', category: 'Database' },
  // { name: 'Python', color: '#3776AB', icon: '🐍', category: 'Language' },
  { name: 'Docker', color: '#2496ED', icon: '🐳', category: 'DevOps' },
  { name: 'AWS', color: '#FF9900', icon: '☁️', category: 'Cloud' },
  { name: 'Git', color: '#F05032', icon: '📚', category: 'Tools' },
  { name: 'Linux', color: '#FCC624', icon: '🐧', category: 'OS' },
  { name: 'GitHub', color: '#181717', icon: '🐙', category: 'Tools' },
];

const TechMatrix: React.FC<{ className?: string }> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Responsive sizing
    const size = isMobile ? 350 : 500;
    
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
    
    // Create tech nodes in a 3D matrix formation
    const techObjects: Array<{
      mesh: THREE.Mesh;
      tech: typeof techStack[0];
      originalPosition: THREE.Vector3;
      targetPosition: THREE.Vector3;
    }> = [];
    
    // Create connection lines
    const connectionLines: THREE.Line[] = [];
    
    // Matrix formation - arrange in a 3D grid
    const gridSize = Math.ceil(Math.cbrt(techStack.length));
    
    techStack.forEach((tech, index) => {
      // Calculate 3D grid position
      const x = (index % gridSize) - gridSize / 2;
      const y = Math.floor((index / gridSize) % gridSize) - gridSize / 2;
      const z = Math.floor(index / (gridSize * gridSize)) - gridSize / 2;
      
      // Create tech node geometry
      const geometry = new THREE.SphereGeometry(0.2, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: tech.color,
        transparent: true,
        opacity: 0.8,
        emissive: tech.color,
        emissiveIntensity: 0.2
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      const position = new THREE.Vector3(x * 1.5, y * 1.5, z * 1.5);
      mesh.position.copy(position);
      
      // Add glow ring around each node
      const ringGeometry = new THREE.RingGeometry(0.25, 0.35, 16);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: tech.color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(position);
      ring.lookAt(camera.position);
      
      scene.add(mesh);
      scene.add(ring);
      
      techObjects.push({
        mesh,
        tech,
        originalPosition: position.clone(),
        targetPosition: position.clone()
      });
    });
    
    // Create dynamic connections between related technologies
    const createConnections = () => {
      // Clear existing connections
      connectionLines.forEach(line => scene.remove(line));
      connectionLines.length = 0;
      
      techObjects.forEach((obj1, i) => {
        techObjects.forEach((obj2, j) => {
          if (i < j && obj1.tech.category === obj2.tech.category) {
            const points = [obj1.mesh.position, obj2.mesh.position];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
              color: obj1.tech.color,
              transparent: true,
              opacity: 0.3
            });
            const line = new THREE.Line(geometry, material);
            scene.add(line);
            connectionLines.push(line);
          }
        });
      });
    };
    
    createConnections();
    
    // Add central core
    const coreGeometry = new THREE.IcosahedronGeometry(0.5, 1);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.6,
      emissive: 0x8B5CF6,
      emissiveIntensity: 0.3
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.set(0, 0, isMobile ? 8 : 6);
    
    // Mouse tracking for interaction
    let mouseX = 0;
    let mouseY = 0;
    let autoRotate = true;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Rotate core
      core.rotation.x += 0.01;
      core.rotation.y += 0.01;
      
      // Auto-rotate camera when not interacting
      if (autoRotate) {
        camera.position.x = Math.sin(time * 0.3) * 6;
        camera.position.z = Math.cos(time * 0.3) * 6;
        camera.lookAt(0, 0, 0);
      }
      
      // Animate tech nodes with pulsing and floating
      techObjects.forEach((obj, index) => {
        const { mesh, tech } = obj;
        
        // Floating animation
        mesh.position.y = obj.originalPosition.y + Math.sin(time * 2 + index) * 0.2;
        
        // Pulsing effect for hovered tech
        if (hoveredTech === tech.name) {
          const scale = 1.5 + Math.sin(time * 8) * 0.2;
          mesh.scale.setScalar(scale);
          (mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.5;
        } else if (selectedCategory && tech.category === selectedCategory) {
          const scale = 1.2 + Math.sin(time * 4) * 0.1;
          mesh.scale.setScalar(scale);
          (mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.4;
        } else {
          mesh.scale.setScalar(1);
          (mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.2;
        }
        
        // Rotation based on mouse position
        mesh.rotation.x = time + mouseY * 0.1;
        mesh.rotation.y = time + mouseX * 0.1;
      });
      
      // Update connection lines
      connectionLines.forEach(line => {
        const material = line.material as THREE.LineBasicMaterial;
        material.opacity = 0.3 + Math.sin(time * 3) * 0.1;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Mouse interaction
    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / size) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / size) * 2 + 1;
      
      autoRotate = false;
      setTimeout(() => { autoRotate = true; }, 2000); // Resume auto-rotate after 2s
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
    
    // Touch events for mobile
    const onTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length !== 1) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = ((e.touches[0].clientX - rect.left) / size) * 2 - 1;
      mouseY = -((e.touches[0].clientY - rect.top) / size) * 2 + 1;
      
      autoRotate = false;
      setTimeout(() => { autoRotate = true; }, 3000);
    };
    
    // Event listeners
    containerRef.current.addEventListener('mousemove', onMouseMove);
    containerRef.current.addEventListener('mousemove', onMouseHover);
    containerRef.current.addEventListener('touchmove', onTouchMove);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const newSize = window.innerWidth < 768 ? 350 : 500;
      renderer.setSize(newSize, newSize);
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', onMouseMove);
        containerRef.current.removeEventListener('mousemove', onMouseHover);
        containerRef.current.removeEventListener('touchmove', onTouchMove);
        if (containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      window.removeEventListener('resize', handleResize);
      document.body.style.cursor = 'default';
    };
  }, [hoveredTech, selectedCategory, isMobile]);
  
  // Get unique categories
  const categories = [...new Set(techStack.map(tech => tech.category))];
  
  return (
    <div className={`relative ${className}`}>
      {/* <div 
        ref={containerRef} 
        className={`mx-auto rounded-xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 shadow-2xl ${
          isMobile ? 'w-[350px] h-[350px]' : 'w-[500px] h-[500px]'
        }`}
      /> */}
      
      {/* Tech info overlay */}
      {hoveredTech && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 z-10">
          <p className="text-sm font-medium">{hoveredTech}</p>
          <p className="text-xs text-gray-300">
            {techStack.find(t => t.name === hoveredTech)?.category}
          </p>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs text-center">
        {/* {isMobile ? 'Touch to explore the tech matrix' : 'Move mouse to explore • Hover for details'} */}
      </div>
      
      {/* Category filters */}
      <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
            !selectedCategory 
              ? 'bg-portfolio-purple text-white' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
            className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
              selectedCategory === category 
                ? 'bg-portfolio-purple text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Tech stack grid - responsive */}
      <div className={`mt-6 gap-2 max-w-3xl mx-auto ${
        isMobile ? 'grid grid-cols-2' : 'grid grid-cols-3 md:grid-cols-5'
      }`}>
        {techStack.map((tech) => (
          <div 
            key={tech.name}
            className={`flex flex-col items-center p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
              hoveredTech === tech.name 
                ? 'bg-white/20 border-white/40 scale-105' 
                : selectedCategory === tech.category
                ? 'bg-white/15 border-white/30'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
          >
            <span className={`mb-1 ${isMobile ? 'text-lg' : 'text-xl'}`}>{tech.icon}</span>
            <span 
              className={`font-medium text-center ${isMobile ? 'text-xs' : 'text-xs'}`}
              style={{ color: tech.color }}
            >
              {tech.name}
            </span>
            <span className="text-xs text-gray-400 text-center mt-1">
              {tech.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMatrix;
