export const getDateTime = (): string => {
  const date = new Date();
  return `[${date.toDateString()} ${date.toLocaleTimeString()}]`;
};
