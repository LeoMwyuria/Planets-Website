import { useState, useEffect, useRef } from 'react';
import menu from '../../assets/menu.png';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import TransitionLink from '../Transition/TransitionLink';

const planetNames = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'] as const;

const planetAccent: Record<string, string> = {
  mercury: '#DEF4FC',
  venus: '#F7CC7F',
  earth: '#545BFE',
  mars: '#FF6A45',
  jupiter: '#ECAD7A',
  saturn: '#FCCB6B',
  uranus: '#65F0D5',
  neptune: '#497EFA',
};

const Header = () => {
  const [menuClicked, setMenuClicked] = useState(false);
  const navigation = useNavigate();
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo('.header-planet-btn',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.06, delay: 0.3 }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  const toggleMenuClick = () => {
    const overlay = document.getElementById('page-transition-overlay');
    const target = !menuClicked ? '/menu' : '/';

    if (!overlay) {
      navigation(target);
      setMenuClicked(!menuClicked);
      return;
    }

    gsap.timeline()
      .set(overlay, { display: 'block' })
      .fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.in' })
      .call(() => {
        navigation(target);
        setMenuClicked(!menuClicked);
      })
      .to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 })
      .set(overlay, { display: 'none' });
  };

  const isActivePlanet = (name: string) => location.pathname === `/menu/${name}`;

  return (
    <div className="header" ref={headerRef}>
      <div className="header-left" ref={logoRef}>
        <TransitionLink to="/">
          <p>THE PLANETS</p>
        </TransitionLink>
        <p className="interaction-text">Explore the solar system</p>
      </div>
      <div className="header-nav" ref={navRef}>
        {planetNames.map((name) => (
          <TransitionLink key={name} to={`/menu/${name}`}>
            <button
              className={`header-planet-btn ${isActivePlanet(name) ? 'active' : ''}`}
              style={{ '--planet-color': planetAccent[name] } as React.CSSProperties}
            >
              {name.toUpperCase()}
            </button>
          </TransitionLink>
        ))}
        <div className="menu" onClick={toggleMenuClick}>
          <img src={menu} alt="Menu" />
        </div>
      </div>
    </div>
  );
};

export default Header;
