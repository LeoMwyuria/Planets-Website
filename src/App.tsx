import React, { useEffect, useRef } from 'react';
import Header from "./components/Header/Header";
import SolarSystem from './components/SolarSystem/SolarSystem';
import gsap from 'gsap';

function App() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade the whole scene in
      gsap.fromTo(wrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.inOut' }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden', opacity: 0 }}>
      <div style={{ position: 'absolute', width: '100%', zIndex: 10 }}>
        <Header />
      </div>
      <SolarSystem />
    </div>
  );
}

export default App;