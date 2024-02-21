import { DependencyContainer } from 'tsyringe'

import { Handler, Inject, Injectable, Module } from '~/helpers/di.helper'
import { TodosService } from '~/domains/todos/todos.service'
import { Todos, TodosModel } from '~/domains/todos/todos.model'
import { TodosChannel } from '~/domains/todos/todos.channel'
import { TodosValidator } from '~/domains/todos/todos.validator'
import { AuthMiddleware } from '~/middlewares/auth.middleware'
import { TodosHook } from '~/domains/todos/todos.hook'
import { Repository } from 'sequelize-typescript'

@Module([
  {
    token: 'TodosService',
    useClass: TodosService
  },
  {
    token: 'TodosHook',
    useFactory(dc: DependencyContainer): Handler {
      return dc.resolve(TodosHook).inject()
    }
  },
  {
    token: 'TodosChannel',
    useFactory(dc: DependencyContainer): Handler {
      return dc.resolve(TodosChannel).inject()
    }
  },
  {
    token: 'TodosModel',
    useFactory(dc: DependencyContainer): Repository<TodosModel> {
      return dc.resolve(Todos).model
    }
  },
  {
    token: 'TodosValidator',
    useFactory(dc: DependencyContainer): TodosValidator {
      return dc.resolve(TodosValidator)
    }
  },
  {
    token: 'AuthMiddleware',
    useFactory(dc: DependencyContainer): AuthMiddleware {
      return dc.resolve(AuthMiddleware)
    }
  }
])
@Injectable()
export class TodosModule {
  constructor(
    @Inject('TodosService') public readonly service: TodosService,
    @Inject('TodosHook') public readonly hook: Handler,
    @Inject('TodosChannel') public readonly channel: Handler
  ) {}
}
