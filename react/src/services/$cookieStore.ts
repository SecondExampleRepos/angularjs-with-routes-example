// react/src/services/$cookieStore.ts

type CookieStore = {
  get: (key: string) => any;
  put: (key: string, value: any) => void;
  remove: (key: string) => void;
};

const $cookieStore: CookieStore = {
  get: (key: string) => {
    const value = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${key}=`))
      ?.split('=')[1];
    return value ? JSON.parse(decodeURIComponent(value)) : null;
  },
  put: (key: string, value: any) => {
    document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}; path=/`;
  },
  remove: (key: string) => {
    document.cookie = `${key}=; Max-Age=0; path=/`;
  }
};

export default $cookieStore;