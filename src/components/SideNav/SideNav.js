// src/components/SideNav/SideNav.js

import React, { useState } from 'react';
import './SideNav.css';

const SideNav = ({ isVisible, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [editIndex, setEditIndex] = useState(-1); // -1 means no category is being edited

  const handleCreateCategoryClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newCategory.trim() !== '') {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setShowInput(false);
    }
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const handleEditCategory = (index) => {
    setEditIndex(index);
  };

  const handleEditChange = (e, index) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = e.target.value;
    setCategories(updatedCategories);
  };

  return (
    <div className={`side-nav ${isVisible ? 'visible' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <div className='user-container'>
        <img className='avatar-icon' alt='avatar-icon-alt' src='avatar-satan-app.png' />
        <a className='user-styles' href="#section1">User</a>
        <img className='search-icon' alt='search-icon-alt' src='search-symbol-satan-app.png' />
      </div>
      <a className='other-drop-down-styles' href="#section2">My Day</a>
      <a className='other-drop-down-styles' onClick={handleCreateCategoryClick}>Create Category</a>
      <img className='separator-line-satan-image' src='separator-line-satan.png' alt='separator-line-satan-alt' />
      {showInput && (
        <input
          type="text"
          className="category-input"
          value={newCategory}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder="enter category name"
        />
      )}
      {categories.map((category, index) => (
        <div key={index} className='category-container'>
          {editIndex === index ? (
            <input
              type="text"
              className="category-edit-input"
              value={category}
              onChange={(e) => handleEditChange(e, index)}
              autoFocus
              onBlur={() => setEditIndex(-1)}
            />
          ) : (
            <>
              <a className='other-drop-down-styles' href={`#category-${index}`}>
                {category}
              </a>
              <div className="category-count">0</div>
              <img
                src='edit-satan.png'
                alt='edit'
                className='edit-icon'
                onClick={() => handleEditCategory(index)}
              />
              <img
                src='garbage-black.png'
                alt='delete'
                className='delete-icon'
                onClick={() => handleDeleteCategory(index)}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideNav;
