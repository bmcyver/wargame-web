import got, { type ExtendOptions, type Got } from 'got';
import { parse, serialize } from 'cookie';
import { Logger } from '@utils';
import chalk from 'chalk';

interface ExtendedGot {
  getCookie(key: string): string | undefined;
  deleteCookie(key: string): boolean;
  setCookie(key: string, value: string): void;
  getAllCookies(): { [key: string]: string };
  deleteAllCookies(): void;
  getHeader(name: string): string | undefined;
  setHeader(name: string, value: string): void;
  deleteHeader(name: string): void;
}

export function request(opts: ExtendOptions) {
  const cookieStorage = new Map<string, string>();
  const headerStorage = new Map<string, string>();

  const handleCookies = (setCookieHeader: string | string[] | undefined) => {
    if (setCookieHeader) {
      const cookies = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];
      cookies.forEach((cookieString) => {
        const parsedCookies = parse(cookieString);
        Object.entries(parsedCookies).forEach(([key, value]) => {
          if (value) {
            cookieStorage.set(key, value);
          }
        });
      });
    }
  };

  const debug = (...args: any) => {
    Logger.debug(chalk.gray('[request]'), ...args);
  };

  const instance = got.extend({
    allowGetBody: true,
    throwHttpErrors: false,
    retry: {
      limit: 0,
    },
    ...opts,
    hooks: {
      beforeRequest: [
        (options) => {
          headerStorage.forEach((value, key) => {
            options.headers[key] = value;
          });
          if (cookieStorage.size > 0) {
            options.headers['cookie'] = Array.from(cookieStorage.entries())
              .map(([key, value]) => serialize(key, value))
              .join('; ');
          }
        },
      ],
      beforeRedirect: [
        (options, response) => {
          handleCookies(response.headers['set-cookie']);
          debug(
            `${chalk.yellow(`${response.request.options.method}`)} ${chalk.cyan(response.statusCode)} ${response.requestUrl.pathname} ${chalk.gray('->')} ${
              response.headers.location || ''
            } ${chalk.magenta(`${(response.timings.response || 0) - response.timings.start}ms`)}`,
          );
        },
      ],
      afterResponse: [
        (response) => {
          handleCookies(response.headers['set-cookie']);
          debug(
            `${chalk.yellow(`${response.request.options.method}`)} ${chalk.cyan(response.statusCode)} ${response.requestUrl.pathname} ${chalk.magenta(`${(response.timings.response || 0) - response.timings.start}ms`)}`,
          );
          return response;
        },
      ],
    },
  }) as ExtendedGot & Got;

  instance.getCookie = (key: string) => {
    return cookieStorage.get(key);
  };

  instance.deleteCookie = (key: string) => {
    return cookieStorage.delete(key);
  };

  instance.setCookie = (key: string, value: string) => {
    cookieStorage.set(key, value);
  };

  instance.getAllCookies = () => {
    return Object.fromEntries(cookieStorage.entries());
  };

  instance.deleteAllCookies = () => {
    return cookieStorage.clear();
  };

  instance.getHeader = (name: string) => {
    return headerStorage.get(name);
  };

  instance.setHeader = (name: string, value: string) => {
    return headerStorage.set(name, value);
  };

  instance.deleteHeader = (name: string) => {
    return headerStorage.delete(name);
  };

  return instance;
}
