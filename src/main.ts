import 'express-async-errors'
import 'dotenv/config'
import feathers from '@feathersjs/feathers'
import express, { rest, json, urlencoded, notFound, errorHandler, Application } from '@feathersjs/express'
import socketio from '@feathersjs/socketio'

import { logger } from '~/app.logger'
import { Services } from '~/app.services'
import { Channels } from '~/app.channels'

export class App {
  private readonly app: Application
  private readonly port: number

  constructor() {
    this.app = express(feathers())
    this.port = +process.env.PORT!
  }

  private middleware(): void {
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(errorHandler({ logger }))
  }

  private configure(): void {
    this.app.configure(rest())
    this.app.configure(socketio())
  }

  private event() {
    this.app.on('connection', (con: any) => {
      this.app.channel('todosChannel').join(con)
    })
  }

  private inject(): void {
    this.app.configure(new Channels().inject)
    this.app.configure(new Services().inject)
  }

  private run() {
    this.app.use(notFound())
    this.app.listen(this.port, () => logger.info(`Server listening on port ${this.port}`))
  }

  main(): void {
    this.middleware()
    this.configure()
    this.event()
    this.inject()
    this.run()
  }
}

/**
 * @description boostraping app and run app with env development / production
 */

;(function () {
  if (process.env.NODE_ENV !== 'test') new App().main()
})()
