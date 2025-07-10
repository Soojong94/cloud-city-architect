
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const KubernetesBuilding = ({ position, onClick }: { position: [number, number, number], onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const buildingRef = useRef<THREE.Group>(null);
  
  console.log('KubernetesBuilding mounting with position:', position);
  
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
      style={{ cursor: hovered ? 'pointer' : 'default' }}
    >
      {/* Main building with stacked container design */}
      <Box args={[6, 4, 6]} position={[0, 2, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color={hovered ? "#4d7aed" : "#326ce5"} 
          metalness={0.3}
          roughness={0.7}
          emissive="#326ce5"
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Box>
      
      <Box args={[5.5, 4, 5.5]} position={[0, 6, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color={hovered ? "#4d7aed" : "#326ce5"} 
          metalness={0.3}
          roughness={0.7}
          emissive="#326ce5"
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Box>
      
      <Box args={[5, 4, 5]} position={[0, 10, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color={hovered ? "#4d7aed" : "#326ce5"} 
          metalness={0.3}
          roughness={0.7}
          emissive="#326ce5"
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Box>
      
      {/* Kubernetes wheel decoration on top */}
      <Cylinder args={[2.5, 2.5, 0.3]} position={[0, 12.5, 0]} castShadow>
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.8}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </Cylinder>
      
      {/* Wheel spokes */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <Box
            key={i}
            args={[0.2, 0.2, 2]}
            position={[
              Math.cos(angle) * 1.2,
              12.5,
              Math.sin(angle) * 1.2
            ]}
            rotation={[0, angle, 0]}
          >
            <meshStandardMaterial 
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={hovered ? 0.2 : 0}
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
            args={[0.6, 0.8, 0.1]}
            position={[
              -1.5 + col * 1.5,
              1 + row * 2,
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

export default KubernetesBuilding;
