
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Ground component with subtle texture
const Ground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Plane
      ref={meshRef}
      args={[50, 50]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, 0]}
    >
      <meshStandardMaterial 
        color="#1a1a2e" 
        transparent 
        opacity={0.8}
        roughness={0.8}
        metalness={0.2}
      />
    </Plane>
  );
};

// Floating 3D elements
const FloatingElement = ({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });
  
  return (
    <Box ref={meshRef} position={position} scale={scale}>
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.7}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Box>
  );
};

// 3D Scene component
const Scene = () => {
  return (
    <>
      <Environment preset="night" />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.3} color="#6366f1" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#8b5cf6" />
      
      {/* Ground */}
      <Ground />
      
      {/* Floating 3D elements representing cloud services */}
      <FloatingElement position={[-5, 2, -3]} color="#3b82f6" scale={0.8} />
      <FloatingElement position={[5, 3, -2]} color="#8b5cf6" scale={1.2} />
      <FloatingElement position={[0, 4, -5]} color="#06b6d4" scale={1} />
      <FloatingElement position={[-3, 1, 2]} color="#10b981" scale={0.9} />
      <FloatingElement position={[4, 2.5, 3]} color="#f59e0b" scale={1.1} />
      
      {/* 3D Text */}
      <Text
        position={[0, 1, 0]}
        fontSize={1.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        CLOUD ARCHITECT
      </Text>
      
      <Text
        position={[0, 0, 0]}
        fontSize={0.8}
        color="#a1a1aa"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.woff"
      >
        클라우드 솔루션 전문가
      </Text>
    </>
  );
};

// Welcome overlay component
const WelcomeOverlay = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div className="text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
          Welcome
        </h1>
        <h2 className="text-3xl md:text-4xl font-light mb-8 text-white/90 animate-fade-in" style={{animationDelay: '0.3s'}}>
          환영합니다
        </h2>
        <p className="text-xl md:text-2xl text-white/70 mb-12 animate-fade-in" style={{animationDelay: '0.6s'}}>
          Cloud Solutions Architect Portfolio
        </p>
        <button
          onClick={onClose}
          className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 animate-fade-in"
          style={{animationDelay: '0.9s'}}
        >
          Enter Experience / 경험하기
        </button>
      </div>
    </div>
  );
};

// Loading component
const LoadingScreen = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
      <p className="text-white/70">Loading 3D Experience...</p>
    </div>
  </div>
);

// Main component
const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Auto-hide welcome overlay after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-900 relative">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 75 }}
        onCreated={() => setIsLoaded(true)}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {/* Loading Screen */}
      {!isLoaded && <LoadingScreen />}

      {/* Welcome Overlay */}
      <WelcomeOverlay 
        isVisible={showWelcome} 
        onClose={() => setShowWelcome(false)} 
      />

      {/* Navigation Hint */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          showWelcome ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
        style={{ transitionDelay: showWelcome ? '0ms' : '500ms' }}
      >
        <div 
          className="px-6 py-3 rounded-full text-white/80 text-center backdrop-blur-sm border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          }}
        >
          <p className="text-sm md:text-base">
            Explore the 3D city and click on buildings to learn about my cloud expertise
          </p>
          <p className="text-xs md:text-sm text-white/60 mt-1">
            3D 도시를 탐험하고 건물을 클릭하여 클라우드 전문성을 알아보세요
          </p>
        </div>
      </div>

      {/* Glassmorphism Navigation */}
      <nav 
        className={`absolute top-8 right-8 transition-all duration-1000 ${
          showWelcome ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
        style={{ transitionDelay: showWelcome ? '0ms' : '700ms' }}
      >
        <div 
          className="flex space-x-4 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          }}
        >
          <button className="text-white/80 hover:text-white transition-colors px-3 py-1 rounded-full hover:bg-white/10">
            Home
          </button>
          <button className="text-white/80 hover:text-white transition-colors px-3 py-1 rounded-full hover:bg-white/10">
            Skills
          </button>
          <button className="text-white/80 hover:text-white transition-colors px-3 py-1 rounded-full hover:bg-white/10">
            Contact
          </button>
        </div>
      </nav>

      {/* Language Toggle */}
      <div 
        className={`absolute top-8 left-8 transition-all duration-1000 ${
          showWelcome ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
        style={{ transitionDelay: showWelcome ? '0ms' : '900ms' }}
      >
        <div 
          className="flex space-x-2 px-3 py-2 rounded-full backdrop-blur-sm border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          }}
        >
          <button className="text-white/80 hover:text-white transition-colors px-2 py-1 rounded text-sm">
            EN
          </button>
          <div className="w-px bg-white/20"></div>
          <button className="text-white/80 hover:text-white transition-colors px-2 py-1 rounded text-sm">
            한국어
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
