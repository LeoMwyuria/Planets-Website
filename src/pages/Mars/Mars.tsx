import React, { useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import data from '../../data/data.json';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import { planetTextures } from '../../components/PlanetConfig/PlanetConfig';
import * as THREE from 'three';
import PlanetStats from '../../components/Information/PlanetStats';
import PlanetInfo from '../../components/Information/PlanetInfo';

interface Planet {
  name: string;
  overview: {
    content: string;
    source: string;
  };
  structure: {
    content: string;
    source: string;
  };
  geology: {
    content: string;
    source: string;
  };
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  images: {
    planet: string;
    internal: string;
    geology: string;
  };
}

// 🔴 Mars 3D Model Component
const MarsPlanet: React.FC = () => {
  const marsTexture = useTexture(planetTextures.mars);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={marsTexture}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
};

// 🔴 Main Mars Component
const Mars: React.FC = () => {
  const marsData: Planet | undefined = data.find((planet: Planet) => planet.name === "Mars");
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');

  if (!marsData) {
    return <div>No data found for Mars</div>;
  }

  return (
    <div className='main' style={{ background: '#000', height: '100vh', position: 'relative' }}>
      {/* 🌌 Space Background */}
      <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade speed={1} />
      </Canvas>

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='planet-info' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
            {/* 🎥 3D Mars */}
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ background: 'transparent', flex: 1 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <MarsPlanet />
              <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
            </Canvas>

            {/* ℹ️ Mars Info Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '50px', padding: '0 40px', width: '35%' }}>
              <PlanetInfo
                heading="Mars"
                paragraph={activeSection === 'overview' ? marsData.overview.content : activeSection === 'structure' ? marsData.structure.content : marsData.geology.content}
                sources={activeSection === 'overview' ? marsData.overview.source : activeSection === 'structure' ? marsData.structure.source : marsData.geology.source}
              />
              <Content setActiveSection={setActiveSection} activeSection={activeSection} />
            </div>
          </div>

          {/* 📊 Mars Stats */}
          <PlanetStats
            rotationTime={marsData.rotation}
            revolutionTime={marsData.revolution}
            radius={marsData.radius}
            averageTemp={marsData.temperature}
          />
        </div>
      </div>
    </div>
  );
};

export default Mars;
