import { AppoimentType } from "./Appoiment";

export interface DoctorType {
    doctorId: number,
    appoimentIds: AppoimentType[],
}