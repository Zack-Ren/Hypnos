import axios, { AxiosResponse } from 'axios';
import { Analysis } from '../Models/Analysis';

/**
 * GET Request to return a singular diagnostic given its id
 * @param analysisId Represents the diagnostic id
 * @returns 
 */
export const getAnalysis = async (analysisId: string) => {
    const getAnalysisResponse: AxiosResponse<Analysis> = await axios.get(`/api/Analysis/${analysisId}`);
    return getAnalysisResponse;
}