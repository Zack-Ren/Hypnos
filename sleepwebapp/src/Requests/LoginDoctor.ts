import axios, { AxiosResponse } from 'axios';
import { Doctor } from '../Models/Doctor';

/**
 * Sends an Axios request to /api/Login Endpoint to verify credentials.
 * @param username Represents doctor's username
 * @param password Represents doctor's password
 * @returns Promise Object of Request
 */
export const loginDoctor = async (username: string, password: string) => {
    const loginPostResponse: AxiosResponse<Doctor> = await axios.post('api/Login', {
        username: username,
        password: password
    });
    return loginPostResponse;
}