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
exports.fetchAppoiments = exports.deleteAppointmentById = exports.updateAppointmentById = exports.fetchAppointmentById = exports.createAppointment = void 0;
const Appoiments_model_1 = require("../models/Appoiments.model");
const utils_1 = require("./utils");
const createAppointment = (description, date, doctor_id, patient_id, isAttended, deparment_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = yield Appoiments_model_1.Appoiments.create({ description, date, doctor_id, patient_id, isAttended, deparment_id });
        return newAppointment;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createAppointment = createAppointment;
const fetchAppointmentById = (idGivenByUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundAppointment = yield Appoiments_model_1.Appoiments.findOne({
            where: {
                id: idGivenByUser
            }
        });
        return foundAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchAppointmentById = fetchAppointmentById;
// para cuando tenemos modelos más complejos
const updateAppointmentById = (id, appoimentsModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield Appoiments_model_1.Appoiments.update(appoimentsModel, {
            where: {
                id
            }
        });
        return foo;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateAppointmentById = updateAppointmentById;
const deleteAppointmentById = (idGivenByUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numberOfDestoyedRows = yield Appoiments_model_1.Appoiments.destroy({
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
exports.deleteAppointmentById = deleteAppointmentById;
// Pagination Ref: https://www.bezkoder.com/node-js-sequelize-pagination-mysql/
const fetchAppoiments = (options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const page = (_a = options === null || options === void 0 ? void 0 : options.page) !== null && _a !== void 0 ? _a : 0;
        const size = (_b = options === null || options === void 0 ? void 0 : options.size) !== null && _b !== void 0 ? _b : 3;
        const where = (_c = options === null || options === void 0 ? void 0 : options.where) !== null && _c !== void 0 ? _c : {};
        const { limit, offset } = (0, utils_1.getPagination)(page, size);
        const appoiments = yield Appoiments_model_1.Appoiments.findAndCountAll(Object.assign({ limit,
            offset }, where));
        const pagination = (0, utils_1.getPagingData)(appoiments, page, limit);
        return pagination;
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchAppoiments = fetchAppoiments;
