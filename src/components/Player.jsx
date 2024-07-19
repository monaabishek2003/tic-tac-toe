import { useState } from "react";

const Player = ({ name, symbol, isActive }) => {
  const [playerName, setplayerName] = useState(name);
  const [isEditing, setisEditing] = useState(false);



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
      <button onClick={()=>setisEditing((e) => !e)}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
