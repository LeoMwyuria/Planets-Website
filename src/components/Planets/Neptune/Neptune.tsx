// Neptune.tsx
import React, { useState } from 'react';
import Header from '../../Header/Header';
import Content from '../../Content/Content';
import Information from '../../Information/Information';
import data from '../../../data/data.json';
import overviewNeptune from '../../../assets/planet-neptune.svg';
import internalNeptune from '../../../assets/planet-neptune-internal.svg';
import geologyNeptune from '../../../assets/geology-neptune.png';

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

const Neptune: React.FC = () => {
  const neptuneData: Planet | undefined = data.find((planet: Planet) => planet.name === "Neptune");
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');

  if (!neptuneData) {
    return <div>No data found for Neptune</div>;
  }

  return (
    <div className='main'>
      <Header />
      <Content setActiveSection={setActiveSection} activeSection={activeSection} />
      <Information 
        imageSrc={activeSection === 'geology' ? geologyNeptune : activeSection === 'overview' ? overviewNeptune : internalNeptune} 
        sources={activeSection === 'overview' ? neptuneData.overview.source : activeSection === 'structure' ? neptuneData.structure.source : neptuneData.geology.source}
        heading="Neptune" 
        paragraph={activeSection === 'overview' ? neptuneData.overview.content : activeSection === 'structure' ? neptuneData.structure.content : neptuneData.geology.content}
        rotationTime={neptuneData.rotation} 
        revolutionTime={neptuneData.revolution} 
        radius={neptuneData.radius} 
        averageTemp={neptuneData.temperature} 
      />
    </div>
  );
}

export default Neptune;
