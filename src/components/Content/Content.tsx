import React from 'react';

interface ContentProps {
  setActiveSection: (section: 'overview' | 'structure' | 'geology') => void;
  activeSection: 'overview' | 'structure' | 'geology';
}

const Content: React.FC<ContentProps> = ({ setActiveSection, activeSection }) => {
  return (
    <div className='content'>
      <button
        className={`section ${activeSection === 'overview' ? 'active' : ''}`}
        onClick={() => setActiveSection('overview')}
      >
        OVERVIEW
      </button>
      <button
        className={`section ${activeSection === 'structure' ? 'active' : ''}`}
        onClick={() => setActiveSection('structure')}
      >
        STRUCTURE
      </button>
      <button
        className={`section ${activeSection === 'geology' ? 'active' : ''}`}
        onClick={() => setActiveSection('geology')}
      >
        GEOLOGY
      </button>
    </div>
  );
};

export default Content;