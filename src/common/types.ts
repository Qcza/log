import { Levels } from './consts';

export type LogFunction = (input: Input, title?: string) => void;

export type Transport = (
  message: string,
  level: Levels,
  originalInput: Input,
  title?: string
) => void | Promise<void>;

export type Input = string | Function | Record<string, any>;

export interface LoggerConfig {
  level: Levels;
  transport?: Transport | Transport[];
  showDateTime?: boolean;
}
