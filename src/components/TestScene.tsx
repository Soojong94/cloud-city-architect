
import React from 'react';
import { Box } from '@react-three/drei';

const TestScene = () => {
  console.log('TestScene mounting');
  
  return (
    <>
      {/* Basic lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      {/* Simple test box */}
      <Box args={[2, 2, 2]} position={[0, 1, 0]} castShadow>
        <meshStandardMaterial color="#7ea8c4" />
      </Box>
      
      {/* Ground */}
      <Box args={[20, 0.1, 20]} position={[0, -1, 0]} receiveShadow>
        <meshStandardMaterial color="#333333" />
      </Box>
    </>
  );
};

export default TestScene;
