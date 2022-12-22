"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patients = void 0;
const sequelize_1 = require("sequelize");
class Patients extends sequelize_1.Model {
    getId() {
        return this.id;
    }
    static initModel(sequelize) {
        Patients.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uid: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            isActive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            gender: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize
        });
    }
}
exports.Patients = Patients;
