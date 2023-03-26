import axios, { AxiosResponse } from 'axios';
import { Event } from '../Models/Event';

/**
 * PUT Request to update an event
 * @param eventId Represents the Id of the event to update
 * @returns 
 */
export const updateEvent = async (eventId: string, updatedEvent: Event) => {
    const updateEvent: AxiosResponse<Event> = await axios.put(`/api/Event/${eventId}`, updatedEvent);
    return updateEvent;
}