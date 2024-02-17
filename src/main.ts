import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'
import feathers from '@feathersjs/feathers'
import express, { rest, json, urlencoded, notFound, errorHandler, Application, raw } from '@feathersjs/express'
import socketio from '@feathersjs/socketio'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import zlib from 'zlib'
import hpp from 'hpp'
import morgan from 'morgan'
import reusify from 'reusify'

import { Container, Module } from '~/helpers/helper.di'
import { TodosModule } from '~/modules/todos.module'
import { logger } from '~/libs/lib.wingston'
import { AppModule } from '~/app.module'

@Module([{ token: 'AppModule', useClass: AppModule }])
export class App {
  private readonly app: Application
  private readonly port: number
  private readonly env: string

  constructor() {
    this.app = express<Application>(reusify(feathers).get())
    this.port = +process.env.PORT!
    this.env = process.env.NODE_ENV
  }

  private middleware(): void {
    this.app.use(json({ limit: '1mb' }))
    this.app.use(raw({ inflate: true, limit: '1mb', type: 'application/json' }))
    this.app.use(urlencoded({ extended: true }))
    this.app.use(errorHandler({ logger }))
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(hpp({ checkBody: true, checkQuery: true, checkBodyOnlyForContentType: 'application/json' }))
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true
      })
    )
    this.app.use(
      compression({
        strategy: zlib.constants.Z_RLE,
        level: zlib.constants.Z_BEST_COMPRESSION,
        memLevel: zlib.constants.Z_BEST_COMPRESSION
      })
    )
    if (!['production', 'test'].includes(this.env)) {
      this.app.use(morgan('dev'))
    }
  }

  private configure(): void {
    this.app.configure(rest())
    this.app.configure(socketio())
    Container.register('FeathersMetadata', { useValue: this.app })
  }

  private channel() {
    this.app.on('connection', (con: any) => {
      this.app.channel('todosChannel').join(con)
    })
  }

  private route(): void {
    this.app.configure((app: Application): void => {
      app.use('todos', Container.resolve<TodosModule>('TodosModule'))
    })
  }

  private run() {
    this.app.use(notFound())
    this.app.listen(this.port, () => logger.info(`Server listening on port ${this.port}`))
  }

  main(): void {
    this.middleware()
    this.configure()
    this.channel()
    this.route()
    this.run()
  }
}

/**
 * @description boostraping app and run app with env development / production
 */

;(function () {
  if (process.env.NODE_ENV !== 'test') new App().main()
})()
