
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface AnimatedCubeProps {
  className?: string;
  color?: string;
  wireframe?: boolean;
  size?: number;
}

const AnimatedCube: React.FC<AnimatedCubeProps> = ({ 
  className, 
  color = "#8B5CF6", 
  wireframe = false,
  size = 200
}) => {
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
    
    renderer.setSize(size, size);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create cube geometry
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    
    // Create material
    const material = new THREE.MeshPhongMaterial({
      color: color,
      wireframe: wireframe,
      transparent: true,
      opacity: wireframe ? 0.8 : 1,
      shininess: 100
    });
    
    // Create cube mesh
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = 3;
    
    // Auto rotation animation
    gsap.to(cube.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 10,
      ease: "none",
      repeat: -1
    });
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Add hover interactivity
    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / size) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / size) * 2 + 1;
      
      // Override auto-rotation temporarily
      gsap.to(cube.rotation, {
        x: mouseY * 2 + cube.rotation.x,
        y: mouseX * 2 + cube.rotation.y,
        duration: 1,
        overwrite: "auto"
      });
    };
    
    const onMouseLeave = () => {
      // Resume auto-rotation
      gsap.to(cube.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 10,
        ease: "none",
        repeat: -1
      });
    };
    
    containerRef.current.addEventListener('mousemove', onMouseMove);
    containerRef.current.addEventListener('mouseleave', onMouseLeave);
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', onMouseMove);
        containerRef.current.removeEventListener('mouseleave', onMouseLeave);
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [color, wireframe, size]);
  
  return (
    <div 
      ref={containerRef}
      className={`w-[${size}px] h-[${size}px] ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default AnimatedCube;
