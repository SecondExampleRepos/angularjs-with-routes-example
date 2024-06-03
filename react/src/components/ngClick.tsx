import React, { useState, useEffect, useRef } from 'react';

interface NgClickProps {
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
}

const NgClick: React.FC<NgClickProps> = ({ onClick, disabled, children }) => {
  const [active, setActive] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [lastTouch, setLastTouch] = useState<number | null>(null);
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const rootElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    rootElement.current = document.documentElement;
    return () => {
      if (rootElement.current) {
        rootElement.current.removeEventListener('click', handleDocumentClick, true);
        rootElement.current.removeEventListener('touchstart', handleDocumentTouchStart, true);
      }
    };
  }, []);

  const handleDocumentClick = (event: MouseEvent) => {
    if (Date.now() - (lastTouch || 0) < 2500) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const handleDocumentTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (touch) {
      setLastTouch(Date.now());
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setActive(true);
    const touch = event.touches[0];
    if (touch) {
      setTouchStart({ x: touch.clientX, y: touch.clientY });
      setTouchEnd(Date.now());
    }
  };

  const handleTouchMove = () => {
    setActive(false);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    if (touch && touchStart) {
      const distance = Math.sqrt(Math.pow(touch.clientX - touchStart.x, 2) + Math.pow(touch.clientY - touchStart.y, 2));
      if (Date.now() - (touchEnd || 0) < 750 && distance < 12) {
        if (!rootElement.current) {
          rootElement.current = document.documentElement;
          rootElement.current.addEventListener('click', handleDocumentClick, true);
          rootElement.current.addEventListener('touchstart', handleDocumentTouchStart, true);
        }
        setLastTouch(Date.now());
        onClick(event);
      }
    }
    setActive(false);
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
      onClick={(event) => {
        if (!disabled) {
          onClick(event);
        }
      }}
    >
      {children}
    </div>
  );
};

export default NgClick;