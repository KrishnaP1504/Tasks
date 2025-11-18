import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSquare, resetGame } from '../redux/actions/gameActions';
import './ChessBoard.css';

const ChessBoard = () => {
  const dispatch = useDispatch();
  const { board, loading } = useSelector((state) => state.game);

  const handleSquareClick = (row, col) => {
    dispatch(updateSquare(row, col));
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  if (loading) {
    return <div className="loading">Loading chess board...</div>;
  }

  if (!board || board.length === 0) {
    return <div className="loading">Initializing board...</div>;
  }

  return (
    <div className="chess-board-container">
      <div className="chess-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="chess-row">
            {row.map((square, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`chess-square ${square.currentColor}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
                style={{
                  backgroundColor: getColor(square.currentColor),
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

const getColor = (color) => {
  switch (color) {
    case 'white':
      return '#f0d9b5';
    case 'black':
      return '#000000';
    case 'yellow':
      return '#ffeb3b';
    case 'red':
      return '#f44336';
    default:
      return '#f0d9b5';
  }
};

export default ChessBoard;

