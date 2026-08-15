'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SignalStreams() {
  const pointsGroupRef = useRef<THREE.Group>(null);

  // Generate 4 converging spline paths
  const curves = useMemo(() => {
    return [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-4, -3, -1),
        new THREE.Vector3(-2, -1, 0),
        new THREE.Vector3(0, 0, 0),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(4, -3, -1),
        new THREE.Vector3(2, -1, 0),
        new THREE.Vector3(0, 0, 0),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-3, 3, -1),
        new THREE.Vector3(-1.5, 1.5, 0),
        new THREE.Vector3(0, 0, 0),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(3, 3, -1),
        new THREE.Vector3(1.5, 1.5, 0),
        new THREE.Vector3(0, 0, 0),
      ]),
    ];
  }, []);

  const streamColors = ['#00CFFF', '#1769FF', '#673BFF', '#D900FF'];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsGroupRef.current) {
      pointsGroupRef.current.children.forEach((child, idx) => {
        const curve = curves[idx % curves.length];
        const progress = (time * 0.3 + idx * 0.25) % 1;
        const point = curve.getPoint(progress);
        child.position.copy(point);
      });
    }
  });

  return (
    <group>
      {/* Tube Stream Pathways */}
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 40, 0.015, 8, false]} />
          <meshBasicMaterial color="#E2E8F0" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Moving Stream Signal Pulses */}
      <group ref={pointsGroupRef}>
        {curves.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={streamColors[i % streamColors.length]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
