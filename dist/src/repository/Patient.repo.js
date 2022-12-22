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
exports.fetchPatient = exports.modifyIsActiveProp = exports.createPatient = void 0;
const firebase_1 = require("../firebase");
const Patients_model_1 = require("../models/Patients.model");
const createPatient = (uid, email, displayName, password, name, lastName, age, gender) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPatient = yield Patients_model_1.Patients.create({ uid, isActive: true, name, lastName, age, gender });
        return newPatient;
    }
    catch (error) {
        console.error(error);
        return error;
    }
});
exports.createPatient = createPatient;
const modifyIsActiveProp = (uid, isActive) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield Patients_model_1.Patients.update({ isActive: isActive }, {
            where: {
                uid: uid
            }
        });
        return foo;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.modifyIsActiveProp = modifyIsActiveProp;
const fetchPatient = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield Patients_model_1.Patients.findOne({
            where: {
                uid: uid
            }
        });
        const user = yield (0, firebase_1.readUser)(uid);
        return Object.assign(Object.assign({}, user), patient === null || patient === void 0 ? void 0 : patient.toJSON());
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.fetchPatient = fetchPatient;
