export enum DepartmentType {
    //All medical classifaction ex. 
    GeneralServices = "general services",
    Cardiology= "cardiology",
    Gastroenterology = "gastroenterology",
    Gynecology = "gynecology:",
    Haematology = "haematology:",
}

import {Sequelize, DataTypes, InferAttributes, InferCreationAttributes, Model, CreationOptional} from "sequelize"

export class Departments extends Model<InferAttributes<Departments>,InferCreationAttributes<Departments>> {
    declare id: CreationOptional<number>;
    declare type: DepartmentType;
    declare description: string;

    getId(): number {
        return this.id
    }
    public static initModel(sequelize: Sequelize): void {
        Departments.init({
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          type: {
            type: DataTypes.ENUM(...Object.values(DepartmentType)),
            allowNull: false,
            defaultValue: DepartmentType.GeneralServices
          },
          description: {
            type: DataTypes.STRING,
            defaultValue: "",
          },
        }, {
          sequelize
        })
    }
}