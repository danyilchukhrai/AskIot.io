export const getValue = (key: string) => localStorage.getItem(key);

export const setValue = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const destroy = (key: string) => {
  localStorage.removeItem(key);
};
