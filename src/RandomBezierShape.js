import React, { useEffect, useState } from 'react';

  const RandomBezierShape = () => {
  const [pathData, setPathData] = useState('');
  const [points, setPoints] = useState([]);

  const numOfPoints = 12;
  const radius = 280;
  const centerX = 900;
  const centerY = 400;

  const generateRandomShape = (numPoints = 20, radius = 100, centerX = 150, centerY = 150) => {
    const points = [];
    const angleStep = (2 * Math.PI) / numPoints;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = angleStep * i;
      const randomRadius = radius + (Math.random() * 80 - Math.random() * 30); 
      const x = centerX + randomRadius * Math.cos(angle);
      const y = centerY + randomRadius * Math.sin(angle);
      points.push({ x, y });
    }
  
    let path = `M${points[0].x},${points[0].y}`; 
    for (let i = 0; i < points.length; i++) {
      const odd = 1;
      const offset = 100;
      const current = points[i];
      const next = points[(i + 1) % points.length]; 
    //   const controlPoint1 = { x: current.x + offset, y: current.y + offset}; 
    //   const controlPoint2 = { x: next.x - offset, y: next.y - offset}; 
    const angle = Math.atan2(next.y - current.y, next.x - current.x); // Angle of the line segment

    // Adjust the control points based on the angle
    const controlPoint1 = { 
      x: current.x + Math.cos(angle + Math.PI / 2) * offset, // Perpendicular direction, positive offset
      y: current.y + Math.sin(angle + Math.PI / 2) * offset
    };
    const controlPoint2 = { 
      x: next.x + Math.cos(angle - odd * Math.PI / 2) * offset, // Perpendicular direction, negative offset
      y: next.y + Math.sin(angle - odd * Math.PI / 2) * offset
    };
      path += ` C${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${next.x},${next.y}`;
    }

    path += `Z`;
    return { path, points };
  };


  useEffect(() => {
    const { path, points } = generateRandomShape(numOfPoints, radius, centerX, centerY);
    setPathData(path);
    setPoints(points);
  }, []);

  return (
    <>
      <path d={pathData} fill="none" stroke="white" strokeWidth="2" />
      {points.map((point, index) => (
        <circle key={index} cx={point.x} cy={point.y} r="3" fill="red" />
      ))}
    </>
  );
};

export default RandomBezierShape;
