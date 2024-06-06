// Calendar.js

import React from 'react';
import './Calendar.css';
import { useTheme } from '../ThemeContext/ThemeContext';
import SatanSpeaks from '../SatanSpeaks/SatanSpeaks';

const Calendar = ({ handleHamburgerClick }) => {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}-theme`}>
      <div className="my-day-container"><h1 className="my-day">Calendar</h1></div>
      <div className='calendar-content-container'>
        {/* Calendar content will go here */}
      </div>
      <footer className='footer-container'>
        <div className='hamburger-icon' onClick={handleHamburgerClick}>
          <img className='hamburger-icon-image' src="/images/hamburger-sign.png" alt="hamburger-icon-footer-nav" />
        </div>
        
        <SatanSpeaks />
      </footer>
    </div>
  );
};

export default Calendar;
