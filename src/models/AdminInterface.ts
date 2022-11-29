// *Admin Module
// -Can see all patients with filters
// -Can see all doctors with filters
// -Can see all appointments with filter


// -Can add new doctors: Pending

import { AppoimentType } from "./Appoiment";
import { DoctorType } from "./DoctorInterface";
import { PatientType } from "./PatientInterface";

export interface AdminType {
    adminId: number,
    patientIds: PatientType[],
    doctorIds: DoctorType[],
    appointmentIds: AppoimentType[],
}
