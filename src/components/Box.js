import React from "react";
import "./Box.css";

export const Box = ({ value, onClick, selected }) => {
  const style = value === "X" ? "box x" : "box o";

  if (selected) {
    return (
      <button
        className={style}
        onClick={onClick}
        style={{ border: "3px solid black", backgroundColor: value }}
      />
    );
  } else {
    return <button className={style} onClick={onClick} style={{ backgroundColor: value }} />;
  }
};
