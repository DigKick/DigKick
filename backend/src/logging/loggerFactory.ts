import winston, { addColors, transports } from 'winston';
import { HandlerType } from '../mqtt/global/dkModelHandler.ts';

addColors({
  info: 'bold blue', // fontStyle color
  warn: 'italic yellow',
  error: 'bold red',
  debug: 'green',
});

export class LoggerFactory {
  static loggerCountMap = new Map<string, number>();

  static getLoggerFormat(loggerLabel: string) {
    return winston.format.combine(
      winston.format.colorize({
        all: true,
      }),
      winston.format.label({
        label: `[${loggerLabel}]`,
      }),
      winston.format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
      }),
      winston.format.printf(
        (info) =>
          ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`,
      ),
    );
  }

  static getLogger(loggerLabel: string) {
    const logger = winston.createLogger({
      level: 'info',
      transports: [
        new transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            this.getLoggerFormat(loggerLabel),
          ),
        }),
      ],
    });
    if (process.env.NODE_ENV !== 'production') {
      logger.level = 'debug';
    }
    return logger;
  }

  static getHandlerLogger(handlerName: HandlerType, gameId: string) {
    let loggerCount = LoggerFactory.loggerCountMap.get(
      String(handlerName.valueOf()),
    );
    if (!loggerCount) {
      LoggerFactory.loggerCountMap.set(String(handlerName.valueOf()), 1);
    } else {
      LoggerFactory.loggerCountMap.set(
        String(handlerName.valueOf()),
        ++loggerCount,
      );
    }

    return LoggerFactory.getLogger(
      `${
        String(handlerName.valueOf()).charAt(0).toUpperCase() +
        String(handlerName.valueOf()).slice(1)
      }Handler (${gameId})`,
    );
  }

  static printLogo() {
    console.log(
      '\n\n' +
        '\t██████╗ ██╗ ██████╗ ██╗  ██╗██╗ ██████╗██╗  ██╗\n' +
        '\t██╔══██╗██║██╔════╝ ██║ ██╔╝██║██╔════╝██║ ██╔╝\n' +
        '\t██║  ██║██║██║  ███╗█████╔╝ ██║██║     █████╔╝ \n' +
        '\t██║  ██║██║██║   ██║██╔═██╗ ██║██║     ██╔═██╗ \n' +
        '\t██████╔╝██║╚██████╔╝██║  ██╗██║╚██████╗██║  ██╗\n' +
        '\t╚═════╝ ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝\n\n',
    );
  }
}
