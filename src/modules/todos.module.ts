import { ModelStatic } from 'sequelize'
import { DependencyContainer } from 'tsyringe'

import { Handler, HandlerContext, Inject, Injectable, Module } from '~/helpers/di.helper'
import { TodosService } from '~/services/todos.service'
import { Todos } from '~/models/todos.model'
import { TodosChannel } from '~/channels/todos.channel'
import { TodosValidator } from '~/validators/todos.validator'
import { AuthMiddleware } from '~/middlewares/auth.middleware'
import { TodosHook } from '~/hooks/todos.hook'

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
    useFactory(dc: DependencyContainer): ModelStatic<Todos> {
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
