import { Button, ChatIcon, Divider, EmailIcon, Flex, Header, Image, Loader, PhoneIcon, Segment, Text } from "@fluentui/react-northstar"
import { AxiosResponse } from "axios";
import { FunctionComponent, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { DoctorContext } from "../../Components/DoctorProviderComponent/Context";
import { NavBar } from "../../Components/NavBarComponent/NavBar";
import { EventComponent } from "../../Components/EventComponent/EventComponent";
import { Event } from "../../Models/Event";
import { Patient } from "../../Models/Patient";
import { getEventByPatient } from "../../Requests/GetEventByPatient";
import { getPatient } from "../../Requests/GetPatient";

/**
 * Represents the Patient Page
 * @returns 
 */
export const PatientComponent: FunctionComponent = () => {
    // State
    const [patient, setPatient] = useState<Patient | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    
    // Hooks
    const location = useLocation();
    const {doctor} = useContext(DoctorContext);
    const patientId: string = location.pathname.split('/')[2]

    useEffect(() => {
        const getData = async () => {
            const patient: AxiosResponse<Patient, any> = await getPatient(patientId);
            setPatient(patient.data);
            const eventsResponse: AxiosResponse<Event[], any> = await getEventByPatient(patientId);
            setEvents(eventsResponse.data);
        }

        getData();
    }, [patientId]);

    if (patient === null){
        return (
            <Loader size="largest" />
        )
    }
    return (
        <Flex className="patientPage-container" fill>
            <NavBar />
            <Flex fill column>
                <Header content="Patient Page" color="brand" />
                <Flex column gap="gap.large">
                    <Flex className="patientProfile-container">
                        <Segment>
                            <Flex gap="gap.large">
                                <Image src={patient.picture} circular styles={{width: "100px"}}/>
                                <Flex column>
                                    <Flex>
                                        <Flex column>
                                            <Text content={patient.name} weight="bold" />
                                            <Flex gap="gap.large">
                                                <Flex vAlign="center" gap="gap.small">
                                                    <EmailIcon size="small" color="brand"/>
                                                    <Text content={patient.email} weight="light" />
                                                </Flex>
                                                <Flex vAlign="center" gap="gap.small">
                                                    <PhoneIcon size="small" color="brand"/>
                                                    <Text content={patient.phoneNumber} weight="light" />
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Divider/>
                                    <Flex gap="gap.medium" space="between">
                                        <Flex column>
                                            <Text content="Referring Doctor" weight="semibold" />
                                            <Text content={doctor?.name} weight="regular" />
                                        </Flex>
                                        <Flex column>
                                            <Text content="Treatment Address" weight="semibold" />
                                            <Text content={doctor?.clinicAddress} weight="regular" />
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex column vAlign="center">
                                    <Button icon={<ChatIcon size="larger"/>} text title="Chat" size="medium" primary circular/>
                                </Flex>
                            </Flex>   
                        </Segment>
                    </Flex>
                    <Flex>
                        {events.length > 0 ? events.map((event) => <EventComponent event={event} />) : <Loader size="largest" />}                  
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}