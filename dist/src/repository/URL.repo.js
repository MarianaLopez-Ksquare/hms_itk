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
exports.fetchUrlById = exports.createURL = void 0;
const URL_models_1 = require("../models/URL.models");
//Crear una nueva URL
//Dado un ID obtener un nuevo ID
const createURL = (id, origUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const newModel = URL_models_1.URL.build({
        id,
        origUrl
    });
    const res = yield newModel.save();
    return res.id;
});
exports.createURL = createURL;
const fetchUrlById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urlFetched = yield URL_models_1.URL.findByPk(id);
        if (!urlFetched) {
            return 'Record not found';
        }
        return urlFetched.origUrl;
    }
    catch (error) {
    }
});
exports.fetchUrlById = fetchUrlById;
