
import React, { useState } from 'react';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const KTCloudBuilding = ({ position, onClick }: { position: [number, number, number], onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
      position={position} 
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main building */}
      <Box args={[6, 11, 6]} position={[0, 5.5, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color={hovered ? "#ff3c3c" : "#ff1c1c"} 
          metalness={0.2}
          roughness={0.8}
        />
      </Box>
      
      {/* Red accent stripes */}
      <Box args={[6.2, 1, 6.2]} position={[0, 3, 0]} castShadow>
        <meshStandardMaterial 
          color="#cc0000" 
          metalness={0.4}
          roughness={0.5}
        />
      </Box>
      
      <Box args={[6.2, 1, 6.2]} position={[0, 7, 0]} castShadow>
        <meshStandardMaterial 
          color="#cc0000" 
          metalness={0.4}
          roughness={0.5}
        />
      </Box>
      
      <Box args={[6.2, 1, 6.2]} position={[0, 11, 0]} castShadow>
        <meshStandardMaterial 
          color="#cc0000" 
          metalness={0.4}
          roughness={0.5}
        />
      </Box>
      
      {/* Windows */}
      {Array.from({ length: 6 }, (_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        return (
          <Box
            key={i}
            args={[0.6, 0.9, 0.1]}
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

export default KTCloudBuilding;
