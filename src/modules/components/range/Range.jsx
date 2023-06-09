import React, { useState, useEffect, useRef } from "react";
import InputNumber from "../inputNumber/inputNumber";

import "./range.css";

const Range = ({ values, min, max, step = 1, mode = "normal" }) => {
  const [range, setRange] = useState([]);
  const [selectedRange, setSelectedRange] = useState([]);
  const [index1, setIndex1] = useState(null);
  const [index2, setIndex2] = useState(null);

  const [hovered, setHovered] = useState([false, false]);

  useEffect(() => {
    if (mode === "normal") {
      //We make an array with the min and max. At the moment we asume step is gonna be 1, but the component is ready to take another values
      const length = (max - min) / step + 1;
      const range = Array.from({ length }, (_, i) => min + i * step);
      setRange(range);
      setSelectedRange([Math.min(...range), Math.max(...range)]);
      setIndex1(0);
      setIndex2(range.length - 1);
    }
    if (mode == "fixed") {
      setRange(values);
      setSelectedRange([Math.min(...values), Math.max(...values)]);
      setIndex1(0);
      setIndex2(values.length - 1);
    }
  }, []);

  const rangeSize = range[range.length - 1] - range[0];
  const selector1Pos = ((selectedRange[0] - range[0]) / rangeSize) * 100;
  const selector2Pos = ((selectedRange[1] - range[0]) / rangeSize) * 100;

  const hover1 = hovered[0] ? "bulletHover" : "";
  const hover2 = hovered[1] ? "bulletHover" : "";

  const disabled = mode == "normal" ? false : true;

  const selectedRangeWidth = selector2Pos - selector1Pos;

  //Function to calculate the new position with the given restrictions
  const changeSelector1 = (index) => {
    let newIndex1 = index;
    if (newIndex1 >= index2) {
      newIndex1 = index2 - 1;
    }
    const newSelectedRange = [range[newIndex1], selectedRange[1]];
    setIndex1(newIndex1);
    setSelectedRange(newSelectedRange);
  };

  const changeSelector2 = (index) => {
    let newIndex2 = index;
    if (newIndex2 <= index1) {
      newIndex2 = index1 + 1;
    }
    const newSelectedRange = [selectedRange[0], range[newIndex2]];
    setIndex2(newIndex2);
    setSelectedRange(newSelectedRange);
  };

  //Handle to determinate the distance to move the bullet when the mouse is pressed on, and its dragging
  const handleSelector1Drag = (event) => {
    const container = event.target.parentNode;
    if (!container.getBoundingClientRect) return;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = event.clientX - containerRect.left;
    const newSelector1Pos = (mouseX / containerWidth) * 100;
    let newIndex1 = Math.round((newSelector1Pos / 100) * (range.length - 1));
    changeSelector1(newIndex1);
  };

  const handleSelector2Drag = (event) => {
    const container = event.target.parentNode;
    if (!container.getBoundingClientRect) return;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = event.clientX - containerRect.left;
    const newSelector2Pos = (mouseX / containerWidth) * 100;
    let newIndex2 = Math.round((newSelector2Pos / 100) * (range.length - 1));
    changeSelector2(newIndex2);
  };

  const findNumber = (number) => {
    return range.findIndex((element) => number === element);
  };

  const onChangeSelector1 = (value) => {
    const index = findNumber(value);
    changeSelector1(index);
  };

  const onChangeSelector2 = (value) => {
    const index = findNumber(value);
    changeSelector2(index);
  };

  const onMouseEnter = (bullet) => {
    hovered[bullet] = true;
    setHovered(hovered);
  };

  const onMouseLeave = (bullet) => {
    hovered[bullet] = false;
    setHovered(hovered);
  };

  return (
    <div
      data-testid="slider"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ width: "50%", padding: "20px" }}>
        <div style={{ position: "relative" }}>
          <div
            data-testid="selector1"
            className={hover1}
            style={{
              position: "absolute",
              left: `${selector1Pos}%`,
              backgroundColor: "black",
              width: "20px",
              height: "20px",
              borderRadius: "10px",
              zIndex: 1,
              cursor: "grab",
              userSelect: "none",
              marginTop: "-10px",
            }}
            onMouseDown={(event) => {
              event.preventDefault();
              document.addEventListener("mousemove", handleSelector1Drag);
              document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", handleSelector1Drag);
                onMouseLeave(0);
              });
            }}
            onMouseEnter={() => {
              onMouseEnter(0);
            }}
            onMouseLeave={() => {
              onMouseLeave(0);
            }}
          />
          <div
            data-testid="selector2"
            className={hover2}
            style={{
              position: "absolute",
              left: `${selector2Pos}%`,
              backgroundColor: "black",
              width: "20px",
              height: "20px",
              borderRadius: "10px",
              zIndex: 1,
              cursor: "grab",
              userSelect: "none",
              marginTop: "-10px",
            }}
            onMouseDown={(event) => {
              event.preventDefault();
              document.addEventListener("mousemove", handleSelector2Drag);
              document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", handleSelector2Drag);
                onMouseLeave(1);
              });
            }}
            onMouseEnter={() => {
              onMouseEnter(1);
            }}
            onMouseLeave={() => {
              onMouseLeave(1);
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "black",
              width: "100%",
              height: "5px",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: `${selector1Pos}%`,
                backgroundColor: "black",
                height: "100%",
                width: `${selectedRangeWidth}%`,
              }}
            />
          </div>
          <div className="range-slider-labels">
            <InputNumber
              value={selectedRange[0]}
              className="range-slider-label range-slider-bullet-left"
              onChange={(value) =>
                onChangeSelector1(parseInt(value.target.value))
              }
              disabled={disabled}
              name="input1"
            />
            <InputNumber
              value={selectedRange[1]}
              className="range-slider-label range-slider-bullet-right"
              onChange={(value) =>
                onChangeSelector2(parseInt(value.target.value))
              }
              disabled={disabled}
              name="input2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Range;
