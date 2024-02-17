import { ModelStatic } from 'sequelize'
import { DependencyContainer } from 'tsyringe'

import { TodosService } from '~/services/todos.service'
import { Inject, Injectable, Module } from '~/helpers/helper.di'
import { FeathersMetadata } from '~/helpers/helper.feathersMetadata'
import { TodosModel } from '~/models/model.todos'

@Module([
  {
    token: 'TodosService',
    useClass: TodosService
  },
  {
    token: 'TodosModel',
    useFactory(dc: DependencyContainer): ModelStatic<TodosModel> {
      return dc.resolve(TodosModel).adapter
    }
  },
  {
    token: 'FeathersMetadata',
    useFactory(dc: DependencyContainer): FeathersMetadata {
      return dc.resolve(FeathersMetadata)
    }
  }
])
@Injectable()
export class TodosModule {
  constructor(@Inject('TodosService') public readonly todosService: TodosService) {}
}
