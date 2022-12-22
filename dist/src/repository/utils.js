"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUIDFromToken = exports.getToken = exports.getPagingData = exports.getPagination = void 0;
const admin = __importStar(require("firebase-admin"));
const getPagination = (page = 0, size = 3) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
exports.getPagination = getPagination;
const getPagingData = (dataInfo, page, limit) => {
    const { count: totalItems, rows: data } = dataInfo;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, data, totalPages, currentPage };
};
exports.getPagingData = getPagingData;
const getToken = (req) => {
    var _a;
    const str = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : "";
    let idToken = "";
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = str.split(' ')[1];
    }
    return idToken;
};
exports.getToken = getToken;
const getUIDFromToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = yield admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        return uid;
    }
    catch (error) {
        console.error(error);
        return "";
    }
});
exports.getUIDFromToken = getUIDFromToken;
