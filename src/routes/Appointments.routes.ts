import { Router, Request, Response } from "express";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import { Patients } from "../models/Patients.model";
import { createAppointment, deleteAppointmentById, fetchAppoiments, fetchAppointmentById, OptionsQuery, updateAppointmentById} from '../repository/Appointments.repo'
import { fetchPatient } from "../repository/Patient.repo";
import { getToken, getUIDFromToken } from "../repository/utils";
export const AppointmentsRouter = Router ();


AppointmentsRouter.post ('/', isAuthenticated, isAuthorized( {roles: ["patient", "admin"], allowSamerUser: true} ) ,async(req:Request, res: Response) =>{
    const {description,date, doctor_id, isAttended, deparment_id } = req.body;
    try {
        // Getting token info to fetch id and uid
        const token = getToken(req);
        console.log("1: ",token);
        
        const  uid  = await getUIDFromToken(token);
        console.log("2: ", uid)
        const user: Partial<Patients>= await fetchPatient(uid);

        console.log("3: ", user.id);
        
        if (!user.id){
            res.status(500)
            return res.send({
                error: 'Appoinint can not be created because user fetch by token failed, try with an logged account'
            })
        }
    
        const newAppointments = await createAppointment(description,date, doctor_id, user.id, isAttended, deparment_id);        
        res.status(201);
        return res.send(newAppointments);
    } catch (error) {
        console.error(error);      
        res.status(500).send(error);
    }

})

AppointmentsRouter.get ('/:id', isAuthenticated, isAuthorized( {roles: ["patient", "admin"], allowSamerUser: true} ),  isAdmin, async (req:Request,res:Response)=>{
    
    //conversion del todoId para tener congruencia entre el tipo de dato definido en el modelo
    const id = Number (req.params['id']);

    //validaciones 

    if (id <= 0){
        res.status(400);
        res.send({
            error:'Invalid id'
        })
    }

    const foundAppointments = await fetchAppointmentById (id);
    if (!foundAppointments){
        res.status(404); //(404)not found info  -- 400 error del usuario (bad request)
        return res.send({
            error:'Appointments not found'
        })
    }

    console.log(foundAppointments);
    

    res.send(foundAppointments);
})

AppointmentsRouter.get ('/', isAuthenticated, isAuthorized( {roles: ["patient", "admin"], allowSamerUser: true} ), async (req:Request,res:Response)=>{

        const {page, size} = req.query;
        // Getting token info to fetch id and uid
        const token = getToken(req);
        console.log("1: ",token);
        
        const  uid  = await getUIDFromToken(token);
        console.log("2: ", uid)
        // fetch patient to get its id
        const user: Partial<Patients>= await fetchPatient(uid);

        console.log("3: ", user.id);
        
        if (!user.id){
            res.status(500)
            return res.send({
                error: 'Appoinint can not be created because user fetch by token failed, try with an logged account'
            })
        }
        

        const options: OptionsQuery = {
            page: Number(page),
            size: Number(size),
            where: {
                patient_id: user.id
            }
        }
        // if user.role == 

        const foundAppointments = await fetchAppoiments(options);
        if (!foundAppointments){
            res.status(404); //(404)not found info  -- 400 error del usuario (bad request)
            return res.send({
                error:'Appointments not found'
            })
        }

    console.log(foundAppointments);
    res.send(foundAppointments);
})

AppointmentsRouter.put ('/:id', isAuthenticated, isAuthorized( {roles: ["patient", "admin"], allowSamerUser: true} ), async (req:Request,res:Response) => {
    const id = Number (req.params['id']);
    const body = req.body;
    console.log("my id: ", id);
    
    if (id <= 0){
        res.status(404);
        res.send({
            error:'Invalid id'
        })
    }

    const affectedRows = await updateAppointmentById (id,body);

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

    const foundAppointments = await fetchAppointmentById (id)

    res.status(200);
    return res.send(foundAppointments)
})

AppointmentsRouter.delete ('/:todoId', isAuthenticated, isAuthorized( {roles: ["patient", "admin"], allowSamerUser: true} ), async (req:Request,res:Response) => {
    const todoId = Number (req.params['todoId']);
    if (todoId <= 0){
        res.status(404);
        res.send({
            error:'Invalid id'
        })
    }

    const array = await deleteAppointmentById (todoId);
    if (!array){
        return res.status (400).send ({
            error: 'Cannot delete'
        })
    }

    return res.sendStatus (200);
})