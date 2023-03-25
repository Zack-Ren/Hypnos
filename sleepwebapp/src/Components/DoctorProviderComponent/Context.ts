import { createContext } from "react";
import { Doctor } from "../../Models/Doctor";

// export interface User {
//   username: string;
//   password: string;
// }

// export interface AuthContextValue {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (username: string, password: string) => void;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextValue>({
//   user: null,
//   isAuthenticated: false,
//   login: () => {},
//   logout: () => {},
// });

export interface IDoctorContextValue {
    doctor: Doctor | null;
    setDoctor: (doctor: Doctor) => void;
    isLoggedIn: boolean;
}

export const DoctorContext = createContext<IDoctorContextValue>({
    doctor: null,
    setDoctor: () => {},
    isLoggedIn: false,
});
