import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(`useAppContext must be within the AppProvider`);
  }

  return context;
};

export const AppProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState('#ff007f');
  const [pixels, setPixels] = useState([]);

  return (
    <AppContext.Provider
      value={{ selectedColor, setSelectedColor, pixels, setPixels }}>
      {children}
    </AppContext.Provider>
  );
};
