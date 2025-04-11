import Header from './components/Header';
import LeaderBoard from './components/LeaderBoard';
import PixelsCanvas from './components/PixelsCanvas';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Header />
      {/* <PixelsCanvas /> */}
    </AppProvider>
  );
}

export default App;
