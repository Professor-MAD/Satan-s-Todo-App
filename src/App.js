// src/App.js
import React from 'react';
import './App.css'; // Make sure to create this file for additional styles if needed

const App = () => {
  return (
    <div className="app-container">
      <h1 className="my-day">MY DAY</h1>

      <div className='date-wrap'>
        <h3 className="date day">Sunday</h3>
        <h3 className='date-numbers'>26</h3>
        <h3 className='date'>May</h3>
      </div>

      <div className='todo-content-container'>
        Todo content goes here
      </div>

      <footer className='footer-container'>
        This is a footer
      </footer>
    </div>
  );
};

export default App;
