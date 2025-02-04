import React from 'react';
import './PlanetInfo.css';

interface PlanetInfoProps {
  heading: string;
  paragraph: string;
  sources: string;
}

const PlanetInfo: React.FC<PlanetInfoProps> = ({
  heading,
  paragraph,
  sources,
}) => {
  return (
    <div className='content1'>
      <div className='planetText'>
        <h1 className='h1'>{heading}</h1>
        <p style={{height:'130px'}}>{paragraph}</p>
        <a className='wikipedia' href={sources}>Wikipedia</a>
      </div>
    </div>
  );
};

export default PlanetInfo;