import {  Flex, Header } from "@fluentui/react-northstar";
import { FunctionComponent, useContext, useEffect, useState } from "react"
import { DoctorContext } from "../../Components/DoctorProviderComponent/Context"
import { NavBar } from "../../Components/NavBarComponent/NavBar";
import { PatientCardV2 } from "../../Components/PatientCardComponent/PatientCardV2";
import { Patient } from "../../Models/Patient";
import { getPatientsByDoctor } from "../../Requests/GetPatientsByDoctor";
import './Home.css';
/**
 * Represents the second version of the home page
 * @returns Home page
 */
export const HomeV2: FunctionComponent = () => {
    // State
    const {doctor} = useContext(DoctorContext);
    const [patients, setPatients] = useState<Patient[]>([]);

    // Hooks
    useEffect(() => {
        // useEffect hook retrieves the list of patients managed by the loggedIn doctor
        const getPatients = async () => {
            if (doctor) {
                const patientsResponse = await getPatientsByDoctor(doctor?.id);
                setPatients(patientsResponse.data);
            }
        }

        getPatients()
        
    }, [doctor])

    let patientColumn = patients.map((patient) => {
        return (
            <>
                <PatientCardV2 patient={patient} />
            </>
        )
    })

        patientColumn.push(...patientColumn);

        // Rendering Component
    return (
        <Flex className="home-container" styles={{height: '100%', width: '100%'}}>
            <NavBar />
            <Flex fill column>
                <Header content="Patients" color="brand" />
                <Flex column gap="gap.small">
                    {patientColumn}
                </Flex>
            </Flex>
        </Flex>
    );

    
}