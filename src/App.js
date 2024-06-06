import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import DateComponent from './components/DateComponent/DateComponent';
import SideNav from './components/SideNav/SideNav.js';
import SatanSpeaks from './components/SatanSpeaks/SatanSpeaks.js';
import CategoryTodos from './components/CategoryTodos/CategoryTodos.js';
import ThemedTodoItem from './components/ThemedTodoItem/ThemedTodoItem';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import Slideshow from './components/Slideshow/Slideshow';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';


const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = sessionStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [categories, setCategories] = useState(() => {
    const savedCategories = sessionStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });
  const [currentCategory, setCurrentCategory] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    sessionStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleAddTodo = (category = null) => {
    if (newTodo.trim() !== '') {
      const newTodoItem = { text: newTodo, isCompleted: false, isStarred: false, tags: category ? [category] : [] };
      setTodos([...todos, newTodoItem]);
      
      if (category) {
        const updatedCategories = categories.map(cat =>
          cat.name === category ? { ...cat, count: cat.count + 1 } : cat
        );
        setCategories(updatedCategories);
      }
      
      setNewTodo('');
      setShowInput(false);
    }
  };

  const handleIconClick = (category = null) => {
    setShowInput(true);
    setCurrentCategory(category);
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
    const todoToDelete = todos[index];
    const updatedCategories = [...categories];
    todoToDelete.tags.forEach(tag => {
      const categoryIndex = updatedCategories.findIndex(cat => cat.name === tag);
      if (categoryIndex !== -1) {
        updatedCategories[categoryIndex].count -= 1;
      }
    });
    setCategories(updatedCategories);

    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleTag = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleSelectCategory = (todoIndex, category) => {
    const updatedTodos = todos.map((todo, i) =>
      i === todoIndex ? { ...todo, tags: [...todo.tags, category] } : todo
    );
    setTodos(updatedTodos);

    const updatedCategories = categories.map(cat =>
      cat.name === category ? { ...cat, count: cat.count + 1 } : cat
    );
    setCategories(updatedCategories);

    setDropdownIndex(null); // Close the dropdown after selection
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const resizeText = () => {
      const todos = document.querySelectorAll('.todo-text');
      todos.forEach(todo => {
        const containerWidth = todo.offsetWidth;
        const textWidth = todo.scrollWidth;
        const fontSize = parseFloat(window.getComputedStyle(todo).fontSize);

        if (textWidth > containerWidth) {
          const newFontSize = (containerWidth / textWidth) * fontSize * 0.9;
          todo.style.fontSize = newFontSize + 'px';
        } else {
          todo.style.fontSize = '';
        }
      });
    };

    window.addEventListener('resize', resizeText);
    document.addEventListener('DOMContentLoaded', resizeText);

    return () => {
      window.removeEventListener('resize', resizeText);
      document.removeEventListener('DOMContentLoaded', resizeText);
    };
  }, []);

  const handleHamburgerClick = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <ThemeProvider>
      <Router>
        <Slideshow />
        <div className="app-container">
          <SideNav
            isVisible={showSideNav}
            onClose={() => setShowSideNav(false)}
            onCategoryAdd={setCategories}
            categories={categories}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="my-day-container">
                    <h1 className="my-day">MY DAY</h1>
                  </div>
                  <DateComponent />
                  <div className='todo-content-container'>
                    {todos.map((todo, index) => (
                      <ThemedTodoItem
                        key={index}
                        todo={todo}
                        index={index}
                        handleComplete={handleComplete}
                        handleStar={handleStar}
                        handleDelete={handleDelete}
                        handleTag={handleTag}
                        dropdownIndex={dropdownIndex}
                        categories={categories}
                        handleSelectCategory={handleSelectCategory}
                      />
                    ))}
                  </div>
                  <footer className='footer-container'>
                    <div className='hamburger-icon' onClick={handleHamburgerClick}>
                      <img className='hamburger-icon-image' src="/images/hamburger-sign.png" alt="hamburger-icon-footer-nav" />
                    </div>
                    <div className='add-todo-icon' onClick={() => handleIconClick(null)}>
                      <img className='add-todo-icon-image' src="/images/plus-sign.png" alt="plus-icon-footer-nav" />
                    </div>
                    <SatanSpeaks />
                  </footer>
                </>
              }
            />
            <Route
              path="/category/:categoryName"
              element={
                <CategoryTodos
                  todos={todos}
                  categories={categories}
                  handleComplete={handleComplete}
                  handleStar={handleStar}
                  handleDelete={handleDelete}
                  handleHamburgerClick={handleHamburgerClick}
                  handleIconClick={handleIconClick}
                  handleAddTodo={handleAddTodo}
                  showInput={showInput}
                  setShowInput={setShowInput}
                  setNewTodo={setNewTodo}
                />
              }
            />
          </Routes>
          {showInput && currentCategory === null && (
            <div className="todo-input-container" ref={inputRef}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="todo-input"
                placeholder="Type your fate..."
              />
              <button onClick={() => handleAddTodo()} className="add-todo-button">Add</button>
            </div>
          )}
          <ThemeSwitcher />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
