import { AppoimentType } from "./Appoiment";

export interface PatientType {
    patient_id: number; //unique
    appointment_id: AppoimentType[]; //Due to the user can have more than one appoiment id it will have an array of appoinet. 
}