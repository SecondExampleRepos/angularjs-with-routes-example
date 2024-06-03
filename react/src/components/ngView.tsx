import React, { useEffect, useState } from 'react';
import { useRootScope } from '../hooks/useRootScope';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: string;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const { someState, setSomeState, someFunction } = useRootScope();
  const [currentView, setCurrentView] = useState<React.ReactNode>(null);

  useEffect(() => {
    const handleRouteChangeSuccess = () => {
      // Placeholder for route change success logic
      // Example: Fetch the new view component and set it
      const newView = <div>New View Content</div>; // Replace with actual view fetching logic
      setCurrentView(newView);

      if (onload) {
        // Execute onload logic if provided
        // Example: eval(onload);
      }

      if (autoscroll) {
        window.scrollTo(0, 0);
      }
    };

    // Simulate route change success event listener
    // Replace with actual event listener logic
    const routeChangeSuccessEvent = new Event('routeChangeSuccess');
    window.addEventListener('routeChangeSuccess', handleRouteChangeSuccess);

    // Trigger the event for demonstration purposes
    window.dispatchEvent(routeChangeSuccessEvent);

    return () => {
      window.removeEventListener('routeChangeSuccess', handleRouteChangeSuccess);
    };
  }, [autoscroll, onload]);

  return (
    <div>
      {currentView}
    </div>
  );
};

export default NgView;