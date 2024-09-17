import GameBoard from './components/GameBoard/GameBoard';
import './App.css';
import LineFruit from './components/LineFruit/LineFruit';

const App = () => {
  return (
    <div className='App overflow-hidden'>
      <GameBoard />
      <LineFruit />
    </div>
  );
};

export default App;
