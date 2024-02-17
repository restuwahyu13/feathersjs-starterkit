import { TodosService } from '~/services/todos.service'
import { Application } from '~/app.declarations'

export class Services {
  inject(app: Application): void {
    app.use('todos', new TodosService(app))
  }
}
