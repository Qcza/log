import { Logger } from '../Logger';
import { Settings, Transport, TransportData } from '../../common/types';
import { Levels } from '../..';

describe('Logger', () => {
  let logger: Logger;
  const transport: Transport = jest.fn();
  const transportSec: Transport = jest.fn();
  const stringInput = 'mock';
  const objectInput = { first: 'mock', sec: { test: 'mock' } };
  const functionInput = () => null;

  beforeEach(() => {
    logger = new Logger({ transport });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call transport function', () => {
    const expected: TransportData = {
      message: stringInput,
      level: Levels.DEBUG,
      originalInput: stringInput,
    };
    logger.debug(stringInput);
    expect(transport).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenCalledWith(expected);
  });

  it('should call all transport functions passed in array', () => {
    logger = new Logger({ transport: [transport, transportSec] });
    const expected: TransportData = {
      message: stringInput,
      level: Levels.DEBUG,
      originalInput: stringInput,
    };
    logger.debug(stringInput);
    expect(transport).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenCalledWith(expected);
    expect(transportSec).toHaveBeenCalledTimes(1);
    expect(transportSec).toHaveBeenCalledWith(expected);
  });

  it('should stringify object input', () => {
    const expected: TransportData = {
      message: JSON.stringify(objectInput),
      level: Levels.DEBUG,
      originalInput: objectInput,
    };
    logger.debug(objectInput);
    expect(transport).toHaveBeenCalledWith(expected);
  });

  it('should stringify function input', () => {
    const expected: TransportData = {
      message: `[Function]`,
      level: Levels.DEBUG,
      originalInput: functionInput,
    };
    logger.debug(functionInput);
    expect(transport).toHaveBeenCalledWith(expected);
  });

  it('should not call transport below limit level', () => {
    logger.info(stringInput);
    expect(transport).toHaveBeenCalledTimes(1);
    logger.level = Levels.ERROR;
    logger.info(stringInput);
    expect(transport).toHaveBeenCalledTimes(1);
  });

  it('should pass setting to the transport', () => {
    const settings: Settings = {
      showDateTime: true,
    };
    const expected: TransportData = {
      message: stringInput,
      level: Levels.DEBUG,
      originalInput: stringInput,
      settings,
    };
    logger = new Logger({ settings, transport });
    logger.debug(stringInput);
    expect(transport).toHaveBeenCalledWith(expected);
  });

  it('should pass title to the transport', () => {
    const title = 'mock';
    const expected: TransportData = {
      message: stringInput,
      level: Levels.DEBUG,
      originalInput: stringInput,
      title,
    };
    logger = new Logger({ transport });
    logger.debug(stringInput, title);
    expect(transport).toHaveBeenCalledWith(expected);
  });

  it('should ignore passed level', () => {
    const expected: TransportData = {
      message: stringInput,
      level: Levels.DEBUG,
      originalInput: stringInput,
    };
    logger = new Logger({ transport });
    logger.ignore = [Levels.HTTP];
    logger.debug(stringInput);
    expect(transport).toHaveBeenCalledWith(expected);
    expect(transport).toHaveBeenCalledTimes(1);
    logger.http(stringInput);
    expect(transport).toHaveBeenCalledTimes(1);
  });
});
