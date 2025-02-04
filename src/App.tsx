import React from 'react';
import Header from "./components/Header/Header";
import SolarSystem from './components/SolarSystem/SolarSystem';

function App() {
  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', width: '100%', zIndex: 10 }}>
        <Header />
      </div>
      <SolarSystem />
    </div>
  );
}

export default App;