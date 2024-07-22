import { useState } from "react";

import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combination,js";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  
  const getcurrplayer = (gameTurns) => {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X"){
      currentPlayer = "O";
    }
    return currentPlayer;
  }
  const gameBoard = initialGameBoard;  
  for(const turn of gameTurns){
    const { square:{row,col}, player } = turn;
    gameBoard[row][col] = player;
  }
  
  let winner;
  for(const comb of WINNING_COMBINATIONS){
 
    const fss = gameBoard[comb[0].row][comb[0].column]
    const sss = gameBoard[comb[1].row][comb[1].column]
    const tss = gameBoard[comb[2].row][comb[2].column]
    if(fss && fss==sss && fss==tss) {winner = fss}
    
  }

  const activePlayer = getcurrplayer(gameTurns);

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player-1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="player-2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {winner && <p>you won {winner}</p>}
        <GameBoard setActivePlayer={handleActiveplayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
