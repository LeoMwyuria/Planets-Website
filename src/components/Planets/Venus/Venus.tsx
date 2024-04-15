// Venus.tsx
import React, { useState } from 'react';
import Header from '../../Header/Header';
import Content from '../../Content/Content';
import Information from '../../Information/Information';
import data from '../../../data/data.json';
import overviewVenus from '../../../assets/planet-venus.svg';
import internalVenus from '../../../assets/planet-venus-internal.svg';
import geologyVenus from '../../../assets/geology-venus.png';

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

const Venus: React.FC = () => {
  const venusData: Planet | undefined = data.find((planet: Planet) => planet.name === "Venus");
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'geology'>('overview');

  if (!venusData) {
    return <div>No data found for Venus</div>;
  }

  return (
    <div className='main'>
      <Header />
      <Content setActiveSection={setActiveSection} activeSection={activeSection} />
      <Information 
        imageSrc={activeSection === 'geology' ? geologyVenus : activeSection === 'overview' ? overviewVenus : internalVenus} 
        sources={activeSection === 'overview' ? venusData.overview.source : activeSection === 'structure' ? venusData.structure.source : venusData.geology.source}
        heading="Venus" 
        paragraph={activeSection === 'overview' ? venusData.overview.content : activeSection === 'structure' ? venusData.structure.content : venusData.geology.content}
        rotationTime={venusData.rotation} 
        revolutionTime={venusData.revolution} 
        radius={venusData.radius} 
        averageTemp={venusData.temperature} 
      />
    </div>
  );
}

export default Venus;
