import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTemplate, getController } from '../utils/helpers'; // Assuming these helper functions exist

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
  controller?: string | ((locals: any) => any);
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
  const [routes, setRoutes] = useState<{ [path: string]: Route }>({});
  const location = useLocation();

  useEffect(() => {
    const handleLocationChange = () => {
const handleLocationChange = () => {
  const currentPath = location.pathname;
  const currentRoute = routes[currentPath] || routes[null];

  if (currentRoute) {
    const { template, templateUrl, controller, resolve } = currentRoute;

    // Fetch and set the template if available
    setRoutes((prevRoutes) => {
      const updatedRoutes = { ...prevRoutes };
      Object.keys(updatedRoutes).forEach((path) => {
        const route = updatedRoutes[path];
const updateParams = (params: { [key: string]: any }) => {
  if (routes[location.pathname]) {
    const currentRoute = routes[location.pathname];
    const newParams = { ...currentRoute.params, ...params };
    const newPath = currentRoute.originalPath.replace(/:(\w+)/g, (_, key) => newParams[key] || '');
    const newSearch = new URLSearchParams(location.search);

    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        newSearch.set(key, params[key]);
      } else {
        newSearch.delete(key);
      }
    });

    window.history.pushState({}, '', `${newPath}?${newSearch.toString()}`);
  } else {
    console.warn('No route found for the current path');
  }
};
          updatedRoutes[path] = { ...route, reloadOnSearch: false };
        }
      });
      return updatedRoutes;
    });
      currentRoute.locals = { ...currentRoute.locals, $template: typeof template === 'function' ? template(currentRoute.params) : template };
    } else if (templateUrl) {
      getTemplate(typeof templateUrl === 'function' ? templateUrl(currentRoute.params) : templateUrl)
        .then((tpl) => {
          currentRoute.locals = { ...currentRoute.locals, $template: tpl };
        })
        .catch((error) => {
          console.error('Error fetching template:', error);
        });
    }

    // Resolve any dependencies
    if (resolve) {
      const resolvedLocals = {};
      for (const key in resolve) {
        if (resolve.hasOwnProperty(key)) {
          const resolver = resolve[key];
          resolvedLocals[key] = typeof resolver === 'function' ? resolver() : resolver;
        }
      }
      currentRoute.locals = { ...currentRoute.locals, ...resolvedLocals };
    }

    // Set the controller if available
    if (controller) {
      currentRoute.locals = { ...currentRoute.locals, $controller: typeof controller === 'function' ? controller(currentRoute.locals) : getController(controller, currentRoute.locals) };
    }
  }
};
    };

    // Listen for location changes
    handleLocationChange();
  }, [location]);

  const reload = () => {
    setRoutes((prevRoutes) => {
      const updatedRoutes = { ...prevRoutes };
      Object.keys(updatedRoutes).forEach((path) => {
        const route = updatedRoutes[path];
    if (routes[location.pathname]) {
      const currentRoute = routes[location.pathname];
      const newParams = { ...currentRoute.params, ...params };
      const newPath = currentRoute.originalPath.replace(/:(\w+)/g, (_, key) => newParams[key] || '');
      const newSearch = new URLSearchParams(location.search);

      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
          newSearch.set(key, params[key]);
        } else {
          newSearch.delete(key);
        }
      });

      window.history.pushState({}, '', `${newPath}?${newSearch.toString()}`);
    } else {
      console.warn('No route found for the current path');
    }
      });
      return updatedRoutes;
    });
    window.location.reload();
  };

  const updateParams = (params: { [key: string]: any }) => {
    if (routes[location.pathname]) {
      const currentRoute = routes[location.pathname];
      const newParams = { ...currentRoute.params, ...params };
      const newPath = currentRoute.originalPath.replace(/:(\w+)/g, (_, key) => newParams[key] || '');
      const newSearch = new URLSearchParams(location.search);

      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
          newSearch.set(key, params[key]);
        } else {
          newSearch.delete(key);
        }
      });

      window.history.pushState({}, '', `${newPath}?${newSearch.toString()}`);
    } else {
      console.warn('No route found for the current path');
    }
  };

  const when = (path: string, route: Route) => {
    const newRoute = { ...route, originalPath: path, regexp: new RegExp(path) };
    setRoutes((prevRoutes) => ({ ...prevRoutes, [path]: newRoute }));
  };

  const otherwise = (route: Route) => {
    when(null, route);
  };

  return {
    routes,
    reload,
    updateParams,
  };
};

export default useRoute;