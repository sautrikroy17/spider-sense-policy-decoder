import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural skyscraper data generator (Manhattan grid layout)
function generateCityData() {
  const buildings = [];
  const gridSize = 7;
  const spacing = 14;

  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {
      // Leave a central avenue for open camera view
      if (Math.abs(x) <= 1 && z > -3 && z < 6) continue;

      const posX = x * spacing + (Math.random() - 0.5) * 4;
      const posZ = z * spacing - 10 + (Math.random() - 0.5) * 4;
      const distFromCenter = Math.hypot(posX, posZ);

      // Skyscraper height profile (taller in midtown, tapering out)
      const height = Math.max(16, 68 - distFromCenter * 0.45 + (Math.random() - 0.5) * 18);
      const width = 6 + Math.random() * 5;
      const depth = 6 + Math.random() * 5;

      // Building accent color
      const colorRand = Math.random();
      const accentColor = colorRand > 0.65 ? '#ef4444' : colorRand > 0.35 ? '#38bdf8' : '#fbbf24';

      buildings.push({
        id: `${x}_${z}`,
        position: [posX, height / 2 - 20, posZ],
        size: [width, height, depth],
        accentColor,
        hasAntenna: Math.random() > 0.4,
        antennaHeight: 6 + Math.random() * 8
      });
    }
  }
  return buildings;
}

// Skyscraper Block Component with Lit Windows & Rooftop Details
const Building = React.memo(({ position, size, accentColor, hasAntenna, antennaHeight }) => {
  const [width, height, depth] = size;

  return (
    <group position={position}>
      {/* Skyscraper Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#0a0b12"
          roughness={0.8}
          metalness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Illuminated Cyber Grid Facade (Window Emissive Accents) */}
      <mesh position={[0, 0, depth / 2 + 0.05]}>
        <planeGeometry args={[width * 0.9, height * 0.9]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
      <mesh position={[0, 0, -depth / 2 - 0.05]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width * 0.9, height * 0.9]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
      <mesh position={[width / 2 + 0.05, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[depth * 0.9, height * 0.9]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
      <mesh position={[-width / 2 - 0.05, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[depth * 0.9, height * 0.9]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Rooftop Trim & Glowing Beacons */}
      <mesh position={[0, height / 2 + 0.3, 0]}>
        <boxGeometry args={[width * 0.92, 0.6, depth * 0.92]} />
        <meshStandardMaterial color="#1a1c29" roughness={0.5} />
      </mesh>

      {/* Spire Antenna with Red Aviation Beacon */}
      {hasAntenna && (
        <group position={[0, height / 2 + antennaHeight / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.25, antennaHeight, 6]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
          {/* Top Red Beacon Light */}
          <mesh position={[0, antennaHeight / 2 + 0.3, 0]}>
            <sphereGeometry args={[0.35, 8, 8]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      )}
    </group>
  );
});

// Dynamic Web Strands spanning between skyscrapers
const SpideyWebs = () => {
  const linePoints = useMemo(() => {
    const pts = [];
    const webSpans = [
      [[-18, 28, 5], [14, 24, -2]],
      [[14, 24, -2], [-8, 35, -20]],
      [[-8, 35, -20], [22, 30, -15]],
      [[-25, 20, 15], [-5, 28, 8]],
      [[25, 22, 10], [5, 27, 2]]
    ];

    webSpans.forEach(([p1, p2]) => {
      // Create a gentle catenary drop curve for realistic silk tension
      const segments = 16;
      for (let i = 0; i < segments; i++) {
        const t1 = i / segments;
        const t2 = (i + 1) / segments;

        const x1 = p1[0] + (p2[0] - p1[0]) * t1;
        const y1 = p1[1] + (p2[1] - p1[1]) * t1 - Math.sin(t1 * Math.PI) * 3;
        const z1 = p1[2] + (p2[2] - p1[2]) * t1;

        const x2 = p1[0] + (p2[0] - p1[0]) * t2;
        const y2 = p1[1] + (p2[1] - p1[1]) * t2 - Math.sin(t2 * Math.PI) * 3;
        const z2 = p1[2] + (p2[2] - p1[2]) * t2;

        pts.push(new THREE.Vector3(x1, y1, z1));
        pts.push(new THREE.Vector3(x2, y2, z2));
      }
    });

    return pts;
  }, []);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(linePoints);
    return geom;
  }, [linePoints]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#ffffff" opacity={0.55} transparent linewidth={1.5} />
    </lineSegments>
  );
};

// 3D Floating Embers & Dust Particles
const FloatingEmbers = ({ count = 120 }) => {
  const points = useMemo(() => {
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 80;
      pts[i * 3 + 1] = Math.random() * 50 - 5;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return pts;
  }, [count]);

  const pointsRef = useRef();

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += delta * 1.5;
        if (positions[i] > 45) {
          positions[i] = -5;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.65}
        color="#ef4444"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Interactive 3D Camera Rig Reacting to Mouse & Window Scroll
const CameraRig = ({ mousePos, scrollProgress }) => {
  useFrame(({ camera, clock }) => {
    const time = clock.getElapsedTime();

    // Mouse parallax target
    const targetX = mousePos.x * 10;
    const targetY = 18 - scrollProgress * 24 + mousePos.y * 6 + Math.sin(time * 0.4) * 0.8;
    const targetZ = 38 - scrollProgress * 15;

    // Smooth spring lerping
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.045);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.045);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.045);

    // Look slightly downward into city avenues when high, look upward at skyscrapers when diving down
    const lookTargetY = 8 - scrollProgress * 12;
    camera.lookAt(targetX * 0.25, lookTargetY, -15);
  });

  return null;
};

// Main 3D New York City Canvas Component
export const SpideyCity3D = () => {
  const buildings = useMemo(() => generateCityData(), []);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-85">
      <Canvas
        camera={{ position: [0, 18, 38], fov: 60, near: 0.5, far: 140 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        {/* Night Manhattan Sky Fog for seamless background blending */}
        <fog attach="fog" args={['#050508', 25, 115]} />

        {/* Ambient & Atmospheric Night Sky Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[20, 45, 20]} intensity={1.2} color="#93c5fd" />
        <pointLight position={[0, 30, -5]} intensity={2.5} distance={80} color="#ef4444" />
        <pointLight position={[-15, 15, 10]} intensity={2.0} distance={60} color="#38bdf8" />

        {/* Dynamic Interactive Camera Rig */}
        <CameraRig mousePos={mousePos} scrollProgress={scrollProgress} />

        {/* 3D Skyscraper City Blocks */}
        <group>
          {buildings.map((b) => (
            <Building key={b.id} {...b} />
          ))}
        </group>

        {/* 3D Spider-Webs Spanning Rooftops */}
        <SpideyWebs />

        {/* Floating 3D Embers & Spidey Dust */}
        <FloatingEmbers count={100} />
      </Canvas>
    </div>
  );
};
