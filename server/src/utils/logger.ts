import path from 'path';
import Log4js, { getLogger } from 'log4js';
import httpRequestContext from 'http-request-context';

const basePath = path.resolve(__dirname, '../../logs');
const errorPath = '/error/';
const errorFileName = 'error';
const errorLogPath = basePath + errorPath + errorFileName;
const infoPath = '/info/';
const infoFileName = 'info';
const infoLogPath = basePath + infoPath + infoFileName;

const options = {
  appenders: {
    std: { type: 'stdout', level: 'all', layout: { type: 'basic' } },
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{yyyy-MM-dd hh:mm:ss}]%] %m',
      },
    },
    file: {
      type: 'dateFile',
      filename: infoLogPath,
      alwaysIncludePattern: true,
      maxLogSize: 10 * 1024 * 1024,
      daysToKeep: 5,
      pattern: 'yyyy_MM_dd.log',
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss,SSS}] %c - %m',
      },
    },
    error: {
      type: 'dateFile',
      filename: errorLogPath,
      pattern: 'yyyy_MM_dd.log',
      encoding: 'utf-8',
      alwaysIncludePattern: true,
      maxLogSize: 10 * 1024 * 1024,
      daysToKeep: 5,
      compress: true,
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss,SSS}] %c - %m',
      },
    }
  },
  pm2: true,
  categories: {
    default: { appenders: ['std'], level: 'all' },
    blog: { appenders: ['file', 'console'], level: 'all' },
    error: { appenders: ['error'], level: 'all' }
  }
};

Log4js.configure(options);

const koaLogger = getLogger('blog');
const errorLogger = getLogger('error');

const logger = {
  trace: (info: any, ...args: any): void => {
    const requestId = httpRequestContext.get('RequestId') ? '[RequestId:' + httpRequestContext.get('RequestId') + ']' : '';
    koaLogger.trace(requestId, info, ...args);
  },
  debug: (info: any, ...args: any): void => {
    const requestId = httpRequestContext.get('RequestId') ? '[RequestId:' + httpRequestContext.get('RequestId') + ']' : '';
    koaLogger.debug(requestId, info, ...args);
  },
  info: (info: any, ...args: any): void => {
    const requestId = httpRequestContext.get('RequestId') ? '[RequestId:' + httpRequestContext.get('RequestId') + ']' : '';
    koaLogger.info(requestId, info, ...args);
  },
  warn: (info: any, ...args: any): void => {
    const requestId = httpRequestContext.get('RequestId') ? '[RequestId:' + httpRequestContext.get('RequestId') + ']' : '';
    koaLogger.warn(requestId, info, ...args);
  },
  error: (info: any, ...args: any): void => {
    const requestId = httpRequestContext.get('RequestId') ? '[RequestId:' + httpRequestContext.get('RequestId') + ']' : '';
    errorLogger.error(requestId, info, ...args);
  },
  fatal: (info: any, ...args: any): void => {
    const requestId = httpRequestContext.get('RequestId') ? '[RequestId:' + httpRequestContext.get('RequestId') + ']' : '';
    errorLogger.fatal(requestId, info, ...args);
  },
};

console.log = (msg: any, ...args: any): void => {
  logger.info(msg, ...args);
};

export default logger;