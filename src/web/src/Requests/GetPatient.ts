import axios, { AxiosResponse } from 'axios';
import { Patient } from '../Models/Patient';

/**
 * GET Request to return a singular patient given its id
 * @param patientId Represents the id of the patient
 * @returns 
 */
export const getPatient = async (patientId: string) => {
    const getPatientResponse: AxiosResponse<Patient> = await axios.get(`/api/Patient/${patientId}`);
    return getPatientResponse;
}