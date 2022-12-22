import { InferAttributes } from "sequelize";
import { Doctors } from "../models/Doctors.model";

export const createDoctor = async (uid: string, degree: string, name: string, lastName: string, age: number, gender: string, yearsExperience: number, admin_id: number, department_id: number) => {
    try {
        const newDoctor = await Doctors.create({uid, degree, name, lastName, age, gender, yearsExperience, admin_id, department_id});
        return newDoctor;
    } catch (error) {
        console.error(error);
        return error;
    }
};



export const updateDoctor = async (id: number, doctorModel: InferAttributes<Doctors>) => {
    try {
        const doctor = await Doctors.update(doctorModel, {
            where:{ 
                id: id
            }
        })
        return doctor;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchDoctorById = async(idGivenByUser:number) =>{

    try {
       const foundDoctor = await Doctors.findOne({  //SELECT * FROM "Doctor" WHERE id == idGivenByUser
            where: {
                id: idGivenByUser
            }
    
        })

        return foundDoctor;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}