import { useState, useEffect, useRef } from 'react';

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#BD10E0');
  const [rgbValues, setRgbValues] = useState({ r: 189, g: 16, b: 224 });
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [colorHistory, setColorHistory] = useState(['#BD10E0']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isEyedropperActive, setIsEyedropperActive] = useState(false);

  const gradientRef = useRef(null);
  const canvasRef = useRef(null);

  // Color palettes from the image
  const colorPalette = [
    [
      '#c62828',
      '#f9a825',
      '#f4b400',
      '#7b5e00',
      '#7cb342',
      '#33691e',
      '#2979ff',
      '#9c27b0',
    ],
    [
      '#4fc3f7',
      '#b2ff59',
      '#ccff90',
      '#212121',
      '#616161',
      '#f5f5f5',
      '#ffffff',
      '#eeeeee',
    ],
  ];

  // Update color and add to history
  const updateColor = (newColor) => {
    if (newColor !== selectedColor) {
      const newHistory = colorHistory.slice(0, historyIndex + 1);
      newHistory.push(newColor);

      if (newHistory.length > 20) newHistory.shift();

      setColorHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }

    setSelectedColor(newColor);
    setRgbValues(hexToRgb(newColor));
  };

  // Handle cursor/crosshair selection from the gradient
  const handleGradientClick = (e) => {
    if (activeToolIndex !== 0) return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const h = (x / rect.width) * 360;
    const s = 1;
    const v = 1 - y / rect.height;

    const rgb = hsvToRgb(h, s, v);
    const hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);

    updateColor(hexColor);
  };

  // Helper functions for color conversion
  const hsvToRgb = (h, s, v) => {
    let r, g, b;
    const i = Math.floor(h / 60) % 6;
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
      default:
        r = v;
        g = t;
        b = p;
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const rgbToHex = (r, g, b) => {
    return (
      '#' +
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    );
  };

  const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  };

  return (
    <div className='color-picker'>
      <div className='tool-sidebar'>
        <button
          className={`tool-button ${activeToolIndex === 0 ? 'active' : ''}`}
          onClick={() => setActiveToolIndex(0)}>
          <span className='icon'>⊕</span>
        </button>

        <button
          className={`tool-button ${activeToolIndex === 1 ? 'active' : ''}`}
          onClick={() => setActiveToolIndex(1)}>
          <span className='icon'>↗</span>
        </button>

        <button
          className='current-color'
          style={{ backgroundColor: selectedColor }}>
          <span className='icon'>Current color</span>
        </button>

        <button
          className={`tool-button ${activeToolIndex === 3 ? 'active' : ''}`}
          onClick={() => setActiveToolIndex(3)}>
          <span className='icon'>✏️</span>
        </button>

        <button
          className={`undo-button ${historyIndex > 0 ? '' : 'disabled'}`}
          onClick={() => {
            /* Implement undo */
          }}>
          ↺
        </button>

        <button
          className={`redo-button ${
            historyIndex < colorHistory.length - 1 ? '' : 'disabled'
          }`}
          onClick={() => {
            /* Implement redo */
          }}>
          ↻
        </button>
      </div>

      <div className='main-area'>
        <div
          ref={gradientRef}
          className={`gradient-picker ${
            activeToolIndex === 0 ? 'cursor-crosshair' : 'cursor-default'
          }`}
          onClick={handleGradientClick}
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%),
              linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)
            `,
          }}>
          <canvas ref={canvasRef} className='canvas' />
        </div>

        <div className='color-inputs'>
          <div className='hex-input'>
            <input
              type='text'
              value={selectedColor}
              onChange={(e) => updateColor(e.target.value)}
            />
          </div>

          <div className='rgb-inputs'>
            <input
              type='number'
              value={rgbValues.r}
              onChange={(e) => updateColor(e.target.value)}
            />
            <input
              type='number'
              value={rgbValues.g}
              onChange={(e) => updateColor(e.target.value)}
            />
            <input
              type='number'
              value={rgbValues.b}
              onChange={(e) => updateColor(e.target.value)}
            />
          </div>
        </div>

        <div className='color-palette'>
          {colorPalette.map((row, rowIndex) => (
            <div key={rowIndex} className='palette-row'>
              {row.map((color, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className='color-swatch'
                  style={{ backgroundColor: color }}
                  onClick={() => updateColor(color)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
