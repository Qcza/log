import type {
  Input,
  LogFunction,
  LoggerConfig,
  Settings,
  Transport,
} from '../common/types';
import { LEVELS, Levels } from '../common/consts';
import nodeTransport from '../transports/node';
import browserTransport from '../transports/browser';
import { isBrowser } from '../common/utils';

const DEFAULT_TRANSPORT = isBrowser() ? browserTransport : nodeTransport;

export class Logger {
  public constructor(config?: LoggerConfig) {
    this.levelLimit = config?.level || Levels.DEBUG;
    this.settings = config?.settings;
    this.transport = config?.transport || DEFAULT_TRANSPORT;
    this.ignoredLevels = config?.ignore || [];

    this.debug = this.constructLog(Levels.DEBUG);
    this.info = this.constructLog(Levels.INFO);
    this.http = this.constructLog(Levels.HTTP);
    this.warn = this.constructLog(Levels.WARN);
    this.error = this.constructLog(Levels.ERROR);
    this.panic = this.constructLog(Levels.PANIC);
  }

  private levelLimit: Levels;

  private ignoredLevels: Levels[];

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

  get ignore(): Levels[] {
    return this.ignoredLevels;
  }

  set ignore(levels: Levels[]) {
    this.ignoredLevels = levels;
  }

  private constructLog = (level: Levels): LogFunction => (
    input: Input,
    title?: string
  ) => {
    const message = this.stringify(input);

    if (this.checkLevel(level)) {
      return;
    }
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
  };

  private checkLevel = (level: Levels): boolean =>
    LEVELS[level] < LEVELS[this.levelLimit] ||
    this.ignoredLevels.includes(level);

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
