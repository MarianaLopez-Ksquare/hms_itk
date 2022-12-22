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
exports.URLRouter = void 0;
const express_1 = require("express");
const URL_repo_1 = require("../repository/URL.repo");
const uuid_1 = require("uuid");
exports.URLRouter = (0, express_1.Router)();
exports.URLRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const origUrl = req.body.origUrl;
    if (!origUrl) {
        res.status(400);
        res.send({
            error: 'No orginal URL was provided'
        });
    }
    const newId = (0, uuid_1.v4)().split('-')[0];
    const newUrl = yield (0, URL_repo_1.createURL)(newId, origUrl);
    return res.json({
        newUrl: 'http://localhost:3000/u/' + newUrl
    });
}));
exports.URLRouter.get('/:uuid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params['uuid'];
    if (!uuid) {
        res.status(400);
        res.send({
            error: 'No ID provided'
        });
    }
    const Url = yield (0, URL_repo_1.fetchUrlById)(uuid);
    if (!Url) {
        res.status(400);
        return res.send({
            error: 'No URL with this ID was found'
        });
    }
    return res.redirect(Url);
}));
