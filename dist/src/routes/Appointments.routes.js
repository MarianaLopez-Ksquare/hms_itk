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
exports.AppointmentsRouter = void 0;
const express_1 = require("express");
const isAdmin_1 = require("../middlewares/isAdmin");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const Appointments_repo_1 = require("../repository/Appointments.repo");
const Patient_repo_1 = require("../repository/Patient.repo");
const utils_1 = require("../repository/utils");
exports.AppointmentsRouter = (0, express_1.Router)();
exports.AppointmentsRouter.post('/', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["patient", "admin"], allowSamerUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, date, doctor_id, isAttended, deparment_id } = req.body;
    try {
        // Getting token info to fetch id and uid
        const token = (0, utils_1.getToken)(req);
        console.log("1: ", token);
        const uid = yield (0, utils_1.getUIDFromToken)(token);
        console.log("2: ", uid);
        const user = yield (0, Patient_repo_1.fetchPatient)(uid);
        console.log("3: ", user.id);
        if (!user.id) {
            res.status(500);
            return res.send({
                error: 'Appoinint can not be created because user fetch by token failed, try with an logged account'
            });
        }
        const newAppointments = yield (0, Appointments_repo_1.createAppointment)(description, date, doctor_id, user.id, isAttended, deparment_id);
        res.status(201);
        return res.send(newAppointments);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}));
exports.AppointmentsRouter.get('/:id', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["patient", "admin"], allowSamerUser: true }), isAdmin_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //conversion del todoId para tener congruencia entre el tipo de dato definido en el modelo
    const id = Number(req.params['id']);
    //validaciones 
    if (id <= 0) {
        res.status(400);
        res.send({
            error: 'Invalid id'
        });
    }
    const foundAppointments = yield (0, Appointments_repo_1.fetchAppointmentById)(id);
    if (!foundAppointments) {
        res.status(404); //(404)not found info  -- 400 error del usuario (bad request)
        return res.send({
            error: 'Appointments not found'
        });
    }
    console.log(foundAppointments);
    res.send(foundAppointments);
}));
exports.AppointmentsRouter.get('/', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["patient", "admin"], allowSamerUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    // Getting token info to fetch id and uid
    const token = (0, utils_1.getToken)(req);
    console.log("1: ", token);
    const uid = yield (0, utils_1.getUIDFromToken)(token);
    console.log("2: ", uid);
    // fetch patient to get its id
    const user = yield (0, Patient_repo_1.fetchPatient)(uid);
    console.log("3: ", user.id);
    if (!user.id) {
        res.status(500);
        return res.send({
            error: 'Appoinint can not be created because user fetch by token failed, try with an logged account'
        });
    }
    const options = {
        page: Number(page),
        size: Number(size),
        where: {
            patient_id: user.id
        }
    };
    // if user.role == 
    const foundAppointments = yield (0, Appointments_repo_1.fetchAppoiments)(options);
    if (!foundAppointments) {
        res.status(404); //(404)not found info  -- 400 error del usuario (bad request)
        return res.send({
            error: 'Appointments not found'
        });
    }
    console.log(foundAppointments);
    res.send(foundAppointments);
}));
exports.AppointmentsRouter.put('/:id', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["patient", "admin"], allowSamerUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params['id']);
    const body = req.body;
    console.log("my id: ", id);
    if (id <= 0) {
        res.status(404);
        res.send({
            error: 'Invalid id'
        });
    }
    const affectedRows = yield (0, Appointments_repo_1.updateAppointmentById)(id, body);
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
    const foundAppointments = yield (0, Appointments_repo_1.fetchAppointmentById)(id);
    res.status(200);
    return res.send(foundAppointments);
}));
exports.AppointmentsRouter.delete('/:todoId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["patient", "admin"], allowSamerUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = Number(req.params['todoId']);
    if (todoId <= 0) {
        res.status(404);
        res.send({
            error: 'Invalid id'
        });
    }
    const array = yield (0, Appointments_repo_1.deleteAppointmentById)(todoId);
    if (!array) {
        return res.status(400).send({
            error: 'Cannot delete'
        });
    }
    return res.sendStatus(200);
}));
