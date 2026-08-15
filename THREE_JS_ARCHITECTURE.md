# THREE.JS / WEBGL 3D ARCHITECTURE SPECIFICATION
## Concept: The Connected Growth Core

---

### 1. 3D SYSTEM OVERVIEW & SCENE GRAPH

The 3D Hero scene renders an intuitive, abstract visual metaphor: **The Connected Growth Core**. Multiple streams of light and node particles (representing media, search, CRO, and creative data) flow smoothly into a central glowing polyhedron, generating an upward beam of growth energy.

```
Hero3DCanvas (Dynamic Client Island Loader & WebGL Feature Detection)
│
└── GrowthCoreScene (React Three Fiber Canvas)
    ├── SceneController (Camera Parallax & Scroll Controls)
    ├── LightingSystem (Dual Point Lights + Directional Key Light)
    ├── GrowthCoreGroup
    │   ├── GrowthCoreMesh (Central Polyhedron Geometry + Emissive Shader)
    │   └── UpwardGrowthBeam (Vertical Cylinder Gradient Beam)
    ├── ParticleSystem (Instanced Mesh Data Nodes)
    └── SignalStreams (CatmullRom Curve Particle Pathways)
```

---

### 2. PERFORMANCE CAPABILITY TIERS

To ensure smooth 60fps execution on all hardware without crashing mobile devices, the 3D subsystem automatically detects GPU capability upon load:

| Performance Tier | Hardware Target | Particle Count | Curve Streams | Post-Processing | Resolution Scale (DPR) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1: High** | Desktop Dedicated GPU | 1,200 Nodes | 6 Active Streams | Bloom + Chromatic Aberration | `min(devicePixelRatio, 2.0)` |
| **Tier 2: Medium** | Integrated Laptop GPU | 600 Nodes | 4 Active Streams | Basic Emissive Glow | `min(devicePixelRatio, 1.5)` |
| **Tier 3: Low** | Mobile GPU / Battery Saver | 200 Nodes | 2 Active Streams | None (Basic Shading) | `1.0` (Fixed) |
| **Tier 4: Fallback** | WebGL Unsupported / Reduced Motion | 0 Nodes (Disabled) | 0 Streams | Static High-Res 2D Graphic | Native HTML Canvas / SVG |

---

### 3. LAZY LOADING & PROGRESSIVE HYDRATION STRATEGY

The 3D scene MUST NEVER block main-thread HTML rendering or initial page interaction.

```typescript
// components/3d/Hero3DCanvas.tsx Implementation Blueprint
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { StaticFallbackGraphic } from './StaticFallbackGraphic';

// Dynamically import Three.js scene with zero SSR payload
const GrowthCoreScene = dynamic(
  () => import('./GrowthCoreScene').then((mod) => mod.GrowthCoreScene),
  {
    ssr: false,
    loading: () => <StaticFallbackGraphic />,
  }
);

export function Hero3DCanvas() {
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    // Detect WebGL rendering context support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) setIsSupported(false);
  }, []);

  if (!isSupported) return <StaticFallbackGraphic />;

  return <GrowthCoreScene />;
}
```

---

### 4. GEOMETRY & MATERIAL SPECIFICATIONS

- **Central Polyhedron Geometry**: `IcosahedronGeometry(radius: 1.8, detail: 1)` with custom `MeshStandardMaterial` (`roughness: 0.2`, `metalness: 0.8`, `emissive: '#00F0FF'`, `emissiveIntensity: 0.4`).
- **Instanced Data Nodes**: Built using `InstancedMesh` with `SphereGeometry(radius: 0.04, detail: 8)` for zero-overhead batch rendering.
- **Signal Pathways**: `TubeGeometry` generated along dynamic `CatmullRomCurve3` splines.

---

### 5. RESOURCE DISPOSAL & MEMORY SAFEGUARDS

To prevent WebGL memory leaks during route transitions, the scene implements strict unmount cleanup:

```typescript
// Pattern for Three.js Resource Disposal
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}, []);
```
