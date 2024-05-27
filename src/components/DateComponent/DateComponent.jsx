// src/components/DateComponent/DateComponent.js
import React from 'react';
import './DateComponent.css';

const DateComponent = () => {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
  const numericalDate = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'long' });

  return (
    <div className="date-container">
      <h3 className="day">{dayOfWeek}</h3>
      <h3 className="date-numbers">{numericalDate}</h3>
      <h3 className="month">{month}</h3>
    </div>
  );
};

export default DateComponent;
