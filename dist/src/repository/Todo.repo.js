"use strict";
//funciones y metodos de sequelize
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoById = exports.updateTodoById = exports.fetchTodoById = exports.createTodo = void 0;
const Todo_1 = require("../models/Todo");
const createTodo = (description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = yield Todo_1.Todo.create({
            description
        });
        return newTodo.id;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createTodo = createTodo;
const fetchTodoById = (idGivenByUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundTodo = yield Todo_1.Todo.findOne({
            where: {
                id: idGivenByUser
            }
        });
        return foundTodo;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchTodoById = fetchTodoById;
// para cuando tenemos modelos más complejos
const updateTodoById = (id, todoModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield Todo_1.Todo.update(todoModel, {
            where: {
                id: todoModel.id
            }
        });
        return foo;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateTodoById = updateTodoById;
const deleteTodoById = (idGivenByUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numberOfDestoyedRows = yield Todo_1.Todo.destroy({
            where: {
                id: idGivenByUser
            }
        });
        return numberOfDestoyedRows;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deleteTodoById = deleteTodoById;
