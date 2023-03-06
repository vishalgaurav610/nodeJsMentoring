import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

const appLogger = createLogger({
  transports: [new transports.Console()],
  handleExceptions: true,
  format: combine(
    label({ label: "winston log..." }),
    timestamp(),
    printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
  ),
  exitOnError: false,
});

export default appLogger;
