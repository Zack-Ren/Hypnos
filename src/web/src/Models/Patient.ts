import { Person } from "./Person";

/**
 * Interface representing the Patient Schema.
 */
export interface Patient extends Person {
    doctorId: string,
}