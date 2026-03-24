import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Animate the progress bar
    const tl = gsap.timeline({
      onComplete: () => setReady(true),
    });

    tl.to(progressRef.current, {
      width: '100%',
      duration: 2.2,
      ease: 'power1.inOut',
      onUpdate: function () {
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round(this.progress() * 100)}%`;
        }
      },
    });

    // Animate decorative rings
    tl.fromTo('.preloader-ring',
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 0.3, duration: 1.5, ease: 'power2.out', stagger: 0.2 },
      0
    );

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    if (!ready) return;

    // Exit animation
    const tl = gsap.timeline({ onComplete });

    tl.to('.preloader-content', {
      y: -30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    })
    .to(preloaderRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    })
    .set(preloaderRef.current, { display: 'none' });
  }, [ready, onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      {/* Decorative orbit rings */}
      <div className="preloader-ring preloader-ring-1" />
      <div className="preloader-ring preloader-ring-2" />
      <div className="preloader-ring preloader-ring-3" />

      <div className="preloader-content">
        <h1 className="preloader-title">THE PLANETS</h1>
        <p className="preloader-subtitle">EXPLORING THE SOLAR SYSTEM</p>

        <div className="preloader-bar-track">
          <div className="preloader-bar-fill" ref={progressRef} />
        </div>

        <span className="preloader-percent" ref={percentRef}>0%</span>
      </div>
    </div>
  );
};

export default Preloader;
