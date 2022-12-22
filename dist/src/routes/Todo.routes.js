"use strict";
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
exports.TodoRouter = void 0;
const express_1 = require("express");
const Todo_repo_1 = require("../repository/Todo.repo");
exports.TodoRouter = (0, express_1.Router)();
exports.TodoRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description } = req.body;
    if (!description) {
        res.status(400);
        return res.send({
            message: 'No description'
        });
    }
    const newTodo = yield (0, Todo_repo_1.createTodo)(description);
    res.status(201);
    res.send({
        id: newTodo
    });
}));
exports.TodoRouter.get('/:todoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //conversion del todoId para tener congruencia entre el tipo de dato definido en el modelo
    const todoId = Number(req.params['todoId']);
    //validaciones 
    if (todoId <= 0) {
        res.status(400);
        res.send({
            error: 'Invalid id'
        });
    }
    const foundTodo = yield (0, Todo_repo_1.fetchTodoById)(todoId);
    if (!foundTodo) {
        res.status(404); //(404)not found info  -- 400 error del usuario (bad request)
        return res.send({
            error: 'Todo not found'
        });
    }
    console.log(foundTodo);
    res.send(foundTodo);
}));
exports.TodoRouter.put('/:todoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = Number(req.params['todoId']);
    const body = req.body;
    if (todoId <= 0) {
        res.status(404);
        res.send({
            error: 'Invalid id'
        });
    }
    const affectedRows = yield (0, Todo_repo_1.updateTodoById)(todoId, body);
    if (!affectedRows) {
        res.status(400);
        return res.send({
            error: 'Somenthing went wrong'
        });
    }
    if (affectedRows[0] === 0) {
        res.status(400);
        return res.send({
            error: 'Update failed'
        });
    }
    const foundTodo = yield (0, Todo_repo_1.fetchTodoById)(todoId);
    res.status(200);
    return res.send(foundTodo);
}));
exports.TodoRouter.delete('/:todoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = Number(req.params['todoId']);
    if (todoId <= 0) {
        res.status(404);
        res.send({
            error: 'Invalid id'
        });
    }
    const array = yield (0, Todo_repo_1.deleteTodoById)(todoId);
    if (!array) {
        return res.status(400).send({
            error: 'Cannot delete'
        });
    }
    return res.sendStatus(200);
}));
