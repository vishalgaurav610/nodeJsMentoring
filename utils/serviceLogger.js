import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, colorize } = format;

const logger = createLogger({
  transports: [new transports.Console()],
  handleExceptions: true,
  format: combine(
    colorize({ all: true }),
    label({ label: "API Request: " }),
    timestamp(),
    printf((info) => `${[info.timestamp]}: ${info.label} ${info.message}`)
  ),
  exitOnError: false,
});

const httpLogger = function (req, res, next) {
  logger.info(
    req.method +
      "\npath: " +
      req.originalUrl +
      "\nbody: " +
      JSON.stringify(req.body) +
      "\nparams: " +
      JSON.stringify(req.params) +
      "\nqueryParms: " +
      JSON.stringify(req.query) +
      "\n"
  );
  next();
};

export default httpLogger;