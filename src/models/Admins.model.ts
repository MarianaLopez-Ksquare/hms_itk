// *Admin Module
// -Can see all patients with filters
// -Can see all doctors with filters
// -Can see all appointments with filter


// -Can add new doctors: Pending
import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional  } from "sequelize";

// This interface is not used but it was taken as reference of HSM Stage 1 in order to create Model.
// Fixed on Stage 2: added extra information like name,lastname, etc.
export interface AdminType {
    id: number,
    uid: number,
    name: string,
    lastName: string,
    age: number,
    gender: string
}

export class Admins extends Model<InferAttributes<Admins>, InferCreationAttributes<Admins>> {
  declare id: CreationOptional<number>; //Propiedades no van a ser emitidas en el js
  declare uid: string;
  declare name: string;
  declare lastName: string;
  declare age: number;
  declare gender: string;

  getId(): number {
    return this.id;
  }
  
  public static initModel(sequelize: Sequelize): void {
    Admins.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      age: {
        type: DataTypes.INTEGER,
        defaultValue: 18,
      },
      gender: {
        type: DataTypes.STRING,
        defaultValue: "female",
      },
    }, {
      sequelize
    })
  }
}

