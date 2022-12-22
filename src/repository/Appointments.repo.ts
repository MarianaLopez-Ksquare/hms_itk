//funciones y metodos de sequelize

import { InferAttributes } from "sequelize";
import { Appoiments } from "../models/Appoiments.model"
import { getPagination, getPagingData } from "./utils";

export interface OptionsQuery {
    page?: number,
    size?: number,
    where?: Object;
}
export const createAppointment = async (description: string, date: Date, doctor_id: number, patient_id: number, isAttended: boolean, deparment_id: number) => {
    try{
        const newAppointment = await Appoiments.create ({description,date, doctor_id, patient_id, isAttended, deparment_id})
        return newAppointment;
    } catch (error){
        console.error(error);        
    }
}

export const fetchAppointmentById = async(idGivenByUser:number) =>{

    try {
       const foundAppointment = await Appoiments.findOne({  //SELECT * FROM "Appointment" WHERE id == idGivenByUser
            where: {
                id: idGivenByUser
            }
    
        })

        return foundAppointment;
    } catch (error) {
        console.error(error);
        
        return null;
        
    }
}
 // para cuando tenemos modelos más complejos
export const updateAppointmentById = async (id:number, appoimentsModel: InferAttributes<Appoiments>) =>{
    try {
        const foo = await Appoiments.update(appoimentsModel, {
            where:{ 
                id
            }
        })

        return foo;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteAppointmentById = async(idGivenByUser:number) =>{

    try {
       const numberOfDestoyedRows = await Appoiments.destroy({  //SELECT * FROM "Appointment" WHERE id == idGivenByUser
            where: {
                id: idGivenByUser
            }
    
        })

        return numberOfDestoyedRows;
    } catch (error) {
        console.error(error);
        
        return null;
        
    }
}



// Pagination Ref: https://www.bezkoder.com/node-js-sequelize-pagination-mysql/
export const fetchAppoiments = async (options: OptionsQuery) => {
    try {
    
        const page = options?.page ?? 0;
        const size = options?.size ?? 3;
        const where = options?.where ?? {};
        const {limit, offset} = getPagination(page, size)
        const appoiments = await Appoiments.findAndCountAll({
            limit,
            offset,
            ...where,
        });
        const pagination = getPagingData(appoiments, page, limit );
        return pagination;
    } catch (error) {
        console.error(error);
    }
}