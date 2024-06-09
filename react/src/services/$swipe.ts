// react/src/services/$swipe.ts

type Point = {
  x: number;
  y: number;
};

type SwipeHandlers = {
  start?: (point: Point, event: Event) => void;
  move?: (point: Point, event: Event) => void;
  end?: (point: Point, event: Event) => void;
  cancel?: (event: Event) => void;
};

const getPoint = (event: any): Point => {
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

const getEventName = (types: string[], phase: string): string => {
  const events: { [key: string]: { [key: string]: string } } = {
    mouse: { start: 'mousedown', move: 'mousemove', end: 'mouseup' },
    touch: { start: 'touchstart', move: 'touchmove', end: 'touchend', cancel: 'touchcancel' },
  };
  return types.map(type => events[type][phase]).join(' ');
};

const bindSwipe = (element: HTMLElement, handlers: SwipeHandlers, types: string[] = ['mouse', 'touch']) => {
  let startPoint: Point | null = null;
  let isSwiping = false;
  let totalX = 0;
  let totalY = 0;
  let lastPoint: Point | null = null;

  const startHandler = (event: Event) => {
    startPoint = getPoint(event);
    isSwiping = true;
    totalX = 0;
    totalY = 0;
    lastPoint = startPoint;
    handlers.start && handlers.start(startPoint, event);
  };

  const moveHandler = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    const point = getPoint(event);
    totalX += Math.abs(point.x - lastPoint!.x);
    totalY += Math.abs(point.y - lastPoint!.y);
    lastPoint = point;
    if (totalX > 10 || totalY > 10) {
      if (totalY > totalX) {
        isSwiping = false;
        handlers.cancel && handlers.cancel(event);
      } else {
        event.preventDefault();
        handlers.move && handlers.move(point, event);
      }
    }
  };

  const endHandler = (event: Event) => {
    if (isSwiping && startPoint) {
      isSwiping = false;
      handlers.end && handlers.end(getPoint(event), event);
    }
  };

  const cancelHandler = (event: Event) => {
    isSwiping = false;
    handlers.cancel && handlers.cancel(event);
  };

  element.addEventListener(getEventName(types, 'start'), startHandler);
  element.addEventListener(getEventName(types, 'move'), moveHandler);
  element.addEventListener(getEventName(types, 'end'), endHandler);
  if (types.includes('touch')) {
    element.addEventListener(getEventName(types, 'cancel'), cancelHandler);
  }

  return () => {
    element.removeEventListener(getEventName(types, 'start'), startHandler);
    element.removeEventListener(getEventName(types, 'move'), moveHandler);
    element.removeEventListener(getEventName(types, 'end'), endHandler);
    if (types.includes('touch')) {
      element.removeEventListener(getEventName(types, 'cancel'), cancelHandler);
    }
  };
};

export { bindSwipe, SwipeHandlers, Point };