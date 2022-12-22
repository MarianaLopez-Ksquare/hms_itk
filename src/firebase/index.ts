import * as admin from "firebase-admin";
import { UserInfo } from "firebase-admin/lib/auth/user-record";


export type Role = "patient" | "doctor" | "admin";
// Cuenta admin
// admin@test.com / toor123

export interface User extends UserInfo {
  uid: string;
  email: string;
  userName: string;
  role: Role;
  isDisabled: boolean;
}

//traer el record que nos regresa firewalle y le incluimos el role pq firebase no sabe el rol, es algo de
// nuestro codigo, nosotros lo definimos
const mapToUser = (user: admin.auth.UserRecord) => {
  const customClaims = (user.customClaims || {role: ""}) as {role?: string};
  const role = customClaims.role ?? "";
  return {
    uid: user.uid,
    email: user.email,
    userName: user.displayName,
    role,
    isDisabled: user.disabled,
  }
}

export const createUser = async ( displayName: string, email: string, password: string, role: Role) => {  
  const { uid } = await admin.auth().createUser({
    displayName,
    email,
    password
  });  
  

  await admin.auth().setCustomUserClaims(uid, { role });
  return uid;
}
export const createUserIfNotExist = async ( displayName: string, email: string, password: string, role: Role) => {  
    const user = await admin.auth().createUser({
      displayName,
      email,
      password
    });

    console.log(user)
    
  
    await admin.auth().setCustomUserClaims(user.uid, { role });
    return user.uid;
  }

export const readUser =async (uid: string) => {
  const user = await admin.auth().getUser(uid);
  return mapToUser(user);
}


export const getAllUser =async () => {
  const listOfUsers = await admin.auth().listUsers(10);
  const users = listOfUsers.users.map(mapToUser);
  return users;
}

export const updateUser =async (uid: string, displayName: string) => {
  const user =  await admin.auth().updateUser(uid, {
    displayName
  })
  return mapToUser(user);
}

export const disableUser =async (uid: string, disabled: boolean) => {
  const user =  await admin.auth().updateUser(uid, {
    disabled
  })
}