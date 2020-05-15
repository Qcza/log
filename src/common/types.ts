import { Levels } from './consts';

export type LogFunction = (input: Input, title?: string) => void;

export interface Settings {
  showDateTime?: boolean;
}

export interface TransportData {
  message: string;
  level: Levels;
  originalInput: Input;
  settings?: Settings;
  title?: string;
}

export type Transport = (data: TransportData) => void | Promise<void>;

export type Input =
  | string
  | number
  | boolean
  | null
  | undefined
  | Function
  | Record<string, any>;

export interface LoggerConfig {
  level?: Levels;
  transport?: Transport | Transport[];
  ignore?: Levels[];
  settings?: Settings;
}
