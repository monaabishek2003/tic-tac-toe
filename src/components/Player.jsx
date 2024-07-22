import { useState } from "react";

const Player = ({ name, symbol, isActive,editName }) => {
  console.log(name)
  const [playerName, setplayerName] = useState(name);
  const [isEditing, setisEditing] = useState(false);

  const handleClick = () => {
    setisEditing((e) => !e);
    if(isEditing) editName(symbol ,playerName);
  }
  console.log(playerName)
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            value={playerName}
            onChange={(event) => setplayerName(event.target.value)}
            required
          ></input>
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
