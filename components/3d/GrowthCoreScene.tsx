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
      {/* Lighting Setup: Official Logo Light Spectrum (Cyan -> Blue -> Violet -> Magenta) */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[-4, 3, 3]} color="#00CFFF" intensity={2.5} distance={12} />
      <pointLight position={[4, -3, 2]} color="#1769FF" intensity={2.0} distance={12} />
      <pointLight position={[0, 4, -3]} color="#673BFF" intensity={2.0} distance={12} />
      <pointLight position={[3, 3, -2]} color="#D900FF" intensity={2.2} distance={12} />

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
