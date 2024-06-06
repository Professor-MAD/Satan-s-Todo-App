import React from 'react';
import './Calendar.css';
import { useTheme } from '../ThemeContext/ThemeContext';
import SatanSpeaks from '../SatanSpeaks/SatanSpeaks';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const generateCalendarDays = () => {
  const daysInMonth = new Date(2024, 7, 0).getDate(); // July 2024
  const firstDayIndex = new Date(2024, 6, 1).getDay();
  const calendarDays = [];

  // Fill in the blank days before the first of the month
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push('');
  }

  // Fill in the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return calendarDays;
};

const Calendar = ({ handleHamburgerClick }) => {
  const { theme } = useTheme();
  const calendarDays = generateCalendarDays();
  const currentDate = new Date().getDate();

  return (
    <div className={`app-container ${theme}-theme`}>
      <div className="my-day-container"><h1 className="my-day">Calendar</h1></div>
      <div className='calendar-content-container'>
        <img src="/images/calendar-background-image.png" className="calendar-background" alt="Calendar Background" />
        <div className="calendar-header">
          <h2 className="month-title">July</h2>
        </div>
        <div className="calendar-grid">
          {daysOfWeek.map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
          {calendarDays.map((day, index) => (
            <div key={index} className={`calendar-day ${day === currentDate ? 'current-day' : ''}`}>{day}</div>
          ))}
        </div>
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
