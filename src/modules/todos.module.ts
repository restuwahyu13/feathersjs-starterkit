import { ModelStatic } from 'sequelize'
import { DependencyContainer } from 'tsyringe'

import { Handler, Inject, Injectable, Module } from '~/helpers/di.helper'
import { TodosService } from '~/services/todos.service'
import { Todos } from '~/models/todos.model'
import { TodosChannel } from '~/channels/todos.channel'
import { AuthHook } from '~/hooks/auth.hook'
import { TodosValidator } from '~/validators/todos.validator'

@Module([
  {
    token: 'TodosService',
    useClass: TodosService
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
    token: 'AuthHook',
    useFactory(dc: DependencyContainer): AuthHook {
      return dc.resolve(AuthHook)
    }
  }
])
@Injectable()
export class TodosModule {
  constructor(
    @Inject('TodosService') public readonly service: TodosService,
    @Inject('TodosChannel') public readonly channel: Handler
  ) {}
}
