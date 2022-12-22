"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initURLModel = exports.URL = void 0;
const sequelize_1 = require("sequelize");
class URL extends sequelize_1.Model {
}
exports.URL = URL;
const initURLModel = (sequelize) => {
    URL.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        },
        origUrl: sequelize_1.DataTypes.STRING
    }, {
        sequelize
    });
};
exports.initURLModel = initURLModel;
