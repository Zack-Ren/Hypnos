import { createContext } from "react";
import { Doctor } from "../../Models/Doctor";

/**
 * Represents the interface of what the Doctor Context values will be.
 */
export interface IDoctorContextValue {
    doctor: Doctor | null;
    setDoctor: (doctor: Doctor) => void;
    isLoggedIn: boolean;
}

/**
 * Represents the initial values of the doctor context
 */
export const DoctorContext = createContext<IDoctorContextValue>({
    doctor: null,
    setDoctor: () => {},
    isLoggedIn: false,
});
