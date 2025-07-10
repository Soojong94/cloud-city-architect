
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const MainBuilding = ({ position, onClick }: { position: [number, number, number], onClick: () => void }) => {
  const buildingRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  console.log('MainBuilding mounting with position:', position);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={buildingRef} position={position} onClick={onClick}>
      {/* Main building structure */}
      <Box args={[8, 16, 8]} position={[0, 8, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#7ea8c4" 
          metalness={0.3}
          roughness={0.7}
        />
      </Box>
      
      {/* Cylindrical top */}
      <Cylinder args={[4, 4, 3]} position={[0, 17.5, 0]} castShadow>
        <meshStandardMaterial 
          color="#6b9bb5" 
          metalness={0.4}
          roughness={0.6}
        />
      </Cylinder>
      
      {/* Glowing ring */}
      <Cylinder ref={ringRef} args={[5, 5, 0.5]} position={[0, 19, 0]}>
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#7ea8c4"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Cylinder>
      
      {/* Windows */}
      {Array.from({ length: 12 }, (_, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        return (
          <Box
            key={i}
            args={[0.8, 1.2, 0.1]}
            position={[
              -3 + col * 2,
              2 + row * 3,
              4.1
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
      
      {/* Building title - simplified without font prop */}
      <Text
        position={[0, 22, 0]}
        fontSize={1.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        KSJ - Cloud Solutions Architect
      </Text>
    </group>
  );
};

export default MainBuilding;
