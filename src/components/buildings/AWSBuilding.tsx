
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const AWSBuilding = ({ position, onClick }: { position: [number, number, number], onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const buildingRef = useRef<THREE.Group>(null);
  
  console.log('AWSBuilding mounting with position:', position);
  
  useFrame(() => {
    // Add subtle hover glow effect
    if (buildingRef.current && hovered) {
      buildingRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.emissiveIntensity = 0.1;
        }
      });
    } else if (buildingRef.current) {
      buildingRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.emissiveIntensity = 0;
        }
      });
    }
  });
  
  return (
    <group 
      ref={buildingRef}
      position={position} 
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main building */}
      <Box args={[6, 14, 6]} position={[0, 7, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color={hovered ? "#ffaa20" : "#ff9900"} 
          metalness={0.2}
          roughness={0.8}
          emissive="#ff9900"
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Box>
      
      {/* Orange accent top */}
      <Box args={[7, 2, 7]} position={[0, 15, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? "#d68a00" : "#cc7a00"}
          metalness={0.3}
          roughness={0.6}
          emissive="#cc7a00"
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Box>
      
      {/* Windows */}
      {Array.from({ length: 9 }, (_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        return (
          <Box
            key={i}
            args={[0.6, 1, 0.1]}
            position={[
              -1.5 + col * 1.5,
              2 + row * 3,
              3.1
            ]}
          >
            <meshStandardMaterial 
              color="#4a90e2" 
              emissive="#4a90e2"
              emissiveIntensity={hovered ? 0.5 : 0.3}
            />
          </Box>
        );
      })}
    </group>
  );
};

export default AWSBuilding;
