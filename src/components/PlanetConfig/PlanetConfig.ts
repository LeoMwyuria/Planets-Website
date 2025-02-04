export type PlanetName = 'sun' | 'mercury' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune';

import sunTexture from '../../assets/2k_sun.jpg';
import mercuryTexture from '../../assets/2k_mercury.jpg';
import venusTexture from '../../assets/2k_venus_atmosphere.jpg';
import earthTexture from '../../assets/2k_earth_daymap.jpg';
import marsTexture from '../../assets/2k_mars.jpg';
import jupiterTexture from '../../assets/2k_jupiter.jpg';
import saturnTexture from '../../assets/2k_saturn.jpg';
import uranusTexture from '../../assets/2k_uranus.jpg';
import neptuneTexture from '../../assets/2k_neptune.jpg';
import starsTexture from '../../assets/2k_stars_milky_way.jpg';

export const planetTextures = {
  sun: sunTexture,
  mercury: mercuryTexture,
  venus: venusTexture,
  earth: earthTexture,
  mars: marsTexture,
  jupiter: jupiterTexture,
  saturn: saturnTexture,
  uranus: uranusTexture,
  neptune: neptuneTexture,
  stars: starsTexture
};
export const planetConfigs = [
  { name: 'mercury', size: 0.4, distance: 10, texture: planetTextures.mercury },
  { name: 'venus', size: 0.9, distance: 15, texture: planetTextures.venus },
  { name: 'earth', size: 1, distance: 20, texture: planetTextures.earth },
  { name: 'mars', size: 0.5, distance: 25, texture: planetTextures.mars },
  { name: 'jupiter', size: 2.5, distance: 35, texture: planetTextures.jupiter },
  { name: 'saturn', size: 2.2, distance: 45, texture: planetTextures.saturn },
  { name: 'uranus', size: 1.8, distance: 55, texture: planetTextures.uranus },
  { name: 'neptune', size: 1.8, distance: 65, texture: planetTextures.neptune }
];