import { readUser } from "../firebase";
import { Patients } from "../models/Patients.model";
import { User } from "../firebase/index"

export const createPatient = async (uid: string, email: string, displayName: string, password: string, name: string, lastName: string, age: number, gender: string) => {
    try {
        const newPatient = await Patients.create({uid, isActive: true,  name, lastName, age, gender});
        return newPatient;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const modifyIsActiveProp = async (uid: string, isActive: boolean) => {
    try {
        const foo = await Patients.update({isActive: isActive}, {
            where:{ 
                uid: uid
            }
        })
        return foo;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const fetchPatient = async (uid: string): Promise<Partial<Patients>> => {
    try {
        const patient = await Patients.findOne({
            where: {
                uid: uid
            }});
        const user = await readUser(uid);
        return {...user ,...patient?.toJSON()};
    } catch (error) {
        console.error(error);
        throw error;
    }
}