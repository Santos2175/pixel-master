// import React from 'react';

// const PixelsToolbar = ({
//   selectedColor,
//   onColorChange,
//   isErasing,
//   onToggleEraser,
// }) => {
//   return (
//     <div className='PixelsCanvas_controls'>
//       <input type='color' value={selectedColor} onChange={onColorChange} />
//       <button onClick={onToggleEraser}>
//         {isErasing ? 'Disable Eraser' : 'Enable Eraser'}
//       </button>
//     </div>
//   );
// };

// export default PixelsToolbar;

import React, { useState, useEffect } from 'react';
import './Toolbar.scss';
import ColorPalette from './ColorPalette';
import { useAppContext } from '../../context/AppContext';

const Toolbar = () => {
  const { setSelectedColor } = useAppContext();
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ top: 20, left: 20 });

  const handleEraserToggle = () => {
    setIsEraserActive(!isEraserActive);
    setSelectedColor(isEraserActive ? '#ff007f' : '#fff'); // Set eraser color to white
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({ x: e.clientX - position.left, y: e.clientY - position.top });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newTop = e.clientY - offset.y;
      const newLeft = e.clientX - offset.x;
      setPosition({ top: newTop, left: newLeft });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className='toolbar'
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
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
