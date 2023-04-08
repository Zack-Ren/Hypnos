import axios, { AxiosResponse } from 'axios';
import { Patient } from '../Models/Patient';

/**
 * Sends an Axios request to /api/Doctor/Patient Endpoint to retrieve all patients associated with the specified doctor.
 * @param doctorId Represents the doctor's id
 * @returns Promise Object of Request
 */
export const getPatientsByDoctor = async (doctorId: string) => {
    const getPatientsByDoctorResponse: AxiosResponse<Patient[]> = await axios.get(`api/Patient/Doctor?id=${doctorId}`);
    return getPatientsByDoctorResponse;
}