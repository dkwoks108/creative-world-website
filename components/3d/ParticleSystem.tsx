'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
}

export function ParticleSystem({ count = 600 }: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random particle positions and velocities
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const speed = 0.1 + Math.random() * 0.3;
      temp.push({ x, y, z, radius, theta, phi, speed });
    }
    return temp;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      const scale = 0.02 + Math.random() * 0.03;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [particles, dummy]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.05;
    meshRef.current.rotation.x = time * 0.02;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00CFFF" transparent opacity={0.55} />
    </instancedMesh>
  );
}
