import React, { useEffect, useState } from 'react';

const Game = () => {
  const [currentTurn, setCurrentTurn] = useState(1);
  const turnKey = { '-1': 'X', 1: 'O' };
  const [combo, setCombo] = useState({ '-1': '', 1: '' });
  const [gameOverMessage, setGameOverMessage] = useState(
    `Next Turn: ${turnKey[currentTurn]}`
  );
  const [buttonValues, setButtonValues] = useState([
    ['', false],
    ['', false],
    ['', false],
    ['', false],
    ['', false],
    ['', false],
    ['', false],
    ['', false],
    ['', false],
    ['', false],
  ]);

  useEffect(() => {
    if (evaluateScore()) {
      setButtonValues((currValues) => {
        const newValues = [...currValues];
        newValues.forEach((value) => (value[1] = true));
        return newValues;
      });
    }
  }, [combo]);

  // create buttons
  const createButtons = () => {
    const gameButtons = [];
    for (let i = 1; i < 10; i++) {
      gameButtons.push(
        <button
          key={`b${i}`}
          id={`b${i}`}
          className='btn_game'
          disabled={buttonValues[i][1]}
          onClick={(event) => {
            const buttonId = parseInt(event.target.id.slice(-1));
            placeNoughtOrCross(buttonId);
          }}
        >
          {buttonValues[i][0]}
        </button>
      );
    }

    return gameButtons;
  };

  // set X or O
  const placeNoughtOrCross = (buttonId) => {
    setButtonValues((currValues) => {
      const newValues = [...currValues];
      newValues[buttonId][0] = turnKey[currentTurn];
      newValues[buttonId][1] = true;
      return newValues;
    });
    setCombo((currValues) => {
      const newValues = { ...currValues };
      newValues[currentTurn] += buttonId;
      return newValues;
    });
  };

  // evaluate score
  const evaluateScore = () => {
    const sumArray = [
      buttonValues[1][0] + buttonValues[2][0] + buttonValues[3][0],
      buttonValues[4][0] + buttonValues[5][0] + buttonValues[6][0],
      buttonValues[7][0] + buttonValues[8][0] + buttonValues[9][0],
      buttonValues[1][0] + buttonValues[4][0] + buttonValues[7][0],
      buttonValues[2][0] + buttonValues[5][0] + buttonValues[8][0],
      buttonValues[3][0] + buttonValues[6][0] + buttonValues[9][0],
      buttonValues[1][0] + buttonValues[5][0] + buttonValues[9][0],
      buttonValues[3][0] + buttonValues[5][0] + buttonValues[7][0],
    ];
    if (sumArray.includes('XXX') || sumArray.includes('OOO')) {
      setGameOverMessage(`${turnKey[currentTurn]} has won!`);
      return true;
    } else if (combo['-1'].length + combo['1'].length === 9) {
      setGameOverMessage(`Tie!`);
      return true;
    } else {
      setCurrentTurn(currentTurn * -1);
      setGameOverMessage(`Next Turn: ${turnKey[currentTurn * -1]}`);
      return false;
    }
  };

  // reset
  const resetGame = () => {
    setCombo({ '-1': '', 1: '' });
    setButtonValues((currValues) => {
      const newValues = [...currValues];
      newValues.forEach((value) => ((value[1] = false), (value[0] = '')));
      return newValues;
    });
    setCurrentTurn(1);
    setGameOverMessage(`Next Turn: ${turnKey[currentTurn * -1]}`);
  };

  return (
    <div className='wrapper'>
      <h1>Noughts & Crosses</h1>
      <div className='grid-container'>{createButtons()}</div>
      <p>{gameOverMessage}</p>
      <button
        onClick={() => {
          resetGame();
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Game;
