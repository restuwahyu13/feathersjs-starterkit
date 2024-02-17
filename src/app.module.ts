import { Injectable, Module } from '~/helpers/helper.di'
import { TodosModule } from './modules/todos.module'
import { TodosService } from './services/todos.service'
import { DependencyContainer } from 'tsyringe'

@Module([
  {
    token: 'TodosModule',
    useFactory: (dc: DependencyContainer): TodosService => {
      return dc.resolve(TodosModule).todosService
    }
  }
])
@Injectable()
export class AppModule {}
