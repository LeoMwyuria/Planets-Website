// Uranus.tsx
import React, { useState } from 'react';
import Header from '../../Header/Header';
import Content from '../../Content/Content';
import Information from '../../Information/Information';
import data from '../../../data/data.json';
import overviewUranus from '../../../assets/planet-uranus.svg';
import internalUranus from '../../../assets/planet-uranus-internal.svg';
import geologyUranus from '../../../assets/geology-uranus.png';

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

const Uranus: React.FC = () => {
  const uranusData: Planet | undefined = data.find((planet: Planet) => planet.name === "Uranus");
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');

  if (!uranusData) {
    return <div>No data found for Uranus</div>;
  }

  return (
    <div className='main'>
      <Header />
      <Content setActiveSection={setActiveSection} activeSection={activeSection} />
      <Information 
        imageSrc={activeSection === 'geology' ? geologyUranus : activeSection === 'overview' ? overviewUranus : internalUranus} 
        sources={activeSection === 'overview' ? uranusData.overview.source : activeSection === 'structure' ? uranusData.structure.source : uranusData.geology.source}
        heading="Uranus" 
        paragraph={activeSection === 'overview' ? uranusData.overview.content : activeSection === 'structure' ? uranusData.structure.content : uranusData.geology.content}
        rotationTime={uranusData.rotation} 
        revolutionTime={uranusData.revolution} 
        radius={uranusData.radius} 
        averageTemp={uranusData.temperature} 
      />
    </div>
  );
}

export default Uranus;
