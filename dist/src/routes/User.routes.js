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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const firebase_1 = require("../firebase");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const Patient_repo_1 = require("../repository/Patient.repo");
const utils_1 = require("../repository/utils");
const dotenv = require("dotenv");
dotenv.config();
exports.UserRouter = (0, express_1.Router)();
// Admin Endpoints
exports.UserRouter.get("/", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin", "doctor"], allowSamerUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = res.locals;
    try {
        const user = yield (0, firebase_1.readUser)(uid);
        return res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
///////////
exports.UserRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Info desde el body
    // Checar si falta info
    // Checar que el rol sea adecuado
    const { email, password, displayName, name, lastName, age, gender } = req.body;
    console.log(req.body);
    if (!email || !displayName || !password || !name || !lastName || !age || !gender) {
        return res.status(400).send({ error: "Missing fields" });
    }
    try {
        //Step 1: Create a User in FireBase in order to refers uid with our Patient model
        const userId = yield (0, firebase_1.createUser)(displayName, email, password, "patient");
        //Step 2: Create a our model patient linked to uid firebase
        const patient = yield (0, Patient_repo_1.createPatient)(userId, email, displayName, password, name, lastName, age, gender);
        res.status(201).send({
            patient
        });
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
exports.UserRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Info desde el body
    // Checar si falta info
    // Checar que el rol sea adecuado
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Missing fields" });
    }
    ;
    try {
        // Login with firebase api ref: https://firebase.google.com/docs/reference/rest/auth
        // Important*** pass on body request 'returnSecureToken' as true in order to generete token that can access the project and avoid "issues". Ref: https://stackoverflow.com/questions/47817069/firebase-verify-id-token-gives-firebase-id-token-has-incorrect-iss
        const user = yield axios_1.default.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCY-veu5OPCdhvlgRVvC0bsfNbTNmzsW6w", { email, password, returnSecureToken: true }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.status(200).send(user.data);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
// Llamado por admin y dueñño
exports.UserRouter.post("/active", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["patient"], allowSamerUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { is_active } = req.body;
    if (!is_active) {
        return res.status(400).send({ error: "Missing is_active bool as url param" });
    }
    const token = (0, utils_1.getToken)(req);
    const uid = yield (0, utils_1.getUIDFromToken)(token);
    if (!uid) {
        return res.status(500).send({ error: "error when trying to get uid" });
    }
    try {
        const user = yield (0, Patient_repo_1.modifyIsActiveProp)(uid, is_active);
        return res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
// Llamado por admin y dueñño
exports.UserRouter.get("/session", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["patient"], allowSamerUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, utils_1.getToken)(req);
        const uid = yield (0, utils_1.getUIDFromToken)(token);
        if (!uid) {
            return res.status(500).send({ error: "UID was not found" });
        }
        const user = yield (0, Patient_repo_1.fetchPatient)(uid);
        return res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
