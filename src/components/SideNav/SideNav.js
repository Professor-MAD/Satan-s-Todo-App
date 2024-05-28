// src/components/SideNav/SideNav.js

import React from 'react';
import './SideNav.css';


const SideNav = ({ isVisible, onClose }) => {
  return (
    <div className={`side-nav ${isVisible ? 'visible' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      {/* Add your navigation links or items here */}
      <div className='user-container'>
          <img className='avatar-icon' alt='avatar-icon-alt' src='avatar-satan-app.png' />
          <a className='user-styles' href="#section1">User</a>
          <img className='search-icon' alt='search-icon-alt' src='search-symbol-satan-app.png' />
      </div>
          <a className='other-drop-down-styles' href="#section2">My Day</a>
          <a className='other-drop-down-styles' href="#section3">Important</a>
    </div>
  );
};

export default SideNav;
