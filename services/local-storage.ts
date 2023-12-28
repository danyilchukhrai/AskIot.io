export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
  return null;
};
export const getLocalStorageWithoutParsing = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    return value;
  }
  return null;
};

export const destroyLocalStorage = () => {
  localStorage.clear();
};
