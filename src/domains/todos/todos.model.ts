import { Column, DataType, Repository, Model, Table } from 'sequelize-typescript'

import { Injectable } from '~/helpers/di.helper'
import { ETodosPriority } from '~/domains/todos/todos.enum'
import { ITodosModel } from '~/domains/todos/todos.interface'

@Table({ tableName: 'todos', createdAt: false, updatedAt: false })
export class TodosModel extends Model implements ITodosModel {
  @Column({ type: DataType.UUID, field: 'id', primaryKey: true, unique: true, allowNull: false, defaultValue: DataType.UUIDV4 })
  todosId: any

  @Column({ type: DataType.DATE, field: 'createdtime', allowNull: false, defaultValue: DataType.NOW })
  createdTime: Date

  @Column({ type: DataType.DATE, field: 'updatedtime' })
  updatedTime?: Date

  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @Column({ type: DataType.ENUM(ETodosPriority.LOW, ETodosPriority.MEDIUM, ETodosPriority.HIGH, ETodosPriority.CRITICAL), allowNull: false })
  priority: ETodosPriority

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string
}

@Injectable()
export class Todos {
  model: Repository<TodosModel> = TodosModel
}
