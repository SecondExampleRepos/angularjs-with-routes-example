// react/src/components/ngClick.tsx

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
  const touchPositions = useRef<number[]>([]);
  const rootElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (Date.now() - lastTouchTime < 2500) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
      setActive(true);
    };

    const handleTouchMove = () => {
      setActive(false);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      const touchEnd = { x: touch.clientX, y: touch.clientY };
      const touchDuration = Date.now() - lastTouchTime;
      const touchDistance = Math.sqrt(
        Math.pow(touchEnd.x - (touchStart?.x || 0), 2) + Math.pow(touchEnd.y - (touchStart?.y || 0), 2)
      );

      if (active && touchDuration < 750 && touchDistance < 12) {
        setLastTouchTime(Date.now());
        onClick(event as unknown as React.MouseEvent);
      }
      setActive(false);
    };

    const handleTouchCancel = () => {
      setActive(false);
    };

    const element = rootElement.current;
    if (element) {
      element.addEventListener('click', handleClick, true);
      element.addEventListener('touchstart', handleTouchStart, true);
      element.addEventListener('touchmove', handleTouchMove, true);
      element.addEventListener('touchend', handleTouchEnd, true);
      element.addEventListener('touchcancel', handleTouchCancel, true);
    }

    return () => {
      if (element) {
        element.removeEventListener('click', handleClick, true);
        element.removeEventListener('touchstart', handleTouchStart, true);
        element.removeEventListener('touchmove', handleTouchMove, true);
        element.removeEventListener('touchend', handleTouchEnd, true);
        element.removeEventListener('touchcancel', handleTouchCancel, true);
      }
    };
  }, [lastTouchTime, touchStart, active, onClick]);

  return (
    <div
      ref={rootElement}
      className={`ng-click ${active ? 'ng-click-active' : ''}`}
      onClick={(event) => {
        if (!disabled) {
          onClick(event);
        }
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseMove={() => setActive(false)}
    >
      {children}
    </div>
  );
};

export default NgClick;