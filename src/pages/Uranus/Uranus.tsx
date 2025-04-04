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

const UranusPlanet: React.FC = () => {
  const uranusTexture = useTexture(planetTextures.uranus);
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
        map={uranusTexture}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
};

const Uranus: React.FC = () => {
  const uranusData: Planet | undefined = data.find((planet: Planet) => planet.name === "Uranus");
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');

  if (!uranusData) {
    return <div>No data found for Uranus</div>;
  }

  return (
    <div className='main' style={{ 
      background: '#000000', 
      height: '100vh', 
      position: 'relative', 
     
    }}>
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      >
        <Stars
          radius={300}
          depth={60}
          count={5000}
          factor={7}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>

      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column'
      }}>
        <Header />
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div className='planet-info' style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '50px' 
          }}>
            <Canvas
              camera={{ position: [0, 0, 8], fov: 45 }}
              style={{ background: 'transparent', flex: 1 }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <UranusPlanet />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                rotateSpeed={0.5} 
              />
            </Canvas>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '50px', padding: '0 40px', width: '35%' }}>
              <PlanetInfo 
                heading="Uranus"
                paragraph={activeSection === 'overview' ? uranusData.overview.content : activeSection === 'structure' ? uranusData.structure.content : uranusData.geology.content}
                sources={activeSection === 'overview' ? uranusData.overview.source : activeSection === 'structure' ? uranusData.structure.source : uranusData.geology.source}
              />
              <Content setActiveSection={setActiveSection} activeSection={activeSection} />
            </div>
          </div>
          <PlanetStats 
            rotationTime={uranusData.rotation}
            revolutionTime={uranusData.revolution}
            radius={uranusData.radius}
            averageTemp={uranusData.temperature}
          />
        </div>
      </div>
    </div>
  );
};

export default Uranus;
