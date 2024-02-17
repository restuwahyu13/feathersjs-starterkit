// For more information about this file see https://dove.feathersjs.com/guides/cli/channels.html
import { AuthenticationResult } from '@feathersjs/authentication'
import { Application } from '@feathersjs/express'
import { RealTimeConnection } from '@feathersjs/transport-commons/lib/channels/channel/base'
import { HookContext } from '~/app.declarations'

export class Channels {
  inject(app: Application): void {
    app.on('connection', (connection: RealTimeConnection) => {
      console.info('Socket Connected:', connection.provider)

      app.channel('anonymous').leave(connection)
      app.channel('todosChannel').join(connection)
    })

    app.on('login', (_auth: AuthenticationResult, params: { connection: RealTimeConnection }) => {
      if (params.connection) {
        app.channel('anonymous').leave(params.connection)
        app.channel('authenticated').join(params.connection)
      }
    })

    app.publish((_data: any, _context: HookContext) => {
      return app.channel('authenticated')
    })
  }
}
