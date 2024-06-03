import { useState, useEffect } from 'react';

interface Cookies {
  [key: string]: string;
}

const useCookies = () => {
  const [cookies, setCookies] = useState<Cookies>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const getCookies = (): Cookies => {
      const cookies: Cookies = {};
      document.cookie.split(';').forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookies[name.trim()] = value;
      });
      return cookies;
    };

    const updateCookies = () => {
      const newCookies = getCookies();
      setCookies(newCookies);
    };

    if (!initialized) {
      updateCookies();
      setInitialized(true);
    }

    const interval = setInterval(updateCookies, 1000);

    return () => clearInterval(interval);
  }, [initialized]);

  const get = (name: string): string | undefined => {
    return cookies[name];
  };

  const put = (name: string, value: string): void => {
    document.cookie = `${name}=${value}`;
    setCookies(prevCookies => ({ ...prevCookies, [name]: value }));
  };

  const remove = (name: string): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    const { [name]: _, ...rest } = cookies;
    setCookies(rest);
  };

  return {
    get,
    put,
    remove,
  };
};

export default useCookies;