import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import Header from '../Header/Header';
import Content from '../Content/Content';
import data from '../../data/data.json';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import { PlanetName, planetTextures } from '../PlanetConfig/PlanetConfig';
import * as THREE from 'three';
import PlanetStats from '../Information/PlanetStats';
import PlanetInfo from '../Information/PlanetInfo';
import gsap from 'gsap';
import './PlanetPage.css';

interface PlanetData {
  name: string;
  overview: { content: string; source: string };
  structure: { content: string; source: string };
  geology: { content: string; source: string };
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  images: { planet: string; internal: string; geology: string };
}

/* ── Planet accent colors ── */
const planetColors: Record<string, string> = {
  mercury: '#DEF4FC',
  venus: '#F7CC7F',
  earth: '#545BFE',
  mars: '#FF6A45',
  jupiter: '#ECAD7A',
  saturn: '#FCCB6B',
  uranus: '#65F0D5',
  neptune: '#497EFA',
};

/* ── Saturn ring for detail view ── */
const DetailSaturnRing: React.FC = () => {
  const ringGeo = useMemo(() => {
    const geo = new THREE.RingGeometry(2.8, 4.2, 64);
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      uv.setXY(i, (dist - 2.8) / 1.4, 0.5);
    }
    return geo;
  }, []);

  return (
    <mesh geometry={ringGeo} rotation={[-Math.PI / 2.5, 0, 0]}>
      <meshStandardMaterial
        color="#c4a96a"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
        roughness={0.85}
      />
    </mesh>
  );
};

/* ── Atmosphere glow shell ── */
const AtmosphereGlow: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <mesh>
    <sphereGeometry args={[size * 1.08, 32, 32]} />
    <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.BackSide} />
  </mesh>
);

/* ── 3D Planet mesh for detail view ── */
const PlanetMesh: React.FC<{ planetName: PlanetName; accentColor: string }> = ({ planetName, accentColor }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const planetTexture = useTexture(planetTextures[planetName]);
  const isSaturn = planetName === 'saturn';
  const hasAtmosphere = ['earth', 'venus', 'neptune', 'uranus'].includes(planetName);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          metalness={0.1}
          roughness={0.75}
        />
      </mesh>
      {hasAtmosphere && <AtmosphereGlow size={2} color={accentColor} />}
      {isSaturn && <DetailSaturnRing />}
    </group>
  );
};

/* ── Starfield background (single shared Canvas) ── */
const StarField: React.FC = () => (
  <Canvas
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}
    dpr={1}
  >
    <Stars radius={300} depth={80} count={3000} factor={6} saturation={0.1} fade speed={0.5} />
  </Canvas>
);

/* ── Loading spinner ── */
const LoadingSpinner: React.FC<{ color: string }> = ({ color }) => (
  <div className="planet-loading">
    <div className="planet-loading-ring" style={{ borderTopColor: color }} />
    <span>Loading...</span>
  </div>
);

/* ── Main PlanetPage component ── */
interface PlanetPageProps {
  planetName: string;
}

const PlanetPage: React.FC<PlanetPageProps> = ({ planetName }) => {
  const planetKey = planetName.toLowerCase() as PlanetName;
  const planetData: PlanetData | undefined = data.find(
    (p: PlanetData) => p.name.toLowerCase() === planetKey
  );
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');
  const accentColor = planetColors[planetKey] || '#419EBB';
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Planet viewer fades in
      tl.fromTo('.planet-viewer',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        0
      );

      // Info card slides in from right
      tl.fromTo('.planet-info-card',
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.2
      );

      // Planet name reveal
      tl.fromTo('.planet-name',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.3
      );

      // Description fades in
      tl.fromTo('.planet-description',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0.5
      );

      // Section buttons stagger in
      tl.fromTo('.planet-section-btn',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        0.5
      );

      // Stats cards fly up
      tl.fromTo('.planet-stat-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        0.8
      );
    }, pageRef);
    return () => ctx.revert();
  }, [planetName]);

  if (!planetData) {
    return (
      <div className="planet-page" style={{ color: 'white', textAlign: 'center', paddingTop: '200px' }}>
        <h1>Planet not found</h1>
      </div>
    );
  }

  const currentContent = planetData[activeSection].content;
  const currentSource = planetData[activeSection].source;
  const cameraZ = planetKey === 'saturn' ? 11 : 7;

  return (
    <div className="planet-page" ref={pageRef}>
      <StarField />

      <div className="planet-page-content">
        <Header />

        <div className="planet-page-body">
          {/* 3D Planet viewer */}
          <div className="planet-viewer">
            <Suspense fallback={<LoadingSpinner color={accentColor} />}>
              <Canvas
                key={planetKey}
                camera={{ position: [0, 0, cameraZ], fov: 45 }}
                style={{ background: 'transparent' }}
                dpr={[1, 1.5]}
              >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -5, -10]} intensity={0.3} color="#4466ff" />
                <PlanetMesh planetName={planetKey} accentColor={accentColor} />
                <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} enableDamping dampingFactor={0.05} />
              </Canvas>
            </Suspense>
          </div>

          {/* Info panel */}
          <div className="planet-info-panel">
            <div className="planet-info-card" style={{ borderColor: `${accentColor}30` }}>
              <h1 className="planet-name" style={{ color: accentColor }}>{planetData.name}</h1>
              <p className="planet-description">{currentContent}</p>
              <a
                className="planet-source"
                href={currentSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source: Wikipedia ↗
              </a>
            </div>

            <div className="planet-sections">
              {(['overview', 'structure', 'geology'] as const).map((section, i) => (
                <button
                  key={section}
                  className={`planet-section-btn ${activeSection === section ? 'active' : ''}`}
                  style={{
                    '--accent': accentColor,
                    '--accent-dim': `${accentColor}20`,
                  } as React.CSSProperties}
                  onClick={() => setActiveSection(section)}
                >
                  <span className="section-number">0{i + 1}</span>
                  <span className="section-label">{section.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="planet-stats-bar">
          {[
            { label: 'ROTATION TIME', value: planetData.rotation },
            { label: 'REVOLUTION TIME', value: planetData.revolution },
            { label: 'RADIUS', value: planetData.radius },
            { label: 'AVERAGE TEMP.', value: planetData.temperature },
          ].map((stat) => (
            <div
              key={stat.label}
              className="planet-stat-card"
              style={{ borderColor: `${accentColor}25` }}
            >
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanetPage;
