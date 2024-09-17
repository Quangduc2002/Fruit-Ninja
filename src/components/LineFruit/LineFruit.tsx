import { useRef, useEffect, useState } from 'react';

const LineFruit = () => {
  const canvasRef = useRef<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawLine = (startX: any, startY: any, endX: any, endY: any) => {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    };

    const handleMouseMove = (e: any) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      clearCanvas();
      drawLine(mousePosition.x, mousePosition.y, x, y);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  return <canvas className='absolute top-0 background ' ref={canvasRef} />;
};

export default LineFruit;
