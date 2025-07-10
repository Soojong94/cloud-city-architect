
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const Tree = ({ position }: { position: [number, number, number] }) => {
  const treeRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (treeRef.current) {
      // Subtle swaying animation
      treeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });
  
  return (
    <group ref={treeRef} position={position}>
      {/* Tree trunk */}
      <Cylinder args={[0.2, 0.3, 3]} position={[0, 1.5, 0]} castShadow>
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </Cylinder>
      
      {/* Tree leaves */}
      <Cylinder args={[0, 1.5, 4]} position={[0, 4.5, 0]} castShadow>
        <meshStandardMaterial color="#228B22" roughness={0.7} />
      </Cylinder>
      
      <Cylinder args={[0, 1.2, 3]} position={[0, 6, 0]} castShadow>
        <meshStandardMaterial color="#32CD32" roughness={0.7} />
      </Cylinder>
    </group>
  );
};

export default Tree;
