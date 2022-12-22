import axios from "axios";
import { Router, Response,  Request } from "express";
import { createUser, disableUser, getAllUser, readUser, updateUser, Role, createUserIfNotExist } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized"
import { createDoctor, fetchDoctorById, updateDoctor } from "../repository/Doctor.repo";
import { createPatient, fetchPatient, modifyIsActiveProp } from "../repository/Patient.repo";
import { getToken, getUIDFromToken } from "../repository/utils";
const dotenv = require("dotenv");
dotenv.config();

export const UserRouter = Router();

// Admin Endpoints
UserRouter.get("/",isAuthenticated, isAuthorized( {roles: ["admin", "doctor"], allowSamerUser: true} ), async (req:Request, res: Response) => {
    const { uid } = res.locals;
    try {
      const user = await readUser(uid);
      return res.status(200).send(user);
    } catch (error) {
      res.status(500).send({error});
    }
  })


///////////


UserRouter.post("/signup", async (req: Request, res: Response) => {
  // Info desde el body
  // Checar si falta info
  // Checar que el rol sea adecuado
  const {email, password, displayName, name, lastName, age, gender} = req.body;
    console.log(req.body)
  if (!email || !displayName || !password || !name || !lastName || !age || !gender) {
    return res.status(400).send({error: "Missing fields"});
  }

  try {
    //Step 1: Create a User in FireBase in order to refers uid with our Patient model
    const userId = await createUser(displayName, email, password, "patient");
    //Step 2: Create a our model patient linked to uid firebase
    const patient = await createPatient(userId, email, displayName, password, name, lastName, age, gender);

    res.status(201).send({
        patient
    });
  } catch (error) {
    res.status(500).send({error});
  }

});

UserRouter.post("/signin",async (req: Request, res: Response) => {
    // Info desde el body
    // Checar si falta info
    // Checar que el rol sea adecuado
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send({error: "Missing fields"});
    };
    try {

        // Login with firebase api ref: https://firebase.google.com/docs/reference/rest/auth
        // Important*** pass on body request 'returnSecureToken' as true in order to generete token that can access the project and avoid "issues". Ref: https://stackoverflow.com/questions/47817069/firebase-verify-id-token-gives-firebase-id-token-has-incorrect-iss
        const user = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCY-veu5OPCdhvlgRVvC0bsfNbTNmzsW6w", {email, password, returnSecureToken: true } ,{
            headers: {
                'Content-Type': 'application/json'  
            }
        }, );
        
        res.status(200).send(user.data);
    } catch (error) {
        res.status(500).send({error});
    }
})


// Llamado por admin y dueñño
UserRouter.post("/active",isAuthenticated, isAuthorized( {roles: ["patient"], allowSamerUser: true} ), async (req:Request, res: Response) => {
    const { is_active } = req.body;


    if (!is_active) {
        return res.status(400).send({error: "Missing is_active bool as url param"});
    }
    
    const token = getToken(req);
    const  uid  = await getUIDFromToken(token)
    
    if (!uid) {
        return res.status(500).send({error: "error when trying to get uid"});
    }

    try {
      const user = await modifyIsActiveProp(uid, is_active);
      return res.status(200).send(user);
    } catch (error) {
      res.status(500).send({error});
    }
  })



// Llamado por admin y dueñño
UserRouter.get("/session", isAuthenticated, isAuthorized({roles: ["patient"], allowSamerUser: true}), async (req:Request, res: Response) => {
    try {
        const token = getToken(req);
        
        const  uid  = await getUIDFromToken(token);
        if (!uid) {
            return res.status(500).send({error: "UID was not found"});
        }
        const user = await fetchPatient(uid);
        return res.status(200).send(user);
    } catch (error) {
        res.status(500).send({error});
    }
})