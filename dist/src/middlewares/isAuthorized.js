"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
;
// Sirva como Middleware
//Nos deje configurar que roles tienen acceso a un endpoint
// Nos debe dejar sobrescribir el permiso si el mismo usuario dueño del recurso quiere accederlo a pesar de no tener permiso
const isAuthorized = (options) => {
    return (req, res, next) => {
        const { uid, email, role } = res.locals;
        if (email === "admin-user@gmail.com") { //admin@gmail.com
            return next();
        }
        if (options.allowSamerUser) {
            return next();
        }
        if (!role) {
            return res.status(403).send();
        }
        if (options.roles.includes(role)) {
            return next();
        }
        return res.status(403).send({
            message: "You don have permission enougs"
        });
    };
};
exports.isAuthorized = isAuthorized;
