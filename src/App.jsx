import { useState } from "react";

import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning_combination,js";

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS = {
  X:'Player 1',
  O:'Player 2'
}

const getcurrplayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const deriveWinner = (gameBoard,players)=>{
  let winner = null;
  for (const comb of WINNING_COMBINATIONS) {
    const fss = gameBoard[comb[0].row][comb[0].column];
    const sss = gameBoard[comb[1].row][comb[1].column];
    const tss = gameBoard[comb[2].row][comb[2].column];
    if (fss && fss == sss && fss == tss) {
      winner = players[fss];
    }
  }
  return winner;
}

const deriveGameBoard = (gameTurns) => {
  const gameBoard = [...INITIAL_GAMEBOARD.map(array=>[...array])];
  for (const turn of gameTurns) {
    const {
      square: { row, col },
      player,
    } = turn;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS)


  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard,players)
  const activePlayer = getcurrplayer(gameTurns);
  const isDraw = gameTurns.length === 9 && !winner;


  const handleActiveplayer = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = getcurrplayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  }

  const handlePlayerNameChange = (symbol,name) => {
    setPlayers((prevNames)=>{
      return({
        ...prevNames,
        [symbol]:name
      })
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} editName={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} editName={handlePlayerNameChange}/>
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} restart={handleRestart} />}
        <GameBoard setActivePlayer={handleActiveplayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
