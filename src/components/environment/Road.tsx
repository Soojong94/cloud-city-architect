
import React from 'react';
import { Box } from '@react-three/drei';

const Road = () => {
  return (
    <group>
      {/* Main cross roads */}
      <Box args={[60, 0.1, 4]} position={[0, -1.95, 0]} receiveShadow>
        <meshStandardMaterial color="#36454F" roughness={0.9} />
      </Box>
      
      <Box args={[4, 0.1, 60]} position={[0, -1.95, 0]} receiveShadow>
        <meshStandardMaterial color="#36454F" roughness={0.9} />
      </Box>
      
      {/* Road markings */}
      {Array.from({ length: 10 }, (_, i) => (
        <Box 
          key={`h-${i}`}
          args={[2, 0.11, 0.2]} 
          position={[-25 + i * 5, -1.94, 0]}
        >
          <meshStandardMaterial color="#FFFF00" />
        </Box>
      ))}
      
      {Array.from({ length: 10 }, (_, i) => (
        <Box 
          key={`v-${i}`}
          args={[0.2, 0.11, 2]} 
          position={[0, -1.94, -25 + i * 5]}
        >
          <meshStandardMaterial color="#FFFF00" />
        </Box>
      ))}
    </group>
  );
};

export default Road;
