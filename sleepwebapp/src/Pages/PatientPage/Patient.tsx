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
import { createEvent } from "../../Requests/CreateEvent";

/**
 * Represents the Patient Page
 * @returns 
 */
export const PatientComponent: FunctionComponent = () => {
    // State
    const [patient, setPatient] = useState<Patient | null>(null);
    const [events, setEvents] = useState<Event[] | null>(null);
    const [isEventCreationInProgress, setIsEventCreationInProgress] = useState<boolean>(false);
    
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

    if (patient === null || doctor === null){
        return (
            <Loader size="largest" />
        )
    }

    const createEventOnClickHandler = async () => {
        const newEvent = {
            id: "",
            patientId: patient.id,
            doctorId: doctor.id,
            patientNotes: "",
            doctorNotes: "",
            eventTime: new Date().toISOString(),
            setOfDiagnostics: []
        }

        setIsEventCreationInProgress(true);

        const createEventResponse = await createEvent(newEvent);
        
        if (events === null) {
            setEvents([createEventResponse.data])
        } else {
            const updatedEventsArray = [createEventResponse.data, ...events];
            setEvents(updatedEventsArray);
        }

        setIsEventCreationInProgress(false);
    }

    return (
        <Flex className="patientPage-container" fill>
            <NavBar />
            <Flex fill column>
                <Header content="Patient Page" color="brand" />
                <Flex column gap="gap.large">
                    <Flex className="patientProfile-container">
                        <Segment color="brand" inverted>
                            <Flex column gap="gap.medium">
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
                                </Flex>
                                <Flex space="between">
                                    <Button content="Create New Appointment" tinted onClick={() => createEventOnClickHandler()}/>
                                    <Button content="Chat" disabled tinted title="Chat" size="medium"/>
                                    <Button content="Email" disabled tinted title="Chat" size="medium"/>
                                </Flex>
                            </Flex>
                        </Segment>
                    </Flex>
                    <Flex column>
                        {events === null || isEventCreationInProgress ? <Loader size="largest" /> : events.map((event) => <EventComponent event={event} />)}                  
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}