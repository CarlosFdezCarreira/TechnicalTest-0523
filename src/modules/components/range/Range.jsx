import React, { useState, useEffect, useRef} from "react";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";

import InputNumber from "../inputNumber/inputNumber";
import "./range.css";

const RANGE_MODES = {
    "NORMAL": 0,
    "FIXED": 1
}

const Range = ({mode = "NORMAL", data, min = 1, max = 100, step = 1, initialValue = 5}) => {

    const [rangeValue, setRangeValue] = useState("")

    useEffect(()=>{
        if(!isEmpty(data)){
            setRangeValue(JSON.stringify(data))
        }
    },[data])

  const [value, setValue] = useState(initialValue);
  const [dragging, setDragging] = useState(false);
  const [hoveredBullet, setHoveredBullet] = useState(null);
  const [selectedBullet, setSelectedBullet] = useState(null);
  const [minBulletPosition, setMinBulletPosition] = useState(min);
  const [maxBulletPosition, setMaxBulletPosition] = useState(max);

  const rangeRef = useRef(null);

  const handleMouseDown = (bulletIndex) => {
    setDragging(true);
    setSelectedBullet(bulletIndex)
  };

  const handleMouseUp = () => {
    setDragging(false);
    setSelectedBullet(null);
  };

  const handleMouseMove = (e) => {
    if (!dragging || isNull(selectedBullet)) {
      return;
    }

    const rangeRect = rangeRef.current.getBoundingClientRect();
    const rangeWidth = rangeRect.width;
    const clickX = e.clientX - rangeRect.left;
    const percentage = clickX / rangeWidth;
    
    const newValue = Math.round(min + percentage * (max - min) / step) * step;
    console.log(newValue);

    if (selectedBullet === 0) {
      onChangeMinLabel(newValue);
    } 
    if (selectedBullet === 1) {
      onChangeMaxLabel(newValue);
    }
  };

  const handleBulletMouseEnter = (bulletIndex) => {
    setHoveredBullet(bulletIndex);
  };

  const handleBulletMouseLeave = () => {
    setHoveredBullet(null);
  };

  const onChangeMinLabel = (value) => {
    console.log("MINBULLET " + value)
    if (value<min) {
      setMinBulletPosition(min);
      return;
    }
    if (value>=maxBulletPosition) {
      setMinBulletPosition(maxBulletPosition-1);
      return;
    }
    setMinBulletPosition(value);
  };

  const onChangeMaxLabel = (value) => {
    console.log("MAXBULLET " + value)
    if (value>max) {
      setMaxBulletPosition(max);
      return;
    }
    if (value<=minBulletPosition){
      setMaxBulletPosition(minBulletPosition+1)
      return;
    }
    setMaxBulletPosition(value);  
  };

  const minBulletStyle = {
    left: `${minBulletPosition}%`,
    cursor: hoveredBullet === 0 ? "grab" : "pointer",
  };

  const maxBulletStyle = {
    left: `${maxBulletPosition}%`,
    cursor: hoveredBullet === 1 ? "grab" : "pointer",
  };

  const trackStyle = {
    width: `${((value - min) / (max - min)) * 100}%`,
  };
  

  return (
    <div
      className="range-slider-container"
      ref={rangeRef}
      onMouseMove={handleMouseMove}
      onMouseUp={() => handleMouseUp()}
      onMouseOut={() => handleBulletMouseLeave()}
    >
      <div className="range-slider-track" style={trackStyle} />
      <div
        className="range-slider-bullet"
        style={minBulletStyle}
        onMouseDown={() => handleMouseDown(0)}
        onMouseEnter={() => handleBulletMouseEnter(0)}
        onMouseOut={() => handleBulletMouseLeave()}
        onMouseUp={() => handleMouseUp()}

      />
      <div
        className="range-slider-bullet"
        style={maxBulletStyle}
        onMouseDown={() => handleMouseDown(1)}
        onMouseEnter={() => handleBulletMouseEnter(1)}
        onMouseOut={() => handleBulletMouseLeave()}
        onMouseUp={() => handleMouseUp()}
      />
      <div className="range-slider-labels">
        <InputNumber
          value={minBulletPosition}
          className="range-slider-label range-slider-bullet-left"
          onChange={(value) => onChangeMinLabel(parseInt(value.target.value))}
          disabled={false}
        />
        <InputNumber
          value={maxBulletPosition}
          className="range-slider-label range-slider-bullet-right"
          onChange={(value) => onChangeMaxLabel(parseInt(value.target.value))}
          disabled={false}
        />
      </div>
    </div>
  );
  
}

export default Range;