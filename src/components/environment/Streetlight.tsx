
import React from 'react';
import { Cylinder, Box } from '@react-three/drei';

const Streetlight = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Pole */}
      <Cylinder args={[0.1, 0.1, 8]} position={[0, 4, 0]} castShadow>
        <meshStandardMaterial color="#4A4A4A" metalness={0.7} roughness={0.3} />
      </Cylinder>
      
      {/* Light head */}
      <Box args={[0.8, 0.4, 0.8]} position={[0, 8.2, 0]} castShadow>
        <meshStandardMaterial color="#2A2A2A" metalness={0.5} roughness={0.4} />
      </Box>
      
      {/* Light source */}
      <pointLight
        position={[0, 7.8, 0]}
        intensity={0.5}
        distance={15}
        color="#FFF8DC"
        castShadow
      />
      
      {/* Light glow effect */}
      <Box args={[0.6, 0.2, 0.6]} position={[0, 7.9, 0]}>
        <meshStandardMaterial 
          color="#FFF8DC" 
          emissive="#FFF8DC"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </Box>
    </group>
  );
};

export default Streetlight;
