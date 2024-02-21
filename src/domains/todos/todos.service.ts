import { HookContext, Params, ServiceMethods } from '@feathersjs/feathers'
import { StatusCodes as status } from 'http-status-codes'
import { Repository } from 'sequelize-typescript'

import { TodosModel } from '~/domains/todos/todos.model'
import { apiResponse } from '~/helpers/api.helper'
import { Inject, Injectable } from '~/helpers/di.helper'
import { TodosCreateDTO } from '~/domains/todos/todos.dto'
import { ITodosModel } from './todos.interface'

@Injectable()
export class TodosService implements Partial<ServiceMethods<any>> {
  private service: string = 'todos'
  private todos: Record<string, any>[] = []

  constructor(
    @Inject('TodosModel')
    private readonly todosModel: Repository<TodosModel>
  ) {}

  async find(_params: Params): Promise<Record<string, any> | Record<string, any>[]> {
    const todos: ITodosModel[] = await this.todosModel.findAll()

    return apiResponse(this.service, { stat_code: status.OK, stat_message: 'Success', data: todos })
  }

  async create(data: TodosCreateDTO, _ctx: HookContext): Promise<any> {
    if (this.todos.length > 0) {
      this.todos = []
    }
    this.todos.push(data)

    return apiResponse(this.service, { stat_code: status.OK, stat_message: 'Success', data })
  }
}
