"use strict";
// *Admin Module
// -Can see all patients with filters
// -Can see all doctors with filters
// -Can see all appointments with filter
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admins = void 0;
// -Can add new doctors: Pending
const sequelize_1 = require("sequelize");
class Admins extends sequelize_1.Model {
    getId() {
        return this.id;
    }
    static initModel(sequelize) {
        Admins.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uid: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: "",
            },
            lastName: {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: "",
            },
            age: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 18,
            },
            gender: {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: "female",
            },
        }, {
            sequelize
        });
    }
}
exports.Admins = Admins;
