import React from 'react';

interface MenuComponentsDesktopProps {
  p1: string;
 
 
  onclick: () => void;
 
}

const MenuComponentsDesktop: React.FC<MenuComponentsDesktopProps> = ({ p1, onclick }) => {
  return (
    <div className='header2'>
        <div onClick={onclick} className='flex-container3'>
        <div className='p3'>{p1}</div>

        </div>
      
       
      
  
      
    
    

    </div>
    
  );
};

export default MenuComponentsDesktop;
