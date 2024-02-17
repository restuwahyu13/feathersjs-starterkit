import { DependencyContainer } from 'tsyringe'

import { Injectable, Module } from '~/helpers/helper.di'
import { TodosModule } from '~/modules/todos.module'
import { TodosService } from '~/services/todos.service'

@Module([
  {
    token: 'TodosModule',
    useFactory: (dc: DependencyContainer): TodosService => {
      return dc.resolve(TodosModule).service
    }
  }
])
@Injectable()
export class AppModule {}
