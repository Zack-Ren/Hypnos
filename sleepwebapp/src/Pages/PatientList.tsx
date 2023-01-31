import { AppShell, Navbar, Header, List, Button } from '@mantine/core'
import { useState } from 'react';
import HeaderBar from '../Components/HeaderBar';
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom';

function PatientList() {

    const [list, setList] = useState([]);
    const navigate = useNavigate();

    return (
        <AppShell navbar={<NavBar />} >
            <HeaderBar title={"Patients"}></HeaderBar>
            <List>
                <List.Item>
                    <Button fullWidth variant="subtle" radius="xs" onClick={() => navigate('/patientdata')}>
                        John Doe
                    </Button>
                </List.Item>
                <List.Item>Patient 2</List.Item>
                <List.Item>Patient 3</List.Item>
                <List.Item>Patient 4</List.Item>
                <List.Item>Patient 5</List.Item>
            </List>
        </AppShell>  
    );
}

export default PatientList;