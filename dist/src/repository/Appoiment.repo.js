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
exports.fetchAppoiments = void 0;
const Appoiments_model_1 = require("../models/Appoiments.model");
const utils_1 = require("./utils");
// Pagination Ref: https://www.bezkoder.com/node-js-sequelize-pagination-mysql/
const fetchAppoiments = (page = 0, size = 3) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, offset } = (0, utils_1.getPagination)(page, size);
        const appoiments = yield Appoiments_model_1.Appoiments.findAndCountAll({
            limit,
            offset
        });
        const pagination = (0, utils_1.getPagingData)(appoiments, page, limit);
        return pagination;
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchAppoiments = fetchAppoiments;
