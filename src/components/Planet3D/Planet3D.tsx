import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import { Mesh } from 'three';
import { PlanetName, planetTextures } from '../PlanetConfig/PlanetConfig';


const PlanetMesh: React.FC<{ planetName: PlanetName; size: number }> = ({ planetName, size }) => {
  const planetRef = React.useRef<Mesh>(null);
  const planetTexture = useTexture(planetTextures[planetName]);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={planetTexture} />
    </mesh>
  );
};

interface Planet3DProps {
  planetName: PlanetName;
  size?: number;
}

const Planet3D: React.FC<Planet3DProps> = ({ planetName, size = 2 }) => {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#000000' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars 
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <PlanetMesh planetName={planetName} size={size} />
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
};

export default Planet3D;