// Mars.tsx
import React, { useState } from 'react';
import Header from '../../Header/Header';
import Content from '../../Content/Content';
import Information from '../../Information/Information';
import data from '../../../data/data.json';
import overviewMars from '../../../assets/planet-mars.svg';
import internalMars from '../../../assets/planet-mars-internal.svg';
import geologyMars from '../../../assets/geology-mars.png';

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

const Mars: React.FC = () => {
  const marsData: Planet | undefined = data.find((planet: Planet) => planet.name === "Mars");
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');

  if (!marsData) {
    return <div>No data found for Mars</div>;
  }

  return (
    <div className='main'>
      <Header />
      <Content setActiveSection={setActiveSection} activeSection={activeSection} />
      <Information 
        imageSrc={activeSection === 'geology' ? geologyMars : activeSection === 'overview' ? overviewMars : internalMars} 
        sources={activeSection === 'overview' ? marsData.overview.source : activeSection === 'structure' ? marsData.structure.source : marsData.geology.source}
        heading="Mars" 
        paragraph={activeSection === 'overview' ? marsData.overview.content : activeSection === 'structure' ? marsData.structure.content : marsData.geology.content}
        rotationTime={marsData.rotation} 
        revolutionTime={marsData.revolution} 
        radius={marsData.radius} 
        averageTemp={marsData.temperature} 
      />
    </div>
  );
}

export default Mars;
