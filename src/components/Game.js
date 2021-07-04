import React, { useState } from 'react';

const Game = ({ player1, player2, currentTurn, setCurrentTurn }) => {
  const arrayX = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const arrayO = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [buttonValues, setButtonValues] = useState([
    ['', false, 'white'],
    ['', false, 'white'],
    ['', false, 'white'],
    ['', false, 'white'],
    ['', false, 'white'],
    ['', false, 'white'],
    ['', false, 'white'],
    ['', false, 'white'],
    ['', false, 'white'],
  ]);
  // create buttons
  const createButtons = () => {
    const gameButtons = [];
    for (let i = 1; i < 10; i++) {
      gameButtons.push(
        <button
          id={`b${i}`}
          className='gameButton'
          disabled={buttonValues[i - 1][1]}
          color={buttonValues[i - 1][2]}
          onClick={(event) => {
            const buttonId = parseInt(event.target.id.slice(-1));
            noughtOrCross(buttonId);
          }}
        >
          {buttonValues[i - 1][0]}
        </button>
      );
    }

    return gameButtons;
  };

  // evaluate score
  function scoreChecker(arrays) {
    const finalArray = [];
    arrays.forEach((array) => {
      const row1 = array[0] + array[1] + array[2];
      const row2 = array[3] + array[4] + array[5];
      const row3 = array[6] + array[7] + array[8];
      const column1 = array[0] + array[3] + array[6];
      const column2 = array[1] + array[4] + array[7];
      const column3 = array[2] + array[5] + array[8];
      const diagonal1 = array[0] + array[4] + array[8];
      const diagonal2 = array[2] + array[4] + array[6];

      const resultArray = [
        row1,
        row2,
        row3,
        column1,
        column2,
        column3,
        diagonal1,
        diagonal2,
      ];

      finalArray.push(resultArray.filter((number) => number > 2).length);
    });
    return finalArray;
  }

  // set X or O
  function noughtOrCross(buttonId) {
    setButtonValues((currValues) => {
      const newValues = [...currValues];
      if (currentTurn === 'X') {
        newValues[buttonId - 1][0] = 'X';
        newValues[buttonId - 1][2] = 'green';
        setCurrentTurn('O');
      } else {
        newValues[buttonId - 1][0] = 'O';
        newValues[buttonId - 1][2] = 'red';
        setCurrentTurn('X');
      }
      newValues[buttonId - 1][1] = true;
      return newValues;
    });
  }

  return <div className='grid-container'>{createButtons()}</div>;
};

export default Game;
