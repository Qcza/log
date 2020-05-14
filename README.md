# qlogger

Simple logger with custom transports.

### config
```typescript
import { Logger, Levels } from 'qcza-qlogger';

const config = {
    level: process.env.NODE_ENV !== 'production' ? Levels.ERROR : Levels.DEBUG,
    settings: {
        showDateTime: true,
    }
}

export const qlog = new Logger(config);
```
