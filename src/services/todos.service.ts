import { Application } from '@feathersjs/express'
import { HookContext, Params, ServiceMethods } from '@feathersjs/feathers'
import { ModelStatic } from 'sequelize'

import { Inject, Injectable } from '~/helpers/helper.di'
import { TodosModel } from '~/models/model.todos'

@Injectable()
export class TodosService implements Partial<ServiceMethods<any>> {
  private todos: Record<string, any>[] = []

  constructor(
    @Inject('FeathersMetadata')
    private readonly feathersMetadata: Application,
    @Inject('TodosModel')
    private readonly todosModel: ModelStatic<TodosModel>
  ) {}

  private broadcast(): void {
    this.feathersMetadata.service('todos').publish((_data: any, _context: HookContext) => {
      this.todos = []
      return this.feathersMetadata.channel('todosChannel')
    })
  }

  async find(_params: Params): Promise<Record<string, any> | Record<string, any>[]> {
    return this.todos
  }

  async create(data: any): Promise<any> {
    this.todos.push(data)
    this.broadcast()

    return this.todos
  }
}
