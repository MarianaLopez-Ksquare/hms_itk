import { DepartmentType } from "./Departments.model";
import { Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes  } from "sequelize";

export interface AppoimentsType {
    id: number; //unique id that will be support by node
    doctor_id: number; //What doctor will be reseive the person
    patient_id: number;
    date: Date; //When the appoiment will be,
    isAttended: boolean;
    deparment_id: number;
    description: string; // what is wrong with the patient
}

export class Appoiments extends Model<InferAttributes<Appoiments>, InferCreationAttributes<Appoiments>> {
    declare id: CreationOptional<number>;
    declare doctor_id: number;
    declare patient_id: number;
    declare date: Date;
    declare isAttended: boolean;
    declare deparment_id: number;
    declare description: string;

    getId(): number {
        return this.id;
    }

    public static initModel(sequelize: Sequelize) {
        Appoiments.init({
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            doctor_id: {
                type: DataTypes.INTEGER,
                allowNull: true, // In some occations an appointment could have a doctorId null becase it can be assined later by and admin
                defaultValue: null,
            },
            patient_id: { //I want that Appointment needs to have a patient, in the case of a Doctor is not necessary because in some time the doctor could be assigned later by an admin so doctorId could be null in occations
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
              type: DataTypes.DATE,
              allowNull: false,
            },
            isAttended: {
              type: DataTypes.BOOLEAN,
              allowNull: false, // Not allow because only have 2 states, i will set as default not attended 
              defaultValue: false,
            },
            deparment_id: {
              type: DataTypes.INTEGER,
              defaultValue: null,
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