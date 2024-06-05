import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../ThemeContext/ThemeContext';
import './CategoryTodos.css';
import SatanSpeaks from '../SatanSpeaks/SatanSpeaks';

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

const CategoryTodos = ({
  todos,
  categories,
  handleComplete,
  handleStar,
  handleDelete,
  handleHamburgerClick,
  handleIconClick,
  handleAddTodo,
  showInput,
  setShowInput,
  setNewTodo
}) => {
  const { categoryName } = useParams();
  const { theme } = useTheme(); // Inside your component, get the current theme
  const categoryTodos = todos.filter(todo => todo.tags.includes(categoryName));
  const [newCategoryTodo, setNewCategoryTodo] = useState('');

  const handleAddCategoryTodo = () => {
    handleAddTodo(categoryName);
    setNewCategoryTodo('');
    setShowInput(false);
  };

  const currentPlacardImages = placardImages[theme] || placardImages.default;

  return (
    <div className="app-container">
      <div className="my-day-container"><h1 className="my-day">{categoryName}</h1></div>
      <div className='todo-content-container'>
        {categoryTodos.map((todo, index) => (
          <div key={index} className={`todo-item ${todo.isStarred ? 'starred' : ''}`} style={{ backgroundImage: `url(${currentPlacardImages[index % 3]})` }}>
            <img
              src={todo.isCompleted ? '/images/circle-check-off-fire.png' : '/images/circle-check-off.png'}
              alt="complete-icon"
              onClick={() => handleComplete(todos.indexOf(todo))}
              className="todo-icon"
            />
            <p className={`todo-text ${todo.isCompleted ? 'completed' : ''}`}>{todo.text}</p>
            <img
              src="/images/tag-satan.png"
              alt="tag-icon"
              className="todo-icon"
            />
            <img
              src={todo.isStarred ? '/images/pentagram-gold.png' : '/images/pentagram-black.png'}
              alt="star-icon"
              onClick={() => handleStar(todos.indexOf(todo))}
              className="todo-icon"
            />
            <img
              src="/images/garbage-black.png"
              alt="delete-icon"
              onClick={() => handleDelete(todos.indexOf(todo))}
              className="todo-icon"
            />
          </div>
        ))}
      </div>
      <footer className='footer-container'>
        <div className='hamburger-icon' onClick={handleHamburgerClick}>
          <img className='hamburger-icon-image' src="/images/hamburger-sign.png" alt="hamburger-icon-footer-nav" />
        </div>
        <div className='add-todo-icon' onClick={() => handleIconClick(categoryName)}>
          <img className='add-todo-icon-image' src="/images/plus-sign.png" alt="plus-icon-footer-nav" />
        </div>
        <SatanSpeaks />
      </footer>
      {showInput && (
        <div className="todo-input-container">
          <input
            type="text"
            value={newCategoryTodo}
            onChange={(e) => { setNewTodo(e.target.value); setNewCategoryTodo(e.target.value); }}
            className="todo-input"
            placeholder={`Add a new todo to ${categoryName}...`}
          />
          <button onClick={handleAddCategoryTodo} className="add-todo-button">Add</button>
        </div>
      )}
    </div>
  );
};

export default CategoryTodos;
