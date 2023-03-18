import { AppShell, Navbar, Header, List, Button } from '@mantine/core'
import { useEffect, useState } from 'react';
import HeaderBar from '../Components/HeaderBar';
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PatientList() {

    const [data, setData] = useState<any>([]);
    const navigate = useNavigate();
    
    // Pass in doctor Id to get patients for only 1 doctor
    useEffect(() => {
        axios.get(`api/Doctor/6410cb4b042a3c5afee40420`).then((response) => {
            setData(response.data.setOfPatients);
        });
    }, []);
    

    console.log(data)
    return (
        <AppShell navbar={<NavBar />} >
            <HeaderBar title={"Patients"}></HeaderBar>
            <div>
                {data.map((patient:any) => (
                    <p key={0} onClick={() => navigate(`/diagnosticlist/${patient}`)} >{patient}</p>
                ))}
            </div>
        </AppShell>
    );
}

export default PatientList;