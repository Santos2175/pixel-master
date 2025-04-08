import PixelsCanvas from './components/PixelsCanvas';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <PixelsCanvas />
    </AppProvider>
  );
}

export default App;
