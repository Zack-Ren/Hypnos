import { useState } from "react";
import { DoctorContext, IDoctorContextValue, } from "./Context";
import { Doctor } from "../../Models/Doctor";

// export const AuthProvider = (children: any) => {
//   const [user, setUser] = useState<User | null>(null);
//   const isAuthenticated = Boolean(user);

//   console.log(AuthContext);

//   const login = (username: string, password: string) => {
//     // perform authentication logic here, e.g. send a request to a server
//     // and get a JWT token or some other kind of authentication token in response
//     // for this example, we'll just set the user directly
//     setUser({ username, password });
//   };

//   const logout = () => {
//     // perform logout logic here, e.g. clear authentication tokens, etc.
//     setUser(null);
//   };

//   const authContextValue: AuthContextValue = {
//     user,
//     isAuthenticated,
//     login,
//     logout,
//   };

//   return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
// };

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