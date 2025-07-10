
import React, { useState } from 'react';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const NaverCloudBuilding = ({ position, onClick }: { position: [number, number, number], onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
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
        />
      </Box>
      
      {/* Hexagonal top section */}
      <Box args={[5, 3, 5]} position={[0, 11.5, 0]} castShadow>
        <meshStandardMaterial 
          color="#17a600" 
          metalness={0.3}
          roughness={0.6}
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
            <meshStandardMaterial color="#0f7d00" />
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
              emissiveIntensity={0.3}
            />
          </Box>
        );
      })}
    </group>
  );
};

export default NaverCloudBuilding;
