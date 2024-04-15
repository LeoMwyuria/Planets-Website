// Content.tsx
import React from 'react';

interface ContentProps {
  setActiveSection: (section: 'overview' | 'structure' | 'geology') => void;
  activeSection: 'overview' | 'structure' | 'geology';
}

const Content: React.FC<ContentProps> = ({ setActiveSection, activeSection }) => {
  return (
    <div className='content'>
      <div
        className={`section ${activeSection === 'overview' ? 'active' : ''}`}
        onClick={() => setActiveSection('overview')}
      >
        OVERVIEW
      </div>
      <div
        className={`section ${activeSection === 'structure' ? 'active' : ''}`}
        onClick={() => setActiveSection('structure')}
      >
        STRUCTURE
      </div>
      <div
        className={`section ${activeSection === 'geology' ? 'active' : ''}`}
        onClick={() => setActiveSection('geology')}
      >
        GEOLOGY
      </div>
    </div>
  );
};

export default Content;
