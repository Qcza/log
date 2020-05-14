# qlog

Simple logger with custom transports.

### use
```typescript
import { Logger, Levels } from 'qcza-qlog';

const qlog = new Logger();

if (process.env.NODE_ENV !== 'production') {
  qlog.level = Levels.ERROR;
} else {
  qlog.level = Levels.DEBUG;
}

export {qlog};
```
```typescript
import {qlog} from './config';

qlog.debug('message');
```

### levels
```typescript
export enum Levels {
  DEBUG = 'debug',
  INFO = 'info',
  HTTP = 'http',
  WARN = 'warn',
  ERROR = 'error',
  PANIC = 'panic',
}

qlog.debug('message');
qlog.info('message');
qlog.http('message');
qlog.warn('message');
qlog.error('message');
qlog.panic('message');
```

### config
You may pass config to the constructor, or set log level with setter.

```typescript
const config: LoggerConfig = {
  level: Levels.DEBUG, // minimum shown log level 
  transport: ({message}: TransportData) => console.log(message), // transport function or array of functions
  ignore: [Levels.HTTP], // ignored log levels array
  settings: {
    showDateTime: false // show dateTime string
  }
}
```

You may also set the minimum log level and ignored log levels with setters

```typescript
qlog.level = Levels.DEBUG;

qlog.ignore = [Levels.HTTP];
```
