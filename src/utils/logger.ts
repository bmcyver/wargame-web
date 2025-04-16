import chalk, { type ChalkInstance } from 'chalk';

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  SUCCESS: 2,
  ERROR: 3,
  FATAL: 4,
} as const;

type LogLevel = keyof typeof LOG_LEVELS;

export class Logger {
  private static logLevel: number = LOG_LEVELS.INFO; // Default log level

  public static setLevel(level: LogLevel): void {
    if (LOG_LEVELS[level] !== undefined) {
      Logger.logLevel = LOG_LEVELS[level];
    } else {
      console.error(`[${chalk.red('-')}] Invalid log level: ${level}`);
    }
  }

  private static shouldLog(level: number): boolean {
    return level >= Logger.logLevel;
  }

  private static log(
    prefix: string,
    color: ChalkInstance,
    level: number,
    ...message: any[]
  ): void {
    if (Logger.shouldLog(level)) {
      console.log(`[${color(prefix)}]`, ...message);
    }
  }

  public static debug(...message: any[]): void {
    Logger.log('*', chalk.yellowBright, LOG_LEVELS.DEBUG, ...message);
  }

  public static info(...message: any[]): void {
    Logger.log('*', chalk.blueBright, LOG_LEVELS.INFO, ...message);
  }

  public static success(...message: any[]): void {
    Logger.log('+', chalk.greenBright, LOG_LEVELS.SUCCESS, ...message);
  }

  public static error(...message: any[]): void {
    Logger.log('-', chalk.redBright, LOG_LEVELS.ERROR, ...message);
  }
}
