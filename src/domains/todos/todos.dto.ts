import { ETodosPriority } from '~/domains/todos/todos.enum'

export type TodosCreateDTO = {
  title: string
  content: string
  priority: ETodosPriority
}
