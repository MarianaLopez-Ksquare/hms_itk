import { DepartmentType } from "./DepartmentType";

export interface AppoimentType {
    appoimentId: number; //unique id that will be support by node
    patientId: number;
    doctorId: number; //What doctor will be reseive the person
    date: Date; //When the appoiment will be,
    deparment: DepartmentType;
    description: string; // what is wrong with the patient
}