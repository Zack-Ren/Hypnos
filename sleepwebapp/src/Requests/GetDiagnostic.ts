import axios, { AxiosResponse } from 'axios';
import { Diagnostics } from '../Models/Diagnostics';

/**
 * GET Request to return a singular diagnostic given its id
 * @param diagnosticId Represents the diagnostic id
 * @returns 
 */
export const getDiagnostic = async (diagnosticId: string) => {
    const getDiagnosticResponse: AxiosResponse<Diagnostics> = await axios.get(`/api/Diagnostic/${diagnosticId}`);
    return getDiagnosticResponse;
}