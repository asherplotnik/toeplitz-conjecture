import React, { useEffect, useState } from "react";

const RandomBezierShape = () => {
  const [pathData, setPathData] = useState("");
  const [points, setPoints] = useState([]);
  const [controlPoints, setControlPoints] = useState([]);
  const numOfPoints = 12;
  const radius = 280;
  const centerX = 900;
  const centerY = 400;

  const generateRandomShape = (
    numPoints = 20,
    radius = 100,
    centerX = 150,
    centerY = 150
  ) => {
    const generatedPoints = [];
    const generatedControlPoints = [];
    const angleStep = (2 * Math.PI) / numPoints;
    for (let i = 0; i < numPoints; i++) {
      const angle = angleStep * i;
      const randomRadius = radius + (Math.random() * 80 - Math.random() * 30);
      const x = centerX + randomRadius * Math.cos(angle);
      const y = centerY + randomRadius * Math.sin(angle);
      const toFlip = Math.random() < 0.5 ? 1 : -1;
      generatedPoints.push({ x, y, toFlip});
    }

    let path = `M${generatedPoints[0].x},${generatedPoints[0].y}`;
    for (let i = 0; i < generatedPoints.length; i++) {
      const offset = 100;
      const current = generatedPoints[i];
      const next = generatedPoints[(i + 1) % generatedPoints.length];
      const angle = Math.atan2(next.y - current.y, next.x - current.x); 
      const controlPoint1 = {
        x: current.x + Math.cos(angle + current.toFlip * Math.PI / 2) * offset, 
        y: current.y + Math.sin(angle + current.toFlip * Math.PI / 2) * offset,
      };
      const controlPoint2 = {
        x: next.x + Math.cos(angle - next.toFlip * Math.PI / 2) * offset, 
        y: next.y + Math.sin(angle - next.toFlip * Math.PI / 2) * offset,
      };
      generatedControlPoints.push(controlPoint1);
      generatedControlPoints.push(controlPoint2);
      path += ` C${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${next.x},${next.y}`;
    }

    path += `Z`;
    setPathData(path);
    setPoints(generatedPoints);
    setControlPoints(generatedControlPoints);
  };

  useEffect(() => {
    generateRandomShape(numOfPoints, radius, centerX, centerY);
  }, []);

  return (
    <>
      <path d={pathData} fill="none" stroke="white" strokeWidth="2" />
      {points.map((point, index) => (
        <circle key={index} cx={point.x} cy={point.y} r="3" fill="red" />
      ))}
      {controlPoints.map((point, index) => (
        <circle key={index} cx={point.x} cy={point.y} r="3" fill="yellow" />
      ))}
    </>
  );
};

export default RandomBezierShape;
