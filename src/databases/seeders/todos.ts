import { ModelStatic, QueryInterface, Sequelize } from 'sequelize'

module.exports = {
  up: async (_queryInterface: QueryInterface, sequelize: Sequelize) => {
    const model: ModelStatic<any> = await sequelize.model('todos')

    const todosData: Record<string, any>[] = []
    const countTodos: number = await model.count()

    if (!countTodos) {
      for (let i = 0; i < 10; i++) {
        todosData.push({
          title: Math.random().toString(),
          content: Math.random().toString()
        })
      }

      model.bulkCreate(todosData)
    }
  },
  down: async (_queryInterface: QueryInterface, sequelize: Sequelize) => {
    const model: ModelStatic<any> = await sequelize.model('todos')

    const todos: any[] = await model.findAll()
    if (todos.length > 0) {
      todos.forEach((todo: any) => {
        model.destroy({ where: { id: todo.id } })
      })
    }
  }
}
