'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GrowthCoreMesh } from './GrowthCoreMesh';
import { SignalStreams } from './SignalStreams';
import { ParticleSystem } from './ParticleSystem';

function SceneContent({ particleCount }: { particleCount: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Smooth camera parallax based on pointer coordinates
  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * 0.4 - groupRef.current.rotation.y) * 0.05;
      const targetY = (-state.pointer.y * 0.4 - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += targetX;
      groupRef.current.rotation.x += targetY;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting Setup: Obsidian x Acid Lime Signature Spectrum */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 6, 6]} intensity={1.8} color="#FFFFFF" />
      <pointLight position={[-4, 4, 3]} color="#B8FF2C" intensity={4.5} distance={15} />
      <pointLight position={[4, -3, 3]} color="#4D5CFF" intensity={3.5} distance={12} />
      <pointLight position={[0, 4, -3]} color="#31E7FF" intensity={2.0} distance={10} />

      {/* 3D Scene Components */}
      <GrowthCoreMesh />
      <SignalStreams />
      <ParticleSystem count={particleCount} />
    </group>
  );
}

export function GrowthCoreScene({ particleCount = 600 }: { particleCount?: number }) {
  return (
    <div className="w-full h-full min-h-[420px] lg:min-h-[560px]">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <SceneContent particleCount={particleCount} />
      </Canvas>
    </div>
  );
}
