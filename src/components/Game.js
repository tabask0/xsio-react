import React, { useState, useEffect } from "react";
import Board from "./Board";

import Message from "./Message";
import Play from "./Play";

const isWon = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
};

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isPlayer, setIsPlayer] = useState("");
  const [players, setPlayers] = useState([]);
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [message, setMessage] = useState("Click to Start");
  const [pos, setPos] = useState([]);
  const [sec, setSec] = useState(new Date().toISOString().slice(11, 19));

  const play = () => {
    setBoard(Array(9).fill(""));
    setMessage("Click to start");
    setIsPlayer("X");
  };

  useEffect(() => {
    const timer = setInterval(
      () => setSec(new Date().toISOString().slice(11, 19)),
      1000
    );

    return () => {
      clearInterval(timer);
    };
  });

  const time = () => {
    let a = new Date().toISOString();
    return a.slice(11, 19);
  };

  const handleInput = (pos) => {
    if (isPlayer === "" || board[pos] !== "") {
      return;
    }

    const boardCopy = [...board];
    boardCopy[pos] = isPlayer;
    setBoard(boardCopy);
    setPos(`${[...boardCopy[pos], pos]} ${time()}`);

    if (isWon(boardCopy)) {
      setMessage(`WON: ${isPlayer === "X" ? players[0] : players[1]}`);
      setIsPlayer("");
      return;
    }

    if (boardCopy.indexOf("") === -1) {
      setMessage("DRAW");
      setIsPlayer("");
    } else {
      let nextPlayer = isPlayer === "X" ? "O" : "X";
      setIsPlayer(nextPlayer);
      setMessage(`TURN: ${nextPlayer}`);
    }
  };

  return (
    <div>
      <Message value={message} />
      <div className="inputs">
        <div className="input">
          <p>Player X: {players[0]}</p>
          <input
            style={{ marginBottom: "15px" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => setPlayers([input])}>Ready up!</button>
        </div>
        <div className="input">
          <p>Player O: {players[1]}</p>
          <input
            style={{ marginBottom: "15px" }}
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <button onClick={() => setPlayers([...players, input2])}>
            Ready up!
          </button>
        </div>
      </div>
      <Board onClick={handleInput} value={board} />
      <Play onClick={play} value={"Play"} />
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignText: "center",
          marginTop: "50px",
        }}
      >
        {JSON.stringify(sec).slice(1, 9)}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignText: "center",
          marginTop: "100px",
        }}
      >
        {[pos]}
      </div>
    </div>
  );
};

export default Game;
