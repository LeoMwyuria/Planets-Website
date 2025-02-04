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

const VenusPlanet: React.FC = () => {
  const venusTexture = useTexture(planetTextures.venus);
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
        map={venusTexture}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
};
const Venus: React.FC = () => {
  const venusData: Planet | undefined = data.find((planet: Planet) => planet.name === "Venus");
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');

  if (!venusData) {
    return <div>No data found for Venus</div>;
  }

  return (
    <div className='main' style={{ 
      background: '#000000', 
      height: '100vh', 
      position: 'relative',
      overflow: 'hidden'
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
          <div style={{ 
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
              <VenusPlanet />
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.5}
              />
            </Canvas>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '50px',
              padding: '0 40px',
              width: '35%',
              marginRight: '100px'
            }}>
              <PlanetInfo 
                heading="Venus"
                paragraph={activeSection === 'overview' ? venusData.overview.content : activeSection === 'structure' ? venusData.structure.content : venusData.geology.content}
                sources={activeSection === 'overview' ? venusData.overview.source : activeSection === 'structure' ? venusData.structure.source : venusData.geology.source}
              />
              <Content setActiveSection={setActiveSection} activeSection={activeSection} />
            </div>
          </div>
          <PlanetStats 
            rotationTime={venusData.rotation}
            revolutionTime={venusData.revolution}
            radius={venusData.radius}
            averageTemp={venusData.temperature}
          />
        </div>
      </div>
    </div>
  );
}

export default Venus;