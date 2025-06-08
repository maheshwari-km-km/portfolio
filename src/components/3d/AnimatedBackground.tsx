
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 100 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    return Array(count).fill(0).map(() => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 2;
      
      return {
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ] as [number, number, number],
        scale: 0.05 + Math.random() * 0.05,
        speed: 0.01 + Math.random() * 0.02,
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5)
      };
    });
  }, [count]);
  
  // Animate particles
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      
      // Animate each particle child
      groupRef.current.children.forEach((particle, i) => {
        if (i < particles.length) {
          const time = state.clock.getElapsedTime();
          particle.position.y += Math.sin(time + i * 0.1) * 0.002;
          particle.position.x += Math.cos(time + i * 0.1) * 0.002;
          
          // Pulse effect
          const pulseScale = Math.sin(time * 2 + i) * 0.1 + 1;
          particle.scale.set(
            particles[i].scale * pulseScale,
            particles[i].scale * pulseScale,
            particles[i].scale * pulseScale
          );
        }
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.scale, 16, 16]} />
          <meshStandardMaterial 
            color={particle.color} 
            transparent 
            opacity={0.7}
            emissive={particle.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

const ShootingStars = ({ count = 20 }) => {
  const stars = useMemo(() => 
    Array.from({ length: count }).map(() => ({
      position: [
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      ] as [number, number, number],
      speed: 0.1 + Math.random() * 0.2
    })),
  [count]);

  return (
    <group>
      {stars.map((star, i) => (
        <Trail
          key={i}
          width={0.1}
          length={8}
          color={new THREE.Color(0.4, 0.6, 1)}
          attenuation={(t) => t * t}
        >
          <mesh position={star.position}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </Trail>
      ))}
    </group>
  );
};

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.4;
      
      // Add breathing effect
      const scale = 1 + Math.sin(time * 0.5) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#0EA5E9" 
          roughness={0.1} 
          metalness={0.5} 
          wireframe 
          emissive="#0EA5E9"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0EA5E9" />
      <AnimatedSphere />
      <ParticleField count={150} />
      <ShootingStars count={15} />
      <Sparkles count={300} scale={12} size={1} speed={0.3} color="#8B5CF6" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate
        autoRotateSpeed={0.5} 
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 z-0 opacity-70 ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
