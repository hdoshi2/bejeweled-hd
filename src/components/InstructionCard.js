import React from "react";
import "./InstructionCard.css";

export const InstructionCard = () => {
  return (
    <div className="card">
      <div className="container">
        <h4>
          <b>Welcome to Bejeweled. Instructions to play are provided below:</b>
        </h4>
        <ul>
          <li>Swap boxes to make three or more same-colored boxes in succession.</li>
          <li>To swap click on two adjacent boxes.</li>
        </ul>
      </div>
    </div>
  );
};
