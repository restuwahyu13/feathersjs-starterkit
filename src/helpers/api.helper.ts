import { StatusCodes as status } from 'http-status-codes'
import consola from 'consola'
import { FeathersError } from '@feathersjs/errors'
import { Application } from '@feathersjs/express'
import { HookContext } from '@feathersjs/feathers'

import { Container } from '~/helpers/di.helper'

export interface ApiResponse {
  stat_code?: number
  stat_message?: string
  err_message?: any
  data?: any
  pagination?: Record<string, any>
}

class FeathersJSError extends FeathersError {
  constructor(msg: string | Error, code: number, data?: any) {
    super(msg, undefined, code, undefined, data)
  }
}

export const apiResponse = (service: string, configs: ApiResponse): Partial<ApiResponse | FeathersJSError> => {
  for (let i of Object.keys(configs)) {
    if (configs[i] == undefined) {
      delete configs[i]
    }
  }

  if (!configs.err_message) {
    Container.resolve<Application>('FeathersMetadata')
      .service(service)
      .hooks({
        before: {
          create: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ],
          find: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ],
          get: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ],
          patch: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ],
          update: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ],
          remove: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ]
        },
        after: {
          create: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ],
          find: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ],
          get: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ],
          patch: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ],
          update: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ],
          remove: [
            (ctx: HookContext): HookContext => {
              ctx.statusCode = configs.stat_code
              return ctx
            }
          ]
        }
      })

    return { stat_code: configs.stat_code ?? status.INTERNAL_SERVER_ERROR, ...configs }
  }

  const exception: FeathersJSError = new FeathersJSError(configs.err_message, configs.stat_code, configs.data)
  consola.error(`
==================================
======== Error Exception =========
==================================

    name: ${exception.name}
    message: ${exception.message}
    stack: ${exception.stack}

==================================
==================================
==================================
  `)

  Container.resolve<Application>('FeathersMetadata')
    .service(service)
    .hooks({
      error: {
        create: [
          (ctx: HookContext): HookContext => {
            ctx.statusCode = exception.code
            return ctx
          }
        ],
        find: [
          (ctx: HookContext): HookContext => {
            ctx.statusCode = exception.code
            return ctx
          }
        ],
        get: [
          (ctx: HookContext): HookContext => {
            ctx.statusCode = exception.code
            return ctx
          }
        ],
        patch: [
          (ctx: HookContext): HookContext => {
            ctx.statusCode = exception.code
            return ctx
          }
        ],
        update: [
          (ctx: HookContext): HookContext => {
            ctx.statusCode = exception.code
            return ctx
          }
        ],
        remove: [
          (ctx: HookContext): HookContext => {
            ctx.statusCode = exception.code
            return ctx
          }
        ]
      }
    })

  return exception
}
