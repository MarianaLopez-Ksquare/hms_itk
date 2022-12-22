"use strict";
// *Doctors Module
// -Can see all patients with filters
// -Can see all doctors with filters
// -Can see all appointments with filter
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctors = void 0;
const sequelize_1 = require("sequelize");
class Doctors extends sequelize_1.Model {
    getId() {
        return this.id;
    }
    static initModel(sequelize) {
        Doctors.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uid: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            degree: {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: "",
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: "",
            },
            age: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 18,
            },
            gender: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: "female",
            },
            yearsExperience: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 18,
            },
            admin_id: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: null, // In sometimes times a Doctor can be without a leader/admin for RH desicion
            },
            department_id: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: null, //Somethis, a Doctor could not have a deparmet, maybe RH is moving to another path or could be promoved or hired
            },
        }, {
            sequelize
        });
    }
}
exports.Doctors = Doctors;
