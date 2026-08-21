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
      {/* Central Icosahedron Geometry in Obsidian Metallic */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#08090C"
          roughness={0.15}
          metalness={0.9}
          emissive="#B8FF2C"
          emissiveIntensity={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Emissive Wireframe Overlay in Acid Lime */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.62, 1]} />
        <meshBasicMaterial
          color="#B8FF2C"
          wireframe={true}
          transparent={true}
          opacity={0.65}
        />
      </mesh>

      {/* Orbiting Precision Ring in Hyper Cobalt */}
      <mesh ref={outerRingRef} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#4D5CFF"
          emissive="#4D5CFF"
          emissiveIntensity={1.0}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}
