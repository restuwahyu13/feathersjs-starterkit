import { DependencyContainer } from 'tsyringe'

import { Injectable, Module } from '~/helpers/di.helper'
import { TodosModule } from '~/domains/todos/todos.module'

@Module([
  {
    token: 'TodosModule',
    useFactory: (dc: DependencyContainer): TodosModule => {
      return dc.resolve(TodosModule)
    }
  }
])
@Injectable()
export class AppModule {}
