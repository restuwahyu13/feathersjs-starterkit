import { Application } from '~/app.declarations'
import { TodosService } from '~/services/todos.service'

export class Services {
  inject(app: Application): void {
    app.use('todos', new TodosService(app))
  }
}
