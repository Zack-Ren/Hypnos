import { Button, ChatIcon, Divider, EmailIcon, Flex, Header, Image, Loader, Segment, Text } from "@fluentui/react-northstar"
import { FunctionComponent, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { DoctorContext } from "../../Components/DoctorProviderComponent/Context";
import { NavBar } from "../../Components/NavBarComponent/NavBar";
import { Patient } from "../../Models/Patient";
import { getPatient } from "../../Requests/GetPatient";

/**
 * Represents the Patient Page
 * @returns 
 */
export const PatientComponent: FunctionComponent = () => {
    // State
    const [patient, setPatient] = useState<Patient | null>(null);
    
    // Hooks
    const location = useLocation();
    const {doctor} = useContext(DoctorContext);
    const patientId = location.pathname.split('/')[2]

    useEffect(() => {
        const getPatientById = async () => {
            const patient = await getPatient(patientId);
            setPatient(patient.data);
        }

        getPatientById();
    }, [patientId]);

    if (patient === null){
        return (
            <Loader size="largest" />
        )
    }
    return (
        <Flex className="patientPage-container" fill styles={{backgroundColor: 'red'}}>
            <NavBar />
            <Flex fill column>
                <Header content="Patient Page" color="brand" />
                <Flex fill column gap="gap.large" styles={{backgroundColor: 'blue'}}>
                    <Flex className="patientProfile-container">
                        <Segment styles={{width: '100%'}}>
                            <Flex gap="gap.large">
                                <Image src={patient.picture} circular styles={{width: "100px"}}/>
                                <Flex column>
                                    <Flex>
                                        <Flex column>
                                            <Text content={patient.name} weight="bold" />
                                            <Flex gap="gap.large">
                                                <Text content={patient.email} weight="light" />
                                                <Text content={patient.phoneNumber} weight="light" />
                                            </Flex>
                                        </Flex>
                                        <Flex>
                                            <Button content={<ChatIcon />} text primary circular />
                                            <Button content={<EmailIcon />} text primary circular />
                                        </Flex>
                                    </Flex>
                                    <Divider/>
                                    <Flex gap="gap.medium">
                                        <Flex column>
                                            <Text content="Scheduled Appt" weight="light" />
                                            <Text content="14 Mar 2021" weight='regular' />
                                        </Flex>
                                        <Flex column>
                                            <Text content="Special Notes" weight="light" />
                                            <Text content="Patient is Deaf. Talk to wife" weight='regular' />
                                        </Flex>
                                    </Flex>
                                </Flex>

                            </Flex>   
                            <Divider />
                            <Flex column gap="gap.large">
                                <Flex gap='gap.large'>
                                    <Flex column>
                                        <Text content="GUID" weight="light" />
                                        <Text content={patient.id} weight="regular" />
                                    </Flex>
                                    <Flex column>
                                        <Text content="Expiry Date" weight="light" />
                                        <Text content={"12/07/2023"} weight="regular" />
                                    </Flex>
                                    <Flex column>
                                        <Text content="Treatment Address" weight="light" />
                                        <Text content={doctor?.clinicAddress} weight="regular" />
                                    </Flex>
                                </Flex>
                                <Flex gap="gap.large">
                                    <Flex column>
                                        <Text content="Referring Doctor" weight="light" />
                                        <Text content='Dr. Aditya Sharma' weight="regular" />
                                    </Flex>
                                    <Flex column>
                                        <Text content="Assigned Doctor" weight="light" />
                                        <Text content={doctor?.name} weight="regular" />
                                    </Flex>
                                    <Flex column>
                                        <Text content="Family Doctor" weight="light" />
                                        <Text content='Dr. Zack Ren' weight="regular" />
                                    </Flex>
                                    <Flex column>
                                        <Text content="Pharmacy Name" weight="light" />
                                        <Text content={doctor?.clinicAddress} weight="regular" />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Segment>
                    </Flex>
                    <Flex>
                        <Segment>
                            Events
                        </Segment>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}