import React from 'react';
import { useAppContext } from '../context/AppContext';

const ColorPalette = () => {
  const { selectedColor, setSelectedColor } = useAppContext();

  const colors = [
    '#ff007f',
    '#00ff7f',
    '#007fff',
    '#ff7f00',
    '#7f00ff',
    '#00ff00',
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className='color-selection'>
      {colors.map((color) => (
        <div
          key={color}
          className={`color-swatch ${
            selectedColor === color ? 'selected' : ''
          }`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorChange(color)}></div>
      ))}
    </div>
  );
};

export default ColorPalette;
