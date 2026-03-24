import React, { useEffect, useRef } from 'react';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import gsap from 'gsap';
import TransitionLink from '../Transition/TransitionLink';

const planets = [
  { name: 'Mercury', color: '#DEF4FC', size: '36px' },
  { name: 'Venus', color: '#F7CC7F', size: '42px' },
  { name: 'Earth', color: '#545BFE', size: '44px' },
  { name: 'Mars', color: '#FF6A45', size: '38px' },
  { name: 'Jupiter', color: '#ECAD7A', size: '56px' },
  { name: 'Saturn', color: '#FCCB6B', size: '52px' },
  { name: 'Uranus', color: '#65F0D5', size: '48px' },
  { name: 'Neptune', color: '#497EFA', size: '48px' },
];

const Menu = () => {
  const navigation = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-planet-card',
        { x: -60, opacity: 0, scale: 0.9 },
        {
          x: 0, opacity: 1, scale: 1,
          duration: 0.6,
          ease: 'back.out(1.4)',
          stagger: { each: 0.08, from: 'start' },
          delay: 0.2,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="menu-page" ref={containerRef}>
      {/* Starfield background */}
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
        <Stars radius={300} depth={80} count={2500} factor={6} saturation={0.1} fade speed={0.5} />
      </Canvas>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <div className="grid-container">
          {planets.map((planet) => (
            <TransitionLink
              key={planet.name}
              to={`/menu/${planet.name.toLowerCase()}`}
              className="menu-planet-card"
              style={{ '--card-accent': planet.color } as React.CSSProperties}
            >
              <div
                className="menu-planet-circle"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${planet.color}dd, ${planet.color}44)`,
                  width: planet.size,
                  height: planet.size,
                  boxShadow: `0 0 20px ${planet.color}40`,
                }}
              />
              <span className="menu-planet-name">{planet.name}</span>
              <span className="menu-planet-arrow">→</span>
            </TransitionLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;