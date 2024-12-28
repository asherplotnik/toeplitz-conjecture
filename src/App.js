import React, { useState } from "react";
import RandomBezierShape from "./RandomBezierShape";
import "./App.css";

const App = () => {
  const [square, setSquare] = useState({
    x: 50,
    y: 50,
    size: 100,
    rotation: 0,
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
  });
 
  const [delta, setDelta] = useState(1);

  const handleMouseDown = (e) => {
    setSquare({
      ...square,
      isDragging: true,
      dragOffset: {
        x: e.clientX - square.x,
        y: e.clientY - square.y,
      },
    });
  };

  const handleMouseMove = (e) => {
    if (square.isDragging) {
      setSquare({
        ...square,
        x: e.clientX - square.dragOffset.x,
        y: e.clientY - square.dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setSquare({ ...square, isDragging: false });
  };

  const handleResize = (delta) => {
    setSquare({ ...square, size: square.size + delta });
  };

  const handleRotate = () => {
    setSquare({ ...square, rotation: (square.rotation + delta) % 360 });
  };

  const handleDeltaChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setDelta(value);
  };

  const handleWheel = (e) => {
    if (square.isDragging) {
      setSquare({
        ...square,
        rotation: (square.rotation + (e.deltaY > 0 ? delta : -delta)) % 360,
      });
    } else {
      const newSize = Math.max(10, square.size + (e.deltaY > 0 ? -delta : delta)); 
      setSquare({ ...square, size: newSize });
    }
  };

  return (
    <div
      className="App"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <svg width="100%" height="100%" style={{ border: "1px solid #ccc" }}>
        <RandomBezierShape />
        <g
          transform={`translate(${square.x}, ${square.y}) rotate(${square.rotation})`}
          onMouseDown={handleMouseDown}
        >
          <rect
            x={-square.size / 2}
            y={-square.size / 2}
            width={square.size}
            height={square.size}
            stroke="white"
            fill="transparent"
            strokeWidth="2"
            cursor="move"
          />
        </g>
      </svg>
      <div className="controls">
        <button onClick={() => handleResize(delta)}>Resize +</button>
        <button onClick={() => handleResize(-delta)}>Resize -</button>
        <button onClick={handleRotate}>Rotate ↻</button>
        <div>
          <label>
            Delta:
            <input
              type="number"
              name="resizeDelta"
              value={delta}
              onChange={handleDeltaChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;