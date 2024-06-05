import React from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';
import './Slideshow.css';

const Slideshow = () => {
  const { theme } = useTheme();
  
  let themeClass = 'default-slideshow';
  if (theme === 'darkCave') themeClass = 'darkCave-slideshow';
  if (theme === 'swamp') themeClass = 'swamp-slideshow';

  return <div className={`slideshow ${themeClass}`}></div>;
};

export default Slideshow;
