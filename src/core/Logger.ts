import type {
  Input,
  LogFunction,
  LoggerConfig,
  Settings,
  Transport,
} from '../common/types';
import { LEVELS, Levels } from '../common/consts';
import nodeTransport from '../transports/node';

export class Logger {
  public constructor(config: LoggerConfig) {
    this.levelLimit = config.level;
    this.settings = config.settings;
    this.transport = config.transport || nodeTransport;

    this.debug = this.constructLog(Levels.DEBUG);
    this.info = this.constructLog(Levels.INFO);
    this.http = this.constructLog(Levels.HTTP);
    this.warn = this.constructLog(Levels.WARN);
    this.error = this.constructLog(Levels.ERROR);
    this.panic = this.constructLog(Levels.PANIC);
  }

  private levelLimit: Levels;

  private readonly transport: Transport | Transport[];

  private readonly settings?: Settings;

  public debug: LogFunction;

  public info: LogFunction;

  public http: LogFunction;

  public warn: LogFunction;

  public error: LogFunction;

  public panic: LogFunction;

  get level(): Levels {
    return this.levelLimit;
  }

  set level(level: Levels) {
    this.levelLimit = level;
  }

  private getDateString = (): string => {
    const date = new Date();
    return `[${date.toDateString()} ${date.toLocaleTimeString()}] | `;
  };

  private constructLog = (level: Levels): LogFunction => (
    input: Input,
    title?: string
  ) => {
    const message = this.stringify(input);

    if (LEVELS[level] <= LEVELS[this.levelLimit]) {
      if (Array.isArray(this.transport)) {
        this.transport.forEach((transFn) =>
          transFn({
            message,
            level,
            title,
            originalInput: input,
            settings: this.settings,
          })
        );
      } else {
        this.transport({
          message,
          level,
          title,
          originalInput: input,
          settings: this.settings,
        });
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
}
