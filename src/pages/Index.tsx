import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Building data with real portfolio content
const buildings = [
  {
    position: [0, 4, 0] as [number, number, number],
    size: [6, 12, 6] as [number, number, number],
    color: "#7ea8c4",
    type: "main",
    title: "KSJ - Multi-Cloud Architect",
    description: "10+ years experience in cloud architecture across AWS, Azure, GCP, and Korean cloud platforms",
    skills: ["Multi-cloud Strategy", "Infrastructure as Code", "Kubernetes", "DevOps", "Cloud Migration"],
    projects: [
      "Enterprise Multi-Cloud Strategy - Fortune 500 cloud adoption roadmap",
      "Cloud Center of Excellence - 5000+ employee governance framework", 
      "Cost Optimization Initiative - 35% cloud spending reduction"
    ]
  },
  {
    position: [12, 3, 8] as [number, number, number],
    size: [5, 10, 5] as [number, number, number],
    color: "#ff9900",
    type: "aws",
    title: "AWS Solutions Architecture",
    description: "8+ years AWS experience specializing in scalable, cost-effective architectures",
    skills: ["EC2", "S3", "Lambda", "EKS", "CloudFormation", "DynamoDB", "VPC", "RDS"],
    projects: [
      "E-commerce Platform Migration - 40% cost reduction, 99.99% uptime",
      "Serverless Data Pipeline - Real-time analytics with Lambda/DynamoDB",
      "Multi-Region DR Solution - Automated failover mechanisms"
    ]
  },
  {
    position: [-12, 3, 8] as [number, number, number],
    size: [5, 9, 5] as [number, number, number],
    color: "#326ce5",
    type: "kubernetes",
    title: "Kubernetes & Container Orchestration",
    description: "6+ years with K8s, focusing on microservices and CI/CD integration",
    skills: ["Kubernetes", "Docker", "Helm", "Istio", "Prometheus", "Grafana", "GitOps"],
    projects: [
      "Microservices Platform - Monolith to 30+ microservices transformation",
      "Multi-Cluster Federation - Cross-cloud Kubernetes deployment",
      "GitOps Implementation - ArgoCD automated deployment pipeline"
    ]
  },
  {
    position: [12, 3, -8] as [number, number, number],
    size: [5, 8, 5] as [number, number, number],
    color: "#1ec800",
    type: "naver",
    title: "NAVER Cloud Platform",
    description: "5+ years with NCP, Korean market focus with regulatory compliance",
    skills: ["NAVER Cloud", "Object Storage", "VPC", "Load Balancer", "CDN", "AI Services"],
    projects: [
      "Financial Services Migration - Korean regulatory compliance",
      "AI/ML Research Platform - Academic computing infrastructure",
      "Hybrid Cloud Architecture - On-premises integration"
    ]
  },
  {
    position: [-12, 3, -8] as [number, number, number],
    size: [5, 9, 5] as [number, number, number],
    color: "#ff1c1c",
    type: "kt",
    title: "KT Cloud Enterprise Solutions",
    description: "4+ years in enterprise/government sectors with secure architectures",
    skills: ["KT Cloud", "IaaS", "PaaS", "Security Services", "VDI", "Compliance"],
    projects: [
      "Government Cloud Migration - Enhanced security controls",
      "Healthcare Infrastructure - Patient data compliance systems",
      "Telecom Data Platform - High-throughput processing"
    ]
  }
];

interface Building {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  type: string;
  title: string;
  description: string;
  skills: string[];
  projects: string[];
}

// Main Building Component with distinct architecture
const MainBuilding = ({ building, onClick }: { building: Building, onClick: (building: Building) => void }) => (
  <group position={building.position} onClick={() => onClick(building)}>
    {/* Modern skyscraper with glass facade */}
    <mesh>
      <boxGeometry args={building.size} />
      <meshStandardMaterial color={building.color} transparent opacity={0.9} />
    </mesh>
    {/* Spire/antenna on top */}
    <mesh position={[0, building.size[1]/2 + 1, 0]}>
      <cylinderGeometry args={[0.2, 0.5, 2]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
    {/* Windows pattern */}
    {Array.from({length: 20}, (_, i) => (
      <mesh key={i} position={[
        -building.size[0]/2 + 0.1,
        -building.size[1]/2 + 1 + (i % 4) * 2,
        -building.size[2]/2 + (Math.floor(i/4) + 1) * 1.2
      ]}>
        <boxGeometry args={[0.05, 0.8, 0.8]} />
        <meshBasicMaterial color="#4a90e2" />
      </mesh>
    ))}
  </group>
);

// AWS Building with corporate style
const AWSBuilding = ({ building, onClick }: { building: Building, onClick: (building: Building) => void }) => (
  <group position={building.position} onClick={() => onClick(building)}>
    <mesh>
      <boxGeometry args={building.size} />
      <meshStandardMaterial color={building.color} />
    </mesh>
    {/* AWS logo-inspired top */}
    <mesh position={[0, building.size[1]/2 + 0.5, 0]}>
      <boxGeometry args={[building.size[0] + 1, 1, building.size[2] + 1]} />
      <meshStandardMaterial color="#232f3e" />
    </mesh>
    {/* Orange accent windows */}
    {Array.from({length: 12}, (_, i) => (
      <mesh key={i} position={[
        -building.size[0]/2 + 0.1,
        -building.size[1]/2 + 1 + (i % 3) * 2.5,
        -building.size[2]/2 + (Math.floor(i/3) + 1) * 1
      ]}>
        <boxGeometry args={[0.05, 0.6, 0.6]} />
        <meshBasicMaterial color="#ff9900" />
      </mesh>
    ))}
  </group>
);

// Kubernetes Building with container-style architecture
const KubernetesBuilding = ({ building, onClick }: { building: Building, onClick: (building: Building) => void }) => (
  <group position={building.position} onClick={() => onClick(building)}>
    {/* Main building */}
    <mesh>
      <boxGeometry args={building.size} />
      <meshStandardMaterial color={building.color} />
    </mesh>
    {/* Container-style modular sections */}
    {Array.from({length: 3}, (_, i) => (
      <mesh key={i} position={[0, -building.size[1]/2 + 2 + i * 3, building.size[2]/2 + 0.5]}>
        <boxGeometry args={[building.size[0] - 1, 2, 1]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
    ))}
    {/* Kubernetes wheel on top */}
    <mesh position={[0, building.size[1]/2 + 0.5, 0]} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[1.5, 1.5, 0.5]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  </group>
);

// NAVER Cloud Building with modern Korean design
const NaverBuilding = ({ building, onClick }: { building: Building, onClick: (building: Building) => void }) => (
  <group position={building.position} onClick={() => onClick(building)}>
    <mesh>
      <boxGeometry args={building.size} />
      <meshStandardMaterial color={building.color} />
    </mesh>
    {/* NAVER green accent stripe */}
    <mesh position={[0, 0, building.size[2]/2 + 0.1]}>
      <boxGeometry args={[building.size[0], building.size[1], 0.2]} />
      <meshStandardMaterial color="#03c75a" />
    </mesh>
    {/* Modern geometric windows */}
    {Array.from({length: 8}, (_, i) => (
      <mesh key={i} position={[
        -building.size[0]/2 + 0.1,
        -building.size[1]/2 + 1.5 + (i % 2) * 2,
        -building.size[2]/2 + (Math.floor(i/2) + 1) * 1
      ]}>
        <boxGeometry args={[0.05, 1, 1]} />
        <meshBasicMaterial color="#1ec800" />
      </mesh>
    ))}
  </group>
);

// KT Cloud Building with telecom tower design
const KTBuilding = ({ building, onClick }: { building: Building, onClick: (building: Building) => void }) => (
  <group position={building.position} onClick={() => onClick(building)}>
    <mesh>
      <boxGeometry args={building.size} />
      <meshStandardMaterial color={building.color} />
    </mesh>
    {/* Communication tower on top */}
    <mesh position={[0, building.size[1]/2 + 2, 0]}>
      <cylinderGeometry args={[0.2, 0.2, 4]} />
      <meshStandardMaterial color="#333333" />
    </mesh>
    {/* Antenna elements */}
    {Array.from({length: 3}, (_, i) => (
      <mesh key={i} position={[0, building.size[1]/2 + 3 + i * 0.5, 0]}>
        <boxGeometry args={[2 - i * 0.5, 0.1, 0.1]} />
        <meshStandardMaterial color="#ff1c1c" />
      </mesh>
    ))}
  </group>
);

// City Environment with infrastructure
const CityEnvironment = () => (
  <>
    {/* Central Plaza */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
      <circleGeometry args={[8, 32]} />
      <meshStandardMaterial color="#2a2a3e" />
    </mesh>
    
    {/* Roads connecting buildings */}
    {[
      {pos: [0, 0.05, 15] as [number, number, number], size: [4, 0.1, 10] as [number, number, number]},
      {pos: [0, 0.05, -15] as [number, number, number], size: [4, 0.1, 10] as [number, number, number]},
      {pos: [15, 0.05, 0] as [number, number, number], size: [10, 0.1, 4] as [number, number, number]},
      {pos: [-15, 0.05, 0] as [number, number, number], size: [10, 0.1, 4] as [number, number, number]}
    ].map((road, i) => (
      <mesh key={i} position={road.pos}>
        <boxGeometry args={road.size} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    ))}
    
    {/* Trees around the city */}
    {Array.from({length: 12}, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 20;
      return (
        <group key={i} position={[
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        ]}>
          {/* Tree trunk */}
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 3]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Tree foliage */}
          <mesh position={[0, 3.5, 0]}>
            <sphereGeometry args={[1.5]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
        </group>
      );
    })}
    
    {/* Streetlights */}
    {[
      [8, 0, 8] as [number, number, number], 
      [-8, 0, 8] as [number, number, number], 
      [8, 0, -8] as [number, number, number], 
      [-8, 0, -8] as [number, number, number]
    ].map((pos, i) => (
      <group key={i} position={pos}>
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 5]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        <mesh position={[0, 4.8, 0]}>
          <sphereGeometry args={[0.3]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <pointLight position={[0, 4.5, 0]} intensity={0.5} distance={10} />
      </group>
    ))}
  </>
);

// 3D Scene with all buildings
const PortfolioScene = ({ onBuildingClick }: { onBuildingClick: (building: Building) => void }) => {
  const renderBuilding = (building: Building) => {
    const props = { building, onClick: onBuildingClick };
    
    switch (building.type) {
      case "main": return <MainBuilding key={building.type} {...props} />;
      case "aws": return <AWSBuilding key={building.type} {...props} />;
      case "kubernetes": return <KubernetesBuilding key={building.type} {...props} />;
      case "naver": return <NaverBuilding key={building.type} {...props} />;
      case "kt": return <KTBuilding key={building.type} {...props} />;
      default: return <MainBuilding key={building.type} {...props} />;
    }
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <pointLight position={[-10, 15, -10]} intensity={0.6} color="#6366f1" />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* City Environment */}
      <CityEnvironment />
      
      {/* All Buildings */}
      {buildings.map(renderBuilding)}
    </>
  );
};

// Sliding information panel with glassmorphism
const InfoPanel = ({ building, isOpen, onClose }: { 
  building: Building | null, 
  isOpen: boolean, 
  onClose: () => void 
}) => (
  <div className={`fixed left-0 top-0 h-full w-96 transform transition-transform duration-500 z-50 ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  }`}>
    <div className="h-full backdrop-blur-lg bg-white/10 border-r border-white/20 p-6 overflow-y-auto">
      {building && (
        <>
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{building.title}</h2>
              <div className="w-16 h-1 bg-blue-400 rounded"></div>
            </div>
            <button 
              onClick={onClose}
              className="text-white/70 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              ×
            </button>
          </div>
          
          {/* Content sections */}
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-white/90 mb-3">Overview</h3>
              <p className="text-white/70 leading-relaxed">{building.description}</p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-white/90 mb-3">Key Projects</h3>
              <div className="space-y-3">
                {building.projects.map((project, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 border-l-2 border-blue-400">
                    <p className="text-white/80 text-sm">{project}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-white/90 mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {building.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  </div>
);

// Top navigation bar
const Navigation = () => (
  <nav className="absolute top-6 left-6 right-6 z-40">
    <div className="flex justify-between items-center">
      {/* Logo/Title */}
      <div className="backdrop-blur-lg bg-white/10 px-4 py-2 rounded-full border border-white/20">
        <h1 className="text-white font-semibold">Cloud Solutions Portfolio</h1>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex space-x-3">
        {['Home', 'Skills', 'Projects', 'Contact'].map(item => (
          <button key={item} className="backdrop-blur-lg bg-white/10 px-4 py-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all">
            {item}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

// Bottom control hints
const ControlHints = () => (
  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40">
    <div className="backdrop-blur-lg bg-white/10 px-6 py-3 rounded-full border border-white/20">
      <p className="text-white/70 text-sm text-center">
        🖱️ Drag to rotate • 🔍 Scroll to zoom • 🏢 Click buildings to explore
      </p>
    </div>
  </div>
);

// Animated welcome screen
const WelcomeScreen = ({ onComplete }: { onComplete: () => void }) => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
    <div className="text-center space-y-6 animate-fade-in">
      <h1 className="text-6xl font-bold text-white mb-4">
        Welcome to My
        <span className="block text-blue-300">Cloud Journey</span>
      </h1>
      <p className="text-xl text-white/80 max-w-2xl mx-auto">
        Explore my expertise across AWS, Kubernetes, and Korean cloud platforms through this interactive 3D portfolio city
      </p>
      <button 
        onClick={onComplete}
        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
      >
        Enter Portfolio City
      </button>
    </div>
  </div>
);

// Main Index component
const Index = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedBuilding(null), 300);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClosePanel();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative">
      {/* Welcome Screen */}
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      
      {/* 3D Canvas */}
      <Canvas 
        camera={{ position: [25, 15, 25], fov: 60 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <PortfolioScene onBuildingClick={handleBuildingClick} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={15}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      {!showWelcome && (
        <>
          <Navigation />
          <ControlHints />
          <InfoPanel 
            building={selectedBuilding} 
            isOpen={isPanelOpen} 
            onClose={handleClosePanel} 
          />
        </>
      )}
    </div>
  );
};

export default Index;