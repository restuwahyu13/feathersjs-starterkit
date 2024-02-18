import '@feathersjs/authentication'
import { Application } from '@feathersjs/express'
import { RealTimeConnection } from '@feathersjs/transport-commons/lib/channels/channel/base'
import _ from 'lodash'

import { Handler, Inject, Injectable } from '~/helpers/di.helper'
import { AuthHook } from '~/hooks/auth.hook'
import { TodosValidator } from '~/validators/todos.validator'

@Injectable()
export class TodosChannel {
  constructor(
    @Inject('TodosValidator')
    private readonly todosValidator: TodosValidator,
    @Inject('AuthHook')
    private readonly authHook: AuthHook
  ) {}

  inject(): Handler {
    return (app: Application): void => {
      app.on('connection', (connection: RealTimeConnection) => {
        app.channel('anonymous').leave(connection)
        app.channel('todosChannel').join(connection)
      })

      app
        .service('todos')
        .hooks({
          before: {
            create: [this.todosValidator.todosCreateValidator()]
            // find: [this.authHook.context('todos')]
          }
        })
        .publish(() => app.channel('todosChannel'))
    }
  }
}
