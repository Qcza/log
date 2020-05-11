export const getDateTime = (): string => {
  const date = new Date();
  return `[${date.toDateString()} ${date.toLocaleTimeString()}]`;
};

export const isBrowser = () => typeof window !== 'undefined';
