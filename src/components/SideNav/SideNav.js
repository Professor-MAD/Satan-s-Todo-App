import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import './SideNav.css';
import { useTheme } from '../ThemeContext/ThemeContext';


const SideNav = ({ isVisible, onClose, onCategoryAdd, categories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const handleCreateCategoryClick = () => {
    setShowInput(!showInput);
    setNewCategory('');
  };

  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newCategory.trim() !== '') {
      const updatedCategories = [...categories, { name: newCategory, count: 0 }];
      onCategoryAdd(updatedCategories);
      setNewCategory('');
      setShowInput(false);
    }
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    onCategoryAdd(updatedCategories);
  };

  const handleEditCategory = (index) => {
    setEditIndex(index);
  };

  const handleEditChange = (e, index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].name = e.target.value;
    onCategoryAdd(updatedCategories);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onCategoryAdd(items);
  };



// Inside your component, get the current theme
const { theme } = useTheme();

// Update the placardImages array based on the theme
const placardImages = {
    default: [
        '/images/task-one-placard.png',
        '/images/task-two-placard.png',
        '/images/task-three-placard.png'
    ],
    darkCave: [
        'category-page-placard-1.png',
        'category-page-placard-2.png',
        'category-page-placard-3.png'
    ],
    swamp: [
        'acid-placard-1.png',
        'acid-placard-2.png',
        'acid-placard-3.png'
    ]
};

const currentPlacardImages = placardImages[theme] || placardImages.default;


  return (
    <div className={`side-nav ${isVisible ? 'visible' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <div className='user-container'>
        <img className='avatar-icon' alt='avatar-icon-alt' src='avatar-satan-app.png' />
        <a className='user-styles' href="#section1">User</a>
        <img className='search-icon' alt='search-icon-alt' src='search-symbol-satan-app.png' />
      </div>
      <Link className='other-drop-down-styles' to="/">My Day</Link>
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
                          value={category.name}
                          onChange={(e) => handleEditChange(e, index)}
                          autoFocus
                          onBlur={() => setEditIndex(-1)}
                        />
                      ) : (
                        <>
                          <Link className='other-drop-down-styles' to={`/category/${category.name}`}>
                            {category.name}
                          </Link>
                          <div className="category-count">{category.count}</div>
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
