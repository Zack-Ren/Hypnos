import { AppShell, Navbar, Header, List, Button } from '@mantine/core'
import { useEffect, useState } from 'react';
import HeaderBar from '../Components/HeaderBar';
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DiagnosticList() {
    

    const [Diagnostic, setDiagnostic] = useState<any[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`api/Diagnostic`).then((response) => {
            setDiagnostic(response.data);
        });
    }, []);

    return (
        <AppShell navbar={<NavBar />} >
            <HeaderBar title={"Diagnostic Events"}></HeaderBar>
            <div>
                {Diagnostic.map((Diagnostic) => (
                    <p key={Diagnostic.id} onClick={() => navigate(`/patientdata/fjhjhg`)}>
                        <strong>{Diagnostic.id}</strong> <br/>
                        {Diagnostic.dataAcquisitionStartTime}<br/>
                        {Diagnostic.dataAcquisitionEndTime}<br/>
                    </p>
                ))}
            </div>
        </AppShell>  
    );
}

export default DiagnosticList;