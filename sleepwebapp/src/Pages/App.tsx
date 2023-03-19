import { ColorScheme, ColorSchemeProvider, LoadingOverlay, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useState, createContext } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import PatientList from './PatientList';
import PatientData from '../Components/PatientData';
import DiagnosticList from '../Components/DiagnosticList';
import Invalid from './Invalid';

export const DoctorContext = createContext<string>("");

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  
  const [Doctor, setDoctor] = useState<string>("");

    return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme: colorScheme,
          primaryColor: 'dark',
        }}
        withGlobalStyles
      >
        <DoctorContext.Provider value={"6410cb4b042a3c5afee40420"}>
        <NotificationsProvider>
          <Router>
            <Routes>
              
                <Route path='/' element={<Login />}/>
                <Route path='/invalid' element={<Invalid />}/>
                <Route path='/patientlist' element={<PatientList />}/>
                <Route path='/starredlist' element={<PatientList />}/>
                <Route path='/archivedlist' element={<PatientList />}/>
                <Route path='/patientdata/:diagnosticid' element={<PatientData />}/>
                <Route path='/diagnosticlist/:patientid' element={<DiagnosticList/>} />
              
            </Routes>
          </Router>
        </NotificationsProvider>
        </DoctorContext.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
