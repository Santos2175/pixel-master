import Header from './components/Header';
import { HorizontalToolbar } from './components/HorizontalToolbar';
import LeaderBoard from './components/LeaderBoard';
import PixelsCanvas from './components/PixelsCanvas';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Header />
      <PixelsCanvas />
      <HorizontalToolbar />
    </AppProvider>
  );
}

export default App;
