import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, useTexture, Stars, Html, Line } from '@react-three/drei';
import { Mesh, BufferGeometry, Float32BufferAttribute } from 'three';
import * as THREE from 'three';
import { planetConfigs, planetTextures } from '../PlanetConfig/PlanetConfig';
import { useNavigate } from 'react-router-dom';

/* ── Orbital ring drawn as a thin circle at each planet's distance ── */
const OrbitRing: React.FC<{ radius: number }> = ({ radius }) => {
  const points = useMemo(() => {
    const segments = 128;
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return pts;
  }, [radius]);

  return (
    <Line points={points} color="#6688cc" lineWidth={1} transparent opacity={0.2} />
  );
};

/* ── Sun with emissive glow ── */
const Sun: React.FC = () => {
  const sunRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const sunTexture = useTexture(planetTextures.sun);

  useFrame(({ clock }) => {
    if (sunRef.current) sunRef.current.rotation.y += 0.001;
    if (glowRef.current) {
      const pulse = 1.0 + Math.sin(clock.getElapsedTime() * 0.8) * 0.03;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Core sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          map={sunTexture}
          emissive="#ff6600"
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>
      {/* Glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[6.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

/* ── Saturn's ring ── */
const SaturnRing: React.FC = () => {
  const ringGeo = useMemo(() => {
    const geo = new THREE.RingGeometry(3.0, 4.5, 64);
    // rotate UVs so texture wraps properly
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      uv.setXY(i, (dist - 3.0) / 1.5, 0.5);
    }
    return geo;
  }, []);

  return (
    <mesh geometry={ringGeo} rotation={[-Math.PI / 2.5, 0, 0]}>
      <meshStandardMaterial
        color="#c4a96a"
        transparent
        opacity={0.55}
        side={THREE.DoubleSide}
        roughness={0.9}
      />
    </mesh>
  );
};



/* ── Individual planet in the solar system ── */
const Planet: React.FC<{
  radius: number;
  texture: string;
  size: number;
  speed: number;
  name: string;
  hasSaturnRing?: boolean;
}> = ({ radius, texture, size, speed, name, hasSaturnRing }) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const navigation = useNavigate();
  const initialOffset = useMemo(() => name.charCodeAt(0) * Math.PI / 4, [name]);
  const planetTexture = useTexture(texture, (tex) => {
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 16;
    tex.colorSpace = THREE.SRGBColorSpace;
  });
  const scaleRef = useRef(1);

  const handlePlanetClick = () => {
    navigation(`/menu/${name.toLowerCase()}`);
  };

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() + initialOffset;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(time * speed) * radius;
      groupRef.current.position.z = Math.sin(time * speed) * radius;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005;
      // Smooth scale transition on hover
      const target = hovered ? 1.2 : 1;
      scaleRef.current += (target - scaleRef.current) * 0.1;
      planetRef.current.scale.setScalar(scaleRef.current);
    }
  });

  return (
    <group ref={groupRef} onClick={handlePlanetClick}>
      <mesh
        ref={planetRef}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      {hasSaturnRing && <SaturnRing />}
      {hovered && (
        <Html center style={{ pointerEvents: 'none' }}>
          <div style={{
            color: 'white',
            background: 'rgba(10,10,30,0.9)',
            backdropFilter: 'blur(10px)',
            padding: '10px 22px',
            borderRadius: '10px',
            fontSize: '28px',
            fontFamily: 'Antonio, sans-serif',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.3)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            transform: 'translateY(-50px)',
          }}>
            {name}
          </div>
        </Html>
      )}
    </group>
  );
};

/* ── Performance optimizer ── */
const PerformanceOptimizer: React.FC = () => {
  useThree(({ gl }) => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  });
  return null;
};

/* ── Planet extra config for creative features ── */
const planetExtras: Record<string, { hasSaturnRing?: boolean }> = {
  saturn: { hasSaturnRing: true },
};

/* ── Main Solar System scene ── */
const SolarSystem: React.FC = () => {
  const [showOrbits, setShowOrbits] = useState(true);

  return (
    <div style={{ width: '100%', height: '100%', background: '#000000', position: 'relative' }}>
      {/* Orbit toggle button */}
      <button
        onClick={() => setShowOrbits((v) => !v)}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          zIndex: 20,
          background: showOrbits ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${showOrbits ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 8,
          padding: '10px 18px',
          color: showOrbits ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
          fontFamily: 'Antonio, sans-serif',
          fontSize: 12,
          letterSpacing: 2,
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease',
        }}
      >
        {showOrbits ? 'ORBITS ON' : 'ORBITS OFF'}
      </button>

      <Canvas
        camera={{ position: [0, 50, 100], fov: 60 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <PerformanceOptimizer />
          <ambientLight intensity={0.8} />
          <pointLight position={[0, 0, 0]} intensity={4} color="#fff5e0" />
          <pointLight position={[0, 40, 60]} intensity={0.6} color="#ffffff" />
          <Stars radius={200} depth={80} count={3000} factor={5} saturation={0.15} fade speed={0.3} />
          <Sun />

          {/* Orbital path rings */}
          {showOrbits && planetConfigs.map((planet) => (
            <OrbitRing key={`orbit-${planet.name}`} radius={planet.distance} />
          ))}

          {/* Planets */}
          {planetConfigs.map((planet) => (
            <Planet
              key={planet.name}
              name={planet.name}
              radius={planet.distance}
              texture={planet.texture}
              size={planet.size}
              speed={planet.speed}
              hasSaturnRing={planetExtras[planet.name]?.hasSaturnRing}
            />
          ))}

          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.5}
            zoomSpeed={0.6}
            minDistance={15}
            maxDistance={250}
            maxPolarAngle={Math.PI * 0.85}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SolarSystem;