import winston from "winston"

/**
 * Application-wide logger used for structured runtime logs.
 *
 * It emits JSON-formatted log entries at the debug level and writes
 * them to the console so server events, errors, and debugging output
 * can be tracked consistently throughout the app.
 */
export const logger = winston.createLogger({
    level: "debug",
    format: winston.format.json(),
    transports: [new winston.transports.Console({})],
})
