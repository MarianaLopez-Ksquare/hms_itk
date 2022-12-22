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
exports.fetchDoctorById = exports.updateDoctor = exports.createDoctor = void 0;
const Doctors_model_1 = require("../models/Doctors.model");
const createDoctor = (uid, degree, name, lastName, age, gender, yearsExperience, admin_id, department_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDoctor = yield Doctors_model_1.Doctors.create({ uid, degree, name, lastName, age, gender, yearsExperience, admin_id, department_id });
        return newDoctor;
    }
    catch (error) {
        console.error(error);
        return error;
    }
});
exports.createDoctor = createDoctor;
const updateDoctor = (id, doctorModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctor = yield Doctors_model_1.Doctors.update(doctorModel, {
            where: {
                id: id
            }
        });
        return doctor;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateDoctor = updateDoctor;
const fetchDoctorById = (idGivenByUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundDoctor = yield Doctors_model_1.Doctors.findOne({
            where: {
                id: idGivenByUser
            }
        });
        return foundDoctor;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchDoctorById = fetchDoctorById;
