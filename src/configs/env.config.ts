import { Dialect } from 'sequelize'

export class Env {
  static readonly NODE_ENV: string = process.env.NODE_ENV ?? 'development'
  static readonly PORT: number = +process.env.PORT ?? 3000
  static readonly DB_URI: string = process.env.DB_URI ?? 'postgres://username:password@localhost:5432/database?ssl_disable=true'
  static readonly DB_DRIVER: Dialect = (process.env.DB_DRIVER as Dialect) ?? 'postgres'
}
