import React, { useState } from 'react';
import menu from '../../assets/menu.png';
import { useNavigate } from 'react-router-dom';
import MenuComponentsDesktop from '../menu/menuComponents/menuComponentsDesktop';


React

const Header = () => {
  const [menuClicked, setMenuClicked] = useState(false);
  const navigation = useNavigate();

  const toggleMenuClick = () => {
    if (!menuClicked) {
      navigation("/menu");
      setMenuClicked(true);
    } else if (menuClicked) {
      navigation("/");
      setMenuClicked(false);
    }
  };
  const mercuryClick = () => {
    navigation("/menu/mercury")
    };
    const venusClick = () =>{
        navigation("/menu/venus")
    };
    const earthClick = () =>{
        navigation("/menu/earth")
    };
    const marsClick = () =>{
        navigation("/menu/mars")
    };
    const jupiterClick = () =>{
        navigation("/menu/jupiter")
    }
    const saturnClick = () =>{
        navigation("/menu/saturn")
    }
    const uranusClick = () =>{
        navigation("/menu/uranus")
    }
    const neptuneClick = () =>{
        navigation("/menu/neptune")
    }

  return (
    <div className='header'>
      <p>THE PLANETS</p>
      <div className='header2'>
      <MenuComponentsDesktop
        p1='MERCURY'
       
        
        onclick={mercuryClick}
        
        />
         <MenuComponentsDesktop
        p1='VENUS'
      
        onclick={venusClick}
        
        />
         <MenuComponentsDesktop
        p1='EARTH'
       
        onclick={earthClick}
        
        />
         <MenuComponentsDesktop
        p1='MARS'
       
       
        onclick={marsClick}
        
        />
         <MenuComponentsDesktop
        p1='JUPITER'
      
        
        onclick={jupiterClick}
        
        />
         <MenuComponentsDesktop
        p1='SATURN'
       
        
        onclick={saturnClick}
        
        />
         <MenuComponentsDesktop
        p1='URANUS'
      
        
        onclick={uranusClick}
        
        />
         <MenuComponentsDesktop
        p1='NEPTUNE'
        
        
        onclick={neptuneClick}
        
        />
    
   
      <div className='menu' onClick={toggleMenuClick}>
        <img src={menu} alt="" />
      </div>

      </div>
      
    </div>
  );
};

export default Header;
