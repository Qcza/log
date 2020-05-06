import type {
  Input,
  LogFunction,
  LoggerConfig,
  Transport,
} from '../common/types';
import { LEVELS, Levels } from '../common/consts';

export class Logger {
  public constructor(config: LoggerConfig) {
    this.levelLimit = config.level;
    this.transport = config.transport;
    this.showDateTime = config.showDateTime || true;
  }

  private levelLimit: Levels;

  private readonly transport?: Transport | Transport[];

  private readonly showDateTime: boolean;

  get level(): Levels {
    return this.levelLimit;
  }

  set level(level: Levels) {
    this.levelLimit = level;
  }

  private getDateString = (): string => {
    const date = new Date();
    return `${date.toDateString()} ${date.toLocaleTimeString()} | `;
  };

  private log = (level: Levels): LogFunction => (
    input: Input,
    title?: string
  ) => {
    const dateTime = this.showDateTime ? this.getDateString() : '';
    const message = this.stringify(input);

    if (LEVELS[level] <= LEVELS[this.levelLimit]) {
      if (this.transport) {
        if (Array.isArray(this.transport)) {
          this.transport.forEach((transFn) =>
            transFn(message, level, input, title)
          );
        } else {
          this.transport(message, level, input, title);
        }
      } else {
        console.log(
          `${dateTime}[${level.toUpperCase()}] | ${
            title ? `[${title.toUpperCase()}] | ` : ''
          } ${message}`
        );
      }
    }
  };

  private stringify = (msg: Input): string => {
    switch (typeof msg) {
      case 'function': {
        return '[Function]';
      }
      case 'object': {
        return JSON.stringify(msg);
      }
      default: {
        return msg;
      }
    }
  };

  public debug = this.log(Levels.DEBUG);

  public info = this.log(Levels.INFO);

  public http = this.log(Levels.HTTP);

  public warn = this.log(Levels.WARN);

  public error = this.log(Levels.ERROR);

  public panic = this.log(Levels.PANIC);
}
