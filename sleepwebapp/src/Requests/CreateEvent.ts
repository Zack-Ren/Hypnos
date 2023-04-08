import axios, { AxiosResponse } from 'axios';
import { Event } from '../Models/Event';

/**
 * POST Request to create an event
 * @param newEvent Represents the event to create
 * @returns 
 */
export const createEvent = async (newEvent: Event) => {
    const createEventResponse: AxiosResponse<Event> = await axios.post(`/api/Event`, newEvent);
    return createEventResponse;
}