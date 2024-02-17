import { Application } from '@feathersjs/express'
import { HookContext, Params, ServiceMethods } from '@feathersjs/feathers'

export class TodosService implements Partial<ServiceMethods<any>> {
  private app: Application
  private todos: Record<string, any>[] = []

  constructor(app: Application) {
    this.app = app
  }

  private broadcast(): void {
    this.app.service('todos').publish((_data: any, _context: HookContext) => {
      this.todos = []
      return this.app.channel('todosChannel')
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
