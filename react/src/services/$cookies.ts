import { useState, useEffect } from 'react';

// Define the type for the cookies state
interface CookiesState {
  [key: string]: string;
}

const useCookies = () => {
  const [cookies, setCookies] = useState<CookiesState>({});

  useEffect(() => {
    const pollCookies = () => {
      const newCookies = getCookies();
      setCookies(newCookies);
    };

    // Poll cookies initially
    pollCookies();

    // Set up an interval to poll cookies periodically
    const intervalId = setInterval(pollCookies, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getCookies = (): CookiesState => {
    const cookies: CookiesState = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookies[name.trim()] = value;
    });
    return cookies;
  };

  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}`;
    setCookies(prevCookies => ({ ...prevCookies, [name]: value }));
  };

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setCookies(prevCookies => {
      const newCookies = { ...prevCookies };
      delete newCookies[name];
      return newCookies;
    });
  };

  return {
    cookies,
    getCookie: (name: string) => cookies[name],
    setCookie,
    removeCookie,
  };
};

export default useCookies;