import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Ultra-simple building component
const SimpleBuilding = ({ position, color, onClick }: { 
  position: [number, number, number], 
  color: string, 
  onClick: () => void 
}) => (
  <group position={position} onClick={onClick}>
    <mesh>
      <boxGeometry args={[4, 8, 4]} />
      <meshBasicMaterial color={color} />
    </mesh>
  </group>
);

// Minimal scene
const MinimalScene = () => (
  <>
    <ambientLight intensity={0.6} />
    <directionalLight position={[10, 10, 5]} intensity={0.5} />
    
    {/* Only show one building first */}
    <SimpleBuilding position={[0, 4, 0]} color="#7ea8c4" onClick={() => console.log('clicked')} />
    
    {/* Simple ground */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial color="#1a1a2e" />
    </mesh>
  </>
);

// Replace entire Index.tsx with this minimal version
const Index = () => (
  <div className="h-screen w-full bg-gray-900">
    <Canvas camera={{ position: [15, 10, 15] }}>
      <Suspense fallback={null}>
        <MinimalScene />
        <OrbitControls />
      </Suspense>
    </Canvas>
  </div>
);

export default Index;