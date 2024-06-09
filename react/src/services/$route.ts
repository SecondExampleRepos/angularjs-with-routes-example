// react/src/services/$route.ts

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTemplate, fetchController } from '../utils/fetchHelpers'; // Assuming these helper functions exist

interface Route {
  originalPath: string;
  regexp: RegExp;
  keys: Array<{ name: string; optional: boolean }>;
  caseInsensitiveMatch?: boolean;
  reloadOnSearch?: boolean;
  redirectTo?: string | ((params: any, path: string, search: any) => string);
  resolve?: { [key: string]: any };
  template?: string | ((params: any) => string);
  templateUrl?: string | ((params: any) => string);
  controller?: string | ((params: any) => any);
  controllerAs?: string;
  locals?: { [key: string]: any };
  params?: { [key: string]: any };
  pathParams?: { [key: string]: any };
  loadedTemplateUrl?: string;
}

interface RouteService {
  routes: { [path: string]: Route };
  reload: () => void;
  updateParams: (params: { [key: string]: any }) => void;
}

const useRoute = (): RouteService => {
  const [routes, setRoutes] = useState<{ [path: string]: Route }>({});
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleLocationChange = () => {
      const newRoute = matchRoute(location.pathname);
      if (newRoute) {
        setCurrentRoute(newRoute);
        // Trigger any side effects or state updates needed on route change success
        if (newRoute.resolve) {
          const resolvedData = {};
          for (const key in newRoute.resolve) {
            if (newRoute.resolve.hasOwnProperty(key)) {
window.addEventListener('popstate', handleLocationChange);
            }
          }
          newRoute.locals = { ...newRoute.locals, ...resolvedData };
        }
        if (newRoute.templateUrl) {
          fetchTemplate(newRoute.templateUrl).then(template => {
            newRoute.template = template;
            setCurrentRoute({ ...newRoute });
          }).catch(error => {
            console.error('Error fetching template:', error);
          });
        } else if (newRoute.template) {
          setCurrentRoute({ ...newRoute });
        }
      }
    };

    handleLocationChange();
    if (currentRoute) {
      const newRoute = matchRoute(location.pathname);
      if (newRoute) {
        setCurrentRoute(newRoute);
        // Add logic to handle route change success
        // Fetch and set the template if defined
        if (newRoute.templateUrl) {
      window.history.pushState({}, '', newPath);
            newRoute.locals = { ...newRoute.locals, $template: template };
            setCurrentRoute({ ...newRoute });
          }).catch(error => {
            console.error('Error fetching template:', error);
          });
        } else if (newRoute.template) {
          newRoute.locals = { ...newRoute.locals, $template: newRoute.template };
          setCurrentRoute({ ...newRoute });
        }
        // Fetch and set the controller if defined
        if (newRoute.controller) {
          fetchController(newRoute.controller).then(controller => {
            newRoute.locals = { ...newRoute.locals, $controller: controller };
            setCurrentRoute({ ...newRoute });
          }).catch(error => {
            console.error('Error fetching controller:', error);
          });
        }
      }
    }
  }, [location]);

  const matchRoute = (path: string): Route | null => {
    for (const routePath in routes) {
      const route = routes[routePath];
      const match = route.regexp.exec(path);
      if (match) {
        const params: { [key: string]: any } = {};
        route.keys.forEach((key, index) => {
          params[key.name] = match[index + 1];
        });
        return { ...route, params, pathParams: params };
      }
    }
    return null;
  };

  const reload = () => {
    if (currentRoute) {
      const newRoute = matchRoute(location.pathname);
      if (newRoute) {
        setCurrentRoute(newRoute);
        // Trigger any side effects or state updates needed on route reload
        if (newRoute.resolve) {
          const resolvedData = {};
      window.history.pushState({}, '', newPath);
            if (newRoute.resolve.hasOwnProperty(key)) {
              // Assuming resolve functions return promises
              resolvedData[key] = newRoute.resolve[key]();
            }
          }
          newRoute.locals = { ...newRoute.locals, ...resolvedData };
        }
        if (newRoute.templateUrl) {
          fetchTemplate(newRoute.templateUrl).then(template => {
            newRoute.template = template;
            setCurrentRoute({ ...newRoute });
          }).catch(error => {
            console.error('Error fetching template:', error);
          });
        } else if (newRoute.template) {
          setCurrentRoute({ ...newRoute });
        }
        if (newRoute.controller) {
          fetchController(newRoute.controller).then(controller => {
            newRoute.locals = { ...newRoute.locals, $controller: controller };
            setCurrentRoute({ ...newRoute });
          }).catch(error => {
            console.error('Error fetching controller:', error);
          });
        }
      }
    }
  };

  const updateParams = (params: { [key: string]: any }) => {
    if (currentRoute) {
      const newParams = { ...currentRoute.params, ...params };
      const newPath = generatePath(currentRoute.originalPath, newParams);
      window.history.pushState({}, '', newPath);
    } else {
      throw new Error('No route to update');
    }
  };

  const generatePath = (path: string, params: { [key: string]: any }): string => {
    return path.replace(/:([^\/]+)/g, (_, key) => params[key] || '');
  };

  return {
    routes,
    reload,
    updateParams,
  };
};

export default useRoute;