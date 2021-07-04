import './App.css';
import Header from './components/Header';
import Game from './components/Game';
import Score from './components/Score';
import Controls from './components/Controls';
import { useState } from 'react';

function App() {
  const [player1, setPlayer1] = useState('X');
  const [player2, setPlayer2] = useState('O');
  const [currentTurn, setCurrentTurn] = useState('X');

  return (
    <div className='App'>
      <Header />
      <Score />
      <Game
        player1={player1}
        player2={player2}
        currentTurn={currentTurn}
        setCurrentTurn={setCurrentTurn}
      />
      <Controls />
    </div>
  );
}

export default App;
