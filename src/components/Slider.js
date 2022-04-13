import React from "react";
import { Box } from "./Box";
import "./Slider.css";

export const Slider = ({ sliderRange, setRange }) => {
  return (
    <div className="slider-parent">
      <h2 className="test">Set Speed:</h2>
      <input
        type="range"
        min="1"
        max="100"
        className="slider"
        value={sliderRange}
        onChange={({ target: { value: radius } }) => {
          setRange(radius);
        }}
      />
      <div className="bubble">{sliderRange}</div>
    </div>
  );
};
