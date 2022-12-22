import { Request, Response } from "express";
import * as admin from "firebase-admin";

export const isAdmin =async (req: Request, res: Response, next: Function) => {
    
  // No authorization header
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({error: "No authentication"});
  }
  // No correct schema (Bearer)
  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).send({error: "No authentication"});
  }
  // Check if the token is valid
  const splittedToken = authorization.split(" ");
  
  if (splittedToken.length !== 2) {
    return res.status(401).send({error: "No authentication"});
  };
  const token = splittedToken[1];
  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);

    if (decodedToken.role == "admin") {
      return next();
    }

  } catch (error) {
    return res.status(401).send({error});
  }
}