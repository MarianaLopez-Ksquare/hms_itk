import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional  } from "sequelize";

export class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  declare id: CreationOptional<number> //Propiedades no van a ser emitidas en el js
  declare description: string;
  declare is_completed: CreationOptional<boolean>

  getId(): number {
    return this.id;
  }
  
  public static initModel(sequelize: Sequelize): void {
    Todo.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: DataTypes.STRING,
      is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    
    }, {
      sequelize
    })
  }
}

