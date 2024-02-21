export interface ITodosModel {
  todosId: string
  createdTime: Date
  updatedTime?: Date
  title: string
  priority: string
  content: string
}
