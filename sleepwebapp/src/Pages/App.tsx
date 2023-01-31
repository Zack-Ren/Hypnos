import { ColorScheme, ColorSchemeProvider, LoadingOverlay, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import PatientList from './PatientList';
import PatientData from '../Components/PatientData';


function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme: colorScheme,
          primaryColor: 'dark',
        }}
        withGlobalStyles
      >
        <NotificationsProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/patientlist' element={<PatientList />}/>
              <Route path='/starredlist' element={<PatientList />}/>
              <Route path='/archivedlist' element={<PatientList />}/>
              <Route path='/patientdata' element={<PatientData name={"John Doe"} dob={"Jan. 1, 2000"} sex={"M"} />}/>
            </Routes>
          </Router>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
