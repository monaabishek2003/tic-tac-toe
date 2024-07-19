import { useState } from "react";

import Player from "./components/player";
import GameBoard from "./components/GameBoard";
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  const handleActiveplayer = (rowIndex, colIndex) => {

    setActivePlayer((currPlayer) => (currPlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X"){
        currentPlayer = "O";
      }
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
        <GameBoard setActivePlayer={handleActiveplayer} turns={gameTurns} />
      </div>
      LOGOUT
    </main>
  );
}

export default App;
