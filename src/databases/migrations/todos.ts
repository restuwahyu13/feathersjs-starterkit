import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    const tablExist: boolean = await queryInterface.tableExists('todos')
    if (!tablExist) {
      return queryInterface.createTable('todos', {
        id: { type: DataTypes.UUID, primaryKey: true, unique: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        createdTime: { type: DataTypes.DATE, field: 'updatedtime', allowNull: false, defaultValue: DataTypes.NOW },
        updatedTime: { type: DataTypes.DATE, field: 'createdtime' },
        title: { type: DataTypes.STRING(50), allowNull: false },
        priority: { type: DataTypes.ENUM('low', 'medium', 'high', 'critical'), allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false }
      })
    }
  },
  down: async (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    const tableExist: boolean = await queryInterface.tableExists('todos')
    if (tableExist) {
      return queryInterface.dropTable('todos')
    }
  }
}
