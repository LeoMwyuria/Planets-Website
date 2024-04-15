// Saturn.tsx
import React, { useState } from 'react';
import Header from '../../Header/Header';
import Content from '../../Content/Content';
import Information from '../../Information/Information';
import data from '../../../data/data.json';
import overviewSaturn from '../../../assets/planet-saturn.svg';
import internalSaturn from '../../../assets/planet-saturn-internal.svg';
import geologySaturn from '../../../assets/geology-saturn.png';

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

const Saturn: React.FC = () => {
  const saturnData: Planet | undefined = data.find((planet: Planet) => planet.name === "Saturn");
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');

  if (!saturnData) {
    return <div>No data found for Saturn</div>;
  }

  return (
    <div className='main'>
      <Header />
      <Content setActiveSection={setActiveSection} activeSection={activeSection} />
      <Information 
        imageSrc={activeSection === 'geology' ? geologySaturn : activeSection === 'overview' ? overviewSaturn : internalSaturn} 
        sources={activeSection === 'overview' ? saturnData.overview.source : activeSection === 'structure' ? saturnData.structure.source : saturnData.geology.source}
        heading="Saturn" 
        paragraph={activeSection === 'overview' ? saturnData.overview.content : activeSection === 'structure' ? saturnData.structure.content : saturnData.geology.content}
        rotationTime={saturnData.rotation} 
        revolutionTime={saturnData.revolution} 
        radius={saturnData.radius} 
        averageTemp={saturnData.temperature} 
      />
    </div>
  );
}

export default Saturn;
