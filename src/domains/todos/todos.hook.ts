import '@feathersjs/authentication'
import { Application } from '@feathersjs/express'
import _ from 'lodash'

import { Handler, Inject, Injectable } from '~/helpers/di.helper'
import { AuthMiddleware } from '~/middlewares/auth.middleware'
import { TodosValidator } from '~/domains/todos/todos.validator'

@Injectable()
export class TodosHook {
  constructor(
    @Inject('TodosValidator')
    private readonly todosValidator: TodosValidator,
    @Inject('AuthMiddleware')
    private readonly authMiddleware: AuthMiddleware
  ) {}

  inject(): Handler {
    return (app: Application): void => {
      app.service('todos').hooks({
        before: {
          create: [this.todosValidator.todosCreateValidator()],
          find: [this.authMiddleware.context('todos')]
        }
      })
    }
  }
}
