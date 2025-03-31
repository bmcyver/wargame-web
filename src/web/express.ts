import express from 'express';
import chalk from 'chalk';
import { Logger } from '@utils';
import cookieParser from 'cookie-parser';

/**
 * Create a new express server
 * @param config
 * @returns Server
 *
 * @example
 * ```ts
 * const app = server({ DEBUG: true }).listen(3000);
 * app.get('/', (req, res) => res.send('Hello Get!'));
 * app.post('/', (req, res) => res.send('Hello Post!'));
 * app.use('/', (req, res) => res.send('Hello Use!'));
 * ```
 */
export function server() {
  return new Server();
}

class Server {
  public readonly app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        this.debug(chalk.yellow(`${req.method.toUpperCase()}`), req.path);
        return next();
      },
    );

    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        Logger.error(err);
        return res.status(500).send('Internal Server Error');
      },
    );
  }

  public listen(port: number) {
    this.app.listen(port, '0.0.0.0', () => {
      this.debug(`Listening on port ${port}`);
    });
    return this.app;
  }

  private debug(...args: any) {
    Logger.debug(chalk.gray('[server]'), ...args);
  }
}
