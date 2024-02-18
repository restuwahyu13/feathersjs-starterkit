import { Sequelize } from 'sequelize'
import { Env } from '~/configs/env.config'

export class Database {
  private static setup(): Sequelize {
    return new Sequelize(Env.DB_URI, {
      dialect: Env.DB_DRIVER,
      pool: {
        min: 5,
        max: 10
      },
      logQueryParameters: Env.NODE_ENV !== 'production' ? true : false,
      logging: Env.NODE_ENV !== 'production' ? true : false,
      ssl: false
    })
  }

  private static connect(): Sequelize {
    const connection: Sequelize = Database.setup()
    connection
      .authenticate()
      .then(() => console.log('Database connection established'))
      .catch((e: any) => console.error('Database connection unestablished: ', e))

    return connection
  }

  static sequelize = Database.connect()
}
