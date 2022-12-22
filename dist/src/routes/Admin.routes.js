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
exports.AdminRouter = void 0;
const express_1 = require("express");
const firebase_1 = require("../firebase");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const Appointments_repo_1 = require("../repository/Appointments.repo");
const Doctor_repo_1 = require("../repository/Doctor.repo");
const dotenv = require("dotenv");
dotenv.config();
exports.AdminRouter = (0, express_1.Router)();
// Admin Endpoints
//Create an endpoint where an admin can create a new doctor account (user).  
exports.AdminRouter.post("/users/doctors", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Info desde el body
    // Checar si falta info
    // Checar que el rol sea adecuado
    const { email, password, displayName, degree, name, lastName, age, gender, yearsExperience, admin_id, deparment_id } = req.body;
    if (!email || !password || !displayName || !name || !gender) {
        return res.status(400).send({ error: "Missing fields" });
    }
    try {
        const user_uid = yield (0, firebase_1.createUserIfNotExist)(displayName, email, password, "doctor");
        // Step 2: Create and Fill our Doctor Model with the info and link to the new userId
        const doctor = yield (0, Doctor_repo_1.createDoctor)(user_uid, degree, name, lastName, age, gender, yearsExperience, admin_id, deparment_id);
        // Step 3: send the doctor info in case everything is ok
        res.status(201).send({
            doctor
        });
    }
    catch (error) {
        return res.status(500).send({ error });
    }
}));
// Create an endpoint that can modify the is_active property from the User model back to true. 
exports.AdminRouter.put("/users/doctors/:doctor_id", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor_id = Number(req.params['doctor_id']);
    const body = req.body;
    if (doctor_id <= 0) {
        res.status(404);
        res.send({
            error: 'Invalid id'
        });
    }
    const affectedRows = yield (0, Doctor_repo_1.updateDoctor)(doctor_id, body);
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
    const foundDoctor = yield (0, Doctor_repo_1.fetchDoctorById)(doctor_id);
    res.status(200);
    return res.send(foundDoctor);
}));
///////////////////////
exports.AdminRouter.get("/appoiments", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appoiments = yield (0, Appointments_repo_1.fetchAppoiments)({});
        return res.status(200).send(appoiments);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
///////////
