import { Request, Response } from "express";
import { Role } from "../firebase"

interface OptionsType { 
  roles: Role[]; 
  allowSamerUser: boolean
};
// Sirva como Middleware
//Nos deje configurar que roles tienen acceso a un endpoint
// Nos debe dejar sobrescribir el permiso si el mismo usuario dueño del recurso quiere accederlo a pesar de no tener permiso
export const isAuthorized = (options: OptionsType) => {

  return (req: Request, res: Response, next: Function) => {
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

    if (options.roles.includes(role) ) {
      return next();
    }

    return res.status(403).send({
      message: "You don have permission enougs"
    });
  }
}