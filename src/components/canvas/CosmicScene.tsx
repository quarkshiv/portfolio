'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Starfield - 6000 stars in a deep dark sky
function Starfield() {
  const ref = useRef<THREE.Points>(null!);
  const count = 6000;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      // Vary sizes: most are tiny, a few are brighter
      siz[i] = Math.random() < 0.05 ? 0.12 + Math.random() * 0.08 : 0.04 + Math.random() * 0.04;
    }
    return [pos, siz];
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.012;
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
      const mouse = state.pointer;
      ref.current.rotation.x += mouse.y * 0.03;
      ref.current.rotation.y += mouse.x * 0.03;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        color="#b8c8e8"
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

// Deep space nebula — very subtle dark tinted clouds
function DeepNebula({
  position,
  color,
  scale,
  speed = 0.06,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.08;
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.06;
      // Subtle breathing scale
      const breathe = 1 + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.02;
      ref.current.scale.setScalar(scale * breathe);
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.015} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Distant planet/moon — a small dark sphere with rim lighting
function DarkPlanet({
  position,
  radius,
  color,
  rimColor,
  orbitSpeed = 0.02,
}: {
  position: [number, number, number];
  radius: number;
  color: string;
  rimColor: string;
  orbitSpeed?: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * orbitSpeed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.9}
            metalness={0.1}
            emissive={rimColor}
            emissiveIntensity={0.05}
          />
        </mesh>
        {/* Thin atmosphere ring glow */}
        <mesh scale={1.08}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial
            color={rimColor}
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  );
}

// Orbital ring of dim particles around a planet
function OrbitalRing({
  center,
  ringRadius,
  color,
  particleCount = 80,
  speed = 0.3,
}: {
  center: [number, number, number];
  ringRadius: number;
  color: string;
  particleCount?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Points>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.15;
      pos[i * 3] = Math.cos(angle) * (ringRadius + jitter);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
      pos[i * 3 + 2] = Math.sin(angle) * (ringRadius + jitter);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [particleCount, ringRadius]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group position={center} rotation={[0.4, 0, 0.15]}>
      <points ref={ref} geometry={geometry}>
        <pointsMaterial
          size={0.03}
          color={color}
          sizeAttenuation
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// Dim twinkling accent particles
function AccentParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 120;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const posArray = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.7) * 0.0005;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#2a4a7f"
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      {/* True black background */}
      <color attach="background" args={['#000004']} />

      {/* Very dim ambient — keeps things dark */}
      <ambientLight intensity={0.04} />

      {/* Single directional light from the side — cinematic rim lighting */}
      <directionalLight position={[10, 5, -8]} intensity={0.15} color="#4466aa" />
      <directionalLight position={[-6, -3, 5]} intensity={0.06} color="#1a1a3a" />

      <Starfield />
      <AccentParticles />

      {/* Dark nebula clouds — very subtle color washes */}
      <DeepNebula position={[-10, 4, -20]} color="#0a0a2e" scale={7} speed={0.04} />
      <DeepNebula position={[12, -6, -25]} color="#0d0020" scale={9} speed={0.03} />
      <DeepNebula position={[0, 10, -30]} color="#080818" scale={10} speed={0.02} />
      <DeepNebula position={[-7, -10, -22]} color="#05051a" scale={8} speed={0.05} />
      {/* A hint of deep blue-violet far in the distance */}
      <DeepNebula position={[5, 0, -35]} color="#120828" scale={14} speed={0.015} />

      {/* Dark planets — barely visible, moody silhouettes */}
      <DarkPlanet
        position={[-14, 6, -18]}
        radius={1.2}
        color="#080812"
        rimColor="#1a2a55"
        orbitSpeed={0.008}
      />
      <DarkPlanet
        position={[16, -8, -22]}
        radius={0.8}
        color="#060610"
        rimColor="#2a1a44"
        orbitSpeed={0.012}
      />
      <DarkPlanet
        position={[8, 12, -28]}
        radius={1.6}
        color="#0a0a14"
        rimColor="#0c2244"
        orbitSpeed={0.005}
      />
      {/* Small nearby moon */}
      <DarkPlanet
        position={[-6, -4, -10]}
        radius={0.3}
        color="#0c0c18"
        rimColor="#1a3366"
        orbitSpeed={0.025}
      />

      {/* Orbital ring around the largest planet */}
      <OrbitalRing
        center={[8, 12, -28]}
        ringRadius={2.8}
        color="#1a2a55"
        particleCount={100}
        speed={0.15}
      />

      {/* Subtle bloom for cinematic glow */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.95}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function CosmicScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
