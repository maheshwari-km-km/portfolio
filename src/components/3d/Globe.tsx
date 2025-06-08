
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const Globe: React.FC<{ className?: string }> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(300, 300);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create globe geometry
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Create wireframe material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    
    // Create solid globe with gradient texture
    const loader = new THREE.TextureLoader();
    const globeTexture = loader.load('https://i.imgur.com/8eEGw5h.jpg');
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: globeTexture,
      transparent: true,
      opacity: 0.8
    });
    
    // Create meshes
    const sphere = new THREE.Mesh(sphereGeometry, globeMaterial);
    const wireframe = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    wireframe.scale.multiplyScalar(1.05);
    
    // Add meshes to scene
    scene.add(sphere);
    scene.add(wireframe);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = 2.5;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      sphere.rotation.y += 0.005;
      wireframe.rotation.y += 0.003;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Add hover interactivity
    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / 300) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / 300) * 2 + 1;
      
      gsap.to(sphere.rotation, {
        x: mouseY * 0.2,
        z: mouseX * 0.2,
        duration: 1,
        ease: "power2.out"
      });
      
      gsap.to(wireframe.rotation, {
        x: mouseY * 0.25,
        z: mouseX * 0.25,
        duration: 1,
        ease: "power2.out"
      });
    };
    
    containerRef.current.addEventListener('mousemove', onMouseMove);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      renderer.setSize(300, 300);
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', onMouseMove);
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`w-[300px] h-[300px] ${className}`}
    />
  );
};

export default Globe;
