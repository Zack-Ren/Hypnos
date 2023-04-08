import { Person } from "./Person";

/**
 * Interface representing the Doctor Schema.
 */
export interface Doctor extends Person {
    clinicAddress: string,
    setOfPatients: string[]
}