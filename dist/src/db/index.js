"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
/**
 * npm install sequelize pg pg-hstore;
Hay dos maneras de conectarse a una db,

**Primera manera un URI
URI: postgres://test1:raspberry@localhost:5432/testdb1;
     postgres://user:password@server:port/database;
*/
const dotenv = require("dotenv");
dotenv.config();
//ES5 import;
const sequelize_1 = require("sequelize");
const Todo_1 = require("../models/Todo");
//ES6
// import { Sequelize } from 'sequelize';
/**
 * First method URI
 */
//const uriConnection = "postgres://test1:raspberry@localhost:5432/test1db"
//const sequelize = new Sequelize(uriConnection,{dialect: "postgres"});
/**
 * Second method with constructor
 */
const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const HOST = process.env.HOST;
const DB_PORT = process.env.DB_PORT;
const DIALECT = process.env.DIALECT;
exports.sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: HOST,
    port: DB_PORT,
    dialect: DIALECT,
});
const models = [Todo_1.Todo.initModel];
for (const ModelInit of models) {
    ModelInit(exports.sequelize);
}
