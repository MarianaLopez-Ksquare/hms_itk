"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appoiments = void 0;
const sequelize_1 = require("sequelize");
class Appoiments extends sequelize_1.Model {
    getId() {
        return this.id;
    }
    static initModel(sequelize) {
        Appoiments.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            doctor_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null,
            },
            patient_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            isAttended: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            deparment_id: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: null,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: "",
            },
        }, {
            sequelize
        });
    }
}
exports.Appoiments = Appoiments;
