// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

const useCookies = () => {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});
  const [prevCookies, setPrevCookies] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCookies = () => {
      const cookieString = document.cookie;
      const cookieArray = cookieString.split('; ');
      const cookieObj: { [key: string]: string } = {};
      cookieArray.forEach(cookie => {
        const [key, value] = cookie.split('=');
        cookieObj[key] = value;
      });
      setPrevCookies(cookies);
      setCookies(cookieObj);
    };

    fetchCookies();
    const interval = setInterval(fetchCookies, 1000);

    return () => clearInterval(interval);
  }, [cookies]);

  useEffect(() => {
    const updateCookies = () => {
      for (const key in prevCookies) {
        if (!(key in cookies)) {
          document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
      }
      for (const key in cookies) {
        if (cookies[key] !== prevCookies[key]) {
          document.cookie = `${key}=${cookies[key]}`;
        }
      }
    };

    updateCookies();
  }, [cookies, prevCookies]);

  const getCookie = (name: string): string | null => {
    return cookies[name] || null;
  };

  const setCookie = (name: string, value: string): void => {
    setCookies(prev => ({ ...prev, [name]: value }));
  };

  const removeCookie = (name: string): void => {
    setCookies(prev => {
      const newCookies = { ...prev };
      delete newCookies[name];
      return newCookies;
    });
  };

  return {
    getCookie,
    setCookie,
    removeCookie,
  };
};

export default useCookies;