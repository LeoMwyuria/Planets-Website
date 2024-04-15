import React from 'react';

interface MenuComponentsProps {
  p1: string;
  p2: string;
  classname: string;
  onclick: () => void;
 
}

const MenuComponents: React.FC<MenuComponentsProps> = ({ p1, p2, classname, onclick }) => {
  return (
    <div onClick={onclick} className='flex-container'>
      <div className='flex-container2'>
        <div className={classname}></div>
        <div className='p1'>{p1}</div>
        
      </div>
      <p>{p2}</p>
    </div>
  );
};

export default MenuComponents;
