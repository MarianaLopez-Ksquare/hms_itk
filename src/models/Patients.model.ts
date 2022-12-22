import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional  } from "sequelize";

// This interface is not used but it was taken as reference of HSM Stage 1 in order to create Model.
// Fixed on Stage 2: added extra information like name,lastname, etc.
export interface PatientsType {
    id: number,
    uid: number,
    name: string,
    lastName: string,
    age: number,
    gender: string,
}

export class Patients extends Model<InferAttributes<Patients>, InferCreationAttributes<Patients>> {
  declare id: CreationOptional<number>; //Propiedades no van a ser emitidas en el js
  declare uid: string;
  declare isActive: boolean;
  declare name: string;
  declare lastName: string;
  declare age: number;
  declare gender: string;

  getId(): number {
    return this.id;
  }
  
  public static initModel(sequelize: Sequelize): void {
    Patients.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize
    })
  }
}