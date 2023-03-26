import { useState } from "react";
import { DoctorContext, IDoctorContextValue, } from "./Context";
import { Doctor } from "../../Models/Doctor";

/**
 * 
 * @param children Represents any components that we want to have access to the context
 * @returns 
 */
export const DoctorProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<Doctor | null>(null);
  const isLoggedIn = Boolean(user);

  const setDoctor = (doctor: Doctor) => {
    setUser(doctor);
  }

  let doctor = user;

  const doctorContextValue: IDoctorContextValue = {
    doctor,
    setDoctor,
    isLoggedIn
  };

  return <DoctorContext.Provider value={doctorContextValue}>{children}</DoctorContext.Provider>
};