export enum Levels {
  DEBUG = 'debug',
  INFO = 'info',
  HTTP = 'http',
  WARN = 'warn',
  ERROR = 'error',
  PANIC = 'panic',
}

export const LEVELS = {
  [Levels.DEBUG]: 0,
  [Levels.INFO]: 1,
  [Levels.HTTP]: 2,
  [Levels.WARN]: 3,
  [Levels.ERROR]: 4,
  [Levels.PANIC]: 5,
};
