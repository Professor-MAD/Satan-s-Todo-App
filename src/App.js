// src/App.js
import React from 'react';
import './App.css'; // Make sure to create this file for additional styles if needed
import { Todo } from './components/Todo/Todo';


const App = () => {
  return (
    <div className="app-container">
      
      <div className="my-day-container"><h1 className="my-day">MY DAY</h1></div>

      <div className='date-wrap'>
        <h3 className="date day">Sunday</h3>
        <h3 className='date-numbers'>26</h3>
        <h3 className='date'>May</h3>
      </div>

      <div className='todo-content-container'>
    
      </div>

      <footer className='footer-container'>
      <div className='hamburger-icon'>
            <img className='hamburger-icon-image' src="/images/hamburger-sign.png" alt="hamburger-icon-footer-nav"/>
      </div>
      <div className='add-todo-icon'>
            <img className='add-todo-icon-image' src="/images/plus-sign.png" alt="plus-icon-footer-nav"/>
      </div>
      <div className='satan-speaks-icon'>
            <img className='satan-speaks-icon-image' src="/images/speaker-sign.png" alt="speaker-icon-footer-nav"/>
      </div>

      </footer>
    </div>
  );
};

export default App;
