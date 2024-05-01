import winston, {addColors, transports} from "winston";

addColors({
  info: "bold blue", // fontStyle color
  warn: "italic yellow",
  error: "bold red",
  debug: "green",
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
        format: "DD-MM-YYYY HH:mm:ss",
      }),
      winston.format.printf(
        (info) =>
          ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
      )
    );
  }

  static getLogger(loggerLabel: string) {
    const logger = winston.createLogger({
      level: "info",
      transports: [
        new transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            this.getLoggerFormat(loggerLabel)
          ),
        }),
      ],
    });
    if (process.env.NODE_ENV !== "production") {
      logger.level = "debug";
    }
    return logger;
  }

  static getHandlerLogger(handlerName: string, gameId: string) {
    let loggerCount = LoggerFactory.loggerCountMap.get(handlerName);
    if (!loggerCount) {
      LoggerFactory.loggerCountMap.set(handlerName, 1);
    } else {
      LoggerFactory.loggerCountMap.set(handlerName, ++loggerCount);
    }

    return LoggerFactory.getLogger(`${handlerName.charAt(0).toUpperCase() + handlerName.slice(1)}Handler (${gameId})`);
  }


  static printLogo() {
    console.log(
      '\n\n' +
      '\t██████╗ ██╗ ██████╗ ██╗  ██╗██╗ ██████╗██╗  ██╗\n' +
      '\t██╔══██╗██║██╔════╝ ██║ ██╔╝██║██╔════╝██║ ██╔╝\n' +
      '\t██║  ██║██║██║  ███╗█████╔╝ ██║██║     █████╔╝ \n' +
      '\t██║  ██║██║██║   ██║██╔═██╗ ██║██║     ██╔═██╗ \n' +
      '\t██████╔╝██║╚██████╔╝██║  ██╗██║╚██████╗██║  ██╗\n' +
      '\t╚═════╝ ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝\n\n'
    )
  }
}
