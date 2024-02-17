// For more information about this file see https://dove.feathersjs.com/guides/cli/logging.html
import { Logger, createLogger, format, transports } from 'winston'

export const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()]
})
