import React from 'react';

interface PlanetStatsProps {
  rotationTime: string;
  revolutionTime: string;
  radius: string;
  averageTemp: string;
}

const PlanetStats: React.FC<PlanetStatsProps> = ({
  rotationTime,
  revolutionTime,
  radius,
  averageTemp,
}) => {
  return (
    <div className='content2'>
      <div className='content2-item'>
        <p>ROTATION TIME</p>
        <p>{rotationTime}</p>
      </div>
      <div className='content2-item'>
        <p>REVOLUTION TIME</p>
        <p>{revolutionTime}</p>
      </div>
      <div className='content2-item'>
        <p>RADIUS</p>
        <p>{radius}</p>
      </div>
      <div className='content2-item'>
        <p>AVERAGE TEMP</p>
        <p>{averageTemp}</p>
      </div>
    </div>
  );
};

export default PlanetStats;