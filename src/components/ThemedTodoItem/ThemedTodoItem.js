// ThemedTodoItem.js

import React from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';
import './ThemedTodoItem.css';

const placardImages = {
  default: [
    '/images/task-one-placard.png',
    '/images/task-two-placard.png',
    '/images/task-three-placard.png'
  ],
  darkCave: [
    '/images/category-page-placard-1.png',
    '/images/category-page-placard-2.png',
    '/images/category-page-placard-3.png'
  ],
  swamp: [
    '/images/acid-placard-1.png',
    '/images/acid-placard-2.png',
    '/images/acid-placard-3.png'
  ]
};

const ThemedTodoItem = ({ todo, index, handleComplete, handleStar, handleDelete, handleTag, dropdownIndex, categories, handleSelectCategory }) => {
  const { theme } = useTheme();
  const currentPlacardImages = placardImages[theme] || placardImages.default;

  return (
    <div key={index} className={`todo-item ${todo.isStarred ? 'starred' : ''}`} style={{ backgroundImage: `url(${currentPlacardImages[index % 3]})` }}>
      <img
        src={todo.isCompleted ? '/images/circle-check-off-fire.png' : '/images/circle-check-off.png'}
        alt="complete-icon"
        onClick={() => handleComplete(index)}
        className="todo-icon"
      />
      <p className={`todo-text ${todo.isCompleted ? 'completed' : ''}`}>{todo.text}</p>
      <img
        src="/images/tag-satan.png"
        alt="tag-icon"
        onClick={() => handleTag(index)}
        className="todo-icon"
      />
      {dropdownIndex === index && (
        <div className="dropdown-menu">
          {categories.map((category, idx) => (
            <button key={idx} className="dropdown-option" onClick={() => handleSelectCategory(index, category.name)}>{category.name}</button>
          ))}
        </div>
      )}
      <img
        src={todo.isStarred ? '/images/pentagram-gold.png' : '/images/pentagram-black.png'}
        alt="star-icon"
        onClick={() => handleStar(index)}
        className="todo-icon"
      />
      <img
        src="/images/garbage-black.png"
        alt="delete-icon"
        onClick={() => handleDelete(index)}
        className="todo-icon"
      />
    </div>
  );
};

export default ThemedTodoItem;
