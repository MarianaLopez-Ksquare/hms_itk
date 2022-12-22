"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Departments = exports.DepartmentType = void 0;
var DepartmentType;
(function (DepartmentType) {
    //All medical classifaction ex. 
    DepartmentType["GeneralServices"] = "general services";
    DepartmentType["Cardiology"] = "cardiology";
    DepartmentType["Gastroenterology"] = "gastroenterology";
    DepartmentType["Gynecology"] = "gynecology:";
    DepartmentType["Haematology"] = "haematology:";
})(DepartmentType = exports.DepartmentType || (exports.DepartmentType = {}));
const sequelize_1 = require("sequelize");
class Departments extends sequelize_1.Model {
    getId() {
        return this.id;
    }
    static initModel(sequelize) {
        Departments.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            type: {
                type: sequelize_1.DataTypes.ENUM(...Object.values(DepartmentType)),
                allowNull: false,
                defaultValue: DepartmentType.GeneralServices
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
exports.Departments = Departments;
