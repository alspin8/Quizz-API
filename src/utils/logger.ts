import winston, { createLogger, Logger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

const myFormat = format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    format.align(),
    format.printf((info) => `[${info.timestamp}] - [${info.level.toUpperCase()}]  ${info.message}`),
    format.colorize({ all: true }),
)

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}
  
const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
} 

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)

const option = {
    console: {
        format: myFormat,
        level: level()
    },
    file: {
        format: format.combine(myFormat, format.uncolorize()),
        level: level()
    }
}

const logger : Logger = createLogger({
    levels: levels,
    transports: [
        new transports.Console(option.console),
        // new transports.File({ ...option.file, filename: 'log/combined.log' }),
        new transports.DailyRotateFile({...option.file, filename: 'log/combined/%DATE%.log', zippedArchive: true, maxFiles: '14d', maxSize: '20m'}),
        // new transports.File({ ...option.file, filename: 'log/warn.log', level: 'warn' }),
        new transports.DailyRotateFile({...option.file, filename: 'log/warn/%DATE%.log', level: 'warn', zippedArchive: true, maxFiles: '14d', maxSize: '20m'}),
        // new transports.File({ ...option.file, filename: 'log/error.log', level: 'error' }),
        new transports.DailyRotateFile({...option.file, filename: 'log/error/%DATE%.log', level: 'error', zippedArchive: true, maxFiles: '14d', maxSize: '20m'}),
    ]
})

const sqlLogger : Logger = createLogger({
    levels: levels,
    transports: [
        // new transports.File({ ...option.file, filename: 'log/sql.log', level: 'info' }),
        new transports.DailyRotateFile({...option.file, filename: 'log/sql/%DATE%.log', level: 'info', zippedArchive: true, maxFiles: '14d', maxSize: '20m'})
    ]
})

export { logger, sqlLogger }