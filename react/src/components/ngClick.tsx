import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);
  const touchTimeout = useRef<number | null>(null);
  const touchCoordinates = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
    };
  }, []);

  const handleTouchStart = (event: React.TouchEvent) => {
    setActive(true);
    const touch = event.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = () => {
    setActive(false);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - lastTouchTime;

    if (touchStart && touchDuration < 750) {
      const distance = Math.sqrt(
        Math.pow(touch.clientX - touchStart.x, 2) + Math.pow(touch.clientY - touchStart.y, 2)
      );

      if (distance < 12) {
        if (!touchCoordinates.current.some((coord, index) => index % 2 === 0 && coord === touch.clientX && touchCoordinates.current[index + 1] === touch.clientY)) {
          touchCoordinates.current.push(touch.clientX, touch.clientY);
          touchTimeout.current = window.setTimeout(() => {
            touchCoordinates.current = touchCoordinates.current.filter((coord, index) => index % 2 !== 0 || coord !== touch.clientX || touchCoordinates.current[index + 1] !== touch.clientY);
          }, 2500);
          if (!disabled) {
            onClick(event);
          }
        }
      }
    }

    setActive(false);
    setLastTouchTime(touchEndTime);
  };

  const handleMouseDown = () => {
    setActive(true);
  };

  const handleMouseUp = () => {
    setActive(false);
  };

  return (
    <div
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default NgClick;