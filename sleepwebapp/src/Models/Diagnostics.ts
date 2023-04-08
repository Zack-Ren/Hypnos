/**
 * Interface representing the Diagnostics Schema
 */
export interface Diagnostics {
    id: string,
    patientId: string,
    dataAcquisitionStartTime: string,
    dataAcquisitionEndTime: string,
    accelerationX: number[],
    accelerationY: number[],
    accelerationZ: number[],
    angularAccelerationX: number[],
    angularAccelerationY: number[],
    angularAccelerationZ: number[],
}