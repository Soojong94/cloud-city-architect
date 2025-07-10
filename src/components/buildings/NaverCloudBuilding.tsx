
import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const NaverCloudBuilding = ({ position, onClick }: { position: [number, number, number], onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const buildingRef = useRef<THREE.Group>(null);
  
  console.log('NaverCloudBuilding mounting with position:', position);
  
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
      <Box args={[6, 10, 6]} position={[0, 5, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color={hovered ? "#2ed400" : "#1ec800"} 
          metalness={0.2}
          roughness={0.8}
          emissive="#1ec800"
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Box>
      
      {/* Hexagonal top section */}
      <Box args={[5, 3, 5]} position={[0, 11.5, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? "#20b000" : "#17a600"}
          metalness={0.3}
          roughness={0.6}
          emissive="#17a600"
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Box>
      
      {/* Hexagonal edges */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <Box
            key={i}
            args={[0.3, 3, 0.3]}
            position={[
              Math.cos(angle) * 2.2,
              11.5,
              Math.sin(angle) * 2.2
            ]}
          >
            <meshStandardMaterial 
              color={hovered ? "#189000" : "#0f7d00"}
              emissive="#0f7d00"
              emissiveIntensity={hovered ? 0.1 : 0}
            />
          </Box>
        );
      })}
      
      {/* Windows */}
      {Array.from({ length: 6 }, (_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        return (
          <Box
            key={i}
            args={[0.6, 1, 0.1]}
            position={[
              -1.5 + col * 1.5,
              1.5 + row * 2.5,
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

export default NaverCloudBuilding;
