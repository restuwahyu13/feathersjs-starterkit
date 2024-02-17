import { SequelizeAdapter } from 'feathers-sequelize'
import { DataTypes, Model, ModelStatic } from 'sequelize'

import { Database } from '~/configs/config.database'
import { Injectable } from '~/helpers/helper.di'

@Injectable()
export class Todos extends Model {
  private static columns = Todos.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, unique: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
      createdTime: { type: DataTypes.DATE, field: 'updatedtime', allowNull: false, defaultValue: DataTypes.NOW },
      updatedTime: { type: DataTypes.DATE, field: 'createdtime' },
      title: { type: DataTypes.STRING(50), allowNull: false },
      priority: { type: DataTypes.ENUM('low', 'medium', 'high', 'critical') },
      content: { type: DataTypes.TEXT, allowNull: false }
    },
    {
      sequelize: Database.sequelize,
      modelName: Todos.name.toLowerCase(),
      createdAt: false,
      updatedAt: false
    }
  )

  model: ModelStatic<Todos> = new SequelizeAdapter({
    Model: Todos.columns,
    multi: true,
    paginate: { max: 1000 }
  }).Model
}
