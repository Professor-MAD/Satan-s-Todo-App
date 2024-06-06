import React from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';
import './Slideshow.css';

const Slideshow = () => {
  const { theme } = useTheme();
  
  let themeClass = 'default-slideshow';
  if (theme === 'darkCave') themeClass = 'darkCave-slideshow';
  if (theme === 'swamp') themeClass = 'swamp-slideshow';
  if (theme === 'bloodTundra') themeClass = 'bloodTundra-slideshow';
  if (theme === 'palace') themeClass = 'palace-slideshow';
  if (theme === 'fifthCircle') themeClass = 'fifthCircle-slideshow';

  return <div className={`slideshow ${themeClass}`}></div>;
};

export default Slideshow;
