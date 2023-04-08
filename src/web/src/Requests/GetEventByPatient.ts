import axios, { AxiosResponse } from 'axios';
import { Event } from '../Models/Event';

/**
 * GET Request to return events for a particular patient
 * @param patientId Represents the id of the patient
 * @returns 
 */
export const getEventByPatient = async (patientId: string) => {
    const getEventByPatientResponse: AxiosResponse<Event[]> = await axios.get(`/api/Event/Filter?patientId=${patientId}`);
    return getEventByPatientResponse;
}