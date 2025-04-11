import { useState, useRef } from 'react';
import {
  ChevronDown,
  Grid,
  Maximize,
  Minimize,
  MousePointer,
  Paintbrush,
  RotateCcw,
  RotateCw,
  Square,
  Trash2,
} from 'lucide-react';

import ColorPicker from './ColorPicker';
import { useAppContext } from '../context/AppContext';

export function HorizontalToolbar() {
  const { selectedColor } = useAppContext();
  const [activeToolIndex, setActiveToolIndex] = useState(0);

  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const tools = [
    { name: 'Select', icon: <MousePointer size={16} /> },
    { name: 'Brush', icon: <Paintbrush size={16} /> },
    {
      name: 'Color',
      icon: (
        <div
          className='color-swatch'
          style={{
            backgroundColor: `${selectedColor}`,
          }}
        />
      ),
    },
    { name: 'Eraser', icon: <Trash2 size={16} /> },
    { name: 'Undo', icon: <RotateCcw size={16} /> },
    { name: 'Redo', icon: <RotateCw size={16} /> },
    { name: 'Grid', icon: <Grid size={16} /> },
    { name: 'Square', icon: <Square size={16} /> },
    { name: 'Zoom In', icon: <Maximize size={16} /> },
    { name: 'Zoom Out', icon: <Minimize size={16} /> },
  ];

  const toggleColorPicker = (index) => {
    if (index === 2) {
      setColorPickerOpen(!colorPickerOpen);
    }
    setActiveToolIndex(index);
  };

  return (
    <div className='toolbar-container'>
      <div className='toolbar'>
        {tools.map((tool, index) => (
          <div key={tool.name} className='tool-wrapper'>
            <button
              className={`tool-button ${
                activeToolIndex === index ? 'active' : ''
              }`}
              onClick={() => toggleColorPicker(index)}
              title={tool.name}>
              {tool.icon}
              <span className='sr-only'>{tool.name}</span>
            </button>

            {index === 2 && colorPickerOpen && <ColorPicker />}
          </div>
        ))}
        <div className='divider'></div>
        <button className='tool-button' title='More options'>
          <ChevronDown size={16} />
          <span className='sr-only'>More options</span>
        </button>
      </div>
    </div>
  );
}
