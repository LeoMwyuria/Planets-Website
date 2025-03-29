import React from 'react';
import Header from '../Header/Header';
import MenuComponents from './menuComponents/menuComponents';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigation = useNavigate();
  
  const mercuryClick = () => {
    navigation("/menu/mercury")
  };
  
  const venusClick = () => {
    navigation("/menu/venus")
  };
  
  const earthClick = () => {
    navigation("/menu/earth")
  };
  
  const marsClick = () => {
    navigation("/menu/mars")
  };
  
  const jupiterClick = () => {
    navigation("/menu/jupiter")
  }
  
  const saturnClick = () => {
    navigation("/menu/saturn")
  }
  
  const uranusClick = () => {
    navigation("/menu/uranus")
  }
  
  const neptuneClick = () => {
    navigation("/menu/neptune")
  }

  return (
    <div className='menu-page'>
      <Header />
      <div className='grid-container'>
        <MenuComponents 
          p1='MERCURY'
          p2='>'
          classname='circle1'
          onclick={mercuryClick}
        />
        <MenuComponents 
          p1='VENUS'
          p2='>'
          classname='circle2'
          onclick={venusClick}
        />
        <MenuComponents 
          p1='EARTH'
          p2='>'
          classname='circle3'
          onclick={earthClick}
        />
        <MenuComponents 
          p1='MARS'
          p2='>'
          classname='circle4'
          onclick={marsClick}
        />
        <MenuComponents 
          p1='JUPITER'
          p2='>'
          classname='circle5'
          onclick={jupiterClick}
        />
        <MenuComponents 
          p1='SATURN'
          p2='>'
          classname='circle6'
          onclick={saturnClick}
        />
        <MenuComponents 
          p1='URANUS'
          p2='>'
          classname='circle7'
          onclick={uranusClick}
        />
        <MenuComponents 
          p1='NEPTUNE'
          p2='>'
          classname='circle8'
          onclick={neptuneClick}
        />
      </div>
    </div>
  );
};

export default Menu;