import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

const CoreMesh = ({ primaryColor, accentColor, themeId }) => {
  const meshRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.8;
      ringRef1.current.rotation.z += delta * 0.5;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y += delta * 0.7;
      ringRef2.current.rotation.x -= delta * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      {/* Central Distorted Energy Core */}
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color={primaryColor}
          emissive={accentColor}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.45}
          speed={2.5}
          wireframe={themeId === 6 || themeId === 2} // Wireframe for 8-bit & Cyber Spidey!
        />
      </Sphere>

      {/* Orbiting Quantum Rings */}
      <Torus ref={ringRef1} args={[1.7, 0.03, 16, 100]}>
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={1.2}
          wireframe={false}
        />
      </Torus>

      <Torus ref={ringRef2} args={[2.0, 0.02, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive={accentColor}
          emissiveIntensity={0.8}
        />
      </Torus>
    </Float>
  );
};

export const ThreeHeroVisual = () => {
  const { currentTheme, themeId } = useTheme();

  return (
    <div className="relative w-full h-[280px] sm:h-[340px] flex items-center justify-center my-2 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={currentTheme.accent} />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color={currentTheme.primary} />
        
        <CoreMesh
          primaryColor={currentTheme.primary}
          accentColor={currentTheme.accent}
          themeId={themeId}
        />
      </Canvas>

      {/* Ambient Radial Backlight Glow */}
      <div
        className="absolute inset-0 m-auto w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-colors duration-700"
        style={{
          backgroundColor: currentTheme.glowColor,
          opacity: 0.6
        }}
      />
    </div>
  );
};
