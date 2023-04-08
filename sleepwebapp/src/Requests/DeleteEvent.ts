import axios, { AxiosResponse } from 'axios';
import { Event } from '../Models/Event';

/**
 * POST Request to delete an event
 * @param eventId Represents the event to delete
 * @returns 
 */
export const deleteEvent = async (eventId: string) => {
    const deleteEventResponse: AxiosResponse<Event> = await axios.delete(`/api/Event/${eventId}`);
    return deleteEventResponse;
}