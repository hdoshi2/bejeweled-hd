import React from "react";
import "./InstructionCard.css";

export const InstructionCard = () => {
  return (
    <div class="card">
      <div class="container">
        <h4>
          <b>Welcome to Bejeweled. Instructions to play are below:</b>
        </h4>
        <ul>
          <li>Swap boxes to make three same-colored boxes in a row.</li>
          <li>To swap click on two adjacent boxes.</li>
          <li>Example 3</li>
        </ul>
      </div>
    </div>
  );
};
