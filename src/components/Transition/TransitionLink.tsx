import React, { useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface TransitionLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * A link that triggers a GSAP page-out transition before navigating.
 * Wrap around any clickable element that should navigate with a transition.
 */
const TransitionLink: React.FC<TransitionLinkProps> = ({ to, children, className, style, onClick }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    onClick?.();

    const overlay = document.getElementById('page-transition-overlay');
    if (!overlay) {
      navigate(to);
      return;
    }

    gsap.timeline()
      .set(overlay, { display: 'block' })
      .fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.in' }
      )
      .call(() => {
        navigate(to);
      })
      .to(overlay,
        { opacity: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 }
      )
      .set(overlay, { display: 'none' });
  }, [to, navigate, onClick]);

  return (
    <div className={className} style={{ ...style, cursor: 'pointer' }} onClick={handleClick}>
      {children}
    </div>
  );
};

export default TransitionLink;
