// react/src/services/$resource.ts

import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ResourceOptions {
  stripTrailingSlashes?: boolean;
  actions?: Record<string, ActionOptions>;
}

interface ActionOptions {
  method: string;
  isArray?: boolean;
  params?: Record<string, any>;
  url?: string;
  interceptor?: {
    response?: (response: AxiosResponse) => any;
    responseError?: (error: any) => any;
  };
}

interface ResourceInstance {
  $promise?: Promise<any>;
  $resolved?: boolean;
  [key: string]: any;
}

const defaultOptions: ResourceOptions = {
  stripTrailingSlashes: true,
  actions: {
    get: { method: 'GET' },
    save: { method: 'POST' },
    query: { method: 'GET', isArray: true },
    remove: { method: 'DELETE' },
    delete: { method: 'DELETE' },
  },
};

const useResource = (url: string, options: ResourceOptions = {}) => {
  const [resource, setResource] = useState<ResourceInstance | null>(null);

  const mergedOptions = { ...defaultOptions, ...options };

  const setUrlParams = (config: AxiosRequestConfig, params: Record<string, any>, template: string) => {
    let url = template;
    Object.keys(params).forEach((key) => {
      const value = encodeURIComponent(params[key]);
      url = url.replace(new RegExp(`:${key}(\\W|$)`, 'g'), `${value}$1`);
    });
    if (mergedOptions.stripTrailingSlashes) {
      url = url.replace(/\/+$/, '') || '/';
    }
    config.url = url;
  };

  const createResourceInstance = (data: any): ResourceInstance => {
    const instance: ResourceInstance = { ...data };
    instance.$promise = Promise.resolve(instance);
    instance.$resolved = true;
    return instance;
  };

  const executeAction = async (action: ActionOptions, params: any = {}, data: any = null) => {
    const config: AxiosRequestConfig = {
      method: action.method,
      url: action.url || url,
      params: {},
      data: null,
    };

    setUrlParams(config, params, url);

    if (data) {
      config.data = data;
    }

    try {
      const response = await axios(config);
      const responseData = response.data;
      if (action.isArray) {
        return responseData.map((item: any) => createResourceInstance(item));
      } else {
        return createResourceInstance(responseData);
      }
    } catch (error) {
      if (action.interceptor?.responseError) {
        return action.interceptor.responseError(error);
      }
      throw error;
    }
  };

  const resourceActions: Record<string, any> = {};
  Object.keys(mergedOptions.actions || {}).forEach((actionName) => {
    const action = mergedOptions.actions![actionName];
    resourceActions[actionName] = (params: any, data: any) => executeAction(action, params, data);
  });

  return {
    resource,
    setResource,
    ...resourceActions,
  };
};

export default useResource;