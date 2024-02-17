import { StatusCodes as status } from 'http-status-codes'
import { STATUS_CODES } from 'http'
import consola from 'consola'

export interface ApiResponse {
  stat_code?: number
  stat_message?: string
  err_message?: any
  data?: any
  pagination?: Record<string, any>
}

export const apiResponse = (configs: ApiResponse): ApiResponse => {
  for (let i of Object.keys(configs)) {
    if (configs[i] == undefined) {
      delete configs[i]
    }
  }

  if (Object.prototype.isPrototypeOf(configs.err_message) && !configs.err_message.hasOwnProperty('err_message')) {
    const exception: Error = new Error(configs.err_message)
    consola.error(`
==================================
======== Error Exception 1 =========
==================================

  name: ${exception.name}
  message: ${exception.message}
  stack: ${exception.stack}

==================================
==================================
==================================
  `)
    configs.err_message = STATUS_CODES[status.INTERNAL_SERVER_ERROR]
  } else if (Object.prototype.isPrototypeOf(configs.err_message) && configs.err_message.hasOwnProperty('err_message')) {
    const exception: Error = new Error(configs.err_message['err_message'])
    consola.error(`
==================================
======== Error Exception 2 =========
==================================

  name: ${exception.name}
  message: ${exception.message}
  stack: ${exception.stack}

==================================
==================================
==================================
  `)
    return configs.err_message
  } else if (!configs.stat_code && !configs.stat_message && !configs.err_message) {
    configs.err_message = STATUS_CODES[status.INTERNAL_SERVER_ERROR]
  }

  return { stat_code: configs.stat_code ?? status.INTERNAL_SERVER_ERROR, ...configs }
}
