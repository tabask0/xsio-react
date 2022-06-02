import React from "react";
import Box from "./Box";

const style = {
  width: "250px",
  height: "250px",
  margin: "10px auto",
  display: "grid",
  gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
};

const Board = (props) => (
  <div style={style}>
    {[...Array(9)].map((_, pos) => (
      <Box
        key={pos}
        name={pos}
        onClick={() => props.onClick(pos)}
        value={props.value[pos]}
      />
    ))}
  </div>
);

export default Board;
