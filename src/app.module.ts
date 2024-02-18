import { DependencyContainer } from 'tsyringe'

import { Injectable, Module } from '~/helpers/di.helper'
import { TodosModule } from '~/modules/todos.module'
import { TodosService } from '~/services/todos.service'

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
