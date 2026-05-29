'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CosmicSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.LineSegments>(null!);
  
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 3), []);
  const wireGeometry = useMemo(() => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.02, 3)), []);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x += state.pointer.y * 0.1;
      meshRef.current.rotation.y += state.pointer.x * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.1;
      wireRef.current.rotation.y = t * 0.15;
      wireRef.current.rotation.x += state.pointer.y * 0.1;
      wireRef.current.rotation.y += state.pointer.x * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments ref={wireRef} geometry={wireGeometry}>
        <lineBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.3}
        />
      </lineSegments>
    </group>
  );
}
