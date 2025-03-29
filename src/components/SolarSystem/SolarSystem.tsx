import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Stars, Html } from '@react-three/drei';
import { Mesh } from 'three';
import * as THREE from 'three';
import { planetConfigs, planetTextures } from '../PlanetConfig/PlanetConfig';
import { useNavigate } from 'react-router-dom';

const StarBackground: React.FC = () => {
  return (
    <Stars
    radius={100}
    depth={50}
    count={3000} 
    factor={4}
    saturation={0}
    fade
    speed={0.5}
  />
  );
};

const Sun: React.FC = () => {
  const sunRef = useRef<Mesh>(null);
  const sunTexture = useTexture(planetTextures.sun, (texture) => {
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;
  });

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial 
        map={sunTexture}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
};

const Planet: React.FC<{
    radius: number;
    texture: string;
    size: number;
    speed: number;
    name: string;
  }> = ({ radius, texture, size, speed, name }) => {
    const planetRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const navigation = useNavigate();
    const initialOffset = React.useMemo(() => {
      return name.charCodeAt(0) * Math.PI / 4;
    }, [name]);
    
    const planetTexture = useTexture(texture);
  
    const handlePlanetClick = () => {
      navigation(`/menu/${name.toLowerCase()}`);
    };
  
    useFrame(({ clock }) => {
      if (planetRef.current) {
        const time = clock.getElapsedTime() + initialOffset;
        planetRef.current.position.x = Math.cos(time * speed) * radius;
        planetRef.current.position.z = Math.sin(time * speed) * radius;
        planetRef.current.rotation.y += 0.005;
        if (hovered) {
          planetRef.current.scale.setScalar(1.1);
        } else {
          planetRef.current.scale.setScalar(1);
        }
      }
    });
  
    return (
        <group onClick={handlePlanetClick}>
          <mesh 
            ref={planetRef}
            onPointerOver={() => {
              setHovered(true);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHovered(false);
              document.body.style.cursor = 'auto';
            }}
          >
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial 
              map={planetTexture}
              metalness={0.2}
              roughness={0.8}
            />
            {hovered && (
              <Html>
                <div style={{ 
                  color: 'white', 
                  background: 'rgba(0,0,0,0.8)', 
                  padding: '5px',
                  borderRadius: '4px',
                  transform: 'translateY(-20px)'
                }}>
                  {name}
                </div>
              </Html>
            )}
          </mesh>
        </group>
      );
  };
  
const PerformanceOptimizer: React.FC = () => {
    useThree(({ gl }) => {
      gl.setPixelRatio(1);
    });
    return null;
  };
  
  const SolarSystem: React.FC = () => {
    return (
      <div style={{ width: '100%', height: '100%', background: '#000000' }}>
        <Canvas
        camera={{ position: [0, 50, 100], fov: 60 }}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
        }}
        dpr={1}
      >
          <PerformanceOptimizer />
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={2} />
          <Stars
            radius={100}
            depth={50}
            count={1500}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          <Sun />
          
          {planetConfigs.map((planet, index) => (
            <Planet
              key={planet.name}
              name={planet.name}
              radius={planet.distance}
              texture={planet.texture}
              size={planet.size}
              speed={0.15 / (index + 1)}
            />
          ))}
          
          <OrbitControls 
            enableDamping={false}
            rotateSpeed={0.5}
            zoomSpeed={0.5}
            minDistance={20}
            maxDistance={300}
          />
        </Canvas>
      </div>
    );
  };

export default SolarSystem;