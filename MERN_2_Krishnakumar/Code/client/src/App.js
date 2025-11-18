import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChessBoard from './components/ChessBoard';
import { fetchGameState } from './redux/actions/gameActions';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGameState());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess Board Game</h1>
        <p>Click on squares to change colors: White → Yellow, Black → Red</p>
      </header>
      <main className="App-main">
        <ChessBoard />
      </main>
    </div>
  );
}

export default App;

