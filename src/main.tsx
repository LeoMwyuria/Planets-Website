import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter, Outlet, useLocation } from 'react-router-dom'
import Menu from './components/menu/menu.tsx'
import './components/Header/header.css'
import './components/menu/menu.css'
import PlanetPage from './components/PlanetPage/PlanetPage.tsx'
import Preloader from './components/Preloader/Preloader.tsx'

const planetNames = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

/* ── Root layout — wraps all routes with preloader + transition overlay + sound init ── */
const RootLayout: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Outlet />
      </div>
      {/* Page transition overlay — targeted by TransitionLink */}
      <div
        id="page-transition-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 9998,
          pointerEvents: 'none',
          opacity: 0,
          display: 'none',
        }}
      />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      ...planetNames.map((name) => ({
        path: `/menu/${name}`,
        element: <PlanetPage planetName={name} />,
      })),
      {
        path: '*',
        element: (
          <div style={{ color: 'white', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Antonio' }}>
            <h1>Page not found</h1>
          </div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
