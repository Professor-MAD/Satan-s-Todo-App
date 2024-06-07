import React, { useState } from 'react';
import './Calendar.css';
import { useTheme } from '../ThemeContext/ThemeContext';
import SatanSpeaks from '../SatanSpeaks/SatanSpeaks';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const generateCalendarDays = (month, year) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
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
  
  // Get current date
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const calendarDays = generateCalendarDays(currentMonth, currentYear);
  const currentDate = today.getDate();
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className={`app-container ${theme}-theme calendar-page`}>
      <div className="my-day-container"><h1 className="my-day">Calendar</h1></div>
      <div className='calendar-content-container'>
        <div className="calendar-header">
          <img src="/images/left-button-satan.png" className="arrow-button left-arrow" alt="Left Arrow" onClick={handlePreviousMonth} />
          <div className="month-title">
            {monthNames[currentMonth]}
            <div className="year">{currentYear}</div>
          </div>
          <img src="/images/right-button-satan.png" className="arrow-button right-arrow" alt="Right Arrow" onClick={handleNextMonth} />
        </div>
        <div className="calendar-grid">
          {daysOfWeek.map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
          {calendarDays.map((day, index) => (
            <div key={index} className={`calendar-day ${day === currentDate && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? 'current-day' : ''}`}>{day}</div>
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
