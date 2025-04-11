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

// import './toolbar.css';

export function HorizontalToolbar() {
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [isColorPickerVisible, setIdColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState({ r: 147, g: 51, b: 234 }); // Purple default
  const [hue, setHue] = useState(270); // Purple hue
  const [colorPickerPosition, setColorPickerPosition] = useState({
    x: 100,
    y: 100,
  });
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const gradientRef = useRef(null);

  const presetColors = [
    '#e11d48',
    '#f97316',
    '#eab308',
    '#84cc16',
    '#10b981',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#d946ef',
    '#ec4899',
    '#f43f5e',
    '#ef4444',
    '#f59e0b',
    '#a3e635',
    '#22d3ee',
    '#a78bfa',
    '#000000',
    '#404040',
    '#737373',
    '#a3a3a3',
    '#d4d4d4',
    '#e5e5e5',
    '#f5f5f5',
    '#ffffff',
  ];

  const tools = [
    { name: 'Select', icon: <MousePointer size={16} /> },
    { name: 'Brush', icon: <Paintbrush size={16} /> },
    {
      name: 'Color',
      icon: (
        <div
          className='color-swatch'
          style={{
            backgroundColor: `rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`,
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

  const handleGradientClick = (e) => {
    if (!gradientRef.current) return;

    const rect = gradientRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    const y = Math.min(Math.max(0, e.clientY - rect.top), rect.height);

    setColorPickerPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });

    // Calculate color based on position
    const saturation = (x / rect.width) * 100;
    const lightness = 100 - (y / rect.height) * 100;

    // Convert HSL to RGB
    const c = ((1 - Math.abs((2 * lightness) / 100 - 1)) * saturation) / 100;
    const x1 = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = lightness / 100 - c / 2;

    let r1, g1, b1;
    if (hue < 60) {
      [r1, g1, b1] = [c, x1, 0];
    } else if (hue < 120) {
      [r1, g1, b1] = [x1, c, 0];
    } else if (hue < 180) {
      [r1, g1, b1] = [0, c, x1];
    } else if (hue < 240) {
      [r1, g1, b1] = [0, x1, c];
    } else if (hue < 300) {
      [r1, g1, b1] = [x1, 0, c];
    } else {
      [r1, g1, b1] = [c, 0, x1];
    }

    setSelectedColor({
      r: Math.round((r1 + m) * 255),
      g: Math.round((g1 + m) * 255),
      b: Math.round((b1 + m) * 255),
    });
  };

  const handleColorChange = (color) => {
    // Convert hex to RGB
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      setSelectedColor({ r, g, b });
    }
  };

  const handleRgbChange = (channel, value) => {
    setSelectedColor((prev) => ({
      ...prev,
      [channel]: value,
    }));
  };

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

            {index === 2 && colorPickerOpen && (
              //   <div className='color-picker'>
              //     <div
              //       ref={gradientRef}
              //       className='color-gradient'
              //       style={{
              //         background: `linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
              //         backgroundImage: `linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%)),
              //           linear-gradient(to bottom, transparent, #000)`,
              //         backgroundBlendMode: 'multiply',
              //       }}
              //       onClick={handleGradientClick}>
              //       <div
              //         className='color-picker-indicator'
              //         style={{
              //           left: `${colorPickerPosition.x}%`,
              //           top: `${colorPickerPosition.y}%`,
              //         }}
              //       />
              //     </div>

              //     <div className='rgb-inputs'>
              //       <div className='rgb-input-group'>
              //         <label className='rgb-label'>R</label>
              //         <input
              //           type='number'
              //           min='0'
              //           max='255'
              //           value={selectedColor.r}
              //           onChange={(e) =>
              //             handleRgbChange('r', parseInt(e.target.value) || 0)
              //           }
              //           className='rgb-input'
              //         />
              //       </div>
              //       <div className='rgb-input-group'>
              //         <label className='rgb-label'>G</label>
              //         <input
              //           type='number'
              //           min='0'
              //           max='255'
              //           value={selectedColor.g}
              //           onChange={(e) =>
              //             handleRgbChange('g', parseInt(e.target.value) || 0)
              //           }
              //           className='rgb-input'
              //         />
              //       </div>
              //       <div className='rgb-input-group'>
              //         <label className='rgb-label'>B</label>
              //         <input
              //           type='number'
              //           min='0'
              //           max='255'
              //           value={selectedColor.b}
              //           onChange={(e) =>
              //             handleRgbChange('b', parseInt(e.target.value) || 0)
              //           }
              //           className='rgb-input'
              //         />
              //       </div>
              //     </div>

              //     <div className='color-presets'>
              //       {presetColors.map((color, i) => (
              //         <button
              //           key={i}
              //           className='color-preset-button'
              //           style={{ backgroundColor: color }}
              //           onClick={() => handleColorChange(color)}
              //           aria-label={`Select color ${color}`}
              //         />
              //       ))}
              //     </div>
              //   </div>
              <ColorPicker />
            )}
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
