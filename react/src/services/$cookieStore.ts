// react/src/services/$cookieStore.ts

// Utility functions to handle cookies
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const setCookie = (name: string, value: string, days?: number): void => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};

// CookieStore service
const cookieStore = {
  get: (key: string): any => {
    const cookie = getCookie(key);
    return cookie ? JSON.parse(cookie) : null;
  },
  put: (key: string, value: any): void => {
    setCookie(key, JSON.stringify(value));
  },
  remove: (key: string): void => {
    deleteCookie(key);
  }
};

export default cookieStore;