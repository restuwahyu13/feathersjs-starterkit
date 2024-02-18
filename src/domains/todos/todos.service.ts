import { HookContext, Params, ServiceMethods } from '@feathersjs/feathers'
import { StatusCodes as status } from 'http-status-codes'
import { ModelStatic } from 'sequelize'

import { TodosCreateDTO } from '~/domains/todos/todos.dto'
import { apiResponse } from '~/helpers/api.helper'
import { Inject, Injectable } from '~/helpers/di.helper'
import { Todos } from '~/domains/todos/todos.model'

@Injectable()
export class TodosService implements Partial<ServiceMethods<any>> {
  private service: string = 'todos'
  private todos: Record<string, any>[] = []

  constructor(
    @Inject('TodosModel')
    private readonly todosModel: ModelStatic<Todos>
  ) {}

  async find(_params: Params): Promise<Record<string, any> | Record<string, any>[]> {
    return apiResponse(this.service, { stat_code: status.OK, stat_message: 'Success', data: this.todos })
  }

  async create(data: TodosCreateDTO, _ctx: HookContext): Promise<any> {
    if (this.todos.length > 0) {
      this.todos = []
    }
    this.todos.push(data)

    return apiResponse(this.service, { stat_code: status.OK, stat_message: 'Success', data })
  }
}
