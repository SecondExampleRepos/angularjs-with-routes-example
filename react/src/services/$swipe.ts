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

const mouseEvents = {
  start: "mousedown",
  move: "mousemove",
  end: "mouseup",
};

const touchEvents = {
  start: "touchstart",
  move: "touchmove",
  end: "touchend",
  cancel: "touchcancel",
};

const getPoint = (event: any): Point => {
  const e = event.touches && event.touches.length ? event.touches[0] : event;
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

const bindEvents = (
  element: HTMLElement,
  handlers: SwipeHandlers,
  eventTypes: string[] = ["mouse", "touch"]
) => {
  let startPoint: Point | null = null;
  let isSwiping = false;

  const startHandler = (event: Event) => {
    startPoint = getPoint(event);
    isSwiping = true;
    handlers.start && handlers.start(startPoint, event);
  };

  const moveHandler = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    const currentPoint = getPoint(event);
    const deltaX = Math.abs(currentPoint.x - startPoint.x);
    const deltaY = Math.abs(currentPoint.y - startPoint.y);

    if (deltaX > 10 || deltaY > 10) {
      isSwiping = false;
      handlers.cancel && handlers.cancel(event);
    } else {
      handlers.move && handlers.move(currentPoint, event);
    }
  };

  const endHandler = (event: Event) => {
    if (!isSwiping || !startPoint) return;
    isSwiping = false;
    const endPoint = getPoint(event);
    handlers.end && handlers.end(endPoint, event);
  };

  const cancelHandler = (event: Event) => {
    isSwiping = false;
    handlers.cancel && handlers.cancel(event);
  };

  eventTypes.forEach((type) => {
    const events = type === "mouse" ? mouseEvents : touchEvents;
    element.addEventListener(events.start, startHandler);
    element.addEventListener(events.move, moveHandler);
    element.addEventListener(events.end, endHandler);
    if (events.cancel) {
      element.addEventListener(events.cancel, cancelHandler);
    }
  });

  return () => {
    eventTypes.forEach((type) => {
      const events = type === "mouse" ? mouseEvents : touchEvents;
      element.removeEventListener(events.start, startHandler);
      element.removeEventListener(events.move, moveHandler);
      element.removeEventListener(events.end, endHandler);
      if (events.cancel) {
        element.removeEventListener(events.cancel, cancelHandler);
      }
    });
  };
};

export { bindEvents, SwipeHandlers, Point };