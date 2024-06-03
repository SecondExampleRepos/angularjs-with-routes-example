import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';

interface Route {
  locals: any;
  controller?: string;
  controllerAs?: string;
  template?: string;
  templateUrl?: string;
}

const NgView: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const location = useLocation();
  const { state, updateState } = useRootScope();

  useEffect(() => {
    const handleRouteChange = () => {
      const newRoute: Route = state.routes.find(route => route.path === location.pathname) || null;
      const newRoute: Route = {}; // Placeholder for the new route logic
      setCurrentRoute(newRoute);

      if (newRoute.template) {
        setTemplate(newRoute.template);
      } else if (newRoute.templateUrl) {
        fetch(newRoute.templateUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(template => setTemplate(template))
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
        fetch(newRoute.templateUrl)
          .then(response => response.text())
          .then(template => setTemplate(template));
      }
    };
import { useController } from '../hooks/useController';

const controllerInstance = useController(currentRoute.controller, currentRoute.locals);
if (currentRoute.controllerAs) {
  state[currentRoute.controllerAs] = controllerInstance;
}
updateState(state);
    handleRouteChange();
    // Listen for location changes
    return () => {
      // Cleanup logic if needed
    };
  }, [location]);

  useEffect(() => {
    if (currentRoute && currentRoute.controller) {
      const controllerInstance = useController(currentRoute.controller, currentRoute.locals);
      if (currentRoute.controllerAs) {
        state[currentRoute.controllerAs] = controllerInstance;
      }
      updateState(state);
    }
  }, [currentRoute]);

  return (
    <div>
      {template && (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      )}
    </div>
  );
};

export default NgView;