import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './SideNav.css';

const SideNav = ({ isVisible, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [editIndex, setEditIndex] = useState(-1); // -1 means no category is being edited

  useEffect(() => {
    // Load categories from session storage when the component mounts
    const savedCategories = JSON.parse(sessionStorage.getItem('categories'));
    if (savedCategories) {
      setCategories(savedCategories);
    }
  }, []);

  useEffect(() => {
    // Save categories to session storage whenever they change
    sessionStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleCreateCategoryClick = () => {
    setShowInput(!showInput);
    setNewCategory(''); // Clear the input field when toggling
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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCategories(items);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div
              className="categories-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {categories.map((category, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <div
                      className='category-container'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default SideNav;
