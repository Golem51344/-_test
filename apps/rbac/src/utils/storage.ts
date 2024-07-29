import globalSettings from '@/settings';

const storagePrefix = globalSettings.app.storagePrefix;

const storage = {
  local: {
    has: (key: string) => {
      return Object.prototype.hasOwnProperty.call(localStorage, `${storagePrefix}${key}`);
    },
    get: (key: string) => {
      return localStorage.getItem(`${storagePrefix}${key}`);
    },
    set: (key: string, value: string) => {
      localStorage.setItem(`${storagePrefix}${key}`, value);
    },
    remove: (key: string) => {
      localStorage.removeItem(`${storagePrefix}${key}`);
    },
    clear: () => {
      localStorage.clear();
    },
    getItem: (key: string) => {
      return localStorage.getItem(`${storagePrefix}${key}`);
    },
    setItem: (key: string, value: string) => {
      localStorage.setItem(`${storagePrefix}${key}`, value);
    },
  },
  session: {
    has: (key: string) => {
      return Object.prototype.hasOwnProperty.call(sessionStorage, `${storagePrefix}${key}`);
    },
    get: (key: string) => {
      return sessionStorage.getItem(`${storagePrefix}${key}`);
    },
    set: (key: string, value: string) => {
      sessionStorage.setItem(`${storagePrefix}${key}`, value);
    },
    remove: (key: string) => {
      sessionStorage.removeItem(`${storagePrefix}${key}`);
    },
    clear: () => {
      sessionStorage.clear();
    },
    getItem: (key: string) => {
      return sessionStorage.getItem(`${storagePrefix}${key}`);
    },
    setItem: (key: string, value: string) => {
      sessionStorage.setItem(`${storagePrefix}${key}`, value);
    },
  },
};

export default storage;
