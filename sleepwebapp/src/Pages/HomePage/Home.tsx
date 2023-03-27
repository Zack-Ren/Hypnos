import { Flex, Header } from "@fluentui/react-northstar";
import { FunctionComponent, useContext, useEffect, useState } from "react"
import { DoctorContext } from "../../Components/DoctorProviderComponent/Context"
import { NavBar } from "../../Components/NavBarComponent/NavBar";
import { PatientCard } from "../../Components/PatientCardComponent/PatientCard";
import { Patient } from "../../Models/Patient";
import { getPatientsByDoctor } from "../../Requests/GetPatientsByDoctor";
import './Home.css';
/**
 * Represents the home page
 * @returns Home page
 */
export const Home: FunctionComponent = () => {
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

    // Logic
    let patientGrid = patients.map((patient, patientIndex) => {
        return (
            <Flex column padding="padding.medium">
                <PatientCard patient={patient} />
            </Flex>
        )
    });

    patientGrid.push(...patientGrid);

    // Rendering Component
    return (
        <Flex className="home-container" styles={{height: '100%', width: '100%'}}>
            <NavBar />
            <Flex fill column>
                <Header content="Patients" color="brand" />
                <Flex wrap space="between">
                    {patientGrid.length > 0 ? patientGrid : "None" }
                </Flex>
            </Flex>
            
        </Flex>
    )
}