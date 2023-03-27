/**
 * Interface representing the Event Schema.
 */
export interface Event {
    id: string,
    patientId: string,
    doctorId: string,
    eventTime: string,
    doctorNotes: string,
    patientNotes: string,
    setOfDiagnostics: string[]
}