import { TerminalProvider } from './context/TerminalContext';
import Terminal from './terminal/Terminal';
import './App.css';

function App() {
  return (
    <div className="App">
      <TerminalProvider>
        <Terminal />
      </TerminalProvider>
    </div>
  );
}

export default App;
