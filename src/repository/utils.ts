import { Request } from "express";
import * as admin from "firebase-admin";
import { readUser } from "../firebase";

export const getPagination = (page = 0, size = 3) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

export const getPagingData = (dataInfo: any, page: number, limit: number) => {
    const { count: totalItems, rows: data } = dataInfo;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, data, totalPages, currentPage };
};

export const getToken = (req: Request) => {
  const str: string = req.headers.authorization ?? ""
  let idToken = "";
  if( req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = str.split(' ')[1]
  }
  return idToken;
}

export const getUIDFromToken = async ( token: string ): Promise<string> => {
    try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid
        return uid;
      } catch (error) {
        console.error(error);
        return ""
      } 
}
