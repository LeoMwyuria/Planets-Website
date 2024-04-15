// Mercury.tsx
import React, { useState } from 'react';
import Header from '../../Header/Header';
import Content from '../../Content/Content';
import Information from '../../Information/Information';
import data from '../../../data/data.json';
import overviewMercury from '../../../assets/planet-mercury.svg';
import internalMercury from '../../../assets/planet-mercury-internal.svg'
import geologyMercury from '../../../assets/geology-mercury.png'

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

const Mercury: React.FC = () => {
  const mercuryData: Planet | undefined = data.find((planet: Planet) => planet.name === "Mercury");
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');

  if (!mercuryData) {
    return <div>No data found for Mercury</div>;
  }

  return (
    <div className='main'>
      <Header />
      <Content setActiveSection={setActiveSection} activeSection={activeSection} />
      <Information 
        imageSrc={activeSection === 'geology' ? geologyMercury : activeSection === 'overview' ? overviewMercury : internalMercury} 
        sources={activeSection === 'overview' ? mercuryData.overview.source : activeSection === 'structure' ? mercuryData.structure.source : mercuryData.geology.source}
        heading="Mercury" 
        paragraph={activeSection === 'overview' ? mercuryData.overview.content : activeSection === 'structure' ? mercuryData.structure.content : mercuryData.geology.content}
        rotationTime={mercuryData.rotation} 
        revolutionTime={mercuryData.revolution} 
        radius={mercuryData.radius} 
        averageTemp={mercuryData.temperature} 
      />
    </div>
  );
}

export default Mercury;
