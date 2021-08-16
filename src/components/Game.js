import React, { useEffect, useState } from 'react';

const Game = () => {
  const icons = {
    X: { name: 'Crosses' },
    O: { name: 'Noughts' },
    '🐧': { name: 'Penguins' },
    '🐢': { name: 'Tortoises' },
  };
  const [player1, setPlayer1] = useState('X');
  const [player2, setPlayer2] = useState('O');
  const [title, setTitle] = useState(
    `${icons[player1].name} & ${icons[player2].name}`
  );
  const turnKey = { '-1': player1, 1: player2 };
  const [combo, setCombo] = useState({ '-1': '', 1: '' });
  const [currentTurn, setCurrentTurn] = useState(-1);
  const [gameMessage, setGameMessage] = useState(
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
    } else if (combo['-1'].length + combo['1'].length > 0) {
      setCurrentTurn(currentTurn * -1);
      setGameMessage(`Next Turn: ${turnKey[currentTurn * -1]}`);
    }
    // eslint-disable-next-line
  }, [combo]);

  useEffect(() => {
    setGameMessage(`Next Turn: ${turnKey[currentTurn]}`);
    setTitle(`${icons[player1].name} & ${icons[player2].name} `);
    // eslint-disable-next-line
  }, [player1, player2]);

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
    if (
      sumArray.includes(turnKey['-1'].repeat(3)) ||
      sumArray.includes(turnKey['1'].repeat(3))
    ) {
      setGameMessage(`${turnKey[currentTurn]} has won!`);
      return true;
    } else if (combo['-1'].length + combo['1'].length === 9) {
      setGameMessage(`Tie!`);
      return true;
    }
  };

  // reset
  const resetGame = () => {
    setCombo({ '-1': '', 1: '' });
    setButtonValues((currValues) => {
      const newValues = [...currValues];
      newValues.forEach((value) => {
        value[1] = false;
        value[0] = '';
      });
      return newValues;
    });
    setCurrentTurn(-1);
    setGameMessage(`Next Turn: ${player1}`);
  };

  return (
    <div>
      <h1>{title}</h1>
      <div className='playerWrapper'>
        <div className='player'>
          <label>Player 1 </label>
          <select
            disabled={combo['-1'].length + combo['1'].length}
            onChange={(icon) => {
              setPlayer1(icon.target.value);
            }}
          >
            {Object.keys(icons)
              .filter((icon) => {
                return icon !== player2;
              })
              .map((icon) => {
                return <option key={`icon1${icon}`}>{icon}</option>;
              })}
          </select>
        </div>
        <div className='player'>
          <label>Player 2</label>
          <select
            disabled={combo['-1'].length + combo['1'].length}
            onChange={(icon) => {
              setPlayer2(icon.target.value);
            }}
          >
            {Object.keys(icons)
              .filter((icon) => {
                return icon !== player1;
              })
              .map((icon) => {
                return <option key={`icon2${icon}`}>{icon}</option>;
              })}
          </select>
        </div>
      </div>
      <div className='grid-container'>{createButtons()}</div>
      <p className='message'>{gameMessage}</p>
      <button
        className='btn_reset'
        onClick={() => {
          resetGame();
        }}
      >
        Restart Game
      </button>
    </div>
  );
};

export default Game;
