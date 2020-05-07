export enum Levels {
  DEBUG = 'debug',
  INFO = 'info',
  HTTP = 'http',
  WARN = 'warn',
  ERROR = 'error',
  PANIC = 'panic',
}

export enum NodeColorUtils {
  RESET = '\x1b[0m',
  BRIGHT = '\x1b[1m',
  DIM = '\x1b[2m',
  UNDERSCORE = '\x1b[4m',
  BLINK = '\x1b[5m',
  REVERSE = '\x1b[7m',
  HIDDEN = '\x1b[8m',
}

export enum NodeFgColor {
  BLACK = '\x1b[30m',
  RED = '\x1b[31m',
  GREEN = '\x1b[32m',
  YELLOW = '\x1b[33m',
  BLUE = '\x1b[34m',
  MAGENTA = '\x1b[35m',
  CYAN = '\x1b[36m',
  WHITE = '\x1b[37m',
}

export enum NodeBgColor {
  BLACK = '\x1b[40m',
  RED = '\x1b[41m',
  GREEN = '\x1b[42m',
  YELLOW = '\x1b[43m',
  BLUE = '\x1b[44m',
  MAGENTA = '\x1b[45m',
  CYAN = '\x1b[46m',
  WHITE = '\x1b[47m',
}

export const NODE_COLORS = {
  [Levels.DEBUG]: NodeFgColor.MAGENTA,
  [Levels.INFO]: NodeFgColor.WHITE,
  [Levels.HTTP]: NodeFgColor.BLUE,
  [Levels.WARN]: NodeFgColor.YELLOW,
  [Levels.ERROR]: NodeFgColor.RED,
  [Levels.PANIC]: NodeBgColor.RED + NodeFgColor.WHITE,
};

export const LEVELS = {
  [Levels.DEBUG]: 0,
  [Levels.INFO]: 1,
  [Levels.HTTP]: 2,
  [Levels.WARN]: 3,
  [Levels.ERROR]: 4,
  [Levels.PANIC]: 5,
};
