import { AppShell, Navbar, Header, List, Button } from '@mantine/core'
import { useEffect, useState } from 'react';
import HeaderBar from '../Components/HeaderBar';
import NavBar from '../Components/NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function DiagnosticList() {
    
    const id = useParams();

    const [Diagnostic, setDiagnostic] = useState<any[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`api/Diagnostic`).then((response) => {
            setDiagnostic(response.data);
        });
    }, []);

    const patientevent = Diagnostic.filter(event => event.patientId = id)
    
    return (
        <AppShell navbar={<NavBar />} >
            <HeaderBar title={"Diagnostic Events"}></HeaderBar>
            <div>
                {patientevent.map((event) => (
                    <p key={event.id} onClick={() => navigate(`/patientdata`)}>
                        <strong>{event.id}</strong> <br/>
                        {event.dataAcquisitionStartTime}<br/>
                        {event.dataAcquisitionEndTime}<br/>
                    </p>
                ))}
            </div>
        </AppShell>  
    );
}

export default DiagnosticList;