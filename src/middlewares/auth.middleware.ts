import { HookContext } from '@feathersjs/feathers'
import { StatusCodes as status } from 'http-status-codes'

import { apiResponse } from '~/helpers/api.helper'
import { Handler, HandlerContext, Injectable } from '~/helpers/di.helper'

@Injectable()
export class AuthMiddleware {
  context(service: string): HandlerContext {
    return (ctx: HookContext): HookContext => {
      if (ctx.params.headers.authorization.split('Bearer ')[1] !== 'abc123') {
        throw apiResponse(service, { stat_code: status.UNAUTHORIZED, err_message: 'Invalid token' })
      }

      return ctx
    }
  }
}
