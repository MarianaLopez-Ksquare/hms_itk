"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const sequelize_1 = require("sequelize");
class Todo extends sequelize_1.Model {
    getId() {
        return this.id;
    }
    static initModel(sequelize) {
        Todo.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            description: sequelize_1.DataTypes.STRING,
            is_completed: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            }
        }, {
            sequelize
        });
    }
}
exports.Todo = Todo;
