import React, { useState } from 'react';
import './App.css';
import DateComponent from './components/DateComponent/DateComponent';
import './fonts/Hellscourt.ttf';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, isCompleted: false, isStarred: false }]);
      setNewTodo('');
      setShowInput(false);
    }
  };

  const handleIconClick = () => {
    setShowInput(true);
  };

  const handleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => 
      i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  const handleStar = (index) => {
    const updatedTodos = todos.map((todo, i) => 
      i === index ? { ...todo, isStarred: !todo.isStarred } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const placardImages = [
    '/images/task-one-placard.png',
    '/images/task-two-placard.png',
    '/images/task-three-placard.png'
  ];

  return (
    <div className="app-container">
      <div className="my-day-container"><h1 className="my-day">MY DAY</h1></div>
      <DateComponent />

      <div className='todo-content-container'>
        {todos.map((todo, index) => (
          <div key={index} className={`todo-item ${todo.isStarred ? 'starred' : ''}`} style={{ backgroundImage: `url(${placardImages[index % 3]})` }}>
            <img 
              src={todo.isCompleted ? '/images/circle-check-off-fire.png' : '/images/circle-check-off.png'}
              alt="complete-icon"
              onClick={() => handleComplete(index)}
              className="todo-icon"
            />
            <p className={`todo-text ${todo.isCompleted ? 'completed' : ''}`}>{todo.text}</p>
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
        ))}
      </div>

      <footer className='footer-container'>
        <div className='hamburger-icon'>
          <img className='hamburger-icon-image' src="/images/hamburger-sign.png" alt="hamburger-icon-footer-nav" />
        </div>
        <div className='add-todo-icon' onClick={handleIconClick}>
          <img className='add-todo-icon-image' src="/images/plus-sign.png" alt="plus-icon-footer-nav" />
        </div>
        <div className='satan-speaks-icon'>
          <img className='satan-speaks-icon-image' src="/images/speaker-sign.png" alt="speaker-icon-footer-nav" />
        </div>
      </footer>

      {showInput && (
        <div className="todo-input-container">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="todo-input"
            placeholder="Type your fate..."
          />
          <button onClick={handleAddTodo} className="add-todo-button">Add</button>
        </div>
      )}
    </div>
  );
};

export default App;
