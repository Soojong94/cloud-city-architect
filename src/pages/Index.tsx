import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane, Environment } from '@react-three/drei';
import * as THREE from 'three';
import MainBuilding from '../components/buildings/MainBuilding';
import AWSBuilding from '../components/buildings/AWSBuilding';
import KubernetesBuilding from '../components/buildings/KubernetesBuilding';
import NaverCloudBuilding from '../components/buildings/NaverCloudBuilding';
import KTCloudBuilding from '../components/buildings/KTCloudBuilding';
import ThreeErrorBoundary from '../components/ThreeErrorBoundary';
import InfoPanel from '../components/InfoPanel';
import LoadingScreen from '../components/LoadingScreen';
import SettingsPanel from '../components/SettingsPanel';
import Tree from '../components/environment/Tree';
import Streetlight from '../components/environment/Streetlight';
import Plaza from '../components/environment/Plaza';
import Bench from '../components/environment/Bench';
import Road from '../components/environment/Road';
import { useBuildingData } from '../hooks/useBuildingData';

// Ground component with subtle texture
const Ground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Plane
      ref={meshRef}
      args={[100, 100]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, 0]}
      receiveShadow
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

// Enhanced Scene component
const EnhancedScene = ({ onBuildingClick }: { onBuildingClick: (buildingName: string) => void }) => {
  console.log('EnhancedScene component mounting');
  
  return (
    <>
      <Environment preset="night" />
      <fog attach="fog" args={['#1a1a2e', 30, 100]} />
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[20, 20, 10]} 
        intensity={1.5} 
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <pointLight position={[-15, 15, -15]} intensity={0.6} color="#6366f1" />
      <pointLight position={[15, 15, 15]} intensity={0.6} color="#8b5cf6" />
      
      {/* Ground and Roads */}
      <Ground />
      <Road />
      
      {/* Central Plaza */}
      <Plaza position={[0, 0, 0]} />
      
      {/* Buildings */}
      <MainBuilding 
        position={[0, 0, 0]} 
        onClick={() => onBuildingClick('Main')} 
      />
      
      <AWSBuilding 
        position={[14, 0, 14]} 
        onClick={() => onBuildingClick('AWS')} 
      />
      
      <KubernetesBuilding 
        position={[-14, 0, 14]} 
        onClick={() => onBuildingClick('Kubernetes')} 
      />
      
      <NaverCloudBuilding 
        position={[14, 0, -14]} 
        onClick={() => onBuildingClick('NAVER Cloud')} 
      />
      
      <KTCloudBuilding 
        position={[-14, 0, -14]} 
        onClick={() => onBuildingClick('KT Cloud')} 
      />
      
      {/* Trees */}
      <Tree position={[8, 0, 8]} />
      <Tree position={[-8, 0, 8]} />
      <Tree position={[8, 0, -8]} />
      <Tree position={[-8, 0, -8]} />
      <Tree position={[20, 0, 0]} />
      <Tree position={[-20, 0, 0]} />
      <Tree position={[0, 0, 20]} />
      <Tree position={[0, 0, -20]} />
      <Tree position={[25, 0, 15]} />
      <Tree position={[-25, 0, -15]} />
      
      {/* Streetlights */}
      <Streetlight position={[7, 0, 7]} />
      <Streetlight position={[-7, 0, 7]} />
      <Streetlight position={[7, 0, -7]} />
      <Streetlight position={[-7, 0, -7]} />
      <Streetlight position={[21, 0, 0]} />
      <Streetlight position={[-21, 0, 0]} />
      <Streetlight position={[0, 0, 21]} />
      <Streetlight position={[0, 0, -21]} />
      
      {/* Benches around plaza */}
      <Bench position={[10, 0, 0]} rotation={[0, Math.PI/2, 0]} />
      <Bench position={[-10, 0, 0]} rotation={[0, -Math.PI/2, 0]} />
      <Bench position={[0, 0, 10]} rotation={[0, 0, 0]} />
      <Bench position={[0, 0, -10]} rotation={[0, Math.PI, 0]} />
      <Bench position={[7, 0, 7]} rotation={[0, Math.PI/4, 0]} />
      <Bench position={[-7, 0, -7]} rotation={[0, -Math.PI/4, 0]} />
      
      {/* Floating elements - reduced to not clutter */}
      <FloatingElement position={[30, 8, 0]} color="#3b82f6" scale={0.4} />
      <FloatingElement position={[-30, 10, 0]} color="#8b5cf6" scale={0.4} />
      <FloatingElement position={[0, 12, 30]} color="#06b6d4" scale={0.4} />
      <FloatingElement position={[0, 9, -30]} color="#10b981" scale={0.4} />
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

// Main component
const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ko'>('en');
  const { getBuildingInfo } = useBuildingData();

  console.log('Index component mounting');

  useEffect(() => {
    // Simulate loading time and hide welcome overlay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000);

    // Keyboard shortcuts
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPanelOpen(false);
        setTimeout(() => setSelectedBuilding(null), 300);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(welcomeTimer);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleBuildingClick = (buildingName: string) => {
    console.log(`Building clicked: ${buildingName}`);
    setSelectedBuilding(buildingName);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => {
      setSelectedBuilding(null);
    }, 300);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-900 relative">
      {/* 3D Canvas with Error Boundary */}
      <ThreeErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [25, 15, 25], fov: 60 }}
          onCreated={() => {
            console.log('Canvas created successfully');
          }}
          className="absolute inset-0"
          gl={{ 
            antialias: true, 
            alpha: false,
            powerPreference: "high-performance"
          }}
        >
          <Suspense fallback={null}>
            <EnhancedScene onBuildingClick={handleBuildingClick} />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={15}
              maxDistance={60}
              maxPolarAngle={Math.PI / 2.2}
              target={[0, 8, 0]}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>
      </ThreeErrorBoundary>

      {/* Info Panel */}
      <InfoPanel
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        buildingInfo={selectedBuilding ? getBuildingInfo(selectedBuilding) : null}
      />

      {/* Loading Screen */}
      <LoadingScreen isVisible={isLoading} />

      {/* Welcome Overlay */}
      <WelcomeOverlay 
        isVisible={showWelcome && !isLoading} 
        onClose={() => setShowWelcome(false)} 
      />

      {/* Settings Panel */}
      <SettingsPanel />

      {/* Navigation Hint */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          showWelcome || isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
        style={{ transitionDelay: showWelcome || isLoading ? '0ms' : '500ms' }}
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
          showWelcome || isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
        style={{ transitionDelay: showWelcome || isLoading ? '0ms' : '700ms' }}
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
          showWelcome || isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
        style={{ transitionDelay: showWelcome || isLoading ? '0ms' : '900ms' }}
      >
        <div 
          className="flex space-x-2 px-3 py-2 rounded-full backdrop-blur-sm border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          }}
        >
          <button 
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 rounded text-sm transition-colors ${
              language === 'en' ? 'text-white bg-white/20' : 'text-white/80 hover:text-white'
            }`}
          >
            EN
          </button>
          <div className="w-px bg-white/20"></div>
          <button 
            onClick={() => setLanguage('ko')}
            className={`px-2 py-1 rounded text-sm transition-colors ${
              language === 'ko' ? 'text-white bg-white/20' : 'text-white/80 hover:text-white'
            }`}
          >
            한국어
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;