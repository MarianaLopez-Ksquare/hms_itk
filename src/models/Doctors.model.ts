// *Doctors Module
// -Can see all patients with filters
// -Can see all doctors with filters
// -Can see all appointments with filter

import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional  } from "sequelize";

// This interface is not used but it was taken as reference of HSM Stage 1 in order to create Model.
// Fixed on Stage 2: added extra information like name,lastname, etc.
export interface DoctorsType {
    id: number,
    uid: number,
    degree: string,
    name: string,
    lastName: string,
    age: number,
    gender: string,
    yearsExperience: number,
    admin_id: number,
    department_id: number, // Important Note: deparment_id is just an relation to departmentId which contains information like the medicine area
}

export class Doctors extends Model<InferAttributes<Doctors>, InferCreationAttributes<Doctors>> {
  declare id: CreationOptional<number>; //Propiedades no van a ser emitidas en el js
  declare uid: string;
  declare degree: string;
  declare name: string;
  declare lastName: string;
  declare age: number;
  declare gender: string;
  declare yearsExperience: number;
  declare admin_id: number;
  declare department_id: number;

  getId(): number {
    return this.id;
  }
  
  public static initModel(sequelize: Sequelize): void {
    Doctors.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      degree: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 18,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "female",
      },
      yearsExperience: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 18,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        defaultValue: null, // In sometimes times a Doctor can be without a leader/admin for RH desicion
      },
      department_id: {
        type: DataTypes.INTEGER,
        defaultValue: null, //Somethis, a Doctor could not have a deparmet, maybe RH is moving to another path or could be promoved or hired
      },
    }, {
      sequelize
    })
  }
}

