import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import ColorPalette from './ColorPalette.jsx';

const Toolbar = () => {
  const { setSelectedColor } = useAppContext();
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ top: 20, left: 20 });

  const handleEraserToggle = () => {
    setIsEraserActive(!isEraserActive);
    setSelectedColor(isEraserActive ? '#ff007f' : '#fff');
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({ x: e.clientX - position.left, y: e.clientY - position.top });
  };

  // Using requestAnimationFrame for smooth dragging with transform
  const handleMouseMove = (e) => {
    if (isDragging) {
      const newTop = e.clientY - offset.y;
      const newLeft = e.clientX - offset.x;

      // Update the position using transform for better performance
      setPosition({ top: newTop, left: newLeft });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      // Attach the mousemove and mouseup events to the document
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      // Remove event listeners when dragging stops
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      // Clean up event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className='toolbar'
      style={{
        transform: `translate(${position.left}px, ${position.top}px)`,
      }}
      onMouseDown={handleMouseDown}>
      <ColorPalette />
      <div className='eraser-tool'>
        <button
          onClick={handleEraserToggle}
          className={`eraser-btn ${isEraserActive ? 'active' : ''}`}>
          Eraser
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
