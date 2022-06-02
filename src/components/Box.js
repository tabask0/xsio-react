import React from "react";

const style = {
  border: "3px solid black",
  borderRadius: "5px",
  margin: "1px",
  fontSize: "40px",
};

export const Box = (props) => (
  <button name={props.name} style={style} onClick={props.onClick}>
    {" "}
    {props.value}{" "}
  </button>
);

export default Box;
