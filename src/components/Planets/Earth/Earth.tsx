// Earth.tsx
import React, { useState } from 'react';
import Header from '../../Header/Header';
import Content from '../../Content/Content';
import Information from '../../Information/Information';
import data from '../../../data/data.json';
import overviewEarth from '../../../assets/planet-earth.svg';
import internalEarth from '../../../assets/planet-earth-internal.svg';
import geologyEarth from '../../../assets/geology-earth.png';

interface Planet {
  name: string;
  overview: {
    content: string;
    source: string;
  };
  structure: {
    content: string;
    source: string;
  };
  geology: {
    content: string;
    source: string;
  };
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  images: {
    planet: string;
    internal: string;
    geology: string;
  };
}

const Earth: React.FC = () => {
  const earthData: Planet | undefined = data.find((planet: Planet) => planet.name === "Earth");
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');

  if (!earthData) {
    return <div>No data found for Earth</div>;
  }

  return (
    <div className='main'>
      <Header />
      <Content setActiveSection={setActiveSection} activeSection={activeSection} />
      <Information 
        imageSrc={activeSection === 'geology' ? geologyEarth : activeSection === 'overview' ? overviewEarth : internalEarth} 
        sources={activeSection === 'overview' ? earthData.overview.source : activeSection === 'structure' ? earthData.structure.source : earthData.geology.source}
        heading="Earth" 
        paragraph={activeSection === 'overview' ? earthData.overview.content : activeSection === 'structure' ? earthData.structure.content : earthData.geology.content}
        rotationTime={earthData.rotation} 
        revolutionTime={earthData.revolution} 
        radius={earthData.radius} 
        averageTemp={earthData.temperature} 
      />
    </div>
  );
}

export default Earth;
