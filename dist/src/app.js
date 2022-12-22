"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const Todo_routes_1 = require("./routes/Todo.routes");
const uuid_1 = require("uuid");
const URL_routes_1 = require("./routes/URL.routes");
const User_routes_1 = require("./routes/User.routes");
const Admin_routes_1 = require("./routes/Admin.routes");
const Appointments_routes_1 = require("./routes/Appointments.routes");
app.use(express_1.default.json());
app.use('/todos', Todo_routes_1.TodoRouter);
app.use('/users', User_routes_1.UserRouter);
app.use("/appointments", Appointments_routes_1.AppointmentsRouter);
app.use('/admin', Admin_routes_1.AdminRouter);
app.use('/u', URL_routes_1.URLRouter);
const idPrueba = (0, uuid_1.v4)();
console.log('Aqui esta el ID:', idPrueba);
app.get("/", (req, res) => {
    res.send('Holaaaaaaaa');
});
exports.default = app;
