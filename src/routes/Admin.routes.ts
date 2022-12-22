import { Router, Response,  Request } from "express";
import { createUser, disableUser, getAllUser, readUser, updateUser, Role, createUserIfNotExist } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized"
import { fetchAppoiments } from "../repository/Appointments.repo";
import { createDoctor, fetchDoctorById, updateDoctor } from "../repository/Doctor.repo";
const dotenv = require("dotenv");
dotenv.config();

export const AdminRouter = Router();

// Admin Endpoints

//Create an endpoint where an admin can create a new doctor account (user).  
AdminRouter.post("/users/doctors",isAuthenticated, isAuthorized( {roles: ["admin"], allowSamerUser: false} ) , async (req: Request, res: Response) => {
    // Info desde el body
    // Checar si falta info
    // Checar que el rol sea adecuado
    const { email, password, displayName, degree, name, lastName, age, gender, yearsExperience, admin_id, deparment_id } = req.body;
  
    if (!email || !password || !displayName || !name || !gender) {
        return res.status(400).send({error: "Missing fields"});
    }
  
    try {
        const user_uid = await createUserIfNotExist(displayName, email, password, "doctor");
        // Step 2: Create and Fill our Doctor Model with the info and link to the new userId
        const doctor = await createDoctor(user_uid, degree, name, lastName, age, gender, yearsExperience, admin_id, deparment_id);
        // Step 3: send the doctor info in case everything is ok
        res.status(201).send({
            doctor
        });
    } catch (error) {
        return res.status(500).send({error});
    }
});

// Create an endpoint that can modify the is_active property from the User model back to true. 
AdminRouter.put("/users/doctors/:doctor_id",isAuthenticated, isAuthorized( {roles: ["admin"], allowSamerUser: false} ) , async (req: Request, res: Response) => {
    const doctor_id = Number(req.params['doctor_id']);
    const body = req.body;
    if (doctor_id <= 0){
        res.status(404);
        res.send({
            error:'Invalid id'
        })
    }

    const affectedRows = await updateDoctor(doctor_id, body);

    if (!affectedRows){
        res.status(400);
        return res.send({
            error: 'Somenthing went wrong'
        })
    }

    if (affectedRows [0] === 0){
        res.status(400);
        return res.send({
            error: 'Update failed'
        })
    }

    const foundDoctor = await fetchDoctorById(doctor_id)

    res.status(200);
    return res.send(foundDoctor)
});

///////////////////////

AdminRouter.get("/appoiments",isAuthenticated, isAuthorized( {roles: ["admin"], allowSamerUser: true} ), async (req:Request, res: Response) => {
    try {
      const appoiments = await fetchAppoiments({});
      return res.status(200).send(appoiments);
    } catch (error) {
      res.status(500).send({error});
    }
  })
///////////