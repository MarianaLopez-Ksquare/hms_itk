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
import { Dialect, Sequelize } from "sequelize";
import { Todo } from "../models/Todo";
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
const DB_PASS = <string>process.env.DB_PASS;
const DB_USER = <string>process.env.DB_USER;
const DB_NAME = <string>process.env.DB_NAME;
const HOST = <string>process.env.HOST;
const DB_PORT = <number><unknown>process.env.DB_PORT;
const DIALECT = <Dialect>process.env.DIALECT;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: HOST,
  port: DB_PORT,
  dialect: DIALECT,
});

const models = [Todo.initModel];

for (const ModelInit of models){
  ModelInit(sequelize);
}