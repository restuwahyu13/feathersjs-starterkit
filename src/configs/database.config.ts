import { Sequelize } from 'sequelize-typescript'

import { Env } from '~/configs/env.config'
import { TodosModel } from '~/domains/todos/todos.model'

export class Database {
  private static init: Sequelize = new Sequelize(Env.DB_URI, {
    dialect: Env.DB_DRIVER,
    pool: {
      min: 5,
      max: 10
    },
    logQueryParameters: Env.NODE_ENV !== 'production' ? true : false,
    logging: Env.NODE_ENV !== 'production' ? true : false,
    ssl: false
  })

  static connect(): void {
    const connection: Sequelize = Database.init

    connection.addModels([TodosModel])
    connection
      .authenticate()
      .then(() => console.log('Database connection established'))
      .catch((e: any) => console.error('Database connection unestablished: ', e))
  }
}
