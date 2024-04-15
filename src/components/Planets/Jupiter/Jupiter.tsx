// Jupiter.tsx
import React, { useState } from 'react';
import Header from '../../Header/Header';
import Content from '../../Content/Content';
import Information from '../../Information/Information';
import data from '../../../data/data.json';
import overviewJupiter from '../../../assets/planet-jupiter.svg';
import internalJupiter from '../../../assets/planet-jupiter-internal.svg';
import geologyJupiter from '../../../assets/geology-jupiter.png';

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

const Jupiter: React.FC = () => {
  const jupiterData: Planet | undefined = data.find((planet: Planet) => planet.name === "Jupiter");
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');

  if (!jupiterData) {
    return <div>No data found for Jupiter</div>;
  }

  return (
    <div className='main'>
      <Header />
      <Content setActiveSection={setActiveSection} activeSection={activeSection} />
      <Information 
        imageSrc={activeSection === 'geology' ? geologyJupiter : activeSection === 'overview' ? overviewJupiter : internalJupiter} 
        sources={activeSection === 'overview' ? jupiterData.overview.source : activeSection === 'structure' ? jupiterData.structure.source : jupiterData.geology.source}
        heading="Jupiter" 
        paragraph={activeSection === 'overview' ? jupiterData.overview.content : activeSection === 'structure' ? jupiterData.structure.content : jupiterData.geology.content}
        rotationTime={jupiterData.rotation} 
        revolutionTime={jupiterData.revolution} 
        radius={jupiterData.radius} 
        averageTemp={jupiterData.temperature} 
      />
    </div>
  );
}

export default Jupiter;
