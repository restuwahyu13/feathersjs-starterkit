import { DataTypes, Model, ModelStatic } from 'sequelize'
import { Database } from '~/configs/config.database'
import { SequelizeAdapter } from 'feathers-sequelize'
import { Injectable } from '~/helpers/helper.di'

@Injectable()
export class TodosModel extends Model {
  private static model = TodosModel.init(
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
      modelName: 'Todos',
      createdAt: false,
      updatedAt: false
    }
  )

  adapter: ModelStatic<TodosModel> = new SequelizeAdapter({
    Model: TodosModel.model,
    multi: true,
    paginate: { max: 1000 }
  }).Model
}
