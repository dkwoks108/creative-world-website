'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GrowthCoreMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.12;

      // Restrained pointer influence (±3–5 degrees max)
      const targetRotX = state.pointer.y * 0.08;
      const targetRotY = state.pointer.x * 0.08;
      meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.05;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.15;
      outerRingRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      {/* Central Icosahedron Geometry in Deep Ink */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#111111"
          roughness={0.25}
          metalness={0.7}
          emissive="#1769FF"
          emissiveIntensity={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Emissive Wireframe Overlay in Cyan */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.62, 1]} />
        <meshBasicMaterial
          color="#00CFFF"
          wireframe={true}
          transparent={true}
          opacity={0.4}
        />
      </mesh>

      {/* Orbiting Signal Ring in Magenta */}
      <mesh ref={outerRingRef} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#D900FF"
          emissive="#D900FF"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
