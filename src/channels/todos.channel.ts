import '@feathersjs/authentication'
import { Application } from '@feathersjs/express'
import { RealTimeConnection } from '@feathersjs/transport-commons/lib/channels/channel/base'

import { Handler, Injectable } from '~/helpers/di.helper'

@Injectable()
export class TodosChannel {
  inject(): Handler {
    return (app: Application): void => {
      app.on('connection', (connection: RealTimeConnection) => {
        app.channel('anonymous').leave(connection)
        app.channel('todosChannel').join(connection)
      })

      app.service('todos').publish(() => app.channel('todosChannel'))
    }
  }
}
