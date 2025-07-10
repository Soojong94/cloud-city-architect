
import React from 'react';
import { Cylinder, Ring } from '@react-three/drei';

const Plaza = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Main plaza circle */}
      <Cylinder args={[12, 12, 0.2]} position={[0, -1.9, 0]} receiveShadow>
        <meshStandardMaterial 
          color="#D2B48C" 
          roughness={0.9}
          metalness={0.1}
        />
      </Cylinder>
      
      {/* Decorative rings */}
      <Ring args={[8, 9, 32]} position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#8B7355" 
          roughness={0.8}
          side={2}
        />
      </Ring>
      
      <Ring args={[10, 11, 32]} position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#696969" 
          roughness={0.9}
          side={2}
        />
      </Ring>
      
      {/* Central fountain base */}
      <Cylinder args={[2, 2, 1]} position={[0, -1.4, 0]} castShadow>
        <meshStandardMaterial 
          color="#708090" 
          roughness={0.6}
          metalness={0.3}
        />
      </Cylinder>
    </group>
  );
};

export default Plaza;
