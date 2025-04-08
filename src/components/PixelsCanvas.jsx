// import React, { useState } from 'react';
// import PixelsToolbar from './PixelsToolbar'; // 👈 import toolbar component

// const GRID_SIZE = 100;

// const PixelsCanvas = () => {
//   const [pixels, setPixels] = useState(
//     Array(GRID_SIZE * GRID_SIZE).fill('#ffffff')
//   );
//   const [selectedColor, setSelectedColor] = useState('#000000');
//   const [isErasing, setIsErasing] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handlePixelClick = (index) => {
//     const newPixels = [...pixels];
//     newPixels[index] = isErasing ? '#ffffff' : selectedColor;
//     setPixels(newPixels);
//   };

//   const toggleEraser = () => {
//     setIsErasing((prev) => !prev);
//   };

//   const handleColorChange = (e) => {
//     setSelectedColor(e.target.value);
//   };

//   return (
//     <div
//       className={`PixelsCanvas_container ${
//         isProcessing ? 'PixelsCanvas_processing' : ''
//       }`}>
//       <div
//         className='PixelsCanvas_canvas'
//         style={{
//           display: 'grid',
//           gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
//           gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
//           width: '1000px',
//           height: '1000px',
//         }}>
//         {pixels.map((color, index) => (
//           <div
//             key={index}
//             className='pixel'
//             style={{
//               backgroundColor: color,
//               width: '100%',
//               height: '100%',
//               boxSizing: 'border-box',
//               cursor: isErasing
//                 ? 'url("https://web.archive.org/web/20200417092656im_/https://pixelmaster.io/static/media/eraser.8b07b4fd.svg") 14 31, default'
//                 : 'pointer',
//             }}
//             onClick={() => handlePixelClick(index)}
//           />
//         ))}
//       </div>

//       {/* Use extracted toolbar component */}
//       <PixelsToolbar
//         selectedColor={selectedColor}
//         onColorChange={handleColorChange}
//         isErasing={isErasing}
//         onToggleEraser={toggleEraser}
//       />

//       <div
//         className={`PixelsCanvas_loading ${
//           isProcessing ? '' : 'PixelsCanvas_hidden'
//         }`}>
//         <div className='PixelsCanvas_loadingCube1'></div>
//         <div className='PixelsCanvas_loadingCube2'></div>
//       </div>
//     </div>
//   );
// };

// export default PixelsCanvas;

import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Toolbar from './Toolbar';

const PixelCanvas = () => {
  const { selectedColor, setSelectedColor } = useAppContext();
  const [gridSize] = useState(60);
  const [pixels, setPixelData] = useState([]);
  const [isEraserActive, setIsEraserActive] = useState(false);

  const createGrid = () => {
    const grid = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      grid.push({ id: i, color: '#fff' });
    }
    return grid;
  };

  useEffect(() => {
    setPixelData(createGrid());
  }, []);

  const handlePixelClick = (id) => {
    const updatedPixels = [...pixels];
    updatedPixels[id].color = isEraserActive ? '#fff' : selectedColor;
    setPixelData(updatedPixels);
  };

  const handlePixelHover = (id) => {};

  return (
    <div className='pixel-canvas-container'>
      <Toolbar /> {/* Include the Toolbar */}
      <div className='canvas'>
        <div className='grid'>
          {pixels.map((pixel, index) => (
            <div
              key={index}
              className='pixel'
              style={{
                backgroundColor: pixel.color,
                border: `1px solid ${pixel.color === '#fff' ? '#ccc' : '#333'}`,
              }}
              onClick={() => handlePixelClick(index)}
              onMouseEnter={() => handlePixelHover(index)}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PixelCanvas;
