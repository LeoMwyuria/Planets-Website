import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Menu from './components/menu/menu.tsx'
import './/components/Header/header.css'
import './/components/menu/menu.css'

import Mercury from './pages/Mercury/Mercury.tsx'
import "./components/Content/content.css"
import './components/Information/information.css'
import Venus from './pages/Venus/Venus.tsx'
import Earth from './pages/Earth/Earth.tsx'
import Mars from './pages/Mars/Mars.tsx'
import Jupiter from './pages/Jupiter/Jupiter.tsx'
import Saturn from './pages/Saturn/Saturn.tsx'
import Uranus from './pages/Uranus/Uranus.tsx'
import Neptune from './pages/Neptune/Neptune.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />
  },
  {
    path: "/menu",
    element:<Menu />
  },
  {
    path: "*",
    element: <h1>page not found</h1>
  },
  {
    path: "/menu/mercury",
    element:<Mercury />
  },
  {
    path: "/menu/venus",
    element: <Venus />
  },
  {
    path: "/menu/earth",
    element: <Earth />
  },
  {
    path: "/menu/mars",
    element: <Mars />
  },
  {
    path: "/menu/jupiter",
    element: <Jupiter />
  },
  {
    path: "/menu/saturn",
    element: <Saturn />
  },
  {
    path: "/menu/uranus",
    element: <Uranus />
  },
  {
    path: "/menu/neptune",
    element: <Neptune />
  },


])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider  router ={router}/>
)
