import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DoctorContext } from './Components/DoctorProviderComponent/Context';
import { DoctorProvider } from './Components/DoctorProviderComponent/DoctorProvider';
import { ProtectedRoutes } from './Components/ProtectedRoutes/ProtectedRoutes';
import { Home } from './Pages/HomePage/Home';
import { HomeV2 } from './Pages/HomePage/HomeV2';
import { Login } from './Pages/LoginPage/Login';
import { PatientComponent } from './Pages/PatientPage/Patient';
import { Register } from './Pages/RegisterPage/Register';

function App() {
  const {doctor, isLoggedIn} = useContext(DoctorContext);
  
    return (
      <DoctorProvider>
          <BrowserRouter>
          <Routes>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>

              <Route element={<ProtectedRoutes />}>
                <Route path='/home' element={<Home />}/>
                <Route path='/homeV2' element={<HomeV2 />}/>
                <Route path='/patient/:id' element={<PatientComponent />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </DoctorProvider>
  );
}

export default App;
