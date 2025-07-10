
import React from 'react';
import { Box } from '@react-three/drei';

const Bench = ({ position, rotation = [0, 0, 0] }: { 
  position: [number, number, number], 
  rotation?: [number, number, number] 
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <Box args={[2, 0.2, 0.8]} position={[0, 0.6, 0]} castShadow>
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </Box>
      
      {/* Backrest */}
      <Box args={[2, 0.2, 0.8]} position={[0, 1.2, -0.3]} rotation={[0.3, 0, 0]} castShadow>
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </Box>
      
      {/* Legs */}
      <Box args={[0.1, 0.6, 0.1]} position={[-0.8, 0.3, 0.3]} castShadow>
        <meshStandardMaterial color="#4A4A4A" metalness={0.7} />
      </Box>
      <Box args={[0.1, 0.6, 0.1]} position={[0.8, 0.3, 0.3]} castShadow>
        <meshStandardMaterial color="#4A4A4A" metalness={0.7} />
      </Box>
      <Box args={[0.1, 0.6, 0.1]} position={[-0.8, 0.3, -0.3]} castShadow>
        <meshStandardMaterial color="#4A4A4A" metalness={0.7} />
      </Box>
      <Box args={[0.1, 0.6, 0.1]} position={[0.8, 0.3, -0.3]} castShadow>
        <meshStandardMaterial color="#4A4A4A" metalness={0.7} />
      </Box>
    </group>
  );
};

export default Bench;
