import React, { useState, useEffect, useRef } from "react";

import InputNumber from "../inputNumber/inputNumber";
import "./range.css";

const Range = ({ values = Array.from({ length: 200 }, (_, i) => i + 1) }) => {
  const [selectedRange, setSelectedRange] = useState([
    Math.min(...values),
    Math.max(...values),
  ]);
  const [index1, setIndex1] = useState(null);
  const [index2, setIndex2] = useState(null);

  const rangeSize = values[values.length - 1] - values[0];

  const selector1Pos = ((selectedRange[0] - values[0]) / rangeSize) * 100;
  const selector2Pos = ((selectedRange[1] - values[0]) / rangeSize) * 100;
  const selectedRangeWidth = selector2Pos - selector1Pos;

  const changeSelector1 = (index) => {
    let newIndex1 = index;
    if (newIndex1 >= index2) {
      newIndex1 = index2 - 1;
    }
    const newSelectedRange = [values[newIndex1], selectedRange[1]];
    setIndex1(newIndex1);
    setSelectedRange(newSelectedRange);
  };

  const changeSelector2 = (index) => {
    let newIndex2 = index;
    if (newIndex2 <= index1) {
      newIndex2 = index1 + 1;
    }
    const newSelectedRange = [selectedRange[0], values[newIndex2]];
    setIndex2(newIndex2);
    setSelectedRange(newSelectedRange);
  };

  const handleSelector1Drag = (event) => {
    const container = event.target.parentNode;
    if (!container.getBoundingClientRect) return;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = event.clientX - containerRect.left;
    const newSelector1Pos = (mouseX / containerWidth) * 100;
    let newIndex1 = Math.round((newSelector1Pos / 100) * (values.length - 1));
    changeSelector1(newIndex1);
  };

  const handleSelector2Drag = (event) => {
    const container = event.target.parentNode;
    if (!container.getBoundingClientRect) return;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = event.clientX - containerRect.left;
    const newSelector2Pos = (mouseX / containerWidth) * 100;
    let newIndex2 = Math.round((newSelector2Pos / 100) * (values.length - 1));
    changeSelector2(newIndex2);
  };

  const findNumber = (number) => {
    return values.findIndex((element) => number === element);
  };

  const onChangeSelector1 = (value) => {
    const index = findNumber(value);
    changeSelector1(index);
  };

  const onChangeSelector2 = (value) => {
    const index = findNumber(value);
    changeSelector2(index);
  };

  return (
    <div
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
              });
            }}
          />
          <div
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
              });
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
              disabled={false}
            />
            <InputNumber
              value={selectedRange[1]}
              className="range-slider-label range-slider-bullet-right"
              onChange={(value) =>
                onChangeSelector2(parseInt(value.target.value))
              }
              disabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Range;
