import React from 'react';

interface InformationProps {
  imageSrc: string;
  
  heading: string;
  paragraph: string;
  rotationTime: string;
  revolutionTime: string;
  radius: string;
  averageTemp: string;
  sources: string;
}

const Information: React.FC<InformationProps> = ({
  imageSrc,
  
  heading,
  paragraph,
  rotationTime,
  revolutionTime,
  radius,
  averageTemp,
  sources,
}) => {
  return (
    <div>
      <div className='content1'>
        <img className='image' src={imageSrc} alt='' />
        <div className='planetText'>
        <h1 className='h1'>{heading}</h1>
        <p>{paragraph}</p>
        <a className='wikipedia' href={sources}>Wikipedia</a>
        </div>
        
      </div>
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
    </div>
  );
};

export default Information;
