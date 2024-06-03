import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';

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
  loadedTemplateUrl?: string;
}

interface RouteService {
  routes: { [path: string]: Route };
  reload: () => void;
  updateParams: (params: { [key: string]: any }) => void;
}

const useRoute = (): RouteService => {
  const { state: rootScopeState } = useRootScope();
  const location = useLocation();
  const [routes, setRoutes] = useState<{ [path: string]: Route }>({});
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      const newRoute = matchRoute(location.pathname);
      if (newRoute) {
        setCurrentRoute(newRoute);
        rootScopeState.$broadcast && rootScopeState.$broadcast('$routeChangeSuccess', newRoute);
      }
    };

    handleLocationChange();
window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [location]);

  const matchRoute = (path: string): Route | null => {
    for (const routePath in routes) {
      const route = routes[routePath];
      const match = route.regexp.exec(path);
      if (match) {
        const params: { [key: string]: string } = {};
        route.keys.forEach((key, index) => {
          params[key.name] = match[index + 1];
        });
        return { ...route, params };
      }
    }
    return null;
  };

  const reload = () => {
    if (currentRoute) {
      const newRoute = matchRoute(location.pathname);
      if (newRoute) {
        setCurrentRoute(newRoute);
        // Trigger any side effects or state updates needed for the new route
      }
    }
      window.history.pushState({}, '', newPath + '?' + new URLSearchParams(newParams).toString());

  const updateParams = (params: { [key: string]: any }) => {
    if (currentRoute) {
      const newParams = { ...currentRoute.params, ...params };
      const newPath = currentRoute.originalPath.replace(/:([^\/]+)/g, (_, key) => newParams[key] || '');
      window.history.pushState({}, '', newPath + '?' + new URLSearchParams(newParams).toString());
    } else {
      throw new Error('No route to update');
    }
  };

  return {
    routes,
    reload,
    updateParams,
  };
};

export default useRoute;