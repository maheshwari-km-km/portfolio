
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, OrbitControls, Float, Center } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Tech stack data with categories
const techStackData = [
  {
    category: 'Frontend',
    technologies: [
      { name: 'React', color: '#61DAFB', position: [-4, 2, 0] },
      { name: 'Angular', color: '#DD0031', position: [-2, 2, 0] },
      { name: 'Vue', color: '#4FC08D', position: [0, 2, 0] },
      { name: 'TypeScript', color: '#3178C6', position: [2, 2, 0] },
      { name: 'JavaScript', color: '#F7DF1E', position: [4, 2, 0] }
    ]
  },
  {
    category: 'Backend',
    technologies: [
      { name: 'Node.js', color: '#339933', position: [-4, 0, 0] },
      { name: 'Express', color: '#000000', position: [-2, 0, 0] },
      { name: 'MongoDB', color: '#47A248', position: [0, 0, 0] },
      { name: 'PostgreSQL', color: '#336791', position: [2, 0, 0] },
      // { name: 'Python', color: '#3776AB', position: [4, 0, 0] }
    ]
  },
  {
    category: 'DevOps',
    technologies: [
      { name: 'Docker', color: '#2496ED', position: [-4, -2, 0] },
      { name: 'AWS', color: '#FF9900', position: [-2, -2, 0] },
      { name: 'Git', color: '#F05032', position: [0, -2, 0] },
      { name: 'Linux', color: '#FCC624', position: [2, -2, 0] },
      { name: 'Nginx', color: '#009639', position: [4, -2, 0] }
    ]
  }
];

// Tech Logo Component with advanced animations
const TechLogo = ({ tech, index }: { tech: any; index: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Floating animation
      meshRef.current.position.y = tech.position[1] + Math.sin(time + index) * 0.1;
      
      // Subtle rotation
      meshRef.current.rotation.y = Math.sin(time * 0.5 + index) * 0.1;
      
      // Pulsing effect when hovered
      if (hovered) {
        const scale = 1 + Math.sin(time * 5) * 0.05;
        meshRef.current.scale.setScalar(scale);
      }
    }
  });
  
  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: hovered ? 1.2 : 1,
        y: hovered ? 1.2 : 1,
        z: hovered ? 1.2 : 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
      
      gsap.to(meshRef.current.rotation, {
        z: hovered ? Math.PI * 0.1 : 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    }
  }, [hovered]);
  
  useEffect(() => {
    if (meshRef.current && clicked) {
      // Explosion effect on click
      gsap.to(meshRef.current.position, {
        x: tech.position[0] + (Math.random() - 0.5) * 2,
        z: tech.position[2] + (Math.random() - 0.5) * 2,
        duration: 0.5,
        ease: "back.out(1.7)",
        onComplete: () => {
          if (meshRef.current) {
            gsap.to(meshRef.current.position, {
              x: tech.position[0],
              z: tech.position[2],
              duration: 1,
              ease: "elastic.out(1, 0.3)"
            });
          }
        }
      });
      setClicked(false);
    }
  }, [clicked, tech.position]);
  
  return (
    <group>
      <Float speed={1 + index * 0.2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group
          ref={meshRef}
          position={tech.position}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setClicked(true)}
        >
          <Center>
            <Text3D
              font="/fonts/inter_regular.json"
              size={0.3}
              height={0.1}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.01}
              bevelSize={0.01}
              bevelOffset={0}
              bevelSegments={5}
            >
              {tech.name}
              <meshStandardMaterial
                color={tech.color}
                metalness={0.6}
                roughness={0.2}
                emissive={tech.color}
                emissiveIntensity={hovered ? 0.3 : 0.1}
              />
            </Text3D>
          </Center>
          
          {/* Glow effect */}
          {hovered && (
            <pointLight
              position={[0, 0, 0.5]}
              color={tech.color}
              intensity={2}
              distance={5}
              decay={2}
            />
          )}
        </group>
      </Float>
      
      {/* Particle system for each tech */}
      <ParticleSystem position={tech.position} color={tech.color} active={hovered} />
    </group>
  );
};

// Particle system for enhanced visual effects
const ParticleSystem = ({ position, color, active }: { position: number[]; color: string; active: boolean }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 50;
  
  const particles = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * 2;
      
      const colorObj = new THREE.Color(color);
      colors[i3] = colorObj.r;
      colors[i3 + 1] = colorObj.g;
      colors[i3 + 2] = colorObj.b;
    }
    
    return { positions, colors };
  }, [color]);
  
  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      particlesRef.current.rotation.y = time * 0.1;
      
      if (active) {
        particlesRef.current.scale.setScalar(1 + Math.sin(time * 5) * 0.1);
      } else {
        particlesRef.current.scale.setScalar(0.5);
      }
    }
  });
  
  return (
    <points ref={particlesRef} position={position as [number, number, number]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={active ? 0.8 : 0.3}
        sizeAttenuation
      />
    </points>
  );
};

// Category labels
const CategoryLabel = ({ category, position }: { category: string; position: number[] }) => {
  return (
    <Center position={[position[0], position[1] + 0.8, position[2]] as [number, number, number]}>
      <Text3D
        font="/fonts/inter_regular.json"
        size={0.4}
        height={0.05}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
      >
        {category}
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.3}
          roughness={0.4}
          emissive="#FFFFFF"
          emissiveIntensity={0.1}
        />
      </Text3D>
    </Center>
  );
};

// Main 3D Scene
const TechScene = () => {
  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#8B5CF6" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        color="#0EA5E9"
      />
      
      {/* Render all technologies */}
      {techStackData.map((category, categoryIndex) => (
        <group key={category.category}>
          <CategoryLabel 
            category={category.category} 
            position={[0, 2 - categoryIndex * 2, 0]} 
          />
          {category.technologies.map((tech, techIndex) => (
            <TechLogo
              key={tech.name}
              tech={tech}
              index={categoryIndex * 5 + techIndex}
            />
          ))}
        </group>
      ))}
      
      {/* Interactive Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={8}
        maxDistance={20}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
      />
    </>
  );
};

const ProfessionalTechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);
  
  return (
    <div ref={containerRef} className="w-full h-96 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-2xl border border-white/10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        dpr={[1, 2]}
        shadows
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <TechScene />
      </Canvas>
    </div>
  );
};

export default ProfessionalTechStack;
